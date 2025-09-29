import React from "react";
import { render, screen } from "@testing-library/react";
import Results from "../routes/profile";
import "@testing-library/jest-dom";

jest.mock("../routes/navbar", () => ({
  __esModule: true,
  default: jest.fn(),
}));

// Mock jspdf
jest.mock("jspdf", () => ({
  __esModule: true,
  default: jest.fn(),
}));

//anychart mock
jest.mock("anychart", () => {
  const mockChart = {
    maxBubbleSize: jest.fn(),
    minBubbleSize: jest.fn(),
    bubble: jest.fn(() => ({
      normal: jest.fn(),
    })),
    xAxis: jest.fn(() => ({
      title: jest.fn(),
      labels: jest.fn(() => ({
        wordWrap: jest.fn(),
        wordBreak: jest.fn(),
        hAlign: jest.fn(),
        width: jest.fn(),
        fontSize: jest.fn(),
      })),
    })),
    interactivity: jest.fn(() => ({
      selectionMode: jest.fn(),
      zoomOnMouseWheel: jest.fn(),
    })),
    tooltip: jest.fn(),
    width: jest.fn(),
    height: jest.fn(),
    container: jest.fn(),
    draw: jest.fn(),
    dispose: jest.fn(),
  };

  const anychart = {
    licenseKey: jest.fn(), // <-- licenseKey as a function
    cartesian: jest.fn(() => mockChart),
    column: jest.fn(() => ({
      normal: jest.fn(),
    })),
  };

  return {
    __esModule: true,
    default: anychart,
  };
});

// Mock axios
jest.mock("axios", () => ({
  get: jest.fn(() => Promise.resolve({ data: { data: [] } })),
}));

// Mock router
jest.mock("react-router-dom", () => ({
  useNavigate: jest.fn(),
}));

describe("Results component", () => {
  it("renders correctly and triggers actions", async () => {
    render(<Results />);

    const res = screen.getByText("loading...");
    expect(res).toBeInTheDocument();

    const mockData = {
      data: {
        data: [
          {
            groupAverages: {
              group_1_average: 5.5,
              group_2_average: 5.5,
              group_3_average: 5.5,
              group_4_average: 5.5,
              group_5_average: 5.5,
              group_6_average: 5.5,
            },
          },
        ],
      },
    };
  });
});
