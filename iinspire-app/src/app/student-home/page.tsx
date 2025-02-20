import Navbar from "@/components/util/navbar";
import React from "react";
import Footer from "@/components/util/footer";
import StudentDashboard from "@/components/StudentDashboard";

const StudentHome = () => {
    return (
                <div>
                    <Navbar />
                    <StudentDashboard />
                    <Footer />
                </div>
    );
};
export default StudentHome;