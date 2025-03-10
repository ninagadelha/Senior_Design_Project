import Link from "next/link";
import React from "react";
//import colors from "../../../public/colors";

const AboutPage = () => {
    return (


                <div className="text-center mt-4">
                    <Link
                        href="/"
                        className="text-blue-500 hover:underline text-sm"
                    >
                        ← Back to Home
                    </Link>
                </div>
    );
};
export default AboutPage;