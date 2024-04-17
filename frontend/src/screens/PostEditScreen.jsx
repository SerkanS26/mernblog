import { useState, useEffect } from "react";

// react-router-dom
import { useParams, useNavigate } from "react-router-dom";

// react-bootstrap
import { Form, Button } from "react-bootstrap";

//components
import Message from "../components/Message";
import Loader from "../components/Loader";
import FormContainer from "../components/FormContainer";

// toastify
import { toast } from "react-toastify";

// posts api query ann mutation
import {
  useGetPostDetailsQuery,
  useUpdatePostMutation,
  useUploadPostImageMutation,
} from "../slices/ReduxApiCalls/postsApiSlice";

import { FaArrowLeft } from "react-icons/fa";

const PostEditScreen = () => {
  const { id: postId } = useParams();
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [image, setImage] = useState("");

  // get post details query
  const { data: post, isLoading, error } = useGetPostDetailsQuery(postId);
  // update post mutation
  const [updatePost, { isLoading: loadingUpdate }] = useUpdatePostMutation();
  // upload image mutation
  const [uploadPostImage, { isLoading: loadingUpload }] =
    useUploadPostImageMutation();

  const navigate = useNavigate();

  // set post details to state
  useEffect(() => {
    if (post) {
      setTitle(post.title);
      setContent(post.content);
      setImage(post.image);
    }
  }, [post]);

  // submit handler
  const submitHandler = async (e) => {
    e.preventDefault();
    const updatedPost = {
      postId,
      title,
      content,
      image,
    };
    const result = await updatePost(updatedPost);
    if (result.error) {
      toast.error(result.error);
    } else {
      toast.success("Post updated successfully!");
      navigate("/profile");
    }
  };

  // upload image handler
  const uploadFileHandler = async (e) => {
    const fromData = new FormData();
    fromData.append("image", e.target.files[0]);
    try {
      const res = await uploadPostImage(fromData).unwrap();
      toast.success(res.message);
      setImage(res.image);
    } catch (err) {
      toast.error(err?.data?.message || err.error);
    }
  };

  return (
    <>
      <Button
        href="/profile"
        variant="outline-primary"
        className="btn my-3  fs-5"
        size="lg"
      >
        <FaArrowLeft className="me-2" />
        Go Back
      </Button>
      <FormContainer>
        <h1>Edit Post</h1>
        {loadingUpdate && <Loader />}
        {loadingUpload && <Loader />}

        {isLoading ? (
          <Loader />
        ) : error ? (
          <Message variant="danger">{error.data.message}</Message>
        ) : (
          <Form onSubmit={submitHandler}>
            <Form.Group controlId="title" className="my-3">
              <Form.Label>Title</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              ></Form.Control>
            </Form.Group>

            {/* content */}
            <Form.Group controlId="content" className="my-3">
              <Form.Label>Content</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter content"
                value={content}
                onChange={(e) => setContent(e.target.value)}
              ></Form.Control>
            </Form.Group>

            {/* image */}
            <Form.Group controlId="image" className="my-3">
              <Form.Label>Image</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter image url"
                value={image}
                onChange={(e) => setImage}
              ></Form.Control>
              <Form.Control
                type="file"
                label="Choose File"
                onChange={uploadFileHandler}
              ></Form.Control>
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

export default PostEditScreen;
