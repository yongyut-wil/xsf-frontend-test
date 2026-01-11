"use client";

import { useState, useRef, DragEvent, ChangeEvent } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useProduct } from "../context/ProductContext";

interface ProductForm {
  productName: string;
  code: string;
  price: string;
}

export default function UploadPage() {
  const [images, setImages] = useState<File[]>([]);
  const [previews, setPreviews] = useState<string[]>([]);
  const [isDragging, setIsDragging] = useState(false);
  const [form, setForm] = useState<ProductForm>({
    productName: "",
    code: "",
    price: "",
  });
  const fileInputRef = useRef<HTMLInputElement>(null);
  const router = useRouter();
  const { addProduct, products } = useProduct();
  const maxImages = 6;

  const handleFiles = (files: FileList | null) => {
    if (!files) return;

    const validFiles = Array.from(files).filter(
      (file) =>
        (file.type === "image/jpeg" || file.type === "image/png") &&
        file.size <= 50 * 1024 * 1024
    );

    const remainingSlots = maxImages - images.length;
    const filesToAdd = validFiles.slice(0, remainingSlots);

    if (filesToAdd.length > 0) {
      setImages((prev) => [...prev, ...filesToAdd]);
      filesToAdd.forEach((file) => {
        const reader = new FileReader();
        reader.onload = (e) => {
          setPreviews((prev) => [...prev, e.target?.result as string]);
        };
        reader.readAsDataURL(file);
      });
    }
  };

  const handleDragOver = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleDrop = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(false);
    handleFiles(e.dataTransfer.files);
  };

  const handleFileSelect = (e: ChangeEvent<HTMLInputElement>) => {
    handleFiles(e.target.files);
  };

  const removeImage = (index: number) => {
    setImages((prev) => prev.filter((_, i) => i !== index));
    setPreviews((prev) => prev.filter((_, i) => i !== index));
  };

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = () => {
    if (!form.productName || !form.code || !form.price) {
      alert("Please fill in all required fields");
      return;
    }

    // In a real app, we would upload images to a server here.
    // For this demo, we'll use the first preview image if available, or a placeholder.
    const productImage = previews.length > 0 ? previews[0] : "";

    const newProduct = {
      id: products.length > 0 ? Math.max(...products.map(p => p.id)) + 1 : 1,
      name: form.productName,
      code: form.code,
      price: parseFloat(form.price.replace(/,/g, "")),
      image: productImage,
      category: "Uncategorized", // Default category
      stock: 0, // Default stock
      createdAt: new Date().toISOString().split('T')[0]
    };

    addProduct(newProduct);
    console.log("Form submitted and added to context:", newProduct);
    alert("Product uploaded successfully!");
    router.push("/products");
  };

  const handleCancel = () => {
    setForm({ productName: "", code: "", price: "" });
    setImages([]);
    setPreviews([]);
  };

  return (
    <div className="min-h-screen bg-zinc-50 py-8 px-4">
      <div className="max-w-2xl mx-auto">
        {/* Back Navigation */}
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-zinc-600 hover:text-zinc-900 mb-6 transition-colors"
        >
          <svg
            className="w-5 h-5"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M15 19l-7-7 7-7"
            />
          </svg>
          Back to Home
        </Link>

        <h1 className="text-2xl font-bold text-zinc-900 mb-8">
          Upload Product
        </h1>

        {/* Upload Image Section */}
        <div className="mb-6">
          <label className="block text-sm font-medium text-zinc-700 mb-2">
            Upload image
          </label>
          <div
            className={`relative border-2 border-dashed rounded-2xl p-8 text-center transition-all cursor-pointer ${
              isDragging
                ? "border-red-400 bg-red-50"
                : "border-zinc-200 bg-white hover:border-zinc-300"
            }`}
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
            onClick={() => fileInputRef.current?.click()}
          >
            <input
              ref={fileInputRef}
              type="file"
              accept="image/jpeg,image/png"
              multiple
              className="hidden"
              onChange={handleFileSelect}
            />

            {previews.length > 0 ? (
              <div className="grid grid-cols-3 gap-4">
                {previews.map((preview, index) => (
                  <div key={index} className="relative group">
                    <img
                      src={preview}
                      alt={`Preview ${index + 1}`}
                      className="w-full h-24 object-cover rounded-lg"
                    />
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        removeImage(index);
                      }}
                      className="absolute -top-2 -right-2 w-6 h-6 bg-red-500 text-white rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
                    >
                      ×
                    </button>
                  </div>
                ))}
              </div>
            ) : (
              <>
                <div className="flex justify-center mb-4">
                  <svg
                    className="w-12 h-12 text-zinc-400"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={1.5}
                      d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
                    />
                  </svg>
                </div>
                <p className="text-sm text-zinc-600">
                  Drag & Drop or{" "}
                  <span className="text-red-500 underline cursor-pointer">
                    Choose file
                  </span>{" "}
                  to upload
                </p>
                <p className="text-xs text-zinc-400 mt-2">
                  JPG. or PNG Maximum file size 50MB.
                </p>
              </>
            )}
          </div>
          <p className="text-right text-sm text-zinc-500 mt-2">
            Image upload ({images.length}/{maxImages})
          </p>
        </div>

        {/* Product Name */}
        <div className="mb-4">
          <label className="block text-sm font-medium text-zinc-700 mb-2">
            Product name
          </label>
          <input
            type="text"
            name="productName"
            value={form.productName}
            onChange={handleInputChange}
            placeholder="Product name"
            className="w-full px-4 py-3 rounded-full border border-zinc-200 bg-white text-zinc-900 placeholder-zinc-400 focus:outline-none focus:ring-2 focus:ring-red-400 focus:border-transparent transition-all"
          />
        </div>

        {/* Code */}
        <div className="mb-4">
          <label className="block text-sm font-medium text-zinc-700 mb-2">
            Code
          </label>
          <input
            type="text"
            name="code"
            value={form.code}
            onChange={handleInputChange}
            placeholder="Code"
            className="w-full px-4 py-3 rounded-full border border-zinc-200 bg-white text-zinc-900 placeholder-zinc-400 focus:outline-none focus:ring-2 focus:ring-red-400 focus:border-transparent transition-all"
          />
        </div>

        {/* Price */}
        <div className="mb-8">
          <label className="block text-sm font-medium text-zinc-700 mb-2">
            Price
          </label>
          <input
            type="text"
            name="price"
            value={form.price}
            onChange={handleInputChange}
            placeholder="฿1,000"
            className="w-full px-4 py-3 rounded-full border border-zinc-200 bg-white text-zinc-900 placeholder-zinc-400 focus:outline-none focus:ring-2 focus:ring-red-400 focus:border-transparent transition-all"
          />
        </div>

        {/* Buttons */}
        <div className="flex justify-center gap-4">
          <button
            onClick={handleCancel}
            className="px-8 py-3 rounded-full border border-red-400 text-red-500 font-medium hover:bg-red-50 transition-colors"
          >
            ยกเลิก
          </button>
          <button
            onClick={handleSubmit}
            className="px-8 py-3 rounded-full bg-red-500 text-white font-medium hover:bg-red-600 transition-colors"
          >
            ยืนยัน
          </button>
        </div>
      </div>
    </div>
  );
}
