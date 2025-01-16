const expensesSchema = require("../schemas/expensesSchema");


const addExpense = (expensesData) => {
    return new Promise(async (resolve, reject) => {
        try {
            const obj = new expensesSchema(expensesData);

            const db = await obj.save();

            resolve(db);
        } catch (error) {
            reject(error);
        }
    })
}


const editExpense = (id, amount, title) => {
    return new Promise(async (resolve, reject) => {
        try {
            const expenseDb = await expensesSchema.findOneAndUpdate(
                { _id: id },
                { $set: { amount, title } },
                { new: true, runValidators: true }
            )

            resolve(expenseDb);
        } catch (error) {
            reject(error);
        }
    })
}

const deleteExpense = (id) => {
    return new Promise(async (resolve, reject) => {
        try {
            const expenseDb = await expensesSchema.findOneAndDelete({ _id: id });
            resolve(expenseDb);
        } catch (error) {
            reject(error);
        }
    })
}

const getExpenseByDate = (startDate, endDate, SKIP = null, LIMIT = null) => {
    return new Promise(async (resolve, reject) => {
        try {
            const totalEntries = await expensesSchema.aggregate([
                {
                    $match: {
                        dateReported: {
                            $gte: startDate,
                            $lt: endDate,
                        },
                    },
                },
                {
                    $count: "totalCount",
                },
            ]);

            if (totalEntries.length === 0) {
                resolve({
                    data: [],
                    total: 0,
                });
                return;
            }

            const pipeline = [
                {
                    $match: {
                        dateReported: {
                            $gte: startDate,
                            $lt: endDate,
                        },
                    },
                },
            ];

            // Add pagination stages conditionally
            if (SKIP !== null) {
                pipeline.push({ $skip: SKIP });
            }
            if (LIMIT !== null) {
                pipeline.push({ $limit: LIMIT });
            }

            const db = await expensesSchema.aggregate(pipeline);

            resolve({
                data: db,
                total: totalEntries[0].totalCount,
            });
        } catch (error) {
            reject(error);
        }
    });
};




module.exports = { addExpense, editExpense, deleteExpense, getExpenseByDate };