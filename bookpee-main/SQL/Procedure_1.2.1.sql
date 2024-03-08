use assign_db;

DELIMITER |
create procedure add_book (
	in title varchar(255),
	in reading_age int,
	in price double,
	in language_ varchar(255),
	in edition varchar(255),
	in publication_date DATE,
	in publisher_name varchar(255),
	in isbn varchar(13),
	in provider_id int,
	in quantity int,
	out  return_book_id int
)
begin
    if title is null then 
		signal sqlstate '45000' set message_text ='Tên của sách không được để trống';
    end if;
    if reading_age is null then 
		signal sqlstate '45000' set message_text ='Giới hạn tuổi của sách không được để trống';
    end if;
    if price is null then 
		signal sqlstate '45000' set message_text ='Giá tiền của sách không được để trống';
    end if;
    if language_ is null then 
		signal sqlstate '45000' set message_text ='Ngôn ngữ của sách không được để trống';
    end if;
    if edition is null then 
		signal sqlstate '45000' set message_text ='Phiên bản  của sách không được để trống';
    end if;
    if publication_date is null then 
		signal sqlstate '45000' set message_text ='Ngày phát hành của sách không được để trống';
    end if;
	if publisher_name is null then 
		signal sqlstate '45000' set message_text ='Tên nhà phát hành của sách không được để trống';
    end if;
	if  isbn is null then 
		signal sqlstate '45000' set message_text ='Mã ISBN của sách không được để trống';
    end if;
	if  quantity is null then 
		signal sqlstate '45000' set message_text ='Số lượng cuốn sách không được để trống';
    end if;
    
    if (reading_age <= 0) then 
		signal sqlstate '45000' set message_text ='Độ tuổi giới hạn đọc sách phải lớn hơn 0';
	end if;
    if (price <= 0) then 
		signal sqlstate '45000' set message_text ='Giá bán của sách phải lớn hơn 0';
	end if;
    if not (isbn  regexp '^[0-9]{13}') then
		signal sqlstate '45000' set message_text ='Mã ISBN của quyển sách phải là 13 ký tự chữ số';
	end if;
    if (provider_id <= 0) then 
		signal sqlstate '45000' set message_text ='ID của nhà cung cấp sách phải lớn hơn 0';
	end if;
    if (quantity < 0) then 
		signal sqlstate '45000' set message_text ='Số lượng sách không thể là số âm';
	end if;

	if (title ='') then 
		signal sqlstate '45000' set message_text ='Tên sách không được để trống';
	end if;
    
    insert into book value (NUll, title, reading_age, price, language_, edition, publication_date, publisher_name, isbn, provider_id, quantity);
	SELECT LAST_INSERT_ID() AS return_book_id;
	end;	
|
DELIMITER |
create procedure add_write_(in inpenname varchar(255), in inbook_id int )
begin
	declare get_id_author int default 0;
    if inpenname is null then
    		delete from book where book.book_id=inbook_id;
		signal sqlstate '45000' set message_text ='Bút danh tác giả không được để trống.';
    end if;
    
    if inbook_id is null then
		delete from book where book.book_id=inbook_id;
		signal sqlstate '45000' set message_text ='ID sách không được để trống.';
    end if;
    
select author_id into get_id_author 
	from author
	where author.penname=inpenname;
	if get_id_author =0 then
		insert into author value (null,inpenname);
-- 		SELECT author_id into get_id_author from author where author.penname=inpenname;
		SELECT LAST_INSERT_ID() into get_id_author;
	end if;
    if get_id_author !=0 then 
		insert into write_ value(inbook_id,get_id_author);
	end if;
		
