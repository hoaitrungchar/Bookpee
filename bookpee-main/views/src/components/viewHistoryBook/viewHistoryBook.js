import { useEffect, useState, useContext } from "react";
import axios from "axios"
import bookIcon from "../../img/book_icon.png"
import "../viewHistoryBook/viewHistoryBook.css"
import Cookies from "universal-cookie";
const cookies = new Cookies();
const token = cookies.get("TOKEN");
function ViewHistoryBook (){
    const [books, setBooks] = useState([])
    const [customerid, setCustomerId] = useState(0);
    useEffect(() => {
      axios.post("/api/signin/getRole", {}, {
          headers: {
              Authorization: `Bearer ${token}`
          }
      }).then((response) => { setCustomerId(response.data.user_id);
        axios.post('/api/order/favorauthor', {id:response.data.user_id , criteria: Number(criteria_sort)})
        .then(response => {setBooks(response.data[0]);})
        .catch(error => console.error('Error fetching books:', error));
      
      })
          .catch((error) => {
              console.log(error.response);
          })
    }, [])
    const [criteria_sort, setCriteriaSort] = useState("0");
    useEffect(() => {
      axios.post('/api/order/favorauthor', {id: customerid, criteria: Number(criteria_sort)})
      .then(response => {setBooks(response.data[0]);})
      .catch(error => console.error('Error fetching books:', error));
      }, [criteria_sort]);
    const BookList = ({ books }) => (
        <ul>
          {books.map((book) => (
            <>
          <div className="card-history">
            <img src={bookIcon} style = {{height: "100px", width: "100px"}}/>
            <div>
              <div style={{fontSize: "25px", fontWeight: "500"}}>Tên sách: {book.title}</div>
              <div>Số lượng đã mua: {book.total_quantity}</div>
            </div> 
          </div>
          </>
          ))}
        </ul>
      );
    const booksByAuthor = books.reduce((acc, book) => {
        const { penname, ...bookDetails } = book;
        if (!acc[penname]) {
          acc[penname] = [];
        }
        acc[penname].push(bookDetails);
        return acc;
      }, {});
    
    return(
       <div className="body">
       <h1>Tác giả yêu thích của bạn</h1>
       <div className="title">Danh sách các tác giả yêu thích kèm các tác phẩm của họ mà bạn đã mua. Tác giả mà bạn đã mua tổng số tác phẩm của họ: </div>
       <div style={{marginLeft: "40%", marginTop: "20px"}}>
        <select class="form-select" name="number-books" aria-label="Default select example" value={criteria_sort} onChange={(e) => {setCriteriaSort((e.target.value))}} style={{width: "30%",  height: "35px",marginLeft: "40px", marginRight: "40px"}}>
                <option value="0">Từ 1 cuốn trở lên</option>
                <option value="5">Từ trên 5 cuốn</option>
        </select>
       </div>
        
        {Object.keys(booksByAuthor).map((authorName) => (
        <div key={authorName}>
          <h3 className="card_"> {`Tên tác giả: ${authorName}`}</h3>
          <BookList books={booksByAuthor[authorName]} />
        </div>
      ))}
       </div>
    )
}

export default ViewHistoryBook;