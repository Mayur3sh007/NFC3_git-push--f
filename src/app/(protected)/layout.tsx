import React, { ReactNode } from "react";
import { Metadata } from "next";
import ProtectedRoute from "@/components/others/ProtectedRoute";
import { AuthProvider } from "@/context/AuthContext";

export const metadata: Metadata = {
    title: "Protected",
    description: "Protected Route Layout",
};

const ProtectedRouteLayout = ({ children }: Readonly<{ children: ReactNode }>) => {
    return (
        <AuthProvider>
            <ProtectedRoute>
                {children}
            </ProtectedRoute>
        </AuthProvider>
    )
}

export default ProtectedRouteLayout;