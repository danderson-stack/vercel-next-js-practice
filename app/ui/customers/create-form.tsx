'use client';

import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useState } from 'react';

export default function CreateCustomerForm({ onSuccess }: { onSuccess?: () => void }) {
  const queryClient = useQueryClient();
  const [error, setError] = useState<string | null>(null);

  const { mutate, isPending } = useMutation({
    mutationFn: async (formData: FormData) => {
      const response = await fetch('/api/customers', {
        method: 'POST',
        body: formData,
      });
      
      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.message || 'Failed to create customer');
      }
      
      return response.json();
    },
    onSuccess: () => {
      // Invalidate and refetch customers query
      queryClient.invalidateQueries({ queryKey: ['customers'] });
      // Reset form
      const form = document.getElementById('createCustomerForm') as HTMLFormElement;
      form.reset();
      setError(null);
      // Close modal if onSuccess callback is provided
      if (onSuccess) {
        onSuccess();
      }
    },
    onError: (error: Error) => {
      setError(error.message);
    },
  });

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    mutate(formData);
  };

  return (
    <form id="createCustomerForm" onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label htmlFor="name" className="block text-sm font-medium">
          Name
        </label>
        <input
          type="text"
          id="name"
          name="name"
          required
          className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2"
        />
      </div>
      
      <div>
        <label htmlFor="email" className="block text-sm font-medium">
          Email
        </label>
        <input
          type="email"
          id="email"
          name="email"
          required
          className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2"
        />
      </div>
      
      <div>
        <label htmlFor="image_url" className="block text-sm font-medium">
          Image URL
        </label>
        <input
          type="url"
          id="image_url"
          name="image_url"
          required
          className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2"
        />
      </div>

      {error && (
        <div className="text-red-500 text-sm">{error}</div>
      )}

      <button
        type="submit"
        disabled={isPending}
        className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 disabled:opacity-50"
      >
        {isPending ? 'Creating...' : 'Create Customer'}
      </button>
    </form>
  );
} 