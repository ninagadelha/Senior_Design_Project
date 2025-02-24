'use client';
import Navbar from "@/components/util/navbar";
import Footer from "@/components/util/footer";
import { Box, Heading } from '@chakra-ui/react';
import SurveyItem from '../../components/util/SurveyItem';
import SurveyQuestionInterface from './SurveyQuestionInterface';
import { useEffect, useState } from 'react';
import ProgressBar from "@/components/util/ProgressBar";

const StudentSurvey = () => {
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

    return (
        <>
            <Navbar />
            <Box maxW="600px" mx="auto" mt={8}>
                <ProgressBar />
                <Heading size="3xl">Survey Form</Heading>
                {Object.entries(groupedQuestions).map(([group, groupQuestions]) => (
                    <Box key={group} mt={4}>
                        <Heading size="lg">Group {group}</Heading>
                        {groupQuestions.map((question) => (
                            <SurveyItem key={question.question_id} question={question} />
                        ))}
                    </Box>
                ))}
            </Box>
            <Footer />
        </>
    );
};


export default StudentSurvey;