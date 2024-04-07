import React from "react";
import { Row, Col, Image, Button } from "react-bootstrap";
import { FaArrowLeft } from "react-icons/fa";

// react router dom
import { useParams } from "react-router-dom";

// components
import Loader from "../components/Loader";
import Message from "../components/Message";

// apiCall
import { useGetPostDetailsQuery } from "../slices/ReduxApiCalls/postsApiSlice";

const PostScreen = () => {
  const { id: postId } = useParams();

  // fetch post details
  const { data: post, error, isLoading } = useGetPostDetailsQuery(postId);

  return (
    <>
      <Button
        href="/"
        variant="outline-primary"
        className="btn my-3  fs-5"
        size="lg"
      >
        <FaArrowLeft className="me-2" />
        Go Back
      </Button>

      {isLoading ? (
        <Loader />
      ) : error ? (
        <Message variant="danger">
          {error?.data?.message || error.message}
        </Message>
      ) : (
        <>
          <Row>
            <Col>
              <Image
                src={post?.image}
                alt={post?.title}
                fluid
                style={{ height: "400px", width: "100%" }}
                className="object-fit-cover"
              />
            </Col>
          </Row>
          <Row>
            <Col>
              <h2 className="text-center text-primary-emphasis mt-3">
                {post?.title}
              </h2>
              <p className="py-3">{post?.content}</p>
            </Col>
          </Row>
          <Row className="">
            <Col className=" d-flex justify-content-center align-items-center">
              <span className="text-warning">
                Posted By: <strong>{post?.user.name}</strong>
              </span>
            </Col>
            <Col className=" d-flex justify-content-center align-items-center">
              <span className="text-warning">
                Created At:{" "}
                <strong>{post?.createdAt.toString().substring(0, 10)}</strong>
              </span>
            </Col>
          </Row>
        </>
      )}
    </>
  );
};

export default PostScreen;
