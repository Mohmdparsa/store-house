import Styles from "./AddItems.module.css";
import { Link } from "react-router-dom";
const AddItems = () => {
  return (
    <>
  
      <div className={Styles.addItems}>
        Add new items
        <Link to="/AddItem" className={Styles.addItemsBtn}>
          <li className="fa fa-plus"></li>
        </Link>
      </div>
      
    </>
  );
};
export default AddItems;
