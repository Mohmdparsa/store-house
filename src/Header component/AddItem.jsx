import Styles from "./AddItem.module.css";
import Spinner from "../Main component/Spinner";
import { Link } from "react-router-dom";
import { useContext } from "react";
import { ItemsContext } from "../Context/ItemsContext";
const AddItem = () => {
  const {loading ,  onItemsChange , item ,  createItems , groups} = useContext(ItemsContext)
  return (
    <>
      {loading ? (
        <Spinner />
      ) : (
        <form onSubmit={createItems}>
          <div className={Styles.AddItemContainer}>
            <table>
              <tr>
                <input
                  type="text"
                  placeholder="name"
                  name="fullname"
                  value={item?.fullname}
                  onChange={onItemsChange}
                  required={true}
                  className={`${Styles.AddItemInputs} , ${Styles.AddItemName}`}
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
                  className={`${Styles.AddItemInputs}`}
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
                  className={`${Styles.AddItemInputs}`}
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
                  className={`${Styles.AddItemInputs} , ${Styles.AddItemCost}`}
                />
              </tr>
              <tr>
                <textarea
                  name="desc"
                  placeholder="description"
                  required={true}
                  value={item?.desc}
                  onChange={onItemsChange}
                  className={Styles.AddItemDesc}
                ></textarea>
              </tr>

              <tr>
                {/*to do: fix the choose group */}
                <select
                  name="group"
                  required={true}
                  className={`${Styles.AddItemInputs}`}
                  value={item?.group}
                  onChange={onItemsChange}
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
                  className={Styles.AddItemSubmit}
                />{" "}
                <Link to="/Items">
                  <button className={Styles.AddItemCancelBtn}>cancel</button>
                </Link>
              </tr>
            </table>
          </div>
        </form>
      )}
    </>
  );
};
export default AddItem;
