import { CircularSlider } from './components/CircularSlider/CircularSlider';

const cardsData = [
    { title: "Card 1", image: "/images/slider-image.webp" },
    { title: "Card 2", image: "/images/slider-image.webp" },
    { title: "Card 3", image: "/images/slider-image.webp" },
    { title: "Card 4", image: "/images/slider-image.webp" },
    { title: "Card 5", image: "/images/slider-image.webp" },
    { title: "Card 6", image: "/images/slider-image.webp" }
];

function App() {
    return (
        <>
            <nav id='nav'>
                <p>Nav</p>
            </nav>
            <main>
                <CircularSlider cards={cardsData} />
            </main>
            <footer id='footer'>
                <p>Este es un párrafo dentro del footer</p>
            </footer>
        </>
    )
}

export default App;