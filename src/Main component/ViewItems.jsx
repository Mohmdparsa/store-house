import Styles from "./ViewItems.module.css";
import { Link, useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { getItemsId, getGroupId } from "../Services/ItemsServices";
import Spinner  from "./Spinner";
console.log("top")

const ViewItems = () => {
  const { itemsId } = useParams();
  const [state, setState] = useState({
    loading: false,
    items: {},
    groups: {},
  });
 
//   console.log(loading)

  console.log('topOfTheUseEffect')
  useEffect(() => {
    const fetchData = async () => {
      try {
        console.log("setState")
        setState({ ...state, loading: true });
        const { data: itemData } = await getItemsId(itemsId);
        console.log("this is itemData", itemData)
        const { data: groupData } = await getGroupId(itemData.groups);
        setState({
          ...state,
          loading: false,
          items: itemData,
          groups: groupData,
        });
      } catch (error) {
        console.log(error.message);
        setState({ ...state, loading: false });
      }
    };
    fetchData();
  }, []);

  // here i had an error of state is not iterable because of [] instead of {}
  // i solved this problem dont worry just i want to write this note
  const {loading , items , groups} = state
  console.log("im here")
  console.log("this is items", items) 

  return (
    <>
      {loading ? (
        <Spinner />
      ) : (
        <>
        {/* to do : Object.keys() is not supportedin internet Explorer here we had 404 error 
        We make some change in ItemsServices so we solve the error but our project dont run*/}
          {Object.keys(items).length > 0 && (
            <section>
              {console.log('section')}
              <div className={Styles.ViewItemsContainer}>
                <img src="" alt="" className={Styles.ViewItemsImg} />
                <span className={Styles.ViewItemsLine}></span>
                <div className={Styles.ViewItemsDiv}>
                  <p
                    className={`${Styles.ViewItemsTotal} , ${Styles.ViewItemsName}`}
                  >
                    <b>Name:{items.name}</b>
                  </p>
                  <p className={`${Styles.ViewItemsTotal}`}>
                    <b>Model:{items.model}</b>
                  </p>
                  <p className={`${Styles.ViewItemsTotal}`}>
                    <b>description:{items.desc}</b>
                  </p>
                  <p className={`${Styles.ViewItemsTotal}`}>
                    <b>cost:{items.cost}</b>
                  </p>
                  <p className={`${Styles.ViewItemsTotal}`}>
                    <b>Group:{groups}</b>
                  </p>
                </div>
              </div>
              <Link to="/items">
                {" "}
                <button className={Styles.ViewItemsBackBtn}>Back</button>
              </Link>
            </section>
          )}
        </>
      )}
    </>
  );
};
console.log("end")

export default ViewItems;
