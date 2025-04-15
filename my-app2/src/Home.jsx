import { useState, useEffect, useRef } from "react";
import Big from "big.js";
import "./App.css";
import "./MemoryTooltip.jsx";
import "./MemoryButton.jsx";
import TextButtons from "./MemoryButton.jsx";
import NonInteractiveTooltips from "./MemoryTooltip.jsx";
import { useSelector, useDispatch } from "react-redux";
import { updateValue } from "./store/valueSlice";
import { appendText } from "./store/valueSlice";
import { appendMemoryplus } from "./store/valueSlice";
import { appendMemoryminus } from "./store/valueSlice";
import { appendMemorysupply } from "./store/valueSlice";
import { deleteMemory } from "./store/valueSlice";
import { resetHistory } from "./store/valueSlice";
import "./Inputbox.jsx";
import FullWidthTextField from "./Inputbox.jsx";

function Home() {
  let secondoutput = "";
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
  const [isPressedSQR, setIsPressedSQR] = useState(false);
  const [isPressedSQRT, setIsPressedSQRT] = useState(false);
  const [activeTextarea, setActiveTextarea] = useState("textarea1");
  const [active, setActive] = useState("heading1");
  const [items, setItems] = useState([]); // List state
  const [input, setInput] = useState(""); // Input field state

  const [history2, setHistory2] = useState("");
  let prevOutput = "";
  const value = useSelector((state) => state.value.value); // Get current value
  const history = useSelector((state) => state.value.history);
  const memory = useSelector((state) => state.value.memory);
  const dispatch = useDispatch();

  const handleUpdate = () => {
    if (output.trim() !== "") {
      dispatch(updateValue(output)); // Replace stored value
    }
    dispatch(appendText(output));
    console.log("history2", history2);
  };

  const handleMemorysupply = () => {
    dispatch(appendMemorysupply(output));
  };
  const handleClear = () => {
    dispatch(resetHistory(output));
  };

  const handleMemory = () => {
    dispatch(appendMemoryplus(output));
    console.log("memory", output);
  };

  const handleMemoryminus = () => {
    dispatch(appendMemoryminus(output));
    console.log("memory", output);
  };

  const handleMemoryclear = () => {
    dispatch(deleteMemory(output));
  };

  const hasOperatorBetween = (str) => {
    return /[0-9]+\s*[\+\-\*\/]\s*[0-9]+/.test(str);
  };
  console.log("history7", history);
  useEffect(() => {
    // Append new input

    const handleKeyPress = (event) => {
      let value = event.key;
      if (isCalculated && !["+", "-", "/", "*"].includes(value)) {
        setOutput(value);
      } else {
        if (value === "Enter" || value === "=") {
          if (hasOperatorBetween(output)) {
            event.preventDefault();
            setIsPressedEqual(true);
            setOutput((prevOutput) => prevOutput + "=");
            handleUpdate();
            console.log("status", output);
            setTimeout(() => setIsPressedEqual(false), 500);
            calculate(output); // Ensure state update before calculation
            setIsCalculated(true);
          }
        } else if (value === "c") {
          setIsPressedC(true);
          setOutput((prevOutput) => prevOutput.slice(0, -1));
          setTimeout(() => setIsPressedC(false), 500);
        } else if (["+", "-", "/", "*"].includes(value)) {
          setOutput((prevOutput) => prevOutput + value);
          if (value === "+") {
            setIsPressedPlus(true);
            setTimeout(() => setIsPressedPlus(false), 500);
          } else if (value === "-") {
            setIsPressedMinus(true);
            setTimeout(() => setIsPressedMinus(false), 500);
          } else if (value === "/") {
            setIsPressedDivide(true);
            setTimeout(() => setIsPressedDivide(false), 500);
          } else if (value === "*") {
            setIsPressedMultiply(true);
            setTimeout(() => setIsPressedMultiply(false), 500);
          } else
            setOutput((prevOutput) => {
              if (
                prevOutput.length === 0 ||
                ["+", "-", "/", "*"].includes(prevOutput.at(-1))
              ) {
                alert("Can't process consecutive operators.");
                return prevOutput; // Prevent adding an operator at the start or after another operator
              }
              return prevOutput + value;
            });
        } else if (value === "Backspace") {
          setIsPressed(true);
          setOutput((prevOutput) => prevOutput.slice(0, -1));
          setTimeout(() => setIsPressed(false), 500);
        } else if ((value >= "0" && value <= "9") || value === ".") {
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

  //   useEffect(() => {
  //     if (output.endsWith("=")) {
  //         calculate(output);
  //       }
  //   }, [output]);

  useEffect(() => {
    if (isCalculated) {
      secondoutput = "1656";
      console.log("secondoutput printed");
      handleUpdate(output); // Now handleUpdate() gets the correct output
      setIsCalculated(false); // Reset flag
    }
  }, [isCalculated]); // Only runs after calculation

  useEffect(() => {
    async function fetchData() {
      let data = await calculate(output);
      setIsCalculated(true);
    }

    fetchData();
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

  function handleclick(A) {
    if (isCalculated && !["+", "-", "/", "*"].includes(A)) {
      setOutput(A);
    } else if (A === "Squareroot") {
      setOutput(Math.sqrt(output));
    } else if (A === "Square") {
      console.log("atsquare", output);
      setOutput(output ** 2);
    } else if (A === "Reciprocal") {
      setOutput(1 / output);
    } else if (A === "Reset") {
      setOutput("");
    } else if (A === "=") {
      setOutput((prevOutput) => prevOutput + A);
      console.log("output", output);
      calculate(output);
      handleUpdate();
      setIsCalculated(true);
    } else if (A === "Backspace") {
      setOutput((prevOutput) => prevOutput.slice(0, -1));
    } else if (["+", "-", "/", "*"].includes(A)) {
      setOutput((prevOutput) => {
        if (
          prevOutput.length === 0 ||
          ["+", "-", "/", "*"].includes(prevOutput.at(-1))
        ) {
          alert("Can't have consecutive operators");
          return prevOutput; // Prevent adding consecutive operators
        }
        return prevOutput + A;
      });
    } else {
      setOutput((prevOutput) => prevOutput + A);
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
        let result = numbers[0];

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

        return output;
      } else {
        num += char;
        console.log("num", num);
      }
    }
  }

  console.log("check", history);
  return (
    <>
      <header>
        <h1>Calculator</h1>
      </header>
      <div>
        <h2>Stored Value: {value}</h2>
        <div className="holder">
          <div>
            <div className="secondaryoutput">
              <input className="input3" type="text" value="secondoutput" />
            </div>
            <div className="output" placeholder="calculate">
              <input
                className="input2"
                type="text"
                value={output}
                placeholder="0"
              />
            </div>
            <div className="keyboard">
              <div className="card">
                {/* <button className="noborder" onClick={handleMemoryclear}>
                    MC
                    <span class="tooltip-text">Clear all memory (Ctrl+L)</span>
                  </button> */}
                <NonInteractiveTooltips title="memory added">
                  <TextButtons
                    sx={{
                      backgroundColor: "#F3F3F3",
                      color: "text.primary",
                      fontWeight: "light",
                      fontSize: 13,
                      fontWeight: 450,
                      boxShadow: "none",
                      width: 40,
                      height: 40,
                      "&:hover": {
                        backgroundColor: "#E6E6E6",
                      },
                    }}
                    onClick={handleMemoryclear}
                    label="MC"
                  />
                </NonInteractiveTooltips>
                {/* <button className="noborder" onClick={handleUpdate}>
                    MR
                    <span class="tooltip-text">Memory Recall (Ctrl+R)</span>
                  </button> */}
                <NonInteractiveTooltips title="memory added">
                  <TextButtons
                    sx={{
                      backgroundColor: "#F3F3F3",
                      color: "text.primary",
                      fontWeight: "light",
                      fontSize: 13,
                      fontWeight: 450,
                      boxShadow: "none",
                      height: 40,
                      "&:hover": {
                        backgroundColor: "#E6E6E6",
                      },
                    }}
                    onClick={handleUpdate}
                    label="MR"
                  />
                </NonInteractiveTooltips>
                <NonInteractiveTooltips title="memory added">
                  <TextButtons
                    sx={{
                      backgroundColor: "#F3F3F3",
                      color: "text.primary",
                      fontWeight: "light",
                      fontSize: 13,
                      fontWeight: 450,
                      boxShadow: "none",
                      height: 40,
                      "&:hover": {
                        backgroundColor: "#E6E6E6",
                      },
                    }}
                    onClick={handleMemory}
                    label="M+"
                  />
                </NonInteractiveTooltips>

                {/* <button className="noborder" onClick={handleMemoryminus}>
                    M-
                    <span class="tooltip-text">Memory subtract (Ctrl+Q)</span>
                  </button> */}
                <NonInteractiveTooltips title="memory added">
                  <TextButtons
                    sx={{
                      backgroundColor: "#F3F3F3",
                      color: "text.primary",
                      fontWeight: "light",
                      fontSize: 13,
                      fontWeight: 450,
                      boxShadow: "none",
                      height: 40,
                      "&:hover": {
                        backgroundColor: "#E6E6E6",
                      },
                    }}
                    onClick={handleMemoryminus}
                    label="M-"
                  />
                </NonInteractiveTooltips>
                {/* <button className="noborder" onClick={handleMemorysupply}>
                    MS
                    <span class="tooltip-text">Memory store (Ctrl+M)</span>
                  </button> */}
                <NonInteractiveTooltips title="memory added">
                  <TextButtons
                    sx={{
                      backgroundColor: "#F3F3F3",
                      color: "text.primary",
                      fontWeight: "light",
                      fontSize: 13,
                      fontWeight: 450,
                      boxShadow: "none",
                      height: 40,
                      "&:hover": {
                        backgroundColor: "#E6E6E6",
                      },
                    }}
                    onClick={handleMemorysupply}
                    label="MS"
                  />
                </NonInteractiveTooltips>
              </div>
              <div className="card">
                <TextButtons
                  sx={{
                    backgroundColor: "#F9F9F9",
                    color: "#1B1B1B",
                    fontWeight: "light",
                    fontSize: 13,
                    fontWeight: 450,
                    boxShadow: "none",
                    border: "2px solid #E6E6E6",
                    "&:hover": {
                      backgroundColor: "#E6E6E6",
                    },
                  }}
                  label="%"
                />
                {/* <button>%</button> */}
                <TextButtons
                  sx={{
                    backgroundColor: "#F9F9F9",
                    color: "#1B1B1B",
                    fontWeight: "light",
                    fontSize: 13,
                    fontWeight: 450,
                    boxShadow: "none",
                    border: "2px solid #E6E6E6",
                    "&:hover": {
                      backgroundColor: "#E6E6E6",
                    },
                  }}
                  label="CE"
                />
                {/* <button>CE</button> */}
                <TextButtons
                  sx={{
                    backgroundColor: "#F9F9F9",
                    color: "#1B1B1B",
                    fontWeight: "light",
                    fontSize: 13,
                    fontWeight: 450,
                    boxShadow: "none",
                    border: "2px solid #E6E6E6",
                    "&:hover": {
                      backgroundColor: "#E6E6E6",
                    },
                  }}
                  onClick={() => handleclick("Reset")}
                  label="C"
                />
                {/* <button
                    value="Reset"
                    className={`btn ${isPressedC ? "active" : ""}`}
                    onClick={() => handleclick("Reset")}
                  >
                    C
                  </button> */}
                <TextButtons
                  sx={{
                    backgroundColor: "#F9F9F9",
                    color: "#1B1B1B",
                    fontWeight: "light",
                    fontSize: 13,
                    fontWeight: 450,
                    boxShadow: "none",
                    border: "2px solid #E6E6E6",
                    "&:hover": {
                      backgroundColor: "#E6E6E6",
                    },
                  }}
                  onClick={() => handleclick("Reset")}
                  label="BSP"
                />

                {/* <button
                    value="Backspace"
                    className={`btn ${isPressed ? "active" : ""}`}
                    onClick={() => handleclick("Backspace")}
                  >
                    BSP
                  </button> */}
              </div>
              <div className="card">
                <TextButtons
                  sx={{
                    backgroundColor: "#F9F9F9",
                    color: "#1B1B1B",
                    fontWeight: "light",
                    fontSize: 13,
                    fontWeight: 450,
                    boxShadow: "none",
                    border: "2px solid #E6E6E6",
                    "&:hover": {
                      backgroundColor: "#E6E6E6",
                    },
                  }}
                  onClick={() => handleclick("Reciprocal")}
                  label="1/x"
                />
                {/* <button onClick={() => handleclick("Reciprocal")}>1/x</button> */}
                <TextButtons
                  sx={{
                    backgroundColor: "#F9F9F9",
                    color: "#1B1B1B",
                    fontWeight: "light",
                    fontSize: 13,
                    fontWeight: 450,
                    boxShadow: "none",
                    border: "2px solid #E6E6E6",
                    "&:hover": {
                      backgroundColor: "#E6E6E6",
                    },
                  }}
                  onClick={() => handleclick("Square")}
                  label="x^2"
                />
                {/* <button
                    value="Square"
                    className={`btn ${isPressedSQR ? "active" : ""}`}
                    onClick={() => handleclick("Square")}
                  >
                    x^2
                  </button> */}
                <TextButtons
                  sx={{
                    backgroundColor: "#F9F9F9",
                    color: "#1B1B1B",
                    fontWeight: "light",
                    fontSize: 13,
                    fontWeight: 450,
                    boxShadow: "none",
                    border: "2px solid #E6E6E6",
                    "&:hover": {
                      backgroundColor: "#E6E6E6",
                    },
                  }}
                  onClick={() => handleclick("Squareroot")}
                  label="sqrt(x)"
                />
                {/* <button
                    className={`btn ${isPressedSQRT ? "active" : ""}`}
                    onClick={() => handleclick("Squareroot")}
                  >
                    sqrt(x)
                  </button> */}
                <TextButtons
                  sx={{
                    backgroundColor: "#F9F9F9",
                    color: "#1B1B1B",
                    fontWeight: "light",
                    fontSize: 13,
                    fontWeight: 450,
                    boxShadow: "none",
                    border: "2px solid #E6E6E6",
                    "&:hover": {
                      backgroundColor: "#E6E6E6",
                    },
                  }}
                  onClick={() => handleclick("/")}
                  label="÷"
                />
                {/* <button
                    className={`btn ${isPressedDivide ? "active" : ""}`}
                    onClick={() => handleclick("/")}
                  >
                    ÷
                  </button> */}
              </div>
              <div className="card">
                <TextButtons
                  sx={{
                    backgroundColor: "#F9F9F9",
                    color: "#1B1B1B",
                    fontWeight: "light",
                    fontSize: 13,
                    fontWeight: 450,
                    boxShadow: "none",
                    border: "2px solid #E6E6E6",
                    "&:hover": {
                      backgroundColor: "#E6E6E6",
                    },
                  }}
                  onClick={() => handleclick("7")}
                  label="7"
                />
                {/* <button
                    value="7"
                    className={`btn ${isPressed7 ? "active" : ""}`}
                    onClick={() => handleclick("7")}
                  >
                    7
                  </button> */}
                <TextButtons
                  sx={{
                    backgroundColor: "#F9F9F9",
                    color: "#1B1B1B",
                    fontWeight: "light",
                    fontSize: 13,
                    fontWeight: 450,
                    boxShadow: "none",
                    border: "2px solid #E6E6E6",
                    "&:hover": {
                      backgroundColor: "#E6E6E6",
                    },
                  }}
                  onClick={() => handleclick("8")}
                  label="8"
                />
                {/* <button
                    className={`btn ${isPressed8 ? "active" : ""}`}
                    onClick={() => handleclick("8")}
                  >
                    8
                  </button> */}
                <TextButtons
                  sx={{
                    backgroundColor: "#F9F9F9",
                    color: "#1B1B1B",
                    fontWeight: "light",
                    fontSize: 13,
                    fontWeight: 450,
                    boxShadow: "none",
                    border: "2px solid #E6E6E6",
                    "&:hover": {
                      backgroundColor: "#E6E6E6",
                    },
                  }}
                  onClick={() => handleclick("9")}
                  label="9"
                />
                {/* <button
                    className={`btn ${isPressed9 ? "active" : ""}`}
                    onClick={() => handleclick("9")}
                  >
                    9
                  </button> */}
                <TextButtons
                  sx={{
                    backgroundColor: "#F9F9F9",
                    color: "#1B1B1B",
                    fontWeight: "light",
                    fontSize: 13,
                    fontWeight: 450,
                    boxShadow: "none",
                    border: "2px solid #E6E6E6",
                    "&:hover": {
                      backgroundColor: "#E6E6E6",
                    },
                  }}
                  onClick={() => handleclick("*")}
                  label="x"
                />
                {/* <button
                    className={`btn ${isPressedMultiply ? "active" : ""}`}
                    onClick={() => handleclick("*")}
                  >
                    x
                  </button> */}
              </div>
              <div className="card">
                <TextButtons
                  sx={{
                    backgroundColor: "#F9F9F9",
                    color: "#1B1B1B",
                    fontWeight: "light",
                    fontSize: 13,
                    fontWeight: 450,
                    boxShadow: "none",
                    border: "2px solid #E6E6E6",
                    "&:hover": {
                      backgroundColor: "#E6E6E6",
                    },
                  }}
                  onClick={() => handleclick("4")}
                  label="4"
                />
                {/* <button
                    value="4"
                    className={`btn ${isPressed4 ? "active" : ""}`}
                    onClick={() => handleclick("4")}
                  >
                    4
                  </button> */}
                <TextButtons
                  sx={{
                    backgroundColor: "#F9F9F9",
                    color: "#1B1B1B",
                    fontWeight: "light",
                    fontSize: 13,
                    fontWeight: 450,
                    boxShadow: "none",
                    border: "2px solid #E6E6E6",
                    "&:hover": {
                      backgroundColor: "#E6E6E6",
                    },
                  }}
                  onClick={() => handleclick("5")}
                  label="5"
                />
                {/* <button
                    className={`btn ${isPressed5 ? "active" : ""}`}
                    onClick={() => handleclick("5")}
                  >
                    5
                  </button> */}
                <TextButtons
                  sx={{
                    backgroundColor: "#F9F9F9",
                    color: "#1B1B1B",
                    fontWeight: "light",
                    fontSize: 13,
                    fontWeight: 450,
                    boxShadow: "none",
                    border: "2px solid #E6E6E6",
                    "&:hover": {
                      backgroundColor: "#E6E6E6",
                    },
                  }}
                  onClick={() => handleclick("6")}
                  label="6"
                />
                {/* <button
                    className={`btn ${isPressed6 ? "active" : ""}`}
                    onClick={() => handleclick("6")}
                  >
                    6
                  </button> */}
                <TextButtons
                  sx={{
                    backgroundColor: "#F9F9F9",
                    color: "#1B1B1B",
                    fontWeight: "light",
                    fontSize: 13,
                    fontWeight: 450,
                    boxShadow: "none",
                    border: "2px solid #E6E6E6",
                    "&:hover": {
                      backgroundColor: "#E6E6E6",
                    },
                  }}
                  onClick={() => handleclick("-")}
                  label="-"
                />
                {/* <button
                    className={`btn ${isPressedMinus ? "active" : ""}`}
                    onClick={() => handleclick("-")}
                  >
                    -
                  </button> */}
              </div>
              <div className="card">
                <TextButtons
                  sx={{
                    backgroundColor: "#F9F9F9",
                    color: "#1B1B1B",
                    fontWeight: "light",
                    fontSize: 13,
                    fontWeight: 450,
                    boxShadow: "none",
                    border: "2px solid #E6E6E6",
                    "&:hover": {
                      backgroundColor: "#E6E6E6",
                    },
                  }}
                  onClick={() => handleclick("1")}
                  label="1"
                />
                {/* <button
                    value="1"
                    className={`btn ${isPressed1 ? "active" : ""}`}
                    onClick={() => handleclick("1")}
                  >
                    1
                  </button> */}
                <TextButtons
                  sx={{
                    backgroundColor: "#F9F9F9",
                    color: "#1B1B1B",
                    fontWeight: "light",
                    fontSize: 13,
                    fontWeight: 450,
                    boxShadow: "none",
                    border: "2px solid #E6E6E6",
                    "&:hover": {
                      backgroundColor: "#E6E6E6",
                    },
                  }}
                  onClick={() => handleclick("2")}
                  label="2"
                />
                {/* <button
                    className={`btn ${isPressed2 ? "active" : ""}`}
                    onClick={() => handleclick("2")}
                  >
                    2
                  </button> */}
                <TextButtons
                  sx={{
                    backgroundColor: "#F9F9F9",
                    color: "#1B1B1B",
                    fontWeight: "light",
                    fontSize: 13,
                    fontWeight: 450,
                    boxShadow: "none",
                    border: "2px solid #E6E6E6",
                    "&:hover": {
                      backgroundColor: "#E6E6E6",
                    },
                  }}
                  onClick={() => handleclick("3")}
                  label="3"
                />
                {/* <button
                    className={`btn ${isPressed3 ? "active" : ""}`}
                    onClick={() => handleclick("3")}
                  >
                    3
                  </button> */}
                <TextButtons
                  sx={{
                    backgroundColor: "#F9F9F9",
                    color: "#1B1B1B",
                    fontWeight: "light",
                    fontSize: 13,
                    fontWeight: 450,
                    boxShadow: "none",
                    border: "2px solid #E6E6E6",
                    "&:hover": {
                      backgroundColor: "#E6E6E6",
                    },
                  }}
                  onClick={() => handleclick("+")}
                  label="+"
                />
                {/* <button
                    className={`btn ${isPressedPlus ? "active" : ""}`}
                    onClick={() => handleclick("+")}
                  >
                    +
                  </button> */}
              </div>
              <div div className="card">
                <TextButtons
                  sx={{
                    backgroundColor: "#F9F9F9",
                    color: "#1B1B1B",
                    fontWeight: "light",
                    fontSize: 13,
                    fontWeight: 450,
                    boxShadow: "none",
                    border: "2px solid #E6E6E6",
                    "&:hover": {
                      backgroundColor: "#E6E6E6",
                    },
                  }}
                  onClick={() => handleclick("/")}
                  label="+/-"
                />
                {/* <button>+/-</button> */}
                <TextButtons
                  sx={{
                    backgroundColor: "#F9F9F9",
                    color: "#1B1B1B",
                    fontWeight: "light",
                    fontSize: 13,
                    fontWeight: 450,
                    boxShadow: "none",
                    border: "2px solid #E6E6E6",
                    "&:hover": {
                      backgroundColor: "#E6E6E6",
                    },
                  }}
                  onClick={() => handleclick("0")}
                  label="0"
                />
                {/* <button
                  className={`btn ${isPressed0 ? "active" : ""}`}
                  onClick={() => handleclick("0")}
                >
                  0
                </button> */}
                <TextButtons
                  sx={{
                    backgroundColor: "#F9F9F9",
                    color: "#1B1B1B",
                    fontWeight: "light",
                    fontSize: 13,
                    fontWeight: 450,
                    boxShadow: "none",
                    border: "2px solid #E6E6E6",
                    "&:hover": {
                      backgroundColor: "#E6E6E6",
                    },
                  }}
                  onClick={() => handleclick(".")}
                  label="."
                />
                {/* <button value="." onClick={() => handleclick(".")}>
                  .
                </button> */}
                <TextButtons
                  sx={{
                    backgroundColor: "#F9F9F9",
                    color: "#1B1B1B",
                    fontWeight: "light",
                    fontSize: 13,
                    fontWeight: 450,
                    boxShadow: "none",
                    border: "2px solid #E6E6E6",
                    "&:hover": {
                      backgroundColor: "#E6E6E6",
                    },
                  }}
                  onClick={() => handleclick("=")}
                  label="="
                />
                {/* <button
                  className={`btn ${isPressedEqual ? "active" : ""}`}
                  onClick={() => handleclick("=")}
                >
                  =
                </button> */}
              </div>
            </div>
          </div>
          <div className="history">
            <div className="heading">
              <h4
                className={`heading ${active === "heading1" ? "border" : ""}`}
                onClick={() => {
                  setActive("heading1");
                  setActiveTextarea("textarea1");
                }}
              >
                History
              </h4>
              <h4
                className={`heading ${active === "heading2" ? "border" : ""}`}
                onClick={() => {
                  setActive("heading2");
                  setActiveTextarea("textarea2");
                }}
              >
                Memory
              </h4>
            </div>
            {activeTextarea === "textarea1" && (
              <div className="historylist">
                <ul>
                  {history.map((histor, index) => (
                    <li key={index}>{histor}</li>
                  ))}
                </ul>
              </div>
            )}
            {activeTextarea === "textarea2" && (
              <div className="memory">
                <ul>
                  {memory}
                  {/* {memory.map((memor, index) => (
                    <li key={index}>{memor}</li> // Always use a unique "key" when mapping lists in React
                  ))} */}
                </ul>
              </div>
            )}
          </div>
        </div>
      </div>
      <p></p>
    </>
  );
}
export default Home;
