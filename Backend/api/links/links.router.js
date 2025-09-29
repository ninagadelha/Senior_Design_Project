const express = require('express');
const linkController = require('./links.controller')
const router = express.Router();

//define routes and map them to controller methods
router.post("/newlink", linkController.postnewlink);
//router.put("/editprogram", programController.putprogram);
router.post("/getlinks", linkController.getAllLinks);

router.delete("/deletelink", linkController.deleteLink);
module.exports = router;