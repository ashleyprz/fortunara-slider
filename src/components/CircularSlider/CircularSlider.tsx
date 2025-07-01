import './CircularSlider.css';
import Tire from '/images/tire.webp';
import React, { useState, useRef } from 'react';
import { Card } from '../Card/Card';

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

        // Angles in which the tire should snap to always show 3 images
        const snapAngles = [-300, -240, -180, -120, -60, 0, 60, 120, 180, 240, 300];
        
        // FFind the closest angle from the snap angles
        const findClosestAngle = (currentRotation: number, snapAngles: number[]) => {
            let closestAngle = snapAngles[0];
            let minDistance = Math.abs(currentRotation - snapAngles[0]);
            
            snapAngles.forEach(angle => {
                const distance = Math.abs(currentRotation - angle);
                if (distance < minDistance) {
                    minDistance = distance;
                    closestAngle = angle;
                }
            });
            
            // Verify angles +360 and -360 to ensure snapping works correctly
            snapAngles.forEach(angle => {
                // Verify angle + 360
                const angleUp = angle + 360;
                const distanceUp = Math.abs(currentRotation - angleUp);
                if (distanceUp < minDistance) {
                    minDistance = distanceUp;
                    closestAngle = angleUp;
                }
                
                // Verify angle - 360
                const angleDown = angle - 360;
                const distanceDown = Math.abs(currentRotation - angleDown);
                if (distanceDown < minDistance) {
                    minDistance = distanceDown;
                    closestAngle = angleDown;
                }
            });
            
            return closestAngle;
        };
        
        const closestAngle = findClosestAngle(rotation, snapAngles);
        
        // Debug c:
        console.log(`Rotation: ${rotation}, Closest: ${closestAngle}, Distance: ${Math.abs(rotation - closestAngle)}`);
        
        // Set the rotation to the closest angle
        setRotation(closestAngle);
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
    }, [isDragging, startAngle, rotation]);

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
            className="cards-orbit"style={{ transform: `translateX(-50%) rotate(${rotation}deg)` }}>
            {cards.map((card, index) => (
                <div
                    key={`card-${index}`}
                    className="card-container"
                    style={{transform: `rotate(${(index * 360) / cards.length}deg)`}}
                >
                    <div className="card-wrapper">
                        <Card title={card.title} image={card.image} />
                    </div>
                </div>
            ))}
        </div>
        
        <div className="tire-container" onMouseDown={handleMouseDown}>
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