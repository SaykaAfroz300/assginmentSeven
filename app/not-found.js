import Link from "next/link";

export default function NotFound() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-20 text-center">
      <p className="text-7xl font-bold text-brand">৪০৪</p>
      <h1 className="text-2xl font-bold mt-3">পেজটি খুঁজে পাওয়া যায়নি</h1>
      <p className="text-gray-600 mt-2">
        আপনি যে লিংকে এসেছেন সেটি ভুল অথবা পেজটি সরিয়ে ফেলা হয়েছে।
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
