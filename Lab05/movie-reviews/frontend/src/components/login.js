import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";

const Login = (props) => {
  const [user, setUser] = useState({ name: "", id: "" });
  const navigate = useNavigate();

  const onChangeName = (e) => {
    setUser({ ...user, name: e.target.value });
  };

  const onChangeId = (e) => {
    setUser({ ...user, id: e.target.value });
  };

  const login = () => {
    props.login(user);
    navigate("/");
  };

  return (
    <Container style={{ marginTop: "1rem" }}>
      <h2>Login</h2>
      <Form>
        <Form.Group style={{ marginBottom: "1rem" }}>
          <Form.Label>Username</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter your name"
            value={user.name}
            onChange={onChangeName}
          />
        </Form.Group>
        <Form.Group style={{ marginBottom: "1rem" }}>
          <Form.Label>User ID</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter your user ID (e.g. 23521505)"
            value={user.id}
            onChange={onChangeId}
          />
        </Form.Group>
        <Button variant="primary" onClick={login}>
          Login
        </Button>
      </Form>
    </Container>
  );
};

export default Login;