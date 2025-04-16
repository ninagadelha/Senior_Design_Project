import Footer from "@/components/util/footer";
import Navbar from "@/components/util/navbar";
import { Box, Link } from "@chakra-ui/react";
import React from "react";

const PCViewStudents = () => {
    return (
        <div>
            <Navbar />
            <Box>
                This is view students page for a PC

                <Link
                    href="/pc-home"
                    className="text-blue-500 hover:underline text-sm"
                >
                    ← back to PC home
                </Link>
            </Box>
            <Footer />
        </div>
    );
};
export default PCViewStudents;