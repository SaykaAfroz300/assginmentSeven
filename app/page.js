"use client";

import { useEffect, useState } from "react";
import { getProducts } from "@/lib/api";
import { getBanglaDate } from "@/lib/helpers";
import ProductCard from "@/components/ProductCard";
import CardSkeleton from "@/components/CardSkeleton";

export default function Home() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [date, setDate] = useState("");

  useEffect(() => {
    setDate(getBanglaDate());
    getProducts().then((data) => {
      setProducts(data);
      setLoading(false);
    });
  }, []);

  const risers = products
    .filter((p) => p.change.dir === "up")
    .sort((a, b) => b.change.pct - a.change.pct)
    .slice(0, 6);

  const fallers = products
    .filter((p) => p.change.dir === "down")
    .sort((a, b) => b.change.pct - a.change.pct)
    .slice(0, 6);

  return (
    <div className="max-w-6xl mx-auto px-4 py-6">
      {/* hero */}
      <section className="bg-white rounded-2xl border border-gray-200 p-6 sm:p-8 flex flex-col-reverse md:flex-row items-center gap-6">
        <div className="flex-1">
          <span className="inline-block bg-green-100 text-brand text-xs sm:text-sm font-medium px-3 py-1 rounded-full min-h-6">
            {date}
          </span>
          <h1 className="text-3xl sm:text-4xl font-bold mt-3">
            আজকের বাজারের দাম এক নজরে
          </h1>
          <p className="text-gray-600 mt-3 max-w-lg">
            চাল, ডাল, তেল, সবজি, মাছ, মাংস, ডিম ও মসলার দাম — বাজারভিত্তিক
            বিস্তারিত, গড়, সর্বনিম্ন-সর্বাধিক এবং দামের পরিবর্তন এক জায়গায়।
          </p>
          <a
            href="#সব-পণ্য"
            className="btn bg-brand hover:bg-brand-dark text-white border-0 mt-5"
          >
            সব পণ্য দেখুন
          </a>
        </div>
        <div className="flex-1 flex justify-center">
          <img
            src="/hero.jpg"
            alt="সবজি ও ফলের ঝুড়ি"
            className="w-64 sm:w-80 md:w-full max-w-sm rounded-xl"
          />
        </div>
      </section>

      {/* risers */}
      <section className="mt-8">
        <h2 className="text-xl font-bold mb-4">
          <span className="text-red-600 text-sm mr-1">▲</span> আজ দাম বেড়েছে
        </h2>
        {loading ? (
          <CardSkeleton count={6} />
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {risers.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        )}
      </section>

      {/* fallers */}
      <section className="mt-8">
        <h2 className="text-xl font-bold mb-4">
          <span className="text-green-700 text-sm mr-1">▼</span> আজ দাম কমেছে
        </h2>
        {loading ? (
          <CardSkeleton count={6} />
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {fallers.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        )}
      </section>

      {/* all products */}
      <section id="সব-পণ্য" className="mt-8 scroll-mt-4">
        <h2 className="text-xl font-bold">সব পণ্য</h2>
        <p className="text-sm text-gray-500 mb-4">
          সব পণ্যের আজকের দাম ও দামের পরিবর্তন
        </p>
        {loading ? (
          <CardSkeleton count={9} />
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {products.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        )}
      </section>
    </div>
  );
}
