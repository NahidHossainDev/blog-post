import React, { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Modal from "@material-ui/core/Modal";
import Backdrop from "@material-ui/core/Backdrop";
import Fade from "@material-ui/core/Fade";
import { ContextElement } from "../../../App";

const useStyles = makeStyles((theme) => ({
  modal: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  paper: {
    backgroundColor: theme.palette.background.paper,
    borderRadius: "5px",
    boxShadow: theme.shadows[5],
      padding: theme.spacing(2, 4, 3),
    minWidth:"500px"
  },
}));

export default function TransitionsModal({ data, openModal, setOpenModal }) {
    const classes = useStyles();
    const [title, setTitle] = useState();
    const [detail, setDetail] = useState();
    
     useEffect(() => {
       if (data) {
         setTitle(data.title);
         setDetail(data.body);
       }
     }, [openModal]);

  const updatePost = () => {
    const updateData = { title: title, detail: detail };
    fetch(`https://jsonplaceholder.typicode.com/posts/${data.id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(updateData),
    }).then((d) => {
      if (d.status === 200) {
          setOpenModal(false);
          alert("Your Post Updated successfully..!");
        }
      });
  };
  
  const deletePost = () => {
    fetch(`https://jsonplaceholder.typicode.com/posts/${data.id}`, {
      method: "DELETE",
    }).then((d) => {
      if (d.status === 200) {
          setOpenModal(false);
          alert("Your Post Deleted successfully..!");
        }
      });
  }
  return (
    <Modal
      className={classes.modal}
      open={openModal}
      onClose={() =>  {
        setOpenModal(false);
        data.delete = " ";
      }}
      closeAfterTransition
      BackdropComponent={Backdrop}
      BackdropProps={{
        timeout: 500,
      }}
    >
      <Fade in={openModal}>
        {data.delete == "delete" ? (
          <div className={classes.paper}>
            <h6 className="text-center my-3">
              Are you sure you want to delete this post?
            </h6>
            <div className="d-flex justify-content-between mx-4">
              <button
                className="btn btn-info py-0"
                onClick={() => { setOpenModal(false); data.delete = " ";}}
              >
                Cancel
              </button>
              <button class="btn btn-danger py-0" onClick={deletePost}>
                Yes
              </button>
            </div>
          </div>
        ) : (
          <div className={classes.paper}>
            <h6>Title</h6>
            <input
              type="text"
              onChange={(e) => setTitle(e.target.value)}
              value={title}
            />
            <h6>Detail</h6>
            <textarea
              cols="30"
              rows="5"
              onChange={(e) => setDetail(e.target.value)}
              value={detail}
            />
            <button
              onClick={updatePost}
              className="btn btn-info py-0 ml-auto mt-2 d-block"
            >
              Update
            </button>
          </div>
        )}
      </Fade>
    </Modal>
  );
}
