const {Log}  = require("../models/index")
class LogController {
    static async showLogs(req, res, next) {
        try {
            let data = await Log.findAll({
                order:[['createdAt', 'DESC']]
            })
            res.status(200).json(data)   
        } catch (error) {
            next(error)
        }
    }
}
module.exports = LogController