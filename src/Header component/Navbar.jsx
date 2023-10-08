import Styles from "./Navbar.module.css"
import SearchItems from "./SearchItems";
import AddItems from "./AddItems";
const Navbar = () => {
    return (
      <>
        <div className={Styles.navbarContainer}>
          <h1 className={Styles.title}>StoreHouse</h1>
          <SearchItems/>
          <AddItems/>
        
        </div>
      </>
    );
  };
  export default Navbar;