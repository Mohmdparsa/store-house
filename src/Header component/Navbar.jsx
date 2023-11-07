import Styles from "./Navbar.module.css";
import SearchItems from "./SearchItems";
import { useLocation } from "react-router-dom";
import AddItems from "./AddItems";
const Navbar = () => {
  const location = useLocation();
  return (
    <>
      <div className={Styles.navbarContainer}>
        <h1 className={Styles.title}>StoreHouse</h1>
        {location.pathname === "/Items" ? (
          <SearchItems />
        ) : null}

        <AddItems />
      </div>
    </>
  );
};
export default Navbar;
