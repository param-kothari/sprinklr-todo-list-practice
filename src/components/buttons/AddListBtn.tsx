import React from "react";
import "./AddListBtn.css"
import "./Btn.css"

interface Props {
    toggleDisplay: () => void;
}

const AddListBtn: React.FC<Props> = (props) => {

    const handleSubmit = (event: React.MouseEvent<HTMLButtonElement>) => {
        event.preventDefault();
        props.toggleDisplay();
    };

    return (
        <>
            <button className="AddListBtn Btn" onClick={handleSubmit}>Add another list</button>
        </>
    );
}

export default AddListBtn;