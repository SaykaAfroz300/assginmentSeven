"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import { getCategory, getProductsByCategory } from "@/lib/api";
import ProductCard from "@/components/ProductCard";
import CardSkeleton from "@/components/CardSkeleton";

export default function CategoryPage() {
  const params = useParams();
  const slug = params.slug;

  const [category, setCategory] = useState(null);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [sortBy, setSortBy] = useState("default");

  useEffect(() => {
    setLoading(true);
    Promise.all([getCategory(slug), getProductsByCategory(slug)]).then(
      (results) => {
        setCategory(results[0]);
        setProducts(results[1]);
        setLoading(false);
      }
    );
  }, [slug]);

  // sorting by the number value, not by string
  let sorted = [...products];
  if (sortBy === "low") {
    sorted.sort((a, b) => Number(a.today) - Number(b.today));
  } else if (sortBy === "high") {
    sorted.sort((a, b) => Number(b.today) - Number(a.today));
  }

  if (loading) {
    return (
      <div className="max-w-6xl mx-auto px-4 py-6">
        <div className="skeleton h-24 w-full rounded-2xl mb-6"></div>
        <CardSkeleton count={6} />
      </div>
    );
  }

  // invalid slug or no items
  if (!category || products.length === 0) {
    return (
      <div className="max-w-6xl mx-auto px-4 py-16 text-center">
        <p className="text-6xl font-bold text-brand">৪০৪</p>
        <h1 className="text-2xl font-bold mt-3">কোনো পণ্য পাওয়া যায়নি</h1>
        <p className="text-gray-600 mt-2">
          এই ক্যাটাগরিটি নেই অথবা এখানে এখন কোনো পণ্য নেই।
        </p>
        <Link
          href="/"
          className="btn bg-brand hover:bg-brand-dark text-white border-0 mt-6"
        >
          হোম পেজে ফিরে যান
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto px-4 py-6">
      <div className="bg-white rounded-2xl border border-gray-200 p-5 flex items-center gap-4">
        <div className="w-14 h-14 rounded-xl bg-gray-100 flex items-center justify-center text-3xl">
          {category.icon}
        </div>
        <div>
          <h1 className="text-2xl font-bold">{category.nameBn}</h1>
          <p className="text-sm text-gray-500">
            {category.nameBn} ক্যাটাগরির সব পণ্যের আজকের দাম
          </p>
        </div>
      </div>

      <div className="flex items-center justify-between mt-6 mb-4">
        <p className="text-sm text-gray-500">মোট পণ্য: {products.length.toLocaleString("bn-BD")}টি</p>
        <label className="flex items-center gap-2 text-sm">
          সাজান:
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="select select-sm sm:select-md w-auto"
          >
            <option value="default">ডিফল্ট</option>
            <option value="low">দাম: কম থেকে বেশি</option>
            <option value="high">দাম: বেশি থেকে কম</option>
          </select>
        </label>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {sorted.map((p) => (
          <ProductCard key={p.id} product={p} />
        ))}
      </div>
    </div>
  );
}
