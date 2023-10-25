import Styles from "./ViewItems.module.css";
import { Link, useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { getItemsId, getGroupsId } from "../Services/ItemsServices";
import Spinner from "./Spinner";
console.log("top");

const ViewItems = () => {
  const { itemsId } = useParams();
  const [state, setState] = useState({
    loading: false,
    items: {},
    groups: {},
  });

  console.log("topOfTheUseEffect");
  useEffect(() => {
    const fetchData = async () => {
      try {
        console.log("setState");
        setState((state) => ({ ...state, loading: true }));
        const itemData = await getItemsId(itemsId);
        // const { data: groupData } = await getGroupId(itemData.groups);
        console.log("this is itemsData", itemData);
        setState({
          ...state,
          ...{ loading: false, items: itemData, groups: "groupData" },
        });
      } catch (error) {
        console.log(error.message);
        setState((state) => ({ ...state, loading: false }));
      }
    };
    console.log("this should be itemData", state);

    fetchData();
  }, []);

  // here i had an error of state is not iterable because of [] instead of {}
  // i solved this problem dont worry just i want to write this note
  const { loading, items } = state;
  console.log("im here");
  console.log("this is items", items);

  return (
    <>
      {loading ? (
        <Spinner />
      ) : (
        <>
          {Object.keys(items).length > 0 && (
            <section>
              {console.log("section")}
              <div className={Styles.ViewItemsContainer}>
                <img src="" alt="" className={Styles.ViewItemsImg} />
                <span className={Styles.ViewItemsLine}></span>
                <div className={Styles.ViewItemsDiv}>
                  <p
                    className={`${Styles.ViewItemsTotal} , ${Styles.ViewItemsName}`}
                  >
                    <span className={Styles.ViewItemsHeadLine}>Name: </span>
                    {items.fullname}
                  </p>
                  <p className={`${Styles.ViewItemsTotal}`}>
                    <span className={Styles.ViewItemsHeadLine}>Model: </span>
                    {items.model}
                  </p>
                  <p className={`${Styles.ViewItemsTotal}`}>
                    <span className={Styles.ViewItemsHeadLine}>
                      description:{" "}
                    </span>
                    {items.desc}
                  </p>
                  <p className={`${Styles.ViewItemsTotal}`}>
                    <span className={Styles.ViewItemsHeadLine}>cost: </span>
                    {items.cost}
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
console.log("end");

export default ViewItems;
