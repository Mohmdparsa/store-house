import Styles from "./SearchItems.module.css"
const SearchItems = ()=>{
    return(
        <>
          <div className={Styles.searchDiv}> 
        <div><li className={`fa fa-search  ${Styles.searchIcon}`}></li></div>
          <input type="text" placeholder="search" className={Styles.searchInput}/>
       
        </div>
        </>
    )
}
export default SearchItems