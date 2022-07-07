const express = require("express");
const router = express.Router();

router.get('/favicon.ico', (req, res) =>   res.status(200).end());
router.get('', (req, res) => res.send('iron maiden'));

module.exports = router;