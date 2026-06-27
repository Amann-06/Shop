import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import ProductCard from "../components/ProductCard";

const CategoryPage = () => {
  const { category } = useParams();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [sort, setSort] = useState("relevance");
  const navigate = useNavigate();

  const getProducts = async () => {
    setLoading(true);
    try {
      const response = await fetch(
        `http://localhost:3000/api/product?category=${encodeURIComponent(category ?? "")}`,
        { headers: { "Content-Type": "application/json" } }
      );
      const data = await response.json();
      if (!response.ok) return;
      setProducts(data.products);
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  const sorted = [...products].sort((a, b) => {
    if (sort === "price-asc") return a.price - b.price;
    if (sort === "price-desc") return b.price - a.price;
    if (sort === "newest") return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
    if (sort === "rating") return b.rating - a.rating;
    return 0;
  });

  useEffect(() => { getProducts(); }, [category]);

  return (
    <div className="flex min-h-screen">
      <Sidebar />
      <div className="flex-1 flex flex-col">
        <Navbar />

        <div className="px-6 py-5 flex-1">

          <div className="bg-white/80 border rounded-3xl shadow-sm px-6 py-4 mb-5 flex items-center justify-between">
            <div>
              <p className="text-xs text-gray-400 mb-0.5 flex items-center gap-1">
                <span
                  onClick={() => navigate("/")}
                  className="hover:text-gray-600 cursor-pointer"
                >Home</span>
                <span>/</span>
                <span className="text-gray-600 font-medium capitalize">{category}</span>
              </p>
              <h1 className="text-xl font-semibold capitalize">{category}</h1>
              <p className="text-sm text-gray-400 mt-0.5">{products.length} products</p>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-sm text-gray-400">Sort by</span>
              <select
                value={sort}
                onChange={(e) => setSort(e.target.value)}
                className="text-sm border rounded-full px-4 py-2 outline-none bg-gray-50 hover:bg-gray-100 transition-colors cursor-pointer"
              >
                <option value="relevance">Relevance</option>
                <option value="price-asc">Price: low to high</option>
                <option value="price-desc">Price: high to low</option>
                <option value="newest">Newest first</option>
                <option value="rating">Top rated</option>
              </select>
            </div>
          </div>

          {loading ? (
            <p className="text-sm text-gray-400 px-2">Loading...</p>
          ) : sorted.length === 0 ? (
            <div className="bg-white border rounded-3xl shadow-sm p-10 text-center">
              <p className="text-gray-400 text-sm">No products found in this category.</p>
              <button
                onClick={() => navigate("/")}
                className="mt-4 text-sm text-indigo-600 hover:underline"
              >
                Browse all products
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
              {sorted.map(product => (
                <ProductCard
                  key={product._id}
                  id={product._id}
                  image={product.images[0]}
                  name={product.name}
                  category={product.category}
                  price={product.price}
                  rating={product.rating}
                  quantity={product.quantity}
                />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default CategoryPage;