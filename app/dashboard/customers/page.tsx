import { Metadata } from 'next';
import { Suspense } from 'react';
import Table from '@/app/ui/customers/table';
import { fetchFilteredCustomers } from '@/app/lib/data';

export const metadata: Metadata = {
  title: 'Customers',
};

export default async function Page(props: {
  searchParams?: Promise<{
    query?: string;
    page?: string;
  }>;
}) {
  const searchParams = await props.searchParams;
  const query = searchParams?.query || '';
  const customers = await fetchFilteredCustomers(query);
  return <div className="w-full">
    <div className="flex w-full items-center justify-between">
      <Suspense fallback={null}>
        <Table customers={customers} />
      </Suspense>
    </div>
  </div>;
}