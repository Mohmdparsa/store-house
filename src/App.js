import {
  Navbar,
  Items,
  AddItems,
  AddItem,
  ViewItems,
  EditItems,
} from "./index.jsx";
import { useEffect } from "react";
import {
  getAllItems,
  getAllGroups,
  createItems,
  deleteItems,
} from "./Services/ItemsServices.js";
import { Navigate, Routes, Route, useNavigate } from "react-router-dom";
import { confirmAlert } from "react-confirm-alert";
import { ItemsContext } from "./Context/ItemsContext.js";
import _ from "lodash";
import { useImmer } from "use-immer";
const App = () => {
  // @desc ( Items.jsx & ItemsBox.jsx ) for get data with axios from API
  const [items, setItems] = useImmer([]);
  const [loading, setLoading] = useImmer(false);
  const [groups, setGroups] = useImmer([]);
  const [filteredItems, setFilteredItems] = useImmer([]);

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

  const navigate = useNavigate();
  const createItemsForm = async (values) => {
    setLoading((draft) => !draft);

    const { status, data } = await createItems(values);
    if (status === 201) {
      setItems({});
      navigate("/items");
      setItems((draft) => {
        draft.push(data);
      });
      setFilteredItems((draft) => {
        draft.push(data);
      });
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
    const itemsBackUp = [...items];
    try {
      setLoading((draft) => !draft);
      const response = await deleteItems(ItemsId);
      if (response) {
        // here after we delete specific item we want other items show except that one so:
        setItems((draft) => {
          draft.filter((c) => c.id !== ItemsId);
        });
        setFilteredItems((draft) => {
          draft.filter((c) => c.id !== ItemsId);
        });
        setLoading(false);
      }
    } catch (err) {
      console.log(err.message);
      setLoading((draft) => !draft);
    }
  };

  //**************************here our code related to searching input in Navbar******************************

  const searchingItems = _.debounce((query) => {
    if (!query) return setFilteredItems([...items]);
    setFilteredItems((draft) =>
      draft.filter((item) =>
        item.fullname.toLowerCase().includes(query.toLowerCase())
      )
    );
    console.log(query);
  }, 800);

  return (
    <ItemsContext.Provider
      value={{
        loading,
        setLoading,
        items,
        setItems,
        filteredItems,
        groups,
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
