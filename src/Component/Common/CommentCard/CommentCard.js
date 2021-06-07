import React from 'react';
import "./CommentCard.css"
const CommentCard = ({ data }) => {
    const { name, email, body } = data;
    return (
        <div className="card comment-card">
            <h5>{name}</h5>
            <h6>{email}</h6>
            <p>{body}</p>
        </div>
    );
};

export default CommentCard;