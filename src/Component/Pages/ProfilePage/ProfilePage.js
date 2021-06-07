import { Avatar } from '@material-ui/core';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router';
import "./ProfilePage.css";
import PostCard from "../../Common/PostCard/PostCard";
import loading from "../../Media/01-progress.gif";
import Modal from "../../Common/Modal/Modal"

const ProfilePage = () => {

  const [userData, setUserData] = useState(null);
  const [post, setPost] = useState([]);
  const [openModal, setOpenModal] = useState(false);
  const [modalData, setModalData] = useState({ title: "", body: "" });
  const [load, setLoad] = useState(0);
  const { id } = useParams();
 
    useEffect(() => {
        //get user detail
        fetch(`https://jsonplaceholder.typicode.com/users/${id}`)
          .then((res) => res.json())
          .then((d) => setUserData(d));
        
        // // get user posts
        // fetch(`https://jsonplaceholder.typicode.com/posts?userId=${id}`)
        //   .then((res) => res.json())
        //   .then((d) => setPost(d));
    }, [])
  
    useEffect(() => {
      fetch(
        `http://jsonplaceholder.typicode.com/posts?userId=${id}&_start=${load}&_limit=5`
      )
        .then((res) => res.json())
        .then((data) => setPost(data));
    }, [load]);
  
    return (
      <div className="profilePage">
        <Modal
          data={modalData}
          openModal={openModal}
          setOpenModal={setOpenModal}
        />
        {userData ? (
          <div className="text-center ">
            <Avatar
              className="avatar"
              style={{ height: "100px", width: "100px", margin: "20px auto" }}
            >
              <h4>{userData.name.slice(0, 1)}</h4>
            </Avatar>
            <h5>{userData.name}</h5>
            <h6>User name: {userData.username}</h6>
            <h6>Email: {userData.email}</h6>
          </div>
        ) : (
          <img src={loading} alt="" />
        )}
        <hr />
        {post.map((d) => (
          <PostCard
            data={d}
            key={d.id}
            handlerForModalData={setModalData}
            setOpenModal={setOpenModal}
          />
        ))}

        <ul class="pagination">
          <li class="page-item" onClick={() => setLoad(0)}>
            <a class="page-link" href="#">
              1
            </a>
          </li>
          <li class="page-item" onClick={() => setLoad(5)}>
            <a class="page-link" href="#">
              2
            </a>
          </li>
        </ul>
      </div>
    );
};

export default ProfilePage;