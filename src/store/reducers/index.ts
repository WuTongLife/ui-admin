import { ReducersMapObject } from "redux";
import { initStateReducer } from "./initState";

const models: ReducersMapObject<Store.Models> = {
  initState: initStateReducer
};

export default models;
