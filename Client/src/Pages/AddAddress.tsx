import { useState } from "react";
import Navbar from "../components/Navbar";
import { useNavigate } from "react-router-dom";

const AddAddress = () => {
  const [house,setHouse] = useState("");
  const [street, setStreet] = useState("");
  const [city, setCity] = useState("");
  const [stateName, setStateName] = useState("");
  const [postalCode, setPostalCode] = useState("");
  const [country, setCountry] = useState("");
  const [isDefault, setIsDefault] = useState(false);
  const navigate = useNavigate();

  const handleSubmit =  async(e:React.FormEvent) =>{
    e.preventDefault();
    try{
        const token = localStorage.getItem("token");
        const response = await fetch(`http://localhost:3000/api/user`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body:JSON.stringify({
            house: house,
            street:street,
            city:city,
            state:stateName,
            postalCode:postalCode,
            country:country,
            isDefault:isDefault
          })
        });
        const data = await response.json();
        if(!response.ok){
            console.log("Error in fetching user address");
            return;
        }
        console.log("Address added successfully");
        navigate(-1);
    }catch(err){
      console.log(err);
    }
  }

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Navbar showLogo={true}/>
      <button className="mr-auto px-10 flex items-center gap-1 text-gray-500 py-3 " onClick={()=>navigate(-1)}>
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-5">
          <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 15.75 3 12m0 0 3.75-3.75M3 12h18" />
        </svg>
        <span className="hover:text-gray-700 transition-colors cursor-pointer">Back</span>
        <span>/</span>
        <span className="text-gray-600 font-medium">Add new address</span>
      </button>
      <div className="flex-1 flex items-center justify-center p-4">
        <div className="w-full max-w-2xl bg-white border rounded-xl shadow-sm p-8">
          <div className="space-y-2 pb-3 mb-5 border-b">
            <div className="border w-fit p-1 rounded-lg">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-8">
                <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
                <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1 1 15 0Z" />
              </svg>
            </div>
            <h1 className="text-2xl font-semibold">
              Add Shipping Address
            </h1>
            <span className="font-medium text-gray-500 text-sm">This address will be used for delivery</span>
          </div>
          <form onSubmit={handleSubmit} className="space-y-3 w-full flex-1">
            <div className="flex flex-col flex-1  gap-2">
              <label htmlFor="house" className="md:w-40 font-medium">
                HOUSE
              </label>
              <input
                id="house"
                type="text"
                value={house}
                onChange={(e) => setHouse(e.target.value)}
                className="flex-1 border rounded-md px-3 py-2 outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div className="flex flex-col flex-1  gap-2">
              <label htmlFor="street" className="md:w-40 font-medium">
                STREET ADDRESS
              </label>
              <input
                id="street"
                type="text"
                value={street}
                onChange={(e) => setStreet(e.target.value)}
                className="flex-1 border rounded-md px-3 py-2 outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            

            <div className="flex justify-between flex-1 w-full gap-5">
              <div className="flex flex-1 flex-col gap-2 ">
                <label htmlFor="city" className="md:w-40 font-medium">
                  CITY
                </label>
                <input
                  id="city"
                  type="text"
                  value={city}
                  onChange={(e) => setCity(e.target.value)}
                  className="flex-1 border rounded-md px-3 py-2 outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div className="flex flex-1 flex-col gap-2 ">
                <label htmlFor="state" className="md:w-40 font-medium">
                  STATE
                </label>
                <input
                  id="state"
                  type="text"
                  value={stateName}
                  onChange={(e) => setStateName(e.target.value)}
                  className="flex-1 border rounded-md px-3 py-2 outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>

            <div className="flex justify-between flex-1 w-full gap-5 border-b pb-8">
              <div className="flex flex-1 flex-col gap-2">
                <label htmlFor="pcode" className="md:w-40 font-medium">
                  POSTAL CODE
                </label>
                <input
                  id="pcode"
                  type="text"
                  value={postalCode}
                  onChange={(e) => setPostalCode(e.target.value)}
                  className="flex-1 border rounded-md px-3 py-2 outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div className="flex flex-1 flex-col gap-2 ">
                <label htmlFor="country" className="md:w-40 font-medium">
                  COUNTRY
                </label>
                <input
                  id="country"
                  type="text"
                  value={country}
                  onChange={(e) => setCountry(e.target.value)}
                  className="flex-1 border rounded-md px-3 py-2 outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>

            <div className="flex items-center gap-3 pt-2">
              <input
                id="default"
                type="checkbox"
                checked={isDefault}
                onChange={(e) => setIsDefault(e.target.checked)}
                className="h-4 w-4"
              />
              <label htmlFor="default" className="font-medium">
                Make this my default address
              </label>
            </div>

            <div className="pt-4">
              <button className="w-full bg-blue-500 py-2 text-white font-medium rounded-lg hover:bg-blue-600">
                Save Address
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddAddress;