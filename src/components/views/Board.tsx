import React, { useState, useCallback } from "react";
import AddListBtn from "../buttons/AddListBtn";
import AddListForm from "../forms/AddListForm";
import List from "./List";
import "./Board.css";

interface ListType {
    headerVal: string;
    keyCounter: number;
}

const Board: React.FC = () => {
    const [lists, setLists] = useState<ListType[]>([]);
    const [displayInputForm, setDisplayInputForm] = useState<boolean>(false);
    const [keyCounter, setKeyCounter] = useState<number>(0);

    const addList = (userInput: string) => {
        const newList: ListType = {
            headerVal: userInput,
            keyCounter: keyCounter
        };
        setLists([...lists, newList]);
        setKeyCounter(keyCounter + 1);
    };

    const toggleDisplay = useCallback(
        () => {
            setDisplayInputForm(!displayInputForm);
        },
        [ displayInputForm ]
    );

    return (
        <div className="Board">
            <ul className="BoardLists">
                {lists.map(list => (
                    <li key={`${list.headerVal}_${list.keyCounter}`}>{
                        <List headerVal={list.headerVal} keyCounter={list.keyCounter} />
                    }</li>
                ))}
            </ul>
            <div className="AddListContainer">
                {
                    displayInputForm ?
                        <AddListForm addList={addList} toggleDisplay={toggleDisplay} /> :
                        <AddListBtn toggleDisplay={toggleDisplay} />
                }
            </div>
        </div>
    );
}

export default Board;