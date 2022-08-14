import { useEffect } from "react";
import { createContext, useState } from "react";
import SHOP_DATA from "../../shop-data.js";
import { addCollectionAndDocuments } from "../../utils/firebase.utils.js";

export const ProductsContext = createContext({
	products: [],
	setProducts: () => null,
});

export const ProductsProvider = ({ children }) => {
	const [products, setProducts] = useState([]);
	useEffect(() => {
		addCollectionAndDocuments("categories", SHOP_DATA);
	}, []);
	const value = { products, setProducts };

	return (
		<ProductsContext.Provider value={value}>
			{children}
		</ProductsContext.Provider>
	);
};
