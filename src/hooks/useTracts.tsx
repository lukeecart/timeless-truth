import { useState, useEffect } from "react";
import { type Tract } from "../tract";

export const useTracts = () => {
	const [tracts, setTracts] = useState<Tract[]>([]);
	const [loading, setLoading] = useState<boolean>(true);
	const [error, setError] = useState<string | null>(null);

	useEffect(() => {
		const query = `
      query {
				tracts {
					category
					createdAt
					description
					id
					title
					thumbnail {
						fileName
						url(transformation: {image: {}, document: {output: {format: jpg}}})
					}
					pdf {
						fileName
						url
					}
				}
      }
    `;

		fetch(
			import.meta.env.VITE_HYGRAPH_ENDPOINT,
			{
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify({ query }),
			}
		)
			.then((res) => res.json())
			.then((data) => {
				if (data.errors) {
					setError(data.errors[0].message);
				} else {
					setTracts(data.data.tracts);
				}
				setLoading(false);
			})
			.catch((err) => {
				setError(err.message);
				setLoading(false);
			});
	}, []);

	return { tracts, loading, error };
};