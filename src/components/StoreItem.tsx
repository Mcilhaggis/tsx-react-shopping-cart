import { Card, Button } from "react-bootstrap"
import { formatCurrency } from "../utilities/formatCurrency"
import { useShoppingCart } from "../context/ShoppingCartContext"


type StoreItemProps = {
    id: number,
    name: string,
    price: number,
    imgUrl: string
}

export function StoreItem({ id, name, price, imgUrl }: StoreItemProps) {
    const { getItemQuantity, increaseQuantity, decreaseQuantity, removeFromCart} = useShoppingCart()
    const quantity = getItemQuantity(id)
    return <Card className="h-100">
        <Card.Img
            variant="top"
            src={imgUrl}
            height="200px"
            style={{ objectFit: "cover" }}
        />
        <Card.Body className="d-flex flex-column" >
            <Card.Title className="d-flex justify-content-between align-items-baseline mb-4">
                {/* fs-2 font size */}
                <span className="fs-2">{name}</span>
                {/* ms-2 is margin at start, so they stay spaced */}
                <span className="ms-2 text-muted">{formatCurrency(price)}</span>

            </Card.Title>
            {/* mt-auto so it fills the rest ofthe space in the flexbox container */}
            <div className="mt-auto">
                {quantity === 0 ? (
                    <Button className="w-100 shadow-sm btn-secondary" onClick={() => increaseQuantity(id)}>Add to cart</Button>
                    // Gives vertical column with everything aligned in the center in the middle 
                ) : <div className="d-flex align-items-center flex-column" style={{ gap: ".5rem" }}>
                    <div className="d-flex align-items-center justify-content-center" style={{ gap: ".5rem" }}>
                        <Button  onClick={() => increaseQuantity(id)}>+</Button>
                        <span className="fs-4">{quantity}</span> in cart
                        <Button  onClick={() => decreaseQuantity(id)}>-</Button>
                    </div>
                    <Button variant="danger" size="sm" onClick={() => removeFromCart(id)}>Remove</Button>
                </div>}
            </div>
        </Card.Body>
    </Card >
}
