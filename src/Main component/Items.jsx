import ItemsBox from "./ItemsBox";
import NoItems from "./NoItems";
import Spinner from "./Spinner";
import { useContext } from "react";
import { ItemsContext } from "../Context/ItemsContext";
const Items = () => {
  const { loading, deleteItems, filteredItems } =
    useContext(ItemsContext);
  return (
    <>
      {loading ? (
        <Spinner />
      ) : (
        <section>
          {filteredItems.length > 0 ? (
            filteredItems.map((i) => (
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
