import { Box, CheckboxGroup, Fieldset, Flex, HStack, Stack, Text, VStack } from '@chakra-ui/react';
import { Radio, RadioGroup } from "@/components/ui/radio"
import { Checkbox } from "@/components/ui/checkbox"
import SurveyQuestionInterface from '../../app/student-survey/SurveyQuestionInterface';
import { useState } from 'react';
import { Slider, ChakraSlider } from "@/components/ui/slider"

interface QuestionProps {
    question: SurveyQuestionInterface;
    onAnswerChange: (questionId: number, value: string | string[]) => void;
    value?: string | string[];
}

const SurveyQuestionItem: React.FC<QuestionProps> = ({ question, onAnswerChange, value }) => {
    const sliderOneMarks = [
        { value: 0, label: "0%" },
        { value: 1, label: "20%" },
        { value: 2, label: "40%" },
        { value: 3, label: "60%" },
        { value: 4, label: "80%" },
        { value: 5, label: "100%" },
    ]
    const sliderTwoMarks = [
        { value: 0, label: "0%" },
        { value: 3, label: "33%" },
        { value: 6, label: "66%" },
        { value: 9, label: "100%" }
    ]
    const sliderThreeMarks = [
        { value: 0, label: "0%" },
        { value: 25, label: "25%" },
        { value: 50, label: "50%" },
        { value: 75, label: "75%" },
        { value: 100, label: "100%" }
    ]
    const renderInput = () => {
        switch (question.question_type) {
            case 'D/A - 0-5': // Disagree - Agree

                value = typeof value === 'string' ? value : '0';
                const label = "";
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

                                <HStack width="50%" justifyContent="center" alignItems="center" marginLeft={'2vw'} suppressHydrationWarning>
                                    <VStack width="full" gap={2}>
                                        {/* <Slider ml={5}
                                            width={'full'}
                                            min={0}
                                            max={5}
                                            thumbAlignment="contain"
                                            thumbSize={{ width: 16, height: 16 }}
                                            value={typeof value === 'string' ? value.split(',').map(Number) : [0]}
                                            onValueChange={(details) =>
                                                onAnswerChange(question.question_id, details.value.join(','))
                                            }
                                            step={1}
                                            marks={groupOneMarks}
                                            variant={'solid'}
                                            colorScheme={'grey'}
                                            suppressHydrationWarning
                                        /> */}
                                        <HStack width="full" justify="space-between" align={"start"} >
                                            <Text fontSize="sm" whiteSpace="nowrap">Disagree</Text>
                                            <Text fontSize="sm" whiteSpace="nowrap">Agree</Text>
                                        </HStack>
                                        <Slider.Root
                                            ml={5}
                                            width="full"
                                            min={0}
                                            max={5}
                                            value={typeof value === 'string' ? value.split(',').map(Number) : [0]}
                                            onValueChange={(details) =>
                                                onAnswerChange(question.question_id, details.value.join(','))
                                            }
                                            variant="solid"
                                            colorScheme="grey"
                                            suppressHydrationWarning
                                        >
                                            <Slider.Control>
                                                <Slider.Track>
                                                    <Slider.Range />
                                                </Slider.Track>

                                                <Slider.Thumb index={0} boxSize={6}>
                                                    <Slider.DraggingIndicator
                                                        layerStyle="fill.solid"
                                                        top="6"
                                                        rounded="sm"
                                                        px="1.5"
                                                    >
                                                        <Slider.ValueText />
                                                    </Slider.DraggingIndicator>
                                                </Slider.Thumb>

                                                <Slider.Marks marks={sliderOneMarks} />
                                            </Slider.Control>
                                        </Slider.Root>
                                    </VStack>
                                </HStack>
                            </HStack>
                        </Box>
                        <br />
                        <hr />
                    </>
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
                                                label = "Indifferent";
                                            }
                                            else if (option == "3") {
                                                label = "Like";
                                            }
                                            else if (option == "1") {
                                                label = "Dislike";
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
            case 'NC/CC - 0-9': // No Confidence - Complete Confidence
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
                                    <VStack width="full" gap={2}>
                                        <HStack width="full" justify="space-between" align={"start"}>
                                            <Text fontSize="sm" whiteSpace="nowrap">No Confidence</Text>
                                            <Text fontSize="sm" whiteSpace="nowrap">Complete Confidence</Text>
                                        </HStack>
                                        <Slider.Root
                                            ml={5}
                                            width="full"
                                            min={0}
                                            max={9}
                                            value={typeof value === 'string' ? value.split(',').map(Number) : [0]}
                                            onValueChange={(details) =>
                                                onAnswerChange(question.question_id, details.value.join(','))
                                            }
                                            variant="solid"
                                            colorScheme="grey"
                                            suppressHydrationWarning
                                        >
                                            <Slider.Control>
                                                <Slider.Track>
                                                    <Slider.Range />
                                                </Slider.Track>

                                                <Slider.Thumb index={0} boxSize={6}>
                                                    <Slider.DraggingIndicator
                                                        layerStyle="fill.solid"
                                                        top="6"
                                                        rounded="sm"
                                                        px="1.5"
                                                    >
                                                        <Slider.ValueText />
                                                    </Slider.DraggingIndicator>
                                                </Slider.Thumb>

                                                <Slider.Marks marks={sliderTwoMarks} />
                                            </Slider.Control>
                                        </Slider.Root>
                                    </VStack>
                                </HStack>
                            </HStack>
                        </Box>
                        <br />
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
                                            } else if (option == "2") {
                                                label = "Undecided";
                                            }
                                            else if (option == "1") {
                                                label = "Disagree";
                                            }
                                            else if (option == "3") {
                                                label = "Agree";
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
                                    <VStack width="full" gap={2}>
                                        <HStack width="full" justify="space-between" align={"start"}>
                                            <Text fontSize="sm" whiteSpace="nowrap">No Confidence</Text>
                                            <Text fontSize="sm" whiteSpace="nowrap">Complete Confidence</Text>
                                        </HStack>
                                        <Slider.Root
                                            ml={5}
                                            width="full"
                                            min={0}
                                            max={100}
                                            step={10}
                                            value={typeof value === 'string' ? value.split(',').map(Number) : [0]}
                                            onValueChange={(details) =>
                                                onAnswerChange(question.question_id, details.value.join(','))
                                            }
                                            variant="solid"
                                            colorScheme="grey"
                                            suppressHydrationWarning
                                        >
                                            <Slider.Control>
                                                <Slider.Track>
                                                    <Slider.Range />
                                                </Slider.Track>

                                                <Slider.Thumb index={0} boxSize={6}>
                                                    <Slider.DraggingIndicator
                                                        layerStyle="fill.solid"
                                                        top="6"
                                                        rounded="sm"
                                                        px="1.5"
                                                    >
                                                        <Slider.ValueText />
                                                    </Slider.DraggingIndicator>
                                                </Slider.Thumb>

                                                <Slider.Marks marks={sliderThreeMarks} />
                                            </Slider.Control>
                                        </Slider.Root>
                                    </VStack>

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