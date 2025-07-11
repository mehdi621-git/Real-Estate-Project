 // Assuming Input is your custom component

import { useEffect, useState } from "react";
import Button from "../Components/Button";
import Input from "../Components/Input";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import SearchResultsBox from "../Components/SearchResultsBox";

const SearchResult = () => {
  const navigate =useNavigate()
  const [showMore ,setshowMore] =useState(false)
  const [loading,setloading] =useState(false)
  const [searchdata,setsearchdata] = useState([])
  const [sidebardata,setsidebardata] =useState({
    searchterm : '',
    type:'all',
    parking:false,
    furnished:false,
    offer:false,
    sort:'created_at',
    order:'desc',
  })
  const handleFormData =(e)=>{
       if(e.target.id == 'rent' || e.target.id == 'sell' || e.target.id == 'all'){
        setsidebardata({...sidebardata,type:e.target.id})
       }
       if(e.target.id === 'searchterm'){
        setsidebardata({...sidebardata,searchterm: e.target.value})
       }
       if(e.target.id == 'parking' || e.target.id == 'furnished' || e.target.id == 'offer'){
        setsidebardata({...sidebardata,[e.target.id]:e.target.checked || e.target.checked == 'true' ? true :false})
       }
       if(e.target.id == 'sort_order'){
            const sort = e.target.value.split('_')[0] || 'created_at';
            const order = e.target.value.split('_')[1] || 'desc'
            setsidebardata({...sidebardata,sort,order})
       }

      console.log("Sidebar data: ", sidebardata);
  }
  const handleSubmitForm =(e)=>{
     e.preventDefault();
     const urlParam =new URLSearchParams();
     urlParam.set('searchterm',sidebardata.searchterm);
     urlParam.set('offer',sidebardata.offer);
     urlParam.set('type',sidebardata.type);
     urlParam.set('parking',sidebardata.parking);
     urlParam.set('furnished',sidebardata.furnished);
     urlParam.set('sort',sidebardata.sort);
     urlParam.set('order',sidebardata.order);
     const query = urlParam.toString()
navigate(`/search?${query}`)


  }
  useEffect(()=>{
    const params =new URLSearchParams(location.search);
    const searchterm = params.get('searchterm');
      const offer =params.get('offer');
      const type =params.get('type');
      const parking=params.get('parking');
      const furnished=params.get('furnished');
      const sort=params.get('sort');
      const order=params.get('order');
      if(
        searchterm || offer || type || parking || furnished || sort || order
      ){
    setsidebardata({...sidebardata , offer : offer === 'true' ? true :false ,searchterm : searchterm || '' , type : type || 'all',parking : parking === 'true' ? true :false,furnished : furnished === 'true', sort : sort || 'created_at',order : order || 'desc'})

      }
      const searchListings =async ()=>{
        setloading(true)
              const searchQuery = params.toString()
              const res = await axios.get(`/server/listing/search?${searchQuery}`);
              console.log('filter data', res.data)
              if(res.data.success !=false){
                setsearchdata(res.data)
                if(res.data.length > 8){
                  setshowMore(true)
                }
              }else{
                console.log(res.data)
              }
              setloading(false)
      }
      searchListings()
  },[location.search])
  const handleShowMore =async ()=>{
    const startindex =  searchdata.length;
           const param =new URLSearchParams(location.search);
           param.set('startIndex',startindex)
           const searchQuery = param.toString();
           try {
                const res = await axios.get(`/server/listing/search?${searchQuery}`);
              console.log('filter data', res.data)
              if(res.data.success !=false){
                setsearchdata([...searchdata , res.data])
              }else{
                console.log(res.data)
              }
              if(res.data.legth <9){
                setshowMore(false)
              }
            }
            catch (error) {
            console.log(error)
           }

  }
  return (
    
    <div className="min-w-full min-h-screen flex flex-col sm:flex-row">
      {/* Left Panel */}
      <form onSubmit={handleSubmitForm} className="sm:w-[30%] w-full flex flex-col bg-gray-100 p-4 space-y-4">
        {/* Type Filters */}
        <div className="w-full flex gap-2 items-center">
         <span className="">Search Term: </span>
        <Input styles={'flex-1'} id={'searchterm'} plc={'Search Term'} value={sidebardata.searchterm} onchange={handleFormData}></Input>
        </div>
        <div className="flex items-center justify-evenly w-full">
          <span className="font-semibold mb-2 flex">Type:</span>
          <div className="flex flex-wrap gap-2 items-center justify-center">
            <label className="flex items-center gap-2">
              <Input id={'all'} type="checkbox" chk={sidebardata.type == 'all'} onchange={handleFormData} />
              Sale&Rent
            </label>
            <label className="flex items-center gap-2">
             <Input type="checkbox" id={"rent"} chk={sidebardata.type == 'rent'} onchange={handleFormData} />
              Rent
            </label>
            <label className="flex items-center gap-2">
             <Input type="checkbox" id={"sell"} chk={sidebardata.type == 'sell'} onchange={handleFormData} />
              Sale
            </label>
            <label className="flex items-center gap-2">
            <Input type="checkbox" id={"offer"} value={sidebardata.offer} onchange={handleFormData}/>
              Offer
            </label>
          </div>
        </div>

        {/* Amenities */}
        <div className="flex items-center  gap-2">
          <span className="flex font-semibold mb-2 ">Amenities:</span>
          <div className="flex flex-wrap gap-3">
            <label className="flex items-center gap-2">
              <Input type="checkbox" styles={"w-fit"} id={"parking"} value={sidebardata.parking} onchange={handleFormData}  />
              Parking
            </label>
            <label className="flex items-center gap-2">
              <Input type="checkbox" id={"furnished"} value={sidebardata.furnished} onchange={handleFormData}  />
              Furnished
            </label>
          </div>
        </div>

        {/* Sort Dropdown */}
        <div className='flex items-center gap-3'>
          <label className="flex font-semibold mb-2">Sort:</label>
          <select onChange={handleFormData} defaultValue={'created_at_desc'} className=" p-3 border rounded-lg outline-none " id="sort_order">
            <option value="regularprice_desc">Price (High to Low)</option>
            <option value="regularprice_asc">Price (Low to High)</option>
            <option value="createdAt_desc">Oldest </option>
            <option value="createdAt_asc">Latest </option>
          </select>
        </div>
       <Button
             
             
             
              styles={" p-2 bg-gray-600 text-white disabled:text-gray-85 rounded-md"}
             text={'Filter'}
            ></Button>
      </form>

      {/* Right Panel */}
      <div className="sm:w-[70%] w-full bg-gray-200 p-4">
        <h1 className="font-extrabold text-2xl">Listing Items</h1>
        { loading ? <p>Loading</p> : searchdata != null ? <SearchResultsBox searchListings = {searchdata} styles={'my-4'}></SearchResultsBox> : <p>No data Found</p>}
   {showMore &&    <Button onclick={handleShowMore} text={'Show more'} styles={'text-green-500 font-bold'}></Button>}

      </div>
    </div>
  );
};

export default SearchResult;
