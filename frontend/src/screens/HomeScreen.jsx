import React from "react";
// import { Link, useParams } from "react-router-dom";
import { Row, Col, Image } from "react-bootstrap";

//components
import Loader from "../components/Loader";
import Message from "../components/Message";
import Post from "../components/Post";

// apiCall
import { useGetPostsQuery } from "../slices/ReduxApiCalls/postsApiSlice";

const HomeScreen = () => {
  const { data, error, isLoading } = useGetPostsQuery();

  return (
    <>
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
                src="./images/mern.png"
                alt="mern image"
                className="mb-3 home-image"
                fluid
              />
            </Col>
          </Row>

          <h1 className="text-center my-2">MERN BLOG</h1>

          <Row>
            {data.map((post) => (
              <Col key={post._id} sm={12} md={6} lg={4} xl={3}>
                <Post post={post} className="shadow-5-strong" />
              </Col>
            ))}
          </Row>
        </>
      )}
    </>
  );
};

export default HomeScreen;
