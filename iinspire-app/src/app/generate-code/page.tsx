import Footer from "@/components/util/footer";
import Navbar from "@/components/util/navbar";
"use client";
import { useState } from "react";
import {
  Box, RadioGroup, Stack, Button, Input, Flex, Text, IconButton
} from "@chakra-ui/react";
import {  CgClipboard } from "react-icons/cg";

const GenerateCode = () => {
    const [role, setRole] = useState("admin");
    const [code, setCode] = useState("");
 
    const generateCode = () => {
        // Replace with your actual code generator logic
        const newCode = `${role.toUpperCase()}-${Math.random().toString(36).substring(2, 10).toUpperCase()}`;
        setCode(newCode);
      };
    
      const handleCopy = () => {
        navigator.clipboard.writeText(code);
      };
    
      return (
        <Box maxW="lg" mx="auto" mt={10} p={6} borderWidth={1} borderRadius="xl">
          <Text fontSize="2xl" mb={4} fontWeight="bold">Generate Access Code</Text>
    
          <Text mb={2}>Select Role:</Text>
          {/* <RadioGroup onChange={setRole} value={role}>
            <Stack direction="row" mb={4}>
              <Radio value="admin">Admin</Radio>
              <Radio value="pc">Program Coordinator</Radio>
            </Stack>
          </RadioGroup> */}
    
          <Button colorScheme="blue" onClick={generateCode} mb={4}>
            Generate Code
          </Button>
    
          {code && (
            <Flex
              align="center"
              justify="space-between"
              bg="gray.100"
              px={4}
              py={2}
              borderRadius="md"
              mb={2}
            >
              <Text fontFamily="mono">{code}</Text>
              {/* <IconButton
                icon={CgClipboard}
                aria-label="Copy code"
                onClick={handleCopy}
                variant="ghost"
              /> */}
            </Flex>
          )}
        </Box>
      );
    };
    
export default GenerateCode;