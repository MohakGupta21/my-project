import React from "react";
import { Link, useNavigate } from "react-router-dom";
import Edit from "../svgs/Edit";
import Delete from "../svgs/Delete";
import Close from "../svgs/Close";
import { useState } from "react";
import axios from "axios";
import { useDispatch } from "react-redux";
import { deleteMovie } from "../redux/movie/movieThunks";

const MovieCard = (props) => {
  const [showPopup,setShowPopup] = useState(false);
  const dispatch = useDispatch();
  
  const confirmDelete = () => {
    console.log(props);
    dispatch(deleteMovie(props.id)).then((res)=>{
      
      console.log(res.data);
      alert("Movie Deleted Successfully!");
      setShowPopup(false);
      window.location.reload();

    }).catch((err)=>{
      console.log(err);
      alert(err);
    })
  };
  return (
    <div className="bg-white shadow-lg rounded-lg overflow-hidden m-4 w-80">
      <div className="p-4 max-h-100">
        <h2 className="font-bold text-xl mb-2 text-center">{props.title}</h2>
        <p className="px-5 py-4 max-h-64 text-gray-700 text-base line-clamp">
          {props.description}
        </p>
        <div className="pt-5 flex justify-center">
          <Link
            to={`details/${props.id}`}
            className="text-center text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
          >
            More Details
          </Link>

            <Link to={`edit/${props.id}`} className="focus:outline-none text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800">
              <Edit />
            </Link>
          <button
            type="button"
            onClick={()=>setShowPopup(true)}
            className="focus:outline-none text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900"
          >
            <Delete />
          </button>
        {
          showPopup &&
          <div className="popup_box">
          <div className="popup_header">
            <span className="positionCorner" onClick={()=>setShowPopup(false)}>
              <Close />
            </span>
            <span className="sr-only">Close modal</span>
          </div>
          <div className="popup_content">
            <p className="popup_text_para">
              Are you sure you want to delete this product?
            </p>
            <div className="flex justify-center">
              <button
                type="button"
                onClick={()=>confirmDelete()}
                className="text-white bg-red-600 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 dark:focus:ring-red-800 font-medium rounded-lg text-sm inline-flex items-center px-5 py-2.5 text-center"
              >
                Yes, I'm sure
              </button>
              <button type="button" onClick={()=>setShowPopup(false)}className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 text-sm rounded-lg ms-2">
                No, Cancel
              </button>
            </div>
          </div>
        </div>
        }

        </div>
      </div>
    </div>
  );
};

export default MovieCard;
