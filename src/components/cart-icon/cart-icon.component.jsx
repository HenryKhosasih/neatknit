import { useDispatch, useSelector } from "react-redux";
import { setIsCartOpen } from "../../store/cart/cart.action.js";
import {
	selectCartCount,
	selectCartIsOpen,
} from "../../store/cart/cart.selector.js";

import {
	CartIconContainer,
	ItemCount,
	ShoppingIcon,
} from "./cart-icon.styles.jsx";

const CartIcon = () => {
	const isCartOpen = useSelector(selectCartIsOpen);
	const cartCount = useSelector(selectCartCount);

	const dispatch = useDispatch();

	const toggleIsCartOpen = () => {
		dispatch(setIsCartOpen(!isCartOpen));
	};

	return (
		<CartIconContainer onClick={toggleIsCartOpen}>
			<ShoppingIcon />
			<ItemCount>{cartCount}</ItemCount>
		</CartIconContainer>
	);
};

export default CartIcon;
