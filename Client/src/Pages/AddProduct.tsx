import React, { useState } from "react";

const PACKAGE_TYPES = ["Standard", "Express", "Fragile", "Bulk"];

const AddProduct = () => {
  const [name, setName] = useState("");
  const [price, setPrice] = useState<number>();
  const [discount, setDiscount] = useState<number>(0);
  const [images, setImages] = useState<string[]>([]);
  const [imageInput, setImageInput] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState<string[]>([]);
  const [tags, setTags] = useState<string[]>([]);
  const [sizes, setSizes] = useState<string[]>([]);
  const [quantity, setQuantity] = useState<number | undefined>();

  const [packageType, setPackageType] = useState("Standard");
  const [weight, setWeight] = useState<number>(0);
  const [estimatedDeliveryDays, setEstimatedDeliveryDays] = useState<number>(5);
  const [shippingCost, setShippingCost] = useState<number>(0);
  const [freeShippingEligible, setFreeShippingEligible] = useState(false);

  const token = localStorage.getItem("token");

  const handleAddImage = () => {
    const trimmed = imageInput.trim();
    if (trimmed && !images.includes(trimmed)) {
      setImages([...images, trimmed]);
      setImageInput("");
    }
  };

  const handleRemoveImage = (url: string) => {
    setImages(images.filter((img) => img !== url));
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
        shippingCost,
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
      setName("");
      setPrice(undefined);
      setDiscount(0);
      setImages([]);
      setImageInput("");
      setDescription("");
      setCategory([]);
      setTags([]);
      setSizes([]);
      setQuantity(undefined);
      setPackageType("Standard");
      setWeight(0);
      setEstimatedDeliveryDays(5);
      setShippingCost(0);
      setFreeShippingEligible(false);
    } catch (err) {
      console.log("Create Product Error:", err);
    }
  };

  return (
    <div className="p-6">
      <form onSubmit={handleSubmit} className="flex flex-col gap-4 max-w-md">
        <div>
          <label>Product Name</label>
          <input
            type="text"
            className="border p-2 w-full"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>

        <div>
          <label>Product Price</label>
          <input
            type="number"
            className="border p-2 w-full"
            value={price ?? ""}
            onChange={(e) => setPrice(Number(e.target.value))}
          />
        </div>

        <div>
          <label>Discount (%)</label>
          <input
            type="number"
            min={0}
            max={100}
            className="border p-2 w-full"
            value={discount}
            onChange={(e) =>
              setDiscount(Math.min(100, Math.max(0, Number(e.target.value))))
            }
          />
        </div>

        <div>
          <label>Product Quantity</label>
          <input
            type="number"
            className="border p-2 w-full"
            value={quantity ?? ""}
            onChange={(e) => setQuantity(Math.max(0, Number(e.target.value)))}
          />
        </div>

        <div>
          <label>Product Images (URLs)</label>
          <div className="flex gap-2">
            <input
              type="text"
              className="border p-2 w-full"
              placeholder="https://example.com/image.jpg"
              value={imageInput}
              onChange={(e) => setImageInput(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  e.preventDefault();
                  handleAddImage();
                }
              }}
            />
            <button
              type="button"
              onClick={handleAddImage}
              className="border px-3 rounded"
            >
              Add
            </button>
          </div>
          {images.length > 0 && (
            <div className="flex flex-col gap-1 mt-2">
              {images.map((img) => (
                <div key={img} className="flex items-center justify-between gap-2 text-sm border p-1 rounded">
                  <span className="truncate">{img}</span>
                  <button
                    type="button"
                    onClick={() => handleRemoveImage(img)}
                    className="text-red-500"
                  >
                    Remove
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>

        <div>
          <label>Product Description</label>
          <textarea
            className="border p-2 w-full"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </div>

        <div>
          <label>Categories (comma separated)</label>
          <input
            type="text"
            className="border p-2 w-full"
            placeholder="Electronics, Phones"
            onChange={(e) =>
              setCategory(
                e.target.value
                  .split(",")
                  .map((c) => c.trim())
                  .filter(Boolean)
              )
            }
          />
        </div>

        <div>
          <label>Tags (comma separated)</label>
          <input
            type="text"
            className="border p-2 w-full"
            placeholder="phone, android, mobile"
            onChange={(e) =>
              setTags(
                e.target.value
                  .split(",")
                  .map((tag) => tag.trim())
                  .filter(Boolean)
              )
            }
          />
        </div>

        <div>
          <label>Sizes (comma separated)</label>
          <input
            type="text"
            className="border p-2 w-full"
            placeholder="S, M, L, XL"
            onChange={(e) =>
              setSizes(
                e.target.value
                  .split(",")
                  .map((s) => s.trim())
                  .filter(Boolean)
              )
            }
          />
        </div>

        <fieldset className="border p-3 rounded flex flex-col gap-3">
          <legend className="font-medium">Shipping</legend>

          <div>
            <label>Package Type</label>
            <select
              className="border p-2 w-full"
              value={packageType}
              onChange={(e) => setPackageType(e.target.value)}
            >
              {PACKAGE_TYPES.map((type) => (
                <option key={type} value={type}>
                  {type}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label>Weight (kg)</label>
            <input
              type="number"
              min={0}
              step="0.01"
              className="border p-2 w-full"
              value={weight}
              onChange={(e) => setWeight(Math.max(0, Number(e.target.value)))}
            />
          </div>

          <div>
            <label>Estimated Delivery (days)</label>
            <input
              type="number"
              min={0}
              className="border p-2 w-full"
              value={estimatedDeliveryDays}
              onChange={(e) =>
                setEstimatedDeliveryDays(Math.max(0, Number(e.target.value)))
              }
            />
          </div>

          <div>
            <label>Shipping Cost</label>
            <input
              type="number"
              min={0}
              className="border p-2 w-full"
              value={shippingCost}
              disabled={freeShippingEligible}
              onChange={(e) =>
                setShippingCost(Math.max(0, Number(e.target.value)))
              }
            />
          </div>

          <div className="flex items-center gap-2">
            <input
              type="checkbox"
              id="freeShipping"
              checked={freeShippingEligible}
              onChange={(e) => setFreeShippingEligible(e.target.checked)}
            />
            <label htmlFor="freeShipping">Free shipping eligible</label>
          </div>
        </fieldset>

        <button type="submit" className="bg-black text-white p-2 rounded">
          Add Product
        </button>
      </form>
    </div>
  );
};

export default AddProduct;