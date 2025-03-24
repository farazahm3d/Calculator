import { useState, useEffect, useRef } from 'react'
import Big from "big.js";
import './App.css'
import { useSelector, useDispatch } from "react-redux";
import { updateValue } from "./store/valueSlice";
import { appendText } from "./store/valueSlice";
import { resetHistory } from "./store/valueSlice";

function Home() {
    const prevOutputRef = useRef("");
    const [isCalculated, setIsCalculated] = useState(false);

    const [output, setOutput] = useState("");
    const [isPressed, setIsPressed] = useState(false);
    const [isPressedEqual, setIsPressedEqual] = useState(false);
    const [isPressedPlus, setIsPressedPlus] = useState(false);
    const [isPressedMinus, setIsPressedMinus] = useState(false);
    const [isPressedDivide, setIsPressedDivide] = useState(false);
    const [isPressedMultiply, setIsPressedMultiply] = useState(false);
    const [isPressed0, setIsPressed0] = useState(false);
    const [isPressed1, setIsPressed1] = useState(false);
    const [isPressed2, setIsPressed2] = useState(false);
    const [isPressed3, setIsPressed3] = useState(false);
    const [isPressed4, setIsPressed4] = useState(false);
    const [isPressed5, setIsPressed5] = useState(false);
    const [isPressed6, setIsPressed6] = useState(false);
    const [isPressed7, setIsPressed7] = useState(false);
    const [isPressed8, setIsPressed8] = useState(false);
    const [isPressed9, setIsPressed9] = useState(false);
    const [isPressedC, setIsPressedC] = useState(false);

    const [history2, setHistory2] = useState('');
    let prevOutput = "";
    const value = useSelector((state) => state.value.value); // Get current value
    const history = useSelector((state) => state.value.history);
    const dispatch = useDispatch();




    const handleUpdate = () => {
        if (output.trim() !== "") {
            dispatch(updateValue(output)); // Replace stored value
        }
        dispatch(appendText(output));
        console.log("history2", history2);
    };
    const handleClear = () => {
        dispatch(resetHistory(output));
    };

    const hasOperatorBetween = (str) => {
        return /[0-9]+\s*[\+\-\*\/]\s*[0-9]+/.test(str);
    };
    console.log('history7', history);
    useEffect(() => {
        // Append new input

        const handleKeyPress = (event) => {
            let value = event.key;
            if (isCalculated && !["+", "-", "/", "*"].includes(value)) {
                setOutput(value);
            }
            else {
                if (value === "Enter" || value === "=") {
                    if (hasOperatorBetween(output)) {

                        event.preventDefault();
                        handleUpdate()
                        setIsPressedEqual(true);
                        setOutput((prevOutput) => prevOutput + "=");
                        setTimeout(() => setIsPressedEqual(false), 500);
                        calculate(output); // Ensure state update before calculation
                        setIsCalculated(true);


                    }
                }
                else if (value === 'c') {
                    setIsPressedC(true);
                    setOutput((prevOutput) => prevOutput.slice(0, -1));
                    setTimeout(() => setIsPressedC(false), 500);
                }
                else if (["+", "-", "/", "*"].includes(value)) {
                    setOutput((prevOutput) => prevOutput + value);
                    if (value === '+') {
                        setIsPressedPlus(true);
                        setTimeout(() => setIsPressedPlus(false), 500);
                    }
                    else if (value === '-') {
                        setIsPressedMinus(true);
                        setTimeout(() => setIsPressedMinus(false), 500);
                    }
                    else if (value === '/') {
                        setIsPressedDivide(true);
                        setTimeout(() => setIsPressedDivide(false), 500);
                    }
                    else if (value === '*') {
                        setIsPressedMultiply(true);
                        setTimeout(() => setIsPressedMultiply(false), 500);
                    }
                    else
                        setOutput((prevOutput) => {
                            if (prevOutput.length === 0 || ["+", "-", "/", "*"].includes(prevOutput.at(-1))) {
                                alert("Can't process consecutive operators.");
                                return prevOutput; // Prevent adding an operator at the start or after another operator
                            }
                            return prevOutput + value;
                        });
                }
                else if (value === "Backspace") {
                    setIsPressed(true);
                    setOutput((prevOutput) => prevOutput.slice(0, -1));
                    setTimeout(() => setIsPressed(false), 500);
                }
                else if (value >= "0" && value <= "9" || value === ".") {
                    setOutput((prevOutput) => prevOutput + value);
                    if (value === "0") {
                        setIsPressed0(true);
                        setTimeout(() => setIsPressed0(false), 500);
                    } else if (value === "1") {
                        setIsPressed1(true);
                        setTimeout(() => setIsPressed1(false), 500);
                    } else if (value === "2") {
                        setIsPressed2(true);
                        setTimeout(() => setIsPressed2(false), 500);
                    } else if (value === "3") {
                        setIsPressed3(true);
                        setTimeout(() => setIsPressed3(false), 500);
                    } else if (value === "4") {
                        setIsPressed4(true);
                        setTimeout(() => setIsPressed4(false), 500);
                    } else if (value === "5") {
                        setIsPressed5(true);
                        setTimeout(() => setIsPressed5(false), 500);
                    } else if (value === "6") {
                        setIsPressed6(true);
                        setTimeout(() => setIsPressed6(false), 500);
                    } else if (value === "7") {
                        setIsPressed7(true);
                        setTimeout(() => setIsPressed7(false), 500);
                    } else if (value === "8") {
                        setIsPressed8(true);
                        setTimeout(() => setIsPressed8(false), 500);
                    } else if (value === "9") {
                        setIsPressed9(true);
                        setTimeout(() => setIsPressed9(false), 500);
                    }
                }
            }
        };

        window.addEventListener("keydown", handleKeyPress);


        return () => {
            window.removeEventListener("keydown", handleKeyPress);
        };
    }, [output]); // Dependency array to track changes

    useEffect(() => {
        calculate(output);




    }, [output])

    useEffect(() => {
        if (isCalculated) {
            handleUpdate(output); // Now handleUpdate() gets the correct output
            setIsCalculated(false); // Reset flag
        }
    }, [isCalculated]); // Only runs after calculation

    useEffect(() => {
        async function fetchData() {
            let data = await calculate(output);
            setIsCalculated(true);
        }

        fetchData()
    }, [calculate(output)]);



    // let lastChar = output.at(-1);
    // if (lastChar === "=") {
    //     setOutput(calculate(output));
    //     console.log("Outputupdate", output);
    //     handleUpdate();

    // }



    // useEffect(() => {
    //     console.log("handlechange", history2);

    // }, [history2])




    function handleclick(value) {
        if (value === "Reset") {
            setOutput("");
        } else if (value === "=") {
            setOutput((prevOutput) => prevOutput + value);
            calculate(output);
            handleUpdate();
            setIsCalculated(true);
        } else if (value === "Backspace") {
            setOutput((prevOutput) => prevOutput.slice(0, -1));
        }
        else if (["+", "-", "/", "*"].includes(value)) {
            setOutput((prevOutput) => {
                if (prevOutput.length === 0 || ["+", "-", "/", "*"].includes(prevOutput.at(-1))) {
                    alert("Can't have consecutive operators");
                    return prevOutput; // Prevent adding consecutive operators
                }
                return prevOutput + value;
            });
        }

        else {
            setOutput((prevOutput) => prevOutput + value);
        }
    }
    function calculate(output) {

        let numbers = [];
        let operators = [];
        let num = "";

        for (let i = 0; i < output.length; i++) {
            let char = output[i];

            if (char === "+" || char === "-" || char === "/" || char === "*") {
                operators.push(char);
                numbers.push(new Big(num));
                num = "";
            } else if (char === "=") {
                numbers.push(new Big(num)); // Push the last number
                let result = (numbers[0]);


                for (let j = 0; j < operators.length; j++) {
                    if (operators[j] === "+") result = result.plus(numbers[j + 1]);
                    else if (operators[j] === "-") result = result.minus(numbers[j + 1]);
                    else if (operators[j] === "*") result = result.times(numbers[j + 1]);
                    else if (operators[j] === "/") {
                        if (Number(numbers[j + 1]) === 0) {
                            alert("Invalid procedure: Division by zero is not allowed");
                            return;
                        } else {
                            result = result.div(numbers[j + 1]);
                        }
                    }
                }
                setHistory2(result);

                setOutput(result.toString()); // Return the final computed value

                return output

            } else {
                num += char;
                console.log('num', num);
            }
        }
    }


    return (
        <>

            <div>
                <a>
                </a>
                <a>
                </a>
            </div>
            <h1>Calculator</h1><h2>Stored Value: {value}</h2>
            <div className="output" placeholder="calculate"><input type="text" value={output} placeholder="calculate" /></div>
            <div className="keyboard"><div>
                <div className="card">
                    <button value="Reset" className={`btn ${isPressedC ? "active" : ""}`} onClick={() => handleclick("Reset")}>C</button><button className={`btn ${isPressedEqual ? "active" : ""}`} onClick={() => handleclick("=")}>=</button><button className={`btn ${isPressedPlus ? "active" : ""}`} onClick={() => handleclick("+")}>+</button><button className={`btn ${isPressedMinus ? "active" : ""}`} onClick={() => handleclick("-")}>-</button>
                </div>
                <div className="card">
                    <button value="7" className={`btn ${isPressed7 ? "active" : ""}`} onClick={() => handleclick("7")}>7</button><button className={`btn ${isPressed8 ? "active" : ""}`} onClick={() => handleclick("8")}>8</button><button className={`btn ${isPressed9 ? "active" : ""}`} onClick={() => handleclick("9")}>9</button><button className={`btn ${isPressedMultiply ? "active" : ""}`} onClick={() => handleclick("*")}>x</button>
                </div>
                <div className="card">
                    <button value="4" className={`btn ${isPressed4 ? "active" : ""}`} onClick={() => handleclick("4")}>4</button><button className={`btn ${isPressed5 ? "active" : ""}`} onClick={() => handleclick("5")}>5</button><button className={`btn ${isPressed6 ? "active" : ""}`} onClick={() => handleclick("6")}>6</button><button className={`btn ${isPressedDivide ? "active" : ""}`} onClick={() => handleclick("/")}>/</button>
                </div>
                <div className="card">
                    <button value='1' className={`btn ${isPressed1 ? "active" : ""}`} onClick={() => handleclick("1")}>1</button><button className={`btn ${isPressed2 ? "active" : ""}`} onClick={() => handleclick("2")}>2</button><button className={`btn ${isPressed3 ? "active" : ""}`} onClick={() => handleclick("3")}>3</button><button className={`btn ${isPressed0 ? "active" : ""}`} onClick={() => handleclick("0")}>0</button>
                </div>
                <div>
                    <button value='Backspace' className={`btnspace ${isPressed ? "active" : ""}`} onClick={() => handleclick("Backspace")}>Backspace</button>
                </div></div>
                <div>
                    <button value='.' className="decimalpoint" onClick={() => handleclick(".")}>.</button>
                </div>
                <div>
                    <button className="memory" onClick={handleUpdate}>Memory</button>
                </div>
                <div>
                    <button className="clear" onClick={handleClear}>Clear</button>
                </div>
                <div className="history"><textarea
                    value={history}
                    onChange={(e) => setText(e.target.value)}
                    rows="4"
                    cols="50"
                    style={{ whiteSpace: "pre-wrap" }}
                /></div>
            </div>
            <p>
            </p>

        </>
    )
}
export default Home;