interface IndustryFilterProps {
  industries: string[];
  value: string;
  onChange: (value: string) => void;
}

const ALL_INDUSTRIES = 'All industries';

function IndustryFilter({ industries, value, onChange }: IndustryFilterProps) {
  return (
    <select
      className="rounded-lg border border-slate-300 bg-slate-50 px-3 py-2 text-slate-900 outline-none transition focus:border-violet-500 focus:ring-2 focus:ring-violet-500/30 dark:border-slate-600 dark:bg-slate-800 dark:text-white"
      aria-label="Filter accounts by industry"
      value={value}
      onChange={(event) => onChange(event.target.value)}
    >
      <option value="">{ALL_INDUSTRIES}</option>
      {industries.map((industry) => (
        <option key={industry} value={industry}>
          {industry}
        </option>
      ))}
    </select>
  );
}

export default IndustryFilter;
