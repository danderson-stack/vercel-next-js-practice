'use client';
import { useSearchParams } from 'next/navigation';
import { useQuery } from '@tanstack/react-query';
import { useDebounce } from 'use-debounce';
import { lusitana } from '@/app/ui/fonts';
import Search from '@/app/ui/search';
import Table from '@/app/ui/customers/table';
import { InvoicesTableSkeleton } from '@/app/ui/skeletons';
import { Suspense } from 'react';
import { CreateCustomer } from '@/app/ui/customers/buttons';

export default function Page() {
  const searchParams = useSearchParams();
  const query = searchParams.get('query') || '';
  const [debouncedQuery] = useDebounce(query, 500); // 500ms debounce

  const { data: customers, error, isLoading } = useQuery({
    queryKey: ['customers', debouncedQuery],
    queryFn: async () => {
      const response = await fetch(`/api/customers?query=${debouncedQuery}`);
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      return response.json();
    },
    enabled: debouncedQuery !== undefined, // Only run when debounced query is ready
  });

  if (error) {
    return <div>Error loading customers: {error.message}</div>;
  }

  return (
    <div className="w-full">
      <div className="flex w-full items-center justify-between">
        <h1 className={`${lusitana.className} text-2xl`}>Customers</h1>
      </div>
      <div className="mt-4 flex items-center justify-between gap-2 md:mt-8">
        <Search placeholder="Search customers..." />
        <CreateCustomer />
      </div>
      <div className="flex w-full items-center justify-between">
        <Suspense fallback={<InvoicesTableSkeleton />}>
          <Table customers={customers || []} isLoading={isLoading} />
        </Suspense>
      </div>
    </div>
  );
}