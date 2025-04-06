import Link from "next/link";
import React from "react";
//import colors from "../../../public/colors";

const AdminDashboard = () => {
    return (


                <div className="text-center mt-4">
                    <Link
                        href="/"
                        className="text-blue-500 hover:underline text-sm"
                    >
                        ← Admin Dashboard
                    </Link>
                </div>
    );
};
export default AdminDashboard;