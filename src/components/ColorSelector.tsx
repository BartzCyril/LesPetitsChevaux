import {PlayerColor} from "@/type/PlayerColor";

export function ColorSelector() {
    const colors = [PlayerColor.BLUE, PlayerColor.RED, PlayerColor.GREEN, PlayerColor.YELLOW]
    return (
        <section className="colorSelector" id="colorSelector">
            <h2>Choissisez votre couleur : </h2>
            {colors.map((color) => <button key={color} className={color}></button>)}
        </section>
    )
}