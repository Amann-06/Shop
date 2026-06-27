import { useContext } from "react";
import { CartContext } from "../context/CartContext";
import { useNavigate } from "react-router-dom";

interface ProductCardProps {
  id: string;
  image: string;
  name: string;
  category: string[];
  price: number;
  rating: number;
  quantity: number;
  discount?:number
}

const ProductCard = ({
  id,
  image,
  name,
  category,
  price,
  rating,
  quantity,
  discount,
}: ProductCardProps) => {
  const { setCartCount } = useContext(CartContext)!;
  const navigate = useNavigate();
  const addToCart = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await fetch("http://localhost:3000/api/cart", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          productId: id,
          quantity: 1,
        }),
      });
      const data = await response.json();
      if (!response.ok) {
        console.log(data.message);
        return;
      }
      setCartCount(prev => prev + 1);
      console.log("Product added successfully");
    } catch (err) {
      console.log(`Failed to add to cart`, err);
    }
  };
    const finalPrice =discount > 0
      ? Math.round(price * (1 - discount / 100))
      : price;

  return (
    <div className="bg-white rounded-2xl border p-4 hover:shadow-lg transition-all">
      <div
        onClick={() => navigate(`/view-product/${id}`)}
        className="h-40 overflow-hidden rounded-xl bg-gray-100 cursor-pointer">
        {image ? (
          <img
            src={image}
            alt={name}
            className="w-full h-full object-cover transition-transform duration-300 hover:scale-105 ease-out"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-gray-300 text-sm">No image</div>
        )}
      </div>

      <div className="mt-3">
        <p className="text-xs text-gray-500 h-4">
          {category.slice(0, 2).join(" • ")}
        </p>
        <h3
          onClick={() => navigate(`/view-product/${id}`)}
          className="font-medium mt-1 line-clamp-2 hover:underline underline-offset-2 transition-all cursor-pointer">
          {name}
        </h3>
        <div className="mt-2">
          {quantity === 0 ? (
            <span className="text-red-500 text-sm font-medium">
              Sold Out
            </span>
          ) : quantity <= 10 ? (
            <span className="text-orange-500 text-sm font-medium">
              Only {quantity} left
            </span>
          ) : (
            <span className="text-green-600 text-sm">
              In Stock
            </span>
          )}
        </div>
        <div className="flex items-center justify-between mt-3">
          <span className="font-bold">
            ₹{finalPrice}
            {discount &&
              <span className="font-medium line-through text-gray-400 ml-2 text-sm">₹{price}</span>
            }
          </span>
          <span className="text-sm text-yellow-500 flex gap-1 items-center">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-4">
              <path strokeLinecap="round" strokeLinejoin="round" d="M11.48 3.499a.562.562 0 0 1 1.04 0l2.125 5.111a.563.563 0 0 0 .475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 0 0-.182.557l1.285 5.385a.562.562 0 0 1-.84.61l-4.725-2.885a.562.562 0 0 0-.586 0L6.982 20.54a.562.562 0 0 1-.84-.61l1.285-5.386a.562.562 0 0 0-.182-.557l-4.204-3.602a.562.562 0 0 1 .321-.988l5.518-.442a.563.563 0 0 0 .475-.345L11.48 3.5Z" />
            </svg>
            <span className="mt-0.5">{Number(rating ?? 0).toFixed(1)}</span>
          </span>
        </div>

        <button onClick={addToCart} className="w-full mt-3 py-2 rounded-lg bg-blue-500 text-white text-sm hover:bg-blue-600 transition-colors">
          Add to Cart
        </button>
      </div>
    </div>
  );
};

export default ProductCard;