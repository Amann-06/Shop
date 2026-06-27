import { useNavigate } from 'react-router-dom'
import React, { useEffect, useState } from 'react'
import Navbar from '../components/Navbar'
import Button from '../components/Button'

const SavedAddress = () => {
      const [addresses, setAddresses] = useState([]);
  const navigate = useNavigate();
  const [selectedAddress, setSelectedAddress] = useState(null);
  const getAddress = async () => {
    try{
        const token = localStorage.getItem("token");
        const response = await fetch(`http://localhost:3000/api/user`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          }
        });
        const data = await response.json();
        if(!response.ok){
            console.log("Error in fetching user address");
            return;
        }
        const addrs = data.data.addresses;
        setAddresses(addrs);
        const defaultAddr = addrs.find((a) => a.isDefault);
        if (defaultAddr) setSelectedAddress(defaultAddr._id); 
    }catch(err){
        console.log(err);
    }
  }
  return (
    <div className='h-screen flex flex-col'>
        <Navbar showLogo={true}/>
        <div
            onClick={()=>navigate(-1)} 
            className='px-10 py-5 flex gap-3 cursor-pointer'>
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
            <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 15.75 3 12m0 0 3.75-3.75M3 12h18" />
            </svg>
            Back
        </div>
        <div className='flex justify-center py-10'>
            <div className='flex flex-1 flex-col space-y-2 border p-5 rounded-lg max-w-lg shadow-md'>
                <h1 className='font-medium text-lg'>Your Address</h1>
                <h1>Saved Address</h1>
                <ul className="p-1 border rounded-md">
                    {addresses.length === 0 ? (
                        <li className="text-gray-500 p-1">No saved addresses found.</li>
                    ) : (
                        addresses.map((address) => (
                    <li key={address._id} 
                        onClick={() => setSelectedAddress(address._id)}
                        className={`p-3 border-b last:border-b-0 cursor-pointer transition-colors
                        ${selectedAddress === address._id ? 'bg-blue-50' : 'hover:bg-gray-50'}`}>
                    <div className="flex items-center gap-2">
                        <input type="radio" readOnly checked={selectedAddress === address._id} />
                        <div>
                        <p>{address.street}, {address.city}</p>
                        <p className="text-sm text-gray-500">{address.state} {address.postalCode}, {address.country}</p>
                        { address.isDefault &&
                            <div className='border bg-blue-100 rounded-full w-fit py-0.5 px-2 text-xs'>Default</div>
                        }
                        </div>
                    </div>
                    </li>
                        ))
                    )}
                </ul>
                <Button onClick={()=>navigate("/add-address")}>Add a new address</Button>
            </div>     
        </div>
    </div>
  )
}

export default SavedAddress
