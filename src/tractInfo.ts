import type { Category } from "./App";

export interface Tract {
	id: number;
	title: string;
	description: string;
	category: Category;
	imageId: string;
}

export const tracts: Tract[] = [
	{
		id: 1,
		title: "What time is it?",
		description: "Are you ready to meet God? This tract explains the urgency of salvation and the importance of being prepared for eternity.",
		category: "seasonal",
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
		category: "seasonal",
		imageId: "photo-1783313207203-3d039ba6d2a5",
	},
		{
		id: 4,
		title: "Kids Calendar 2027",
		description: "This is the 2027 Calendar for kids. It features fun activities and important dates for children to enjoy throughout the year.",
		category: "calendar",
		imageId: "photo-1624969862293-b749659ccc4e", // unsplash image id for the kids calendar
	},
			{
		id: 5,
		title: "Calendar 2027",
		description: "This is the 2027 Calendar. It features important dates and events for the year, helping you stay organized and plan ahead.",
		category: "calendar",
		imageId: "photo-1649298173603-9c95aa950879", //unspladh image id for the calendar
	}
];