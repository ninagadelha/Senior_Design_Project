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
                    <RadioGroup
                        value={groupZeroValue}
                        onValueChange={(e) => setGroupZeroValue(e.value)}
                        size={'lg'}
                        variant={'subtle'}
                        marginTop={"2vh"}
                    >
                        <HStack gap={8} justify="space-between" width="100%" align={"start"}>
                            {question.options?.map(option => {
                                // Determine the display label based on option value
                                let label;
                                if (option == "0") {
                                    label = "Disagree";
                                } else if (option == "5") {
                                    label = "Agree";
                                } else {
                                    label = " "; // Use a space for other options
                                }

                                return (
                                    <VStack key={option} gap={2} align="center">
                                        <Radio value={option} colorPalette={"gray"} />
                                        <Text fontSize="sm">{label}</Text>
                                    </VStack>
                                );
                            })}
                        </HStack>
                    </RadioGroup>
                );
            case 'N/A - 0-6': //Never - Always
                return (
                    <RadioGroup
                        value={groupOneValue}
                        onValueChange={(e) => setGroupOneValue(e.value)}
                        size={'lg'}
                        variant={'subtle'}
                        marginTop={"2vh"}
                    >
                        <HStack gap={8} justify="space-between" width="100%" align={"start"}>
                            {question.options?.map(option => {
                                // Determine the display label based on option value
                                let label;
                                if (option == "0") {
                                    label = "Never";
                                } else if (option == "6") {
                                    label = "Always";
                                } else {
                                    label = " "; // Use a space for other options
                                }

                                return (
                                    <VStack key={option} gap={2} align="center">
                                        <Radio value={option} colorPalette={"gray"} />
                                        <Text fontSize="sm">{label}</Text>
                                    </VStack>
                                );
                            })}
                        </HStack>
                    </RadioGroup>
                );
            case 'SD/SL - 0-4': //Strongly Dislike - Strongly Like
                return (
                    <RadioGroup
                        value={groupTwoValue}
                        onValueChange={(e) => setGroupTwoValue(e.value)}
                        size={'lg'}
                        variant={'subtle'}
                        marginTop={"2vh"}
                    >
                        <HStack gap={8} justify="space-between" width="100%" align={"start"}>
                            {question.options?.map(option => {
                                // Determine the display label based on option value
                                let label;
                                if (option == "0") {
                                    label = "Strongly Dislike";
                                } else if (option == "4") {
                                    label = "Strongly Like";
                                } else {
                                    label = " "; // Use a space for other options
                                }

                                return (
                                    <VStack key={option} gap={2} align="center">
                                        <Radio value={option} colorPalette={"gray"} />
                                        <Text fontSize="sm">{label}</Text>
                                    </VStack>
                                );
                            })}
                        </HStack>
                    </RadioGroup>
                );
            case 'NC/CC - 0-9': //No confidence - Complete confidence
                return (
                    <RadioGroup
                        value={groupThreeValue}
                        onValueChange={(e) => setGroupThreeValue(e.value)}
                        size={'lg'}
                        variant={'subtle'}
                        marginTop={"2vh"}
                    >
                        <HStack gap={8} justify="space-between" width="100%" align={"start"}>
                            {question.options?.map(option => {
                                // Determine the display label based on option value
                                let label;
                                if (option == "0") {
                                    label = "No Confidence";
                                } else if (option == "9") {
                                    label = "Complete Confidence";
                                } else {
                                    label = " "; // Use a space for other options
                                }

                                return (
                                    <VStack key={option} gap={2} align="center">
                                        <Radio value={option} colorPalette={"gray"} />
                                        <Text fontSize="sm">{label}</Text>
                                    </VStack>
                                );
                            })}
                        </HStack>
                    </RadioGroup>
                );
            case 'SD/SA - 0-4': //Strongly Disagree - Strongly Agree
                return (
                    <RadioGroup
                        value={groupFourValue}
                        onValueChange={(e) => setGroupFourValue(e.value)}
                        size={'lg'}
                        variant={'subtle'}
                        marginTop={"2vh"}
                    >
                        <HStack gap={8} justify="space-between" width="100%" align={"start"}>
                            {question.options?.map(option => {
                                // Determine the display label based on option value
                                let label;
                                if (option == "0") {
                                    label = "Strongly Disagree";
                                } else if (option == "4") {
                                    label = "Strongly Agree";
                                } else {
                                    label = " "; // Use a space for other options
                                }

                                return (
                                    <VStack key={option} gap={2} align="center">
                                        <Radio value={option} colorPalette={"gray"} />
                                        <Text fontSize="sm">{label}</Text>
                                    </VStack>
                                );
                            })}
                        </HStack>
                    </RadioGroup>
                );
            case '% / 0-100': //Percentage
                return (
                    <>
                        <Slider
                            maxW="1/3vw"
                            value={sliderValue}
                            onValueChange={(e) => setSliderValue(e.value)}
                            step={10}
                            variant={'solid'}
                            colorScheme={'grey'}
                        />
                        <Text>{sliderValue}</Text>
                    </>
                )
            default:
                return null;
        }
    };

    return (
        <Box mb={4}>
            <Text mb={2}>{question.question_text}</Text>
            {renderInput()}
        </Box>
    );
};

export default SurveyQuestionItem;