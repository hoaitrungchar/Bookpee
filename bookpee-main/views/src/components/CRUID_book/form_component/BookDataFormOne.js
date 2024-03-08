import React, {memo , useCallback, useEffect, useState } from 'react';
import axios from "axios";
import Modal from 'react-modal'
import '../create_book.css'
const BookDataFormOne=({submit,setSubmit,bookDataMain,setBookMain,currentPage,handleNext,handleBack,handleSubmit,cruid='create'})=>{
   
    const [bookData, setBookData] = useState(bookDataMain);
      const genresList = ['Kinh doanh','Truyện tranh','Giáo dục','Hư cấu','Sức khỏe','Lịch sử','Luật','Thần thoại','Y học','Chính trị','Lãng mạn','Tôn giáo','Khoa học','Self-help','Thể thao','Công nghệ','Du lịch','Thơ ca'];
      const [selectedGenres, setSelectedGenres] = useState(bookDataMain.genres);
      const [showGenres, setShowGenres] = useState(false);
      const handleGenreChange = (genre) => {
        if (selectedGenres.includes(genre)) {
          setSelectedGenres(selectedGenres.filter((selectedGenre) => selectedGenre !== genre));
        } else {
          if(selectedGenres===null){setSelectedGenres([genre])}
          setSelectedGenres([...selectedGenres, genre]);
        }
        console.log(selectedGenres,'in handleGenres');
        
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
    return(
    <>
      <div className='form-wrapper'>
        <label htmlFor="title">Tên sách:</label>
        <input
          className='form-control'
          type="text"
          id="title"
          name="title"
          value={bookData.title || ''}
          onChange={(e) => handleBookDataChange('title', e.target.value)}
        />
      </div>
      <div className='author-detail-ctn'>
          <div style={{marginBottom: '10px'}}>
            <label htmlFor="authors">Tác giả:</label>
            <button type="button" className="nav-button" style={{marginLeft: '10px'}} onClick={handleAddAuthor} disabled={cruid==='update'}  >
              Thêm tác giả
            </button>
          </div>
          {bookData.authors.map((author, index) => (
            <div key={index} className='single-author' style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '10px'}}>
              <input
                className='form-control'
                type="text"
                id={`author-${index}`}
                name={`author-${index}`}
                value={author}
                onChange={(e) => handleBookDataChange('authors', e.target.value, index)}
                disabled={cruid==='update'} 
              />
              <button type="button"  className="nav-button delete-author-btn" disabled={cruid==='update'} onClick={() => handleDeleteAuthor(index)  }>
                Xóa tác giả
              </button>
            </div>
          ))}
          
      </div>
      <div className='form-wrapper'>
        <label htmlFor="readingAge">Độ tuổi tối thiểu:</label>
        <input
          className='form-control'
          type="number"
          id="readingAge"
          name="readingAge"
          value={bookData.readingAge || 0}
          onChange={(e) =>
            handleBookDataChange('readingAge', parseInt(e.target.value, 10) || 0)
          }
        />
      </div>
      <div className='form-wrapper'>
        <label htmlFor="edition">Edition:</label>
        <input
          className='form-control'
          type="text"
          id="edition"
          name="edition"
          value={bookData.edition || ''}
          onChange={(e) => handleBookDataChange('edition', e.target.value)}
        />
      </div>
      <div className="genre-container form-wrapper">
        <button className="genre-button nav-button" type='button' onClick={toggleGenresVisibility}>
          {showGenres ? 'Ẩn thể loại' : 'Hiện thể loại'}
        </button>
        {showGenres && (
          <>
            <ul className="genre-list">
              {genresList.map((genre) => (
                <li key={genre}>
                  <label>
                    <input
                      disabled={cruid==='update'}
                      type="checkbox"
                      value={genre}
                      checked={selectedGenres.includes(genre)}
                      onChange={() => handleBookDataChange('genres', genre)}
                    />
                    {genre}
                  </label>
                </li>
              ))}
            </ul>
          </>
        )}
      </div>
      <div className='form-wrapper'>
        <label htmlFor="kindOfBook">Kiểu sách:</label>
        <select
          disabled={cruid==='update'}
          className='form-control'
          id="kindOfBook"
          name="kindOfBook"
          value={bookData.kindDetail.kindOfBook || ''}
          onChange={(e) => handleBookDataChange('kindDetail.kindOfBook', e.target.value)}
        >
          <option className='form-control' value="">Chọn kiểu sách</option>
          <option className='form-control' value="kindle">Sách Kindle</option>
          <option className='form-control' value="audio">Sách Nói</option>
          <option className='form-control' value="physical">Sách Giấy</option>
        </select>
      </div>
        <button type="button" className="nav-button" onClick={()=>{
          setBookMain(bookData); 
          handleBack(); 
        }} disabled={currentPage === 1}>
          Trở lại
        </button>
        <button type="button" className="nav-button" onClick={()=>{          console.log(bookData);setBookMain(bookData);handleNext();}} disabled={currentPage === 3}>
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
    </>
    )
}
export default BookDataFormOne;