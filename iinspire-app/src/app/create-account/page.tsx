import CreateAccountBox from "@/components/util/create-account";
import colors from "../../../public/colors";
import Navbar from "@/components/util/navbar";
import { Box } from "@chakra-ui/react";


export default function CreateAccountPage() {
    return (
        <div>
          <Navbar />
          <div
            style={{
              backgroundColor: colors.primary_blue,
              minHeight: "100vh",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            //   paddingTop: "80px", // to avoid overlap with navbar
            }}
          >
            <CreateAccountBox />
          </div>
        </div>
      );
    }