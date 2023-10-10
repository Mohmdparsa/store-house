import ItemsBox from "./ItemsBox";
import NoItems from "./NoItems";
import Spinner from "./Spinner";
const Items = ({ getItems, loading }) => {
  return (
    <>
      {loading ? (
        <Spinner />
      ) : (
        <section>
          {getItems.length > 0 ? (
            getItems.map((i) => <ItemsBox key={i.id} ItemsBox={i} />)
          ) : (
            <NoItems />
          )}
        </section>
      )}
    </>
  );
};

export default Items;
