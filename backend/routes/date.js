const router = require('express').Router();

router.get('/', async(req, res)=>{
    dataServer = new Date();
    let c = 5;
    res.status(200).json({
        serverData: dataServer
    });
});

module.exports = router;