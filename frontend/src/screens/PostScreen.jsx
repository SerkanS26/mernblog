import React from "react";
import { Row, Col, Image, Container } from "react-bootstrap";

// react router dom
import { useParams, Link } from "react-router-dom";

// components
import Loader from "../components/Loader";
import Message from "../components/Message";

// apiCall
import { useGetPostDetailsQuery } from "../slices/postsApiSlice";

const PostScreen = () => {
  const { id: postId } = useParams();

  // fetch post details
  const { data, error, isLoading } = useGetPostDetailsQuery(postId);

  return (
    <>
      <Link
        className="btn btn-dark my-3 ms-2 text-white button-bg-color fs-5"
        to="/"
      >
        Go Back
      </Link>
      {isLoading ? (
        <Loader />
      ) : error ? (
        <Message variant="danger">
          {error?.data?.message || error.message}
        </Message>
      ) : (
        <Container>
          <Row>
            <Col>
              <Image
                src={data?.image}
                alt={data?.title}
                fluid
                className=" h-50 w-100 object-fit-fill"
              />
              <h2 className="text-center my-3 text-primary-emphasis">
                {data?.title}
              </h2>
              <p>{data?.content}</p>
            </Col>
          </Row>
        </Container>
      )}
    </>
  );
};

export default PostScreen;
