import React, { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import { FaMapMarkerAlt } from "react-icons/fa";
import { FaBed } from "react-icons/fa";
import { FaBath } from "react-icons/fa";
import { LuWarehouse } from "react-icons/lu";
import "swiper/css";
import "swiper/css/autoplay";
import axios from "axios";
import { IoArrowRedoCircle } from "react-icons/io5";
import { useParams } from "react-router-dom";
import { FaSquareParking } from "react-icons/fa6";
const ViewList = () => {
  const [list, setlist] = useState([]);

  const params = useParams();
  console.log("the params is", params.id);
  useEffect(() => {
    const getList = async () => {
      const res = await axios.get(`/server/listing/get/${params.id}`);
      console.log(res.data);
      setlist(res.data[0]);
      console.log(res.data[0].imageUrls);
    };
    getList();
  }, [params.id]);
  return (
    <main>
      <Swiper
        modules={[Autoplay]}
        spaceBetween={10}
        slidesPerView={1}
        autoplay={{ delay: 2500, disableOnInteraction: false }}
        loop={true}
        className="w-full h-[350px] rounded-lg overflow-hidden my-1"
      >
        {list?.imageUrls?.map((url, i) => (
          <SwiperSlide key={i}>
            <img
              src={url}
              alt={`slide-${i}`}
              className="w-full h-full object-cover relative"
            />
            <IoArrowRedoCircle 
              onClick={() => {
                navigator.clipboard.writeText(window.location.href);
              }}
              className="absolute size-max flex-wrap top-2 hover:cursor-pointer right-2 bg-white bg-opacity-80 rounded-full p-1 hover:bg-opacity-100 transition"
              title="Copy link"
            />
          </SwiperSlide>
        ))}
      </Swiper>
      <div className="max-w-4xl sm:mx-auto px-4">
        <h1 className=" font-extrabold text-3xl my-1">
          {list.name + "   --->"}{" "}
          {list.offer && +list.regularprice - +list.offerprice}${" "}
          {list.type == "rent" && "/ month"}
        </h1>
        <div className="flex gap-2 items-center my-4 ml-2">
          <FaMapMarkerAlt color="green" />
          <p>{list.address}</p>
        </div>
        <div className="flex gap-2">
          <p className="p-2 text-white bg-red-600 rounded-lg w-fit">
            {list.type == "sell" ? "Sale" : "Rent"}
          </p>
          {list.offer && (
            <p className="p-2 text-white bg-green-600 rounded-lg w-fit">
              {list.offerprice + "$ dicount"}
            </p>
          )}
        </div>
        <div className="flex my-2">
          <span className="font-bold">Description -</span>
          <p>{list.description}</p>
        </div>

        <div className="flex gap-3 text-green-800">
          <div className="flex items-center flex-row-reverse gap-1 justify-center">
            <span>{list.bedrooms + 'Beds'}</span>
            <FaBed />
          </div>
          <div className="flex items-center flex-row-reverse gap-1 justify-center ">
            <span>{list.bathrooms + "Baths"}</span>
            <FaBath />
          </div>
          <div className="flex items-center flex-row-reverse gap-1 justify-center ">
            <span>{list.parking ? "Parking" : "No Parking"}</span>
            <FaSquareParking />
          </div>
          <div className="flex items-center flex-row-reverse gap-1 justify-center ">
            <span>{list.furnished ? "Furnished" : "No Furnished"}</span>
            <LuWarehouse />
          </div>
        </div>
      </div>
    </main>
  );
};

export default ViewList;