end;
|
-- DELIMITER |
-- create procedure delete_write_(in inpenname varchar(255), in book_id int)
-- begin
-- 	 Declare id_of_author int default 0;
-- 	Select author_id into id_of_author
-- 		from author 
-- 		where penname=inpenname;
-- 	 delete from write_ where  write_.book_id = book_id and write_.author_id=id_of_author;
-- 		
-- end;
-- |
DELIMITER |
create procedure add_genres_(in genre_of_book  varchar(255), in inbook_id int )
begin
	if genre_of_book not in ('Kinh doanh','Truyện tranh','Giáo dục','Hư cấu','Sức khỏe','Lịch sử','Luật','Thần thoại','Y học','Chính trị','Lãng mạn','Tôn giáo','Khoa học','Self-help','Thể thao','Công nghệ','Du lịch','Thơ ca') then
		delete from book where book.book_id=inbook_id;
                signal sqlstate '45000' set message_text ='Thể loại không hợp lệ.';
	end if;
	insert into genres_book value(inbook_id,genre_of_book);
	
end;
|
DELIMITER |
create procedure add_book_type_(in type_of_book  varchar(255), in inbook_id int, in size int, in paper_length int,in time_ time,in format_ varchar(255), in dimensions varchar(255),  in weight double, in status_ varchar(255))
begin
	if type_of_book is null then
		delete from book where book.book_id=inbook_id;
		signal sqlstate '45000' set message_text ='Loại sách không được để trống.';
    end if;
    
    if type_of_book not in ('KindleBook','AudioBook','PhysicalBook') then
    	delete from book where book.book_id=inbook_id;
		signal sqlstate '45000' set message_text ='Loại sách không hợp lệ.';
    end if;
	
    if(type_of_book ="KindleBook") then
		if paper_length is null then
        	delete from book where book.book_id=inbook_id;
			signal sqlstate '45000' set message_text ='Số trang sách không được để trống.';
		end if;
		if paper_length <= 0 then
        	delete from book where book.book_id=inbook_id;
			signal sqlstate '45000' set message_text ='Số trang sách phải lớn hơn 0.';
		end if;
		if size is null then
        	delete from book where book.book_id=inbook_id;
			signal sqlstate '45000' set message_text ='Kích thước sách không được để trống.';
		end if;
		if size <= 0 then
        	delete from book where book.book_id=inbook_id;
			signal sqlstate '45000' set message_text ='Kích thước sách phải lớn hơn 0.';
		end if;
        
		insert into kindle_book value( inbook_id,size, paper_length);
    end if;
    
	if(type_of_book ="AudioBook") then
        if size is null then
        	delete from book where book.book_id=inbook_id;
			signal sqlstate '45000' set message_text ='Kích thước sách không được để trống.';
		end if;
		if size <= 0 then
        	delete from book where book.book_id=inbook_id;
			signal sqlstate '45000' set message_text ='Kích thước sách phải lớn hơn 0.';
		end if;
        if  time_ is null then
        	delete from book where book.book_id=inbook_id;
			signal sqlstate '45000' set message_text ='Thời gian sách không được để trống.';
		end if;
		if  time_ <=0 then
			delete from book where book.book_id=inbook_id;
			signal sqlstate '45000' set message_text ='Thời gian sách không được âm.';
		end if;
        insert into audio_book value(inbook_id,size,time_);
    end if;
    
	if(type_of_book ="PhysicalBook") then
		if format_ is null then
        	delete from book where book.book_id=inbook_id;
			signal sqlstate '45000' set message_text ='Định dạng sách không được để trống.';
		end if;
        
		if dimensions is null then
        	delete from book where book.book_id=inbook_id;
			signal sqlstate '45000' set message_text ='Kích thước cuốn sách không được để trống.';
		end if;
        
		if paper_length is null then
        	delete from book where book.book_id=inbook_id;
			signal sqlstate '45000' set message_text ='Số trang sách không được để trống.';
		end if;
        
		if paper_length <= 0 then
        	delete from book where book.book_id=inbook_id;
			signal sqlstate '45000' set message_text ='Số trang sách phải lớn hơn 0.';
		end if;

        if weight is null then
        	delete from book where book.book_id=inbook_id;
			signal sqlstate '45000' set message_text ='Khối lượng sách không được để trống.';
		end if;
        
		if weight <= 0 then
        	delete from book where book.book_id=inbook_id;
			signal sqlstate '45000' set message_text ='Khối lượng sách phải lớn hơn 0.';
		end if;

        if status_ is null then
        	delete from book where book.book_id=inbook_id;
			signal sqlstate '45000' set message_text ='Trạng thái sách không được để trống.';
		end if;
        
		insert into physical_book value(inbook_id,format_,dimensions,paper_length, weight, status_);
        
    end if;
		
