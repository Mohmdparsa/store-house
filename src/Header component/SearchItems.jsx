import Styles from "./SearchItems.module.css";
const SearchItems = ({query , search}) => {
  return (
    <>
      <div className={Styles.searchDiv}>
        <div>
          <li className={`fa fa-search  ${Styles.searchIcon}`}></li>
        </div>
        <input
          type="text"
          value={query.text}
          onChange={search}
          placeholder="search"
          className={Styles.searchInput}
        />
      </div>
    </>
  );
};
export default SearchItems;
