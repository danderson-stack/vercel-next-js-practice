import postgres from 'postgres';
import { fetchFilteredCustomers } from '@/app/lib/data';
import { createCustomer } from '@/app/lib/actions';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const query = searchParams.get('query') || '';

  try {
    return Response.json((await fetchFilteredCustomers(query)));
  } catch (error) {
    console.error('Error fetching customers:', error);
    return Response.json({ error: 'Failed to fetch customers' }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const formData = await request.formData();
    const result = await createCustomer(formData);
    
    if (result.errors) {
      return Response.json(result, { status: 400 });
    }
    
    return Response.json(result);
  } catch (error) {
    console.error('Error creating customer:', error);
    return Response.json(
      { error: 'Failed to create customer' },
      { status: 500 }
    );
  }
}
