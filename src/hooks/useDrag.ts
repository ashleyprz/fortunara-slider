import { useState, useCallback, useRef } from 'react';
import { calculateAngle } from '../utils/angleUtils';

interface UseDragOptions {
    onDragEnd?: (rotation: number) => void;
}

export const useDrag = (options: UseDragOptions = {}) => {
    const [isDragging, setIsDragging] = useState(false);
    const [startAngle, setStartAngle] = useState(0);
    const [rotation, setRotation] = useState(0);
    const containerRef = useRef<HTMLDivElement>(null);

    const getAngle = useCallback((clientX: number, clientY: number) => {
        if (!containerRef.current) return 0;
        const rect = containerRef.current.getBoundingClientRect();
        return calculateAngle(clientX, clientY, rect);
    }, []);

    const startDrag = useCallback((clientX: number, clientY: number) => {
        setIsDragging(true);
        setStartAngle(getAngle(clientX, clientY) - rotation);
    }, [getAngle, rotation]);

    const updateDrag = useCallback((clientX: number, clientY: number) => {
        if (!isDragging) return;
        const newAngle = getAngle(clientX, clientY) - startAngle;
        setRotation(newAngle);
    }, [isDragging, getAngle, startAngle]);

    const endDrag = useCallback(() => {
        setIsDragging(false);
        options.onDragEnd?.(rotation);
    }, [rotation, options]);

    // Mouse event handlers
    const handleMouseDown = useCallback((e: React.MouseEvent) => {
        e.preventDefault();
        e.stopPropagation(); // Prevent event bubbling when multiple draggable elements
        startDrag(e.clientX, e.clientY);
    }, [startDrag]);

    const handleMouseMove = useCallback((e: MouseEvent) => {
        e.preventDefault();
        updateDrag(e.clientX, e.clientY);
    }, [updateDrag]);

    const handleMouseUp = useCallback((e: MouseEvent) => {
        e.preventDefault();
        endDrag();
    }, [endDrag]);

    // Touch event handlers
    const handleTouchStart = useCallback((e: React.TouchEvent) => {
        e.preventDefault();
        e.stopPropagation(); // Prevent event bubbling when multiple draggable elements
        const touch = e.touches[0];
        startDrag(touch.clientX, touch.clientY);
    }, [startDrag]);

    const handleTouchMove = useCallback((e: TouchEvent) => {
        e.preventDefault();
        const touch = e.touches[0];
        updateDrag(touch.clientX, touch.clientY);
    }, [updateDrag]);

    const handleTouchEnd = useCallback((e: TouchEvent) => {
        e.preventDefault();
        endDrag();
    }, [endDrag]);

    return {
        isDragging,
        rotation,
        setRotation,
        containerRef,
        handlers: {
        handleMouseDown,
        handleMouseMove,
        handleMouseUp,
        handleTouchStart,
        handleTouchMove,
        handleTouchEnd,
        },
    };
};
