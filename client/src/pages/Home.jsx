import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import SwiperCore from "swiper";
import "swiper/css/bundle";

import "swiper/css";
import SearchResultsBox from "../Components/SearchResultsBox";
const Home = () => {
  const [offerListing, setofferListing] = useState([]);
  const [saleListing, setsaleListing] = useState([]);
  const [rentListing, setrentListing] = useState([]);

  useEffect(() => {
    const fetchOfferListing = async () => {
      try {
        const res = await axios.get(
          "/server/listing/search?offer=true&limit=4"
        );
        setofferListing(res.data);
        console.log("offer", res.data);
        fetchRentListing();
      } catch (error) {
        console.log(error);
      }
    };
    const fetchRentListing = async () => {
      try {
        const res = await axios.get("/server/listing/search?type=rent&limit=4");
        setrentListing(res.data);
        console.log("rent", res.data);

        fetchSaleListing();
      } catch (error) {
        console.log(error);
      }
    };
    const fetchSaleListing = async () => {
      try {
        const res = await axios.get("/server/listing/search?type=sell&limit=4");
        setsaleListing(res.data);
        console.log("sale", res.data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchOfferListing();
  }, []);
  return (
    <div>
      {/* Top */}
      <div className="flex flex-col gap-6 py-28 px-3 max-w-6xl mx-auto">
        <h1 className="text-slate-500 font-bold text-3xl lg:text-6xl">
          Find Your Next<span className="text-slate-400"> Perfect </span> <br />{" "}
          Place with Ease
        </h1>
        <p className="text-gray-400 text-xs sm:text-sm">
          Mehdi Estate is a perfect place to find your next place <br /> We have
          wide range of property for you to choose
        </p>
        <Link
          to={"/search"}
          className="text-blue-800 font-bold hover:underline text-sm"
        >
          Let's start now ...
        </Link>
      </div>
      {/* Swiper */}
      <Swiper modules={[Navigation]} navigation className="mySwiper">
        {offerListing &&
          offerListing.length > 0 &&
          offerListing.map((list, i) => (
            <SwiperSlide key={list._id || i}>
              <div
                style={{
                  background: `url(${list.imageUrls[0]}) center center / cover no-repeat`,
                }}
                className="h-[500px] w-full"
              />
            </SwiperSlide>
          ))}
      </Swiper>
      <div className="max-w-6xl mx-auto p-3 flex flex-col gap-8 mt-10  ">
        <div className="flex- flex-col gap-4">
          <h2 className="text-2xl font-semibold text-slate-600">
            Recent Offers
          </h2>
          <Link
            to={"/search?offer=true"}
            className="text-sm text-blue-800 hover:underline font-bold"
          >
            Show more offers
          </Link>

          {offerListing && offerListing.length > 0 && (
            <SearchResultsBox
              searchListings={offerListing}
              styles={"flex-nowrap flex-grow"}
            ></SearchResultsBox>
          )}
        </div>
         <div className="flex- flex-col gap-4">
          <h2 className="text-2xl font-semibold text-slate-600">
            Recent Offers for Rent
          </h2>
          <Link
            to={"/search?type=rent"}
            className="text-sm text-blue-800 hover:underline font-bold"
          >
            Show more offers
          </Link>

          {rentListing && rentListing.length > 0 && (
            <SearchResultsBox
              searchListings={rentListing}
              styles={"flex-nowrap flex-grow"}
            ></SearchResultsBox>
          )}
        </div>
         <div className="flex- flex-col gap-4">
          <h2 className="text-2xl font-semibold text-slate-600">
            Recent Offer for Sale
          </h2>
          <Link
            to={"/search?type=sell"}
            className="text-sm text-blue-800 hover:underline font-bold"
          >
            Show more offers
          </Link>

          {saleListing && saleListing.length > 0 && (
            <SearchResultsBox
              searchListings={saleListing}
              styles={"flex-nowrap flex-grow"}
            ></SearchResultsBox>
          )}
        </div>
      </div>
    </div>
  );
};

export default Home;