end;
|
-- DELIMITER |
-- create procedure delete_genres_(in genre_of_book  varchar(255), in book_id int)
-- begin
-- 	if genre_of_book not in ('Kinh doanh','Truyện tranh','Giáo dục','Hư cấu','Sức khỏe','Lịch sử','Luật','Thần thoại','Y học','Chính trị','Lãng mạn','Tôn giáo','Khoa học','Self-help','Thể thao','Công nghệ','Du lịch','Thơ ca') then
-- 		signal sqlstate '45000' set message_text ='Thể loại không hợp lệ.';
-- 	end if;
-- 	 delete from genres_book where  genres_book.book_id = book_id and genres_book.genres=genre_of_book;
-- 		
-- end;
-- |
	
DELIMITER |

create procedure update_book (
	in inbook_id int, 
	in title varchar(255),
	in reading_age int,
	in price double,
	in language_ varchar(255),
	in edition varchar(255),
	in publication_date DATE,
	in publisher_name varchar(255),
	in isbn varchar(13),
	in quantity int
)
begin
	if inbook_id is null then 
		signal sqlstate '45000' set message_text ='ID của sách không được để trống';
    end if;
    if title is null then 
		signal sqlstate '45000' set message_text ='Tên của sách không được để trống';
    end if;
    if reading_age is null then 
		signal sqlstate '45000' set message_text ='Giới hạn tuổi của sách không được để trống';
    end if;
    if price is null then 
		signal sqlstate '45000' set message_text ='Giá tiền của sách không được để trống';
    end if;
    if language_ is null then 
		signal sqlstate '45000' set message_text ='Ngôn ngữ của sách không được để trống';
    end if;
    if edition is null then 
		signal sqlstate '45000' set message_text ='Phiên bản  của sách không được để trống';
    end if;
    if publication_date is null then 
		signal sqlstate '45000' set message_text ='Ngày phát hành của sách không được để trống';
    end if;
	if publisher_name is null then 
		signal sqlstate '45000' set message_text ='Tên nhà phát hành của sách không được để trống';
    end if;
	if  isbn is null then 
		signal sqlstate '45000' set message_text ='Mã ISBN của sách không được để trống';
    end if;
	if  quantity is null then 
		signal sqlstate '45000' set message_text ='Số lượng cuốn sách không được để trống';
    end if;
	if (inbook_id <= 0) then 
		signal sqlstate '45000' set message_text ='ID của sách phải lớn hơn 0';
	end if;
    if not (select exists (select * from book where book.book_id = inbook_id)) then
		signal sqlstate '45000' set message_text ='ID của sách không tồn tại';
	end if;
    if (reading_age <= 0) then 
		signal sqlstate '45000' set message_text ='Độ tuổi giới hạn đọc sách phải lớn hơn 0';
	end if;
    if (price <= 0) then 
		signal sqlstate '45000' set message_text ='Giá bán của sách phải lớn hơn 0';
	end if;
    if not (isbn  regexp '^[0-9]{13}') then
		signal sqlstate '45000' set message_text ='Mã ISBN của quyển sách phải là 13 ký tự chữ số';
	end if;
    if (quantity < 0) then 
		signal sqlstate '45000' set message_text ='Số lượng sách không thể là số âm';
	end if;
    
    update book set 
		book.title = title,
		book.reading_age = reading_age,
		book.price = price,
		book.language_ = language_,
		book.edition = edition,
		book.publication_date = publication_date,
		book.publisher_name = publisher_name,
		book.isbn = isbn,
		book.quantity = quantity
    where book.book_id = inbook_id;
