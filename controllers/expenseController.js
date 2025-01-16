const { addExpense, editExpense, deleteExpense, getExpenseByDate } = require("../modals/expensesModal");

async function addExpenseController(req, res) {
    let { title, amount, dateReported } = req.body;

    if (!dateReported) {
        dateReported = Date.now();
    }

    try {

        const obj = { title, amount, dateReported }
        const db = await addExpense(obj);

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


async function editExpenseController(req, res) {
    const { id, title, amount } = req.body;

    try {
        const db = await editExpense(id, amount, title);

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



async function deleteExpenseController(req, res) {
    const { id } = req.body;


    try {
        const db = await deleteExpense(id);

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

const getExpenseByDateController = async (req, res) => {
    const { startDate, endDate } = req.body;
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
        const db = await getExpenseByDate(start, end, SKIP, LIMIT);

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


module.exports = { addExpenseController, editExpenseController, deleteExpenseController, getExpenseByDateController };