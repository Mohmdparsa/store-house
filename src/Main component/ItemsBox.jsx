import styles from "./ItemsBox.module.css"
const ItemsBox = ({ItemsBox}) => {
    return (
      <>
        <div className={styles.itemsBox}>
          
            <img className={styles.imageDiv} src={ItemsBox.photo} alt={ItemsBox.fullname} />
          <td>
            <div className={styles.itemsName}>
              <tr>{ItemsBox.fullname}</tr>
            </div>
            <div className={styles.itemsModel}>
              <tr>{ItemsBox.model}</tr>
            </div>
            <div className={styles.itemsId}>
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
                <button className={styles.eyeButton}>
                  <li className="fa fa-eye "></li>
                </button>
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
      </>
    );
  };
  
  export default ItemsBox;