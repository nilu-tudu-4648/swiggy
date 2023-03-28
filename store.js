import { configureStore } from "@reduxjs/toolkit";
import CartReducer from "./redux/CartReducer";
import rootReducer from "./redux/rootReducer";
import modalReducer from "./redux/modalReducer";


export default configureStore({
    reducer: {
        cart: CartReducer,
        root: rootReducer,
        modal: modalReducer,
    }
})