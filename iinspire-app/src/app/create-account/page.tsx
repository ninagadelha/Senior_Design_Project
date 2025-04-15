import CreateAccountBox from "@/components/util/create-account";
import colors from "../../../public/colors";
import Navbar from "@/components/util/navbar";
import { Box } from "@chakra-ui/react";


export default function CreateAccountPage() {
 return (
   <div>
     <Navbar />
     <Box
       display={"flex"}
       justifyContent={"center"}
       alignItems={"center"}
       minH={"100vh"}
       suppressHydrationWarning
       style={{ backgroundColor: colors.primary_blue }}
     >
       <Box position="relative" display="flex" justifyContent="center" alignItems="center">

         <Box position="absolute" bottom="-50px" left="-60px" zIndex={0}>

         </Box>


         <Box position="relative" zIndex={1} mt="-5rem">
           <CreateAccountBox />
         </Box>
       </Box>
     </Box>
   </div>
 );
}

