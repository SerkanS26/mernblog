import { useState, useEffect } from "react";

// react-router-dom
import { useParams, Link, useNavigate } from "react-router-dom";

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

  useEffect(() => {
    if (post) {
      setTitle(post.title);
      setContent(post.content);
      setImage(post.image);
    }
  }, [post]);

  return <div>PostEditScreen</div>;
};

export default PostEditScreen;
