import Link from "next/link";
import React from "react";
import colors from "../../../public/colors";

const CreateAccount = () => {
    return (


                <div className="text-center mt-4">
                    <Link
                        href="/"
                        className="text-blue-500 hover:underline text-sm"
                    >
                        ← Back to Login
                    </Link>
                </div>
    );
};
export default CreateAccount;