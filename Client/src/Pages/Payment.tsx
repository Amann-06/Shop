import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import CartStatus from "../components/CartStatus";

const Payment = () => {

  const { state } = useLocation();
  const { selectedAddress, totalAmount } = state;
  const [selected, setSelected] = useState("cod");
  const navigate = useNavigate();

    const handlePayment = async () => {
        try {
        const token = localStorage.getItem("token");
        const response = await fetch("http://localhost:3000/api/order", {
            method: "POST",
            headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify({
            address: {
                street: selectedAddress.street,
                city: selectedAddress.city,
                state: selectedAddress.state,
                pincode: selectedAddress.postalCode,
                house: selectedAddress.house,
            }
            }),
        });
        const data = await response.json();
        if (!response.ok) return console.log("Order failed");
        navigate("/order-confirmation");
        } catch (err) {
        console.log(err);
        }
    };

  const methods = [
    {
      id: "cod",
      label: "Cash on delivery",
      icon:<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
            <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 18.75a60.07 60.07 0 0 1 15.797 2.101c.727.198 1.453-.342 1.453-1.096V18.75M3.75 4.5v.75A.75.75 0 0 1 3 6h-.75m0 0v-.375c0-.621.504-1.125 1.125-1.125H20.25M2.25 6v9m18-10.5v.75c0 .414.336.75.75.75h.75m-1.5-1.5h.375c.621 0 1.125.504 1.125 1.125v9.75c0 .621-.504 1.125-1.125 1.125h-.375m1.5-1.5H21a.75.75 0 0 0-.75.75v.75m0 0H3.75m0 0h-.375a1.125 1.125 0 0 1-1.125-1.125V15m1.5 1.5v-.75A.75.75 0 0 0 3 15h-.75M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Zm3 0h.008v.008H18V10.5Zm-12 0h.008v.008H6V10.5Z" />
            </svg>,
      available: true,
      description: "Pay when your order arrives",
    },
    {
      id: "upi",
      label: "UPI",
      icon: <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
            <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 1.5H8.25A2.25 2.25 0 0 0 6 3.75v16.5a2.25 2.25 0 0 0 2.25 2.25h7.5A2.25 2.25 0 0 0 18 20.25V3.75a2.25 2.25 0 0 0-2.25-2.25H13.5m-3 0V3h3V1.5m-3 0h3m-3 18.75h3" />
            </svg>,
      available: false,
      description: "GPay, PhonePe, Paytm & more",
    },
    {
      id: "card",
      label: "Credit / Debit card",
      icon:<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
            <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 8.25h19.5M2.25 9h19.5m-16.5 5.25h6m-6 2.25h3m-3.75 3h15a2.25 2.25 0 0 0 2.25-2.25V6.75A2.25 2.25 0 0 0 19.5 4.5h-15a2.25 2.25 0 0 0-2.25 2.25v10.5A2.25 2.25 0 0 0 4.5 19.5Z" />
            </svg>,
      available: false,
      description: "Visa, Mastercard, RuPay",
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <CartStatus status="payment" />

      <div className="flex justify-center p-5">
        <div className="w-full max-w-md">
          <div className="bg-white border rounded-xl overflow-hidden">
            <div className="flex items-center gap-3 px-5 h-14 border-b">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-5 text-gray-500">
                <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 8.25h19.5M2.25 9h19.5m-16.5 5.25h6m-6 2.25h3m-3.75 3h15a2.25 2.25 0 0 0 2.25-2.25V6.75A2.25 2.25 0 0 0 19.5 4.5h-15a2.25 2.25 0 0 0-2.25 2.25v10.5A2.25 2.25 0 0 0 4.5 21Z" />
              </svg>
              <h1 className="font-medium text-lg">Payment method</h1>
            </div>

            <div className="p-4 flex flex-col gap-3">
              {methods.map((method) => (
                <div
                  key={method.id}
                  onClick={() => method.available && setSelected(method.id)}
                  className={`flex items-center gap-4 p-4 rounded-lg border transition-colors
                    ${!method.available ? "opacity-50 cursor-not-allowed bg-gray-50" : "cursor-pointer"}
                    ${selected === method.id && method.available ? "border-gray-800 bg-gray-50" : "border-gray-200"}
                    ${method.available && selected !== method.id ? "hover:bg-gray-50" : ""}
                  `}
                >
                  <div className={`w-4 h-4 min-w-4 rounded-full border-2 flex items-center justify-center
                    ${selected === method.id && method.available ? "border-gray-800" : "border-gray-300"}`}>
                    {selected === method.id && method.available && (
                      <div className="w-2 h-2 rounded-full bg-gray-800" />
                    )}
                  </div>

                  <span className="text-xl">{method.icon}</span>

                  <div className="flex-1">
                    <p className="font-medium text-sm">{method.label}</p>
                    <p className="text-xs text-gray-400">{method.description}</p>
                  </div>

                  {!method.available && (
                    <span className="text-xs bg-gray-100 text-gray-400 px-2 py-1 rounded-full whitespace-nowrap">
                      Coming soon
                    </span>
                  )}
                </div>
              ))}
            </div>

            <div className="px-4 pb-4">
              <button
                onClick={handlePayment}
                disabled={!selected}
                className="w-full bg-black text-white py-2.5 rounded-lg font-medium hover:bg-black/85 disabled:opacity-50 disabled:cursor-not-allowed transition-colors flex items-center justify-center gap-2"
              >
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-4">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 10.5V6.75a4.5 4.5 0 1 0-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 0 0 2.25-2.25v-6.75a2.25 2.25 0 0 0-2.25-2.25H6.75a2.25 2.25 0 0 0-2.25 2.25v6.75a2.25 2.25 0 0 0 2.25 2.25Z" />
                </svg>
                Place order
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Payment;