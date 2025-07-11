import React from 'react'
import { Link } from 'react-router-dom'
import { FaMapMarkerAlt } from "react-icons/fa";

const SearchResultsBox = ({searchListings ,styles}) => {
  console.log("from search box",searchListings)
  return (
    <div className={`  shadow-md transition-shadow hover:shadow-lg overflow-hidden rounded-lg w-full sm:[330px] flex gap-2  flex-wrap ${styles }`}>


    {searchListings?.map((list)=>(
<Link
  to={`/property-listing/${list._id}`}
  className="w-full sm:w-[280px] md:w-[300px] lg:w-[320px] bg-white rounded-lg shadow-sm hover:shadow-md transition duration-200 overflow-hidden border border-gray-200"
>

  <img
    src={list?.imageUrls[0]}
    alt={list?.name}
    className="h-[180px] w-full object-cover hover:scale-105 transition-transform duration-300"
  />

  <div className="p-3 flex flex-col gap-2">
    <h1 className="truncate text-base font-semibold text-slate-800">{list?.name}</h1>

    <div className="flex items-center gap-1 text-xs text-gray-500">
      <FaMapMarkerAlt className="text-green-500" />
      <p className="truncate">{list?.address}</p>
    </div>

    <p className="text-xs text-gray-600 line-clamp-3 leading-snug">
      {list?.description}
    </p>

    <p className="text-base font-bold text-blue-600">
     
        {
  list?.offer && typeof list?.offerprice === 'number'
    ? (list?.regularprice - list?.offerprice).toLocaleString('en-US')
    : list?.regularprice.toLocaleString('en-US')
}
      <span className="text-xs text-gray-500 ml-1">$</span>
      {list?.type === "rent" && <span className="text-xs text-gray-500">/month</span>}
    </p>

    <div className="flex justify-between items-end h-full text-xs text-gray-700 mt-1">
      <p>🛏 {list?.bedrooms} {list?.bedrooms > 1 ? "Beds" : "Bed"}</p>
      <p>🛁 {list?.bathrooms} {list?.bathrooms > 1 ? "Baths" : "Bath"}</p>
    </div>
  </div>
</Link>


    

  ))}
</div>
  )
}

export default SearchResultsBox