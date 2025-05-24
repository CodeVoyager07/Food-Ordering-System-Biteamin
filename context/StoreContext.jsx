import { createContext, useEffect, useState } from "react";
import axios from "axios"

export const StoreContext = createContext(null);

const StoreContextProvider = (props) => {
    const [cartItems, setCartItems] = useState({});
    const url = "http://localhost:4000/api"
    const [token, setToken] = useState("");
    const [food_list, setFoodList] = useState([])

    const addToCart = async (itemId) => {
        if(!cartItems[itemId]){
            setCartItems((prev)=>({...prev, [itemId]:1}))
        }
        else{
            setCartItems((prev)=> ({...prev, [itemId]:prev[itemId]+1}))
        }
        if (token) {
            await axios.post(url+"/cart/add",{itemId},{headers:{Authorization: `Bearer ${token}`}})
        }
    }

    const removeFromCart = async (itemId) => {
        setCartItems((prev)=> ({...prev, [itemId]:prev[itemId]-1}))
        if (token) {
            await axios.post(url+"/cart/remove",{itemId},{headers:{Authorization: `Bearer ${token}`}})
        }
    }

    const getTotalCartAmount = () => {
        let totalAmount = 0;
        for(const item in cartItems){
            if(cartItems[item] > 0){
                let itemInfo = food_list.find((product) => product._id === item);
                totalAmount += itemInfo.price*cartItems[item];
            }
        }
        return totalAmount;
    }

    const fetchFoodList = async () => {
        const response = await axios.get(url+"/food/list")
        setFoodList(response.data.data)
    }

    const loadCartData = async (token) => {
        try {
            const response = await axios.post(
                `${url}/cart/get`,
                {},
                {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }
            );
            setCartItems(response.data.cartData || {});
        } catch (error) {
            console.error("Error loading cart:", error);
            setCartItems({});
        }
    }

    useEffect(() => {
        async function loadData() {
            try {
                await fetchFoodList();
                const storedToken = localStorage.getItem("token");
                if (storedToken) {
                    setToken(storedToken);
                    await loadCartData(storedToken);
                }
            } catch (error) {
                console.error("Initialization error:", error);
            }
        }
        loadData();
    }, [])

    const clearCart = async () => {
        setCartItems({});
        if (token) {
            await axios.post(url+"/cart/clear",{},{headers:{Authorization: `Bearer ${token}`}})
        }
    }

    const contextValue = {
        food_list,
        cartItems,
        setCartItems,
        addToCart,
        removeFromCart,
        getTotalCartAmount,
        url,
        token,
        setToken,
        clearCart
    }

    return (
        <StoreContext.Provider value={contextValue}>
            {props.children}
        </StoreContext.Provider>
    )
}

export default StoreContextProvider;
