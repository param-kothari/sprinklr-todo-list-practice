import React from "react";

interface Props {
    value: string;
    keyCounter: number;
}

const Card: React.FC<Props> = (props) => {
    return (
        <div>{props.value}</div>
    );
}

export default Card;