import { Button, Col, Container, Row, Table } from "react-bootstrap"
import { Order } from "../types"
import { useState } from "react"
import OrderItemsModalTable from "../components/OrderItemsModalTable"

interface OrdersTableProps {
    orders: Order[]
}

const OrdersTable: React.FC<OrdersTableProps> = ({ orders }) => {

    const [showInvoiceDetailsModal, setShowOrderDetailsModal] = useState(false)
    const [selectedOrder, setSelectedOrder] = useState<Order | null>(null)


    const handleShowOrderDetailsModal = (order: Order) => {
        setSelectedOrder(order)
        setShowOrderDetailsModal(true)
    }

    return (
        <>
            <Table striped bordered hover>
                <thead>
                    <tr>
                        <th>#</th>
                        <th>Sifra porudžbine</th>
                        <th>Ukupan iznos</th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                    {orders.map((order, i) => (
                        <tr key={order.id}>
                            <td>{i + 1}</td>
                            <td>{order.id}</td>
                            <td>{order.total_amount} RSD</td>
                            <td>
                                <Button onClick={() => handleShowOrderDetailsModal(order)}>
                                    Vidi detalje
                                </Button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </Table>
            <OrderItemsModalTable
                show={showInvoiceDetailsModal}
                onHide={() => setShowOrderDetailsModal(false)}
                order={selectedOrder} />
        </>
    )
}

export default OrdersTable