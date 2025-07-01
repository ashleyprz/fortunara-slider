export interface CircularSliderProps {
  cards: Array<{
    title: string;
    image: string;
  }>;
}

export interface DragHandlers {
  handleMouseDown: (e: React.MouseEvent) => void;
  handleTouchStart: (e: React.TouchEvent) => void;
}

export interface CardProperties {
  scale: number;
  opacity: number;
}

export interface CircularSliderConfig {
  snapAngles?: number[];
  tolerance?: number;
  centerScale?: number;
  centerOpacity?: number;
  defaultScale?: number;
  defaultOpacity?: number;
}
