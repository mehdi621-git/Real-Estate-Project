import React, { useState } from "react";
import Input from "../Components/Input";
import Button from "../Components/Button";
import axios from "axios";
import { useSelector } from "react-redux";

const Listing = () => {
  const { user } = useSelector((state) => state.user);
  const [imgUploaded, setimgUploaded] = useState(0);
  const [images, setimages] = useState([]);
  const [imageUrl, setimageUrl] = useState([]);
  const [formerror,setformerror]=useState('');
  const [formloading,setformloading] =useState(false)
  const [formdata, setformdata] = useState({
    imageUrls: [],
    name: "",
    description: "",
    address: "",
    type: "rent",
    bedrooms: 1,
    bathrooms: 1,
    regularprice: 0,
    discountprice: 0,
    offer: false,
    parking: false,
    furnished: false,
  });
  const [error, seterror] = useState("");
  const [loading, setloading] = useState(false);
  console.log(typeof images);

  const handleUploadImages = () => {
    console.log(images.length);
   
    if (imageUrl.length >= 0 && imageUrl.length < 7) {
      for (let i = 0; i < images.length; i++) {
       
        uploadImage(images[0]);
      }
      
       setformdata((prev) => ({
  ...prev,
  imageUrls: imageUrl,
}))
    } else {
      console.log("Length exceeds");
    }
  };
  const uploadImage = async (file) => {
    const formData = new FormData();
    formData.append("image", file);
    try {
      setloading(true);
      const res = await axios.post(
        `/server/cloudinary/imgUpload/${user._id}`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
          onUploadProgress: (e) => {
            const percent = Math.round((e.loaded * 100) / e.total);
            setimgUploaded(percent);
            console.log(`Uploading ${file.name}: ${percent}%`);
          },
        }
      );
      setimageUrl([...imageUrl, res.data.user.photo]);
     setloading(false);

      console.log(res.data.user);
      console.log(imageUrl);
    } catch (error) {
      seterror(error);
      console.log(error);
    }
  };
  const handleformData = (e) => {

    if(e.target.id == 'rent' || e.target.id == 'sell'){
             setformdata({
              ...formdata , type:e.target.id
             })
    }
    if(e.target.id == 'offer' || e.target.id == 'parking' || e.target.id == 'furnished'){
      setformdata({
        ...formdata , [e.target.id] :e.target.checked
      })
    }
      if(e.target.type == 'number' || e.target.type == 'text'){
      setformdata({
        ...formdata , [e.target.id] :e.target.value
      })
    }


    console.log(formdata)
  };
  const handleSubmitForm =async (e)=>{
    e.preventDefault();

    try {
      setformloading(true)
      const res = await axios.post('/server/listing/create', {
    ...formdata,
    userRef: user._id,
    
  })
  console.log(res.data)
  setformloading(false)
    } catch (error) {
          setformerror(error)
    }
  }
  return (
    <main className="max-w-4xl mx-auto px-4 py-6">
      <h1 className="text-2xl font-bold text-center mb-9">
        Create a New Listing
      </h1>

      <form className="flex flex-col sm:flex-row gap-6" onSubmit={handleSubmitForm}>
        {/* Left Section */}
        <div className="flex-1 flex flex-col gap-4">
          <Input type={'text'} max={65} min={10} req={true} plc="Name" id={"name"} onchange={handleformData} value={formdata.name}/>
          <Input type={'text'} plc="Description" id={"description"} onchange={handleformData} value={formdata.description}/>
          <Input plc="Address" id={"address"} onchange={handleformData} value={formdata.address}/>

          <div className="flex flex-row gap-3 ">
            <label className="flex flex-row items-center">
              <Input type="checkbox" id={"sell"} onchange={handleformData} chk={formdata.type === 'sell'}/>
              <span>Sell</span>
            </label>
            <label className="flex flex-row items-center">
              <Input type="checkbox" id={"rent"} onchange={handleformData} chk={formdata.type === 'rent'}/>
              <span>Rent</span>
            </label>

            <label className="flex flex-row items-center">
              <Input type="checkbox" id={"furnished"} onchange={handleformData} chk={formdata.furnished} />
              <span>Furnished</span>
            </label>
            <label className="flex flex-row items-center">
              <Input type="checkbox" id={"offer"} onchange={handleformData} chk={formdata.offer}/>
              <span>Offered</span>
            </label>
            <label className="flex flex-row items-center">
              <Input type="checkbox" styles={"w-fit"} id={"parking"} onchange={handleformData} chk={formdata.parking}/>
              <span className=" w-full">Parking Spot</span>
            </label>
          </div>

          {/* Number Inputs (Beds/Baths) */}
          <div className="flex flex-row gap-3  ">
            <label className="flex flex-row items-center">
              <Input type="number" min={'1'}  id={"bedrooms"} onchange={handleformData} value={formdata.bedrooms}/>
              <span>Beds</span>
            </label>
            <label className="flex flex-row items-center">
              <Input type="number" id={"bathrooms"} value={formdata.bathrooms} onchange={handleformData}/>
              <span>Bathrooms</span>
            </label>
            <label className="flex flex-row items-center ">
              <Input type="number" id={"regularprice"} value={formdata.regularprice} onchange={handleformData}/>
              <span>Regular Price</span>
            </label>
            <label className="flex flex-row  items-center">
              <Input type="number" id={"offerprice"} value={formdata.discountprice} onchange={handleformData}/>
              <span>Discountd Price ($) %</span>
            </label>
          </div>
        </div>
        <div className="flex flex-1 flex-col gap-2">
          <div className="flex flex-row gap-2">
            <p className="font-bold">Images</p>
            <span>The First Imageibe Cover (max-6)</span>
          </div>
          <div className="flex flex-row gap-2 mx-0">
            <div className="w-full p-2 rounded-2 bg-gray-200 flex items-center">
              <input
                type="file"
                multiple
                accept="images/*"
                onChange={(e) => setimages(e.target.files)}
                required
              />
              <p className="text-green-500 font-bold ">{imgUploaded}% </p>
            </div>
            <Button
              disabled={loading ? true : false}
              type={"button"}
              onclick={handleUploadImages}
              styles={" p-2 bg-gray-600 text-white disabled:text-gray-85 rounded-md"}
              text={loading ? "UploaDing..." : "Upload"}
            ></Button>
          </div>
          <div>
            {imageUrl && imageUrl.length > 0
              ? imageUrl.map((item, index) => (
                  <div key={index} className="flex justify-between ">
                    <img src={item} alt="" className="w-14 h-14 my-1" />
                    <Button text="Delete" />
                  </div>
                ))
              : error
              ? error
              : "No image found"}
          </div>
          <Button disabled={formloading ? true : false}
            styles={"p-2 bg-gray-600 text-white disabled:opacity-85 w-full block rounded-md"}
            text={formloading ? "CreateingListing" : "Create Listing"}
          ></Button>
          {setformerror ? <p>{formerror}</p> : null}

        </div>
      </form>
    </main>
  );
};

export default Listing;
