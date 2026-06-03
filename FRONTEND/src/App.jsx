import { useMemo, useState, useEffect } from 'react';
import { AnimatePresence } from 'framer-motion';
import toast, { Toaster } from 'react-hot-toast';
import { CheckCircle2, X } from 'lucide-react';
import Sidebar from './components/Sidebar.jsx';
import Header from './components/Header.jsx';
import SnippetCard from './components/SnippetCard.jsx';
import CreateSnippetModal from './components/CreateSnippetModal.jsx';
import DetailPanel from './components/DetailPanel.jsx';
import { snippets as initialSnippets } from './data/snippets.js';

export default function App() {
  const [snippets, setSnippets] = useState(initialSnippets);
  const [activeCategory, setActiveCategory] = useState('All Snippets');
  const [query, setQuery] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedSnippet, setSelectedSnippet] = useState(null);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [editingSnippet, setEditingSnippet] = useState(null);

  useEffect(() => {
    const loadSnippets = async () => {
      try {
        const response = await fetch('http://localhost:5000/api/snippets');
        if (response.ok) {
          const data = await response.json();

          const formattedSnippets = data.map((item) => ({
            id: item._id,
            icon: 'Code2',
            title: item.title,
            category: item.category,
            code: item.content,
          }));

          setSnippets(formattedSnippets);
        } else {
          toast.error('Failed to load snippets from database');
        }
      } catch (error) {
        console.error('Error fetching data:', error);
        toast.error('Network error while loading snippets');
      }
    };

    loadSnippets();
  }, [])

  const visibleSnippets = useMemo(() => {
    const cleanQuery = query.trim().toLowerCase();

    return snippets.filter((snippet) => {
      const matchesCategory =
        activeCategory === 'All Snippets' || snippet.category === activeCategory;
      const matchesQuery =
        !cleanQuery ||
        snippet.title.toLowerCase().includes(cleanQuery) ||
        snippet.category.toLowerCase().includes(cleanQuery) ||
        snippet.code.toLowerCase().includes(cleanQuery);

      return matchesCategory && matchesQuery;
    });
  }, [activeCategory, query, snippets]);

  const copySnippet = async (snippet) => {
    await navigator.clipboard.writeText(snippet.code);
    toast.custom((toastItem) => (
      <div
        className={`vault-copy-toast ${toastItem.visible ? 'translate-y-0 opacity-100' : '-translate-y-3 opacity-0'
          }`}
      >
        <CheckCircle2 size={28} className="text-red-400" />
        <span>Copied to Clipboard!</span>
        <button
          type="button"
          title="Close notification"
          onClick={() => toast.dismiss(toastItem.id)}
          className="ml-auto rounded p-1 text-gray-300 transition hover:bg-white/10 hover:text-white"
        >
          <X size={24} />
        </button>
      </div>
    ));
  };

  const saveSnippet = async (snippet) => {
    try {
      const response = await fetch('http://localhost:5000/api/snippets', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(snippet),
      });

      if (response.ok) {
        const savedSnippet = await response.json();

        setSnippets((current) => [
          {
            id: savedSnippet._id,
            icon: 'Code2',
            title: savedSnippet.title,
            category: savedSnippet.category,
            code: savedSnippet.content,
          },
          ...current,
        ]);

        setIsModalOpen(false);
        toast.success('Snippet saved successfully!');
      } else {
        toast.error('Failed to save to database');
      }
    } catch (error) {
      console.error("Error:", error);
      toast.error('Network error while saving snippet');
    }
  };

  const deleteSnippet = async (id) => {
    try {
      // Backend ko delete karne ka bolo
      const response = await fetch(`http://localhost:5000/api/snippets/${id}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        // Agar database se delete ho jaye, toh screen (state) se bhi hata do
        setSnippets((current) => current.filter((item) => item.id !== id));
        toast.success('Snippet Deleted!');
      } else {
        toast.error('Failed to delete');
      }
    } catch (error) {
      console.error("Error:", error);
      toast.error('Network Error');
    }
  };

  const updateSnippet = async (updatedData) => {
    try {
      const response = await fetch(`http://localhost:5000/api/snippets/${editingSnippet.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updatedData),
      });

      if (response.ok) {
        const saved = await response.json();

        setSnippets((current) => current.map((item) =>
          item.id === editingSnippet.id
            ? { ...item, title: saved.title, category: saved.category, code: saved.content }
            : item
        ));

        setEditingSnippet(null);
        toast.success('Snippet Updated!');
      }
    } catch (error) {
      toast.error('Network Error while updating');
    }
  };

  return (
    <div className="min-h-screen bg-black text-white selection:bg-red-600 selection:text-white">
      <Toaster
        position="top-center"
        toastOptions={{
          duration: 2400,
          className: 'vault-toast',
          success: {
            iconTheme: {
              primary: '#ff1717',
              secondary: '#ffffff',
            },
          },
        }}
      />

      <div className="fixed inset-0 pointer-events-none bg-[radial-gradient(circle_at_45%_20%,rgba(255,0,0,0.08),transparent_26%),radial-gradient(circle_at_72%_78%,rgba(255,255,255,0.045),transparent_24%)]" />

      <Header
        query={query}
        onQueryChange={setQuery}
        onCreate={() => setIsModalOpen(true)}
        onMenuClick={() => setIsSidebarOpen(true)}
      />
      <Sidebar
        activeCategory={activeCategory}
        isOpen={isSidebarOpen}
        onClose={() => setIsSidebarOpen(false)}
        onCategoryChange={(category) => {
          setActiveCategory(category);
          setIsSidebarOpen(false);
        }}
      />

      <main className="relative pt-[144px] sm:pt-[126px] lg:pl-[220px] lg:pt-[72px]">
        <section className="grid gap-4 px-4 pb-8 sm:grid-cols-2 sm:px-5 xl:grid-cols-3">
          {visibleSnippets.map((snippet, index) => (
            <SnippetCard
              key={snippet.id}
              snippet={snippet}
              index={index}
              onOpen={() => setSelectedSnippet(snippet)}
              onCopy={() => copySnippet(snippet)}
              onEdit={() => setEditingSnippet(snippet)}
              onDelete={() => deleteSnippet(snippet.id)}
            />
          ))}
        </section>
      </main>

      <AnimatePresence>
        {(isModalOpen || editingSnippet) && (
          <CreateSnippetModal
            snippetToEdit={editingSnippet}
            onClose={() => {
              setIsModalOpen(false);
              setEditingSnippet(null);
            }}
            onSave={editingSnippet ? updateSnippet : saveSnippet}
          />
        )}
      </AnimatePresence>

      <AnimatePresence>
        {selectedSnippet && (
          <DetailPanel
            snippet={selectedSnippet}
            onClose={() => setSelectedSnippet(null)}
            onCopy={() => copySnippet(selectedSnippet)}
          />
        )}
      </AnimatePresence>
    </div>
  );
}
