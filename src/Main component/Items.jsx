import ItemsBox from "./ItemsBox";
import NoItems from "./NoItems";
import Spinner from "./Spinner";
import { useContext } from "react";
import { ItemsContext } from "../Context/ItemsContext";
const Items = () => {
  const { items, loading, deleteItems } = useContext(ItemsContext);
  return (
    <>
      {loading ? (
        <Spinner />
      ) : (
        <section>
          {items.length > 0 ? (
            items.map((i) => (
              <ItemsBox
                key={i.id}
                ItemsBox={i}
                confirmDelete={() => {
                  deleteItems(i.id, i.fullname);
                }}
              />
            ))
          ) : (
            <NoItems />
          )}
        </section>
      )}
    </>
  );
};

export default Items;
