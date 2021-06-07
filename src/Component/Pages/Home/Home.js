import React, { useState, useEffect } from "react";
import PostCard from "../../Common/PostCard/PostCard";
import Loading from "../../Media/01-progress.gif";

const Home = () => {
  const [postData, setPostData] = useState([])
  const [load, setLoad] = useState(false);

  useEffect(() => {
    fetch(`https://jsonplaceholder.typicode.com/posts?_start=${postData.length}&_limit=10`)
      .then((res) => res.json())
      .then((data) => setPostData([...postData, ...data]));
  }, [load])

    return (
      <div>
        {postData.length > 1 ? (
          postData.map((d, i) => <PostCard data={d} key={i} />)
        ) : (
          <img src={Loading} alt="" />
        )}
        <button className="btn btn-info py-0" onClick={()=>{setLoad(load?false:true)}}>
          Load More
        </button>
      </div>
    );
};

export default Home;