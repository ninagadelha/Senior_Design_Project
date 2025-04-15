"use client"
import { 
  Box, 
  Heading, 
  Button, 
  Text, 
  Image, 
  VStack, 
  StackProps,
  Spinner,
  Portal,
  Select,
  createListCollection,
} from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import colors from "../../../public/colors";
import { useAuth } from "@/context/auth-context";
import { useRouter } from "next/navigation";
import { API_ENDPOINTS } from "@/constants/config";

type Program = {
  program_id: number;
  name: string;
  owner_userid: number;
  code: string;
  student_count: number;
};

const PCSelectProgramBox = () => {
  const router = useRouter();
  const { user, selectedProgram, setSelectedProgram } = useAuth();
  const [programs, setPrograms] = useState<Program[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    const fetchPrograms = async () => {
      if (!user?.id) {
        console.log("reached");
        setIsLoading(false);
        return;
      }
      
      setIsLoading(true);
      try {
        const response = await fetch(API_ENDPOINTS.getProgramsByPC, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            owner_userid: parseInt(user.id)
          })
        });

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        const data = await response.json();
        setPrograms(data);
      } catch (error) {
        console.error('Error fetching programs:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchPrograms();
  }, [user]);

  const programCollection = createListCollection({
    items: programs.map(program => ({
      label: `${program.name} (${program.student_count} students)`,
      value: program.program_id.toString()
    }))
  });

  const handleValueChange = ({ value }: { value: string[] }) => {
    const programId = value[0] || "";
    setSelectedProgram(programId);
    console.log("New program selected");
  };

  const handleContinue = async () => {
    if (!selectedProgram) return;
    setIsSubmitting(true);
    try {
      router.push('/pc-home');
    } catch (error) {
      console.error('Error:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const containerProps: StackProps = {
    maxW: "xl",
    mx: "auto",
    p: 6,
    gap: 6,
    align: "center",
  };

  if (isLoading) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" minH="100vh">
        <Spinner size="xl" color={colors.primary_blue} />
      </Box>
    );
  }

  return (
    <Box 
        background={colors.white} 
        flex="1"
        display="flex"
        alignItems="center"
        justifyContent="center"
        py={6}
    >
      <VStack {...containerProps} flex="1">
        <Heading as="h1" size="2xl" color={colors.primary_blue} textAlign="center">
          Welcome, {user?.fullname}
        </Heading>
        
        {programs.length > 0 ? (
          <>
            <Select.Root 
              collection={programCollection}
              size="md"
              width="100%"
              maxWidth="400px"
              value={selectedProgram ? [selectedProgram] : []}
              onValueChange={handleValueChange}
            >
              <Select.HiddenSelect />
              <Select.Control>
              <Select.Trigger>
                <Select.ValueText 
                    placeholder="Select program"
                    color={selectedProgram ? colors.black : undefined} // Add this line
                />
               </Select.Trigger>
                <Select.IndicatorGroup>
                  <Select.Indicator />
                </Select.IndicatorGroup>
              </Select.Control>
              <Portal>
                <Select.Positioner>
                  <Select.Content bg={colors.white}>
                    {programCollection.items.map((program) => (
                      <Select.Item 
                      item={program} 
                      key={program.value} 
                      color={colors.black}
                      _selected={{ color: colors.black, bg: colors.light_grey }}
                    >
                      {program.label}
                      <Select.ItemIndicator />
                    </Select.Item>
                    ))}
                  </Select.Content>
                </Select.Positioner>
              </Portal>
            </Select.Root>
          </>
        ) : (
          <Text fontSize="lg" textAlign="center">
            {user?.programid 
              ? "You have not created any programs yet." 
              : "No program coordinator account found."}
          </Text>
        )}
        
        {/* Continue to Dashboard Button - Always visible */}
        <Button 
          size="lg"
          onClick={handleContinue}
          loading={isSubmitting}
          disabled={!selectedProgram}
          bg={colors.black}
          color={colors.white}
          _hover={{ bg: colors.dark_grey }}
          borderRadius="md"
          px={3}
          py={2}
          width="100%"
          maxWidth="400px"
        >
          Continue to Dashboard
        </Button>
        
        <Text fontSize="lg" textAlign="center" color={colors.dark_grey}>
          or
        </Text>
        
        <Button 
          variant="outline" 
          size="md"
          onClick={() => router.push("/pc-create-program")}
          color={colors.black}
          _hover={{ bg: colors.light_grey }}
          width="100%"
          maxWidth="400px"
        >
          Create New Program
        </Button>
        
        <Box mt={8}>
          <Image 
            src="/images/program-selection.svg"
            alt="Program illustration"
            maxH="300px"
          />
        </Box>
      </VStack>
    </Box>
  );
};

export default PCSelectProgramBox;