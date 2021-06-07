import React, { useContext, useEffect, useState } from 'react';
import { useParams } from 'react-router';
import PostCard from "../../Common/PostCard/PostCard";
import CommentCard from "../../Common/CommentCard/CommentCard";
import { ContextElement } from '../../../App';
import loading from "../../Media/01-progress.gif";

const PostDetail = () => {
    const [post, setPost] = useState([]);
    const [comment, setComment] = useState([]);
    const { id } = useParams();

    useEffect(() => {
      //get post
      fetch(`https://jsonplaceholder.typicode.com/posts/${id}`)
        .then((res) => res.json())
        .then((d) => setPost(d));
    
      //get comment
       fetch(`https://jsonplaceholder.typicode.com/comments?postId=${id}`)
         .then((res) => res.json())
         .then((d) => setComment(d));
    }, []);

    return (
      <div>
        <PostCard data={post} />
        <b>{comment.length > 1 ? "Comments" : "Comment"} ({comment.length})</b>
        {comment.length < 1 ? <img src={loading} alt="" />
          : comment.map((d) => (
          <CommentCard data={d} key={d.id} />
        ))}
      </div>
    );
};

export default PostDetail;