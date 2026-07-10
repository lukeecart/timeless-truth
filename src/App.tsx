import { FiFileText } from "react-icons/fi";
import "./App.css";
import { useState } from "react";

import { TractCard } from "./components/TractCard";
import { tracts, type Tract } from "./tractInfo";
import { FilterTabs } from "./components/filterTabs";

export type Category = "all" | "seasonal" | "year-round" | "calendar";
export default function App() {
  const [activeFilter, setActiveFilter] = useState<Category>("all");
  const [searchQuery, setSearchQuery] = useState("");

  const matchesSearch = (tract: Tract, query: string): boolean => {
    if (query === "") return true;
    const lowerQuery = query.toLowerCase();
    return tract.title.toLowerCase().includes(lowerQuery) ||
      tract.description.toLowerCase().includes(lowerQuery); // search in description as well
  };

  const filtered = tracts.filter((t) => {
    const matchesCategory = activeFilter === "all" || t.category === activeFilter;
    const matchesQuery = matchesSearch(t, searchQuery);

    return matchesCategory && matchesQuery;
  });

  return (
    <div className="min-h-screen flex flex-col bg-background font-body">
      {/* Header */}
      <header className="border-b border-border bg-card sticky top-0 z-30">
        <div className="max-w-7xl mx-auto px-6 py-0 flex items-center justify-between h-16">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-primary rounded-sm flex items-center justify-center shrink-0">
              <FiFileText size={16} className="text-primary-foreground" />
            </div>
            <div>
              <span className="font-bold text-foreground tracking-tight text-lg leading-none font-display">
                Timeless truth
              </span>
            </div>
          </div>
        </div>
      </header>

      {/* Hero */}
      <section className="bg-primary text-primary-foreground py-14 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="max-w-xl">
            <p className="text-xs font-mono tracking-[0.15em] text-primary-foreground/60 mb-3 uppercase">
              Free to view & download
            </p>
            <h1 className="text-4xl sm:text-5xl font-bold leading-tight mb-4 tracking-tight font-display">
              Gospel tracts
            </h1>
            <p className="text-primary-foreground/75 text-base leading-relaxed">
              Browse our collection of Gospel tracts and download any one as a PDF.
            </p>
          </div>
        </div>
      </section>

      <FilterTabs
        activeFilter={activeFilter}
        setActiveFilter={setActiveFilter}
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        filtered={filtered}
      />

      {/* Content */}
      <main className="flex-1 w-full max-w-7xl mx-auto px-6 py-10">
        {filtered.length === 0 ? (
          <div className="text-center py-24 text-muted-foreground">
            <FiFileText size={40} className="mx-auto mb-4 opacity-30" />
            <p className="text-lg font-medium text-foreground mb-1 font-display">No tracts found</p>
            <p className="text-sm">Try adjusting your filters or search term.</p>
          </div>
        ) : (
          <div className="space-y-12">
            <section>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
                {filtered.map((tract) => (
                  <TractCard key={tract.id} tract={tract} />
                ))}
              </div>
            </section>
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className="border-t border-border mt-16 py-8 px-6 bg-card">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <div className="w-5 h-5 bg-primary rounded-sm flex items-center justify-center">
              <FiFileText size={10} className="text-primary-foreground" />
            </div>
            <span className="text-sm font-semibold text-foreground font-display">Timeless truth</span>
          </div>
          <p className="text-muted-foreground text-xs">
            All tracts are free to download and distribute. The main text should not be edited or changed in any way.
          </p>
          <p className="text-muted-foreground text-xs font-mono">
            &copy; {new Date().getFullYear()} Timeless truth. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
}
