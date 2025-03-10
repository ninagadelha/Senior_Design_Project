import LoginBox from "@/components/login-box";
import colors from "../../public/colors";
import Navbar from "@/components/util/navbar";
import { Box } from "@chakra-ui/react";

export default function Home() {
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
          {/* Circles Positioned Behind LoginBox */}
          <Box position="absolute" bottom="-50px" left="-60px" zIndex={0}>

            {/* Purple Circle with Outline */}
            <Box position="absolute" left="-5px" bottom="100px" w="110px" h="110px"
              borderRadius="full"
              border="1px dashed white"
              borderStyle="dashed"
              borderWidth="4px"
              borderSpacing="10px" />
            <Box
              w="90px" h="90px" bg="purple.500"
              borderRadius="full" position="absolute"
              left="5px" bottom="110px"
            />

            {/* Red Circle with Outline */}
            <Box position="absolute" left="-42px" bottom="-32px" w="160px" h="160px"
              borderRadius="full" border="2px dashed white"
              borderStyle="dashed"
              borderWidth="4px"
              borderSpacing="10px" />
            <Box
              w="140px" h="140px" bg="red.500"
              borderRadius="full" position="absolute"
              left="-30px" bottom="-20px"
            />

            {/* Green Circle with Outline */}
            <Box position="absolute" left="70px" bottom="0px" w="110px" h="110px"
              borderRadius="full" border="2px dashed white"
              borderStyle="dashed"
              borderWidth="4px"
              borderSpacing="10px" />
            <Box
              w="90px" h="90px" bg="green.400"
              borderRadius="full" position="absolute"
              left="80px" bottom="10px"
            />
          </Box>

          <Box position="relative" zIndex={1} mt="-5rem">
            <LoginBox />
          </Box>
        </Box>
      </Box>
    </div>
  );
}
