// src/i18n.js
import i18next from "i18next";
import { initReactI18next } from "react-i18next";

i18next.use(initReactI18next).init({
  resources: {
    id: {
      translation: {
        Tanggal: "Tanggal",
        "Kode Project": "Kode Project",
        Deskripsi: "Deskripsi",
        Biaya: "Biaya",
        Kategori: "Kategori",
        Pencatat: "Pencatat",
        "No results.": "Tidak ada hasil.",
        "Copy payment ID": "Salin ID pembayaran",
        "View customer": "Lihat pelanggan",
        "View payment details": "Lihat rincian pembayaran",
        Actions: "Aksi",
        "Cari kode project...": "Cari kode project...",
        Columns: "Kolom",
        Previous: "Sebelumnya",
        Next: "Selanjutnya",
        of: "dari",
        "row(s) selected.": "baris dipilih.",
      },
    },
  },
  lng: "id", // Default language
  fallbackLng: "id", // Fallback language
  interpolation: {
    escapeValue: false, // React already escapes values
  },
});

export default i18next;
