import React, { useState, useEffect } from "react";
import MovieDataService from "../services/movies";
import { Link } from "react-router-dom";
import Card from "react-bootstrap/Card";
import Container from "react-bootstrap/Container";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";

const MoviesList = (props) => {
  const [movies, setMovies] = useState([]);
  const [searchTitle, setSearchTitle] = useState("");
  const [searchRating, setSearchRating] = useState("");
  const [ratings, setRatings] = useState(["All Ratings"]);

  // Ex 3.1: add 2 paging state variables.
  const [currentPage, setCurrentPage] = useState(0);
  const [entriesPerPage, setEntriesPerPage] = useState(0);

  // Ex 3.2: add a state variable to store the current search mode
  const [currentSearchMode, setCurrentSearchMode] = useState("");

  // First run: retrieve movie list and ratings
  useEffect(() => {
    retrieveMovies();
    retrieveRatings();
  }, []);

  // Ex 3.2: When currentSearchMode changes, reset currentPage to 0.
  useEffect(() => {
    setCurrentPage(0);
  }, [currentSearchMode]);

  // Ex 3.1: When currentPage changes, call retrieveNextPage().
  useEffect(() => {
    retrieveNextPage();
  }, [currentPage]);

  // Ex 3.2: Call the corresponding function based on currentSearchMode.
  const retrieveNextPage = () => {
    if (currentSearchMode === "findByTitle") {
      findByTitle();
    } else if (currentSearchMode === "findByRating") {
      findByRating();
    } else {
      retrieveMovies();
    }
  };

  // Ex 3.1: Pass currentPage to getAll(), save page and entriesPerPage from the response.
  const retrieveMovies = () => {
    setCurrentSearchMode("");
    MovieDataService.getAll(currentPage)
      .then((response) => {
        console.log(response.data);
        setMovies(response.data.movies);
        setCurrentPage(response.data.page);
        setEntriesPerPage(response.data.entries_per_page);
      })
      .catch((e) => {
        console.log(e);
      });
  };

  const retrieveRatings = () => {
    MovieDataService.getRatings()
      .then((response) => {
        console.log(response.data);
        setRatings(["All Ratings"].concat(response.data));
      })
      .catch((e) => {
        console.log(e);
      });
  };

  const onChangeSearchTitle = (e) => {
    setSearchTitle(e.target.value);
  };

  const onChangeSearchRating = (e) => {
    setSearchRating(e.target.value);
  };

  // Ex 3.2: pass currentPage to find()
  const find = (query, by) => {
    MovieDataService.find(query, by, currentPage)
      .then((response) => {
        console.log(response.data);
        setMovies(response.data.movies);
      })
      .catch((e) => {
        console.log(e);
      });
  };

  // Ex 3.2: Set currentSearchMode before searching.
  const findByTitle = () => {
    setCurrentSearchMode("findByTitle");
    find(searchTitle, "title");
  };

  const findByRating = () => {
    setCurrentSearchMode("findByRating");
    if (searchRating === "All Ratings") {
      retrieveMovies();
    } else {
      find(searchRating, "rated");
    }
  };

  return (
    <div className="App">
      <Container>
        <Row>
          <Col>
            <Form.Group>
              <Form.Control
                type="text"
                placeholder="Search by title"
                value={searchTitle}
                onChange={onChangeSearchTitle}
              />
            </Form.Group>
            <Button variant="primary" type="button" onClick={findByTitle}>
              Search
            </Button>
          </Col>
          <Col>
            <Form.Group>
              <Form.Control as="select" onChange={onChangeSearchRating}>
                {ratings.map((rating) => {
                  return (
                    <option key={rating} value={rating}>
                      {rating}
                    </option>
                  );
                })}
              </Form.Control>
            </Form.Group>
            <Button variant="primary" type="button" onClick={findByRating}>
              Search
            </Button>
          </Col>
        </Row>
        <br />

        {/* Ex 3.1: Display the current page and a button to go to the next page. */}
        Showing page: {currentPage}.
        <Button
          variant="link"
          onClick={() => {
            setCurrentPage(currentPage + 1);
          }}
        >
          Get next {entriesPerPage} results
        </Button>

        <br />
        <Row>
          {movies.map((movie) => {
            return (
              <Col key={movie._id} style={{ marginBottom: "1rem" }}>
                <Card style={{ width: "18rem" }}>
                  <Card.Img src={movie.poster + "/100px180"} />
                  <Card.Body>
                    <Card.Title>{movie.title}</Card.Title>
                    <Card.Text>Rating: {movie.rated}</Card.Text>
                    <Card.Text>{movie.plot}</Card.Text>
                    <Link to={"/movies/" + movie._id}>View Reviews</Link>
                  </Card.Body>
                </Card>
              </Col>
            );
          })}
        </Row>
      </Container>
    </div>
  );
};

export default MoviesList;