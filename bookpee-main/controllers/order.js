var connect_DB = require('../model/DAO/connect_db');


module.exports = {
    getAllGenres: function (req, res) {
        connect_DB.query("call show_all_genres()", function (err, result, field) {
            if (err) {
                res.status(500).json({ message: "Hệ thống gặp vấn đề. Vui lòng thử lại sau" });
            }
            else {
                res.json(result)
            }
        })
    
    },
    filter: function(req, res){
        if (req.body.criteria.price == '') price = null
        else price = req.body.criteria.price
        if (req.body.criteria.genres == '') genres = null
        else genres = req.body.criteria.genres
        if (req.body.criteria.name == '') name_ = null
        else name_ = req.body.criteria.name
        connect_DB.query("call filter_book(?, ?, ?, ?)", [genres, price, req.body.criteria.order, name_], function (err, result, field) {
            if (err) {
                console.log(err.sqlState)
                res.status(500).json({ message: "Hệ thống gặp vấn đề. Vui lòng thử lại sau" });
            }
            else {
                res.json(result)
            }
        })
    },
    getDetail: function(req, res){
        connect_DB.query("call show_book_info(?)", [req.body.book_id], function (err, result, field) {
            if (err) {
                res.status(500).json({ message: "Hệ thống gặp vấn đề. Vui lòng thử lại sau" });
            }
            else {
                console.log(result)
                res.json(result)
            }
        })
    },
    favorAuthor: function(req, res){
        connect_DB.query("call bought_book(?, ?)", [req.body.id, req.body.criteria], function (err, result, field) {
            if (err) {
                res.status(500).json({ message: "Hệ thống gặp vấn đề. Vui lòng thử lại sau" });
            }
            else {
                console.log(result)
                res.json(result)
            }
        })
    },
    createOrder: function(req, res) {
        if (req.body.address === "") req.body.address = null;
        if (req.body.name === "") req.body.name = null;
        if (req.body.phone === "") req.body.phone = null;
        if (req.body.shipment_type === "") req.body.shipment_type = null;
        if (req.body.payment_method === "") req.body.payment_method = null;
        connect_DB.query("call add_order(?, ?, ?, ? , ? , ? , ? , @A)", [req.body.address, req.body.name, req.body.phone, req.body.shipment_type, req.body.payment_method, req.body.customer_id, req.body.provider_id], function (err, result, field) {
            if (err) {
                res.status(500).json({ message: err.sqlMessage || "Hệ thống gặp vấn đề. Vui lòng thử lại sau" });
            }
            else {
                res.json(result)
            }
        })
    },
    addBookToOrder: function(req, res) {
        console.log(req.body);
        let k = 0;
        const promises = [];
    
        for (let book_id in req.body.bookQuantities) {
            if (req.body.bookQuantities[book_id] > 0) {
                console.log("SQL");
                const queryPromise = new Promise((resolve, reject) => {
                    connect_DB.query("call add_book_to_order(?, ?, ?)", [req.body.order_id, Number(book_id), Number(req.body.bookQuantities[book_id])], function (err, result, field) {
                        if (err) {
                            k = k + 1;
                            console.log("ERRORR");
                            console.log(book_id);
                            console.log(err.sqlMessage);
                            reject(err.sqlMessage || "Hệ thống gặp vấn đề. Vui lòng thử lại sau");
                        } else {
                            resolve(result);
                        }
                    });
                });
                promises.push(queryPromise);
            }
        }
    
        Promise.all(promises)
            .then(() => {
                res.json({});
                console.log("Out");
            })
            .catch(error => {
                res.status(500).json({ message: error });
            });
        
    },
    addPromotionCode: function (req, res) {
        if (req.body.promotion_code === "") req.body.promotion_code = null
        connect_DB.query("call add_promotion_code(?, ?)", [req.body.order_id, req.body.promotion_code], function (err, result, field) {
            if (err) {
                res.status(500).json({ message: err.sqlMessage || "Hệ thống gặp vấn đề. Vui lòng thử lại sau" });
            }
            else {
                res.json(result)
            }
        })
    },
    confirm: function (req, res) {
        console.log("this is confirm")
        connect_DB.query("call confirm_order(?, ?)", [req.body.order_id, req.body.customer_id], function (err, result, field) {
            if (err) {
                console.log(err)
                res.status(500).json({ message: err.sqlMessage || "Hệ thống gặp vấn đề. Vui lòng thử lại sau" });
            }
            else {
                res.json(result)
            }
        })
    },
    delete: function(req, res){
        connect_DB.query("call delete_order(?)", [req.body.order_id], function (err, result, field) {
            if (err) {
                console.log(err)
                res.status(500).json({ message: err.sqlMessage || "Hệ thống gặp vấn đề. Vui lòng thử lại sau" });
            }
            else {
                res.json(result)
            }
        })
    },
    calc_price_with_promo: function(req, res) {
        connect_DB.query(`call cal_price_order(?)`, [req.body.order_id], function (err, result, field) {
            if (err) {
                res.status(500).json({ message: err.sqlMessage || "Hệ thống gặp vấn đề. Vui lòng thử lại sau" });
            }
            else {
                res.json(result)
            }
        })
    },

}
    