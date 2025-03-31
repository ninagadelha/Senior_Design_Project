import React from "react";
import "@/../public/styles/legend.css";

const Legend: React.FC = () => {
    return (
        <div className="chart-legend">
            <div className="legend-title">Legend</div>
            <div>
                <span className="legend-circle filled"></span>
                Diameter and vertical position of a circle = profile value
            </div>
            <div>
                <span className="legend-circle dashed"></span>
                Diameter of dashed circle = max value
            </div>
        </div>
    );
};

export default Legend;