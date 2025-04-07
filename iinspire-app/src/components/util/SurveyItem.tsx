import { Box, CheckboxGroup, Fieldset, Flex, HStack, Stack, Text, VStack } from '@chakra-ui/react';
import { Radio, RadioGroup } from "@/components/ui/radio"
import { Checkbox } from "@/components/ui/checkbox"
import SurveyQuestionInterface from '../../app/student-survey/SurveyQuestionInterface';
import { useState } from 'react';
import { Slider } from "@/components/ui/slider"

interface QuestionProps {
    question: SurveyQuestionInterface;
    onAnswerChange: (questionId: number, value: string | string[]) => void;
    value?: string | string[];
}

const SurveyQuestionItem: React.FC<QuestionProps> = ({ question, onAnswerChange, value }) => {

    const handleRadioChange = (details: { value: string }) => {
        onAnswerChange(question.question_id, details.value);
    };

    const handleSliderChange = (details: { value: number[] }) => {
        onAnswerChange(question.question_id, details.value.join(','));
    };

    const handleCheckboxChange = (values: string[]) => {
        onAnswerChange(question.question_id, values); // Now matches updated interface
    };
    const renderInput = () => {
        switch (question.question_type) {
            case 'D/A - 0-5': // Disagree - Agree
                return (
                    <>
                        <Box display={'flex'} alignItems={'start'} width="100%" maxWidth="100vw" suppressHydrationWarning>

                            <HStack
                                width="100%"
                                align="center"
                                justify="space-between"
                                marginTop="2vh"
                                px={4}
                            >

                                {/* Question text */}
                                <Box width="40%" maxWidth="400px" marginLeft={"10vh"}>
                                    <Text>{question.question_text}</Text>
                                </Box>
                                {/* Radio buttons */}
                                <RadioGroup
                                    value={value?.toString() || ''}
                                    onValueChange={(details) => {
                                        if (details.value) {  // Add null check
                                          onAnswerChange(question.question_id, details.value);
                                        }
                                      }}
                                    size={'lg'}
                                    width="50%"
                                    marginRight={"10vh"}
                                    variant={'subtle'}
                                >

                                    <HStack width="100%" justify="space-between" align="start">
                                        {question.options?.map((option, index) => {
                                            let label;
                                            if (option == "0") {
                                                label = "Disagree";
                                            } else if (option == "5") {
                                                label = "Agree";
                                            } else {
                                                label = " ";
                                            }
                                            return (
                                                <VStack key={option} gap={2} align="center">
                                                    <Radio
                                                        value={option.toString()}
                                                        style={{ transform: 'scale(1.5)' }}
                                                    />
                                                    <Text fontSize="sm">{label}</Text>
                                                </VStack>
                                            );
                                        })}
                                    </HStack>
                                </RadioGroup>
                            </HStack>
                        </Box>
                        <br />
                        <hr />
                    </ >
                );

            case 'N/A - 0-6': //Never - Always
                return (
                    <>
                        <Box display={'flex'} alignItems={'start'} width="100%" maxWidth="100vw" suppressHydrationWarning>
                            <HStack
                                width="100%"
                                align="center"
                                justify="space-between"
                                marginTop="2vh"
                                px={4}
                            >
                                {/* Question text */}
                                <Box width="40%" maxWidth="400px" marginLeft={"10vh"}>
                                    <Text>{question.question_text}</Text>
                                </Box>

                                {/* Radio buttons */}
                                <RadioGroup
                                    value={value?.toString() || ''}
                                    onValueChange={(details) => {
                                        if (details.value) {
                                          onAnswerChange(question.question_id, details.value);
                                        }
                                      }}
                                    size={'lg'}
                                    width="50%"
                                    marginRight={"10vh"}
                                    variant={'subtle'}
                                >
                                    <HStack width="100%" justify="space-between" align="start">
                                        {question.options?.map((option, index) => {
                                            let label;
                                            if (option == "0") {
                                                label = "Never";
                                            } else if (option == "6") {
                                                label = "Always";
                                            } else {
                                                label = " ";
                                            }
                                            return (
                                                <VStack key={option} gap={2} align="center">
                                                    <Radio
                                                        value={option.toString()}
                                                        style={{ transform: 'scale(1.5)' }}
                                                    />
                                                    <Text fontSize="sm">{label}</Text>
                                                </VStack>
                                            );
                                        })}
                                    </HStack>
                                </RadioGroup>
                            </HStack>
                        </Box>
                        <br />
                        <hr />
                    </ >
                );
            case 'SD/SL - 0-4': //Strongly Dislike - Strongly Like
                return (
                    <>
                        <Box display={'flex'} alignItems={'start'} width="100%" maxWidth="100vw" suppressHydrationWarning>
                            <HStack
                                width="100%"
                                align="center"
                                justify="space-between"
                                marginTop="2vh"
                                px={4}
                            >
                                {/* Question text */}
                                <Box width="40%" maxWidth="400px" marginLeft={"10vh"}>
                                    <Text>{question.question_text}</Text>
                                </Box>

                                {/* Radio buttons */}
                                <RadioGroup
                                    value={value?.toString() || ''}
                                    onValueChange={(details) => {
                                        if (details.value) {  // Add null check
                                          onAnswerChange(question.question_id, details.value);
                                        }
                                      }}
                                    size={'lg'}
                                    width="50%"
                                    marginRight={"10vh"}
                                    variant={'subtle'}
                                >
                                    <HStack width="100%" justify="space-between" align="start">
                                        {question.options?.map((option, index) => {
                                            let label;
                                            if (option == "0") {
                                                label = "Strongly Dislike";
                                            } else if (option == "4") {
                                                label = "Strongly Like";
                                            } else {
                                                label = " ";
                                            }
                                            return (
                                                <VStack key={option} gap={2} align="center">
                                                    <Radio
                                                        value={option.toString()}
                                                        style={{ transform: 'scale(1.5)' }}
                                                    />
                                                    <Text fontSize="sm">{label}</Text>
                                                </VStack>
                                            );
                                        })}
                                    </HStack>
                                </RadioGroup>
                            </HStack>
                        </Box>
                        <br />
                        <hr />
                    </ >
                );
            case 'NC/CC - 0-9': //No confidence - Complete confidence
                return (
                    <>
                        <Box width="100%" p={4}>
                            <Flex align="center" justify="space-between" gap={8} position="relative" zIndex={1} suppressHydrationWarning>
                                {/* Question text - Add minWidth to prevent squishing */}
                                <Box flex="1" minWidth="300px" maxWidth="400px" pr={8}>
                                    <Text fontSize="md" fontWeight="medium">
                                        {question.question_text}
                                    </Text>
                                </Box>

                                <RadioGroup
                                    value={value?.toString() || ''}
                                    onValueChange={(details) => {
                                        if (details.value) {  // Add null check
                                          onAnswerChange(question.question_id, details.value);
                                        }
                                      }}
                                    flex="2"
                                    variant={"subtle"}
                                >
                                    <Flex justify="space-between" width="100%" gap={4} position="relative">
                                    {question.options?.map((option) => {
                                            let label;
                                            if (option == "0") {
                                                label = "No Confidence";
                                            } else if (option == "9") {
                                                label = "Complete Confidence";
                                            } else {
                                                label = " ";
                                            }
                                            return (
                                                <Box key={option} textAlign="center" flex="1">
                                                    <VStack gap={4}>
                                                        <Radio
                                                            value={option.toString()}
                                                            transform="scale(2)"  // Scale individual radios
                                                            _hover={{ transform: 'scale(2.25)' }}
                                                            transition="transform 0.2s"
                                                            px={2}  // Add horizontal padding
                                                            py={1}  // Add vertical padding
                                                            whiteSpace="nowrap"
                                                        />
                                                        <Text
                                                            fontSize="sm"
                                                            bg="white"
                                                        >
                                                            {label}
                                                        </Text>
                                                    </VStack>
                                                </Box>
                                            );
                                        })}
                                    </Flex>
                                </RadioGroup>
                            </Flex>
                        </Box>
                        <hr />
                    </>
                );
            case 'SD/SA - 0-4': //Strongly Disagree - Strongly Agree
                return (
                    <>
                        <Box display={'flex'} alignItems={'start'} width="100%" maxWidth="100vw" suppressHydrationWarning>
                            <HStack
                                width="100%"
                                align="center"
                                justify="space-between"
                                marginTop="2vh"
                                px={4}
                            >
                                {/* Question text */}
                                <Box width="40%" maxWidth="400px" marginLeft={"10vh"}>
                                    <Text>{question.question_text}</Text>
                                </Box>

                                {/* Radio buttons */}
                                <RadioGroup
                                    value={value?.toString() || ''}
                                    onValueChange={(details) => {
                                        if (details.value) {  // Add null check
                                          onAnswerChange(question.question_id, details.value);
                                        }
                                      }}
                                    size={'lg'}
                                    width="50%"
                                    marginRight={"10vh"}
                                    variant={'subtle'}
                                >
                                    <HStack width="100%" justify="space-between" align="start">
                                        {question.options?.map((option, index) => {
                                            let label;
                                            if (option == "0") {
                                                label = "Strongly Disagree";
                                            } else if (option == "4") {
                                                label = "Strongly Agree";
                                            } else {
                                                label = " ";
                                            }
                                            return (
                                                <VStack key={option} gap={2} align="center">
                                                    <Radio
                                                        value={option.toString()}
                                                        style={{ transform: 'scale(1.5)' }}
                                                    />
                                                    <Text fontSize="sm">{label}</Text>
                                                </VStack>
                                            );
                                        })}
                                    </HStack>
                                </RadioGroup>
                            </HStack>
                        </Box>
                        <br />
                        <hr />
                    </ >
                );
            case '% / 0-100': //Percentage
            //const sliderValue = 50;
            value = typeof value === 'string' ? value : '50';
                return (
                    <>
                        <Box display={'flex'} alignItems={'start'} width="100%" maxWidth="100vw" suppressHydrationWarning>
                            <HStack
                                width="100%"
                                align="center"
                                justify="space-between"
                                marginTop="2vh"
                                px={4}
                                suppressHydrationWarning
                            >
                                {/* Question text */}
                                <Box width="40%" maxWidth="400px" marginLeft={"10vh"} suppressHydrationWarning>
                                    <Text>{question.question_text}</Text>
                                </Box>

                                <HStack width="50%" justify="center" align="center" marginLeft={'2vw'} suppressHydrationWarning>
                                    <Slider
                                        width={'full'}
                                        thumbAlignment="contain"
                                        thumbSize={{ width: 16, height: 16 }}
                                        value={typeof value === 'string' ? value.split(',').map(Number) : [50]}
                                        onValueChange={(details) =>
                                            onAnswerChange(question.question_id, details.value.join(','))
                                        }
                                        step={10}
                                        variant={'solid'}
                                        colorScheme={'grey'}
                                        suppressHydrationWarning
                                    />
                                    <Text suppressHydrationWarning>{value}</Text>
                                </HStack>
                            </HStack>
                        </Box>
                        <br />
                        <hr />
                    </>
                )
            default:
                return null;
        }
    };

    return (
        <Box mb={4} suppressHydrationWarning>
            {renderInput()}
        </Box>
    );
};

export default SurveyQuestionItem;