"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { authClient } from "@/lib/auth-client";
import { getCategories } from "@/lib/api";
import { getBanglaDate } from "@/lib/helpers";

export default function Navbar() {
  const [categories, setCategories] = useState([]);
  const [date, setDate] = useState("");
  const [menuOpen, setMenuOpen] = useState(false);
  const pathname = usePathname();
  const router = useRouter();
  const { data: session, isPending } = authClient.useSession();

  useEffect(() => {
    setDate(getBanglaDate());
    getCategories().then((data) => setCategories(data));
  }, []);

  // close the dropdown when page changes
  useEffect(() => {
    setMenuOpen(false);
  }, [pathname]);

  async function handleSignOut() {
    await authClient.signOut();
    toast.success("সফলভাবে সাইন আউট হয়েছে");
    setMenuOpen(false);
    router.push("/");
    router.refresh();
  }

  const user = session ? session.user : null;

  return (
    <header className="bg-white border-b border-gray-200">
      <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-3">
          <div className="w-10 h-10 sm:w-11 sm:h-11 bg-brand rounded-xl flex items-center justify-center text-xl">
            🛒
          </div>
          <div>
            <p className="font-bold text-lg sm:text-xl leading-tight">বাজার দর</p>
            <p className="text-[11px] sm:text-xs text-gray-500 min-h-4">{date}</p>
          </div>
        </Link>

        <div className="flex items-center gap-2 sm:gap-3">
          {isPending && <div className="skeleton h-9 w-24 rounded-lg"></div>}

          {!isPending && !user && (
            <>
              <Link
                href="/signin"
                className="btn btn-ghost btn-sm sm:btn-md font-semibold"
              >
                সাইন ইন
              </Link>
              <Link
                href="/signup"
                className="btn btn-sm sm:btn-md bg-brand hover:bg-brand-dark text-white border-0"
              >
                সাইন আপ
              </Link>
            </>
          )}

          {!isPending && user && (
            <div className="relative">
              <button
                onClick={() => setMenuOpen(!menuOpen)}
                className="flex items-center gap-2 cursor-pointer"
              >
                {user.image ? (
                  <img
                    src={user.image}
                    alt="profile"
                    className="w-9 h-9 rounded-full object-cover"
                  />
                ) : (
                  <div className="w-9 h-9 rounded-full bg-brand text-white flex items-center justify-center font-bold">
                    {user.name.charAt(0).toUpperCase()}
                  </div>
                )}
                <span className="hidden sm:block text-sm font-medium">
                  {user.name.split(" ")[0]}
                </span>
                <span className="text-[10px] text-gray-500">▼</span>
              </button>

              {menuOpen && (
                <div className="absolute right-0 mt-2 w-60 bg-white rounded-xl shadow-lg border border-gray-200 p-3 z-50">
                  <p className="font-semibold text-sm">{user.name}</p>
                  <p className="text-xs text-gray-500 mb-2 break-all">{user.email}</p>
                  <hr className="border-gray-200 mb-2" />
                  <Link
                    href="/profile"
                    className="block text-sm py-1.5 hover:text-brand"
                  >
                    👤 আমার প্রোফাইল
                  </Link>
                  <button
                    onClick={handleSignOut}
                    className="block w-full text-left text-sm py-1.5 text-red-600 cursor-pointer"
                  >
                    ↩ সাইন আউট
                  </button>
                </div>
              )}
            </div>
          )}
        </div>
      </div>

      {/* category links */}
      <nav className="border-t border-gray-100">
        <div className="max-w-6xl mx-auto px-4 py-2 flex gap-2 overflow-x-auto">
          {categories.length === 0 && (
            <div className="skeleton h-8 w-full max-w-md rounded-lg"></div>
          )}
          {categories.map((cat) => {
            const active = pathname === "/category/" + cat.slug;
            return (
              <Link
                key={cat.id}
                href={"/category/" + cat.slug}
                className={
                  "px-3 py-1.5 rounded-lg text-sm whitespace-nowrap flex items-center gap-1.5 " +
                  (active
                    ? "bg-brand text-white font-semibold"
                    : "text-gray-700 hover:bg-gray-100")
                }
              >
                <span>{cat.icon}</span>
                {cat.nameBn}
              </Link>
            );
          })}
        </div>
      </nav>
    </header>
  );
}
