import styles from "./AddItems.module.css"
const AddItems = ()=>{
    return(
        <>
        <div className={styles.addItems}>Add new items
            <button className={styles.addItemsBtn}><li className="fa fa-plus"></li>
            </button>
        </div>
        </>
    )
}
export default AddItems