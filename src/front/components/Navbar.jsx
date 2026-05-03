import { Link } from "react-router-dom";

export const Navbar = () => {

	return (
		<nav className="navbar navbar-light bg-light">
			<div className="container">
				<Link to="/">
					<span className="navbar-brand justify-content mb-0 h1">Mochi</span>
				</Link>
			</div>
		</nav>
	);
};