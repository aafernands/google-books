import React, { useEffect, useState } from "react";
import Jumbotron from "../../components/Jumbotron";
import DeleteBtn from "../../components/DeleteBtn";
import API from "../../utils/API";
import { Col, Row, Container } from "../../components/Grid";
import { List, ListItem } from "../../components/List";
import { Input, TextArea, FormBtn } from "../../components/Form";

function Search() {
	// Setting our component's initial state
	const [books, setBooks] = useState([]);
	const [searchResult, setSearchResult] = useState([]);
	const [bookTitle, setBookTitle] = useState("");

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
	function deleteBook(id) {
		API.deleteBook(id)
			.then((res) => loadBooks())
			.catch((err) => console.log(err));
	}

	// Handles updating component state when the user types into the input field
	function handleInputChange(event) {
		const { value } = event.target;
		setBookTitle(value);
		console.log(bookTitle);
	}

	// When the form is submitted, use the API.saveBook method to save the book data
	// Then reload books from the database
	function handleFormSubmit(event) {
		event.preventDefault();
		if (bookTitle) {
			API.search(bookTitle)
				.then(
					(res) => {
						const books = res.data.items.map((book) => {
							console.log(book);
							return {
								title: book.volumeInfo.title,
								author: book.volumeInfo.authors[0],
								image: book.volumeInfo.imageLinks.smallThumbnail,
								description: book.volumeInfo.description,
								link: book.volumeInfo.infoLink,
							};
						});
						setSearchResult(books);
					}
					// setFormObject({
					// 	title: "",
					// 	author: "",
					// 	synopsis: "",
					// })
				)
				// .then(() => loadBooks())
				.catch((err) => console.log(err));
		}
	}

	const saveBook = (book) => {
		API.saveBook(book).then(() => {
			alert("Book saved");
		});
	};

	return (
		<Container fluid>
			<Row>
				<Col size="md-12">
					<Jumbotron>
						<h1>What Books Should I Read?</h1>
					</Jumbotron>

					<form>
						<Input
							onChange={handleInputChange}
							name="bookTitle"
							placeholder="Harry Potter"
							value={bookTitle}
						/>
						<FormBtn disabled={!bookTitle} onClick={handleFormSubmit}>
							Search
						</FormBtn>
					</form>
				</Col>
				<Col size="sm-12">
					<Jumbotron>
						<h1>Search Result</h1>
					</Jumbotron>
					<List>
						{searchResult.map((book) => {
							return (
								<ListItem key={book._id}>
									<div>
										<a href={"/books/" + book._id}></a>
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
													onClick={() => saveBook(book)}
												>
													Save
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

export default Search;
