import React from "react";
import "./AddCardBtn.css";
import "./Btn.css"

interface Props {
    toggleDisplay: () => void;
}

const AddCardBtn: React.FC<Props> = (props) => {

    const handleSubmit = (event: React.MouseEvent<HTMLButtonElement>) => {
        event.preventDefault();
        props.toggleDisplay();
    };

    return (
        <>
            <button className="AddCardBtn Btn" onClick={handleSubmit}>Add task</button>
        </>
    );
}

export default AddCardBtn;