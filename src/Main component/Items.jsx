import ItemsBox from "./ItemsBox";
import NoItems from "./NoItems";
const Items = (Items) => {
  return(
    <>
    {
      Items.length>0 ? Items.map(i =>(
        <ItemsBox key={i.id} Items={i}/>
      )): <NoItems/>
    }
     
   
    
    </>
  );
};

export default Items;
