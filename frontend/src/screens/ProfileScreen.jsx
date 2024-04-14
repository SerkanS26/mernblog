import { useState, useEffect } from "react";

//react-bootstrap
import { Form, Button, Row, Col, Table } from "react-bootstrap";

//redux
import { useDispatch, useSelector } from "react-redux";

//components
import Message from "../components/Message";
import Loader from "../components/Loader";

//toastify
import { toast } from "react-toastify";

//react-icons
import { FaEdit, FaTrash } from "react-icons/fa";

//react-router-bootsrap
import { LinkContainer } from "react-router-bootstrap";

//users api slice
import { useProfileMutation } from "../slices/ReduxApiCalls/usersApiSlice";
import {
  useGetMyPostsQuery,
  useDeletePostMutation,
  useCreatePostMutation,
} from "../slices/ReduxApiCalls/postsApiSlice";

// user auth slice
import { setCredentials } from "../slices/authSlice";

const ProfileScreen = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const dispatch = useDispatch();

  const { userInfo } = useSelector((state) => state.auth);

  //profile mutation
  const [updateProfile, { isLoading: loadingUpdateProfile }] =
    useProfileMutation();

  //get my posts query
  const {
    data: myPosts,
    isLoading: loadingMyPosts,
    error,
    refetch,
  } = useGetMyPostsQuery();

  // delete post mutation
  const [deletePost, { isLoading: loadingDelete }] = useDeletePostMutation();

  // create post mutation
  const [createPost, { isLoading: loadingCreate }] = useCreatePostMutation();

  useEffect(() => {
    if (userInfo) {
      setName(userInfo.name);
      setEmail(userInfo.email);
    }
  }, [userInfo, userInfo.name, userInfo.email]);

  const submitHandler = async (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      toast.error("Passwords do not match");
    } else {
      try {
        const res = await updateProfile({
          _id: userInfo._id,
          name,
          email,
          password,
        }).unwrap();

        dispatch(setCredentials(res));
        toast.success("Profile Updated Successfully");
      } catch (err) {
        toast.error(err?.data?.message || err.error);
      }
    }
  };

  //create post
  const createPostHandler = async () => {
    if (window.confirm("Are you sure you want to create a new post?")) {
      try {
        await createPost();
        refetch();
        toast.success("Post created successfully");
      } catch (err) {
        toast.error(err?.data?.message || err.error);
      }
    }
  };

  //delete post
  const deletePostHandler = async (id) => {
    if (window.confirm("Are you sure you want to delete this post?")) {
      try {
        await deletePost(id);
        refetch();
        toast.success("Post deleted successfully");
      } catch (err) {
        toast.error(err?.data?.message || err.error);
      }
    }
  };

  return (
    <>
      <Row className="align-items-center">
        <Col className="text-end">
          <Button
            className=" btn-sm my-3 "
            variant="outline-primary"
            onClick={createPostHandler}
          >
            <FaEdit /> Create Post
          </Button>
        </Col>
      </Row>
      {loadingCreate && <Loader />}
      {loadingDelete && <Loader />}

      <Row className="">
        <Col md={3}>
          <h2>User Profile</h2>
          <Form onSubmit={submitHandler}>
            <Form.Group controlId="name" className="my-2">
              <Form.Label>Name</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter name"
                value={name}
                onChange={(e) => setName(e.target.value)}
              ></Form.Control>
            </Form.Group>

            <Form.Group controlId="email" className="my-2">
              <Form.Label>Email Address</Form.Label>
              <Form.Control
                type="email"
                placeholder="Enter email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              ></Form.Control>
            </Form.Group>

            <Form.Group controlId="password" className="my-2">
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                placeholder="Enter password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              ></Form.Control>
            </Form.Group>

            <Form.Group controlId="confirmPassword" className="my-2">
              <Form.Label>Confirm Password</Form.Label>
              <Form.Control
                type="password"
                placeholder="Confirm password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
              ></Form.Control>
            </Form.Group>

            <Button
              type="submit"
              variant="outline-primary"
              className="my-2"
              size="lg"
            >
              Update
            </Button>
            {loadingUpdateProfile && <Loader />}
          </Form>
        </Col>
        <Col md={9}>
          <h2>My Posts</h2>
          <Table striped bordered hover responsive className="table-sm">
            <thead>
              <tr>
                <th>IMAGE</th>
                <th>TITLE</th>
                <th>CREATED AT</th>
                <th>UPDATED AT</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {loadingMyPosts ? (
                <Loader />
              ) : error ? (
                <Message variant="danger">{error.data.message}</Message>
              ) : (
                myPosts?.map((post) => (
                  <tr key={post._id}>
                    <td className="d-flex align-items-center justify-content-center">
                      <img
                        src={post.image}
                        alt={post.title}
                        style={{ width: "100px" }}
                        fluid
                      />
                    </td>
                    <td>{post.title.toString().substring(0, 50)}...</td>
                    <td>{post.createdAt.toString().substring(0, 10)}</td>
                    <td>{post.updatedAt.toString().substring(0, 10)}</td>
                    <td>
                      <LinkContainer
                        to={`/posts/${post._id}/edit`}
                        className=""
                      >
                        <Button
                          variant="warning"
                          className="btn-sm mx-2 my-1 text-white-50"
                        >
                          <FaEdit />
                        </Button>
                      </LinkContainer>

                      <Button
                        variant="danger"
                        className="btn-sm mx-2 my-1 text-white-50"
                        onClick={() => deletePostHandler(post._id)}
                      >
                        <FaTrash />
                      </Button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </Table>
        </Col>
      </Row>
    </>
  );
};

export default ProfileScreen;
