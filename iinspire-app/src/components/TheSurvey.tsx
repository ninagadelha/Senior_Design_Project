
import Navbar from "@/components/util/navbar";
import Footer from "@/components/util/footer";
import { Box, Button, Flex, Heading } from '@chakra-ui/react';
import SurveyItem from '../components/util/SurveyItem';
import SurveyQuestionInterface from '../app/student-survey/SurveyQuestionInterface';
import { useEffect, useRef, useState } from 'react';
import ProgressBar from "@/components/util/ProgressBar";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/auth-context";
interface SurveyAnswer {
    [key: string]: string | string[]; // Question ID as key
}

const TheSurvey = () => {
    const [answers, setAnswers] = useState<SurveyAnswer>({});
    const [questions, setQuestions] = useState<SurveyQuestionInterface[]>([]);
    const {user} = useAuth();
    const router = useRouter();

    const GROUP_MESSAGES: { [key: string]: string } = {
        '0': 'Please indicate your level of agreement with the following statements:',
        '1': 'How frequently do you experience these situations?',
        '2': 'Rate your confidence in these areas:',
        '3': 'Select your preferences regarding campus resources:',
        '4': 'How would you describe your typical responses to these scenarios?',
        '5': 'Please indicate your level of agreement with the following statements:',
        '6': 'Select your level of confidence for each research skill.'
        // Add more groups as needed
    };

    let headers = new Headers();

    headers.append('Content-Type', 'application/json');
    headers.append('Accept', 'application/json');

    useEffect(() => {
        async function fetchQuestions() {
            try {
                const res = await fetch('http://localhost:3000/api/questions', {
                    method: 'GET',
                    headers: headers
                });
                if (!res.ok) {
                    throw new Error(`HTTP error! Status: ${res.status}`);
                }
                const data = await res.json();
                console.log(data);
                setQuestions(data);
                for (let i = 0; i < questions.length; i++) {

                }
            } catch (error) {
                console.error('Failed to fetch questions:', error);
            }
        }
        fetchQuestions();
    }, []);

    const handleAnswerChange = (questionId: number, value: string | string[]) => {
        setAnswers(prev => ({
            ...prev,
            [questionId]: value
        }));
    };

    const groupedQuestions = questions.reduce((groups, question) => {
        const groupKey = question.question_group || 'General';
        if (!groups[groupKey]) {
            groups[groupKey] = [];
        }
        groups[groupKey].push(question);
        return groups;
    }, {} as Record<string, SurveyQuestionInterface[]>);

    // Track the current group index
    const [currentGroupIndex, setCurrentGroupIndex] = useState(0);

    // Get array of group names (assuming groupedQuestions is already defined)
    const groupNames = Object.keys(groupedQuestions);

    // Current group being displayed
    const currentGroup = groupNames[currentGroupIndex];
    const currentQuestions = groupedQuestions[currentGroup] || [];

    // Navigation handlers
    const handleNext = () => {
        if (currentGroupIndex < groupNames.length - 1) {
            setCurrentGroupIndex(currentGroupIndex + 1);
        }
    };

    const handlePrevious = () => {
        if (currentGroupIndex > 0) {
            setCurrentGroupIndex(currentGroupIndex - 1);
        }
    };

    const handleConfirmSubmission = () => {
        const programId = user?.programid;
        const userId = user?.id;
        const payload = { userId, programId, answers };
        if (Object.keys(answers).length < questions.length) {
            alert('Please answer all questions.');
        }
        else if (Object.keys(answers).length == questions.length) {
            console.log("User ID:", userId);
            console.log("Program ID:", programId);
            console.log('Submitting:', answers);
            router.push('view-results');
            alert('Form submitted successfully!');

            fetch('http://localhost:3000/api/survey-results', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(payload),
            })
            .then((res) => {
                if (!res.ok) throw new Error('Network response was not ok');
                return res.json();
            })
            .then((data) => {
                console.log('Success:', data);
                router.push('view-results');
            })
            .catch((error) => {
                console.error('Error submitting survey:', error);
            });
        }
    };

    const SubmitButton = () => {

        return (
            <Button
                onClick={handleConfirmSubmission}
                colorScheme="blue"
                variant={'solid'}
                size={'lg'}
                className="next-button"
            >
                Submit
            </Button>
        );
    }

    return (
        <>
            <Box maxW="100vw" mx="auto" mt={8} padding={'1vw'} suppressHydrationWarning>
                <ProgressBar current={currentGroupIndex + 1} total={groupNames.length} />
                <Heading size="3xl">Survey Form</Heading>

                {/* Display only the current group */}
                <Box mt={4} suppressHydrationWarning>
                    <Heading size="lg" mb={4}>
                        {GROUP_MESSAGES[currentGroup]}
                    </Heading>
                    {currentQuestions.map((question) => (
                        <SurveyItem
                            key={question.question_id}
                            question={question}
                            onAnswerChange={handleAnswerChange}
                            value={answers[question.question_id]}
                        />
                    ))}
                </Box>

                {/* Navigation buttons */}
                <Flex justify="space-between" mt={6} mb={8} suppressHydrationWarning>
                    <Button
                        onClick={handlePrevious}
                        disabled={currentGroupIndex === 0}
                        colorScheme="gray"
                        variant="outline"
                    >
                        Previous
                    </Button>

                    {currentGroupIndex === groupNames.length - 1 ? (
                        <Button
                            onClick={handleConfirmSubmission}
                            colorScheme="blue"
                            variant="solid"
                            size="lg"
                            className="next-button"
                        >
                            Submit
                        </Button>
                    ) : (
                        <Button
                            onClick={handleNext}
                            colorScheme="blue"
                            variant="solid"
                            size="lg"
                            className="next-button"
                        >
                            Next
                        </Button>
                    )}
                </Flex>
            </Box>
        </>
    );
};


export default TheSurvey;