"use client";

import { useEffect, useState } from "react";
import { getProducts } from "@/lib/api";
import { toBn, toBnPercent, shortUnit } from "@/lib/helpers";

export default function Ticker() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    getProducts().then((data) => setProducts(data));
  }, []);

  if (products.length === 0) {
    return <div className="h-10 bg-white border-b border-gray-200"></div>;
  }

  // list is shown two times so the loop looks endless
  const items = [...products, ...products];

  return (
    <div className="bg-white border-b border-gray-200 overflow-hidden">
      <div className="ticker-track">
        {items.map((p, index) => (
          <div
            key={index}
            className="flex items-center gap-1.5 px-4 py-2 text-xs sm:text-sm whitespace-nowrap border-r border-gray-200"
          >
            <span>{p.image}</span>
            <span className="font-medium">{p.nameBn}</span>
            <span className="text-gray-600">
              {toBn(p.today)} টাকা/{shortUnit(p.unit)}
            </span>
            {p.change.dir === "up" && (
              <span className="text-red-600 font-semibold">
                ▲ {toBnPercent(p.change.pct)}%
              </span>
            )}
            {p.change.dir === "down" && (
              <span className="text-green-700 font-semibold">
                ▼ {toBnPercent(p.change.pct)}%
              </span>
            )}
            {p.change.dir === "flat" && (
              <span className="text-gray-500 font-semibold">— ০.০%</span>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
