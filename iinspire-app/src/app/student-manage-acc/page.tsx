"use client"
import React, { useState } from 'react';
import Navbar from '@/components/util/navbar';
import Footer from '@/components/util/footer';
import { Flex, Box, Heading, Text, Input, Button } from '@chakra-ui/react';
import { useRouter } from 'next/navigation';

const BACKEND_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5001";

export default function StudentManageAcc(){

    //change it so email isn't username?????
    const [currentEmail] = useState("ngadelha@iastate.edu");                //for testing only
    const [email, setEmail] = useState('');
    const [name, setName] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [passwordError, setPasswordError] = useState('');

    //require strong password
    const strongPassword = (pwd: string) => {
        const strongPasswordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{8,}$/;
        return strongPasswordRegex.test(pwd);
    }

    const router = useRouter();

    //can be commented out later, just for testing
    const handleSave = async() => {

        if(password || confirmPassword){
            if(!password || !confirmPassword){
                setPasswordError("Please fill out both password fields.");
                return;
            }

            if(password !== confirmPassword){
            setPasswordError('Passwords do not match');
            return
            }

            if(!strongPassword(password)){
            setPasswordError('Password must be at least 8 characters long and include one uppercase, lowercase, number and special character.');
            return;
            }
        }

        setPasswordError('');

        const body: any = {};
        body.email = currentEmail;
        if(name.trim()) body.name = name.trim();
        if(email.trim()) body.newEmail = email.trim();
        if(password) body.password = password;

        if(Object.keys(body).length === 1){
            alert("No changes to save.");
            return;
        }

        //need to add authentication/tokens once that is implemented
        try{
            const res = await fetch(`${BACKEND_URL}/api/users/updateStudent`,{                      
                method: "PUT",
                headers: { "Content-Type": "application/json",
                //"Authorization": 'Bearer ${token}',
                },
                body: JSON.stringify(body),
            });

            let updatedUser;
            
            if(!res.ok){
                const errorData = await res.json();
                throw new Error (errorData.message || "Failed to update account");
            }
            else{
                updatedUser = await res.json();
            }

            console.log("Updates user:", updatedUser);
            alert("Account updated successfully");

            setPassword('');
            setConfirmPassword('');

            router.push('/');

        }
        catch (error: any){
            console.error(error);
            setPasswordError(error.message);
        }
    };

    return(
        <Flex direction="column" minH="100vh">
            <Navbar/>
            <Box flex="1" p={8}>
                <Heading mb={6}>Manage Account Information</Heading>
                <Box 
                display="flex"
                flexDirection="column"
                gap={4}
                maxW="400px"
                width="100%"
                alignItems="stretch"
                >
                    <Input
                    placeholder="Enter your new username"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    />
                    <Input
                    placeholder="Enter your new email address"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    />
                    <Input
                    placeholder="Enter your new password"
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    />
                    <Input
                    placeholder="Confirm your new password"
                    type="password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    />

                    {passwordError &&(
                        <Text color="red.500" fontSize ="sm">
                            {passwordError}
                        </Text>
                    )}

                    <Button colorScheme="blue" onClick={handleSave}>
                        Save Changes
                    </Button>
                </Box>
            </Box>
            <Footer/>
        </Flex>
    );
}