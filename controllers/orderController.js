const { addOrder, editOrder, findOrder, deleteOrder } = require("../modals/orderModal");
const { validation } = require("../utils/validation");

async function addOrderController(req, res) {
    const { orderId, customerName, items, shippingAmount, totalAmount } = req.body;

    try {
        const db = await addOrder(orderId, customerName, items, shippingAmount, totalAmount);

        return res.send({
            status: 201,
            success: true,
            message: "Order Add successfully",
            data: db,
        })
    } catch (error) {
        return res.send({
            status: 500,
            success: false,
            message: "Internal Server Error",
            data: error,
        })
    }
}



async function findOrderController(req, res) {
    const { orderId } = req.body;
    try {
        const db = await findOrder(orderId);

        if (!db) {
            return res.send({
                status: 404,
                success: false,
                message: "Order is not available",
                error: "Data Invalid",
            })
        }

        return res.send({
            status: 200,
            success: true,
            message: "Read Success",
            data: db,
        })
    } catch (error) {
        return res.send({
            status: 500,
            success: false,
            message: "Internal Server Error",
            data: error,
        })
    }
}

async function editOrderController(req, res) {
    const { orderId, customerName, items, shippingAmount, totalAmount } = req.body;

    const isOrderAvailable = await findOrder(orderId);

    if (!isOrderAvailable) {
        return res.send({
            status: 404,
            success: false,
            message: "Order is not available",
            error: "Data Invalid",
        })
    }

    try {
        const db = await editOrder(orderId, customerName, items, shippingAmount, totalAmount);

        return res.send({
            status: 200,
            success: true,
            message: "Order Edit successfull",
            data: db,
        })
    } catch (error) {
        return res.send({
            status: 500,
            success: false,
            message: "Internal server error",
            error: error,
        });
    }
}


async function deleteOrderController(req, res) {
    const {orderId} = req.body;
    try {
        const db = await deleteOrder(orderId);

        if(!db.data)
        {
            return res.send({
                status: 404,
                success: false,
                message: "Order is not available!",
            })
        }

        return res.send({
            status: 200,
            success: true,
            message: "Order Delete successfull",
            data: db,
        })
    } catch (error) {
        return res.send({
            status: 500,
            success: false,
            message: "Internal server error",
            error: error,
        });
    }
}




module.exports = { addOrderController, editOrderController, findOrderController, deleteOrderController };