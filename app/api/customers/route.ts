import postgres from 'postgres';
import { fetchFilteredCustomers } from '@/app/lib/data';

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