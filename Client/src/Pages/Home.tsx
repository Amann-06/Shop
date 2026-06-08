import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";
import CategoryTabs from "../components/CategoryTabs";
import ProductContainer from "../components/ProductContainer";
import Hero from "../components/Hero";
import ProductCard from "../components/ProductCard";
import { useState , useEffect } from "react";
const Home = () => {
  const [products,setProducts] = useState([]);
  const handleGetProducts = async () => {
    try{
        const response = await fetch("http://localhost:3000/api/product",{
            method: "GET",
            headers: {
              "Content-Type": "application/json",
            }
        })
        const data = await response.json();
        if(!response.ok){
            console.log('Failed to fetch products');
            return;
        }
        setProducts(data.products);
    }catch(err){
        console.log('Product Fetch Error',err);
    }
  }
  useEffect(() => {
    handleGetProducts();
  }, []);
  return (
    <div className="flex min-h-screen">
      <Sidebar />

      <div className="flex-1">
        <Navbar />
        <CategoryTabs/>
        <main className="p-6 space-y-5">
            <Hero/>
            <ProductContainer title="Recently Added">
                {products.map(product => (
                <ProductCard
                    key={product._id}
                    id={product._id}
                    image={product.image}
                    name={product.name}
                    category={product.category}
                    price={product.price}
                    rating={product.rating}
                    quantity={product.quantity}
                />
                ))}
            </ProductContainer>
            <ProductContainer title="All Products">
            </ProductContainer>
        </main>
      </div>
    </div>
  );
};

export default Home;