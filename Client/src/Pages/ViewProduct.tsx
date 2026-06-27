import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import Navbar from '../components/Navbar';
import { useContext } from 'react';
import { CartContext } from '../context/CartContext';

interface Seller {
  name: string;
  avatarUrl: string;
}

interface Review {
  userId: string;
  userName: string;
  rating: number;
  comment: string;
  createdAt: string;
}

interface Shipping {
  packageType: string;
  weight: number;
  estimatedDeliveryDays: number;
  shippingCost: number;
  freeShippingEligible: boolean;
}

interface Product {
  userId: string;
  name: string;
  price: number;
  discount: number;
  images: string[];
  description: string;
  category: string[];
  tags: string[];
  sizes: string[];
  quantity: number;
  rating: number;
  reviews: Review[];
  shipping: Shipping;
  createdAt: string;
  seller?: Seller;
}

interface ViewProductProps {
  onAddToCart?: (size?: string) => void
  onWishlist?: () => void
  onContactSeller?: () => void
}

const ViewProduct = ({ onAddToCart, onWishlist, onContactSeller }: ViewProductProps) => {
  const [product, setProduct] = useState<Product>();
  const [activeImg, setActiveImg] = useState(0);
  const [selectedSize, setSelectedSize] = useState<string>();
  const [wishlisted, setWishlisted] = useState(false);
  const [descOpen, setDescOpen] = useState(false);
  const [shippingOpen, setShippingOpen] = useState(true);
  const [reviewRating, setReviewRating] = useState(0);
  const [reviewHover, setReviewHover] = useState(0);
  const [reviewComment, setReviewComment] = useState("");
  const [submittingReview, setSubmittingReview] = useState(false);
  const [reviewError, setReviewError] = useState("");
  const { refreshCartCount } = useContext(CartContext)!;
  const navigate = useNavigate();

  const handleWishlist = () => {
    setWishlisted(!wishlisted)
    onWishlist?.()
  }

  const { id } = useParams();
  useEffect(() => {
    let isMounted = true;

    const getProductInfo = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await fetch(`http://localhost:3000/api/product/${id}`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          }
        })
        const data = await response.json();
        if (!response.ok) {
          console.log("Failed to load product information");
          return;
        }
        const p = data.product;
        if (isMounted) {
          setProduct({
            ...p,
            discount: typeof p.discount === 'number' ? p.discount : 0,
            images: Array.isArray(p.images) ? p.images : [],
            category: Array.isArray(p.category) ? p.category : [],
            tags: Array.isArray(p.tags) ? p.tags : [],
            sizes: Array.isArray(p.sizes) ? p.sizes : [],
            reviews: Array.isArray(p.reviews) ? p.reviews : [],
            shipping: p.shipping ?? null,
          });
          if (Array.isArray(p.sizes) && p.sizes.length > 0) {
            setSelectedSize(p.sizes[0]);
          }
          console.log("Product information loaded successfully");
        }
      } catch (err) {
        console.log("Error in getInfo", err);
      }
    }

    getProductInfo();

    return () => {
      isMounted = false;
    };
  }, [id]);

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
      await refreshCartCount();
      console.log("Product added successfully");
    } catch (err) {
      console.log(`Failed to add to cart`, err);
    }
  };

  const handleSubmitReview = async () => {
    if (reviewRating === 0) {
      setReviewError("Please select a rating");
      return;
    }
    setReviewError("");
    setSubmittingReview(true);
    try {
      const token = localStorage.getItem("token");
      const userName = localStorage.getItem("userName") || "Anonymous";
      const response = await fetch(`http://localhost:3000/api/product/${id}/review`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          rating: reviewRating,
          comment: reviewComment,
          userName,
        }),
      });
      const data = await response.json();
      if (!response.ok) {
        if (response.status === 401) {
          setReviewError("Your session has expired. Please log in again.");
        } else {
          setReviewError(data.message || "Failed to submit review");
        }
        return;
      }
      setProduct((prev) => prev ? {
        ...prev,
        reviews: data.product.reviews,
        rating: data.product.rating,
      } : prev);
      setReviewRating(0);
      setReviewComment("");
    } catch (err) {
      setReviewError("Something went wrong, please try again");
      console.log("Submit review error", err);
    } finally {
      setSubmittingReview(false);
    }
  };

  if (!product) {
    return <div>
      <Navbar showLogo={true}/>
      <span className='text-center'>Loading..</span>
    </div>
  }

  const avgRating = product.reviews && product.reviews.length > 0
    ? product.reviews.reduce((sum, r) => sum + r.rating, 0) / product.reviews.length
    : product.rating ?? 0;

  const ratingCounts = [5, 4, 3, 2, 1].map((star) => ({
    star,
    count: product.reviews ? product.reviews.filter((r) => Math.round(r.rating) === star).length : 0,
  }));
  const maxCount = Math.max(1, ...ratingCounts.map((r) => r.count));

  const finalPrice = product.discount > 0
    ? Math.round(product.price * (1 - product.discount / 100))
    : product.price;

  return (
    <>
      <Navbar showLogo={true}/>
    <div className="flex flex-col px-10 py-6 w-full font-sans text-gray-900 bg-white min-h-screen">

      <nav className="flex items-center gap-1.5 pb-6 text-sm text-gray-400">
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-4 h-4">
          <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18" />
        </svg>
        <span onClick={() => navigate(-1)} className="hover:text-gray-700 cursor-pointer">Back</span>
        <span>/</span>
        <span className="text-gray-600 font-medium">Product details</span>
      </nav>

      <div className="flex gap-10 py-10 justify-center">

        <div className="flex flex-col gap-3 w-[470px] shrink-0">
          <div className="h-[520px] w-full bg-gray-100 rounded-2xl overflow-hidden">
            {product.images && product.images[activeImg] ? (
              <img
                src={product.images[activeImg]}
                alt={product.name}
                className="w-full h-full object-cover object-top"
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center text-gray-300 text-sm">No image</div>
            )}
          </div>
          {product.images && product.images.length > 1 && (
            <div className="flex gap-3">
              {product.images.slice(0, 4).map((src, i) => (
                <button
                  key={i}
                  onClick={() => setActiveImg(i)}
                  className={`flex-1 h-24 rounded-xl overflow-hidden border-2 transition-all ${
                    activeImg === i ? 'border-gray-900' : 'border-transparent'
                  }`}
                >
                  <img src={src} alt="" className="w-full h-full object-cotain object-top" />
                </button>
              ))}
            </div>
          )}
        </div>

        <div className="flex-1 max-w-xl space-y-5 pt-1">
          <span className="inline-block text-xs font-medium text-gray-500 tracking-wide border border-gray-200 rounded-full px-3 py-1">
            {Array.isArray(product.category) ? product.category.join(', ') : product.category}
          </span>

          <div className="space-y-2">
            <h1 className="text-3xl font-semibold tracking-tight">{product.name}</h1>
            {product.discount > 0 ? (
              <div className="flex items-center gap-2">
                <p className="text-xl font-semibold">₹{finalPrice.toLocaleString()}</p>
                <p className="text-sm text-gray-400 line-through">₹{product.price.toLocaleString()}</p>
                <span className="text-xs font-semibold text-green-600 bg-green-50 px-2 py-1 rounded-full">
                  {product.discount}% off
                </span>
              </div>
            ) : (
              <p className="text-xl font-semibold">₹{(product.price ?? 0).toLocaleString()}</p>
            )}
          </div>

          {product.shipping?.estimatedDeliveryDays !== undefined && (
            <div className="flex items-center gap-2 text-xs text-gray-500 border border-gray-100 rounded-xl px-4 py-2.5">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4 shrink-0">
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <span>Estimated delivery in {product.shipping.estimatedDeliveryDays} working days</span>
            </div>
          )}

          {product.quantity === 0 ? (
            <p className="text-sm font-semibold text-red-500">Sold out</p>
          ) : product.quantity <= 10 ? (
            <p className="text-sm font-semibold text-orange-500">Only {product.quantity} left in stock</p>
          ) : null}

          {product.sizes && product.sizes.length > 0 && (
            <div className="space-y-2">
              <p className="text-xs font-medium text-gray-400 uppercase tracking-wide">Select Size</p>
              <div className="flex flex-wrap gap-2">
                {product.sizes.map((size) => (
                  <button
                    key={size}
                    onClick={() => setSelectedSize(size)}
                    className={`w-12 h-12 rounded-full text-sm font-medium border transition-colors ${
                      selectedSize === size
                        ? 'bg-gray-900 text-white border-gray-900'
                        : 'border-gray-200 text-gray-600 hover:border-gray-400'
                    }`}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>
          )}

          {product.tags && product.tags.length > 0 && (
            <div className="flex flex-wrap gap-2">
              {product.tags.map((tag) => (
                <span key={tag} className="text-xs bg-gray-100 text-gray-600 px-3 py-1 rounded-full font-medium">
                  {tag}
                </span>
              ))}
            </div>
          )}

          <div className="flex gap-3 items-center pt-1">
            <button
              onClick={addToCart}
              disabled={product.quantity === 0}
              className={`flex-1 py-3.5 rounded-full text-sm font-semibold transition-colors ${
                product.quantity === 0
                  ? 'bg-gray-200 text-gray-400 cursor-not-allowed'
                  : 'bg-gray-900 text-white hover:bg-gray-800'
              }`}
            >
              {product.quantity === 0 ? 'Sold Out' : 'Add to Cart'}
            </button>
            <button
              onClick={handleWishlist}
              className="w-12 h-12 flex items-center justify-center rounded-full border border-gray-200 shadow-sm hover:border-gray-400 transition-colors"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill={wishlisted ? 'currentColor' : 'none'}
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className={`w-5 h-5 ${wishlisted ? 'text-red-500' : 'text-gray-500'}`}
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12Z" />
              </svg>
            </button>
          </div>

          <div className="border border-gray-100 rounded-2xl px-5 py-4">
            <button
              onClick={() => setDescOpen(!descOpen)}
              className="flex items-center justify-between w-full text-left"
            >
              <span className="text-sm font-semibold">Description & Fit</span>
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor"
                className={`w-4 h-4 text-gray-400 transition-transform ${descOpen ? 'rotate-180' : ''}`}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
              </svg>
            </button>
            {descOpen && (
              <p className="mt-3 text-sm text-gray-500 leading-relaxed">{product.description}</p>
            )}
          </div>

          {product.shipping && (
            <div className="border border-gray-100 rounded-2xl px-5 py-4">
              <button
                onClick={() => setShippingOpen(!shippingOpen)}
                className="flex items-center justify-between w-full text-left"
              >
                <span className="text-sm font-semibold">Shipping</span>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor"
                  className={`w-4 h-4 text-gray-400 transition-transform ${shippingOpen ? 'rotate-180' : ''}`}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
                </svg>
              </button>
              {shippingOpen && (
                <div className="mt-4 grid grid-cols-2 gap-y-4 gap-x-4">
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-full bg-gray-50 flex items-center justify-center shrink-0">
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4 text-gray-500">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M9.75 9.75l4.5 4.5m0-4.5l-4.5 4.5M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                    </div>
                    <div>
                      <p className="text-xs text-gray-400">Discount</p>
                      <p className="text-sm font-medium">
                        {product.discount > 0 ? `${product.discount}% off` : 'No discount'}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-full bg-gray-50 flex items-center justify-center shrink-0">
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4 text-gray-500">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M21 7.5l-9-5.25L3 7.5m18 0l-9 5.25M21 7.5v9l-9 5.25M3 7.5l9 5.25M3 7.5v9l9 5.25m0-9.75v9.75" />
                      </svg>
                    </div>
                    <div>
                      <p className="text-xs text-gray-400">Package</p>
                      <p className="text-sm font-medium">{product.shipping.packageType}</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-full bg-gray-50 flex items-center justify-center shrink-0">
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4 text-gray-500">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                    </div>
                    <div>
                      <p className="text-xs text-gray-400">Delivery Time</p>
                      <p className="text-sm font-medium">{product.shipping.estimatedDeliveryDays} working days</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-full bg-gray-50 flex items-center justify-center shrink-0">
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4 text-gray-500">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 18.75a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m3 0h6m-9 0H3.375a1.125 1.125 0 01-1.125-1.125V14.25m17.25 4.5a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m3 0h1.125c.621 0 1.129-.504 1.09-1.124a17.902 17.902 0 00-3.213-9.193 2.056 2.056 0 00-1.58-.86H14.25M16.5 18.75h-2.25m0-11.177v-.873a1.125 1.125 0 00-1.125-1.125h-2.25c-.621 0-1.125.504-1.125 1.125v.873m0 0h-1.5" />
                      </svg>
                    </div>
                    <div>
                      <p className="text-xs text-gray-400">Shipping Cost</p>
                      <p className="text-sm font-medium">
                        {product.shipping.freeShippingEligible ? 'Free' : `₹${product.shipping.shippingCost.toLocaleString()}`}
                      </p>
                    </div>
                  </div>
                </div>
              )}
            </div>
          )}

          {product.seller && (
            <div className="border-t border-gray-100 pt-5">
              <p className="text-xs font-medium text-gray-400 uppercase tracking-wide mb-3">Sold by</p>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  {product.seller.avatarUrl ? (
                    <img src={product.seller.avatarUrl} alt={product.seller.name}
                      className="w-10 h-10 rounded-full object-cover" />
                  ) : (
                    <div className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center text-sm font-semibold text-gray-500">
                      {product.seller.name.charAt(0).toUpperCase()}
                    </div>
                  )}
                  <div>
                    <p className="text-sm font-semibold">{product.seller.name}</p>
                    <p className="text-xs text-gray-400">
                      Listed {product.createdAt ? new Date(product.createdAt).toDateString() : ''}
                    </p>
                  </div>
                </div>
                <button
                  onClick={onContactSeller}
                  className="text-sm font-medium border border-gray-200 px-4 py-2 rounded-full hover:border-gray-400 transition-colors"
                >
                  Contact
                </button>
              </div>
            </div>
          )}
        </div>
      </div>

      <div className="border-t border-gray-100 pt-10">
        <h2 className="text-xl font-semibold mb-6">Rating & Reviews</h2>
        <div className="flex gap-10 flex-wrap">

          <div className="flex flex-col items-start gap-1">
            <div className="flex items-baseline gap-1">
              <span className="text-5xl font-semibold tracking-tight">{avgRating.toFixed(1)}</span>
              <span className="text-lg text-gray-400">/ 5</span>
            </div>
            <p className="text-sm text-gray-400">
              {product.reviews && product.reviews.length > 0
                ? `(${product.reviews.length} ${product.reviews.length === 1 ? 'Review' : 'Reviews'})`
                : 'No reviews yet'}
            </p>
          </div>

          <div className="flex flex-col gap-1.5 w-full max-w-xs">
            {ratingCounts.map(({ star, count }) => (
              <div key={star} className="flex items-center gap-2 text-sm">
                <span className="flex items-center gap-1 w-10 shrink-0 text-yellow-400">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-3.5 h-3.5">
                    <path d="M11.48 3.499a.562.562 0 011.04 0l2.125 5.111a.563.563 0 00.475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 00-.182.557l1.285 5.385a.562.562 0 01-.84.61l-4.725-2.885a.562.562 0 00-.586 0L6.982 20.54a.562.562 0 01-.84-.61l1.285-5.386a.562.562 0 00-.182-.557l-4.204-3.602a.563.563 0 01.321-.988l5.518-.442a.563.563 0 00.475-.345L11.48 3.5z" />
                  </svg>
                  <span className="text-gray-500">{star}</span>
                </span>
                <div className="flex-1 h-1.5 bg-gray-100 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-gray-900 rounded-full"
                    style={{ width: `${(count / maxCount) * 100}%` }}
                  />
                </div>
              </div>
            ))}
          </div>

          {product.reviews && product.reviews.length > 0 && (
            <div className="flex-1 min-w-[280px] max-w-md border border-gray-100 rounded-2xl p-5">
              {(() => {
                const review = product.reviews[0];
                return (
                  <>
                    <div className="flex items-center justify-between mb-2">
                      <p className="text-sm font-semibold">{review.userName}</p>
                      <p className="text-xs text-gray-400">
                        {review.createdAt ? new Date(review.createdAt).toDateString() : ''}
                      </p>
                    </div>
                    <div className="flex items-center gap-0.5 mb-2">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <svg
                          key={star}
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 24 24"
                          fill={star <= review.rating ? 'currentColor' : 'none'}
                          stroke="currentColor"
                          strokeWidth={1.5}
                          className={`w-4 h-4 ${star <= review.rating ? 'text-yellow-400' : 'text-gray-300'}`}
                        >
                          <path strokeLinecap="round" strokeLinejoin="round" d="M11.48 3.499a.562.562 0 011.04 0l2.125 5.111a.563.563 0 00.475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 00-.182.557l1.285 5.385a.562.562 0 01-.84.61l-4.725-2.885a.562.562 0 00-.586 0L6.982 20.54a.562.562 0 01-.84-.61l1.285-5.386a.562.562 0 00-.182-.557l-4.204-3.602a.563.563 0 01.321-.988l5.518-.442a.563.563 0 00.475-.345L11.48 3.5z" />
                        </svg>
                      ))}
                    </div>
                    {review.comment && (
                      <p className="text-sm text-gray-500 leading-relaxed">{review.comment}</p>
                    )}
                  </>
                );
              })()}
            </div>
          )}
        </div>

        {localStorage.getItem("token") ? (
          <div className="mt-8 border border-gray-100 rounded-2xl p-5 max-w-md">
            <p className="text-sm font-semibold mb-3">Write a review</p>
            <div className="flex items-center gap-1 mb-3">
              {[1, 2, 3, 4, 5].map((star) => (
                <button
                  key={star}
                  type="button"
                  onClick={() => setReviewRating(star)}
                  onMouseEnter={() => setReviewHover(star)}
                  onMouseLeave={() => setReviewHover(0)}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill={star <= (reviewHover || reviewRating) ? 'currentColor' : 'none'}
                    stroke="currentColor"
                    strokeWidth={1.5}
                    className={`w-6 h-6 ${star <= (reviewHover || reviewRating) ? 'text-yellow-400' : 'text-gray-300'}`}
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" d="M11.48 3.499a.562.562 0 011.04 0l2.125 5.111a.563.563 0 00.475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 00-.182.557l1.285 5.385a.562.562 0 01-.84.61l-4.725-2.885a.562.562 0 00-.586 0L6.982 20.54a.562.562 0 01-.84-.61l1.285-5.386a.562.562 0 00-.182-.557l-4.204-3.602a.563.563 0 01.321-.988l5.518-.442a.563.563 0 00.475-.345L11.48 3.5z" />
                  </svg>
                </button>
              ))}
            </div>
            <textarea
              value={reviewComment}
              onChange={(e) => setReviewComment(e.target.value)}
              placeholder="Share your thoughts about this product..."
              className="w-full border border-gray-200 rounded-xl p-3 text-sm text-gray-700 resize-none focus:outline-none focus:border-gray-400"
              rows={3}
            />
            {reviewError && (
              <p className="text-xs text-red-500 mt-2">{reviewError}</p>
            )}
            <button
              onClick={handleSubmitReview}
              disabled={submittingReview}
              className={`mt-3 px-5 py-2.5 rounded-full text-sm font-semibold transition-colors ${
                submittingReview
                  ? 'bg-gray-200 text-gray-400 cursor-not-allowed'
                  : 'bg-gray-900 text-white hover:bg-gray-800'
              }`}
            >
              {submittingReview ? 'Submitting...' : 'Submit Review'}
            </button>
          </div>
        ) : (
          <div className="mt-8 border border-gray-100 rounded-2xl p-5 max-w-md text-center">
            <p className="text-sm text-gray-500 mb-3">You need to be logged in to write a review.</p>
            <button
              onClick={() => navigate('/login')}
              className="px-5 py-2.5 rounded-full text-sm font-semibold bg-gray-900 text-white hover:bg-gray-800 transition-colors"
            >
              Log In
            </button>
          </div>
        )}
      </div>
    </div>
  </>
  )
}

export default ViewProduct