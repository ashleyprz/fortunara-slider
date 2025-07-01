import { useEffect, useCallback } from 'react';
import { useDrag } from './useDrag';
import { findClosestSnapAngle, normalizeAngle } from '../utils/angleUtils';
import { calculateCardProperties } from '../utils/mathUtils';
import type { CircularSliderConfig } from '../components/CircularSlider/types';

const DEFAULT_SNAP_ANGLES = [-300, -240, -180, -120, -60, 0, 60, 120, 180, 240, 300];

export const useCircularSlider = (
    cardCount: number,
    config: CircularSliderConfig = {}
) => {
    const {
        snapAngles = DEFAULT_SNAP_ANGLES,
        tolerance = 5,
        centerScale = 1.5,
        centerOpacity = 1,
        defaultScale = 1,
        defaultOpacity = 0.5,
    } = config;

    const handleDragEnd = useCallback((rotation: number) => {
        const closestAngle = findClosestSnapAngle(rotation, snapAngles);
        
        // Debug logging
        console.log(`Rotation: ${rotation}, Closest: ${closestAngle}, Distance: ${Math.abs(rotation - closestAngle)}`);
        
        setRotation(closestAngle);
    }, [snapAngles]);

    const { isDragging, rotation, setRotation, containerRef, handlers } = useDrag({
        onDragEnd: handleDragEnd,
    });

  // Function to determine card properties based on position
    const getCardProperties = useCallback((cardIndex: number) => {
        const cardAngle = (cardIndex * 360) / cardCount;
        const totalRotation = rotation + cardAngle;
        const adjustedAngle = normalizeAngle(totalRotation);
        
        return calculateCardProperties(
        adjustedAngle,
        tolerance,
        centerScale,
        centerOpacity,
        defaultScale,
        defaultOpacity
        );
    }, [rotation, cardCount, tolerance, centerScale, centerOpacity, defaultScale, defaultOpacity]);

    // Set up event listeners
    useEffect(() => {
        if (isDragging) {
        // Mouse events
        document.addEventListener('mousemove', handlers.handleMouseMove);
        document.addEventListener('mouseup', handlers.handleMouseUp);
        
        // Touch events
        document.addEventListener('touchmove', handlers.handleTouchMove, { passive: false });
        document.addEventListener('touchend', handlers.handleTouchEnd, { passive: false });
        }
        
        return () => {
        // Cleanup mouse events
        document.removeEventListener('mousemove', handlers.handleMouseMove);
        document.removeEventListener('mouseup', handlers.handleMouseUp);
        
        // Cleanup touch events
        document.removeEventListener('touchmove', handlers.handleTouchMove);
        document.removeEventListener('touchend', handlers.handleTouchEnd);
        };
    }, [isDragging, handlers]);

    return {
        rotation,
        containerRef,
        getCardProperties,
        dragHandlers: {
        handleMouseDown: handlers.handleMouseDown,
        handleTouchStart: handlers.handleTouchStart,
        },
    };
};
