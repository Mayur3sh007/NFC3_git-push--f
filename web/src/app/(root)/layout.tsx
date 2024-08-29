import React, { ReactNode } from "react";
import { Metadata } from "next";

export const metadata: Metadata = {
    title: "Protected",
    description: "Protected Route Layout",
};

const RootLayout = ({ children }: Readonly<{ children: ReactNode }>) => {
    return (
        children
    )
}

export default RootLayout;