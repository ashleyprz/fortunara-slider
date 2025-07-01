import './Card.css';
import DefaultImage from '/images/slider-image.webp';

interface CardProps {
    title?: string;
    image?: string;
}

export function Card({title, image=DefaultImage}:CardProps){
    return (
        <div className="card">
            <img className="card-image" src={image} alt={`${title}`} />
            <h2 className="card-title">{title}</h2>
        </div>
    )
}