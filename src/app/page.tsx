import Link from "next/link";
import Image from "next/image";

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-zinc-900">
      <Image
        src="/logo.png"
        alt="My Logo"
        width={100}
        height={100}
        className="mb-8 rounded-3xl shadow-2xl shadow-emerald-900"
      />
      <h1 className="text-4xl font-bold mb-4 text-gray-900 dark:text-white">
        Cashie
      </h1>
      <p className="text-xl mb-8 text-center text-gray-700 dark:text-gray-300">
        Selamat datang di Cashie, aplikasi manajemen keuangan Anda
      </p>

      <div className="flex flex-col space-y-4">
        <Link
          href="/login"
          className="px-6 py-3 text-center text-white bg-emerald-600 rounded-md hover:bg-emerald-700 focus:outline-none focus:ring-2 transition duration-300 dark:bg-emerald-700 dark:hover:bg-emerald-800"
        >
          Masuk ke Akun
        </Link>
        <Link
          href="/signup"
          className="px-6 py-3 text-center text-emerald-600 bg-white border border-emerald-600 rounded-md hover:bg-emerald-50 focus:outline-none focus:ring-2 transition duration-300 dark:bg-zinc-800 dark:text-emerald-400 dark:border-emerald-400 dark:hover:bg-zinc-700"
        >
          Daftar Akun Baru
        </Link>
      </div>
    </div>
  );
}
