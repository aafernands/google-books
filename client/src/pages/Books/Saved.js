import React, { useEffect, useState } from "react";
import Jumbotron from "../../components/Jumbotron";
import API from "../../utils/API";
import { Col, Row, Container } from "../../components/Grid";
import { List, ListItem } from "../../components/List";

function Saved() {
	// Setting our component's initial state
	const [books, setBooks] = useState([]);

	// Load all books and store them with setBooks
	useEffect(() => {
		loadBooks();
	}, []);

	// Loads all books and sets them to books
	function loadBooks() {
		API.getBooks()
			.then((res) => setBooks(res.data))
			.catch((err) => console.log(err));
	}

	// Deletes a book from the database with a given id, then reloads books from the db
	function deleteBook(book) {
		API.deleteBook(book._id)
			.then((res) => loadBooks())
			.catch((err) => console.log(err));
	}

	return (
		<Container fluid>
			<Row>
				<Col size="sm-12">
					<Jumbotron>
						<h1>Save Result</h1>
					</Jumbotron>
					<List>
						{books.map((book) => {
							return (
								<ListItem key={book._id}>
									<div>
										<Row>
											<Col size="sm-6">
												<strong>
													{book.title} by {book.author}
												</strong>
											</Col>
											<Col size="sm-6">
												<a href={book.link}>
													<button className="btn btn-primary">View</button>
												</a>
												<button
													className="btn btn-primary"
													onClick={() => deleteBook(book)}
												>
													Delete
												</button>
											</Col>
										</Row>
										<Row>
											<Col size="sm-3">
												<img src={book.image} />
											</Col>
											<Col size="sm-9">{book.description}</Col>
										</Row>
									</div>
								</ListItem>
							);
						})}
					</List>
				</Col>
			</Row>
		</Container>
	);
}

export default Saved;
