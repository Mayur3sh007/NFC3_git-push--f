import React, { ReactNode } from "react";
import { Metadata } from "next";
import Navbar from "@/components/header/Navbar";

export const metadata: Metadata = {
  title: "Navbar",
  description: "Navbar Layout",
};

const RootLayout = ({ children }: Readonly<{ children: ReactNode }>) => {
  return (
    <>
      <Navbar />
      <main className="min-h-[calc(100vh-72px)] bg-dark-4  flex flex-col items-center justify-center mx-auto w-full ">
        {children}
      </main>
    </>
  );
};

export default RootLayout;
