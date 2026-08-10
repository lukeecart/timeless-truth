import type { Category } from "./App";

export interface Tract {
	id: number;
	title: string;
	description: string;
	category: Category;
	thumbnail: {
		 fileName: string;
		 url: string;
	};
	pdf: {
		fileName: string;
		url: string;
	};
}