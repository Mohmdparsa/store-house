import { createContext } from "react";

export const ItemsContext = createContext({
  loading: false,
  setLoading: () => {},
  item: {},
  setItem: () => {},
  items: {},
  filteredItems: [],
  itemsQuery: [],
  groups: [],
  onContactChange: () => {},
  deleteItems: () => {},
  updateItems: () => {},
  createItems: () => {},
  itemsSearch: () => {},
});
