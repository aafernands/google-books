import React from "react";

function Nav() {
	return (
		<nav className="navbar navbar-expand-lg navbar-dark bg-primary">
			<a className="navbar-brand" href="/">
			Book Search App
			</a>
			<a className="navbar-brand" href="/saved">
				Saved List
			</a>
		</nav>
	);
}

export default Nav;
