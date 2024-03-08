import React, {memo , useCallback, useEffect, useMemo, useState } from 'react';
import axios from "axios";
import Modal from 'react-modal'
import './create_book.css'
import createPicture from '../../img/create_book.png'
import BookDataFormOne from './form_component/BookDataFormOne';
import BookDataFormTwo from './form_component/BookDataFormTwo';
import BookDataFormThree from './form_component/BookDataFormThree';
import { useParams } from 'react-router-dom';
import Cookies from "universal-cookie";
const cookies = new Cookies();
const token = cookies.get("TOKEN");
const ModalNoti=({isModalNotiOpen,setModalNoti,message})=>{
  return(
    <Modal
      className={"popup-complete-config"}
      overlayClassName={"complete-config-ctn"}
      isOpen={isModalNotiOpen}
      onRequestClose={() => setModalNoti(false)}
      ariaHideApp={false}
    >
      <h2>Thông báo</h2>
      <span className="span-complete-config">
        <p className="complete-noti-content">{message}</p>
        <button onClick={() => setModalNoti(false)} className="complete-noti-btn">
          Đóng
        </button>
      </span>
    </Modal>
  )
}
const UpdateBook = () => {
  const [user,setUser]=useState({});
  useEffect(() => {
    axios.post("/api/signin/getRole", {}, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    }).then((response) => { setUser(response.data)})
        .catch((error) => {
            console.log(error.response);
        })
  }, [])
  const book_id = useParams().bookId;
  const [bookData, setBookData] = useState('');
  const genresList = ['Kinh doanh','Truyện tranh','Giáo dục','Hư cấu','Sức khỏe','Lịch sử','Luật','Thần thoại','Y học','Chính trị','Lãng mạn','Tôn giáo','Khoa học','Self-help','Thể thao','Công nghệ','Du lịch','Thơ ca'];
  const [selectedGenres, setSelectedGenres] = useState([]);
  const [showGenres, setShowGenres] = useState(false);
  const handleGenreChange = (genre) => {
    if (selectedGenres.includes(genre)) {
      setSelectedGenres(selectedGenres.filter((selectedGenre) => selectedGenre !== genre));
    } else {
      setSelectedGenres([...selectedGenres, genre]);
    }
  };
  const toggleGenresVisibility = () => {
    setShowGenres(!showGenres);
  };

  const handleBookDataChange = (name, value, index = null) => {
    if (name === 'authors') {
      const newAuthors = [...bookData.authors];
      newAuthors[index] = value;
  
      setBookData({
        ...bookData,
        authors: newAuthors,
      });
    } else if (name.startsWith('kindDetail.')) {
      
      const kindDetailProperty = name.split('.')[1];
      setBookData({
        ...bookData,
        kindDetail: {
          ...bookData.kindDetail,
          [kindDetailProperty]: value,
        },
      });
    }else if (name === 'genres') {
      handleGenreChange(value);
      setBookData({
        ...bookData,
        genres: selectedGenres,
      });
    } else {
      setBookData({
        ...bookData,
        [name]: value,
      });
    }
  };

  const handleAddAuthor = () => {
    setBookData({
      ...bookData,
      authors: [...bookData.authors, ''],
    });
  };
  const handleDeleteAuthor = (index) => {
    const newAuthors = [...bookData.authors];
    newAuthors.splice(index, 1);

    setBookData({
      ...bookData,
      authors: newAuthors,
    });
  };

  const [responseMessage, setResponseMessage] = useState('');
  const [isModalNotiOpen,setModalNoti]=useState(false);
  const [isLoading,setLoading]=useState(true);

  useEffect(()=>{
    //get book data to update base on param id
    console.log("get book data show base on param id ",book_id);
    axios.post('/api/provider/getBookDetail', { 
        book_id:book_id,         
    })
       .then((response) => {
          console.log(response);
          const bookResponse=response.data.bookData;
          const formattedDate = new Date(bookResponse.publicationDate).toISOString().split('T')[0];
          const kindOfBook =
            (bookResponse.audio && bookResponse.audio.audio_size)
              ? 'audio'
              : (bookResponse.physical && bookResponse.physical.physical_status)
                ? 'physical'
                : (bookResponse.kindle && bookResponse.kindle.kindle_size)
                  ? 'kindle'
                  : null; // Set a default value or handle the case when none of the conditions are met
          console.log(kindOfBook);
          const details = {
            ...(kindOfBook === 'audio' && { kindOfBook, ...bookResponse.audio }),
            ...(kindOfBook === 'physical' && { kindOfBook, ...bookResponse.physical }),
            ...(kindOfBook === 'kindle' && { kindOfBook, ...bookResponse.kindle }),
          };
            setBookData({
                publicationDate: formattedDate,
                title: bookResponse.title,
                readingAge: bookResponse.readingAge,
                price: bookResponse.price,
                language: bookResponse.language,
                edition: bookResponse.edition,
                publisher: bookResponse.publisher,
                isbn: bookResponse.isbn,
                quantity: bookResponse.quantity,
                authors: [bookResponse.penname],
                kindDetail: details,
                genres:bookResponse.genres,
                providerId:user.user_id,
            });
            setLoading(false);
          console.log(bookData);
          // setModalNoti(true);
       })
       .catch((error) => {
          console.log('Lấy thông tin sách thất bại: ' + error);
          setLoading(false);
          setResponseMessage('Lấy thông tin sách thất bại: ' + error.response.data.message);
          setModalNoti(true);
       });
  },[]);

  const handleSubmit = async ()  => {

    console.log('Before Axios POST request book_id=',book_id);

    console.log(bookData);
    axios.post('/api/provider/updateBook', { 
      bookId:book_id,
      bookData: bookData,
    })
       .then((response) => {
          setResponseMessage(response.data.message);
          console.log(response);
          setModalNoti(true);
       })
       .catch((error) => {
          console.log('Sửa sách không thành công: ' + error);
          setResponseMessage('Sửa sách không thành công: ' + error.response.data.message);
          setModalNoti(true);
       });
    console.log('After Axios POST update book request');
  };
  const [currentPage,setCurrentPage]=useState(1);
  const [submit, setSubmit] = useState(false);
  const BookData= () => {
    if (currentPage === 1) {
      return <BookDataFormOne submit={submit} setSubmit={setSubmit}  cruid='update' bookDataMain={bookData} currentPage={currentPage} setBookMain={setBookData} handleNext={handleNext} handleBack={handleBack} handleSubmit={handleSubmit}/>;
    } else if (currentPage === 2) {
      return <BookDataFormTwo submit={submit} setSubmit={setSubmit} cruid='update' bookDataMain={bookData} currentPage={currentPage} setBookMain={setBookData} handleNext={handleNext} handleBack={handleBack} handleSubmit={handleSubmit}/>;
    } else if (currentPage === 3) {
      return <BookDataFormThree submit={submit} setSubmit={setSubmit} cruid='update' bookDataMain={bookData} currentPage={currentPage} setBookMain={setBookData} handleNext={handleNext} handleBack={handleBack} handleSubmit={handleSubmit}/>;
    }
  };
  const handleNext = () => {
    if(currentPage===2&&!bookData.kindDetail.kindOfBook){
        setResponseMessage('Hãy chọn kiểu sách để qua trang tiếp');
        setModalNoti(true);
        return;
    }
    setCurrentPage(currentPage + 1);
  };
  
  const handleBack = () => {
    setCurrentPage(currentPage - 1);
  };
  return (
    <>
    <form onSubmit={handleSubmit} className='all-crt-bdt-ctn'>
      
      <div className='crt-book-data-ctn'>
        <h3>Chỉnh sửa sách</h3>
        {isLoading || bookData === '' ? (
          <p>Loading...</p>
        ) : (
          <BookData />
        )}
        
      </div>
      <div style={{position: 'relative', height: '600px', width: '50%'}}>
        <img
        style={{position: 'absolute', // Ensure the image doesn't exceed the container width
        maxHeight: '100%',
        minWidth:'100%',
        top:'20%'}} 
         src={createPicture}></img>
      </div>
    </form>
    <ModalNoti isModalNotiOpen={isModalNotiOpen} setModalNoti={setModalNoti} message={responseMessage} />
    </>
  );
};

export default UpdateBook;
export {ModalNoti}
