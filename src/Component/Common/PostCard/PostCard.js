import React, { useContext } from 'react';
import { ContextElement } from '../../../App';

const CardTemp = (props) => {
  const { title, body, id } = props.data;
  const [myUserId,] = useContext(ContextElement);

  return (
    <div className="card">
      {id}
      <h5>{title}</h5>
      {body}
      <div className="d-flex justify-content-between">
        <a href={`/postDetail/${id}`}>Comments</a>
        {props.data.userId == myUserId &&
          props.setOpenModal && (
            <span>
              <button
                className="btn btn-warning py-0 ml-2"
                onClick={(e) => {
                  props.setOpenModal(true);
                  props.handlerForModalData(props.data);
                }}
              >
                Edit
              </button>
              <button
                className="btn btn-danger py-0 ml-2"
              onClick={(e) => {
                props.data.delete = "delete";
                  props.setOpenModal(true);
                  props.handlerForModalData(props.data);
              }}
              >
                Delete
              </button>
            </span>
          )}
      </div>
    </div>
  );
};

export default CardTemp;