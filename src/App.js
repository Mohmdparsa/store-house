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
  deleteItems,
} from "./Services/ItemsServices.js";
import { Navigate, Routes, Route, useNavigate } from "react-router-dom";
import { confirmAlert } from "react-confirm-alert";
import { ItemsContext } from "./Context/ItemsContext.js";
const App = () => {
  // @desc ( Items.jsx & ItemsBox.jsx ) for get data with axios from API
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(false);
  const [groups, setGroups] = useState([]);
  const [filteredItems, setFilteredItems] = useState([]);
  const [item, setItem] = useState({});

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const { data: itemsData } = await getAllItems();
        const { data: groupsData } = await getAllGroups();
        setItems(itemsData);
        setFilteredItems(itemsData);
        setGroups(groupsData);
        setLoading(false);
      } catch (error) {
        console.log(error.message);
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  //**********************@desc for make new items in AddItem.jsx*************************

  const onItemsChange = (event) => {
    setItem({ ...item, [event.target.name]: event.target.value });
  };

  const navigate = useNavigate();
  const createItemsForm = async (event) => {
    event.preventDefault();
    try {
      const { status } = await createItems(items);
      if (status === 201) {
        setItems({});
        navigate("/items");
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  //**************** here our code related to confirmAlert & delete button ***************

  const confirmDelete = (ItemsId, Fullname) => {
    confirmAlert({
      customUI: ({ onClose }) => {
        return (
          <div
            className="custom-ui"
            style={{
              width: "400px",
              height: "300px",
              backgroundColor: "#512b81",
              borderRadius: "10px",
              color: "#8cabff",
              textAlign: "center",
              paddingTop: "15px",
            }}
          >
            <h1>Are you sure?</h1>
            <p>You want to delete {Fullname}?</p>
            <button
              style={{
                backgroundColor: "#8cabff",
                width: "120px",
                height: "60px",
                color: "black",
                borderRadius: "10px",
                border: "none",
                marginTop: "100px",
              }}
              onClick={onClose}
            >
              No
            </button>
            <button
              style={{
                backgroundColor: "#8cabff",
                width: "120px",
                height: "60px",
                color: "black",
                borderRadius: "10px",
                border: "none",
                marginLeft: "100px",
                marginTop: "100px",
              }}
              onClick={() => {
                removeItems(ItemsId);
                onClose();
              }}
            >
              Yes, Delete it!
            </button>
          </div>
        );
      },
    });
  };

  const removeItems = async (ItemsId) => {
    try {
      setLoading(true);
      const response = await deleteItems(ItemsId);
      if (response) {
        // here after we delete specific item we want other items show except that one so:
        const { data: getItemsData } = await getAllItems();
        setItems(getItemsData);
        setLoading(false);
      }
    } catch (err) {
      console.log(err.message);
      setLoading(false);
    }
  };

  //**************************here our code related to searching input in Navbar******************************

  let filterTimeout;
  const searchingItems = (query) => {
    clearTimeout(filterTimeout);
    if (!query) return setFilteredItems([...items]);
    filterTimeout = setTimeout(() => {
      setFilteredItems(
        items.filter((item) => {
          return item.fullname.toLowerCase().includes(query.toLowerCase());
        })
      );
    }, 800);
    console.log(query);
  };

  return (
    <ItemsContext.Provider
      value={{
        loading,
        setLoading,
        items,
        setItems,
        item,
        filteredItems,
        groups,
        onItemsChange,
        deleteItems: confirmDelete,
        createItems: createItemsForm,
        itemsSearch: searchingItems,
      }}
    >
      {" "}
      <div className="App">
        <Navbar />

        <Routes>
          <Route path="/" element={<Navigate to="/Items" />} />
          <Route path="/Items" element={<Items />} />
          <Route path="/Items/add" element={<AddItems />} />
          <Route path="/AddItem" element={<AddItem />} />
          {/* here there is a problem , we have two different
         component with same routes but it will show us same output */}
          {/* solve problem : here we have same routes but we need different output for EditItems
         and ViewItems , so because of that we wrote edit between Items and ItemsId 
         and we did the same in ItemsBox for Link */}
          <Route path="/Items/edit/:itemsId" element={<EditItems />} />
          <Route path="/Items/:itemsId" element={<ViewItems />} />
        </Routes>
      </div>
    </ItemsContext.Provider>
  );
};

export default App;
