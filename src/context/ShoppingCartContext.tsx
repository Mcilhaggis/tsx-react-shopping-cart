import { createContext, useContext, ReactNode, useState } from "react";
import { ShoppingCart } from "../components/ShoppingCart";
import { useLocalStorage } from "../hooks/useLocalStorage"

type ShoppingCartProviderProps = {
    children: ReactNode
}

//Dont need more info since with ID we can find all infomration with just ID and name
type CartItem = {
    id: number
    quantity: number
}

type ShoppingCartContext = {
    openCart: () => void
    closeCart: () => void
    getItemQuantity: (id: number) => number
    increaseQuantity: (id: number) => void
    decreaseQuantity: (id: number) => void
    removeFromCart: (id: number) => void
    cartQuantity: number
    cartItems: CartItem[]
}

const ShoppingCartContext = createContext({} as ShoppingCartContext
)

// Return calling use context only
export function useShoppingCart() {
    return useContext(ShoppingCartContext)
}

// for returning the provider portion of the context - which gives all the values needed, and all the code rendering on the shopping artz
// Proivder needs obj and children in it. 
export function ShoppingCartProvider({ children }: ShoppingCartProviderProps) {
    // Store all the cart information
    const [isOpen, setIsOpen] = useState(false)
    // Stop the items dissapearing from cart on refresh
    const [cartItems, setCartItems] = useLocalStorage<CartItem[]>(
        "shopping-cart",
        []
    )
    const cartQuantity = cartItems.reduce(
        // sum all the different item quantities for items in our cart
        (quantity, item) => item.quantity + quantity, 0)

    const openCart = () => setIsOpen(true)
    const closeCart = () => setIsOpen(false)

    function getItemQuantity(id: number) {
        // if id exists return the quantity other wise return nothing
        return cartItems.find(item => item.id === id)?.quantity || 0
    }

    function increaseQuantity(id: number) {
        setCartItems(currItems => {
            // look to see if the item exists and if not...
            if (currItems.find(item => item.id === id) == null) {
                // ...spread the current items, addthe item and increase the quantity by one 
                return [...currItems, { id, quantity: 1 }]
            } else {
                // else 
                return currItems.map(item => {
                    if (item.id === id) {
                        // return all the same values of the item and increase the item by one
                        return { ...item, quantity: item.quantity + 1 }
                        // Otherwise return the item as it is
                    } else { return item }
                })
            }
        })
    }

    function decreaseQuantity(id: number) {
        setCartItems(currItems => {
            // look to see if the item exists and has a total of one. If yes...
            if (currItems.find(item => item.id === id)?.quantity == 1) {
                // ...filter out the item and return the list with that item removed
                return currItems.filter(item => item.id !== id)
            } else {
                // else 
                return currItems.map(item => {
                    if (item.id === id) {
                        // return all the same values of the item and decrease the item by one
                        return { ...item, quantity: item.quantity - 1 }
                        // Otherwise return the item as it is
                    } else { return item }
                })
            }
        })
    }

    function removeFromCart(id: number) {
        setCartItems(currItems => {
            return currItems.filter(item => item.id !== id)
        })
    }



    return (
        <ShoppingCartContext.Provider value={{
            getItemQuantity,
            increaseQuantity,
            decreaseQuantity,
            removeFromCart,
            cartItems,
            cartQuantity,
            openCart,
            closeCart
        }}>
            {children}
            <ShoppingCart isOpen={isOpen} />
        </ShoppingCartContext.Provider >
    )
}