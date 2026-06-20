import React, { useState } from "react";

const PACKAGE_TYPES = ["Standard", "Express", "Fragile", "Bulk"];
const ALL_SIZES = ["XS", "S", "M", "L", "XL", "XXL"];

const AddProduct = () => {
  const [name, setName] = useState("");
  const [price, setPrice] = useState<number>();
  const [discount, setDiscount] = useState<number>(0);
  const [images, setImages] = useState<string[]>([]);
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState<string[]>([]);
  const [categoryInput, setCategoryInput] = useState("");
  const [tags, setTags] = useState<string[]>([]);
  const [tagInput, setTagInput] = useState("");
  const [sizes, setSizes] = useState<string[]>([]);
  const [quantity, setQuantity] = useState<number | undefined>();
  const [packageType, setPackageType] = useState("Standard");
  const [weight, setWeight] = useState<number>(0);
  const [estimatedDeliveryDays, setEstimatedDeliveryDays] = useState<number>(5);
  const [shippingCost, setShippingCost] = useState<number>(0);
  const [freeShippingEligible, setFreeShippingEligible] = useState(false);

  const token = localStorage.getItem("token");

  const finalPrice = price && discount > 0
    ? Math.round(price * (1 - discount / 100))
    : price;

  const [uploading, setUploading] = useState(false);

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
  const file = e.target.files?.[0];

console.log({
  name: file?.name,
  type: file?.type,
  size: file?.size,
});
    if (!file || images.length >= 5) return;
    setUploading(true);
    try {
      const formData = new FormData();
      formData.append("image", file);
      const response = await fetch("http://localhost:3000/api/product/upload-image", {
        method: "POST",
        headers: { Authorization: `Bearer ${token}` },
        body: formData,
      });
      const data = await response.json();
      if (!response.ok) {
        console.log("Upload failed", data.text);
        return;
      }
      setImages((prev) => [...prev, data.url]);
    } catch (err) {
      console.log("Upload error", err);
    } finally {
      setUploading(false);
      e.target.value = "";
    }
  };

  const handleAddCategory = () => {
    const trimmed = categoryInput.trim();
    if (trimmed && !category.includes(trimmed)) {
      setCategory([...category, trimmed]);
      setCategoryInput("");
    }
  };

  const handleAddTag = () => {
    const trimmed = tagInput.trim();
    if (trimmed && !tags.includes(trimmed)) {
      setTags([...tags, trimmed]);
      setTagInput("");
    }
  };

  const toggleSize = (size: string) => {
    setSizes((prev) =>
      prev.includes(size) ? prev.filter((s) => s !== size) : [...prev, size]
    );
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const product = {
      name,
      price,
      discount,
      images,
      description,
      category,
      tags,
      sizes,
      quantity,
      rating: 0,
      reviews: [],
      shipping: {
        packageType,
        weight,
        estimatedDeliveryDays,
        shippingCost: freeShippingEligible ? 0 : shippingCost,
        freeShippingEligible,
      },
    };
    try {
      const response = await fetch("http://localhost:3000/api/product", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(product),
      });
      const data = await response.json();
      if (!response.ok) {
        console.log("Failed to create product");
        return;
      }
      console.log("Product Created:", data);
      setName(""); setPrice(undefined); setDiscount(0); setImages([]);
      setDescription(""); setCategory([]); setTags([]);
      setSizes([]); setQuantity(undefined); setPackageType("Standard");
      setWeight(0); setEstimatedDeliveryDays(5); setShippingCost(0);
      setFreeShippingEligible(false);
    } catch (err) {
      console.log("Create Product Error:", err);
    }
  };

  return (
    <div className="p-6 max-w-5xl mx-auto border my-10 rounded-xl">
      <h1 className="text-2xl font-semibold mb-6">Add product</h1>
      <form onSubmit={handleSubmit}>
        <div className="flex gap-6 items-start">

          <div className="flex flex-col gap-4 w-72 shrink-0">

            <div className="border rounded-2xl p-4 flex flex-col items-center gap-3">
              <p className="text-sm font-medium mr-auto">Product images</p>

              <div className="h-56 w-56 border rounded-xl bg-gray-50 overflow-hidden flex flex-col items-center justify-center gap-2 text-gray-300 relative">
                {images[0] ? (
                  <img src={images[0]} alt="cover" className="w-full h-full object-contain" />
                ) : (
                  <>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-9 h-9">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 15.75l5.159-5.159a2.25 2.25 0 013.182 0l5.159 5.159m-1.5-1.5l1.409-1.409a2.25 2.25 0 013.182 0l2.909 2.909M3 20.25h18A.75.75 0 0021.75 20v-14A.75.75 0 0021 5.25H3A.75.75 0 002.25 6v14c0 .414.336.75.75.75z" />
                    </svg>
                    <span className="text-xs">Main image</span>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5 mt-1">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                    </svg>
                  </>
                )}
                {uploading && (
                  <div className="absolute inset-0 bg-white/70 flex items-center justify-center text-xs text-gray-500">
                    Uploading...
                  </div>
                )}
              </div>

              <div className="flex gap-2">
                {[0, 1, 2, 3, 4].map((i) => (
                  <div key={i} className="h-12 w-12 rounded-lg border bg-gray-50 overflow-hidden flex items-center justify-center text-gray-300 relative group cursor-pointer">
                    {images[i] ? (
                      <>
                        <img src={images[i]} alt="" className="w-full h-full object-contain" />
                        <button
                          type="button"
                          onClick={() => setImages(images.filter((_, idx) => idx !== i))}
                          className="absolute inset-0 bg-black/40 text-white text-xs opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center"
                        >
                          ✕
                        </button>
                      </>
                    ) : (
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                      </svg>
                    )}
                  </div>
                ))}
              </div>

              <label className={`flex items-center gap-2 border rounded-lg px-4 py-2 text-sm cursor-pointer hover:bg-gray-50 transition-colors ${images.length >= 5 ? 'opacity-40 pointer-events-none' : ''}`}>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5m-13.5-9L12 3m0 0l4.5 4.5M12 3v13.5" />
                </svg>
                {uploading ? "Uploading..." : "Upload image"}
                <input
                  type="file"
                  accept="image/*"
                  className="hidden"
                  disabled={uploading || images.length >= 5}
                  onChange={handleImageUpload}
                />
              </label>
              <p className="text-xs text-gray-400 mr-auto">Up to 5 images. First is the cover.</p>
            </div>

            {price !== undefined && price > 0 && (
              <div className="border rounded-2xl p-4">
                <p className="text-sm font-medium mb-3">Price preview</p>
                <div className="flex items-baseline gap-2">
                  <span className="text-xl font-semibold">₹{finalPrice?.toLocaleString()}</span>
                  {discount > 0 && (
                    <>
                      <span className="text-sm text-gray-400 line-through">₹{price.toLocaleString()}</span>
                      <span className="text-xs font-medium text-green-600 bg-green-50 px-2 py-0.5 rounded-full">{discount}% off</span>
                    </>
                  )}
                </div>
              </div>
            )}

            <div className="border rounded-2xl p-4">
              <p className="text-sm font-medium mb-3">Sizes</p>
              <div className="flex flex-wrap gap-2">
                {ALL_SIZES.map((size) => (
                  <button
                    key={size}
                    type="button"
                    onClick={() => toggleSize(size)}
                    className={`w-10 h-10 rounded-full text-sm border transition-colors ${
                      sizes.includes(size)
                        ? "bg-gray-900 text-white border-gray-900"
                        : "border-gray-200 text-gray-600 hover:border-gray-400"
                    }`}
                  >
                    {size}
                  </button>
                ))}
              </div>
              <p className="text-xs text-gray-400 mt-2">For clothing products only.</p>
            </div>
          </div>

          <div className="flex flex-col gap-4 flex-1">

            <div className="border rounded-2xl p-5">
              <p className="text-sm font-medium mb-4">Basic info</p>
              <div className="flex flex-col gap-3">
                <div>
                  <label className="text-xs text-gray-500 mb-1 block">Product name</label>
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="e.g. Oversized Cotton Hoodie"
                    className="w-full border rounded-lg px-3 py-2 text-sm outline-none focus:border-gray-400"
                  />
                </div>
                <div>
                  <label className="text-xs text-gray-500 mb-1 block">Description</label>
                  <textarea
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    placeholder="Describe the product..."
                    rows={3}
                    className="w-full border rounded-lg px-3 py-2 text-sm outline-none focus:border-gray-400 resize-none"
                  />
                </div>
                <div className="grid grid-cols-3 gap-3">
                  <div>
                    <label className="text-xs text-gray-500 mb-1 block">Price (₹)</label>
                    <input
                      type="number"
                      value={price ?? ""}
                      onChange={(e) => setPrice(Number(e.target.value))}
                      placeholder="0"
                      className="w-full border rounded-lg px-3 py-2 text-sm outline-none focus:border-gray-400"
                    />
                  </div>
                  <div>
                    <label className="text-xs text-gray-500 mb-1 block">Discount (%)</label>
                    <input
                      type="number"
                      min={0}
                      max={100}
                      value={discount}
                      onChange={(e) => setDiscount(Math.min(100, Math.max(0, Number(e.target.value))))}
                      placeholder="0"
                      className="w-full border rounded-lg px-3 py-2 text-sm outline-none focus:border-gray-400"
                    />
                  </div>
                  <div>
                    <label className="text-xs text-gray-500 mb-1 block">Quantity</label>
                    <input
                      type="number"
                      value={quantity ?? ""}
                      onChange={(e) => setQuantity(Math.max(0, Number(e.target.value)))}
                      placeholder="0"
                      className="w-full border rounded-lg px-3 py-2 text-sm outline-none focus:border-gray-400"
                    />
                  </div>
                </div>
              </div>
            </div>

            <div className="border rounded-2xl p-5">
              <p className="text-sm font-medium mb-4">Organisation</p>
              <div className="flex flex-col gap-4">
                <div>
                  <label className="text-xs text-gray-500 mb-1 block">Categories</label>
                  <div className="flex gap-2 mb-2">
                    <input
                      type="text"
                      value={categoryInput}
                      onChange={(e) => setCategoryInput(e.target.value)}
                      onKeyDown={(e) => { if (e.key === "Enter") { e.preventDefault(); handleAddCategory(); }}}
                      placeholder="e.g. Electronics"
                      className="flex-1 border rounded-lg px-3 py-1.5 text-sm outline-none focus:border-gray-400"
                    />
                    <button type="button" onClick={handleAddCategory} className="border rounded-lg px-3 py-1.5 text-sm hover:bg-gray-50">
                      Add
                    </button>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {category.map((c) => (
                      <span key={c} className="flex items-center gap-1 text-xs bg-gray-100 text-gray-700 px-3 py-1 rounded-full">
                        {c}
                        <button type="button" onClick={() => setCategory(category.filter((x) => x !== c))} className="text-gray-400 hover:text-gray-600">✕</button>
                      </span>
                    ))}
                  </div>
                </div>
                <div>
                  <label className="text-xs text-gray-500 mb-1 block">Tags</label>
                  <div className="flex gap-2 mb-2">
                    <input
                      type="text"
                      value={tagInput}
                      onChange={(e) => setTagInput(e.target.value)}
                      onKeyDown={(e) => { if (e.key === "Enter") { e.preventDefault(); handleAddTag(); }}}
                      placeholder="e.g. summer"
                      className="flex-1 border rounded-lg px-3 py-1.5 text-sm outline-none focus:border-gray-400"
                    />
                    <button type="button" onClick={handleAddTag} className="border rounded-lg px-3 py-1.5 text-sm hover:bg-gray-50">
                      Add
                    </button>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {tags.map((t) => (
                      <span key={t} className="flex items-center gap-1 text-xs bg-gray-100 text-gray-700 px-3 py-1 rounded-full">
                        {t}
                        <button type="button" onClick={() => setTags(tags.filter((x) => x !== t))} className="text-gray-400 hover:text-gray-600">✕</button>
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            <div className="border rounded-2xl p-5">
              <p className="text-sm font-medium mb-4">Shipping</p>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-xs text-gray-500 mb-1 block">Package type</label>
                  <select
                    value={packageType}
                    onChange={(e) => setPackageType(e.target.value)}
                    className="w-full border rounded-lg px-3 py-2 text-sm outline-none focus:border-gray-400 bg-white"
                  >
                    {PACKAGE_TYPES.map((t) => <option key={t}>{t}</option>)}
                  </select>
                </div>
                <div>
                  <label className="text-xs text-gray-500 mb-1 block">Weight (kg)</label>
                  <input
                    type="number"
                    min={0}
                    step="0.1"
                    value={weight}
                    onChange={(e) => setWeight(Math.max(0, Number(e.target.value)))}
                    className="w-full border rounded-lg px-3 py-2 text-sm outline-none focus:border-gray-400"
                  />
                </div>
                <div>
                  <label className="text-xs text-gray-500 mb-1 block">Delivery days</label>
                  <input
                    type="number"
                    min={0}
                    value={estimatedDeliveryDays}
                    onChange={(e) => setEstimatedDeliveryDays(Math.max(0, Number(e.target.value)))}
                    className="w-full border rounded-lg px-3 py-2 text-sm outline-none focus:border-gray-400"
                  />
                </div>
                <div>
                  <label className="text-xs text-gray-500 mb-1 block">Shipping cost (₹)</label>
                  <input
                    type="number"
                    min={0}
                    value={shippingCost}
                    disabled={freeShippingEligible}
                    onChange={(e) => setShippingCost(Math.max(0, Number(e.target.value)))}
                    className="w-full border rounded-lg px-3 py-2 text-sm outline-none focus:border-gray-400 disabled:opacity-40"
                  />
                </div>
              </div>
              <label className="flex items-center gap-2 mt-3 cursor-pointer w-fit">
                <input
                  type="checkbox"
                  checked={freeShippingEligible}
                  onChange={(e) => setFreeShippingEligible(e.target.checked)}
                  className="rounded"
                />
                <span className="text-sm text-gray-700">Free shipping eligible</span>
              </label>
            </div>

            <div className="flex justify-between items-center pt-2">
              <button type="button" className="border rounded-full px-5 py-2.5 text-sm text-gray-600 hover:bg-gray-50 transition-colors">
                Save as draft
              </button>
              <button type="submit" className="bg-gray-900 text-white rounded-full px-6 py-2.5 text-sm font-medium hover:bg-gray-800 transition-colors">
                Publish product
              </button>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};

export default AddProduct;