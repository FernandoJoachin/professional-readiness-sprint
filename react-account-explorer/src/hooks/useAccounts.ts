import { useEffect, useState } from 'react';
import type { Account } from '../types/Account';
import { fetchAccounts } from '../services/accountService';

interface UseAccountsResult {
  accounts: Account[];
  isLoading: boolean;
  error: Error | null;
}

export function useAccounts(): UseAccountsResult {
  const [accounts, setAccounts] = useState<Account[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    let isMounted = true;

    fetchAccounts()
      .then((data) => {
        if (isMounted) {
          setAccounts(data);
        }
      })
      .catch((err: unknown) => {
        if (isMounted) {
          setError(err instanceof Error ? err : new Error('Failed to load accounts'));
        }
      })
      .finally(() => {
        if (isMounted) {
          setIsLoading(false);
        }
      });

    return () => {
      isMounted = false;
    };
  }, []);

  return { accounts, isLoading, error };
}
