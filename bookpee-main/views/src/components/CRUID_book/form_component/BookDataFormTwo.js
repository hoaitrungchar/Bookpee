import React, {memo , useCallback, useEffect, useState } from 'react';
import axios from "axios";
import Modal from 'react-modal'
import '../create_book.css'
const BookDataFormTwo=({submit,setSubmit,bookDataMain,setBookMain,currentPage,handleNext,handleBack,handleSubmit,cruid='create'})=>{
    const [bookData, setBookData] = useState(bookDataMain);
      const genresList = ['Kinh doanh','Truyện tranh','Giáo dục','Hư cấu','Sức khỏe','Lịch sử','Luật','Thần thoại','Y học','Chính trị','Lãng mạn','Tôn giáo','Khoa học','Self-help','Thể thao','Công nghệ','Du lịch','Thơ ca'];
      const [selectedGenres, setSelectedGenres] = useState(bookDataMain.genres);
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
      useEffect(() => {
        if (submit&&bookData==bookDataMain) {
          handleSubmit(submit)
          setSubmit(false);
        }
      }, [submit,bookDataMain]);
      useEffect(()=>{
        setBookData({
          ...bookData,
          genres: selectedGenres,
        });
      },[selectedGenres])
    return(<>
<div className='form-wrapper'>
        <label htmlFor="language">Ngôn ngữ:</label>
        <input
          className='form-control'
          type="text"
          id="language"
          name="language"
          value={bookData.language || ''}
          onChange={(e) => handleBookDataChange('language', e.target.value)}
        />
      </div>
      
      <div className='form-wrapper'>
        <label htmlFor="publicationDate">Ngày xuất bản:</label>
        <input
          className='form-control'
          type="date"
          id="publicationDate"
          name="publicationDate"
          value={bookData.publicationDate || ''}
          onChange={(e) => handleBookDataChange('publicationDate', e.target.value)}
        />
      </div>
      <div className='form-wrapper'>
        <label htmlFor="publisher">Nhà xuất bản:</label>
        <input
          className='form-control'
          type="text"
          id="publisher"
          name="publisher"
          value={bookData.publisher || ''}
          onChange={(e) => handleBookDataChange('publisher', e.target.value)}
        />
      </div>
      
      <div className='form-wrapper'>
        <label htmlFor="quantity">Số lượng:</label>
        <input
          className='form-control'
          type="number"
          id="quantity"
          name="quantity"
          value={bookData.quantity || ''}
          onChange={(e) => handleBookDataChange('quantity', parseInt(e.target.value, 10) || 0)}
        />
      </div>
      <div className='form-wrapper'>
        <label htmlFor="price">Giá:</label>
        <input
          className='form-control'
          placeholder="Nhập giá sách (VND)"
          type="number"
          id="price"
          name="price"
          step="1"
          value={bookData.price || ''}
          onChange={(e) => handleBookDataChange('price', e.target.value)}
        />
      </div>
      <div className='form-wrapper'>
      <label htmlFor="isbn">ISBN:</label>
      <input
        className='form-control'
        type="text"
        id="isbn"
        name="isbn"
        value={bookData.isbn || ''}
        onChange={(e) => handleBookDataChange('isbn', e.target.value)}
      />
    </div>
      <button type="button" className="nav-button" onClick={()=>{setBookMain(bookData); handleBack(); }} disabled={currentPage === 1}>
          Trở lại
        </button>
        <button type="button" className="nav-button" onClick={()=>{setBookMain(bookData);handleNext();}} disabled={currentPage === 3}>
          Tiếp
        </button>
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
          <button type='submit' className="nav-button" onClick={ (e) => {
                    e.preventDefault();
                    e.persist();
                    setBookMain(bookData); 
                    setSubmit(true);
            }}>
            {(cruid==='update')? 'Sửa sách':'Tạo sách'}
          </button>
        </div>
    </>)
}
export default BookDataFormTwo;