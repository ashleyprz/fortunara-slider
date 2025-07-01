import './CircularSlider.css';
import Tire from '/images/tire.webp';
import React, { useState, useRef } from 'react';

interface CircularSliderProps {
    cards: Array<{
        title: string;
        image: string;
    }>;
}

export function CircularSlider({cards}: CircularSliderProps) {
    const [rotation, setRotation] = useState(0);
    const [isDragging, setIsDragging] = useState(false);
    const [startAngle, setStartAngle] = useState(0);
    const containerRef = useRef<HTMLDivElement>(null);

    // Calculate the angle based on mouse position
    const getAngle = (e: MouseEvent | React.MouseEvent) => {
        if (!containerRef.current) return 0;
        const rect = containerRef.current.getBoundingClientRect();
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height;
        
        const x = e.clientX - centerX;
        const y = centerY - e.clientY;
        
        return Math.atan2(x, y) * (180 / Math.PI);
    };

    const handleMouseDown = (e: React.MouseEvent) => {
        setIsDragging(true);
        setStartAngle(getAngle(e) - rotation);
    };

    const handleMouseMove = (e: MouseEvent) => {
        if (!isDragging) return;
        const newAngle = getAngle(e) - startAngle;
        setRotation(newAngle);
    };

    const handleMouseUp = () => {
        setIsDragging(false);
    };

    // Event listeners
    React.useEffect(() => {
        if (isDragging) {
            document.addEventListener('mousemove', handleMouseMove);
            document.addEventListener('mouseup', handleMouseUp);
        }
        return () => {
            document.removeEventListener('mousemove', handleMouseMove);
            document.removeEventListener('mouseup', handleMouseUp);
        };
    }, [isDragging, startAngle]);

    return (
    <div className="circular-slider" ref={containerRef}>
        <div 
            className="red-circle"
            style={{ transform: `translateX(-50%) rotate(${rotation}deg)` }}
            onMouseDown={handleMouseDown}
        >
            {cards.map((_, index) => (
                <div
                    key={`point-${index}`}
                    className="guide-point"
                    style={{
                        transform: `rotate(${(index * 360) / cards.length}deg)`
                    }}
                />
            ))}
        </div>
        <div 
            className="tire-container"
            onMouseDown={handleMouseDown}
        >
            <img 
                src={Tire} 
                alt="Neumático" 
                className="tire-image"
                style={{ transform: `rotate(${rotation}deg)` }}
            />
        </div>
    </div>
);
}