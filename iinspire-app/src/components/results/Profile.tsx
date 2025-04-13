"use client";
import {useEffect, useRef, useState} from "react";
import Card from "./card";
import Legend from "./legend";
import ChartComponent from "@/components/results/graph";
import "../../../public/styles/profile.css";
import anychart from "anychart";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";

const Profile = () => {
    const chartType = "bubble";
    const [isClient, setIsClient] = useState(false);
    const[myData,setMyData]=useState<any>(null);
    const[userID,setUserID]=useState<string|null>(null);
    const[programID,setProgramID]=useState<string|null>(null);
    const[fullname,setFullname]=useState<string|null>(null);
    const [surveyDate, setSurveyDate] = useState<string | null>(null);
    const chartRef = useRef<HTMLDivElement>(null);
    const [chartInstance, setChartInstance] = useState<any>(null);
    const [cardText, setCardText] = useState({
        civicEngagement: "",
        stemInterests: "",
        stemSelfEfficacy: "",
        stemOutcomeExpectations: "",
        researchOutcomeExpectations: "",
        researchSelfEfficacy: "",
    });



    useEffect(() => {
        if (typeof window !== "undefined") {
            anychart.licenseKey("lsamp-iinspire-8c03f4be-8ef79ff2");
            setIsClient(true);

            const storedUser=localStorage.getItem('user');
            if(storedUser){
                const user=JSON.parse(storedUser);
                setUserID(user.id);
                setProgramID(user.programid);
                setFullname(user.fullname);

                console.log("userID:",user.id);
                console.log("programID:",user.programid);
            }
        }
    },[]);

    useEffect(() => {
        if (isClient && userID && programID) {
            fetch("http://localhost:5001/api/survey-results-user", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    userID: userID,
                    programID: programID,
                }),
            })
                .then((res) => res.json())
                .then((data) => {
                    if (data.Results && data.Results.length > 0) {
                        const sortedResults = data.Results.sort((a:any, b:any) =>
                            new Date(b.dataCreated).getTime() - new Date(a.dataCreated).getTime()
                        );
                        const result = sortedResults[0];

                        setSurveyDate(result.dataCreated);
                        setMyData({
                            groupAverages: {
                                group_1_average: result.civicEngagement,
                                group_2_average: result.stemInterest,
                                group_3_average: result.stemEfficacy,
                                group_4_average: result.stemOutcome,
                                group_5_average: result.researchOutcome,
                                group_6_average: result.researchEfficacy,
                            },
                        });
                    }
                })
                .catch((error) =>
                    console.error("Error fetching survey results:", error)
                );
        }
    }, [isClient, userID, programID]);


    useEffect(() => {
        if (isClient && myData) {
            const lastEntry = myData.groupAverages;

            console.log(lastEntry);
            console.log("civic engagement: ", lastEntry.civicEngagement);

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
    }, [isClient, myData]);

    const handleExportToPDF = async () => {
        const doc = new jsPDF("p", "pt", "a4");
        const marginLeft = 40;
        let y = 40;

        const possessiveName = fullname
            ? fullname.trim().endsWith("s")
                ? `${fullname}'`
                : `${fullname}'s`
            : "User's";

        doc.setFont("helvetica", "bold");
        doc.setFontSize(22);
        doc.text(`${possessiveName} Report`, marginLeft, y);
        y += 30;

        const surveyTimestamp = surveyDate
            ? new Date(surveyDate).toLocaleString("en-US", {
                dateStyle: "long",
                timeStyle: "short"
            })
            : "Unknown";
        doc.setFont("helvetica", "normal");
        doc.setFontSize(12);
        doc.text(`Survey Date: ${surveyTimestamp}`, marginLeft, y);
        y += 30;

        if (chartRef.current) {
            const canvas = await html2canvas(chartRef.current);
            const imgData = canvas.toDataURL("image/png");

            const chartWidth = 500;
            const chartHeight = (canvas.height * chartWidth) / canvas.width;

            doc.addImage(imgData, "PNG", marginLeft, y, chartWidth, chartHeight);
            y += chartHeight + 30;
        } else {
            console.warn("Chart ref not ready.");
        }


        doc.setFont("helvetica", "normal");
        doc.setFontSize(12);

        const cardSections = [
            { title: "Civic Engagement", color: "#bf5fff", text: cardText.civicEngagement },
            { title: "STEM Interests", color: "#4a86e8", text: cardText.stemInterests },
            { title: "STEM Self Efficacy", color: "#ff0000", text: cardText.stemSelfEfficacy },
            { title: "STEM Outcome Expectations", color: "#ff9900", text: cardText.stemOutcomeExpectations },
            { title: "Research Outcome Expectations", color: "#93c47d", text: cardText.researchOutcomeExpectations },
            { title: "Research Self Efficacy", color: "#fff16e", text: cardText.researchSelfEfficacy },
        ];

        for (const section of cardSections) {
            doc.setFillColor(section.color);
            doc.rect(marginLeft, y - 10, 10, 10, "F");

            doc.setTextColor(0, 0, 0);
            doc.text(section.title, marginLeft + 15, y);
            y += 15;

            const lines = doc.splitTextToSize(section.text, 500);
            doc.text(lines, marginLeft, y);
            y += lines.length * 15 + 10;

            if (y > 750) {
                doc.addPage();
                y = 40;
            }
        }

        doc.save("profile-report.pdf");
    };

    return (
        <div>
            <div className="profile-container">
                <h1 className="header-profile">My Profile</h1>
                <button onClick={handleExportToPDF} className="export-button">
                    Export to PDF
                </button>

                <div ref={chartRef} className="graph-container">
                    {isClient && (
                        <ChartComponent
                            dataSet={myData}
                            comparisonData={null}
                            chartType={chartType}
                            onChartReady={(chart) => setChartInstance(chart)}
                        />
                    )}
                </div>

                <Legend/>

                {isClient && (
                    <div className="card-container">
                        <Card id="Card1" title="Civic Engagement"
                              description="How important helping your community is to you."
                              moreInfo={cardText.civicEngagement} color="#bf5fff"/>
                        <Card id="Card2" title="STEM Interests" description="Your interest in STEM-related activities."
                              moreInfo={cardText.stemInterests} color="#4a86e8"/>
                        <Card id="Card3" title="STEM Self Efficacy" description="Your confidence in STEM-related tasks."
                              moreInfo={cardText.stemSelfEfficacy} color="#ff0000"/>
                        <Card id="Card4" title="STEM Outcome Expectations"
                              description="How participation in STEM benefits your future."
                              moreInfo={cardText.stemOutcomeExpectations} color="#ff9900"/>
                        <Card id="Card5" title="Research Outcome Expectations"
                              description="How research activities benefit your STEM major."
                              moreInfo={cardText.researchOutcomeExpectations} color="#93c47d"/>
                        <Card id="Card6" title="Research Self Efficacy"
                              description="Your confidence in research-related tasks."
                              moreInfo={cardText.researchSelfEfficacy} color="#fff16e"/>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Profile;
