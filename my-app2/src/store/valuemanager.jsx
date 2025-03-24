import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { updateValue } from "./valueSlice";

function ValueManager() {
    const value = useSelector((state) => state.value.value); // Get current value
    const dispatch = useDispatch();
    const [input, setInput] = useState("");

    const handleUpdate = () => {
        if (input.trim() !== "") {
            dispatch(updateValue(input)); // Replace stored value
            setInput(""); // Clear input box
        }
    };

    return (
        <div>
            <h2>Stored Value: {value}</h2>
            <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Enter new value"
            />
            <button onClick={handleUpdate}>Save New Value</button>
        </div>
    );
}

export default ValueManager;