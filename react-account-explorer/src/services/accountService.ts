import accountsData from '../data/Account_Sample_Data.json';
import type { Account } from '../types/Account';

// Single entry point for account data; swap the implementation here (e.g. an API call)
// without touching any component that consumes it.
export async function fetchAccounts(): Promise<Account[]> {
  return accountsData as Account[];
}
