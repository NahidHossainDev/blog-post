import React, { useState } from 'react';

const UploadNewPost = () => {
    const [title, setTitle] = useState();
    const [detail, setDetail] = useState();

    const upload = () => {
        fetch("https://jsonplaceholder.typicode.com/posts", {
          method: "POST",
          body: JSON.stringify({
            title: title,
            body: detail,
            userId: 1,
          }),
          headers: {
            "Content-type": "application/json; charset=UTF-8",
          },
        }).then((d) => {
            console.log(d)
            if (d.status === 201) {
                setTitle("")
                setDetail("")
            alert("Your Post Uploaded successfully..!");
          }
        });
    }
    return (
      <div className="p-3 border">
        Create a new post
        <input
          className="border p-2"
          style={{ outline: "none" }}
          type="text"
          name=""
          id=""
          placeholder="Title..."
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <input
          className="border p-2"
          style={{ outline: "none" }}
          name=""
          id=""
          placeholder="Description..."
          rows="3"
          value={detail}
          onChange={(e) => setDetail(e.target.value)}
        />
        <button
          className="btn btn-primary ml-auto d-block px-5"
          onClick={upload}
        >
          Post
        </button>
      </div>
    );
};

export default UploadNewPost;