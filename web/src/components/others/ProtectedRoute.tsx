"use client";

import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/navigation";
import { useEffect, ReactNode } from "react";

interface ProtectedRouteProps {
    children: ReactNode;
}

const ProtectedRoute = ({ children }: ProtectedRouteProps) => {
    const { currentUser } = useAuth();
    const router = useRouter();

    useEffect(() => {
        // console.log(currentUser);
        if (!currentUser) {
            router.push("/");
        }
    }, [currentUser, router]);

    if (!currentUser) {
        return <div>Loading...</div>;
    }

    return <>{children}</>;
};

export default ProtectedRoute;
