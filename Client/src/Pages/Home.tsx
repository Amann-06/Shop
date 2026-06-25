import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";
import CategoryTabs from "../components/CategoryTabs";
import ProductContainer from "../components/ProductContainer";
import Hero from "../components/Hero";
import ProductCard from "../components/ProductCard";
import { useState , useEffect } from "react";
const Home = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleGetProducts = async () => {
    setLoading(true);
    try {
      const response = await fetch("http://localhost:3000/api/product", {
        method: "GET",
        headers: { "Content-Type": "application/json" }
      });
      const data = await response.json();
      if (!response.ok) return;
      setProducts(data.products);
    } catch(err) {
      console.log("Product Fetch Error", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    handleGetProducts();
  }, []);

  const recentProducts = [...products].sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()).slice(0, 8);

  const renderCards = (list) => list.map(product => (
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
  ));

  return (
    <div className="flex min-h-screen">
      <Sidebar />
      <div className="flex-1">
        <Navbar />
        {/* <CategoryTabs /> */}
        <main className="p-6 space-y-5">
          <Hero />
          {loading ? (
            <p className="text-gray-400 text-sm">Loading products...</p>
          ) : (
            <>
              <ProductContainer title="Recently Added">
                {renderCards(recentProducts)}
              </ProductContainer>
              <ProductContainer title="All Products">
                {renderCards(products)}
              </ProductContainer>
            </>
          )}
        </main>
      </div>
    </div>
  );
};

export default Home;