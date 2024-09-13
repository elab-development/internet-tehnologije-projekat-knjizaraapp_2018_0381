import { Button, Col, Container, Row, Table } from "react-bootstrap"
import { Order } from "../types"
import { useState } from "react"
import OrderItemsModalTable from "./OrderItemsModalTable"

interface AdminOrdersTableProps {
    orders: Order[]
}

const AdminOrdersTable: React.FC<AdminOrdersTableProps> = ({ orders }) => {

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
                        <th>Sifra</th>
                        <th>Kupac</th>
                        <th>Iznos</th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                    {orders.map((order, i) => (
                        <tr key={order.id}>
                            <td>{i + 1}</td>
                            <td>{order.user.name}</td>
                            <td>{order.total_amount.toFixed(2)} RSD</td>
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

export default AdminOrdersTable