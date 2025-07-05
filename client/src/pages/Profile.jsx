import React from "react";
import { useRef } from "react";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import Button from "../Components/Button";
import { useState } from "react";
import {
  deleteUserFailure,
  deleteUserStart,
  deleteUserSuccess,
  ProfileUpdationStart,
  SignoutFailure,
  SignoutStart,
  SignoutSuccess,
  UpdateProfileError,
  UpdateUserProgress,
} from "../redux/user/userSlice";
import { Link, useNavigate } from "react-router-dom";
import Input from "../Components/Input";
import Block from "../Components/Block";

const Profile = () => {
  const { user, error, loading } = useSelector((state) => state.user);
  const [progress, setProgress] = useState(0);
  const [tempdata, settempdata] = useState({});
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [deleteListerror ,setdeleteListerror] = useState(null)
  const refImg = useRef();
  const [userListings,setuserListings] =useState([])
  const handleImageUpload = async () => {
    const formdata = new FormData();
    const file = refImg.current.files[0];
    formdata.append("image", file);

    try {
      dispatch(ProfileUpdationStart());
      const res = await axios.post(
        `/server/cloudinary/imgUpload/${user._id}`,
        formdata,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
          onUploadProgress: (progressEvent) => {
            const percent = Math.round(
              (progressEvent.loaded * 100) / progressEvent.total
            );
            setProgress(percent);
            console.log(progress);
          },
        }
      );
      const data = res.data.user;
      dispatch(UpdateUserProgress(data));
      console.log("Upload success:", res.data);
    } catch (error) {
      dispatch(UpdateProfileError(error));
      console.error("Upload failed:", error);
    }
  };

  const handleFormData = (e) => {
    settempdata({ ...tempdata, [e.target.id]: e.target.value });
    console.log(tempdata);
  };
  const handleUpdateProfile = async (e) => {
    e.preventDefault();
    try {
      dispatch(ProfileUpdationStart());
      const res = await fetch(`/server/updation/profile/${user._id}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(tempdata),
      });

      const data = await res.json();
      if (data.success == false) {
        dispatch(UpdateProfileError(data.message));
        return;
      } else if (data.statuscode == 11000) {
        dispatch(UpdateProfileError("Username Already Exists"));
        return;
      }
      dispatch(UpdateUserProgress());
      console.log(data);
    } catch (error) {
      if (error.statuscode == 11000) {
        dispatch(UpdateProfileError("Username Already Exists"));
      } else dispatch(error.message);
    }
  };
  const handleDeleteUser = async () => {
    try {
      dispatch(deleteUserStart());
      const res = await fetch(`/server/auth/deleteuser/${user._id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json", // optional unless you're sending a body
        },
      });

      const data = await res.json();
      console.log(data);
      if (data.success == true) {
        dispatch(deleteUserSuccess());
        navigate("/sign-up");
      }
    } catch (error) {
      dispatch(deleteUserFailure(error.message));
    }
  };
  const handleSignOut = async () => {
    try {
      dispatch(SignoutStart());
      const res = await fetch("/server/auth/signout", {
        method: "GET",
      });

      const data = await res.json();
      console.log(data);
      if (data.success == true) {
        dispatch(SignoutSuccess());
        navigate("/sign-up");
      }
    } catch (error) {
      dispatch(SignoutFailure(error.message));
      console.log(error);
    }
  };
  const handleShowListing =async ()=>{
         try {
           const res = await axios.get(`/server/listing/fetch/${user._id}`)
           console.log(res.data)
           setuserListings(res.data)
         } catch (error) {
          
         }
  }
  const handleDeleteListing =async (listId)=>{
    console.log(listId)
              try {
                   const res = await axios.delete(`/server/listing/delete/${listId}`)
                   console.log(res)
                   if(res.status ==200){
                    setuserListings((prev)=>prev.filter((item)=> item._id != listId))
                    setdeleteListerror(null)
                    return
                   }
                   setdeleteListerror(res.data.message)
              } catch (error) {
                 setdeleteListerror(error.message)
              }
  }
  return (
    <div className="max-w-lg mx-auto mb-5">
      <h1 className="text-center my-7">Profile</h1>
      <form
        action=""
        className="flex flex-col gap-2 items-center"
        onSubmit={handleUpdateProfile}
      >
        <input
          type="file"
          ref={refImg}
          hidden
          accept="image/*"
          onChange={handleImageUpload}
        />
        <img
          src={user.photo}
          alt="picture"
          className="rounded-full h-14 w-14"
          onClick={() => refImg.current && refImg.current.click()}
        />
        <p className="text-green-700">
          {!error && loading && progress != 0
            ? progress == "100"
              ? "Updating..."
              : progress + "%"
            : ""}
        </p>
        {error && <p className="text-red-600">{error}</p>}
        <Input
          type="text"
          styles="p-2 border rounded-md  w-full outline-none"
          plc="UserName"
          id="username"
          defVal={user.username}
          onchange={handleFormData}
        />
        <input
          type="text"
          className="p-2 border rounded-md w-full outline-none"
          placeholder="Email"
          id="email"
          readOnly
          value={user.email}
        />
        <input
          type="text"
          className="p-2 border rounded-md w-full outline-none"
          placeholder="Password"
          id="password"
          onChange={handleFormData}
        />
        <Button
          styles="bg-slate-500 hover:opacity-95 disabled:opacity-80 rounded-md p-2 w-full my-2"
          text={loading ? "Submitting..." : "Update Fiels"}
        ></Button>
      </form>
      {error && <p>{error.message}</p>}

      <Link
        to={`/newListing/${user._id}`}
        className="bg-green-500 hover:opacity-95 text-center rounded-md p-2 w-full block my-1"
      >
        Create New Listing
      </Link>

      <div className="flex justify-between mt-2">
        <span
          className="text-red-700 hover:cursor-pointer"
          onClick={handleDeleteUser}
        >
          Delete This Account
        </span>
        <span
          className="text-red-500 hover:cursor-pointer"
          onClick={handleSignOut}
        >
          Sign out
        </span>
      </div>
      
      <Button onclick = {handleShowListing} styles="text-green-500 text-center font-semibold mt-7 w-full block mx-auto hover:cursor-pointer" text={"See All Listings"}>
       
      </Button>
    {userListings.length !=0 ? <p className="font-bold my-1 text-center">Your Listings</p> : ""}
    {deleteListerror != null ? <p>{deleteListerror}</p> : " "}
     {userListings?.map((item) => (
 <Block list = {item} editButton={()=>handleEditListing(item._id)} deleteButton={()=>handleDeleteListing(item._id)} editButtonLink={`/newListing/${item._id}`} linkto={`/listing/${user._id}`}></Block>
))}
  
    </div>

  );
};

export default Profile;
