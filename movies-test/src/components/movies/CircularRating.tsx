import React from 'react';

interface CircularRatingProps {
    rating: number;
    size?: number;
    strokeWidth?: number;
}

const CircularRating: React.FC<CircularRatingProps> = ({ rating, size = 100, strokeWidth = 10 }) => {
    const radius = (size - strokeWidth) / 2;
    const circumference = 2 * Math.PI * radius;
    const offset = circumference - (rating / 100) * circumference;

    let strokeColor;
    if (rating >= 60) {
        strokeColor = '#4DA14F';
    } else if (rating >= 30) {
        strokeColor = '#FF8800';
    } else {
        strokeColor = 'red';
    }

    return (
        <svg width={size} height={size} style={{ transform: 'rotate(-90deg)' }}>
            <circle
                stroke={strokeColor}
                fill="transparent"
                strokeWidth={strokeWidth}
                r={radius}
                cx={size / 2}
                cy={size / 2}
                opacity="0.5"
            />
            <circle
                stroke={strokeColor}
                fill="transparent"
                strokeWidth={strokeWidth}
                strokeLinecap="round"
                strokeDasharray={circumference}
                strokeDashoffset={offset}
                r={radius}
                cx={size / 2}
                cy={size / 2}
                style={{ transition: 'stroke-dashoffset 0.5s ease, stroke 0.5s ease' }}
            />
            <text
                x="50%"
                y="50%"
                dominantBaseline="middle"
                textAnchor="middle"
                fontSize="9"
                fill="#fff"
                transform={`rotate(90, ${size / 2}, ${size / 2})`}
            >
                {rating}%
            </text>
        </svg>
    );
};

export default CircularRating;