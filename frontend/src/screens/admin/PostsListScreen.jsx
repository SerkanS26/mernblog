import React from "react";

// react-bootstrap
import { Button, Col, Row, Table } from "react-bootstrap";

// React-icons
import { FaTrash } from "react-icons/fa";

//react-router-dom
import { useParams } from "react-router-dom";

// toastify
import { toast } from "react-toastify";

// components
import Loader from "../../components/Loader";
import Message from "../../components/Message";
import Paginate from "../../components/Paginate";

// posts api call
import {
  useGetPostsQuery,
  useDeletePostMutation,
} from "../../slices/ReduxApiCalls/postsApiSlice";

const PostsListScreen = () => {
  // get pageNumber
  const { pageNumber } = useParams();

  // get all posts
  const { data, error, isLoading, refetch } = useGetPostsQuery({ pageNumber });

  // delete post
  const [deletePost, { isLoading: loadingDelete }] = useDeletePostMutation();

  // delete post handler
  const deletePostHandler = async (id) => {
    if (window.confirm("Are you sure you want to delete this post?")) {
      try {
        await deletePost(id).unwrap();
        refetch();
        toast.success("Post deleted successfully");
      } catch (err) {
        toast.error(err?.data?.message || err.error);
      }
    }
  };

  return (
    <>
      <h1 className="text-center mb-4">POSTS</h1>
      {loadingDelete && <Loader />}
      {isLoading ? (
        <Loader />
      ) : error ? (
        <Message variant="danger">{error}</Message>
      ) : (
        <>
          <Table striped hover responsive className="table-sm">
            <thead>
              <tr>
                <th>IMAGE</th>
                <th>TITLE</th>
                <th>USER</th>
                <th>CREATED AT</th>
                <th>UPDATED AT</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {data.posts?.map((post) => (
                <tr key={post._id}>
                  <td className="d-flex align-items-center justify-content-center">
                    <img
                      src={post.image}
                      alt={post.title}
                      className="img-thumbnail"
                      style={{ width: "100px" }}
                    />
                  </td>
                  <td>{post.title.toString().substring(0, 50)} ...</td>
                  <td>{post.user && post.user.name}</td>
                  <td>{post.createdAt.toString().substring(0, 10)}</td>
                  <td>{post.updatedAt.toString().substring(0, 10)}</td>
                  <td>
                    <Button
                      variant="danger"
                      className="btn-sm mx-2 my-1 text-white-50"
                      onClick={() => deletePostHandler(post._id)}
                    >
                      <FaTrash />
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
          <Row>
            <Col className="d-flex justify-content-center my-4">
              <Paginate
                pages={data.pages}
                page={data.page}
                isAdmin={true}
                list="postlist"
              />
            </Col>
          </Row>
        </>
      )}
    </>
  );
};

export default PostsListScreen;
