import React, { useState, useRef } from "react";
import "./AddCardForm.css";
import "../buttons/Btn.css"

interface Props {
    addCard: (userInput: string) => void;
    toggleDisplay: () => void;
}

const AddCardForm: React.FC<Props> = (props) => {
    const [userInput, setUserInput] = useState('');
    const inputElement = useRef<HTMLInputElement | null>(null);

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        if(event.currentTarget.value.length > 0) {
            const CardTitleText: HTMLInputElement | null = inputElement.current;
            if(CardTitleText) {
                CardTitleText.style.border = "none";
                CardTitleText.style.borderBottom = "solid 1px #808080";
                CardTitleText.placeholder = "Enter task";
            }
        }
        setUserInput(event.currentTarget.value);
    };

    const handleSubmit = (event: React.MouseEvent<HTMLButtonElement>) => {
        event.preventDefault();
        const CardTitleText: HTMLInputElement | null = inputElement.current;
        if(userInput.length > 0) {
            if(CardTitleText) {
                CardTitleText.style.border = "none";
                CardTitleText.style.borderBottom = "solid 1px #808080";
                CardTitleText.placeholder = "Enter task";
            }
            props.addCard(userInput);
        } else {
            if(CardTitleText) {
                CardTitleText.style.border = "solid 1px #ff0000";
                CardTitleText.placeholder = "Please enter a valid task";
            }
        }
        setUserInput('');
    };

    const handleCancel = (event: React.MouseEvent<HTMLButtonElement>) => {
        event.preventDefault();
        props.toggleDisplay()
    };

    return (
        <div>
            <form>
                <input ref={inputElement} className="CardTitleText" value={userInput} type="text" onChange={handleChange} placeholder="Enter task" />
                <div className="CardTitleDivBtn">
                    <button className="ConfirmBtn Btn" onClick={handleSubmit}>Add task</button>
                    <button className="CancelBtn Btn" onClick={handleCancel}>Cancel</button>
                </div>
            </form>
        </div>
    );
}

export default AddCardForm;