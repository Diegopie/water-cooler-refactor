const router = require('express').Router();

router
    .route('/id')
    .post((req, res) => {
        console.log(req.sessionID, ' : this is the sessionID');
        res.json({ success: true, sessionID: req.sessionID });
    });

module.exports = router;