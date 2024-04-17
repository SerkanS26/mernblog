import { useEffect, useState } from "react";

// react-router-dom
import { useNavigate, useParams } from "react-router-dom";

// components
import Loader from "../../components/Loader";
import Message from "../../components/Message";
import FormContainer from "../../components/FormContainer";

// toastify
import { toast } from "react-toastify";

// users api query and mutation
import {
  useGetUserDetailsQuery,
  useUpdateUserMutation,
} from "../../slices/ReduxApiCalls/usersApiSlice";
import { Button, Form } from "react-bootstrap";
import { FaArrowLeft } from "react-icons/fa";

const UserEditScreen = () => {
  const { id: userId } = useParams();
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [isAdmin, setIsAdmin] = useState(false);

  // get user details
  const {
    data: user,
    error,
    isLoading,
    refetch,
  } = useGetUserDetailsQuery(userId);

  // update user mutation
  const [updateUser, { isLoading: loadingUpdate }] = useUpdateUserMutation();

  useEffect(() => {
    if (user) {
      setName(user.name);
      setEmail(user.email);
      setIsAdmin(user.isAdmin);
    }
  }, [user]);

  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      await updateUser({ userId, name, email, isAdmin });
      toast.success("User Updated Successfully");
      refetch();
      navigate("/admin/userlist");
    } catch (err) {
      toast.error(err?.data?.message || err.error);
    }
  };

  return (
    <>
      <Button
        href="/admin/userlist"
        variant="outline-primary"
        className="btn my-3  fs-5"
        size="lg"
      >
        <FaArrowLeft className="me-2" />
        Go Back
      </Button>

      <FormContainer>
        <h1>Edit User</h1>
        {loadingUpdate && <Loader />}

        {isLoading ? (
          <Loader />
        ) : error ? (
          <Message variant="danger">{error}</Message>
        ) : (
          <Form onSubmit={submitHandler}>
            <Form.Group controlId="name" className="my-3">
              <Form.Label>Name</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter name"
                value={name}
                onChange={(e) => setName(e.target.value)}
              ></Form.Control>
            </Form.Group>

            <Form.Group controlId="email" className="my-3">
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="email"
                placeholder="Enter email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              ></Form.Control>
            </Form.Group>

            <Form.Group controlId="isadmin" className="my-3">
              <Form.Check
                type="checkbox"
                label="Is Admin"
                checked={isAdmin}
                onChange={(e) => setIsAdmin(e.target.checked)}
              ></Form.Check>
            </Form.Group>

            <Button type="submit" variant="primary" className="my-2">
              Update
            </Button>
          </Form>
        )}
      </FormContainer>
    </>
  );
};

export default UserEditScreen;
