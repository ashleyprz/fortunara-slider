import './CircularSlider.css';
import Tire from '/images/tire.webp';
import { Card } from '../Card/Card';
import { useCircularSlider } from '../../hooks/useCircularSlider';
import type { CircularSliderProps } from './types';

export function CircularSlider({ cards }: CircularSliderProps) {
    const { rotation, containerRef, getCardProperties, dragHandlers } = useCircularSlider(
        cards.length,
        {
            tolerance: 5,
            centerScale: 1.5,
            centerOpacity: 1,
            defaultScale: 1,
            defaultOpacity: 0.5,
        }
    );

    return (
        <div 
            className="circular-slider" 
            ref={containerRef}
            onMouseDown={dragHandlers.handleMouseDown}
            onTouchStart={dragHandlers.handleTouchStart}
        >
            <div 
                className="red-circle"
                style={{ transform: `translateX(-50%) rotate(${rotation}deg)` }}
                onMouseDown={dragHandlers.handleMouseDown}
                onTouchStart={dragHandlers.handleTouchStart}
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
            
            {/* Container for the cards */}
            <div 
                className="cards-orbit" 
                style={{ transform: `translateX(-50%) rotate(${rotation}deg)` }}
                onMouseDown={dragHandlers.handleMouseDown}
                onTouchStart={dragHandlers.handleTouchStart}
            >
                {cards.map((card, index) => (
                    <div
                        key={`card-${index}`}
                        className="card-container"
                        style={{
                            transform: `rotate(${(index * 360) / cards.length}deg)`
                        }}
                        onMouseDown={dragHandlers.handleMouseDown}
                        onTouchStart={dragHandlers.handleTouchStart}
                    >
                        <div 
                            className="card-wrapper"
                            style={{
                                transform: `scale(${getCardProperties(index).scale})`,
                                opacity: getCardProperties(index).opacity
                            }}
                            onMouseDown={dragHandlers.handleMouseDown}
                            onTouchStart={dragHandlers.handleTouchStart}
                        >
                            <Card title={card.title} image={card.image} />
                        </div>
                    </div>
                ))}
            </div>
            
            <div 
                className="tire-container"
                onMouseDown={dragHandlers.handleMouseDown}
                onTouchStart={dragHandlers.handleTouchStart}
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