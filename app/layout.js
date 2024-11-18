// app/layout.js (or wherever your RootLayout is located)
import { Inter } from "next/font/google";
import "./globals.css";
import { AppProvider } from "./AppContext"; // Adjust the import path accordingly
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Orizon",
  description: "CRM",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <AppProvider>
          {children}
          <ToastContainer
            position="top-right"
            autoClose={3000}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
            theme="light"
          ></ToastContainer>
        </AppProvider>
      </body>
    </html>
  );
}
