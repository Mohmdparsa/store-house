import styles from "./NoItems.module.css";
const NoItems = () => {
  return (
    <>
      <div className={styles.NoItemsContainer}>
        <p className={styles.NoItemsSentence}>There is no item!</p>
      </div>
    </>
  );
};

export default NoItems;
