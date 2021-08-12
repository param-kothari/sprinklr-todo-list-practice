import React from "react";
import Card from "./Card";
import "./ListCards.css"

interface Props {
    cardList: {
        value: string,
        keyCounter: number
    }[]
}

const ListCards: React.FC<Props> = (props) => {
    return (
        <ul className="ListItems">
            {props.cardList.map((card, index) => (
                <li key={`${card.value}_${card.keyCounter}`}>
                    <Card value={card.value} keyCounter={card.keyCounter} />
                </li>
            ))}
        </ul>
    );
};

export default ListCards;