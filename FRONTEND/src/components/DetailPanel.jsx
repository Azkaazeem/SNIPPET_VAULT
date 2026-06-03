import { motion } from 'framer-motion';
import { Code2, Copy, Expand, Pencil, Trash2, X } from 'lucide-react';
import CodeBlock from './CodeBlock.jsx';

export default function DetailPanel({ snippet, onClose, onCopy }) {
  return (
    <motion.div
      className="fixed inset-0 z-40 bg-black/72 backdrop-blur-[1px]"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={onClose}
    >
      <motion.aside
        initial={{ x: '100%' }}
        animate={{ x: 0 }}
        exit={{ x: '100%' }}
        transition={{ type: 'spring', stiffness: 250, damping: 30 }}
        onClick={(event) => event.stopPropagation()}
        className="ml-auto h-full w-full max-w-[640px] overflow-y-auto border-l border-red-500 bg-black/96 px-5 py-6 shadow-[-16px_0_42px_rgba(255,0,0,0.30)] sm:px-7"
      >
        <div className="mb-5 flex items-start justify-between gap-5">
          <div>
            <h2 className="mb-4 text-[26px] font-bold leading-tight text-white sm:text-[30px]">
              {snippet.id === 'animated-side-navigation'
                ? 'Animated Side Navigation'
                : snippet.title}
            </h2>
            <span className="inline-flex rounded-md bg-red-600 px-4 py-2 text-[14px] font-semibold text-white">
              {snippet.category}
            </span>
          </div>

          <button
            type="button"
            onClick={onClose}
            title="Close"
            className="mt-1 rounded-md p-1 text-white transition hover:bg-white/10"
          >
            <X size={26} />
          </button>
        </div>

        <div className="mb-5 flex items-center justify-end gap-3 border-b border-white/15 pb-5">
          <button
            type="button"
            title="Edit"
            className="grid h-11 w-12 place-items-center rounded-md border border-white/30 text-white transition hover:border-red-500 hover:text-red-500"
          >
            <Pencil size={21} />
          </button>
          <button
            type="button"
            title="Delete"
            className="grid h-11 w-12 place-items-center rounded-md border border-red-500 text-red-500 transition hover:bg-red-500/10"
          >
            <Trash2 size={21} />
          </button>
        </div>

        <div className="mb-4 flex items-center justify-between">
          <div className="flex items-center gap-3 text-[17px] font-semibold">
            <Code2 size={24} />
            <span>Code</span>
          </div>
          <button
            type="button"
            className="flex h-10 items-center gap-2 rounded-md border border-white/25 px-3 text-[14px] text-white transition hover:border-red-500"
          >
            Expand <Expand size={17} />
          </button>
        </div>

        <div className="overflow-hidden rounded-md border border-white/20 bg-black/70">
          <div className="flex h-9 items-center justify-between border-b border-white/12 px-4">
            <div className="flex gap-2">
              <span className="h-3 w-3 rounded-full bg-red-600" />
              <span className="h-3 w-3 rounded-full bg-gray-500" />
              <span className="h-3 w-3 rounded-full bg-gray-500" />
            </div>
            <span className="text-[14px] text-gray-400">HTML</span>
          </div>
          <CodeBlock
            numbered
            code={snippet.code}
            className="max-h-[520px] overflow-auto p-5 text-[14px] leading-[1.48] sm:text-[15px]"
          />
        </div>

        <button
          type="button"
          onClick={onCopy}
          className="mt-5 flex h-12 w-full items-center justify-center gap-3 rounded-md bg-red-600 text-[17px] font-semibold text-white shadow-[0_0_25px_rgba(255,0,0,0.24)] transition hover:bg-red-500"
        >
          <Copy size={24} />
          Copy Code
        </button>
      </motion.aside>
    </motion.div>
  );
}
