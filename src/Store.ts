import { createStore } from "redux";

import { InitialState, onReduce } from "./Reducers";

const __REDUX_DEVTOOLS_EXTENSION__ = (window as any).__REDUX_DEVTOOLS_EXTENSION__;

const store = createStore(onReduce, InitialState, __REDUX_DEVTOOLS_EXTENSION__ && __REDUX_DEVTOOLS_EXTENSION__());

export default store;
