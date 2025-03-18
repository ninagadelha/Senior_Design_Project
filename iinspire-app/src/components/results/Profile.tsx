"use client";
import { useState, useEffect } from "react";
import Card from "./card";
import ChartComponent from "@/components/results/graph";
import "../../../public/styles/profile.css";

const Profile = () => {
    const [chartType, setChartType] = useState<"bubble" | "bar">("bubble");
    const [isClient, setIsClient] = useState(false);
    const [cardText, setCardText] = useState({
        civicEngagement: "",
        stemInterests: "",
        stemSelfEfficacy: "",
        stemOutcomeExpectations: "",
        researchOutcomeExpectations: "",
        researchSelfEfficacy: "",
    });

    useEffect(() => {
        setIsClient(true);
    }, []);

    const myData = [
        {
            groupAverages: {
                group_1_average: 6.5,
                group_2_average: 5.2,
                group_3_average: 4.8,
                group_4_average: 7.0,
                group_5_average: 6.0,
                group_6_average: 5.9,
            },
        },
    ];

    useEffect(() => {
        if (isClient && myData.length > 0) {
            const lastEntry = myData[myData.length - 1].groupAverages;

            setCardText({
                civicEngagement: `Your civic engagement scale circle is ${
                    lastEntry.group_1_average > 5.5
                        ? "larger, it is really important to you to use your career to better your community. You might be motivated by how your career will help others in your community."
                        : "smaller. You may not know how to get involved to help your community, but through programs like LSAMP you will learn how to get involved and better your community."
                }`,

                stemInterests: `Your STEM interest circle is ${
                    lastEntry.group_2_average > 5.5
                        ? "larger, you indicated you liked different tasks associated with STEM. Since your circle is larger, it sounds like your interest is already high in different STEM areas."
                        : "smaller, you indicated you dislike different tasks associated with STEM. Don't worry if your circle is smaller, there is plenty of time to grow your interest in college."
                }`,

                stemSelfEfficacy: `Your STEM self-efficacy circle is ${
                    lastEntry.group_3_average > 5.5
                        ? "larger, you feel very good about your ability to perform well on STEM-related tasks."
                        : "smaller, it is easy to grow this confidence by engaging in STEM-related tasks and opportunities."
                }`,

                stemOutcomeExpectations: `Your STEM outcome expectations circle is ${
                    lastEntry.group_4_average > 5.5
                        ? "larger, you probably believe that participation in STEM activities will help you in pursuing a STEM career."
                        : "smaller, you might not yet know how these STEM activities may benefit your future career. However, through experience in college, your circle will likely grow as you gain more understanding and confidence in STEM activities."
                }`,

                researchOutcomeExpectations: `Your research outcome expectations circle is ${
                    lastEntry.group_5_average > 5.5
                        ? "larger, you probably believe that participation in research-related tasks will help you in pursuing your STEM major."
                        : "smaller, you might not yet know how these research-related tasks may benefit your STEM major. However, by participating in research experiences such as labs or other activities, your circle will likely grow as you gain more understanding and confidence in research-related tasks."
                }`,

                researchSelfEfficacy: `Your research self-efficacy circle is ${
                    lastEntry.group_6_average > 5.5
                        ? "larger, you feel very good about your ability to perform well on research-related tasks."
                        : "smaller, it is easy to grow this confidence by engaging in research-related tasks and opportunities."
                }`,
            });
        }
    }, [isClient]);

    const toggleChartType = () => {
        setChartType((prev) => (prev === "bubble" ? "bar" : "bubble"));
    };

    return (
        <div>
            <div className="profile-container">
                <h1 className="header-profile">My Profile</h1>

                <div className="graph-container">
                    {isClient && <ChartComponent dataSet={myData[0]} comparisonData={null} chartType={chartType}/>}
                    <div className="button-container">
                        <button className="toggleChart" onClick={toggleChartType}>
                            {chartType === "bubble" ? "View as Bar Chart" : "View as Bubble Chart"}
                        </button>
                    </div>
                </div>

                {isClient && (
                    <div className="card-container">
                        <Card id="Card1" title="Civic Engagement"
                              description="How important helping your community is to you." moreInfo={cardText.civicEngagement} color="#bf5fff" />
                        <Card id="Card2" title="STEM Interests" description="Your interest in STEM-related activities." moreInfo={cardText.stemInterests} color="#4a86e8" />
                        <Card id="Card3" title="STEM Self Efficacy" description="Your confidence in STEM-related tasks." moreInfo={cardText.stemSelfEfficacy} color="#ff0000" />
                        <Card id="Card4" title="STEM Outcome Expectations" description="How participation in STEM benefits your future." moreInfo={cardText.stemOutcomeExpectations} color="#ff9900" />
                        <Card id="Card5" title="Research Outcome Expectations" description="How research activities benefit your STEM major." moreInfo={cardText.researchOutcomeExpectations} color="#93c47d" />
                        <Card id="Card6" title="Research Self Efficacy" description="Your confidence in research-related tasks." moreInfo={cardText.researchSelfEfficacy} color="#fff16e" />
                    </div>
                )}
            </div>
        </div>
    );
};

export default Profile;


