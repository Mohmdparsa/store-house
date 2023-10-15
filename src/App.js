import { Navbar, Items } from "./index.jsx";
import { useState, useEffect } from "react";
import { getAllItems, getAllGroups } from "./Services/ItemsServices.js";
import { BrowserRouter, Navigate, Routes, Route } from "react-router-dom";
import AddItems from "./Header component/AddItems.jsx";
const App = () => {
  const [getItems, setItems] = useState([]);
  const [loading, setLoading] = useState(false);
  const [getGroups, setGroups] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const { data: itemsData } = await getAllItems();
        const { data: groupsData } = await getAllGroups();
        setItems(itemsData);
        setGroups(groupsData);
        setLoading(false);
      } catch (error) {
        console.log(error.message);
        setLoading(false);
      }
    };
    fetchData();
  }, []);
  return (
    <div className="App">
      <Navbar />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Navigate to="/Items" />} />
          <Route
            path="/Items"
            element={<Items getItems={getItems} loading={loading} />}
          />
          <Route path="/Items/add" element={<AddItems/>}/>
        </Routes>
      </BrowserRouter>
    </div>
  );
};

export default App;
