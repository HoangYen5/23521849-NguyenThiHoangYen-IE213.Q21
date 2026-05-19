import React from 'react';
import { Routes, Route, Link } from 'react-router-dom';
import './App.css';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import 'bootstrap/dist/css/bootstrap.min.css';
import MoviesList from './components/movies-list';
import Movie from './components/movie';
import AddReview from './components/add-review';
import Login from './components/login';

function App() {
  const [user, setUser] = React.useState(null);

  async function login(user = null) {
    setUser(user);
  }

  async function logout() {
    setUser(null);
  }

  return (
    <div className="App">
      <Navbar bg="light" expand="lg">
        <Container>
          <Navbar.Brand href="#home">Movie Reviews</Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
              <Nav.Link>
                <Link to={"/movies"}>Movies</Link>
              </Nav.Link>
              <Nav.Link>
                {user ? (
                  <Link to={"/"} onClick={logout}>
                    Logout User
                  </Link>
                  ) : (
                  <Link to={"/login"} onClick={() => login({ name: "test", id: "123" })}>
                    Login
                  </Link>
                )}
              </Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>

      <Routes>
        <Route path="/" element={<MoviesList />} />
        <Route path="/movies" element={<MoviesList />} />
        <Route path="/movies/:id/review" element={<AddReview user={user} />} />
        <Route path="/movies/:id" element={<Movie user={user} />} />
        <Route path="/login" element={<Login login={login} />} />
      </Routes>
    </div>
  );
}

export default App;