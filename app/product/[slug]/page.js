"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import { getProduct } from "@/lib/api";
import { toBn, unitLabel } from "@/lib/helpers";
import { ChangeBadge } from "@/components/ProductCard";

export default function ProductDetailPage() {
  const params = useParams();
  const slug = params.slug;

  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    getProduct(slug).then((data) => {
      setProduct(data);
      setLoading(false);
    });
  }, [slug]);

  if (loading) {
    return (
      <div className="max-w-6xl mx-auto px-4 py-6">
        <div className="skeleton h-28 w-full rounded-2xl mb-4"></div>
        <div className="skeleton h-32 w-full rounded-2xl mb-4"></div>
        <div className="skeleton h-80 w-full rounded-2xl"></div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="max-w-6xl mx-auto px-4 py-16 text-center">
        <p className="text-6xl font-bold text-brand">৪০৪</p>
        <h1 className="text-2xl font-bold mt-3">পণ্যটি খুঁজে পাওয়া যায়নি</h1>
        <p className="text-gray-600 mt-2">আপনি যে পণ্যটি খুঁজছেন সেটি নেই।</p>
        <Link
          href="/"
          className="btn bg-brand hover:bg-brand-dark text-white border-0 mt-6"
        >
          হোম পেজে ফিরে যান
        </Link>
      </div>
    );
  }

  // min, max and average from all markets
  let minPrice = product.markets[0].min;
  let maxPrice = product.markets[0].max;
  let total = 0;
  for (let i = 0; i < product.markets.length; i++) {
    const m = product.markets[i];
    if (m.min < minPrice) minPrice = m.min;
    if (m.max > maxPrice) maxPrice = m.max;
    total = total + (m.min + m.max) / 2;
  }
  const avgPrice = Math.round(total / product.markets.length);

  const oldPrices = [
    { label: "গতকাল", value: product.yesterday },
    { label: "গত সপ্তাহ", value: product.lastWeek },
    { label: "গত মাস", value: product.lastMonth },
  ];

  return (
    <div className="max-w-6xl mx-auto px-4 py-6">
      <p className="text-sm text-gray-500 mb-3">
        <Link href="/" className="hover:text-brand">হোম</Link> /{" "}
        <Link href={"/category/" + product.category} className="hover:text-brand">
          {product.categoryNameBn}
        </Link>{" "}
        / {product.nameBn}
      </p>

      {/* summary */}
      <div className="bg-white rounded-2xl border border-gray-200 p-5 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div className="flex items-center gap-4">
          <div className="w-16 h-16 rounded-xl bg-gray-100 flex items-center justify-center text-4xl">
            {product.image}
          </div>
          <div>
            <h1 className="text-2xl font-bold">{product.nameBn}</h1>
            <p className="text-sm text-gray-600">
              সারাদেশের {toBn(product.markets.length)}টি বাজারের দামের সারসংক্ষেপ
            </p>
            <div className="flex flex-wrap items-center gap-2 mt-2 text-xs">
              <span className="bg-green-100 text-brand px-2 py-0.5 rounded-full">
                {product.categoryIcon} {product.categoryNameBn}
              </span>
              <span className="bg-gray-100 text-gray-700 px-2 py-0.5 rounded-full">
                {unitLabel(product.unit)}
              </span>
            </div>
          </div>
        </div>

        <div className="bg-green-50 rounded-xl px-5 py-3 sm:text-right">
          <p className="text-xs text-gray-500">আজকের দাম</p>
          <p className="text-2xl font-bold text-brand">{toBn(product.today)} টাকা</p>
          <div className="mt-1">
            <ChangeBadge change={product.change} />
          </div>
        </div>
      </div>

      {/* price summary */}
      <div className="bg-white rounded-2xl border border-gray-200 p-5 mt-4">
        <h2 className="font-bold mb-3">দামের সারসংক্ষেপ</h2>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          <div className="border border-gray-200 rounded-xl p-4">
            <p className="text-xs text-gray-500">সর্বনিম্ন দাম</p>
            <p className="text-xl font-bold text-green-700">{toBn(minPrice)} টাকা</p>
          </div>
          <div className="border border-gray-200 rounded-xl p-4">
            <p className="text-xs text-gray-500">সর্বোচ্চ দাম</p>
            <p className="text-xl font-bold text-red-600">{toBn(maxPrice)} টাকা</p>
          </div>
          <div className="border border-gray-200 rounded-xl p-4">
            <p className="text-xs text-gray-500">গড় দাম</p>
            <p className="text-xl font-bold">{toBn(avgPrice)} টাকা</p>
          </div>
        </div>

        <div className="flex flex-wrap gap-4 mt-4 text-sm text-gray-600">
          {oldPrices.map((item) => (
            <p key={item.label}>
              {item.label}: <span className="font-semibold text-gray-900">{toBn(item.value)} টাকা</span>
            </p>
          ))}
        </div>
      </div>

      {/* market wise table */}
      <div className="bg-white rounded-2xl border border-gray-200 p-5 mt-4">
        <h2 className="font-bold mb-3">বাজারভিত্তিক আজকের দাম</h2>
        <div className="overflow-x-auto">
          <table className="table table-zebra">
            <thead>
              <tr>
                <th>বাজার</th>
                <th>বিভাগ</th>
                <th>সর্বনিম্ন</th>
                <th>সর্বোচ্চ</th>
                <th>গড়</th>
              </tr>
            </thead>
            <tbody>
              {product.markets.map((m, index) => (
                <tr key={index}>
                  <td>{m.market}</td>
                  <td>{m.division}</td>
                  <td>{toBn(m.min)} টাকা</td>
                  <td>{toBn(m.max)} টাকা</td>
                  <td>{toBn(Math.round((m.min + m.max) / 2))} টাকা</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
