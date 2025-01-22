const abnormalLossSchema = require("../schemas/abnormalLossSchema");

function addAbnormalLoss(addAbnormalLossData) {
    return new Promise(async (resolve, reject) => {
        try {
            const obj = new abnormalLossSchema(addAbnormalLossData);

            const db = await obj.save();

            resolve(db);
        } catch (error) {
            reject(error);
        }
    });
}

function findReturnItems(SKIP = 0) {
    return new Promise(async (resolve, reject) => {
        try {

            const totalEntries = await abnormalLossSchema.aggregate([
                {
                    $match: { issueType: "return" },
                },
                {
                    $count: "totalCount",
                }
            ]);


            if (totalEntries.length === 0) {
                resolve({
                    data: [],
                    total: 0,
                })
            }

            const db = await abnormalLossSchema.aggregate([
                {
                    $match: { issueType: "return" },
                },
                {
                    $sort: { 
                        dateReported: -1 // Sort by dateReported, latest first
                    }
                },
                {
                    $skip: SKIP,
                },
                {
                    $limit: 10,
                }
            ]);

            resolve({
                data: db,
                total: totalEntries[0].totalCount,
            })
        } catch (error) {
            reject(error);
        }
    })
}

function findWeightDiscrepancy(SKIP = 0) {
    return new Promise(async (resolve, reject) => {
        try {

            const totalEntries = await abnormalLossSchema.aggregate([
                {
                    $match: { issueType: "weight_discrepancy" },
                },
                {
                    $count: "totalCount",
                }
            ]);



            if (totalEntries.length === 0) {
                resolve({
                    data: [],
                    total: 0,
                })
            }

            const db = await abnormalLossSchema.aggregate([
                {
                    $match: { issueType: "weight_discrepancy" },
                },
                {
                    $sort: { 
                        dateReported: -1 // Sort by dateReported, latest first
                    }
                },
                {
                    $skip: SKIP,
                },
                {
                    $limit: 10,
                }
            ]);
            resolve({
                data: db,
                total: totalEntries[0].totalCount,
            })
        } catch (error) {
            reject(error);
        }
    })
}

function editReturn(orderId, returnDetails) {
    return new Promise(async (resolve, reject) => {
        try {
            const orderDb = await abnormalLossSchema.findOneAndUpdate(
                { orderId, issueType: "return" },
                { $set: { returnDetails } },
                { new: true, runValidators: true }
            )

            resolve(orderDb);
        } catch (error) {
            reject(error);
        }
    })
}

function editWeightDiscrepancy(orderId, weightDiscrepancy) {
    return new Promise(async (resolve, reject) => {
        try {
            const orderDb = await abnormalLossSchema.findOneAndUpdate(
                { orderId, issueType: "weight_discrepancy" },
                { $set: { weightDiscrepancy } },
                { new: true, runValidators: true }
            )

            resolve(orderDb);
        } catch (error) {
            reject(error);
        }
    })
}

function findLossOrder(orderId) {
    return new Promise(async (resolve, reject) => {
        try {
            const db = await abnormalLossSchema.findOne({ orderId });
            resolve(db);
        } catch (error) {
            reject(error);
        }
    })
}

function deleteAbnormalLoss(orderId) {
    return new Promise(async (resolve, reject) => {
        try {
            const orderDb = await abnormalLossSchema.findOneAndDelete({ orderId });
            resolve(orderDb);
        } catch (error) {
            reject(error);
        }
    })
}

function getAllLosses(SKIP = 0) {
    return new Promise(async (resolve, reject) => {
        try {
            const totalEntries = await abnormalLossSchema.countDocuments();

            if (totalEntries === 0) {
                resolve({
                    data: [],
                    total: 0,
                })
            }

            const db = await abnormalLossSchema.aggregate([
                {
                    $sort: { 
                        dateReported: -1 // Sort by dateReported, latest first
                    }
                },
                {
                    $skip: SKIP // Skip the first SKIP entries for pagination
                },
                {
                    $limit: 10 // Limit the results to 10 for pagination
                }
            ]);

            resolve({
                data: db,
                total: totalEntries,
            })
        } catch (error) {
            reject(error);
        }
    })
}


const getAbnormalLossByDate = (startDate, endDate, SKIP = null, LIMIT = null) => {
    return new Promise(async (resolve, reject) => {
        try {
            const totalEntries = await abnormalLossSchema.aggregate([
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

            const db = await abnormalLossSchema.aggregate(pipeline);

            resolve({
                data: db,
                total: totalEntries[0].totalCount,
            });
        } catch (error) {
            reject(error);
        }
    });
};


module.exports = { addAbnormalLoss, findReturnItems, findWeightDiscrepancy, editReturn, editWeightDiscrepancy, findLossOrder, deleteAbnormalLoss, getAllLosses, getAbnormalLossByDate };