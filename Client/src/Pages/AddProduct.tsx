import React, { useState } from "react";

const AddProduct = () => {
  const [name, setName] = useState("");
  const [price, setPrice] = useState<number>();
  const [image, setImage] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState<string[]>([]);
  const [tags, setTags] = useState<string[]>([]);
  const [quantity, setQuantity] = useState<number | undefined>();
  const token = localStorage.getItem("token");
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const product = {
      name,
      price,
      image,
      description,
      category,
      tags,
      quantity,
      rating: 0,
    };

    try {
      const response = await fetch(
        "http://localhost:3000/api/product",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(product),
        }
      );
      const data = await response.json();
      if (!response.ok) {
        console.log("Failed to create product");
        return;
      }
      console.log("Product Created:", data);
      setName("");
      setPrice(undefined);
      setImage("");
      setDescription("");
      setCategory([]);
      setTags([]);
      setQuantity(undefined);
    } catch (err) {
      console.log("Create Product Error:", err);
    }
  };

  return (
    <div className="p-6">
      <form
        onSubmit={handleSubmit}
        className="flex flex-col gap-4 max-w-md"
      >
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
          <label>Product Quantity</label>
          <input
            type="number"
            className="border p-2 w-full"
            value={quantity ?? ""}
            onChange={(e) =>
             setQuantity(Math.max(0, Number(e.target.value)))
            }
          />
        </div>

        <div>
          <label>Product Image URL</label>
          <input
            type="text"
            className="border p-2 w-full"
            value={image}
            onChange={(e) => setImage(e.target.value)}
          />
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

        <button
          type="submit"
          className="bg-black text-white p-2 rounded"
        >
          Add Product
        </button>
      </form>
    </div>
  );
};

export default AddProduct;