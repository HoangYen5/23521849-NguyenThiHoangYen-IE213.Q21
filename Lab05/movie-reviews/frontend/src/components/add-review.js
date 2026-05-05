import React, { useState, useEffect } from "react";
import MovieDataService from "../services/movies";
import { useNavigate, useParams, useLocation } from "react-router-dom";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";

const AddReview = (props) => {
  const initialReviewState = {
    name: props.user ? props.user.name : "",
    user_id: props.user ? props.user.id : "",
    review: "",
  };

  const [currentReview, setCurrentReview] = useState(initialReviewState);
  const [submitted, setSubmitted] = useState(false);
  const [editing, setEditing] = useState(false);

  const navigate = useNavigate();
  const { id } = useParams();
  const location = useLocation();

  useEffect(() => {
    // Nếu navigate từ trang Edit, load dữ liệu review hiện tại
    if (location.state && location.state.currentReview) {
      setCurrentReview(location.state.currentReview);
      setEditing(true);
    }
  }, [location.state]);

  const onChangeReview = (e) => {
    setCurrentReview({ ...currentReview, review: e.target.value });
  };

  const saveReview = () => {
    var data = {
      movie_id: id,
      review: currentReview.review,
      user_id: props.user.id,
      name: props.user.name,
    };

    if (editing) {
      data.review_id = currentReview._id;
      MovieDataService.updateReview(data)
        .then(() => {
          setSubmitted(true);
        })
        .catch((e) => {
          console.log(e);
        });
    } else {
      MovieDataService.createReview(data)
        .then(() => {
          setSubmitted(true);
        })
        .catch((e) => {
          console.log(e);
        });
    }
  };

  if (submitted) {
    navigate("/movies/" + id);
  }

  return (
    <Container style={{ marginTop: "1rem" }}>
      <h2>{editing ? "Edit Review" : "Add Review"}</h2>
      <Form>
        <Form.Group>
          <Form.Label>Review</Form.Label>
          <Form.Control
            as="textarea"
            rows={3}
            value={currentReview.review}
            onChange={onChangeReview}
            placeholder="Write your review here..."
          />
        </Form.Group>
        <br />
        <Button variant="primary" onClick={saveReview}>
          {editing ? "Update" : "Submit"}
        </Button>
      </Form>
    </Container>
  );
};

export default AddReview;