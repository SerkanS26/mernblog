import React from "react";

// react-router-dom
import { useParams } from "react-router-dom";

// import { Row, Col, Image } from "react-bootstrap";
import { Row, Col, Image, Button } from "react-bootstrap";

// react-icons
import { FaArrowLeft } from "react-icons/fa";

//components
import Loader from "../components/Loader";
import Message from "../components/Message";
import Post from "../components/Post";
import Paginate from "../components/Paginate";

// apiCall
import { useGetPostsQuery } from "../slices/ReduxApiCalls/postsApiSlice";

const HomeScreen = () => {
  const { pageNumber, keyword } = useParams();
  const { data, error, isLoading } = useGetPostsQuery({ keyword, pageNumber });

  return (
    <>
      {keyword && (
        <Button
          href="/"
          variant="outline-primary"
          className="btn my-3 fs-5"
          size="lg"
        >
          <FaArrowLeft className="me-2" />
          Go Back
        </Button>
      )}
      {isLoading ? (
        <Loader />
      ) : error ? (
        <Message variant="danger">
          {error?.data?.message || error.message}
        </Message>
      ) : (
        <>
          {!keyword ? (
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
            </>
          ) : (
            <h1 className="text-center mt-2">Search Results</h1>
          )}

          <Row>
            {data.posts.map((post) => (
              <Col key={post._id} sm={12} md={6} lg={4} xl={3}>
                <Post post={post} className="shadow-5-strong" />
              </Col>
            ))}
          </Row>
          <Row>
            <Col className="d-flex justify-content-center my-4">
              <Paginate
                pages={data.pages}
                page={data.page}
                keyword={keyword ? keyword : ""}
              />
            </Col>
          </Row>
        </>
      )}
    </>
  );
};

export default HomeScreen;
