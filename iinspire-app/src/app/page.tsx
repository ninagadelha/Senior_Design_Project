import LoginBox from "@/components/login-box";
import colors from "../../public/colors";
import Navbar from "@/components/ui/navbar";

export default function Home() {
    return (
      <div>
        <Navbar />
        <div suppressHydrationWarning
            className="flex justify-center items-center min-h-screen relative"
            style={{ backgroundColor: colors.login_bg }} // Use the color from your colors.ts file
        >
            <div className="ml-20"> {/* Adjust margin to control distance from the left edge */}
                <LoginBox />
            </div>
        </div>
      </div>
    );
}
