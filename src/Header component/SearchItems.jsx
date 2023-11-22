import Styles from "./SearchItems.module.css";
import { useContext } from "react";
import { ItemsContext } from "../Context/ItemsContext";
const SearchItems = () => {
  const { itemsSearch } = useContext(ItemsContext);
  return (
    <>
      <div className={Styles.searchDiv}>
        <div>
          <li className={`fa fa-search  ${Styles.searchIcon}`}></li>
        </div>
        <input
          type="text"
          onChange={(e) => itemsSearch(e.target.value)}
          placeholder="search"
          className={Styles.searchInput}
        />
      </div>
    </>
  );
};
export default SearchItems;
