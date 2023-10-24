import styles from "./ItemsBox.module.css"
import { Link } from "react-router-dom";
import ViewItems from "./ViewItems";
import Items from "./Items";
const ItemsBox = ({ItemsBox}) => {
    return (
      <>
      <div className={styles.itemsBoxContainer}>
        <div className={styles.itemsBox}>
          
            <img className={styles.imageDiv} src={ItemsBox.photo} alt={ItemsBox.fullname} />
          <td>
            <div className={styles.itemsName}>
              <tr>{ItemsBox.fullname}</tr>
            </div>
            <div className={styles.itemsModel}>
              <tr>{ItemsBox.model}</tr>
            </div>
            <div className={styles.itemsDesc}>
              <tr>{ItemsBox.desc}</tr>
            </div>
            <div className={styles.itemsCost}>
              <tr>{ItemsBox.cost}</tr>
            </div>
          </td>
          <td className={styles.itemsButton}>
            <div className={styles.btnDiv}>
              <tr>
                <button className={styles.editButton}>
                  <li className="fa fa-edit "></li>
                </button>
              </tr>
            </div>
  
            <div className={styles.btnDiv}>
              <tr>
                <Link to={`/Items/${ItemsBox.id}`}>
                <button className={styles.eyeButton}>
                  <li className="fa fa-eye "></li>
                </button>
                </Link>
              </tr>
            </div>
  
            <div className={styles.btnDiv}>
              <tr>
                <button className={styles.trashButton}>
                  <li className="fa fa-trash "></li>
                </button>
              </tr>
            </div>
          </td>
        </div>
        </div>
      </>
    );
  };
  
  export default ItemsBox;