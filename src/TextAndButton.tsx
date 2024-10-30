import React, {useState} from "react";

interface MyButtonProps {
    count: number;
    onClick: () => void;
}

interface TextAndButtonProps {
    text?: string;
}


function MyButton({count, onClick}: MyButtonProps) : React.ReactElement {
    return (
        <button onClick={onClick}>
            Clicked {count} times
        </button>
    );
}

function TextAndButton({  text = "Default Text" }: TextAndButtonProps) : React.ReactElement {
    const [count, setCount] = useState<number>(0);

    function handleClick() : void {
        setCount(count + 1);
    }

    return (
        <div className="Random Text">
            <h1>Some text is here</h1>

            <p>{text}</p>
            <MyButton count={count} onClick={handleClick} />
            <br/>
            <MyButton count={count} onClick={handleClick} />
        </div>
    );
}

export default TextAndButton;
