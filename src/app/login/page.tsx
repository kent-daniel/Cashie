import Link from "next/link";

const page = () => {
  return (
    <div className="flex items-center justify-center min-h-screen bg-zinc-900">
      <div className="p-8 bg-zinc-800 rounded shadow-md w-96">
        <h2 className="mb-6 text-2xl font-bold text-center text-white">
          Login
        </h2>
        <form>
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
          <div className="mb-3 relative">
            <label
              htmlFor="password"
              className="block mb-2 text-sm font-medium text-gray-300"
            >
              Password
            </label>
            <input
              type="password"
              id="password"
              className="w-full px-3 py-2 bg-zinc-700 border border-zinc-600 rounded-md focus:outline-none text-white pr-10"
              placeholder="Enter your password"
              required
            />
          </div>
          <div className="flex mb-3 justify-between">
            <Link
              href="signup"
              className="text-sm text-emerald-500 hover:text-emerald-400"
            >
              Buat akun baru
            </Link>

            <Link
              href="forgot-password"
              className="text-sm text-emerald-500 hover:text-emerald-400"
            >
              Lupa password?
            </Link>
          </div>

          <button
            type="submit"
            className="w-full px-4 py-2 text-white bg-emerald-600 rounded-md hover:bg-emerald-700 focus:outline-none transition duration-300"
          >
            Log In
          </button>
        </form>
      </div>
    </div>
  );
};

export default page;
