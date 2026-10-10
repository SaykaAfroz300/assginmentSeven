"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { authClient } from "@/lib/auth-client";

export default function ProfilePage() {
  const router = useRouter();
  const { data: session, isPending } = authClient.useSession();

  async function handleSignOut() {
    await authClient.signOut();
    toast.success("সফলভাবে সাইন আউট হয়েছে");
    router.push("/");
    router.refresh();
  }

  if (isPending) {
    return (
      <div className="max-w-xl mx-auto px-4 py-10">
        <div className="skeleton h-8 w-48 mb-6"></div>
        <div className="skeleton h-32 w-full rounded-2xl"></div>
      </div>
    );
  }

  if (!session) {
    return (
      <div className="max-w-xl mx-auto px-4 py-10 text-center">
        <p className="mb-4">প্রোফাইল দেখতে সাইন ইন করুন।</p>
        <Link href="/signin" className="btn bg-brand text-white border-0">
          সাইন ইন
        </Link>
      </div>
    );
  }

  const user = session.user;

  return (
    <div className="max-w-xl mx-auto px-4 py-10">
      <h1 className="text-2xl font-bold">আমার প্রোফাইল</h1>
      <p className="text-sm text-gray-500 mb-5">আপনার অ্যাকাউন্টের তথ্য এখানে দেখুন।</p>

      <div className="bg-white rounded-2xl border border-gray-200 p-5 flex flex-col sm:flex-row sm:items-center gap-4">
        {user.image ? (
          <img
            src={user.image}
            alt="profile"
            className="w-16 h-16 rounded-xl object-cover"
          />
        ) : (
          <div className="w-16 h-16 rounded-xl bg-brand text-white flex items-center justify-center text-2xl font-bold">
            {user.name.charAt(0).toUpperCase()}
          </div>
        )}
        <div className="flex-1">
          <p className="font-semibold text-lg">{user.name}</p>
          <p className="text-sm text-gray-500 break-all">{user.email}</p>
        </div>
        <button
          onClick={handleSignOut}
          className="btn btn-sm btn-outline btn-error"
        >
          ↩ সাইন আউট
        </button>
      </div>

      <div className="mt-4">
        <Link
          href="/profile/update"
          className="btn w-full bg-brand hover:bg-brand-dark text-white border-0"
        >
          তথ্য আপডেট করুন
        </Link>
      </div>
    </div>
  );
}
