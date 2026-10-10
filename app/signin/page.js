"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { authClient } from "@/lib/auth-client";
import SocialButtons from "@/components/SocialButtons";

export default function SignInPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const [callbackUrl, setCallbackUrl] = useState("/");

  // when user was sent here from a protected page
  useEffect(() => {
    const query = new URLSearchParams(window.location.search);
    if (query.get("callbackUrl")) {
      setCallbackUrl(query.get("callbackUrl"));
    }
    if (query.get("error") === "login-required") {
      toast.error("এই পেজ দেখতে আগে সাইন ইন করুন");
    }
  }, []);

  async function handleSubmit(e) {
    e.preventDefault();
    setErrorMsg("");

    if (!email || !password) {
      setErrorMsg("ইমেইল ও পাসওয়ার্ড দুটোই দিন");
      toast.error("ইমেইল ও পাসওয়ার্ড দুটোই দিন");
      return;
    }

    setLoading(true);
    const { error } = await authClient.signIn.email({ email, password });
    setLoading(false);

    if (error) {
      setErrorMsg("ইমেইল অথবা পাসওয়ার্ড ভুল হয়েছে");
      toast.error("ইমেইল অথবা পাসওয়ার্ড ভুল হয়েছে");
      return;
    }

    toast.success("সফলভাবে সাইন ইন হয়েছে");
    router.push(callbackUrl);
    router.refresh();
  }

  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <div className="text-center mb-6">
        <h1 className="text-2xl sm:text-3xl font-bold">সাইন ইন করুন</h1>
        <p className="text-sm text-gray-500 mt-1">
          আপনার অ্যাকাউন্টে ঢুকে পণ্যের বিস্তারিত দাম দেখুন।
        </p>
      </div>

      <div className="max-w-md mx-auto bg-white rounded-2xl border border-gray-200 p-5 sm:p-6">
        <form onSubmit={handleSubmit}>
          <label className="block text-sm font-medium mb-1">ইমেইল</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="you@example.com"
            className="input w-full mb-4"
          />

          <label className="block text-sm font-medium mb-1">পাসওয়ার্ড</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="আপনার পাসওয়ার্ড"
            className="input w-full mb-4"
          />

          {errorMsg && (
            <p className="text-sm text-red-600 mb-3">{errorMsg}</p>
          )}

          <button
            type="submit"
            disabled={loading}
            className="btn w-full bg-brand hover:bg-brand-dark text-white border-0"
          >
            {loading ? (
              <span className="loading loading-spinner loading-sm"></span>
            ) : (
              "সাইন ইন করুন"
            )}
          </button>
        </form>

        <div className="divider text-xs text-gray-500">অথবা</div>
        <SocialButtons callbackUrl={callbackUrl} />

        <p className="text-sm text-center mt-4">
          অ্যাকাউন্ট নেই?{" "}
          <Link href="/signup" className="text-brand font-medium">
            সাইন আপ করুন
          </Link>
        </p>
      </div>

      <p className="text-center text-sm text-gray-500 mt-6">
        <Link href="/">← হোম পেজে ফিরে যান</Link>
      </p>
    </div>
  );
}
