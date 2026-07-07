import { useState } from "react";
import { FiFileText, FiSearch } from "react-icons/fi";
import { IoSnowOutline, IoSunnyOutline, IoGridOutline } from "react-icons/io5";
import "./App.css";
import { tracts } from "./tractInfo";
import { TractCard } from "./components/TractCard";

type Category = "all" | "christmas" | "year-round";

export default function App() {
  const [activeFilter, setActiveFilter] = useState<Category>("all");
  const [searchQuery, setSearchQuery] = useState("");

  const filtered = tracts.filter((t) => {
    const matchesCategory = activeFilter === "all" || t.category === (activeFilter === "christmas" ? "christmas" : "year-round");
    const matchesSearch = searchQuery === "" || t.title.toLowerCase().includes(searchQuery.toLowerCase()) || t.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
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

      {/* Filter bar */}
      <div className="border-b border-border sticky top-16 z-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 bg-card">
          <div className="flex flex-col gap-3 py-4">
            {/* Category tabs */}
            <div className="flex flex-wrap gap-1 p-1 bg-muted rounded-sm w-full sm:w-auto">
              {(["all", "christmas", "year-round"] as Category[]).map((cat) => (
                <button
                  key={cat}
                  onClick={() => setActiveFilter(cat)}
                  className={`flex items-center gap-1.5 px-3 py-1.5 rounded-[3px] text-sm font-medium transition-all duration-150 cursor-pointer whitespace-nowrap ${activeFilter === cat
                      ? cat === "christmas"
                        ? "bg-accent text-accent-foreground shadow-sm"
                        : "bg-primary text-primary-foreground shadow-sm"
                      : "text-muted-foreground hover:text-foreground"
                    }`}

                >
                  {cat === "christmas" && <IoSnowOutline size={12} />}
                  {cat === "year-round" && <IoSunnyOutline size={12} />}
                  {cat === "all" && <IoGridOutline size={12} />}
                  {cat === "all" ? "All tracts" : cat === "christmas" ? "Christmas" : "All year round"}
                </button>
              ))}
              
            {/* Search */}
            <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:gap-3">
              <div className="relative w-full sm:flex-1 sm:max-w-xs">
                <FiSearch size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground pointer-events-none" />
                <input
                  type="text"
                  placeholder="Search tracts..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full bg-card border border-border text-foreground placeholder:text-muted-foreground text-sm pl-9 pr-3 py-2 rounded-sm focus:outline-none focus:ring-2 focus:ring-ring"
                />
              </div>

              <div className="text-muted-foreground text-sm font-mono shrink-0">
                {filtered.length} result{filtered.length !== 1 ? "s" : ""}
              </div>
            </div>
            </div>

          </div>
        </div>
      </div>

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
            All tracts are free to download and distribute.
          </p>
          <p className="text-muted-foreground text-xs font-mono">
            &copy; {new Date().getFullYear()} Timeless truth. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
}
