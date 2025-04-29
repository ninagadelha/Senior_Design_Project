
import Navbar from "@/components/util/navbar";
import Footer from "@/components/util/footer";
import { Box, Button, Flex, Heading } from '@chakra-ui/react';
import SurveyItem from '../components/util/SurveyItem';
import SurveyQuestionInterface from '../app/student-survey/SurveyQuestionInterface';
import { useEffect, useRef, useState } from 'react';
import ProgressBar from "@/components/util/ProgressBar";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/auth-context";
import { API_ENDPOINTS } from "@/constants/config";
interface SurveyAnswer {
    [key: string]: string | string[]; // Question ID as key
}

const TheSurvey = () => {
    const [answers, setAnswers] = useState<SurveyAnswer>({});
    const [questions, setQuestions] = useState<SurveyQuestionInterface[]>([]);
    const { user } = useAuth();
    const router = useRouter();

    const GROUP_MESSAGES: { [key: string]: string } = {
        '0': 'Please indicate the level to which you agree or disagree with each statement',
        '1': 'Please indicate the level to which you have participated on a scale from never to always',
        '2': 'Now, please indicate your degree of interest in doing each of the following activities, Use the scale below to show how interested you are in each activity.',
        '3': 'For each task listed below, please indicate how confident you are that you could successfully complete it - assuming you were motivated to make your best effort',
        '4': 'Using the scale below, please indicate the extent to which you agree or disagree with each of the following statements.',
        '5': 'Please indicate the level to which you agree or disagree with each statement ',
        '6': 'Please indicate your degree of confidence you have in your ability to successfully perform each behavior. Your strength will be rated on a 100-point scale ranging from 0 (no confidence) to 100 (complete confidence) for each of the following items.',
        '7': 'Please choose an option'
    };
    const GROUP_KEYS: { [key: string]: string } = {
        '0': 'civicEngagement',
        '1': 'civicParticipation',
        '2': 'stemInterest',
        '3': 'stemEfficacy',
        '4': 'stemOutcome',
        '5': 'researchOutcome',
        '6': 'researchEfficacy',
        '7': 'taken_survey'
    };


    let headers = new Headers();

    headers.append('Content-Type', 'application/json');
    headers.append('Accept', 'application/json');

    useEffect(() => {
        async function fetchQuestions() {
            try {
                const res = await fetch(API_ENDPOINTS.fetchQuestions, {
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

    const formatAnswersByGroupKey = (): Record<string, (string | number)[]> => {
        const grouped: Record<string, (string | number)[]> = {};

        questions.forEach((question) => {
            const group = question.question_group?.toString() || 'General';
            const groupKey = GROUP_KEYS[group];

            if (!groupKey) return;

            const answer = answers[question.question_id];
            if (answer !== undefined) {
                if (!grouped[groupKey]) grouped[groupKey] = [];

                // If the answer is a string and can be parsed as a number, parse it
                if (typeof answer === 'string' && !isNaN(Number(answer))) {
                    grouped[groupKey].push(Number(answer));
                } else if (Array.isArray(answer)) {
                    // Convert array of strings to numbers if possible
                    grouped[groupKey].push(
                        ...answer.map(a => isNaN(Number(a)) ? a : Number(a))
                    );
                } else {
                    grouped[groupKey].push(answer);
                }
            }
        });

        return grouped;
    };



    const handleConfirmSubmission = () => {
        const programID = user?.programid;
        const userID = user?.id;
        const formattedAnswers = formatAnswersByGroupKey();
        const payload = { userID, programID, ...formattedAnswers };
        if (Object.keys(answers).length < questions.length) {
            alert('Please answer all questions.');
            console.log("answer length" + Object.keys(answers).length)
            console.log("question length" + questions.length)
        }
        if (Object.keys(answers).length == questions.length) {
            console.log("User ID:", userID);
            console.log("Program ID:", programID);
            console.log('Submitting:', answers);
            router.push('view-results');
            alert('Form submitted successfully!');


            fetch(API_ENDPOINTS.saveResponses, {
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
                    alert('Form submitted successfully!');
                    router.push('view-results');
                })
                .catch((error) => {
                    console.error('Error submitting survey:', error);
                });
            console.log(JSON.stringify(payload));
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
        <Box bg="white" color="black">
            <Box maxW="100vw" mx="auto" mt={8} padding={'1vw'} bg="white" color="black" suppressHydrationWarning>
                <ProgressBar current={currentGroupIndex + 1} total={groupNames.length} />
                <Heading bg="white" color="black" size="3xl">Survey: {user?.programid}</Heading>

                {/* Display only the current group */}
                <Box mt={4} bg="white" color="black" suppressHydrationWarning>
                    <Heading bg="white" color="black" size="lg" mb={4}>
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
        </Box>
    );
};


export default TheSurvey;