import React from "react";

//react-router-bootstrap
import { LinkContainer } from "react-router-bootstrap";

//ract-bootstrap
import { Table, Button, Row, Col } from "react-bootstrap";

//react-icons
import { FaEdit, FaTrash, FaTimes, FaCheck } from "react-icons/fa";

//ract-toastify
import { toast } from "react-toastify";

// react-router-dom
import { useParams } from "react-router-dom";

//components
import Loader from "../../components/Loader";
import Message from "../../components/Message";
import Paginate from "../../components/Paginate";

// users api call
import {
  useGetUsersQuery,
  useDeleteUserMutation,
} from "../../slices/ReduxApiCalls/usersApiSlice";

const UserListScreen = () => {
  // get pageNumber
  const { pageNumber } = useParams();
  // get all users
  const { data, error, isLoading, refetch } = useGetUsersQuery({ pageNumber });

  // delete user mutation
  const [deleteUser, { isLoading: loadingDelete }] = useDeleteUserMutation();

  // delete user handler
  const deleteHandler = async (id) => {
    if (window.confirm("Are you sure?")) {
      try {
        await deleteUser(id).unwrap();
        refetch();
        toast.success("User Deleted Successfully");
      } catch (err) {
        toast.error(err?.data?.message || err.error);
      }
    }
  };

  return (
    <>
      <h1 className="text-center mb-4">USERS</h1>
      {loadingDelete && <Loader />}
      {error && <Message variant="danger">{error}</Message>}
      {isLoading ? (
        <Loader />
      ) : (
        <>
          <Table striped hover responsive className="table-sm">
            <thead>
              <tr>
                <th>ID</th>
                <th>NAME</th>
                <th>EMAIL</th>
                <th>ADMIN</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {data.users?.map((user) => (
                <tr key={user._id}>
                  <td>{user._id}</td>
                  <td>{user.name}</td>
                  <td>
                    <a href={`mailto:${user.email}`}>{user.email}</a>
                  </td>
                  <td>
                    {user.isAdmin ? (
                      <FaCheck style={{ color: "green" }} />
                    ) : (
                      <FaTimes style={{ color: "red" }} />
                    )}
                  </td>
                  <td>
                    <LinkContainer to={`/admin/user/${user._id}/edit`}>
                      <Button
                        variant="warning"
                        className="m-2 btn-sm text-white-50"
                      >
                        <FaEdit />
                      </Button>
                    </LinkContainer>
                    <Button
                      variant="danger"
                      className="btn-sm text-white-50"
                      onClick={() => deleteHandler(user._id)}
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
                list="userlist"
              />
            </Col>
          </Row>
        </>
      )}
    </>
  );
};

export default UserListScreen;
