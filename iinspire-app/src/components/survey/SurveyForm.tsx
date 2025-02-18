'use client';
import { Box, Heading, Highlight } from '@chakra-ui/react';
import SurveyQuestionItem from './SurveyQuestionItem';

type InputType = 'text' | 'number' | 'radio' | 'checkbox';

// Define the interface for a survey question
interface SurveyQuestion {
  id: string;
  question: string;
  inputType: InputType;
  options?: string[];
}

//example questions for now until we get the api from backend
const surveyQuestions: SurveyQuestion[] = [
  {
    id: 'q1',
    question: "What's your favorite color?",
    inputType: 'text'
  },
  {
    id: 'q2',
    question: "How many years of experience do you have?",
    inputType: 'number'
  },
  {
    id: 'q3',
    question: "Select your gender:",
    inputType: 'radio',
    options: ['Male', 'Female', 'Other']
  },
  {
    id: 'q4',
    question: "Which languages do you speak?",
    inputType: 'checkbox',
    options: ['English', 'Spanish', 'French', 'Other']
  }
];
const SurveyForm: React.FC = () => {

  return (
    <>
      <Heading size="3xl" >Survey Form</Heading>
      <Heading size="sm" >General Questions</Heading>
      <Box maxW="600px" mx="auto" mt={8}>
        {surveyQuestions.map(question => (
          <SurveyQuestionItem key={question.id} question={question} />
        ))}
      </Box>
    </>
  );
};

export default SurveyForm;