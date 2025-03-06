import { Box, CheckboxGroup, Fieldset, HStack, Stack, Text, VStack } from '@chakra-ui/react';
import { Radio, RadioGroup } from "@/components/ui/radio"
import { Checkbox } from "@/components/ui/checkbox"
import SurveyQuestionInterface from '../../app/student-survey/SurveyQuestionInterface';
import { useState } from 'react';
import { Slider } from "@/components/ui/slider"

interface QuestionProps {
    question: SurveyQuestionInterface;
}

const SurveyQuestionItem: React.FC<QuestionProps> = ({ question }) => {
    const [sliderValue, setSliderValue] = useState([40])
    const [groupZeroValue, setGroupZeroValue] = useState("0");
    const [groupOneValue, setGroupOneValue] = useState("0");
    const [groupTwoValue, setGroupTwoValue] = useState("0");
    const [groupThreeValue, setGroupThreeValue] = useState("0");
    const [groupFourValue, setGroupFourValue] = useState("0");

    const renderInput = () => {
        switch (question.question_type) {
            case 'D/A - 0-5': // Disagree - Agree
                return (
                    <>
                        <Box display={'flex'} alignItems={'start'} width="100%" maxWidth="100vw">

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
                                    value={groupZeroValue}
                                    onValueChange={(e) => setGroupZeroValue(e.value)}
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
                                                        value={option}
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
                        <Box display={'flex'} alignItems={'start'} width="100%" maxWidth="100vw">
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
                                    value={groupZeroValue}
                                    onValueChange={(e) => setGroupZeroValue(e.value)}
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
                                                        value={option}
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
                        <Box display={'flex'} alignItems={'start'} width="100%" maxWidth="100vw">
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
                                    value={groupZeroValue}
                                    onValueChange={(e) => setGroupZeroValue(e.value)}
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
                                                        value={option}
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
                        <Box display={'flex'} alignItems={'start'} width="100%" maxWidth="100vw">
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
                                    value={groupZeroValue}
                                    onValueChange={(e) => setGroupZeroValue(e.value)}
                                    size={'lg'}
                                    width="50%"
                                    marginRight={"10vh"}
                                    variant={'subtle'}
                                >
                                    <HStack width="100%" justify="space-between" align="start">
                                        {question.options?.map((option, index) => {
                                            let label;
                                            if (option == "0") {
                                                label = "No Confidence";
                                            } else if (option == "9") {
                                                label = "Complete Confidence";
                                            } else {
                                                label = " ";
                                            }
                                            return (
                                                <Box>
                                                    <VStack key={option} gap={2} align="center">
                                                        <Radio
                                                            value={option}
                                                            style={{ transform: 'scale(1.5)' }}
                                                        />
                                                    </VStack>
                                                    <Text fontSize="sm">{label}</Text>
                                                </Box>
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
            case 'SD/SA - 0-4': //Strongly Disagree - Strongly Agree
                return (
                    <>
                        <Box display={'flex'} alignItems={'start'} width="100%" maxWidth="100vw">
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
                                    value={groupZeroValue}
                                    onValueChange={(e) => setGroupZeroValue(e.value)}
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
                                                        value={option}
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
                return (
                    <>
                        <Box display={'flex'} alignItems={'start'} width="100%" maxWidth="100vw">
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

                                <HStack width="50%" justify="center" align="center" marginLeft={'2vw'}>
                                    <Slider
                                        width={'full'}
                                        value={sliderValue}
                                        thumbAlignment="contain"
                                        thumbSize={{ width: 16, height: 16 }}
                                        onValueChange={(e) => setSliderValue(e.value)}
                                        step={10}
                                        variant={'solid'}
                                        colorScheme={'grey'}
                                    />
                                    <Text>{sliderValue}</Text>
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
        <Box mb={4}>
            {renderInput()}
        </Box>
    );
};

export default SurveyQuestionItem;