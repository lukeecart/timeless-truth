import { FiDownload } from "react-icons/fi";
import type { Tract } from "../tractInfo";
import { CategoryBadge } from "./categoryBadge";

export function TractCard({ tract }: { tract: Tract }) {

	const handleDownload = () => {
		const link = document.createElement("a");
		link.href = "#";
		link.download = `${tract.title.replace(/\s+/g, "-").toLowerCase()}.pdf`;
		link.click();
	};

	const getCategoryLabel = (category: string) => {
		switch (category) {
			case "seasonal":
				return (CategoryBadge({ label: "Seasonal", bgColor: "bg-accent", textColor: "text-accent-foreground" }))
			case "year-round":
				return (CategoryBadge({ label: "All year round", bgColor: "bg-primary", textColor: "text-primary-foreground" }))
			case "calendar":
				return (CategoryBadge({ label: "Calendars", bgColor: "bg-blue-500", textColor: "text-white" }))
			default:
				return category;
		}
	};

	return (
		<article className="bg-card rounded-sm overflow-hidden border border-border group flex flex-col transition-shadow duration-200 hover:shadow-lg hover:shadow-black/8 relative">
			<div className="absolute top-3 right-3 z-10">
				{getCategoryLabel(tract.category)}
			</div>
			<div className="relative overflow-hidden aspect-3/2 bg-muted">
				<img
					src={`https://images.unsplash.com/${tract.imageId}?w=600&h=400&fit=crop&auto=format`}
					alt={tract.title}
				/>
			</div>

			<div className="flex flex-col flex-1 p-5">
				<h3 className="font-semibold text-foreground leading-snug mb-1.5 text-[0.95rem] font-display">
					{tract.title}
				</h3>
				<p className="text-muted-foreground text-sm leading-relaxed flex-1 mb-4 font-body">
					{tract.description}
				</p>
				<button
					onClick={handleDownload}
					className="w-full flex items-center justify-center gap-2 bg-primary text-primary-foreground py-2.5 px-4 rounded-sm text-sm font-medium transition-all duration-150 hover:opacity-90 active:scale-[0.98] cursor-pointer font-display"

				>
					<FiDownload size={14} />
					Download PDF
				</button>
			</div>
		</article>
	);
}