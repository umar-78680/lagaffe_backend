const { addAbnormalLoss, findReturnItems, findWeightDiscrepancy, editReturn, editWeightDiscrepancy, findLossOrder, deleteAbnormalLoss, getAllLosses, getAbnormalLossByDate } = require("../modals/abnormalLossModal");
const { findOrder, deleteOrder } = require("../modals/orderModal");

const addAbnormalLossContoller = async (req, res) => {
    let { orderId, issueType, weightDiscrepancy, returnDetails, dateReported } = req.body;

    if (!dateReported) {
        dateReported = Date.now();
    }
    if (!issueType) {
        return res.send({
            status: 400,
            success: false,
            message: "Enter issue type first (e.g., 'return' or 'weight_discrepancy').",
        })
    }

    const addAbnormalLossData = {
        orderId,
        issueType,
        dateReported: dateReported,
    }

    if (issueType === "return") {
        if (!returnDetails || typeof returnDetails !== "number") {
            return res.send({
                status: 400,
                success: false,
                message: "Provide valid return details",
            })
        }
        addAbnormalLossData.returnDetails = returnDetails;
    }

    if (issueType === "weight_discrepancy") {
        if (!weightDiscrepancy || typeof weightDiscrepancy !== "number") {
            return res.send({
                status: 400,
                success: false,
                message: "Provide a valid number for weight discrepancy.",
            })
        }
        addAbnormalLossData.weightDiscrepancy = weightDiscrepancy;
    }

    try {

        const orderDb = await findOrder(orderId);

        if (!orderDb) {
            return res.send({
                status: 404,
                success: false,
                message: "Order is not available",
                error: "Data Invalid",
            })
        }

        if(issueType === "return")
        {
            await deleteOrder(orderId);
        }


        const db = await addAbnormalLoss(addAbnormalLossData);

        return res.send({
            status: 201,
            success: true,
            message: "Abnormal Loss Added Successfully",
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

const findReturnItemsController = async (req, res) => {
     const SKIP = Number(req.query.skip) || 0;
    try {
        const db = await findReturnItems(SKIP);

        if (db.total === 0) {
            return res.send({
                status: 404,
                success: false,
                message: "No Loss Found!",
            })
        }

        return res.send(
            {
                status: 200,
                success: true,
                message: "Read Success",
                data: db.data,
                total: db.total,
            }
        )
    } catch (error) {
        return res.send({
            status: 500,
            success: false,
            message: "Internal Server Error",
            data: error,
        })
    }
}

const findWeightDiscrepancyController = async (req, res) => {
     const SKIP = Number(req.query.skip) || 0;
    try {
        const db = await findWeightDiscrepancy(SKIP);

        if (db.total === 0) {
            return res.send({
                status: 404,
                success: false,
                message: "No Losses Found",
            })
        }

        return res.send(
            {
                status: 200,
                success: true,
                message: "Read Success",
                data: db.data,
                total: db.total,
            }
        )
    } catch (error) {
        return res.send({
            status: 500,
            success: false,
            message: "Internal Server Error",
            data: error,
        })
    }
}

const editReturnController = async (req, res) => {
    const { orderId, returnDetails } = req.body;

    try {
        const db = await editReturn(orderId, returnDetails);

        if (!db) {
            return res.send({
                status: 404,
                success: false,
                message: "Order is not a part of return or order is not available",
                error: "Data Invalid",
            })
        }

        return res.send({
            status: 200,
            success: true,
            message: "Edit successfull",
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


const editWeightDiscrepancyController = async (req, res) => {
    const { orderId, weightDiscrepancy } = req.body;

    try {
        const db = await editWeightDiscrepancy(orderId, weightDiscrepancy);

        if (!db) {
            return res.send({
                status: 404,
                success: false,
                message: "Order is not a part of WeightDiscrepancy or order is not available",
                error: "Data Invalid",
            })
        }

        return res.send({
            status: 200,
            success: true,
            message: "Edit successfull",
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


const deleteAbnormalLossController = async (req, res) => {
    const { orderId } = req.body;

    try {
        const db = await findLossOrder(orderId);

        if (!db) {
            return res.send({
                status: 404,
                success: false,
                message: "Order is not available",
                error: "Data Invalid",
            })
        }

        await deleteAbnormalLoss(orderId);

        return res.send({
            status: 200,
            success: true,
            message: "Delete successfull",
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

const getAllLossesController = async(req,res) => {
    const SKIP = Number(req.query.skip) || 0;
    try {
        const db = await getAllLosses(SKIP);

        if (db.total === 0) {
            return res.send({
                status: 404,
                success: false,
                message: "No Losses Found",
            })
        }

        return res.send(
            {
                status: 200,
                success: true,
                message: "Read Success",
                data: db.data,
                total: db.total,
            }
        )
    } catch (error) {
        return res.send({
            status: 500,
            success: false,
            message: "Internal Server Error",
            data: error,
        })
    }
}



const getAbnormalLossByDateController = async (req, res) => {
    const { startDate, endDate } = req.body;
    console.log("hii");
    const SKIP = req.query.skip ? Number(req.query.skip) : null;
    const LIMIT = req.query.limit ? Number(req.query.limit) : null;

    // Parse dates and set time to 00:00:00 for start date, 23:59:59 for end date
    const start = new Date(startDate);
    start.setHours(0, 0, 0, 0);
    const end = new Date(endDate);
    end.setHours(23, 59, 59, 999);

    // Verify that the start and end dates are valid Date objects
    if (isNaN(start.getTime()) || isNaN(end.getTime())) {
        return res.send({
            status: 400,
            success: false,
            message: "Invalid date format.",
        });
    }

    try {
        const db = await getAbnormalLossByDate(start, end, SKIP, LIMIT);

        if (db.total === 0) {
            return res.send({
                status: 404,
                success: false,
                message: "No Losses Found",
            });
        }
        return res.send({
            status: 200,
            success: true,
            message: "Read Success",
            data: db.data,
            total: db.total,
        });
    } catch (error) {
        return res.send({
            status: 500,
            success: false,
            message: "Internal server error",
            error: error.message,
        });
    }
};



module.exports = { addAbnormalLossContoller, findReturnItemsController, findWeightDiscrepancyController, editReturnController, editWeightDiscrepancyController, deleteAbnormalLossController, getAllLossesController, getAbnormalLossByDateController };