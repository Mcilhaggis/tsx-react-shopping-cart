import { Col, Row } from "react-bootstrap"
import { StoreItem } from "../components/StoreItem"
import storeItems from "../data/items.json"
export function Store() {
    return (
        <>
            <h1>Store</h1>
            {/* Setting up the prefered grid layout and adding a gap vertical and horizontal in our rows */}
            <Row md={2} xs={1} lg={3} className="g-3">
                {storeItems.map(item => (
                    <Col key={item.id}>
                        <StoreItem {...item}> </StoreItem>
                    </Col>
                ))}

            </Row>
        </>
    )
}