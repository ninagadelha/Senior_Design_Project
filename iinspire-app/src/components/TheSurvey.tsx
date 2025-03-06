
import Navbar from "@/components/util/navbar";
import Footer from "@/components/util/footer";
import { Box, Button, Flex, Heading } from '@chakra-ui/react';
import SurveyItem from '../components/util/SurveyItem';
import SurveyQuestionInterface from '../app/student-survey/SurveyQuestionInterface';
import { useEffect, useState } from 'react';
import ProgressBar from "@/components/util/ProgressBar";


const TheSurvey = () => {
    const [questions, setQuestions] = useState<SurveyQuestionInterface[]>([]);
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

    return (
        <>
            <Box maxW="100vw" mx="auto" mt={8} padding={'1vw'}>
                <ProgressBar current={currentGroupIndex + 1} total={groupNames.length} />
                <Heading size="3xl">Survey Form</Heading>

                {/* Display only the current group */}
                <Box mt={4}>
                    <Heading size="lg">Group {currentGroup}</Heading>
                    {currentQuestions.map((question) => (
                        <SurveyItem key={question.question_id} question={question} />
                    ))}
                </Box>

                {/* Navigation buttons */}
                <Flex justify="space-between" mt={6} mb={8}>
                    <Button
                        onClick={handlePrevious}
                        disabled={currentGroupIndex === 0}
                        colorScheme="gray"
                        variant={'outline'}
                    >
                        Previous
                    </Button>

                    <Button
                        onClick={handleNext}
                        colorScheme="blue"
                        variant={'solid'}
                        size={'lg'}
                        className="next-button"
                    >
                        {/* Also add some functionality here to save users answers */}
                        {currentGroupIndex === groupNames.length - 1 ? "Finish" : "Next"}
                    </Button>
                </Flex>
            </Box>
        </>
    );
};


export default TheSurvey;