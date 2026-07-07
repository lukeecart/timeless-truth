export interface Tract {
	id: number;
	title: string;
	description: string;
	category: "christmas" | "year-round";
	imageId: string;
}

export const tracts: Tract[] = [
	{
		id: 1,
		title: "What time is it?",
		description: "Are you ready to meet God? This tract explains the urgency of salvation and the importance of being prepared for eternity.",
		category: "christmas",
		imageId: "photo-1543589077-47d81606c1bf",
	},
	{
		id: 2,
		title: "I'll take my chance",
		description: "This tract presents the consequences of rejecting God's offer of salvation and the reality of eternal separation from Him.",
		category: "year-round",
		imageId: "photo-1512389142860-9c449e58a543",
	},
	{
		id: 3,
		title: "What is the meaning of Christmas?",
		description: "This tract explores the true meaning of Christmas, highlighting the birth of Jesus Christ and its significance for humanity.",
		category: "christmas",
		imageId: "photo-1783313207203-3d039ba6d2a5",
	}
];