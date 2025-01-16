const express = require("express");
const expenseRouter = express.Router();

const { addExpenseController, editExpenseController, deleteExpenseController, getExpenseByDateController } = require("../controllers/expenseController");

expenseRouter.post("/add-expense", addExpenseController);
expenseRouter.post("/edit-expense", editExpenseController);
expenseRouter.post("/delete-expense", deleteExpenseController);
expenseRouter.post("/all-expenses", getExpenseByDateController)

module.exports = expenseRouter;