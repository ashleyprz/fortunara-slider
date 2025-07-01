import "./CircularSlider.css";
import Tire from "/images/tire.webp";

interface CircularSliderProps {
    cards: Array<{ title: string; image: string }>;
}

export function CircularSlider({ cards }: CircularSliderProps) {
    return (
        <div className="circular-slider">
        <div className="red-circle"></div>
        <div className="tire-container">
            <img src={Tire} alt="Neumático" className="tire-image" />
        </div>
        </div>
    );
}
