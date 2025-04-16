'use client';
import Footer from "@/components/util/footer";
import Navbar from "@/components/util/navbar";
import { Box, Text, Accordion, Stack, Span, Flex, Heading } from "@chakra-ui/react";
import { useState } from "react";

const items = [
    { value: "Create a New Program", title: "Create a New Program", text: "After you login, you can create a new program by clicking the 'Create a New Program' button and entering the new programs information." },
    { value: "View Students", title: "How to view students in a program", text: "After logging in and selecting a program to view, you can view the students in that program by clicking the 'View Students' button on the dashboard." },
    { value: "Modify resources", title: "How to modify Program resources", text: "After logging in and selecting a program to view, you can edit that program's resources by clicking the 'Resources' button on the dashboard." },
    { value: "Remove student", title: "How to remove a student from a program", text: "After logging in and selecting a program to view, you can view the students in that program by clicking the 'View Students' button on the dashboard.\nAfter viewing the students, you can remove them from the program by clicking the 'Remove' button next to the student's name." },
]

const PCHelp = () => {
    const [value, setValue] = useState(["second-item"])
    return (
        <Box display="flex" flexDirection="column" minHeight="100vh" backgroundColor="#f8f8f8">
            <Navbar />
            <Heading m={2}>Program Coordinator Help</Heading>
            <Box
                backgroundColor="white"
                p="6"
                borderRadius="2xl"
                boxShadow="lg"
                border="1px solid #e2e8f0"
                flex="1">
                <Stack gap="4">
                    <Text textStyle={"xl"} fontWeight={"bold"}>How to use the Program Coordinator Dashboard</Text>
                    {/* <Text fontWeight="medium">Looking at: {value.join(", ")}</Text> */}
                    <Accordion.Root value={value} onValueChange={(e) => setValue(e.value)} variant={'enclosed'} collapsible>
                        {items.map((item, index) => (
                            <Accordion.Item key={index} value={item.value}>
                                <Accordion.ItemTrigger>
                                    <Text textStyle={"lg"} fontWeight={"semibold"} flex="1">{item.title}</Text>
                                    <Accordion.ItemIndicator />
                                </Accordion.ItemTrigger>
                                <Accordion.ItemContent>
                                    <Accordion.ItemBody>
                                        <Text m={2} fontWeight={"medium"} textStyle={"md"}>{item.text}</Text>
                                    </Accordion.ItemBody>
                                </Accordion.ItemContent>
                            </Accordion.Item>
                        ))}
                    </Accordion.Root>
                </Stack>
            </Box>
            <Footer />
        </Box>
    );
};

export default PCHelp;