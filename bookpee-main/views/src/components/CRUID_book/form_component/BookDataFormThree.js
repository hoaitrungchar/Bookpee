import React, {memo , useCallback, useEffect, useState } from 'react';
import axios from "axios";
import Modal from 'react-modal'
import '../create_book.css'
const BookDataFormThree=({submit,setSubmit,bookDataMain,setBookMain,currentPage,handleNext,handleBack,handleSubmit,cruid='create'})=>{
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
  const AdditionalFieldsComponent = () => {
    switch (bookData.kindDetail.kindOfBook) {
      case 'kindle':
        return (
          <>
            <div className='form-wrapper'>
              <label htmlFor="size">Kích thước file (kb):</label>
              <input style={{width: 'calc(100%)'}}
                className='form-control'
                type="number"
                id="size"
                name="size"
                placeholder='kb'
                value={bookData.kindDetail.kindle_size || ''}
                onChange={(e) => handleBookDataChange('kindDetail.kindle_size', e.target.value)}
              />
            </div>
            <div className='form-wrapper'>
              <label htmlFor="pagerLength">Số trang:</label>
              <input
                className='form-control'
                type="number"
                id="pagerLength"
                name="pagerLength"
                value={bookData.kindDetail.kindle_paper_length || ''}
                onChange={(e) => handleBookDataChange('kindDetail.kindle_paper_length', e.target.value)}
              />
            </div>
          </>
        );
      case 'audio':
        return (
          <>
            <div className='form-wrapper'>
              <label htmlFor="size">Kích thước file (kb):</label>
              <input
                className='form-control'
                type="number"
                id="size"
                name="size"
                placeholder='kb'
                value={bookData.kindDetail.audio_size || ''}
                onChange={(e) => handleBookDataChange('kindDetail.audio_size', e.target.value)}
              />
            </div>
            <div className='form-wrapper'>
              <label htmlFor="time">Thời lượng:</label>
              <input
                className='form-control'
                type="text"
                id="duration"
                name="time"
                pattern="^\d{2}:\d{2}:\d{2}$"
                placeholder="HH:mm:ss"
                value={bookData.kindDetail.audio_time || ''}
                onChange={(e) => handleBookDataChange('kindDetail.audio_time', e.target.value)}
              />
            </div>
          </>
        );
      case 'physical':
        return (
          <>
            <div className='form-wrapper'>
              <label htmlFor="format">Định dạng:</label>
              <input
                className='form-control'
                type="text"
                id="format"
                name="format"
                value={bookData.kindDetail.physical_format || ''}
                onChange={(e) => handleBookDataChange('kindDetail.physical_format', e.target.value)}
              />
            </div>
            <div className='form-wrapper'>
              <label htmlFor="status">Tình trạng:</label>
              <input
                className='form-control'
                type="text"
                id="status"
                name="status"

                value={bookData.kindDetail.physical_status || ''}
                onChange={(e) => handleBookDataChange('kindDetail.physical_status', e.target.value)}
              />
            </div>
            <div className='form-wrapper'>
              <label htmlFor="dimension">Kích thước (cm):</label>
              <input
                className='form-control'
                type="text"
                id="dimension"
                name="dimension"
                placeholder='eg. 30x40cm'

                value={bookData.kindDetail.physical_dimensions || ''}
                onChange={(e) => handleBookDataChange('kindDetail.physical_dimensions', e.target.value)}
              />
            </div>
            <div className='form-wrapper'>
              <label htmlFor="weight">Cân nặng (kg):</label>
              <input
                className='form-control'
                type="text"
                id="weight"
                name="weight"
                placeholder='kg'
                value={bookData.kindDetail.physical_weight || ''}
                onChange={(e) => handleBookDataChange('kindDetail.physical_weight', e.target.value)}
              />
            </div>
            <div className='form-wrapper'>
              <label htmlFor="weight">Số trang</label>
              <input
                className='form-control'
                type="number"
                id="paper_length"
                name="paper_length"
                value={bookData.kindDetail.physical_paper_length || ''}
                onChange={(e) => handleBookDataChange('kindDetail.physical_paper_length', e.target.value)}
              />
            </div>
          </>
        );
      default:
        return null;
    }
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
    {AdditionalFieldsComponent()}
    {/* <div className='form-wrapper'>
      <label htmlFor="providerId">Provider ID:</label>
      <input
        className='form-control'
        type="text"
        id="providerId"
        name="providerId"
        value={bookData.providerId || ''}
        onChange={(e) => handleBookDataChange('providerId', e.target.value)}
      />
    </div> */}
    
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
export default BookDataFormThree;