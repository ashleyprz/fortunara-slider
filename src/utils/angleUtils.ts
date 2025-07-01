/**
 * Utility functions for angle calculations and manipulations
 */

/**
 * Calculate the angle based on mouse/touch position relative to a container
 */
export const calculateAngle = (
    clientX: number, 
    clientY: number, 
    containerRect: DOMRect
): number => {
    const centerX = containerRect.left + containerRect.width / 2;
    const centerY = containerRect.top + containerRect.height;
    
    const x = clientX - centerX;
    const y = centerY - clientY;
    
  return Math.atan2(x, y) * (180 / Math.PI);
};

/**
 * Find the closest angle from a list of snap angles
 */
export const findClosestSnapAngle = (
    currentRotation: number, 
    snapAngles: number[]
): number => {
    let closestAngle = snapAngles[0];
    let minDistance = Math.abs(currentRotation - snapAngles[0]);
    
    snapAngles.forEach(angle => {
        const distance = Math.abs(currentRotation - angle);
        if (distance < minDistance) {
        minDistance = distance;
        closestAngle = angle;
    }
});

  // Also check "equivalent" angles by adding/subtracting 360
    snapAngles.forEach(angle => {
        // Check angle + 360
        const angleUp = angle + 360;
        const distanceUp = Math.abs(currentRotation - angleUp);
        if (distanceUp < minDistance) {
        minDistance = distanceUp;
        closestAngle = angleUp;
    }
    
    // Check angle - 360
    const angleDown = angle - 360;
    const distanceDown = Math.abs(currentRotation - angleDown);
    if (distanceDown < minDistance) {
        minDistance = distanceDown;
        closestAngle = angleDown;
    }
});

    return closestAngle;
};

/**
 * Normalize angle to a range of -180 to 180
 */
export const normalizeAngle = (angle: number): number => {
    const normalized = ((angle % 360) + 360) % 360;
    return normalized > 180 ? normalized - 360 : normalized;
};

/**
 * Generate snap angles for a given number of items
 */
export const generateSnapAngles = (itemCount: number): number[] => {
    const angleStep = 360 / itemCount;
    const angles: number[] = [];
    
    for (let i = 0; i < itemCount; i++) {
        const baseAngle = i * angleStep;
        // Add multiple rotations for smoother snapping
        angles.push(baseAngle - 360, baseAngle, baseAngle + 360);
    }
    
    return angles.sort((a, b) => a - b);
};
