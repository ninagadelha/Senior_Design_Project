import { Box, CheckboxGroup, Fieldset, HStack, Text } from '@chakra-ui/react';
import { Radio, RadioGroup } from "@/components/ui/radio"
import { Checkbox } from "@/components/ui/checkbox"
import SurveyQuestionInterface from '../../app/student-survey/SurveyQuestionInterface';

interface QuestionProps {
    question: SurveyQuestionInterface;
}

const SurveyQuestionItem: React.FC<QuestionProps> = ({ question }) => {
    const renderInput = () => {
        switch (question.question_type) {
            case 'D/A - 0-5':
                return (
                    <Fieldset.Root>
                        <CheckboxGroup defaultValue={["0"]} name="checkbox">
                            <Fieldset.Legend fontSize="sm" mb="2">
                                0 is low, 5 is high
                            </Fieldset.Legend>
                            <Fieldset.Content>
                                <HStack direction="column">
                                    {question.options?.map(option => (
                                        <Checkbox key={option} value={option} variant="subtle" colorPalette={"gray"}>
                                            {option}
                                        </Checkbox>
                                    ))}
                                </HStack>
                            </Fieldset.Content>
                        </CheckboxGroup>
                    </Fieldset.Root>
                );
            case 'N/A - 0-6':
                return (
                    <Fieldset.Root>
                        <CheckboxGroup defaultValue={["0"]} name="checkbox">
                            <Fieldset.Legend fontSize="sm" mb="2">
                                0 is low, 6 is high
                            </Fieldset.Legend>
                            <Fieldset.Content>
                                <HStack direction="column">
                                    {question.options?.map(option => (
                                        <Checkbox key={option} value={option} variant="subtle" colorPalette={"gray"}>
                                            {option}
                                        </Checkbox>
                                    ))}
                                </HStack>
                            </Fieldset.Content>
                        </CheckboxGroup>
                    </Fieldset.Root>
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