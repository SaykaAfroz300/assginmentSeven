"use client";

import { authClient } from "@/lib/auth-client";
import toast from "react-hot-toast";

export default function SocialButtons({ callbackUrl = "/" }) {
  async function socialLogin(provider) {
    const { error } = await authClient.signIn.social({
      provider: provider,
      callbackURL: callbackUrl,
    });
    if (error) {
      toast.error("সোশ্যাল লগইন করা যায়নি, আবার চেষ্টা করুন");
    }
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
      <button
        type="button"
        onClick={() => socialLogin("google")}
        className="btn btn-outline btn-sm sm:btn-md"
      >
        <span className="font-bold text-blue-600">G</span> Google দিয়ে চালিয়ে যান
      </button>
      <button
        type="button"
        onClick={() => socialLogin("github")}
        className="btn btn-outline btn-sm sm:btn-md"
      >
        <span>🐙</span> GitHub দিয়ে চালিয়ে যান
      </button>
    </div>
  );
}
