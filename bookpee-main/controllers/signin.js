
var connect_DB = require('../model/DAO/connect_db');
var jwt = require("jsonwebtoken");

module.exports = {
    getRole: async function(req, res, next) {
        try {
            const token = await req.headers.authorization.split(" ")[1];
            const decodeToken = await jwt.verify(token, "RANDOM-TOKEN");
            const cur_member = await decodeToken;
            req.cur_member = cur_member;
            res.status(200).json({role:cur_member.role,user_id:cur_member.user_id})
        }
        catch (error) {
            res.status(401).json({ message: "Người dùng chưa đăng nhập hoặc phiên đã hết hạn" });
        }
    },
    signin: function (req, res) {
        role=req.body.role;
        user_id=req.body.user_id;
        if (role==='customer'){
            connect_DB.query('Select * from customer Where customer_id=?', [
                user_id
            ],function (err, results, field)  {
                if (err) {
                    console.log(err);
                    res.status(500).json({ message: "Hệ thống gặp vấn đề. Vui lòng thử lại sau" });
                    return;
                } else if (results.length===0){
                    // Fetch the value of the OUT parameter from the result set
                    res.status(500).json({ message: "Không tồn tại id" });
                    
                }else{
                    let member = {
                        user_id: results[0].customer_id,
                        role: 'customer'
                    };
                    const token = jwt.sign(member, "RANDOM-TOKEN", { expiresIn: "15m" });
                    res.json({ member: member, token });
                }
            })
        }
        else if (role==='provider'){
            connect_DB.query('Select * from provider Where provider_id=?', [
                user_id
            ],function (err, results, field)  {
                if (err) {
                    console.log(err);
                    res.status(500).json({ message: "Hệ thống gặp vấn đề. Vui lòng thử lại sau" });
                    return;
                } else if (results.length===0){
                    // Fetch the value of the OUT parameter from the result set
                    res.status(500).json({ message: "Không tồn tại id" });
                    
                }else{
                    let member = {
                        user_id: results[0].provider_id,
                        role: 'provider'
                    };
                    const token = jwt.sign(member, "RANDOM-TOKEN", { expiresIn: "40m" });
                    res.json({ member: member, token });
                }
            })
        }
        
    }
}