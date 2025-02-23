import Navbar from "@/components/util/navbar";
import React from "react";
import Footer from "@/components/util/footer";
import { Link } from "@chakra-ui/react";

const StudentSurvey = () => {
    return (
                <div>
                    <Navbar />
                    This is a super awesome survey screen. Plz Fix @Max.

                    <Link
                        href="/student-home"
                        className="text-blue-500 hover:underline text-sm"
                    >
                        ← Back to Student Home
                    </Link>
                    <Footer />
                </div>
    );
};
export default StudentSurvey;