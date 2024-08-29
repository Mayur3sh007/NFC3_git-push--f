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
            <main className="h-[calc(100vh-72px)] bg-dark-4 flex items-center px-32">
                {children}
            </main>
        </>
    )
}

export default RootLayout;