import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import ToastProvider from "@/components/ToastProvider";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "Obsidian - Beauty & Style",
  description: "Tu destino de belleza y estilo. Servicios profesionales de manicure y productos exclusivos de moda.",
  icons: {
    icon: '/logo-zabina.png',
  },
  keywords: ['servicios de uñas', 'esmaltado', 'nail art', 'venta de productos', 'carteras', 'ropa', 'accesorios'],
};

export default function RootLayout({ children }) {
  return (
    <html lang="es">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        <Navbar />
        <main>
          {children}
        </main>
        <Footer />
        <ToastProvider />
      </body>
    </html>
  );
}