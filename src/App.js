import {
  Navbar,
  Items,
  AddItems,
  AddItem,
  ViewItems,
  EditItems,
} from "./index.jsx";
import { useState, useEffect } from "react";
import {
  getAllItems,
  getAllGroups,
  createItems,
} from "./Services/ItemsServices.js";
import { Navigate, Routes, Route, useNavigate } from "react-router-dom";
const App = () => {
  // @desc ( Items.jsx & ItemsBox.jsx ) for get data with axios from API
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

  //@desc for make new items in AddItem.jsx
  const [newItems, setNewItems] = useState({
    fullname: "",
    photo: "",
    model: "",
    desc: "",
    cost: "",
    group: "",
  });
  const setItemsInfo = (event) => {
    setNewItems({ ...newItems, [event.target.name]: event.target.value });
  };

  const navigate = useNavigate();
  const createItemsForm = async (event) => {
    event.preventDefault();
    try {
      const { status } = await createItems(getItems);
      if (status === 201) {
        setItems({});
        navigate("/items");
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <div className="App">
      <Navbar />
      <Routes>
        <Route path="/" element={<Navigate to="/Items" />} />
        <Route
          path="/Items"
          element={<Items getItems={getItems} loading={loading} />}
        />
        <Route path="/Items/add" element={<AddItems />} />
        <Route
          path="/AddItem"
          loading={loading}
          setItemsInfo={setItemsInfo}
          newItems={newItems}
          getGroups={getGroups}
          createItemsForm={createItemsForm}
          element={<AddItem />}
        />
        {/* here there is a problem , we have two different
         component with same routes but it will show us same output */}
         {/* solve problem : here we have same routes but we need different output for EditItems
         and ViewItems , so because of that we wrote edit between Items and ItemsId 
         and we did the same in ItemsBox for Link */}
        <Route path="/Items/edit/:itemsId" element={<EditItems />} />
        <Route path="/Items/:itemsId" element={<ViewItems />} />
      </Routes>
    </div>
  );
};

export default App;