end;
|
DELIMITER |
create procedure update_book_type_(in type_of_book  varchar(255), in inbook_id int, in size int, in paper_length int,in time_ time,in format_ varchar(255), in dimensions varchar(255),  in weight double, in status_ varchar(255))
begin
	if type_of_book is null then
		signal sqlstate '45000' set message_text ='Loại sách không được để trống.';
    end if;
    
    if type_of_book not in ('KindleBook','AudioBook','PhysicalBook') then
		signal sqlstate '45000' set message_text ='Loại sách không hợp lệ.';
    end if;
	
    if(type_of_book ="KindleBook") then
		if paper_length is null then
			signal sqlstate '45000' set message_text ='Số trang sách không được để trống.';
		end if;
        
		if paper_length <= 0 then
			signal sqlstate '45000' set message_text ='Số trang sách phải lớn hơn 0.';
		end if;

		if size is null then
			signal sqlstate '45000' set message_text ='Kích thước sách không được để trống.';
		end if;
        
		if size <= 0 then
			signal sqlstate '45000' set message_text ='Kích thước sách phải lớn hơn 0.';
		end if;

        update kindle_book set 
        kindle_book.size=size, 
        kindle_book.paper_length=paper_length 
        where kindle_book.book_id=inbook_id;
        
        
		
    end if;
    
	if(type_of_book ="AudioBook") then
        if size is null then
			signal sqlstate '45000' set message_text ='Kích thước sách không được để trống.';
		end if;
        
		if size <= 0 then
			signal sqlstate '45000' set message_text ='Kích thước sách phải lớn hơn 0.';
		end if;

        if  time_ is null then
			signal sqlstate '45000' set message_text ='Thời gian sách không được để trống.';
		end if;
        if  time_ <=0 then
			signal sqlstate '45000' set message_text ='Thời gian sách không được âm.';
		end if;
        update audio_book set 
        audio_book.size=size,
        audio_book.time_=time_
        where audio_book.book_id=inbook_id;
    end if;
    
	if(type_of_book ="PhysicalBook") then
		if format_ is null then
			signal sqlstate '45000' set message_text ='Định dạng sách không được để trống.';
		end if;
		if dimensions is null then
			signal sqlstate '45000' set message_text ='Kích thước cuốn sách không được để trống.';
		end if;
		if paper_length is null then
			signal sqlstate '45000' set message_text ='Số trang sách không được để trống.';
		end if;
		if paper_length <= 0 then
			signal sqlstate '45000' set message_text ='Số trang sách phải lớn hơn 0.';
		end if;
        if weight is null then
			signal sqlstate '45000' set message_text ='Khối lượng sách không được để trống.';
		end if;
		if weight <= 0 then
			signal sqlstate '45000' set message_text ='Khối lượng sách phải lớn hơn 0.';
		end if;
        if status_ is null then
			signal sqlstate '45000' set message_text ='Trạng thái sách không được để trống.';
		end if;
        
		update physical_book set
       physical_book.format_=format_,
       physical_book.dimensions=dimensions,
       physical_book.paper_length=paper_length,
       physical_book.weigth =weight,
       physical_book.status_=status_
       where physical_book.book_id=inbook_id;
        
    end if;
		
end;
|

DELIMITER |
create procedure delete_book(in book_id int)
begin
	Declare is_book_buy int default 0;
    Select count(*) into is_book_buy from contain where contain.book_id=book_id;
    if(book_id is null) then
    		signal sqlstate '45000' set message_text ='ID của sách không được để trống';
	end if;
    if(is_book_buy!=0) then
		signal sqlstate '45000' set message_text ='Không thể xóa sách đã có đơn mua ';
    end if;
    
	if (book_id <= 0) then 
		signal sqlstate '45000' set message_text ='ID của sách phải lớn hơn 0';
	end if;
    
    if not (select exists (select * from book where book.book_id = book_id)) then
		signal sqlstate '45000' set message_text ='ID của sách không tồn tại hoặc sách đã xóa từ trước.';
	end if;
    
    delete from book where book.book_id = book_id;
end;
|
