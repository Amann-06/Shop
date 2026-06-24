import Sidebar from '../components/Sidebar'
import Navbar from '../components/Navbar'
import CategoryTabs from '../components/CategoryTabs'
import ProductContainer from '../components/ProductContainer'
import ProductCard from '../components/ProductCard'
import { useState, useEffect } from 'react'
import { useSearchParams } from 'react-router-dom'

const SearchPage = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searchParams] = useSearchParams();
  const query = searchParams.get("q") ?? "";

  const searchProducts = async (searchQuery: string) => {
    if (!searchQuery.trim()) return;
    setLoading(true);
    try {
        const response = await fetch(
            `http://localhost:3000/api/product?search=${encodeURIComponent(searchQuery)}`,
            { method: "GET", headers: { "Content-Type": "application/json" } }
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

  useEffect(() => {
    if (query) searchProducts(query);
    else setProducts([]);
  }, [query]);

  return (
    <div className='flex min-h-screen'>
      <Sidebar />
      <div className='flex-1'>
        <Navbar />
        <CategoryTabs />
        <div className='px-10 py-5 space-y-5'>
          {loading ? (
            <p className='text-sm text-gray-400'>Searching...</p>
          ) : products.length === 0 ? (
            <p className='text-sm text-gray-400 text-center'>
              {query ? 'No products found.' : 'Enter a search term above.'}
            </p>
          ) : (
            <ProductContainer title={`Results for "${query}"`}>
              {products.map(product => (
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
            </ProductContainer>
          )}
        </div>
      </div>
    </div>
  );
};

export default SearchPage;