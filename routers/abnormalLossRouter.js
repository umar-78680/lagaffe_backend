const express = require("express");
const abnormalLossrouter = express.Router();

const {addAbnormalLossContoller, findReturnItemsController, findWeightDiscrepancyController, editReturnController, editWeightDiscrepancyController, deleteAbnormalLossController, getAllLossesController, getAbnormalLossByDateController} = require("../controllers/abnormalLossController");


abnormalLossrouter.post("/add-abnormal-loss", addAbnormalLossContoller);
abnormalLossrouter.get("/returns", findReturnItemsController);
abnormalLossrouter.get("/weight-discrepancy", findWeightDiscrepancyController);
abnormalLossrouter.post("/edit-return", editReturnController);
abnormalLossrouter.post("/edit-weight-discrepancy", editWeightDiscrepancyController);
abnormalLossrouter.post("/delete", deleteAbnormalLossController);
abnormalLossrouter.get("/all-losses", getAllLossesController);
abnormalLossrouter.post("/all-losses-byDate", getAbnormalLossByDateController);


module.exports = abnormalLossrouter;