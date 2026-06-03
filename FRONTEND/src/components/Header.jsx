import { Code2, Menu, Plus, Search } from 'lucide-react';

export default function Header({ query, onQueryChange, onCreate, onMenuClick }) {
  return (
    <header className="fixed left-0 right-0 top-0 z-30 border-b border-white/12 bg-black/94 backdrop-blur-xl">
      <div className="flex min-h-[72px] flex-wrap items-center justify-between gap-4 px-4 py-3 sm:px-5 lg:flex-nowrap">
        <button
          type="button"
          title="Open menu"
          onClick={onMenuClick}
          className="grid h-10 w-10 shrink-0 place-items-center rounded-md border border-white/15 text-white transition hover:border-red-500 hover:text-red-500 lg:hidden"
        >
          <Menu size={20} />
        </button>

        <div className="flex min-w-0 items-center gap-3 lg:min-w-[280px]">
          <div className="grid h-10 w-10 shrink-0 place-items-center rounded-md border-2 border-red-500 text-red-500 shadow-[0_0_12px_rgba(255,0,0,0.12)] sm:h-10 sm:w-10">
            <Code2 size={22} strokeWidth={2.5} />
          </div>
          <h1 className="hidden truncate text-xl leading-none tracking-normal sm:block sm:text-2xl font-bold">
            <span className="text-white">SNIPPET</span>{' '}
            <span className="text-red-600 font-normal">VAULT</span>
          </h1>
        </div>

        <label className="order-3 flex h-10 w-full items-center gap-3 rounded-lg border border-white/20 bg-black/80 px-4 text-gray-500 shadow-inner shadow-white/[0.02] focus-within:border-red-500/70 sm:order-none sm:flex-1 lg:max-w-[480px]">
          <Search size={18} className="shrink-0 text-gray-400" />
          <input
            value={query}
            onChange={(event) => onQueryChange(event.target.value)}
            placeholder="Search snippets..."
            className="h-full w-full bg-transparent text-sm text-white outline-none placeholder:text-gray-500"
          />
        </label>

        <button
          type="button"
          onClick={onCreate}
          className="order-2 flex h-10 shrink-0 items-center justify-center gap-2 rounded-lg bg-red-600 px-4 text-sm font-semibold text-white shadow-[0_0_18px_rgba(255,0,0,0.18)] transition hover:bg-red-500 active:scale-[0.99] sm:order-none sm:px-5 ml-auto"
        >
          <Plus size={18} />
          <span className="hidden sm:inline">Add New Snippet</span>
          <span className="sm:hidden">Add</span>
        </button>
      </div>
    </header>
  );
}
