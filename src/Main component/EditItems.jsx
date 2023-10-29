import Styles from "./EditItems.module.css";
import Spinner from "../Main component/Spinner";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import {
  getItemsId,
  getAllGroups,
  updateItems,
} from "../Services/ItemsServices";
const EditItems = () => {
    {console.log("EditItems Arrow function")}
  const [state, setState] = useState({
    loading: false,
    items: {
      fullname: "",
      photo: "",
      model: "",
      desc: "",
      cost: "",
    },
    group: [],
  });
  const navigate = useNavigate();
  const { itemsId } = useParams();

  useEffect(() => {
    {console.log("useEffect")}
    const fetchData = async () => {
      try {
        setState({ ...state, loading: true });
        const { data: getItems } = await getItemsId(itemsId);
        const { data: getAllGroupsData } = await getAllGroups(getItems);
        setState({
          ...state,
           loading: false, items: getItems, groups: getAllGroupsData ,
        });
        {console.log("get data in useEffect")}
      } catch (error) {
        console.log(error.message);
        setState({ ...state, loading: false });
        {console.log("get error of fetchData")}
      }
    };
    fetchData();
  }, []);

  const setItemsInfo = (event) => {
    {console.log("setItemsInfoBegining")}
    setState({
      ...state,
      items: {...state.items , [event.target.name]: [event.target.value] },
    });
    {console.log("setItemsInfoEnd")}
  };

  const onSubmitBtn = async(event)=>{
    event.preventDefault()
    try{
       setState({...state , loading:true})
    const data  = await updateItems(state.items , itemsId); 
    setState({...state , loading:false}) 
    if(data){
        navigate("/Items")
    } 
    }catch(error){
        console.log(error.message)
        setState({...state , loading:false})  
        
    }
  }

  const { loading, items, groups } = state;
  return (
    <>
      {loading ? (
        <Spinner />
      ) : (
        <form onSubmit={onSubmitBtn}>
          <div className={Styles.EditItemsContainer}>
            <table>
              <tr>
                <input
                  type="text"
                  placeholder="name"
                  name="fullname"
                  value={items?.fullname}
                  onChange={setItemsInfo}
                  required={true}
                  className={`${Styles.EditItemsInputs} , ${Styles.EditItemsName}`}
                />
              </tr>
              <tr>
                <input
                  type="text"
                  name="photo"
                  required={true}
                  value={items?.photo}
                  onChange={setItemsInfo}
                  placeholder="image address"
                  className={`${Styles.EditItemsInputs}`}
                />
              </tr>
              <tr>
                <input
                  type="text"
                  placeholder="model"
                  name="model"
                  value={items?.model}
                  onChange={setItemsInfo}
                  required={true}
                  className={`${Styles.EditItemsInputs}`}
                />
              </tr>
              <tr>
                <input
                  type="text"
                  name="const"
                  placeholder="cost"
                  required={true}
                  value={items?.cost}
                  onChange={setItemsInfo}
                  className={`${Styles.EditItemsInputs} , ${Styles.EditItemsCost}`}
                />
              </tr>
              <tr>
                <textarea
                  name="desc"
                  placeholder="description"
                  required={true}
                  value={items?.desc}
                  onChange={setItemsInfo}
                  className={Styles.EditItemsDesc}
                ></textarea>
              </tr>

              <tr>
                {/*to do: fix the choose group */}
                <select
                  name="group"
                  required={true}
                  className={`${Styles.EditItemsInputs}`}
                  value={items?.groups}
                  onChange=""
                >
                  {" "}
                  <option value="group">Choose groups</option>
                  {getAllGroups.length > 0 &&
                   getAllGroups.map((group) => {
                      <option key={group.id} value={group.id}>
                        {group.name}
                      </option>;
                    })}
                </select>
              </tr>
              <tr>
                <input
                  type="submit"
                  value="Submit"
                  className={Styles.EditItemsSubmit}
                />{" "}
                <Link to="/Items">
                  <button className={Styles.EditItemsCancelBtn}>cancel</button>
                </Link>
              </tr>
            </table>
          </div>
        </form>
      )}
    </>
  );
};
export default EditItems;
