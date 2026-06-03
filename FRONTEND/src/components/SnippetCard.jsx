import { motion } from 'framer-motion';
import { Copy, Pencil, Trash2 } from 'lucide-react';
import CodeBlock from './CodeBlock.jsx';
import { iconMap } from './icons.js';

export default function SnippetCard({ snippet, index, onOpen, onCopy, onEdit, onDelete }) {
  const Icon = iconMap[snippet.icon] || iconMap.Code2;

  const onAction = (event, action) => {
    event.stopPropagation();
    action();
  };

  return (
    <motion.article
      layout
      initial={{ opacity: 0, y: 18 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.035, duration: 0.28 }}
      whileHover={{ y: -3, borderColor: 'rgba(255, 23, 23, 0.75)' }}
      onClick={onOpen}
      className={`group flex min-h-[270px] cursor-pointer flex-col rounded-lg border bg-black/72 p-4 transition-colors ${
        snippet.featured
          ? 'border-red-500 shadow-[0_0_22px_rgba(255,0,0,0.35)]'
          : 'border-white/20 hover:shadow-[0_0_20px_rgba(255,0,0,0.16)]'
      }`}
    >
      <div className="mb-3 flex items-center gap-3">
        <Icon size={31} strokeWidth={2.4} className="shrink-0 text-red-500" />
        <h2 className="min-w-0 flex-1 truncate text-[18px] font-semibold text-white">
          {snippet.title}
        </h2>
        <span className="rounded-md bg-white/[0.055] px-3 py-2 text-[13px] text-white shadow-lg shadow-black">
          {snippet.category}
        </span>
      </div>

      <div className="h-[154px] overflow-hidden rounded-md border border-white/15 bg-black/70 p-3">
        <CodeBlock code={snippet.code} />
      </div>

      <div className="mt-auto grid grid-cols-3 items-center pt-3 text-gray-300">
        <button
          type="button"
          title="Copy"
          onClick={(event) => onAction(event, onCopy)}
          className="mx-auto rounded-md p-2 transition hover:bg-white/8 hover:text-white"
        >
          <Copy size={22} />
        </button>
        <button
          type="button"
          title="Edit"
          onClick={(event) => onAction(event, onEdit)}
          className="mx-auto rounded-md p-2 transition hover:bg-white/8 hover:text-white"
        >
          <Pencil size={22} />
        </button>
        <button
          type="button"
          title="Delete"
          onClick={(event) => onAction(event, onDelete)}
          className="mx-auto rounded-md p-2 text-red-500 transition hover:bg-red-500/10 hover:text-red-400"
        >
          <Trash2 size={22} />
        </button>
      </div>
    </motion.article>
  );
}
