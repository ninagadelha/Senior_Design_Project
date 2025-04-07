import PCDashboard from "@/components/dashboards/PC-Dashboard";
import Footer from "@/components/util/footer";
import Navbar from "@/components/util/navbar";
import React from "react";

const PCHome = () => {
    return (
        <div>
            <Navbar />
            <PCDashboard />
            <Footer />
        </div>
    );
};
export default PCHome;