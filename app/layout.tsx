// app/layout.tsx (or wherever your RootLayout is located)
import { Inter } from "next/font/google";
import "./globals.css";
import { AppProvider } from "./AppContext"; // Adjust the import path accordingly
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ErrorBoundary from "./ErrorBoundary";
import { ReactNode } from "react";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Orizon",
  description: "CRM",
};

type RootLayoutProps = {
  children: ReactNode;
};

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <ErrorBoundary>
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
            />
          </AppProvider>
        </ErrorBoundary>
      </body>
    </html>
  );
}