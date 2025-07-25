const express = require("express");
const router = express.Router();
const {
  getBorrowers,
  getBorrowerById,
  createBorrower,
  returnBook,
} = require("../controllers/borrowers");

router.route("/").get(getBorrowers).post(createBorrower);

router.route("/:id").get(getBorrowerById);

router.route("/:id/return").put(returnBook);

module.exports = router;
