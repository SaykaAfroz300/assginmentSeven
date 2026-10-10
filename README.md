# 🛒 বাজার দর (BazarDor)

বাংলাদেশের নিত্যপ্রয়োজনীয় পণ্যের দাম এক জায়গায় দেখার জন্য একটি Price Tracking ওয়েবসাইট। চাল, ডাল, তেল, সবজি, মাছ, মাংস, ডিম-দুধ ও মসলার আজকের দাম, দাম বাড়া-কমার হার এবং বাজারভিত্তিক বিস্তারিত দাম দেখা যায়।

**Live Link:** _deploy করার পর এখানে দিন_

## 🧰 Technologies Used

- Next.js (App Router) + JavaScript
- Tailwind CSS + daisyUI
- BetterAuth (Email/Password, Google, GitHub)
- MongoDB (BetterAuth database)
- react-hot-toast

## ✨ Key Features

1. **Live price ticker** – navbar-এর নিচে infinite scrolling দামের স্ট্রিপ (▲/▼ সহ)
2. **আজ দাম বেড়েছে / কমেছে** – সবচেয়ে বেশি বাড়া ও কমা ৬টি করে পণ্য, সাথে সব পণ্যের responsive grid
3. **Category page + Sorting** – ক্যাটাগরি অনুযায়ী পণ্য, দাম অনুযায়ী (কম→বেশি / বেশি→কম) সাজানো, loading skeleton ও 404-style empty state
4. **Protected Product Details** – লগইন ছাড়া ঢোকা যায় না; সর্বনিম্ন, সর্বোচ্চ, গড় দাম ও বাজারভিত্তিক টেবিল
5. **Authentication** – Sign In / Sign Up, Google ও GitHub login, toast notification
6. **My Profile + Update** – নাম আপডেট করার সুবিধা (BetterAuth `updateUser`)
7. **Fully responsive** – mobile, tablet ও desktop সব স্ক্রিনে কাজ করে

## 🚀 Run Locally

```bash
npm install
cp .env.example .env.local   # নিজের মান বসান
npm run dev
```

`.env.local`-এ `MONGODB_URI`, `BETTER_AUTH_SECRET`, `BETTER_AUTH_URL`, এবং Google/GitHub-এর client id ও secret দিতে হবে।

Social login-এর callback URL: `{BETTER_AUTH_URL}/api/auth/callback/google` ও `{BETTER_AUTH_URL}/api/auth/callback/github`

## 🔗 API

`https://api.api-store.workers.dev/api/bazardor` (backup: `https://api.abcz.workers.dev/api/bazardor`)

- `/products`, `/products?category=chal`, `/products/1`
- `/categories`, `/categories/chal`

## 📂 Folder Structure

```
app/          pages (home, category, product, signin, signup, profile)
components/   Navbar, Ticker, ProductCard, Footer ...
lib/          api helpers, auth config, bengali number helpers
proxy.js      protects /product and /profile routes
```
