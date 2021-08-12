import React, { useState, useCallback } from "react";
import ListCards from "./ListCards";
import AddCardForm from "../forms/AddCardForm";
import AddCardBtn from "../buttons/AddCardBtn";
import "./List.css"

interface Props {
    headerVal: string;
    keyCounter: number;
}

interface CardType {
    value: string;
    keyCounter: number;
}

const List: React.FC<Props> = (props) => {
    const [cardList, setCardList] = useState<CardType[]>([]);
    const [displayInputForm, setDisplayInputForm] = useState(false);
    const [keyCounter, setKeyCounter] = useState(0);

    const addCard = (userInput: string) => {
        const newCard: CardType = {
            value: userInput,
            keyCounter: keyCounter
        };
        setCardList([...cardList, newCard]);
        setKeyCounter(keyCounter + 1);
    };

    const toggleDisplay = useCallback(
        () => {
            setDisplayInputForm(!displayInputForm);
        },
        [ displayInputForm ]
    );
    return (
        <div className="List">
            <header className="ListHeader">
                <span>{props.headerVal}</span>
            </header>
            <ListCards cardList={cardList}/>
            {
                displayInputForm ?
                    <AddCardForm addCard={addCard} toggleDisplay={toggleDisplay} /> :
                    <AddCardBtn toggleDisplay={toggleDisplay} />
            }
        </div>
    );
}

export default List;