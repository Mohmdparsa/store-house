import Styles from "./AddItem.module.css";
import Spinner from "../Main component/Spinner";
import { Link } from "react-router-dom";
const AddItem = (
  { loading, setItemsInfo, newItems, createItemsForm },
  getGroups
) => {
  return (
    <>
      {loading ? (
        <Spinner />
      ) : (
        <form onSubmit={createItemsForm}>
          <div className={Styles.AddItemContainer}>
            <table>
              <tr>
                <input
                  type="text"
                  placeholder="name"
                  name="fullname"
                  value={newItems?.fullname}
                  onChange={setItemsInfo}
                  required={true}
                  className={`${Styles.AddItemInputs} , ${Styles.AddItemName}`}
                />
              </tr>
              <tr>
                <input
                  type="text"
                  name="photo"
                  required={true}
                  value={newItems?.photo}
                  onChange={setItemsInfo}
                  placeholder="image address"
                  className={`${Styles.AddItemInputs}`}
                />
              </tr>
              <tr>
                <input
                  type="text"
                  placeholder="model"
                  name="model"
                  value={newItems?.model}
                  onChange={setItemsInfo}
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
                  value={newItems?.cost}
                  onChange={setItemsInfo}
                  className={`${Styles.AddItemInputs} , ${Styles.AddItemCost}`}
                />
              </tr>
              <tr>
                <textarea
                  name="desc"
                  placeholder="description"
                  required={true}
                  value={newItems?.desc}
                  onChange={setItemsInfo}
                  className={Styles.AddItemDesc}
                ></textarea>
              </tr>

              <tr>
                {/*to do: fix the choose group */}
                <select
                  name="group"
                  required={true}
                  className={`${Styles.AddItemInputs}`}
                  value={newItems?.group}
                  onChange={setItemsInfo}
                >
                  {" "}
                  <option value="group">Choose groups</option>
                  {getGroups.length > 0 &&
                    getGroups.map((group) => {
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
