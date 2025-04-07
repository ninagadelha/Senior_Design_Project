import Navbar from "@/components/util/navbar";
import React from "react";
import Footer from "@/components/util/footer";
import StudentDashboardNew from "@/components/dashboards/StudentDashboardNew";

const StudentHome = () => {
    return (
            <div>
                <Navbar />
                <StudentDashboardNew />
                <Footer />
            </div>
    );
};
export default StudentHome;