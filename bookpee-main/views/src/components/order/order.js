import { useEffect, useState, useContext } from "react";
import axios from "axios"
import bookIcon from "../../img/book_icon.png"
import "../order/order.css"
import SortIcon from '@mui/icons-material/Sort';
import Cookies from "universal-cookie";



import '../CRUID_book/create_book.css'
import '../CRUID_book/book_detail.css'
import bookShopIcon from '../../img/bookshop.jpg'
const cookies = new Cookies();
const token = cookies.get("TOKEN");
const RatingStars = ({ rating }) => {
  const roundedRating = Math.round(rating * 2) / 2;
  const filledStars = Math.floor(roundedRating);
  return (
    <div className="rating-stars">
      {[...Array(5)].map((_, index) => {
        if (index < filledStars) {
          return <span key={index}>&#9733;</span>; // Filled star character
        }else {
          return <span key={index}>&#9734;</span>; // Unfilled star character
        }
      })}
    </div>
  );
};


function Order (){
    const [idcustomer, setIdCustomer] = useState(0);
    const [user, setUser] = useState({})
    useEffect(() => {
      axios.post("/api/signin/getRole", {}, {
          headers: {
              Authorization: `Bearer ${token}`
          }
      }).then((response) => { setIdCustomer(response.data.user_id)})
          .catch((error) => {
              console.log(error.response);
          })
    }, [])
    const [books, setBooks] = useState([])
    const [genres, setGenres] = useState([])
    const [criteria, setCriteria] = useState({
        genres: "",
        price: "",
        order: "titleasc",
        name: ""
    })
    const [errorMessage, setErrorMessage] = useState("");
    const [bookQuantities, setBookQuantities] = useState({});
    const [detailSelectedBook, setDetailSelectedBook] = useState([]);
    const [individualModalOpen, setIndividualModalOpen] = useState(false);
    const [selectedBook, setSelectedBook] = useState(null);
  
    const [summaryOrderModalOpen, setSummaryOrderModalOpen] = useState(false);
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setCriteria((prevCriteria) => ({ ...prevCriteria, [name]: value }));
      };
    useEffect(() => {
      axios.post('/api/order/filter', {criteria})
      .then(response => {setBooks(response.data[0]);})
      .catch(error => console.error('Error fetching books:', error));
      }, []);
    useEffect(() => {
        axios.get('/api/order/genres')
          .then(response => setGenres(response.data[0]))
          .catch(error => console.error('Error fetching books:', error));
      }, []);
    const handleFilter = () => {
        axios.post('/api/order/filter', {criteria})
          .then(response => {setBooks(response.data[0]);})
          .catch(error => console.error('Error fetching books:', error));
    }
    const [nameReceiver, setNameReceiver] = useState("");
    const [phoneReceiver, setPhoneReceiver] = useState("");
    const [addressReceiver, setAddressReceiver] = useState("");
    const [promotionCode, setPromotionCode] = useState("");

    /*const handleSearch = (e) => {
        e.preventDefault();
        const name = e.target.elements.name.value;
        axios.post('/api/order/search', {bookName: name})
          .then(response => setBooks(response.data))
          .catch(error => console.error('Error fetching books:', error));
    }*/
    const [orderItems, setOrderItems] = useState([]);
    const handleAddToCart = () => {
      if (selectedBook) {
        // Add the selected book details to the orderItems array
        setOrderItems(prevOrderItems => [...prevOrderItems, detailSelectedBook[0]]);
        
        // Close the individual modal
        closeIndividualModal();
      }
    };
    const handleRefresh = (e) => {
        setCriteria({
            genres: "",
            price: "",
            order: "titleasc",
            name: "",
        })
        axios.post('/api/order/filter', {criteria})
        .then(response => {setBooks(response.data[0]);})
        .catch(error => console.error('Error fetching books:', error));
    }
    const getDetail = (book) => {
      console.log(book.book_id)
      axios.post('/api/order/detail', {book_id: book.book_id})
          .then(response => {setDetailSelectedBook(response.data[0]); setSelectedBook(book); setIndividualModalOpen(true);  })
          .catch(error => console.error('Error fetching books:', error));
    }


    const openIndividualModal = (book) => {
        getDetail(book);
        
        //setSelectedBook(book);
        //setIndividualModalOpen(true); 
      }

      const closeIndividualModal = () => {
        setSelectedBook(null);
        setIndividualModalOpen(false);
      }
    
      // Update quantity for a book
      const handleQuantityChange = (bookId, quantity) => {
        setBookQuantities(prevQuantities => ({
          ...prevQuantities,
          [bookId]: quantity
        }));
      }
    
      const handleSummaryOrder = () => {
        setSummaryOrderModalOpen(true);
      }
    
      const closeSummaryOrderModal = () => {
        setSummaryOrderModalOpen(false);
      }


      
      const [bookData, setBookData] = useState({
        title: '',
        readingAge: 0,
        price: '',
        language: '',
        edition: '',
        publicationDate: '',
        publisher: '',
        isbn: '',
        quantity: 0,
        authors: [''],
        kindDetail: {},
    });
    const [openTotalPriceOrder, setOpenTotalPriceOrder] = useState(false)
    const [item_total, setItemTotal] = useState(0);
    const [discount_total, setDiscountTotal] = useState(0)
    const [grand_total, setGrandTotal] = useState(0)
    const [responseMessage, setResponseMessage] = useState('');
    const [paymentMethod, setPaymentMethod] = useState('Banking');
    const [shipmentType, setShipmentType] = useState('Online');
    const [isModalNotiOpen,setModalNoti]=useState(false);
    const [isLoading,setLoading]=useState(true);
    const [modalCheckOneProvider, setCheckOneProvider] = useState(false);
    const booktype = (audio, kindle, physical) => {
      if (audio != null) return "Audio Book"
      else if (kindle != null) return "Kindle Book"
      else return "Physical Book";
    }
    const checkNumberQuantities = () => {
          if (orderItems.length > 0) {
            const firstValue = orderItems[0].provider_id;
            const isOneProvider = orderItems.every(element => element.provider_id === firstValue);
            if (!isOneProvider) setErrorMessage("Chỉ đặt hàng với đơn hàng có các sản phẩm thuộc cùng một nhà cung cấp");
          }
          else {setErrorMessage("Chỉ đặt hàng với đơn hàng có các sản phẩm thuộc cùng một nhà cung cấp");}
    }
    const handleRefreshAll = () => {
       setBookQuantities({});
       setDetailSelectedBook([]);
       setIndividualModalOpen(false);
       setSummaryOrderModalOpen(false);
       setOpenTotalPriceOrder(false);
       setPaymentMethod('Banking');
       setShipmentType('Online');
       setOrderItems([]);
       setNameReceiver("");
      setPhoneReceiver("");
      setAddressReceiver("");
      setPromotionCode("");

    }
    function getFormattedDate(inputDate) {
      const dateObject = new Date(inputDate);
      
      const day = dateObject.getUTCDate()+1;
      const month = dateObject.getUTCMonth() + 1; 
      const year = dateObject.getUTCFullYear();
    
      // Pad single-digit day and month with leading zero
      const formattedDay = day < 10 ? `0${day}` : day;
      const formattedMonth = month < 10 ? `0${month}` : month;
    
      // Form the date in DD-MM-YYYY format
      const formattedDate = `${formattedDay}-${formattedMonth}-${year}`;
    
      return formattedDate;
    }
    const handleOrder = () => {
          const providerIdsWithQuantities = {};
          for (const bookId in bookQuantities) {
            const quantity = bookQuantities[bookId];
            if (quantity > 0) {
              const book = orderItems.find(item => item.book_id === parseInt(bookId));
              if (book) {
                providerIdsWithQuantities[book.provider_id] = true;
              }
            }
          }
          var orderid = -1;
          var providerid = -1;
          const uniqueProviderIds = Object.keys(providerIdsWithQuantities);
          const differentProviders = uniqueProviderIds.length > 1;
          
          if (uniqueProviderIds.length === 0) {setErrorMessage("Chưa chọn sản phẩm nào"); return;}
          else {setErrorMessage("");}
          if (differentProviders) {setErrorMessage("Chỉ đặt hàng với đơn hàng có các sản phẩm thuộc cùng một nhà cung cấp"); return;}
          else {providerid = uniqueProviderIds[0]; setErrorMessage("");
                    axios.post('/api/order/createorder', {name: nameReceiver, phone: phoneReceiver, address: addressReceiver, promotion: promotionCode, customer_id: idcustomer, provider_id: providerid, payment_method: paymentMethod, shipment_type : shipmentType })
                    .then(response => {orderid  = (response.data[0][0].return_order_id)
                          axios.post('/api/order/addbookorder', {order_id: orderid, bookQuantities})
                          .then(response => { if (promotionCode !== "") {
                                axios.post('/api/order/addcode', {order_id: orderid, promotion_code: promotionCode})
                                .then(response => {
                                      axios.post('/api/order/confirm', {order_id: orderid, customer_id: idcustomer})
                                      .then(response => {
                                            axios.post('/api/order/calctotalwithpromo', {order_id: orderid})
                                            .then(response => {
                                            {console.log(response.data[0]); setItemTotal(response.data[0][0].item_total); setGrandTotal(response.data[0][0].grand_total); setDiscountTotal(response.data[0][0].discount_total);  setOpenTotalPriceOrder(true); closeSummaryOrderModal();}
                                              })
                                            .catch(error => {setErrorMessage(error.response.data.message);});
                                            })
                                      .catch(error => {setErrorMessage(error.response.data.message);
                    
                                      return;});
                                  })
                                  .catch(error => {setErrorMessage(error.response.data.message);
                                        axios.post('/api/order/delete', {order_id: orderid})
                                        .then(response => {})
                                        .catch(error => {setErrorMessage(error.response.data.message);});
                                        return;});
                                        }
                            else {
                            axios.post('/api/order/confirm', {order_id: orderid, customer_id: idcustomer})
                            .then(response => {
                                  axios.post('/api/order/calctotalwithpromo', {order_id: orderid})
                                  .then(response => { setItemTotal(response.data[0][0].item_total); setGrandTotal(response.data[0][0].grand_total); setDiscountTotal(response.data[0][0].discount_total); setOpenTotalPriceOrder(true);})
                                  .catch(error => {setErrorMessage(error.response.data.message);});
                            })
                            .catch(error => {setErrorMessage(error.response.data.message);
                              return;});}
                    })
                    
                    .catch(error => {setErrorMessage(error.response.data.message); 
                            axios.post('/api/order/delete', {order_id: orderid})
                            .then(response => {})
                            .catch(error => {setErrorMessage(error.response.data.message);});
                            return;});
                    })
                    .catch(error => {setErrorMessage(error.response.data.message); return;});
        }
    }
    const discount = (card) => {
      if (card.max_discount != 0) {
        return (`Hiện tại giảm giá còn ${card.end_price} đ` )
      }
    }







    return(
        <div className="body">
            <div class="container" style={{marginBottom: "20px"}}>
            <button class="btn btn-block btn-primary" onClick={handleSummaryOrder} style={{marginBottom: "20px", marginLeft: "auto",  marginRight: "0"}}>Summary Order</button>
	            <div class="row" id="search">
		            <form id="search-form" style={{display: "flex", flexDirection: "row"}}>
			            <div class="form-group col-xs-9" style={{width: "80%"}}>
				            <input class="form-control" type="text" placeholder="Search" value={criteria.name} name="name" onChange={handleInputChange}/>
			            </div>
		            </form>
	            </div>
            </div>
            <div className="row justify-content-center" style={{marginBottom:"30px"}} >
                Thể loại
            <select class="form-select" name= "genres" aria-label="Default select example" value={criteria.genres}  onChange={handleInputChange} style={{width: "10%", height: "35px", marginLeft: "30px", marginRight: "30px"}}>
                <option value ="">All</option>
                {genres.map((card, i) => (
                    <option key={i} value={card.genres}>
                    {card.genres}
                    </option>
                ))}
            </select>
                 Giá
            <select class="form-select" name="price" aria-label="Default select example" value={criteria.price} onChange={handleInputChange} style={{width: "30%",  height: "35px",marginLeft: "30px", marginRight: "30px"}}>
                <option value = "">All</option>
                <option value="low">Dưới 50.000đ</option>
                <option value="mid">Từ 50.000đ đến dưới 100.000đ</option>
                <option value="high">Từ 100.000đ trở lên</option>
            </select>
                Sắp xếp theo
            <select class="form-select" name="order" aria-label="Default select example" value={criteria.order} onChange={handleInputChange} style={{width: "10%",  height: "35px",marginLeft: "30px", marginRight: "30px"}}>
                <option value="titleasc">Từ A-Z</option>
                <option value="titledesc">Từ Z-A</option>
                <option value="priceasc">Giá tăng dần</option>
                <option value="pricedesc">Giá giảm dần</option>
            </select>
            <button class="btn btn-primary" type="submit" style={{width: "5%", marginRight: "20px"}} onClick={handleFilter}>Lọc</button>
            <button class="btn btn-primary" type="reset" style={{width: "10%"}} onClick={handleRefresh}>Làm mới</button>
            </div>

            <div className = "row">
            {books.map((card, i) => (
                <div className='col-sm-4 product' style = {{cursor: "pointer"}} key={i}  onClick={() => {openIndividualModal(card) }}>
                    <div className='product-inner text-center' style ={{minHeight: "280px"}}>
                        <img src={bookIcon} style = {{height: "100px", width: "100px"}}/>
                            <br />Tên sách: {card.title}
                            <br />Giá gốc: {card.price} đ
                            <br />Mã: {card.book_id}
                            <br />Kiểu sách: {card.book_type}
                            <br />{discount(card)}
                            
                    </div>
                </div>))}
            </div>

            {individualModalOpen && detailSelectedBook && (
                <div className="modal" style={{ display: individualModalOpen ? 'block' : 'none'}}>
                    <div className="modal-content" style={{width: "95%"}}>
                    <span className="close" style = {{marginLeft: "auto",  marginRight: "0"}} onClick={() => {handleQuantityChange(selectedBook.book_id, 0); closeIndividualModal()}}>x</span>
                    <div className="detail-book">
                        <div>Thông tin sách</div>
                        <div className='book-detail-all-ctn'>
                          <div className='infor-ctn-1' style={{
                              height: '400px',
                              width: '300px',
                              display: 'flex',
                              alignItems: 'center', 
                              justifyContent: 'center'
                            }}>
                              <img src={bookIcon} style={{ height: '200px', width: '200px' }} alt="Book Icon" />
                          </div>

                          <div style={{maxWidth:'50%'}}>
                            <div className='infor-ctn-1'>
                                <h3>{detailSelectedBook[0].title}</h3>
                                <RatingStars  rating={detailSelectedBook[0].rating_score}/>
                                <p>Độ tuổi giới hạn: {detailSelectedBook[0].reading_age}</p>
                                <p>Tác giả:  {[...new Set(detailSelectedBook.map(item => item.penname))].join(', ')}</p>
                                <p>Thể loại: {[...new Set(detailSelectedBook.map(item => item.genres))].join(', ')}</p>
                                <p>{detailSelectedBook[0].price.toLocaleString('en-US')} VND - Hiện đang giảm giá {detailSelectedBook[0].max_discount ? detailSelectedBook[0].max_discount : 0}%</p>
                            </div>

                            <div className="info-container infor-ctn-1">
                              <div>
                                <label for="company">Nhà xuất bản:</label>
                                <p id="company">{detailSelectedBook[0].publisher_name}</p>
                              </div>
                              <div>
                                <label for="pubDate">Ngày xuất bản:</label>
                                <p id="pubDate">{getFormattedDate(detailSelectedBook[0].publication_date)} </p>
                              </div>
                              <div>
                                <label for="edition">Phiên bản:</label>
                                <p id="edition">{detailSelectedBook[0].edition}</p>
                              </div>
                              <div>
                                <label for="isbn">Mã ISBN:</label>
                                <p id="isbn">{detailSelectedBook[0].isbn}</p>
                              </div>
                              <div>
                                <label for="language">Ngôn ngữ:</label>
                                <p id="language">{detailSelectedBook[0].language_}</p>
                              </div>
                              <div>
                                <label for="bookType">Kiểu sách:</label>
                                <p id="bookType">{booktype(detailSelectedBook[0].audio_size, detailSelectedBook[0].kindle_size, detailSelectedBook[0].physical_format)}</p>
                              </div>
                              {booktype(detailSelectedBook[0].audio_size, detailSelectedBook[0].kindle_size, detailSelectedBook[0].physical_format) == "Physical Book" &&
                                    <>
                                    <div>
                                      <label for="bookType">Format</label>
                                      <p id="bookType">{detailSelectedBook[0].physical_format}</p>
                                    </div>
                                    <div>
                                      <label for="bookType">Dimensions</label>
                                      <p id="bookType">{detailSelectedBook[0].physical_dimensions} cm</p>
                                    </div>
                                    <div>
                                      <label for="bookType">Paper length:</label>
                                      <p id="bookType">{detailSelectedBook[0].physical_paper_length} trang</p>
                                    </div>
                                    <div>
                                      <label for="bookType">Status:</label>
                                      <p id="bookType">{detailSelectedBook[0].physical_status}</p>
                                    </div>
                                    <div>
                                      <label for="bookType">Weight:</label>
                                      <p id="bookType">{detailSelectedBook[0].physical_weight} kg</p>
                                    </div>
                                    </>
                              }
                              {booktype(detailSelectedBook[0].audio_size, detailSelectedBook[0].kindle_size, detailSelectedBook[0].physical_format) == "Kindle Book" &&
                                    <>
                                    <div>
                                      <label for="bookType">Size</label>
                                      <p id="bookType">{detailSelectedBook[0].kindle_size} MB</p>
                                    </div>
                                    <div>
                                      <label for="bookType">Paper length</label>
                                      <p id="bookType">{detailSelectedBook[0].kindle_paper_length} trang</p>
                                    </div>
                                    </>
                              }
                              {booktype(detailSelectedBook[0].audio_size, detailSelectedBook[0].kindle_size, detailSelectedBook[0].physical_format) == "Audio Book" &&
                                    <>
                                    <div>
                                      <label for="bookType">Size</label>
                                      <p id="bookType">{detailSelectedBook[0].audio_size} MB</p>
                                    </div>
                                    <div>
                                      <label for="bookType">Time</label>
                                      <p id="bookType">{detailSelectedBook[0].audio_time}</p>
                                    </div>
                                    </>
                              }
                            </div>
                          </div>
                          <div className='infor-ctn-1' style={{
                              display: 'flex',
                              flexDirection: 'column',
                              alignContent: 'center',
                              alignItems: 'center'
                          }}>
                            <img src={bookShopIcon} style={{ height: '200px', width: '200px', }}></img>
                            <label htmlFor="supplierName">Nhà cung cấp:</label>
                            <h4 id="supplierName">{detailSelectedBook[0].provider_name}</h4>
                            
                            <label htmlFor="quantity">Số lượng:</label>
                            <div className="row justify-content-center" style={{width: "60%"}}>
                                    <div class="input-group">
                                <div class="input-group-prepend">
                                    <button class="btn btn-outline-primary" type="button" onClick={() => handleQuantityChange(selectedBook.book_id, Math.max(0, (bookQuantities[selectedBook.book_id] || 0) - 1))} >-</button>
                                </div>
                                <input type="text" class="form-control" value={bookQuantities[selectedBook.book_id] || 0}/>
                                <div class="input-group-prepend">
                                    <button class="btn btn-outline-primary" type="button" onClick={() => handleQuantityChange(selectedBook.book_id, (bookQuantities[selectedBook.book_id] || 0) + 1)}>+</button>
                                </div>
                            
                                </div> 
                            </div>
                            
                            <button class="btn btn-primary" type="submit" style={{width: "100%", marginRight: "0", marginLeft: "auto", marginTop:"20px"}} onClick={(e) => {closeIndividualModal();handleAddToCart()}}>Thêm/ cập nhật vào giỏ hàng</button>
                            
                          </div>
                        </div>
                    </div>
        
                    </div>
                </div>
        )}
  
        {summaryOrderModalOpen && (
          <div className="modal" style={{ display: summaryOrderModalOpen ? 'block' : 'none' }}>
            <div className="modal-content" style={{width: "98%"}}>
              {!openTotalPriceOrder && <span className="close" onClick={closeSummaryOrderModal} style = {{marginLeft: "auto",  marginRight: "0"}}>x</span>}
              {openTotalPriceOrder && <span className="close" onClick={() => {closeSummaryOrderModal(); handleRefreshAll()}} style = {{marginLeft: "auto",  marginRight: "0"}}>x</span>}
              <p>Summary Order:</p>
              <div class="mb-3">
                <label for="exampleFormControlInput1" class="form-label">Tên người nhận</label>
                <input type="name-receiver" class="form-control" id="exampleFormControlInput1" placeholder="Tên người nhận" value = {nameReceiver} onChange = {(e) => setNameReceiver(e.target.value)}/>
              </div>
              <div class="mb-3">
                <label for="exampleFormControlInput1" class="form-label">Số điện thoại người nhận</label>
                <input type="tel" class="form-control" id="exampleFormControlInput1" placeholder="Số điện thoại" value = {phoneReceiver} onChange = {(e) => setPhoneReceiver(e.target.value)}/>
              </div>
              <div class="mb-3">
                <label for="exampleFormControlInput1" class="form-label">Địa chỉ người nhận</label>
                <input type="text" class="form-control" id="exampleFormControlInput1" placeholder="Địa chỉ" value = {addressReceiver} onChange = {(e) => setAddressReceiver(e.target.value)}/>
              </div>
              <div class="mb-3">
                <label for="exampleFormControlInput1" class="form-label">Promotion code</label>
                <input type="number" class="form-control" id="exampleFormControlInput1" value = {promotionCode} onChange={(e) => setPromotionCode(e.target.value)} />
              </div>
              Phương thức giao hàng
              <select class="form-select" name="price" aria-label="Default select example" value={shipmentType} onChange={(e) => setShipmentType(e.target.value)} style={{width: "30%",  height: "35px"}}>
                <option value="Online">Online</option>
                <option value="Offline">Offline</option>
            </select>
            Phương thức thanh toán
              <select class="form-select" name="price" aria-label="Default select example" value={paymentMethod} onChange={(e) => setPaymentMethod(e.target.value)} style={{width: "30%",  height: "35px", marginBottom: "20px"}}>
                <option value="Banking">Banking</option>
                <option value="COD">COD</option>
                
            </select>
              <ul>
                {Object.entries(bookQuantities).map(([bookId, quantity]) => (
                  quantity > 0 && (
                    <li key={bookId} style = {{display: "flex", flexDirection: "row", justifyContent: "space-between", marginBottom: "20px"}}>
                       <img src={bookIcon} style = {{height: "70px", width: "70px", marginRight: "20px"}}/>
                      <div style={{width: "50%", display: "flex", flexDirection: "column"}}>
                       <div>Book ID: {bookId}, Số lượng mua: {quantity}, Tên sách: {orderItems.find(book => book.book_id === parseInt(bookId, 10)).title}, Nhà phân phối: {orderItems.find(book => book.book_id === parseInt(bookId, 10)).provider_name}</div> 
                        <div>Kiểu sách: {booktype(orderItems.find(book => book.book_id === parseInt(bookId, 10)).audio_size,orderItems.find(book => book.book_id === parseInt(bookId, 10)).kindle_size,orderItems.find(book => book.book_id === parseInt(bookId, 10)).physical_format )}</div>
                      </div>
                      
                      <div className="row justify-content-center" style={{width: "35%"}}>
                                    <div class="input-group"style={{width: "30%"}} >
                                <div class="input-group-prepend">
                                    <button class="btn btn-outline-primary" type="button" onClick={() => handleQuantityChange(orderItems.find(book => book.book_id === parseInt(bookId, 10)).book_id, Math.max(0, (bookQuantities[orderItems.find(book => book.book_id === parseInt(bookId, 10)).book_id] || 0) - 1))} >-</button>
                                </div>
                                <input type="text" class="form-control" value={bookQuantities[orderItems.find(book => book.book_id === parseInt(bookId, 10)).book_id] || 0}/>
                                <div class="input-group-prepend">
                                    <button class="btn btn-outline-primary" type="button" onClick={() => handleQuantityChange(orderItems.find(book => book.book_id === parseInt(bookId, 10)).book_id, (bookQuantities[orderItems.find(book => book.book_id === parseInt(bookId, 10)).book_id] || 0) + 1)}>+</button>
                                </div>
                            
                                </div> 
                        </div>
                        <div> x {orderItems.find(book => book.book_id === parseInt(bookId, 10)).price}đ</div>
                    </li>
        
                  )
                ))}
              </ul>
              {!openTotalPriceOrder && <button class="btn btn-primary" type="submit" style={{width: "20%",marginLeft: "40%"}} onClick={(e) => {handleAddToCart(); handleOrder()}}>Xác nhận đặt hàng</button>} 
               <div>{errorMessage}</div>
              {openTotalPriceOrder && (<div>
                Đặt hàng thành công:
                <div>Tổng giá gốc đơn hàng: {item_total} đ</div>
                <div>Tổng giảm giá đơn hàng: {discount_total} đ</div>
                <div>Tổng tiền phải trả chưa bao gồm phí giao hàng: {grand_total} đ</div>
              </div>)}
            </div>
          </div>
        )}
         



       
        </div>

    )
}

export default Order;