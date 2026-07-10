import { IoSnowOutline, IoSunnyOutline, IoGridOutline } from "react-icons/io5";
import { FiSearch } from "react-icons/fi";
import type { Category } from "../App";


export const FilterTabs = ({ activeFilter, setActiveFilter, searchQuery, setSearchQuery, filtered }: { activeFilter: Category; setActiveFilter: (filter: Category) => void; searchQuery: string; setSearchQuery: (query: string) => void; filtered: any[] }) => {
	const buttonLabel = (category: Category) => {
		switch (category) {
			case "all":
				return "All tracts";
			case "seasonal":
				return "Seasonal";
			case "year-round":
				return "All year round";
			case "calendar":
				return "Calendars";
			default:
				return category;
		}
	};

	type Category = "all" | "seasonal" | "year-round" | "calendar";

const getFilterButtonClass = (category: Category, isActive: boolean): string => {
  const baseClasses = "flex items-center gap-1.5 px-3 py-1.5 rounded-[3px] text-sm font-medium transition-all duration-150 cursor-pointer whitespace-nowrap";
  
  if (isActive) {
    const activeStyles: Record<Category, string> = {
      seasonal: "bg-accent text-accent-foreground shadow-sm",
      calendar: "bg-blue-500 text-white shadow-sm",
      all: "bg-primary text-primary-foreground shadow-sm",
      "year-round": "bg-primary text-primary-foreground shadow-sm"
    };
    
    return `${baseClasses} ${activeStyles[category]}`;
  }
  
  return `${baseClasses} text-muted-foreground hover:text-foreground`;
};

	return (
		<div className="border-b border-border sticky top-16 z-20">
			<div className="max-w-7xl mx-auto px-4 sm:px-6 bg-card">
				<div className="flex flex-col gap-3 py-4">
					{/* Category tabs */}
					<div className="flex flex-col sm:flex-row gap-1 p-1 bg-muted rounded-sm w-full sm:w-auto">
						{(["all", "seasonal", "year-round", "calendar"] as Category[]).map((cat) => (
							<button
								key={cat}
								onClick={() => setActiveFilter(cat)}
								className={getFilterButtonClass(cat, activeFilter === cat)}

							>
								{cat === "seasonal" && <IoSnowOutline size={12} />}
								{cat === "year-round" && <IoSunnyOutline size={12} />}
								{cat === "calendar" && <IoGridOutline size={12} />}
								{buttonLabel(cat)}
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
	)
}