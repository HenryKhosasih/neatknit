import { Fragment, useContext } from "react";
import { Link, Outlet } from "react-router-dom";

import { ReactComponent as Logo } from "../../assets/crown.svg";
import CartIcon from "../../components/cart-icon/cart-icon.component";
import CartDropdown from "../../components/cart-dropdown/cart-dropdown.components";

import { UserContext } from "../../components/contexts/user.context";
import { CartContext } from "../../components/contexts/cart.context";

import { signOutUser } from "../../utils/firebase.utils";

import "./navigation.styles.scss";

const Navigation = () => {
	const { currentUser } = useContext(UserContext);
	const { isCartOpen } = useContext(CartContext);

	return (
		<Fragment>
			<div className="navigation">
				<Link className="logo-container" to="/">
					<Logo className="logo" />
				</Link>
				<div className="nav-links-container">
					<Link className="nav-link" to="/shop">
						Shop
					</Link>
					{currentUser ? (
						<span className="nav-link" onClick={signOutUser}>
							Sign Out
						</span>
					) : (
						<Link className="nav-link" to="/auth">
							Sign In
						</Link>
					)}
					<CartIcon />
				</div>

				{isCartOpen && <CartDropdown />}
			</div>
			<Outlet />
		</Fragment>
	);
};

export default Navigation;
