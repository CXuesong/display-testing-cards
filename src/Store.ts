import { createStore } from "redux";

import { InitialState, onReduce } from "./Reducers";

const store = createStore(onReduce, InitialState);

export default store;
