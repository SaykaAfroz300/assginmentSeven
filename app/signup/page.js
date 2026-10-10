"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { authClient } from "@/lib/auth-client";
import SocialButtons from "@/components/SocialButtons";

export default function SignUpPage() {
  const router = useRouter();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  function showError(msg) {
    setErrorMsg(msg);
    toast.error(msg);
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setErrorMsg("");

    if (!name.trim()) {
      showError("আপনার নাম লিখুন");
      return;
    }
    if (!email) {
      showError("ইমেইল দিন");
      return;
    }
    if (password.length < 8) {
      showError("পাসওয়ার্ড কমপক্ষে ৮ অক্ষরের হতে হবে");
      return;
    }
    if (password !== confirm) {
      showError("দুটো পাসওয়ার্ড মিলছে না");
      return;
    }

    setLoading(true);
    const { error } = await authClient.signUp.email({
      name: name,
      email: email,
      password: password,
    });
    setLoading(false);

    if (error) {
      showError(error.message || "অ্যাকাউন্ট তৈরি করা যায়নি");
      return;
    }

    toast.success("অ্যাকাউন্ট তৈরি হয়েছে, এখন সাইন ইন করুন");
    router.push("/signin");
  }

  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <div className="text-center mb-6">
        <h1 className="text-2xl sm:text-3xl font-bold">অ্যাকাউন্ট তৈরি করুন</h1>
        <p className="text-sm text-gray-500 mt-1">
          বিনা খরচে সাইন আপ করে সব বিস্তারিত দাম দেখুন।
        </p>
      </div>

      <div className="max-w-md mx-auto bg-white rounded-2xl border border-gray-200 p-5 sm:p-6">
        <form onSubmit={handleSubmit}>
          <label className="block text-sm font-medium mb-1">নাম</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="যেমন: রহিম উদ্দিন"
            className="input w-full mb-4"
          />

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
            placeholder="কমপক্ষে ৮ অক্ষর"
            className="input w-full mb-4"
          />

          <label className="block text-sm font-medium mb-1">
            পাসওয়ার্ড নিশ্চিত করুন
          </label>
          <input
            type="password"
            value={confirm}
            onChange={(e) => setConfirm(e.target.value)}
            placeholder="আবার লিখুন"
            className="input w-full mb-4"
          />

          {errorMsg && <p className="text-sm text-red-600 mb-3">{errorMsg}</p>}

          <button
            type="submit"
            disabled={loading}
            className="btn w-full bg-brand hover:bg-brand-dark text-white border-0"
          >
            {loading ? (
              <span className="loading loading-spinner loading-sm"></span>
            ) : (
              "অ্যাকাউন্ট তৈরি করুন"
            )}
          </button>
        </form>

        <div className="divider text-xs text-gray-500">অথবা</div>
        <SocialButtons callbackUrl="/" />

        <p className="text-sm text-center mt-4">
          অ্যাকাউন্ট আছে?{" "}
          <Link href="/signin" className="text-brand font-medium">
            সাইন ইন করুন
          </Link>
        </p>
      </div>

      <p className="text-center text-sm text-gray-500 mt-6">
        <Link href="/">← হোম পেজে ফিরে যান</Link>
      </p>
    </div>
  );
}
