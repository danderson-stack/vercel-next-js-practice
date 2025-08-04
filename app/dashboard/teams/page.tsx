import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Teams',
};

/**
 * TODO: (@danderson)
 * 
 * We want to be able to update this page to allow users to add customers to specific teams.
 * We must create a new table in the database to include a teams table.
 * This table will have a many-to-many relationship with the customers table.
 * This page will fetch both the customers and the teams from the database.
 * We will then render a list of teams, and customers for each team. 
 * We will also render a loose list of customers that are not assigned to any team.
 * These customers will be represented as a 'card' in a list.
 * The user will be able to drag and drop customers between teams, and add new customers to teams.
 * 
 */
export default function Page() {
  return <p>Teams Page</p>;
}