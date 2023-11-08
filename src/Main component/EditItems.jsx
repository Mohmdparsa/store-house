import Styles from "./EditItems.module.css";
import Spinner from "../Main component/Spinner";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useState, useEffect, useContext } from "react";
import { getItemsId, updateItems } from "../Services/ItemsServices";
import { ItemsContext } from "../Context/ItemsContext";
const EditItems = () => {
  const { loading, setLoading, groups } = useContext(ItemsContext);
  const [item, setItem] = useState({});
  const navigate = useNavigate();
  const { itemsId } = useParams();
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const { data: getItems } = await getItemsId(itemsId);
        setItem(getItems);
        setLoading(false);
      } catch (error) {
        console.log(error.message);
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  //????????????setState
  const onItemsChange = (event) => {
    setItem({
      item: { ...item, [event.target.name]: [event.target.value] },
    });
  };

  const onSubmitBtn = async (event) => {
    event.preventDefault();
    try {
      loading(true);
      const data = await updateItems(item, itemsId);
      setLoading(false);
      if (data) {
        navigate("/Items");
      }
    } catch (error) {
      console.log(error.message);
      setLoading(false);
    }
  };

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
                  value={item?.fullname}
                  onChange={onItemsChange}
                  required={true}
                  className={`${Styles.EditItemsInputs} , ${Styles.EditItemsName}`}
                />
              </tr>
              <tr>
                <input
                  type="text"
                  name="photo"
                  required={true}
                  value={item?.photo}
                  onChange={onItemsChange}
                  placeholder="image address"
                  className={`${Styles.EditItemsInputs}`}
                />
              </tr>
              <tr>
                <input
                  type="text"
                  placeholder="model"
                  name="model"
                  value={item?.model}
                  onChange={onItemsChange}
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
                  value={item?.cost}
                  onChange={onItemsChange}
                  className={`${Styles.EditItemsInputs} , ${Styles.EditItemsCost}`}
                />
              </tr>
              <tr>
                <textarea
                  name="desc"
                  placeholder="description"
                  required={true}
                  value={item?.desc}
                  onChange={onItemsChange}
                  className={Styles.EditItemsDesc}
                ></textarea>
              </tr>

              <tr>
                {/*to do: fix the choose group */}
                <select
                  name="group"
                  required={true}
                  className={`${Styles.EditItemsInputs}`}
                  value={item?.groups}
                  onChange=""
                >
                  {" "}
                  <option value="group">Choose groups</option>
                  {groups.length > 0 &&
                    groups.map((group) => {
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
