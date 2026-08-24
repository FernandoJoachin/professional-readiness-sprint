interface EmptyStateProps {
  message?: string;
}

function EmptyState({ message = 'No accounts match your search.' }: EmptyStateProps) {
  return (
    <div className="flex flex-col items-center gap-3 rounded-lg border border-dashed border-slate-300 px-6 py-12 text-center dark:border-slate-700">
      <svg
        className="h-10 w-10 text-slate-400"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        aria-hidden="true"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={1.5}
          d="M21 21l-4.35-4.35M17 10a7 7 0 11-14 0 7 7 0 0114 0z"
        />
      </svg>
      <p className="text-sm text-slate-500 dark:text-slate-400" role="status">
        {message}
      </p>
    </div>
  );
}

export default EmptyState;
