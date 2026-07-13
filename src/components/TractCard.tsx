import { useState } from "react";
import { FiChevronLeft, FiChevronRight, FiDownload, FiX } from "react-icons/fi";
import type { Tract } from "../tractInfo";
import { CategoryBadge } from "./categoryBadge";

export function TractCard({ tract }: { tract: Tract }) {
	const [isPreviewOpen, setIsPreviewOpen] = useState(false);
	const [activeImageIndex, setActiveImageIndex] = useState(0);

	const previewImages = [tract.frontImageId || tract.imageId, tract.backImageId || tract.imageId];

	const handleDownload = () => {
		const link = document.createElement("a");
		link.href = "#";
		link.download = `${tract.title.replace(/\s+/g, "-").toLowerCase()}.pdf`;
		link.click();
	};

	const openPreview = () => {
		setActiveImageIndex(0);
		setIsPreviewOpen(true);
	};

	const closePreview = () => {
		setIsPreviewOpen(false);
	};

	const showPreviousImage = (event: React.MouseEvent<HTMLButtonElement>) => {
		event.stopPropagation();
		setActiveImageIndex((currentIndex) => (currentIndex === 0 ? previewImages.length - 1 : currentIndex - 1));
	};

	const showNextImage = (event: React.MouseEvent<HTMLButtonElement>) => {
		event.stopPropagation();
		setActiveImageIndex((currentIndex) => (currentIndex === previewImages.length - 1 ? 0 : currentIndex + 1));
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
		<>
			<article className="bg-card rounded-sm overflow-hidden border border-border group flex flex-col transition-shadow duration-200 hover:shadow-lg hover:shadow-black/8 relative">
				<div className="absolute top-3 right-3 z-10">
					{getCategoryLabel(tract.category)}
				</div>
				<div className="relative overflow-hidden aspect-3/2 bg-muted">
					<button type="button" onClick={openPreview} className="h-full w-full cursor-zoom-in group" aria-label={`Preview ${tract.title}`}>
						<img
							src={`https://images.unsplash.com/${tract.imageId}?w=600&h=400&fit=crop&auto=format`}
							alt={tract.title}
							className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
						/>
					</button>
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

			{isPreviewOpen && (
				<div className="fixed inset-0 z-60 flex items-center justify-center bg-black/80 p-4" onClick={closePreview}>
					<div className="relative w-full max-w-5xl" onClick={(event) => event.stopPropagation()}>
						<button
							type="button"
							onClick={closePreview}
							className="absolute right-3 cursor-pointer top-3 z-10 flex h-10 w-10 items-center justify-center rounded-full bg-background/90 text-foreground shadow-lg transition hover:bg-background"
							aria-label="Close preview"
						>
							<FiX size={18} />
						</button>

						<div className="overflow-hidden rounded-xl border border-border bg-card shadow-2xl">
							<div className="relative bg-muted">
								<img
									src={`https://images.unsplash.com/${previewImages[activeImageIndex]}?w=1200&h=900&fit=crop&auto=format`}
									alt={`${tract.title} ${activeImageIndex === 0 ? "front" : "back"} view`}
									className="h-[70vh] w-full object-contain"
								/>
								{previewImages.length > 1 && (
									<>
										<button
											type="button"
											onClick={showPreviousImage}
											className="cursor-pointer absolute left-3 top-1/2 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full bg-background/90 text-foreground shadow-lg transition hover:bg-background"
											aria-label="Show previous image"
										>
											<FiChevronLeft size={18} />
										</button>
										<button
											type="button"
											onClick={showNextImage}
											className="cursor-pointer absolute right-3 top-1/2 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full bg-background/90 text-foreground shadow-lg transition hover:bg-background"
											aria-label="Show next image"
										>
											<FiChevronRight size={18} />
										</button>
									</>
								)}
							</div>

							<div className="flex items-center justify-between border-t border-border bg-card px-4 py-3">
								<div>
									<p className="text-sm font-semibold text-foreground">{activeImageIndex === 0 ? "Front" : "Back"}</p>
									<p className="text-xs text-muted-foreground">Use the arrows to switch between sides.</p>
								</div>
								<div className="flex gap-2">
									{previewImages.map((_, index) => (
										<button
											type="button"
											key={index}
											onClick={() => setActiveImageIndex(index)}
											className={`h-2.5 w-2.5 rounded-full transition ${activeImageIndex === index ? "bg-primary" : "bg-muted-foreground/40"}`}
											aria-label={`Show ${index === 0 ? "front" : "back"} image`}
										/>
									))}
								</div>
							</div>
						</div>
					</div>
				</div>
			)}
		</>
	);
}