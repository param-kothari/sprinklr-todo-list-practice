import React, { useState, useRef } from "react";
import "./AddListForm.css";
import "../buttons/Btn.css";

interface Props {
    addList: (userInput: string) => void;
    toggleDisplay: () => void;
}

const AddListForm: React.FC<Props> = (props) => {
    const [userInput, setUserInput] = useState('');
    const inputElement = useRef<HTMLInputElement | null>(null);

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        if(event.currentTarget.value.length > 0) {
            const ListHeaderText: HTMLInputElement | null = inputElement.current;
            if(ListHeaderText) {
                ListHeaderText.style.border = "none";
                ListHeaderText.style.borderBottom = "solid 1px #808080";
                ListHeaderText.placeholder = "Enter list heading";
            }
        }
        setUserInput(event.currentTarget.value);
    };

    const handleSubmit = (event: React.MouseEvent<HTMLButtonElement>) => {
        event.preventDefault();
        const ListHeaderText: HTMLInputElement | null = inputElement.current;
        if(userInput.length > 0) {
            if(ListHeaderText) {
                ListHeaderText.style.border = "none";
                ListHeaderText.style.borderBottom = "solid 1px #808080";
                ListHeaderText.placeholder = "Enter list heading";
            }
            props.addList(userInput);
        } else {
            if(ListHeaderText) {
                ListHeaderText.style.border = "solid 1px #ff0000";
                ListHeaderText.placeholder = "Please enter a valid heading";
            }
        }
        setUserInput('');
    };

    const handleCancel = (event: React.MouseEvent<HTMLButtonElement>) => {
        event.preventDefault();
        props.toggleDisplay();
    };

    return (
        <div className="AddListForm">
            <form>
                <input ref={inputElement} className="ListHeaderText jsListHeaderText" value={userInput} type="text" onChange={handleChange} placeholder="Enter list heading" />
                <div className="AddListDivBtns">
                    <button className="ConfirmBtn Btn" onClick={handleSubmit}>Add task</button>
                    <button className="CancelBtn Btn" onClick={handleCancel}>Cancel</button>
                </div>
            </form>
        </div>
    );
}

export default AddListForm;