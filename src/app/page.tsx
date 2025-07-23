import Image from "next/image";
import {
  RegisterLink,
  LoginLink,
} from "@kinde-oss/kinde-auth-nextjs/components";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <Image
        src="/logo.png"
        alt="My Logo"
        width={100}
        height={100}
        className="mb-8 rounded-3xl shadow-2xl shadow-emerald-700 dark:shadow-emerald-900"
      />
      <h1 className="text-4xl font-bold mb-4 text-gray-700 dark:text-white">
        Cashie
      </h1>
      <p className="text-xl mb-8 text-center text-gray-600 dark:text-gray-300">
        Selamat datang di Cashie, aplikasi manajemen keuangan Anda
      </p>

      <div className="flex flex-col space-y-4">
        <LoginLink
          authUrlParams={{ lang: "id" }}
          className="px-6 py-3 text-center text-white bg-emerald-600 rounded-md hover:bg-emerald-700 focus:outline-none focus:ring-2 transition duration-300 dark:bg-emerald-700 dark:hover:bg-emerald-800"
        >
          Masuk ke akun
        </LoginLink>
      </div>

      {/* Toast Container */}
      <ToastContainer />
    </div>
  );
}
