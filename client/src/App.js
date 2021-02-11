import React from "react";
import Books from "./pages/Books";
import Nav from "./components/Nav";
import { BrowserRouter as Router, Route } from "react-router-dom";
import Saved from "./pages/Books/Saved";

function App() {
	return (
		<Router>
			<div>
				<Nav />
				<Route exact path="/" component={Books} />
				<Route exact path="/saved" component={Saved} />
			</div>
		</Router>
	);
}

export default App;
