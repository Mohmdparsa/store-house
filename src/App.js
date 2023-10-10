import { Navbar, Items } from "./index.jsx";
import { useState, useEffect } from "react";
import axios from "axios";
const App = () => {
  const [getItems, setItems] = useState([]);
  const [loading, setLoading] = useState(false);
  const [getGroups, setGroups] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const {data : itemsData} = await axios.get("http://localhost:9000/items");
        const {data : groupsData} = await axios.get("http://localhost:9000/groups")
        setItems(itemsData)
        setGroups(groupsData)
        setLoading(false)
      } catch(error){
        console.log(error.message)
        setLoading(false)
      }
    };
    fetchData()
  } ,[]);
  return (
    <div className="App">
      <Navbar />
      <Items getItems={getItems} loading={loading} />
    </div>
  );
};

export default App;
