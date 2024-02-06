const router = require("express").Router();
const transactionController = require("../controllers/transactionController");
const { verifyAndAuthorization, verifyToken, verifyAndAdmin } = require("../middleware/verifyToken");

router.post("/create_transaction", verifyToken, transactionController.createTransaction);
router.get("/get_transactions", verifyToken, transactionController.getTransactions);


module.exports = router;