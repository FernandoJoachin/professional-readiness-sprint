import { useMemo, useState } from 'react';
import type { Account } from '../../types/Account';
import { useAccounts } from '../../hooks/useAccounts';
import { usePagination } from '../../hooks/usePagination';
import SearchBar from '../SearchBar/SearchBar';
import IndustryFilter from '../IndustryFilter/IndustryFilter';
import Table, { type TableColumn } from '../Table/Table';
import EmptyState from '../EmptyState/EmptyState';
import Pagination from '../Pagination/Pagination';

const PAGE_SIZE = 5;

const columns: TableColumn<Account>[] = [
  { key: 'name', header: 'Name', render: (account) => account.name },
  { key: 'industry', header: 'Industry', render: (account) => account.industry },
  { key: 'phone', header: 'Phone', render: (account) => account.phone },
];

function matchesSearch(account: Account, term: string): boolean {
  const normalized = term.trim().toLowerCase();
  if (!normalized) {
    return true;
  }
  return (
    account.name.toLowerCase().includes(normalized) ||
    account.phone.toLowerCase().includes(normalized)
  );
}

function AccountExplorer() {
  const { accounts, isLoading, error } = useAccounts();
  const [search, setSearch] = useState('');
  const [industry, setIndustry] = useState('');

  const industries = useMemo(
    () => Array.from(new Set(accounts.map((account) => account.industry))).sort(),
    [accounts],
  );

  const filteredAccounts = useMemo(() => {
    return accounts
      .filter((account) => matchesSearch(account, search))
      .filter((account) => !industry || account.industry === industry)
      .sort((a, b) => a.name.localeCompare(b.name));
  }, [accounts, search, industry]);

  const { currentPage, totalPages, pagedItems, setCurrentPage, resetPage } = usePagination(
    filteredAccounts,
    PAGE_SIZE,
  );

  const handleSearchChange = (value: string) => {
    setSearch(value);
    resetPage();
  };

  const handleIndustryChange = (value: string) => {
    setIndustry(value);
    resetPage();
  };

  return (
    <section className="w-full max-w-3xl rounded-2xl bg-white p-6 text-left shadow-xl ring-1 ring-slate-900/5 sm:p-8 dark:bg-slate-900 dark:ring-white/10">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-slate-900 dark:text-white">Account Explorer</h1>
        <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
          Search and filter accounts by name, phone number or industry.
        </p>
      </div>

      <div className="mb-6 flex flex-wrap gap-3">
        <SearchBar value={search} onChange={handleSearchChange} />
        <IndustryFilter industries={industries} value={industry} onChange={handleIndustryChange} />
      </div>

      <Table
        columns={columns}
        data={pagedItems}
        getRowKey={(account) => account.id}
        emptyState={
          <EmptyState
            message={
              error
                ? 'Something went wrong while loading accounts.'
                : isLoading
                  ? 'Loading accounts…'
                  : undefined
            }
          />
        }
      />

      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={setCurrentPage}
      />
    </section>
  );
}

export default AccountExplorer;
