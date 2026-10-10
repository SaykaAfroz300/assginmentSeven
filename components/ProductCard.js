import Link from "next/link";
import { toBn, toBnPercent, unitLabel } from "@/lib/helpers";

export function ChangeBadge({ change }) {
  if (change.dir === "up") {
    return (
      <span className="text-xs font-semibold px-2 py-1 rounded-md bg-red-50 text-red-600">
        ▲ {toBnPercent(change.pct)}%
      </span>
    );
  }
  if (change.dir === "down") {
    return (
      <span className="text-xs font-semibold px-2 py-1 rounded-md bg-green-50 text-green-700">
        ▼ {toBnPercent(change.pct)}%
      </span>
    );
  }
  return (
    <span className="text-xs font-semibold px-2 py-1 rounded-md bg-gray-100 text-gray-500">
      — ০.০%
    </span>
  );
}

export default function ProductCard({ product }) {
  return (
    <Link
      href={"/product/" + product.slug}
      className="block bg-white rounded-xl border border-gray-200 p-4 hover:shadow-md hover:-translate-y-0.5 transition"
    >
      <div className="flex items-center gap-3">
        <div className="w-12 h-12 rounded-lg bg-gray-100 flex items-center justify-center text-2xl">
          {product.image}
        </div>
        <div>
          <h3 className="font-semibold leading-tight">{product.nameBn}</h3>
          <p className="text-xs text-gray-500">{unitLabel(product.unit)}</p>
        </div>
      </div>

      <p className="text-xs text-gray-500 mt-4">আজকের দাম</p>
      <div className="flex items-center justify-between mt-1">
        <p className="text-xl font-bold">{toBn(product.today)} টাকা</p>
        <ChangeBadge change={product.change} />
      </div>
    </Link>
  );
}
