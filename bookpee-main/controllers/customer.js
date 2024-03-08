var connect_DB = require('../model/DAO/connect_db');


module.exports = {
    getBookDetail:function(req,res){
        console.log("///////////////////////");
        const sql = 'SELECT * FROM book WHERE book_id=?';
        connect_DB.query(sql, [
            req.body.book_id,
        ], function (err, result, field) {
            if (err) {
                console.log("///////////////////////");
                res.status(500).json({ message:err|| "Hệ thống gặp vấn đề. Vui lòng thử lại sau" });
                return;
            }
            else {
                const mappedResult = {
                    title: result[0].title || '',
                    readingAge: result[0].reading_age || 0,
                    price: result[0].price || '',
                    language: result[0].language_ || '',
                    edition: result[0].edition || '',
                    publicationDate: result[0].publication_date || '',
                    publisher: result[0].publisher_name || '',
                    isbn: result[0].isbn || '',
                    providerId: result[0].provider_id || '',
                    quantity: result[0].quantity || 0,
                    authors: result[0].authors || [''],
                    kindDetail: result[0].kindDetail || {},
                  };
                res.json({message:"Lấy thông tin sách thành công", bookData:mappedResult});
                return;
            }
        })
    },
}