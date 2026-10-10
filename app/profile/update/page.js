"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { authClient } from "@/lib/auth-client";

export default function UpdateProfilePage() {
  const router = useRouter();
  const { data: session, isPending } = authClient.useSession();
  const [name, setName] = useState("");
  const [loading, setLoading] = useState(false);

  // put the current name in the input
  useEffect(() => {
    if (session) {
      setName(session.user.name);
    }
  }, [session]);

  async function handleUpdate(e) {
    e.preventDefault();

    if (!name.trim()) {
      toast.error("নাম খালি রাখা যাবে না");
      return;
    }

    setLoading(true);
    const { error } = await authClient.updateUser({ name: name.trim() });
    setLoading(false);

    if (error) {
      toast.error("তথ্য আপডেট করা যায়নি");
      return;
    }

    toast.success("তথ্য সফলভাবে আপডেট হয়েছে");
    router.push("/profile");
  }

  if (isPending) {
    return (
      <div className="max-w-xl mx-auto px-4 py-10">
        <div className="skeleton h-48 w-full rounded-2xl"></div>
      </div>
    );
  }

  return (
    <div className="max-w-xl mx-auto px-4 py-10">
      <h1 className="text-2xl font-bold">তথ্য আপডেট করুন</h1>
      <p className="text-sm text-gray-500 mb-5">আপনার নাম পরিবর্তন করতে পারেন।</p>

      <form
        onSubmit={handleUpdate}
        className="bg-white rounded-2xl border border-gray-200 p-5"
      >
        <label className="block text-sm font-medium mb-1">নাম</label>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="আপনার নাম"
          className="input w-full mb-4"
        />

        <button
          type="submit"
          disabled={loading}
          className="btn w-full bg-brand hover:bg-brand-dark text-white border-0"
        >
          {loading ? (
            <span className="loading loading-spinner loading-sm"></span>
          ) : (
            "আপডেট"
          )}
        </button>
      </form>

      <p className="text-center text-sm text-gray-500 mt-5">
        <Link href="/profile">← প্রোফাইলে ফিরে যান</Link>
      </p>
    </div>
  );
}
