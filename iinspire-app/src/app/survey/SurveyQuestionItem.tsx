'use client';
import { Box, Input, CheckboxGroup, Stack, Text } from '@chakra-ui/react';
import {
    NumberInputField,
    NumberInputLabel,
    NumberInputRoot,
} from "@/components/ui/number-input"
import { Radio, RadioGroup } from "@/components/ui/radio"
import { Checkbox } from "@/components/ui/checkbox"
import SurveyQuestionInterface from './SurveyQuestionInterface';

interface QuestionProps {
    question: SurveyQuestionInterface;
}

const SurveyQuestionItem: React.FC<QuestionProps> = ({ question }) => {
    const renderInput = () => {
        switch (question.question_type) {
            case 'text':
                return (
                    <Input placeholder="Your answer here" />
                );
            case 'number':
                return (
                    <NumberInputRoot min={0}>
                        <NumberInputLabel />
                        <NumberInputField />
                    </NumberInputRoot>
                );
            case 'radio':
                return (
                    <RadioGroup>
                        <Stack direction="column">
                            {question.options?.map(option => (
                                <Radio key={option} value={option}>
                                    {option}
                                </Radio>
                            ))}
                        </Stack>
                    </RadioGroup>
                );
            case 'checkbox':
                return (
                    <CheckboxGroup>
                        <Stack direction="column">
                            {question.options?.map(option => (
                                <Checkbox key={option} value={option}>
                                    {option}
                                </Checkbox>
                            ))}
                        </Stack>
                    </CheckboxGroup>
                );
            case 'D/A - 0-5':
                return (
                    <RadioGroup>
                        <Stack direction="column">
                            {question.options?.map(option => (
                                <Radio key={option} value={option}>
                                    {option}
                                </Radio>
                            ))}
                        </Stack>
                    </RadioGroup>
                );
                case 'N/A - 0-6':
                return (
                    <CheckboxGroup>
                        <Stack direction="column">
                            {question.options?.map(option => (
                                <Checkbox key={option} value={option}>
                                    {option}
                                </Checkbox>
                            ))}
                        </Stack>
                    </CheckboxGroup>
                );
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