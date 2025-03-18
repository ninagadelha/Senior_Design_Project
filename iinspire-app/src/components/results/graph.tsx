"use client";
import dynamic from "next/dynamic";
import { useEffect, useRef, useState } from "react";

const AnyChart = dynamic(() => import("anychart"), { ssr: false });

interface GroupAverages {
    group_1_average: number;
    group_2_average: number;
    group_3_average: number;
    group_4_average: number;
    group_5_average: number;
    group_6_average: number;
}

interface DataSet {
    groupAverages: GroupAverages;
}

interface ChartComponentProps {
    dataSet: DataSet;
    comparisonData: DataSet | null;
    chartType: "bubble" | "bar";
}

const ChartComponent: React.FC<ChartComponentProps> = ({ dataSet, comparisonData, chartType }) => {
    const chartContainer = useRef<HTMLDivElement>(null);
    const [anychart, setAnyChart] = useState<any>(null);
    const [chartInstance, setChartInstance] = useState<any>(null);

    useEffect(() => {
        import("anychart").then((module) => {
            setAnyChart(module.default);
        });
    }, []);

    useEffect(() => {
        if (!anychart || !chartContainer.current) return;

        if (chartInstance) {
            chartInstance.dispose();
        }

        const chart = chartType === "bubble" ? anychart.cartesian() : anychart.column();
        if (chartType === "bubble") {
            drawBubbleChart(chart, dataSet, comparisonData, chartContainer.current);
        } else {
            drawBarChart(chart, dataSet, comparisonData, chartContainer.current);
        }

        setChartInstance(chart);
    }, [anychart, dataSet, comparisonData, chartType]);

    const drawBubbleChart = (chart: any, dataSet: DataSet, comparisonData: DataSet | null, container: HTMLDivElement) => {
        if (!dataSet) return;

        const categories = [
            "Civic Engagement",
            "STEM Interests",
            "STEM Self Efficacy",
            "STEM Outcome Expectations",
            "Research Outcome Expectations",
            "Research Self Efficacy",
        ];

        const data1 = categories.map((label, i) => ({
            x: label,
            y: Math.round(dataSet.groupAverages[`group_${i + 1}_average` as keyof GroupAverages] * 2) / 2,
            size: 10,
        }));

        const data2 = categories.map((label, i) => ({
            x: label,
            y: Math.round(dataSet.groupAverages[`group_${i + 1}_average` as keyof GroupAverages] * 2) / 2,
            size: dataSet.groupAverages[`group_${i + 1}_average` as keyof GroupAverages],
            color: ["#bf5fff", "#4a86e8", "#ff0000", "#ff9900", "#93c47d", "#fff16e"][i],
        }));

        container.innerHTML = "";

        chart.maxBubbleSize("10%");
        chart.minBubbleSize("5%");

        const series1 = chart.bubble(data1);
        series1.normal().fill(null);
        series1.normal().stroke("#808080", 1, "10 5", "round");

        chart.bubble(
            data2.map((point, i) => ({
                x: point.x,
                y: point.y,
                size: point.size,
                fill: point.color,
                stroke: null,
                hatchFill:
                    comparisonData &&
                    Math.round(dataSet.groupAverages[`group_${i + 1}_average` as keyof GroupAverages] * 2) / 2 ===
                    Math.round(comparisonData.groupAverages[`group_${i + 1}_average` as keyof GroupAverages] * 2) / 2
                        ? { color: "#808080", size: 4, thickness: 3 }
                        : null,
            }))
        );

        configureChart(chart, container);
    };

    const drawBarChart = (chart: any, dataSet: DataSet, comparisonData: DataSet | null, container: HTMLDivElement) => {
        if (!dataSet) return;

        const categories = [
            "Civic Engagement",
            "STEM Interests",
            "STEM Self Efficacy",
            "STEM Outcome Expectations",
            "Research Outcome Expectations",
            "Research Self Efficacy",
        ];

        const data2 = categories.map((label, i) => ({
            x: label,
            y: dataSet.groupAverages[`group_${i + 1}_average` as keyof GroupAverages],
            color: ["#bf5fff", "#4a86e8", "#ff0000", "#ff9900", "#93c47d", "#fff16e"][i],
        }));

        container.innerHTML = "";

        if (comparisonData) {
            const data1 = categories.map((label, i) => ({
                x: label,
                y: comparisonData.groupAverages[`group_${i + 1}_average` as keyof GroupAverages],
                color: "#808080",
            }));

            const series1 = chart.column(
                data1.map((point) => ({
                    x: point.x,
                    y: point.y,
                }))
            );
            series1.normal().fill(null);
            series1.normal().stroke("#808080");
            series1.fill("#808080");
        }

        const series2 = chart.column(
            data2.map((point) => ({
                x: point.x,
                y: point.y,
                fill: point.color,
                stroke: "#000000",
            }))
        );

        series2.fill("#4a86e8ff");

        configureChart(chart, container);
    };

    const configureChart = (chart: any, container: HTMLDivElement) => {
        chart.width("100%");
        chart.height("100%");
        chart.container(container);

        const xLabels = chart.xAxis().labels();
        xLabels.wordWrap("break-word");
        xLabels.wordBreak("break-all");
        xLabels.hAlign("center");
        xLabels.width(60);
        xLabels.fontSize(8);

        chart.interactivity().selectionMode("none");
        chart.interactivity().zoomOnMouseWheel(false);
        chart.tooltip(false);

        const scale = anychart.scales.linear();
        scale.minimum(0);
        scale.maximum(12);
        scale.ticks().set([0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10]);
        chart.yScale(scale);

        chart.draw();
    };

    return <div ref={chartContainer} style={{ width: "100%", height: "500px" }} />;
};

export default ChartComponent;

