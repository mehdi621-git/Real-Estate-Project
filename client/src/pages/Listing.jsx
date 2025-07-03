import React from "react";
import Input from "../Components/Input";
import Button from "../Components/Button";

const Listing = () => {
  return (
  <main className="max-w-4xl mx-auto px-4 py-6">
  <h1 className="text-2xl font-bold mb-6">Create a New Listing</h1>

  <form className="flex flex-col sm:flex-row gap-6">
    {/* Left Section */}
    <div className="flex-1 flex flex-col gap-4">
      <Input max={65} min={10} req={true} plc="Name" />
      <Input plc="Description" />
      <Input plc="Address" />
 

   
    
    
      <div className="flex flex-row gap-3 ">
        <label className="flex flex-row items-center">
          <Input type="checkbox" />
          <span>Sell</span>
        </label>
        <label className="flex flex-row items-center">
          <Input type="checkbox" />
          <span>Rent</span>
        </label>
       
        <label className="flex flex-row items-center">
          <Input type="checkbox" />
          <span>Furnished</span>
        </label>
        <label className="flex flex-row items-center">
          <Input type="checkbox" />
          <span>Offered</span>
        </label>
         <label className="flex flex-row items-center">
          <Input type="checkbox" styles={'w-fit'}/>
          <span className=" w-full">Parking Spot</span>
        </label>
      </div>

      {/* Number Inputs (Beds/Baths) */}
      <div className="flex flex-row gap-3  ">
        <label className="flex flex-row items-center">
          
          <Input type="number" />
          <span>Beds</span>
        </label>
        <label className="flex flex-row items-center">
          
          <Input type="number" />
          <span>Bathrooms</span>
        </label>
               <label className="flex flex-row items-center ">
          
          <Input type="number" />
          <span>Regular Price</span>
        </label>
        <label className="flex flex-row  items-center">
          
          <Input type="number" />
          <span>Discountd Price ($) %</span>
        </label>
      </div>
    </div>
    <div className="flex flex-1 flex-col gap-2">
      <div className="flex flex-row gap-2">
        <p>Images</p>
        <span>The First Imageibe Cover (max-6)</span>
      </div>
      <div className="flex flex-row gap-2 mx-0">
        <input type="file" multiple accept="images/*" className="w-full p-2 rounded-2 bg-gray-200 " />
        <Button type={'button'} styles={' p-2 bg-gray-600 text-white  rounded-md'} text={'Upload'}></Button>
      </div>
        <Button styles={'p-2 bg-gray-600 text-white w-full block rounded-md'} text={'Create Listing'}></Button>

    </div>
  </form>
</main>

  );
};

export default Listing;
