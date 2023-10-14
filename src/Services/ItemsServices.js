import axios from "axios";

const ServerURL = "http://localhost:9000";

//@desc Get All Items
//@route Get http://localhost:9000/items
export const getAllItems = () => {
  const url = `${ServerURL}/items`;
  return axios.get(url);
};
//@desc Get items with items Id
//@route Get http://localhost:9000/items/:itemsId
 export const getItemsId = (itemsId) => {
  const url = `${ServerURL}/items/${itemsId}`;
  return axios.get(url);
};
//@desc Get All Groups 
//@route Get http://localhost:9000/groups
export  const getAllGroups = () => {
  const url = `${ServerURL}/groups`;
  return axios.get(url);
};
// @desc Get Groups name with Group Id 
// @route GET http://localhost:9000/group/:groupId
export const getGroupId = (groupsId)=>{
    const url = `${ServerURL}/groups/${groupsId}`
    return axios.get(url)
}
