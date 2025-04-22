"use client";
import dynamic from "next/dynamic";
import { useEffect, useRef, useState } from "react";
import useWindowSize from "../../../public/hooks/useWindowSize";
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
  chartType: "bubble";
  onChartReady?: (chart: any) => void;
}
const ChartComponent: React.FC<ChartComponentProps> = ({
  dataSet,
  comparisonData,
  chartType,
  onChartReady,
}) => {
  const { width } = useWindowSize();
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
    const chart = anychart.cartesian();
    drawBubbleChart(chart, dataSet, comparisonData, chartContainer.current);
    setChartInstance(chart);
    if (onChartReady) {
      onChartReady(chart);
    }
  }, [anychart, dataSet, comparisonData, chartType]);
  const drawBubbleChart = (
    chart: any,
    dataSet: DataSet,
    comparisonData: DataSet | null,
    container: HTMLDivElement
  ) => {
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
      y:
        Math.round(
          dataSet.groupAverages[
            `group_${i + 1}_average` as keyof GroupAverages
          ] * 2
        ) / 2,
      size: 10,
    }));
    const data2 = categories.map((label, i) => ({
      x: label,
      y:
        Math.round(
          dataSet.groupAverages[
            `group_${i + 1}_average` as keyof GroupAverages
          ] * 2
        ) / 2,
      size: dataSet.groupAverages[
        `group_${i + 1}_average` as keyof GroupAverages
      ],
      color: ["#bf5fff", "#4a86e8", "#ff0000", "#ff9900", "#93c47d", "#fff16e"][
        i
      ],
    }));
    container.innerHTML = "";
    chart.maxBubbleSize(width < 768 ? "6%" : "10%");
    chart.minBubbleSize(width < 768 ? "3%" : "5%");
    const series1 = chart.bubble(data1);
    series1.normal().fill(null);
    series1.normal().stroke("#808080", 1, "10 5", "round");
    if (comparisonData) {
      const comparisonOutlineSeries = chart.bubble(
        categories.map((label, i) => ({
          x: label,
          y:
            Math.round(
              comparisonData.groupAverages[
                `group_${i + 1}_average` as keyof GroupAverages
              ] * 2
            ) / 2,
          size: 10,
        }))
      );
      comparisonOutlineSeries.normal().fill(null);
      comparisonOutlineSeries.normal().stroke("#808080", 1, "5 3", "round");
      comparisonOutlineSeries.zIndex(1);
      const comparisonSeries = chart.bubble(
        categories.map((label, i) => ({
          x: label,
          y:
            Math.round(
              comparisonData.groupAverages[
                `group_${i + 1}_average` as keyof GroupAverages
              ] * 2
            ) / 2,
          size: comparisonData.groupAverages[
            `group_${i + 1}_average` as keyof GroupAverages
          ],
          fill: "#808080",
          stroke: null,
        }))
      );
      comparisonSeries.normal().fill("#808080", 0.8);
      comparisonSeries.hovered().fill("#808080", 0.6);
      comparisonSeries.zIndex(1);
    }
    const series2 = chart.bubble(
      data2.map((point, i) => ({
        x: point.x,
        y: point.y,
        size: point.size,
        fill: point.color,
        stroke: null,
        hatchFill:
          comparisonData &&
          Math.round(
            dataSet.groupAverages[
              `group_${i + 1}_average` as keyof GroupAverages
            ] * 2
          ) /
            2 ===
            Math.round(
              comparisonData.groupAverages[
                `group_${i + 1}_average` as keyof GroupAverages
              ] * 2
            ) /
              2
            ? { color: "#808080", size: 4, thickness: 3 }
            : null,
      }))
    );
    series2.tooltip().useHtml(true).format(`
                <div style="white-space: nowrap;">
                    <span>{%x}</span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                    <span><strong>Score: {%y}</strong></span>
                </div>
            `);
    configureChart(chart, container, width);
  };
  const configureChart = (
    chart: any,
    container: HTMLDivElement,
    width: number
  ) => {
    chart.width("100%");
    chart.height("100%");
    chart.container(container);
    const xLabels = chart.xAxis().labels();
    console.log("width: ", width);
    if (width < 768) {
      xLabels.enabled(false);
    } else {
      // For normal screens
      xLabels.enabled(true);
      xLabels.fontSize(12);
      xLabels.width(100);
      xLabels.rotation(0);
    }
    xLabels.wordWrap("normal");
    xLabels.wordBreak("normal");
    xLabels.hAlign("center");
    xLabels.width(100);
    chart.interactivity().selectionMode("none");
    chart.interactivity().zoomOnMouseWheel(false);
    const scale = anychart.scales.linear();
    scale.minimum(0);
    scale.maximum(12);
    scale.ticks().set([0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10]);
    chart.yScale(scale);
    chart.yAxis().title("Normalized Value (1-10 scale)");
    chart.credits().enabled(false);
    chart.draw();
  };
  const chartHeight = width < 768 ? 300 : 500;
  return (
    <div
      ref={chartContainer}
      style={{ width: "100%", height: `${chartHeight}px` }}
    />
  );
};
export default ChartComponent;

