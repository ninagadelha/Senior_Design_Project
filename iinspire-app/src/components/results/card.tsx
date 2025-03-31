"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import infoIcon from "@/../public/images/custom/info_icon.png";
import "@/../public/styles/card.css";

interface CardProps {
    id: string;
    title: string;
    description: string;
    moreInfo: string;
    color: string;
}

const Card: React.FC<CardProps> = ({ id, title, description, moreInfo, color }) => {
    const [showMore, setShowMore] = useState(false);
    const router = useRouter();

    const toggleShowMore = () => {
        setShowMore((prev) => !prev);
    };

    return (
        <div className="card">
            <div className="card-header" style={{ backgroundColor: color }}>
                <h3>{title}</h3>
                <Image
                    src={infoIcon}
                    alt="info"
                    width={24}
                    height={24}
                    className="info-icon"
                    priority={true}
                    onClick={() => router.push("/about")}
                />
            </div>
            <div className="card-body">
                <div className="description-container">
                    <p>{description}</p>
                </div>
                {showMore && <p id={`moreInfo-${id}`}>{moreInfo}</p>}
                <button className="toggle-btn" onClick={toggleShowMore}>
                    {showMore ? "Show Less \u25B4" : "Show More \u25BE"}
                </button>
            </div>
        </div>
    );
};

export default Card;




