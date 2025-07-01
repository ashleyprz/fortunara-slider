/**
 * Mathematical utility functions
 */

/**
 * Check if a value is within a tolerance range of a target
 */
export const isWithinTolerance = (
    value: number, 
    target: number, 
    tolerance: number
): boolean => {
    return Math.abs(value - target) <= tolerance;
};

/**
 * Calculate scale and opacity based on distance from center
 */
export const calculateCardProperties = (
    angle: number, 
    tolerance: number = 5,
    centerScale: number = 1.5,
    centerOpacity: number = 1,
    defaultScale: number = 1,
    defaultOpacity: number = 0.5
) => {
    if (isWithinTolerance(angle, 0, tolerance)) {
        return { scale: centerScale, opacity: centerOpacity };
    }
    return { scale: defaultScale, opacity: defaultOpacity };
};

/**
 * Clamp a number between min and max values
 */
export const clamp = (value: number, min: number, max: number): number => {
    return Math.min(Math.max(value, min), max);
};
