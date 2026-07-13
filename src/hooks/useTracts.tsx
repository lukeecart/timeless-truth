import { useState } from "react";
import { tracts, type Tract } from "../tractInfo";

export const useTracts = () => {
	const [ tractArray ] = useState<Tract[]>(tracts);

	// add a useEffect in the future to update the tracts
	return tractArray;
};