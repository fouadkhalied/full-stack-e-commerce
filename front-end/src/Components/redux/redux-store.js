








import { createStore , applyMiddleware} from "redux";
import reducer1 from "./reducer";


//reducer only allowed to call the redux store
export const Store = createStore (reducer1);

