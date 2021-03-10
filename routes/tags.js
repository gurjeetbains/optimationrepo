const express = require("express")
const router = express.Router();
const reqCheck = require('../checks/reqCheck');// Module for error checks
/**
 * Function to extract value between tags
 * @param {String} data 
 * @param {String} tag 
 */
function extract(data, tag) {
    let s = data;
    let prefix = '<' + tag + '>'
    let suffix = '</' + tag + '>'
    let i = s.indexOf(prefix);
    if (i >= 0) {
        s = s.substring(i + prefix.length);
    } else {
        return '';
    }
    if (suffix) {
        i = s.indexOf(suffix);
        if (i >= 0) {
            s = s.substring(0, i);
        } else {
            return '';
        }
    }
    return s
};
router.get('/extractTags', async (req, res) => {
    try {
        const errors = reqCheck(req);
        if (Object.keys(errors).length) {
            return res.status(500).json(errors);
        }
        let total = extract(req.body.data, 'total')
        let cost_centre = extract(req.body.data, 'cost_centre')
        if (!cost_centre) {
            cost_centre = 'UNKNOWN'
        }
        let value = total/1.15 // Assuming GST is 15%
        let gstValue = total - value
        res.send({
            "status": "success",
            "value": value,
            "gstValue": gstValue,
            "cost_centre": cost_centre
        });
    } catch (err) {// Error scenario to handle something that we have missed
        console.log(`Recieved error in catch ${err}`);
        res.status(500).send({
            error: "There is something wrong"
        })
    }
});

module.exports = router;