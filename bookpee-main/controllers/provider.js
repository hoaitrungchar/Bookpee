var connect_DB = require('../model/DAO/connect_db');
async function updateBookType(req,res){
    const sql = 'CALL update_book_type_(?, ?, ?, ?, ?, ?, ?, ?, ?)';
    const bookRequest=req.body.bookData.kindDetail;
    ['kindOfBook',
    'kindle_size',
    'kindle_paper_length',
    'physical_format',
    'physical_status',
    'physical_dimensions',
    'physical_weight',
    'physical_paper_length',
    'audio_size',
    'audio_time'].forEach(attribute => {
        if (!(attribute in bookRequest) || bookRequest[attribute] === '') {
            bookRequest[attribute] = null;
            console.log(attribute);
        }
    });
    sqlParam=[
        bookRequest.kindOfBook!==null? bookRequest.kindOfBook.charAt(0).toUpperCase() +  bookRequest.kindOfBook.slice(1) + 'Book':null,
        req.body.bookId,
        bookRequest.kindOfBook === 'kindle' ? bookRequest.kindle_size : (bookRequest.kindOfBook === 'audio' ? bookRequest.audio_size : null),
        bookRequest.kindOfBook === 'kindle' ? bookRequest.kindle_paper_length : (bookRequest.kindOfBook === 'physical' ? bookRequest.physical_paper_length : null),
        bookRequest.kindOfBook === 'audio' ? bookRequest.audio_time : null ,
        bookRequest.kindOfBook === 'physical' ? bookRequest.physical_format : null,
        bookRequest.kindOfBook === 'physical' ? bookRequest.physical_dimensions : null,
        bookRequest.kindOfBook === 'physical' ? bookRequest.physical_weight : null,
        bookRequest.kindOfBook === 'physical' ? bookRequest.physical_status : null,
    ];
    console.log('update book type', sqlParam)
    connect_DB.query(sql,sqlParam , async function (err, results, field)  {
        if (err) {
            console.log(err);
            res.status(500).json({ message: err.sqlMessage || "Hệ thống gặp vấn đề. Vui lòng thử lại sau" });
            return;
        } else {
            res.status(200).json({message:'Cập nhật thông tin sách thành công'});
            return;
        }
    })
}
async function addBookType(req,res,book_id){
    const sql = 'CALL add_book_type_(?, ?, ?, ?, ?, ?, ?, ?, ?)';
    const bookRequest=req.body.bookData.kindDetail;
    ['kindOfBook',
    'kindle_size',
    'kindle_paper_length',
    'physical_format',
    'physical_status',
    'physical_dimensions',
    'physical_weight',
    'physical_paper_length',
    'audio_size',
    'audio_time'].forEach(attribute => {
        if (!(attribute in bookRequest) || bookRequest[attribute] === '') {
            bookRequest[attribute] = null;
            console.log(attribute);
        }
    });
    sqlParam=[
        bookRequest.kindOfBook!==null? bookRequest.kindOfBook.charAt(0).toUpperCase() +  bookRequest.kindOfBook.slice(1) + 'Book':null,
        book_id,
        bookRequest.kindOfBook === 'kindle' ? bookRequest.kindle_size : (bookRequest.kindOfBook === 'audio' ? bookRequest.audio_size : null),
        bookRequest.kindOfBook === 'kindle' ? bookRequest.kindle_paper_length : (bookRequest.kindOfBook === 'physical' ? bookRequest.physical_paper_length : null),
        bookRequest.kindOfBook === 'audio' ? bookRequest.audio_time : null ,
        bookRequest.kindOfBook === 'physical' ? bookRequest.physical_format : null,
        bookRequest.kindOfBook === 'physical' ? bookRequest.physical_dimensions : null,
        bookRequest.kindOfBook === 'physical' ? bookRequest.physical_weight : null,
        bookRequest.kindOfBook === 'physical' ? bookRequest.physical_status : null,
    ];
    console.log('add book type', sqlParam)
    connect_DB.query(sql,sqlParam , async function (err, results, field)  {
        if (err) {
            console.log(err);
            res.status(500).json({ message: err.sqlMessage || "Hệ thống gặp vấn đề. Vui lòng thử lại sau" });
            return;
        } else {
            const authors = req.body.bookData.authors || [];
            const genres = req.body.bookData.genres || [];
            
            console.log(authors)
            try {
                if (genres.length === 0) {
                    await new Promise((resolve, reject) => {
                        addGenre('', book_id, (err) => {
                            if (err) {
                                reject(new Error(err));
                            } else {
                                resolve();
                            }
                        });
                    });
                }
        
                for (const author of authors) {
                    await new Promise((resolve, reject) => {
                        addWrite(author, book_id, (err) => {
                            if (err) {
                                reject(new Error(err));
                            } else {
                                resolve();
                            }
                        });
                    });
                }
        
                for (const genre of genres) {
                    await new Promise((resolve, reject) => {
                        addGenre(genre, book_id, (err) => {
                            if (err) {
                                reject(new Error(err));
                            } else {
                                resolve();
                            }
                        });
                    });
                }
        
                // If the loop completes without errors, you can send a success response
                res.status(200).json({ message: "Thêm sách thành công book_id:" + book_id });
            } catch (error) {
                console.error('//////////////error///', error);
                res.status(400).json({ message: error.message });
            }
        }
    })
}
async function addWrite(penname, book_id, callback) {
    console.log('addwrite ', penname, book_id);
    const sql = 'CALL add_write_(?, ?)';
    connect_DB.query(sql, [penname, book_id], function (err, results, field) {
        if (err) {
            callback(err.sqlMessage);
        } else {
            callback(null);
        }
    });
}

