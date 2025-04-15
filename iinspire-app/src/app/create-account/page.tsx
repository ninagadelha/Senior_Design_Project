import CreateAccountBox from "@/components/util/create-account";
import colors from "../../../public/colors";
import Navbar from "@/components/util/navbar";


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
            }}
          >
            <CreateAccountBox />
          </div>
        </div>
      );
    }