const Stock = require("../models/Stock")
const { Op } = require("sequelize");

exports.stockById = async (req, res, next, id) => {
    const stockData = await Stock.findOne({
        where: { id: id }
    }).then(data => {
        if (!data) {

            return res.status(400).json({
                error: "Stock not found"
            });
        }
        req.stock = data;
    }).catch((error) => {

        return res.status(400).json({
            error: error['message']
        });
    });
    next();
}


exports.listStock = async(req,res)=>{
    let stocks  = await Stock.findAll();
    return res.json({
        data:stocks
    })
}

exports.searchStocks = async(req,res)=>{
    let name= req.query.name ? req.query.name:"";
    let stocks  = await Stock.findAll({where:{
        name: {
            [Op.iLike]:`%${name}%`
        }
    }});
    return res.json({
        data:stocks
    })
}

exports.getStock = (req,res)=>{
    return res.json({
        data:req.stock
    })
}