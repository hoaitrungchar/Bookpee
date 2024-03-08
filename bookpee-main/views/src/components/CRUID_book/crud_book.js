import { useEffect, useState, useContext } from "react";
import axios from "axios"
import { Link } from "react-router-dom";
import bookIcon from "../../img/book_icon.png"
import "../CRUID_book/crud_book.css"
import { ModalNoti } from "./create_book";
import Cookies from "universal-cookie";
const cookies = new Cookies();
const token = cookies.get("TOKEN");
function ManageBook (){
    const [user,setUser]=useState({});
    useEffect(() => {
        axios.post("/api/signin/getRole", {}, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        }).then((response) => {setUser(response.data)
            axios.post('/api/provider', {providerId: response.data.user_id})
            .then(response => {setBooks(response.data[0])})
            .catch(error => console.error('Error fetching books:', error));
        })
            .catch((error) => {
                console.log(error.response);
            })
    }, [])
    const [books, setBooks] = useState([])
    const [genres, setGenres] = useState([])
    const provider_id = 1;
    const [criteria, setCriteria] = useState({
        genres: "",
        price: "",
        order: "titleasc"
    })
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setCriteria((prevCriteria) => ({ ...prevCriteria, [name]: value }));
      };
    useEffect(() => {
        axios.get('/api/provider/genres')
          .then(response => setGenres(response.data[0]))
          .catch(error => console.error('Error fetching books:', error));
      }, []);
    const handleFilter = () => {
        axios.post('/api/provider/filter', {criteria, providerId:user.user_id})
          .then(response => {setBooks(response.data[0]);})
          .catch(error => {setBooks([]); console.error('Error fetching books:', error)});

    }
    const handleSearch = (e) => {
        e.preventDefault();
        const name = e.target.elements.name.value;
        axios.post('/api/provider/search', {bookName: name, providerId:user.user_id})
          .then(response => setBooks(response.data))
          .catch(error => {setBooks([]); console.error('Error fetching books:', error)});
    }
    const handleRefresh = (e) => {
        setCriteria({
            genres: "",
            price: "",
            order: "titleasc"
        })
        axios.post('/api/provider', {providerId:user.user_id})
          .then(response => {setBooks(response.data[0]);})
          .catch(error => console.error('Error fetching books:', error));
    }
    // const [selectedBooks, setSelectedBooks] = useState([]);

    // const toggleBookSelection = (bookId) => {
    //     if (selectedBooks.includes(bookId)) {
    //     setSelectedBooks(selectedBooks.filter((id) => id !== bookId));
    //     } else {
    //     setSelectedBooks([...selectedBooks, bookId]);
    //     }
    // };
    // const handleDeleteAllSelected= (e)=>{
    //     e.preventDefault();
    //     axios.post('/api/provider/deleteAllSelected', {selectedBooks: selectedBooks})
    //       .then(response => {})
    //       .catch(error => console.error('Error delete books:', error));
    // }
    const handleDeleteSelected= (e,book_id)=>{
        e.preventDefault();
        axios.post('/api/provider/deleteSelected', {book_id: book_id})
            .then(response => {
                console.log(response)
                setResponseMessage(response.data.message);
                const updatedBooks = books.filter((book) => book.book_id !== book_id);
                setBooks(updatedBooks);
                setModalNoti(true);
            })
            .catch(error =>{
                setResponseMessage(error.response.data.message)
                setModalNoti(true);

                console.error('Error delete book:', error)
        });
    }
    // state for modalnoti
    const [responseMessage, setResponseMessage] = useState('');
    const [isModalNotiOpen,setModalNoti]=useState(false);
    // end state for modalnoti

    return(
        <div className="body">
            <div class="container" style={{marginBottom: "20px"}}>
	            <div class="row" id="search">
		            <form id="search-form" style={{display: "flex", flexDirection: "row"}} onSubmit={handleSearch}>
			            <div class="form-group col-xs-9" style={{width: "80%"}}>
				            <input class="form-control" type="text" placeholder="Search" name="name" />
			            </div>
			            <div class="form-group col-xs-3"style={{marginLeft: "50px"}}>
				            <button type="submit" class="btn btn-block btn-primary" >Search</button>
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
            {/* <div>
                <button
                className={`btn btn-primary`}
                type="button"
                onClick={(e)=>handleDeleteAllSelected(e)}
                disabled={selectedBooks.length === 0}
                >
                Xóa tất cả sách đã chọn
                </button>
            </div> */}
            <div className = "row">
            {books.map((card, i) => (
                <div className='col-sm-4 product' style = {{cursor: "pointer"}} key={i}>
                    <div className='product-inner text-center'>
                        {/* <input
                        style={{
                            position: 'relative',
                            float: 'right',
                        }}
                        type="checkbox"
                        checked={selectedBooks.includes(card.book_id)}
                        onChange={() => toggleBookSelection(card.book_id)}
                        /> */}
                        <img src={bookIcon} style = {{height: "100px", width: "100px"}}/>
                            <br />Book id: {card.book_id}
                            <br />Tên sách: {card.title}
                            <br />Giá: {card.price} đ
                    <div>
                    <button class="btn btn-primary" type="button" onClick={(e) => {
                        e.stopPropagation();
                        handleDeleteSelected(e,card.book_id);
                    }} 
                    style={{width: "20%", marginRight: "10px"}}>
                        Xóa
                    </button>
                    <Link to={`/providerBookDetail/${card.book_id}`}>
                        <button class="btn btn-primary" type="button" onClick={(e) => e.stopPropagation()} style={{width: "20%", marginRight: "10px"}}>
                            Chi tiết
                        </button>
                    </Link>
                    </div>
                    </div>
                    
                </div>))}
            </div>
            <ModalNoti isModalNotiOpen={isModalNotiOpen} setModalNoti={setModalNoti} message={responseMessage} />

        </div>
    )
}

export default ManageBook;