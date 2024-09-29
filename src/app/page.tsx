import Image from "next/image";
import {
  RegisterLink,
  LoginLink,
} from "@kinde-oss/kinde-auth-nextjs/components";

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <Image
        src="/logo.png"
        alt="My Logo"
        width={100}
        height={100}
        className="mb-8 rounded-3xl shadow-2xl shadow-emerald-900"
      />
      <h1 className="text-4xl font-bold mb-4 text-gray-100 dark:text-white">
        Cashie
      </h1>
      <p className="text-xl mb-8 text-center text-gray-400 dark:text-gray-300">
        Selamat datang di Cashie, aplikasi manajemen keuangan Anda
      </p>

      <div className="flex flex-col space-y-4">
        <LoginLink
          authUrlParams={{ lang: "id" }}
          className="px-6 py-3 text-center text-white bg-emerald-600 rounded-md hover:bg-emerald-700 focus:outline-none focus:ring-2 transition duration-300 dark:bg-emerald-700 dark:hover:bg-emerald-800"
        >
          Masuk ke akun
        </LoginLink>
        <RegisterLink
          authUrlParams={{ lang: "id" }}
          className="px-6 py-3 text-center text-emerald-500 bg-zinc-800 border border-emerald-500 rounded-md hover:bg-zinc-800/60 focus:outline-none focus:ring-2 transition duration-300 dark:bg-zinc-800 dark:text-emerald-400 dark:border-emerald-400 dark:hover:bg-zinc-700"
        >
          Daftar Akun Baru
        </RegisterLink>
      </div>
    </div>
  );
}
