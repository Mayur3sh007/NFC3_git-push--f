import React, { ReactNode } from "react";
import { Metadata } from "next";

export const metadata: Metadata = {
    title: "Search",
    description: "Search Layout",
};

const RootLayout = ({ children }: Readonly<{ children: ReactNode }>) => {
    return (
        <>
            {children}
        </>
    )
}

export default RootLayout;