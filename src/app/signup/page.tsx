import React from "react";

const Page = () => {
  return (
    <div className="flex items-center justify-center min-h-screen bg-zinc-900">
      <div className="p-8 bg-zinc-800 rounded shadow-md w-96">
        <h2 className="mb-6 text-2xl font-bold text-center text-white">
          Sign Up
        </h2>
        <form>
          <div className="mb-4">
            <label
              htmlFor="name"
              className="block mb-2 text-sm font-medium text-gray-300"
            >
              Name
            </label>
            <input
              type="text"
              id="name"
              className="w-full px-3 py-2 bg-zinc-700 border border-zinc-600 rounded-md focus:outline-none text-white"
              placeholder="Enter your name"
              required
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="email"
              className="block mb-2 text-sm font-medium text-gray-300"
            >
              Email
            </label>
            <input
              type="email"
              id="email"
              className="w-full px-3 py-2 bg-zinc-700 border border-zinc-600 rounded-md focus:outline-none text-white"
              placeholder="Enter your email"
              required
            />
          </div>
          <div className="mb-6">
            <label
              htmlFor="password"
              className="block mb-2 text-sm font-medium text-gray-300"
            >
              Password
            </label>
            <input
              type="password"
              id="password"
              className="w-full px-3 py-2 bg-zinc-700 border border-zinc-600 rounded-md focus:outline-none text-white"
              placeholder="Enter your password"
              required
            />
          </div>
          <div className="mb-6">
            <label
              htmlFor="confirm-password"
              className="block mb-2 text-sm font-medium text-gray-300"
            >
              Confirm Password
            </label>
            <input
              type="password"
              id="confirm-password"
              className="w-full px-3 py-2 bg-zinc-700 border border-zinc-600 rounded-md focus:outline-none text-white"
              placeholder="Confirm your password"
              required
            />
          </div>
          <button
            type="submit"
            className="w-full px-4 py-2 text-white bg-emerald-600 rounded-md hover:bg-emerald-700 focus:outline-none transition duration-300"
          >
            Sign Up
          </button>
        </form>
      </div>
    </div>
  );
};

export default Page;
