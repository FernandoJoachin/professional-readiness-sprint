interface SearchBarProps {
  value: string;
  onChange: (value: string) => void;
}

function SearchBar({ value, onChange }: SearchBarProps) {
  return (
    <div className="relative min-w-[220px] flex-1">
      <svg
        className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        aria-hidden="true"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M21 21l-4.35-4.35M17 10a7 7 0 11-14 0 7 7 0 0114 0z"
        />
      </svg>
      <input
        type="search"
        className="w-full rounded-lg border border-slate-300 bg-slate-50 py-2 pl-9 pr-3 text-slate-900 outline-none transition focus:border-violet-500 focus:ring-2 focus:ring-violet-500/30 dark:border-slate-600 dark:bg-slate-800 dark:text-white"
        placeholder="Search by name or phone number"
        aria-label="Search accounts by name or phone number"
        value={value}
        onChange={(event) => onChange(event.target.value)}
      />
    </div>
  );
}

export default SearchBar;
