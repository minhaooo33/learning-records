import { createContext ,useReducer} from "react";
import { DUMMY_PRODUCTS } from "../dummy-products";

export const CartContext = createContext({
    items:[],
    AddItemToCart: () => {},
    UpdateItemQuantity: () => {},
});

//這個函數不應該在components執行時重新創建
// 因為它也不需要直接訪問components 函數中定義或更新任何值
function shoppingCartReducer(state,action){

  if(action.type === "ADD_ITEM" ){
    
      const updatedItems = [...state.items];
    
      const existingCartItemIndex = updatedItems.findIndex(
        (cartItem) => cartItem.id === action.payload
      );
      const existingCartItem = updatedItems[existingCartItemIndex];

      if (existingCartItem) {
        const updatedItem = {
          ...existingCartItem,
          quantity: existingCartItem.quantity + 1,
        };
        updatedItems[existingCartItemIndex] = updatedItem;
      } else {
        const product = DUMMY_PRODUCTS.find((product) => product.id ===  action.payload);
        updatedItems.push({
          id:  action.payload,
          name: product.title,
          price: product.price,
          quantity: 1,
        });

        return {
          items: updatedItems,
        };
      }
  } else if (action.type === "UPDATE_ITEM") {

    const updatedItems = [...state.items];
          const updatedItemIndex = updatedItems.findIndex(
            (item) => item.id === action.payload.productId
          );
    
          const updatedItem = {
            ...updatedItems[updatedItemIndex],
          };
    
          updatedItem.quantity += action.payload.amount;
    
          if (updatedItem.quantity <= 0) {
            updatedItems.splice(updatedItemIndex, 1);
          } else {
            updatedItems[updatedItemIndex] = updatedItem;
          }
    
          return {
            ...state,
            //copy old state確保不丟失任何數據
            items: updatedItems,
          };

        };
        return state;
  }

export default function CartContextProvider({children}) {
  const [shoppingCartState, shoppingCartDispath] = useReducer(shoppingCartReducer,{
    items: [],
  });

    
      function handleAddItemToCart(id) {
        shoppingCartDispath({
          type: "ADD_ITEM",
          payload:id,
        });
      }
    
      function handleUpdateCartItemQuantity(productId, amount) {
        shoppingCartDispath({
          type: "UPDATE_ITEM",
          payload:{
            productId,
            amount,
          }
        });
      }
      
      const ctxValue = {
        items: shoppingCartState.items,
        AddItemToCart:handleAddItemToCart,
        UpdateItemQuantity: handleUpdateCartItemQuantity
      }

      return (
        <CartContext.Provider value={ctxValue}>
          {children}
        </CartContext.Provider>
      );
}