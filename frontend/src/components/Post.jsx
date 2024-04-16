import React from "react";
import { Link } from "react-router-dom";
import { Card } from "react-bootstrap";

const Post = ({ post }) => {
  return (
    <Card className="my-3 -3 rounded">
      <Link to={`/posts/${post._id}`}>
        <Card.Img src={post.image} variant="top" />
      </Link>

      <Card.Body>
        <Link to={`/posts/${post._id}`}>
          <Card.Title as="div" className="post.title">
            <strong>{post.title}</strong>
          </Card.Title>
        </Link>
        <Card.Text as="div">
          <div className="my-3">
            {post.description?.toString().substring(0, 50)}...
          </div>
        </Card.Text>
      </Card.Body>
    </Card>
  );
};

export default Post;
