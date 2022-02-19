import "./App.css";
import { createContext, useContext, useReducer, useState } from "react";

const ColorHistoryContext = createContext({
  colors: [],
  pushColor: (value) => {},
});

const ColorHistoryProvider = (props) => {
  const [state, dispatch] = useReducer(
    (state, action) => {
      switch (action.type) {
        case "push":
          return { colors: [...state.colors, action.payload] };
        default:
          throw new Error();
      }
    },
    { colors: [] }
  );

  const pushColor = (value) => dispatch({ type: "push", payload: value });

  return (
    <ColorHistoryContext.Provider
      value={{
        colors: state.colors,
        pushColor,
      }}
    >
      {props.children}
    </ColorHistoryContext.Provider>
  );
};

const colorList = ["red", "green", "blue", "black", "orange"];

function getRandomInt(max) {
  return Math.floor(Math.random() * max);
}

function ClickMe() {
  const { colors, pushColor } = useContext(ColorHistoryContext);
  const [color, setColor] = useState(colorList[0]);

  const onClick = () => {
    let newColor;
    if (color === "blue") {
      newColor = "green";
    } else {
      const otherColors = colorList.filter((item) => item !== color);
      newColor = otherColors[getRandomInt(4)];
    }
    setColor(newColor);
    pushColor(newColor);
  };

  return (
    <div style={{ margin: "16px" }}>
      <button
        onClick={onClick}
        style={{ backgroundColor: color, color: "white" }}
      >
        Click me
      </button>
      <div>
        {colors.map((item, index) => {
          return (
            <>
              <span style={{ color: item }} key={index}>
                {item}
              </span>
              {index < colors.length - 1 && ", "}
            </>
          );
        })}
      </div>
    </div>
  );
}

function App() {
  return (
    <ColorHistoryProvider>
      <ClickMe />
    </ColorHistoryProvider>
  );
}

export default App;
