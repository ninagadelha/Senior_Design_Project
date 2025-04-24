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
                                            } else if (option == "3") {
                                                label = "Neutral";
                                            }
                                            else {
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
                                            } else if (option == "2") {
                                                label = "Neutral";
                                            }
                                            else {
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
                value = typeof value === 'string' ? value : '0';
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
                                        min={0}
                                        max={9}
                                        thumbAlignment="contain"
                                        thumbSize={{ width: 16, height: 16 }}
                                        value={typeof value === 'string' ? value.split(',').map(Number) : [0]}
                                        onValueChange={(details) =>
                                            onAnswerChange(question.question_id, details.value.join(','))
                                        }
                                        step={1}
                                        marks={[0, 1, 2, 3, 4, 5, 6, 7, 8, 9]}
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
                                            } else if (option == "2") {
                                                label = "Neutral";
                                            }
                                            else {
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
                value = typeof value === 'string' ? value : '0';
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
                                        value={typeof value === 'string' ? value.split(',').map(Number) : [0]}
                                        onValueChange={(details) =>
                                            onAnswerChange(question.question_id, details.value.join(','))
                                        }
                                        step={10}
                                        marks={[0, 10, 20, 30, 40, 50, 60, 70, 80, 90]}
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
            case 'Y/N/':
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
                                        {question.options?.map((option) => {
                                            const label = option === "Y" ? "Yes" : option === "N" ? "No" : " ";
                                            return (
                                                <VStack key={option} gap={2} align="center">
                                                    <Radio
                                                        value={label}  // Store the full text in the value
                                                        onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                                                            onAnswerChange(question.question_id, e.target.value)
                                                        }
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