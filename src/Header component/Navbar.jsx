import Styles from "./Navbar.module.css"
import SearchItems from "./SearchItems";
const Navbar = () => {
    return (
      <>
        <div className={Styles.navbarContainer}>
          <h1 className={Styles.title}>StoreHouse</h1>
          <SearchItems/>
        
        </div>
      </>
    );
  };
  export default Navbar;