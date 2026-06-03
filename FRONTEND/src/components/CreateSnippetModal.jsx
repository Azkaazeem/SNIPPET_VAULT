import { useState } from 'react';
import { motion } from 'framer-motion';
import { ChevronDown, Maximize2, X } from 'lucide-react';

const starterCode = `<button class="group relative inline-flex items-center
  justify-center px-6 py-3 font-medium
  bg-red-600 text-white rounded-lg
  overflow-hidden transition-all
  duration-300 hover:bg-red-700
  hover:shadow-[0_0_20px_rgba(255,0,0,0.4)]">
  <span class="absolute inset-0 w-full h-full
  bg-red-500 opacity-0 group-hover:opacity-20
  transition-opacity duration-300"></span>
  <span class="relative z-10">Click Me</span>
</button>`;

export default function CreateSnippetModal({ onClose, onSave }) {
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState('Tailwind CSS');
  const [code, setCode] = useState(starterCode);
  const lineNumbers = Array.from({ length: code.split('\n').length }, (_, index) => index + 1);

  const submit = (event) => {
    event.preventDefault();
    onSave({
      title: title || 'Untitled Snippet',
      category,
      language: 'HTML',
      code,
    });
  };

  return (
    <motion.div
      className="fixed inset-0 z-50 grid place-items-center overflow-y-auto bg-black/56 px-4 py-5 backdrop-blur-[7px]"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={onClose}
    >
      <motion.form
        onSubmit={submit}
        initial={{ opacity: 0, scale: 0.92, y: 18 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.94, y: 12 }}
        transition={{ type: 'spring', stiffness: 260, damping: 24 }}
        onClick={(event) => event.stopPropagation()}
        className="w-full max-w-[820px] rounded-lg border border-red-500 bg-[#111]/95 p-6 shadow-[0_0_35px_rgba(255,0,0,0.48)] sm:p-8"
      >
        <div className="mb-5 flex items-center justify-between">
          <h2 className="text-[26px] font-bold leading-none text-white sm:text-[30px]">
            Create New Asset
          </h2>
          <button
            type="button"
            onClick={onClose}
            title="Close"
            className="rounded-md p-1 text-white transition hover:bg-white/10"
          >
            <X size={26} />
          </button>
        </div>

        <label className="mb-5 block">
          <span className="mb-3 block text-[16px] font-semibold text-white">Asset Title</span>
          <input
            value={title}
            onChange={(event) => setTitle(event.target.value)}
            placeholder="e.g., Primary Gradient Button"
            className="h-12 w-full rounded-md border border-white/20 bg-black/35 px-4 text-[16px] text-white outline-none placeholder:text-gray-500 focus:border-red-500"
          />
        </label>

        <label className="mb-5 block">
          <span className="mb-3 block text-[16px] font-semibold text-white">Category</span>
          <span className="relative block">
            <select
              value={category}
              onChange={(event) => setCategory(event.target.value)}
              className="h-12 w-full appearance-none rounded-md border border-red-500 bg-black/30 px-4 text-[16px] text-white outline-none"
            >
              <option>Tailwind CSS</option>
              <option>Colors</option>
              <option>SVGs</option>
              <option>Components</option>
              <option>Typography</option>
              <option>Animations</option>
              <option>JavaScript</option>
            </select>
            <ChevronDown
              size={24}
              className="pointer-events-none absolute right-5 top-1/2 -translate-y-1/2 text-white"
            />
          </span>
        </label>

        <div className="mb-4 flex items-center justify-between">
          <span className="text-[16px] font-semibold text-white">Code / Content</span>
          <div className="flex items-center gap-5 text-red-500">
            <button type="button" className="flex items-center gap-2 text-[15px]">
              HTML <ChevronDown size={18} />
            </button>
            <span className="h-8 w-px bg-white/15" />
            <button type="button" title="Expand" className="rounded p-1 hover:bg-red-500/10">
              <Maximize2 size={22} />
            </button>
          </div>
        </div>

        <div className="flex h-[286px] overflow-hidden rounded-md border border-white/20 bg-black/45 focus-within:border-red-500 sm:h-[330px]">
          <div className="code-scroll w-12 overflow-hidden py-4 pr-3 text-right font-mono text-[14px] leading-[1.55] text-gray-500">
            {lineNumbers.map((line) => (
              <div key={line}>{line}</div>
            ))}
          </div>
          <textarea
            value={code}
            onChange={(event) => setCode(event.target.value)}
            spellCheck="false"
            className="code-scroll h-full min-w-0 flex-1 resize-none bg-transparent py-4 pr-4 font-mono text-[14px] leading-[1.55] text-gray-200 outline-none sm:text-[15px]"
          />
        </div>

        <div className="mt-5 flex items-center justify-end gap-5 border-t border-white/12 pt-4">
          <button
            type="button"
            onClick={onClose}
            className="h-11 px-4 text-[16px] font-semibold text-white transition hover:text-red-300"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="h-11 rounded-md bg-red-600 px-6 text-[16px] font-semibold text-white shadow-[0_0_22px_rgba(255,0,0,0.25)] transition hover:bg-red-500"
          >
            Save Snippet
          </button>
        </div>
      </motion.form>
    </motion.div>
  );
}
