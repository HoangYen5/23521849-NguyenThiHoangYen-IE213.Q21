import React, { useState } from "react";
import MovieDataService from "../services/movies";
import { Link, useNavigate, useParams, useLocation } from "react-router-dom";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";

const AddReview = (props) => {
  // Kiểm tra nếu đang ở chế độ editing (navigate từ nút Edit)
  let editing = false;
  let initialReviewState = "";

  const location = useLocation();
  const { id } = useParams();
  const navigate = useNavigate();

  if (location.state && location.state.currentReview) {
    editing = true;
    initialReviewState = location.state.currentReview.review;
  }

  const [review, setReview] = useState(initialReviewState);
  // Theo dõi nếu review đã được submit thành công
  const [submitted, setSubmitted] = useState(false);

  const onChangeReview = (e) => {
    const review = e.target.value;
    setReview(review);
  };

  const saveReview = () => {
    var data = {
      review: review,
      name: props.user.name,
      user_id: props.user.id,
      movie_id: id, // lấy movie_id trực tiếp từ URL
    };

    if (editing) {
      // Lấy review_id từ state để update
      data.review_id = location.state.currentReview._id;
      MovieDataService.updateReview(data)
        .then((response) => {
          setSubmitted(true);
          console.log(response.data);
        })
        .catch((e) => {
          console.log(e);
        });
    } else {
      MovieDataService.createReview(data)
        .then((response) => {
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
      <div>
        {submitted ? (
          <div>
            <h4>Review submitted successfully</h4>
            <Link to={"/movies/" + id}>Back to Movie</Link>
          </div>
        ) : (
          <Form>
            <Form.Group style={{ marginBottom: "1rem" }}>
              <Form.Label>
                {editing ? "Edit" : "Create"} Review
              </Form.Label>
              <Form.Control
                type="text"
                required
                value={review}
                onChange={onChangeReview}
                placeholder="Write your review here..."
              />
            </Form.Group>
            <Button variant="primary" onClick={saveReview}>
              Submit
            </Button>
          </Form>
        )}
      </div>
    </Container>
  );
};

export default AddReview;