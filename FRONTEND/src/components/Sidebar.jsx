import { AnimatePresence, motion } from 'framer-motion';
import {
  Bookmark,
  Code2,
  FileCode2,
  Grid2X2,
  Heading1,
  Home,
  Palette,
  Settings,
  Star,
  X,
  Zap,
} from 'lucide-react';

const navItems = [
  { label: 'All Snippets', icon: Home },
  { label: 'Tailwind CSS', icon: Code2 },
  { label: 'Colors', icon: Palette },
  { label: 'SVGs', icon: Star },
  { label: 'Components', icon: Grid2X2 },
  { label: 'Typography', icon: Heading1 },
  { label: 'Animations', icon: Zap },
  { label: 'JavaScript', icon: FileCode2 },
  { label: 'Favorites', icon: Bookmark },
];

function SidebarContent({ activeCategory, onCategoryChange, onClose, mobile = false }) {
  return (
    <nav className="flex h-full flex-col px-2 py-3">
      {mobile && (
        <div className="mb-2 flex items-center justify-between px-3 py-2">
          <span className="text-sm font-semibold uppercase tracking-[0.18em] text-gray-400">
            Menu
          </span>
          <button
            type="button"
            title="Close menu"
            onClick={onClose}
            className="rounded-md p-2 text-white transition hover:bg-white/10"
          >
            <X size={22} />
          </button>
        </div>
      )}

      <div className="space-y-2">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = activeCategory === item.label;

          return (
            <button
              key={item.label}
              type="button"
              onClick={() => onCategoryChange(item.label)}
              className={`group flex h-12 w-full items-center gap-4 rounded-md px-4 text-left text-[15px] transition-colors ${
                isActive
                  ? 'bg-white/[0.04] text-red-500'
                  : 'text-gray-400 hover:bg-white/[0.025] hover:text-white'
              }`}
            >
              <Icon
                size={23}
                strokeWidth={2.2}
                className={isActive ? 'text-red-500' : 'text-gray-400 group-hover:text-red-500'}
              />
              <span>{item.label}</span>
            </button>
          );
        })}
      </div>

      <div className="mt-auto border-t border-white/12 pt-4">
        <button
          type="button"
          className="group flex h-12 w-full items-center gap-4 rounded-md px-4 text-left text-[15px] text-gray-400 transition-colors hover:bg-white/[0.025] hover:text-white"
        >
          <Settings size={23} className="group-hover:text-red-500" />
          <span>Settings</span>
        </button>
      </div>
    </nav>
  );
}

export default function Sidebar({ activeCategory, onCategoryChange, isOpen, onClose }) {
  return (
    <>
      <aside className="fixed left-0 top-[72px] z-20 hidden h-[calc(100vh-72px)] w-[220px] border-r border-white/15 bg-black/94 lg:block">
        <SidebarContent activeCategory={activeCategory} onCategoryChange={onCategoryChange} />
      </aside>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="fixed inset-0 z-40 bg-black/65 backdrop-blur-sm lg:hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
          >
            <motion.aside
              initial={{ x: '-100%' }}
              animate={{ x: 0 }}
              exit={{ x: '-100%' }}
              transition={{ type: 'spring', stiffness: 260, damping: 28 }}
              onClick={(event) => event.stopPropagation()}
              className="h-full w-[min(82vw,300px)] border-r border-red-500/70 bg-black shadow-[16px_0_38px_rgba(255,0,0,0.22)]"
            >
              <SidebarContent
                mobile
                activeCategory={activeCategory}
                onCategoryChange={onCategoryChange}
                onClose={onClose}
              />
            </motion.aside>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
