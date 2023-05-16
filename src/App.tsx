import { useState, useEffect } from "react";
import "./App.css";
import DynamicTable from "./components/DynamicTable";

function App() {
  const [data, setData] = useState<Record<string, any>>({});

  useEffect(() => {
    const fetchData = async () => {
      // Fetch the data from the local JSON file and update the state
      const response = await fetch("data.json");
      const json = await response.json();

      setData(json);
    };

    fetchData();
  }, []);

  return (
    <div className="App">
      <h1>Dynamic JSON Table</h1>
      <DynamicTable data={data} />
    </div>
  );
}

export default App;