async function addGenre(genre, book_id, callback) {
    console.log('addgenre ', genre, book_id);
    const sql = 'CALL add_genres_(?, ?)';
    connect_DB.query(sql, [genre, book_id], function (err, results, field) {
        if (err) {
            callback(err.sqlMessage);
        } else {
            callback(null);
        }
    });
}

module.exports = {

    createBook: function (req, res) {
        console.log("controller createBook", req.body.bookData);
        const sql = 'CALL add_book(?, ?, ?, ?, ?, ?, ?, ?, ?, ?, @ret_value)';
        connect_DB.query(sql, [
            (req.body.bookData.title === '') ? null : req.body.bookData.title,
            (req.body.bookData.readingAge === '') ? null : req.body.bookData.readingAge,
            (req.body.bookData.price === '') ? null : req.body.bookData.price,
            (req.body.bookData.language === '') ? null : req.body.bookData.language,
            (req.body.bookData.edition === '') ? null : req.body.bookData.edition,
            (req.body.bookData.publicationDate === '') ? null : req.body.bookData.publicationDate,
            (req.body.bookData.publisher === '') ? null : req.body.bookData.publisher,
            (req.body.bookData.isbn === '') ? null : req.body.bookData.isbn,
            (req.body.providerId === '') ? null : req.body.providerId,
            (req.body.bookData.quantity === 0) ? null : req.body.bookData.quantity,
        ], function (err, results, field)  {
            if (err) {
                console.log(err);
                res.status(500).json({ message: err.sqlMessage || "Hệ thống gặp vấn đề. Vui lòng thử lại sau" });
                return;
            } else {
                // Fetch the value of the OUT parameter from the result set
                console.log(results);
                const returnBookId = results[0][0].return_book_id;
                console.log("Inserted book ID:", returnBookId);
                addBookType(req,res,returnBookId);
                return;
            }
        });
    },
    
    getBookDetail:function(req,res){
        console.log("////2///////////////////");

        connect_DB.query("call show_book_info(?)", [req.body.book_id], function (err, result, field) {
            if (err) {
                console.log(111);
                res.status(500).json({ message: err.sqlMessage||"Hệ thống gặp vấn đề. Vui lòng thử lại sau" });
            }
            else if (result.length == 0||result[0].length == 0) {
                console.log(result);
                console.log('get detail length=0');

                res.status(400).json({ message: "Không tồn tại sách" });
            }
            else {
                console.log(result[0]);
                console.log("////3///////////////////");
                // Extract unique genres
                const uniqueGenres = [...new Set(result[0].map(book => book.genres))];

                // Extract unique pen names
                const uniquePenNames = [...new Set(result[0].map(book => book.penname))];
                console.log(uniqueGenres);
                console.log(uniquePenNames)

                const mappedResult = {
                    title: result[0][0].title || '',
                    readingAge: result[0][0].reading_age || 0,
                    price: result[0][0].price || '',
                    language: result[0][0].language_ || '',
                    edition: result[0][0].edition || '',
                    publicationDate: result[0][0].publication_date || '',
                    publisher: result[0][0].publisher_name || '',
                    isbn: result[0][0].isbn || '',
                    providerName: result[0][0].provider_name || '',
                    quantity: result[0][0].quantity || 0,
                    penname: uniquePenNames || '',
                    maxDiscount: result[0][0].max_discount || '',
                    genres:uniqueGenres||'',
                    // authors: result[0].authors || [''],
                    // kindDetail: result[0].kindDetail || {},
                };
                for (const key in result[0][0]) {
                    if (result[0][0].hasOwnProperty(key)) {
                      // Check if the property has a specific prefix
                      if (key.startsWith('audio_')||key.startsWith('rating_') || key.startsWith('kindle_') || key.startsWith('physical_')) {
                        const prefix = key.split('_')[0]; // Get the prefix (audio, kindle, physical)
                        if (!mappedResult[prefix]) {
                          mappedResult[prefix] = {};
                        }
                        // Assign the property to the corresponding prefix
                        mappedResult[prefix][key] = result[0][0][key] || 0;
                      }
                    }
                  }
                console.log(mappedResult);
                res.json({message:"Lấy thông tin sách thành công", bookData:mappedResult});
                return;
            }
        })
    },
    updateBook:function(req,res){
        console.log('controller update_book',req.body);
        console.log('controller update_book',req.body.bookId);

        const sql = 'CALL update_book(?,?,?,?,?,?,?,?,?,?)';
        connect_DB.query(sql, [
        req.body.bookId,
        (req.body.bookData.title === '') ? null : req.body.bookData.title,
        (req.body.bookData.readingAge === '') ? null : req.body.bookData.readingAge,
        (req.body.bookData.price === '') ? null : req.body.bookData.price,
        (req.body.bookData.language === '') ? null : req.body.bookData.language,
        (req.body.bookData.edition === '') ? null : req.body.bookData.edition,
        (req.body.bookData.publicationDate === '') ? null : req.body.bookData.publicationDate,
        (req.body.bookData.publisher === '') ? null : req.body.bookData.publisher,
        (req.body.bookData.isbn === '') ? null : req.body.bookData.isbn,
        (req.body.bookData.quantity === 0) ? null : req.body.bookData.quantity,
        ], (error, results) => {
        if (error) {
            // Handle the error
            console.error(error);
            res.status(500).json({message:error.sqlMessage||"Hệ thống gặp vấn đề. Vui lòng thử lại sau"});
            return;
        } else {
            // Handle the success
            updateBookType(req,res);
        }
        });
        // const sql = 'UPDATE book SET title = ?, reading_age = ?, price = ?, language_ = ?, edition = ?, publication_date = ?, publisher_name = ?, quantity = ?, isbn = ? WHERE book_id=? AND provider_id = ?';
        // connect_DB.query(sql, [
        // req.body.bookData.title,
        // req.body.bookData.readingAge,
        // req.body.bookData.price,
        // req.body.bookData.language,
        // req.body.bookData.edition,
        // req.body.bookData.publicationDate,
        // req.body.bookData.publisher,
        // req.body.bookData.quantity,
        // req.body.bookData.isbn,
        // req.body.bookId,
        // req.body.providerId,
        // ], (error, results) => {
        // if (error) {
        //     // Handle the error
        //     console.error(error);
        //     res.status(500).json({message:error||"Hệ thống gặp vấn đề. Vui lòng thử lại sau"});
        //     return;
        // } else {
        //     // Handle the success
        //     res.status(200).json({message:'Cập nhật thông tin sách thành công'});
        //     console.log('Cập nhật thông tin sách thành công');
        //     return;
        // }
        // });
    },
    getAllBooks: function (req, res) {
        console.log("get all book")
        connect_DB.query("call show_book_by_provider(?, ?, ?, ?)", [req.body.providerId, null, null, 'titleasc'], function (err, result, field) {
            if (err) {
                res.status(500).json({ message: "Hệ thống gặp vấn đề. Vui lòng thử lại sau" });
            }
            else {
                res.json(result)
            }
        })
    
    },
    getAllGenres: function (req, res) {
        connect_DB.query("call show_all_genres()", function (err, result, field) {
            if (err) {
                res.status(500).json({ message: "Hệ thống gặp vấn đề. Vui lòng thử lại sau" });
            }
            else if (result.length == 0) {
                res.status(400).json({ message: "Không tồn tại thể loại" });
            }
            else {
                res.json(result)
            }
        })
    
    },
    search: function (req, res) {
        connect_DB.query("CALL search(?,?)", [req.body.bookName, req.body.providerId], function (err, result, field) {
            if (err) {
                res.status(500).json({ message: "Hệ thống gặp vấn đề. Vui lòng thử lại sau" });
            }
            else {
                console.log(result[0])
                res.json(result[0])
            }
        })
    
    },
    filter: function(req, res){
        if (req.body.criteria.price == '') price = null
        else price = req.body.criteria.price
        if (req.body.criteria.genres == '') genres = null
        else genres = req.body.criteria.genres
        connect_DB.query("call show_book_by_provider(?, ?, ?, ?)", [req.body.providerId, genres, price, req.body.criteria.order], function (err, result, field) {
            if (err) {
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
            else if (result.length == 0) {
                res.status(400).json({ message: "Không tồn tại sách" });
            }
            else {
                res.json(result)
            }
        })
    },
    deleteAllSelected:function(req,res){
        console.log(req.body.selectedBooks)
        connect_DB.query("CALL delete_book(?)", [req.body.book_id], function (err, result, field) {
            if (err) {
                res.status(500).json({ message: "Hệ thống gặp vấn đề. Vui lòng thử lại sau" });
            }
            else if (result.length == 0) {
                res.status(400).json({ message: "Không tồn tại sách" });
            }
            else {
                res.json(result)
            }
        })
    },
    deleteSelected:function(req,res){
        console.log('controller delete selected id=',req.body.book_id);
        connect_DB.query("CALL delete_book(?)", [req.body.book_id], function (err, result, field) {
            if (err) {
                console.log(err);
                res.status(500).json({ message:err.sqlMessage|| "Hệ thống gặp vấn đề. Vui lòng thử lại sau" });
            }
            else {
                console.log('xóa thành công')
                res.status(200).json({ message: 'Xóa thành công' })
            }
        })
    },
}