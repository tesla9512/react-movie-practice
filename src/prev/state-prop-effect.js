// import Button from "./Button";
import styles from "./App.module.css";
import { useState, useEffect } from "react";

function App() {
  const [counter, setCounter] = useState(0);
  const [keyword, setKeyword] = useState("");
  const onClick = () => setCounter((prev) => prev + 1);
  const onChange = (event) => setKeyword(event.target.value);

  console.log("call forever");

  const once = () => {
    console.log("call once");
  };

  useEffect(once, []);
  useEffect(() => {
    console.log("call once too");
  }, []);
  useEffect(() => {
    if (keyword !== "" && keyword.length > 2) {
      console.log("search for", keyword);
    }
  }, [keyword]);

  return (
    <div>
      <input
        value={keyword}
        onChange={onChange}
        type="text"
        placeholder="Search here..."
      />
      <h1 className={styles.title}>{counter}</h1>
      {/* <Button text={"Good"} /> */}
      <button onClick={onClick}>Plus</button>
    </div>
  );
}

export default App;
