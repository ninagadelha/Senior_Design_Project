import Link from "next/link";
import React from "react";
import { useAuth } from "@/context/auth-context";

const AboutPage = () => {
    const { getHomePath } = useAuth();

    return (
                <div className="text-center mt-4">
                    <Link
                        href= {getHomePath()}
                        className="text-blue-500 hover:underline text-sm"
                    >
                        ← Back to Home
                    </Link>
                </div>
    );
};

export default AboutPage;