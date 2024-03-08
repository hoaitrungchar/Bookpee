USE assign_db;
DELIMITER |
Create Trigger assign_db.rate_only_bought_insert
before insert on assign_db.rate
for each row	
BEGIN
	Declare is_bought_book INT default 0;
    if (new.book_id <= 0) then
		signal sqlstate '45000' set message_text ='Mã sách không hợp lệ';
	end if;
	
	if (new.adult_id <= 0) then
		signal sqlstate '45000' set message_text ='Mã khách hàng không hợp lệ';
	end if;
	
	if not (select exists (select * from book where book.book_id = book_id)) then
		signal sqlstate '45000' set message_text ='Sách không tồn tại';
	end if;
	
	if not (select exists (select * from adult where adult.customer_id = customer_id)) then
		signal sqlstate '45000' set message_text ='Người dùng không tồn tại';
	end if;
    
	With book_bought AS
	(SELECT book_id, adult_id
	FROM confirm
	Inner join contain on confirm.order_id=contain.order_id
    Join order_ on order_.order_id=contain.order_id
    Where book_id=new.book_id and adult_id=new.adult_id and order_.status_='Hoàn tất')
    
    SELECT Count(*)
    INTO is_bought_book
	FROM book_bought;
    
    if (is_bought_book<=0) then
		signal sqlstate '45000' set message_text ='Người dùng phải mua mới được quyền đánh giá điểm cuốn sách';
    end if;
END;
|
Create Trigger assign_db.rate_only_bought_update
before update on assign_db.rate
for each row	
BEGIN
	Declare is_bought_book INT default 0;
    if (new.book_id <= 0) then
		signal sqlstate '45000' set message_text ='Mã sách không hợp lệ';
	end if;
	
	if (new.adult_id <= 0) then
		signal sqlstate '45000' set message_text ='Mã khách hàng không hợp lệ';
	end if;
	
	if not (select exists (select * from book where book.book_id = book_id)) then
		signal sqlstate '45000' set message_text ='Sách không tồn tại';
	end if;
	
	if not (select exists (select * from adult where adult.customer_id = customer_id)) then
		signal sqlstate '45000' set message_text ='Người dùng không tồn tại';
	end if;
    
    
	With book_bought AS
	(SELECT book_id, adult_id
	FROM confirm
	Inner join contain on confirm.order_id=contain.order_id
    Join order_ on order_.order_id=contain.order_id
    Where book_id=new.book_id and adult_id=new.adult_id and order_.status_='Hoàn tất')
    
    SELECT Count(*)
    INTO is_bought_book
	FROM book_bought;
    
    if (is_bought_book<=0) then
		signal sqlstate '45000' set message_text ='Người dùng phải mua mới được quyền đánh giá điểm cuốn sách';
    end if;
END;
|

Create Trigger assign_db.have_match_genres_insert
before insert on assign_db.have_
for each row	
BEGIN
	Declare is_having_genres INT default 0;
    
    With book_genres As
    (Select book_id
    From genres_book p1
    inner join discount p2 on p1.genres=p2.genres
    where book_id=new.book_id and discount_id=new.discount_id)
    
    Select Count(*)
    Into is_having_genres 
    from book_genres;
    
    If (is_having_genres<=0) then
		signal sqlstate '45000' set message_text ='Sách không thuộc thể loại của chương trình khuyến mãi này';
    end if;
END;
|
Create Trigger assign_db.have_match_genres_update
before update on assign_db.have_
for each row	
BEGIN
	Declare is_having_genres INT default 0;
    
    With book_genres As
    (Select book_id
    From genres_book p1
    inner join discount p2 on p1.genres=p2.genres
    where book_id=new.book_id and discount_id=new.discount_id)
    
    Select Count(*)
    Into is_having_genres 
    from book_genres;
    
    If (is_having_genres<=0) then
		signal sqlstate '45000' set message_text ='Sách không thuộc thể loại của chương trình khuyến mãi này';
    end if;
END
|
Create Trigger assign_db.adult_age_16_insert
before insert on assign_db.adult
for each row	
BEGIN
	Declare customer_birthday date;
    Declare age INT default 0;
	SELECT birthday into customer_birthday
	FROM customer
	WHERE customer_id=new.customer_id;
	SELECT TIMESTAMPDIFF(YEAR, customer_birthday, CURDATE()) into age;
    If (age<16) then
		signal sqlstate '45000' set message_text ='Tuổi của tài khoản trưởng thành phải lớn hơn bằng 16';
    end if;
END
|

Create Trigger assign_db.adult_age_16_update
before update on assign_db.adult
for each row	
BEGIN
	Declare customer_birthday date;
    Declare age INT default 0;
	SELECT birthday into customer_birthday
	FROM customer
	WHERE customer_id=new.customer_id;
	SELECT TIMESTAMPDIFF(YEAR, customer_birthday, CURDATE()) into age;
    If (age<16) then
		signal sqlstate '45000' set message_text ='Tuổi của tài khoản trưởng thành phải lớn hơn bằng 16';
    end if;
END
|

Create Trigger assign_db.adult_child_16_insert
before insert on assign_db.child
for each row	
BEGIN
	Declare customer_birthday date;
    Declare age INT default 0;
	SELECT birthday into customer_birthday
	FROM customer
	WHERE customer_id=new.customer_id;
	SELECT TIMESTAMPDIFF(YEAR, customer_birthday, CURDATE()) into age;
    If (age>16) then
		signal sqlstate '45000' set message_text ='Tuổi của tài khoản trẻ em phải bé hơn 16';
    end if;
END
|

Create Trigger assign_db.child_age_16_update
before update on assign_db.child
for each row	
BEGIN
	Declare customer_birthday date ;
    Declare age INT default 0;
	SELECT birthday into customer_birthday
	FROM customer
	WHERE customer_id=new.customer_id;
	SELECT TIMESTAMPDIFF(YEAR, customer_birthday, CURDATE()) into age;
    If (age>=16) then
		signal sqlstate '45000' set message_text ='Tuổi của tài khoản trẻ em phải bé hơn 16';
    end if;
END
-- |
-- Create Trigger assign_db.apply_for_membership_match
-- before update on assign_db.apply_for
-- for each row	
-- BEGIN
-- 	Declare membership_customer INT ;
--     Declare membership_promotion INT;
--     
--     Select membership
--     from  promotion_code
--     into membership_customer;
--     
--     
--     If (age>=16) then
-- 		signal sqlstate '45000' set message_text ='Tuổi của tài khoản trẻ em phải bé hơn 16';
--     end if;
-- END
|
Create Trigger assign_db.contain_age_insert
before insert on assign_db.contain
for each row	
BEGIN
	Declare customer_id_of_order int;
	Declare customer_birthday date ;
    Declare age INT default 0;
    Declare book_reading_age int;
    
    Select customer_id into customer_id_of_order
    From order_
    where order_.order_id=new.order_id;
    
	SELECT birthday into customer_birthday
	FROM customer
	WHERE customer_id=customer_id_of_order;
    
	SELECT TIMESTAMPDIFF(YEAR, customer_birthday, CURDATE()) into age;
    
    Select reading_age
    into book_reading_age
    From book 
    Where book.book_id=new.book_id;
    
    If (age<book_reading_age) then
		signal sqlstate '45000' set message_text ='Tuổi của tài khoản không đủ để đọc cuốn sách này';
    end if;
END
|
Create Trigger assign_db.contain_age_update
before update on assign_db.contain
for each row	
BEGIN
	Declare customer_id_of_order int;
	Declare customer_birthday date ;
    Declare age INT default 0;
    Declare book_reading_age int;
    
    Select customer_id into customer_id_of_order
    From order_
    where order_.order_id=new.order_id;
	SELECT birthday into customer_birthday
	FROM customer
	WHERE customer_id=customer_id_of_order;
	SELECT TIMESTAMPDIFF(YEAR, customer_birthday, CURDATE()) into age;
    
    Select reading_age
    into book_reading_age
    From book 
    Where book.book_id=new.book_id;
    
    If (age<book_reading_age) then
		signal sqlstate '45000' set message_text ='Tuổi của tài khoản không đủ để đọc cuốn sách này';
    end if;
END
|
Create Trigger assign_db.contain_same_provider_insert
before insert on assign_db.contain
for each row	
BEGIN
	Declare num_provider int;
	Select count(Distinct provider_id)
    into num_provider
    from contain c1
    inner join book b1 on c1.book_id=b1.book_id
    where c1.order_id=new.order_id;
    
    If (num_provider>=2) then
		signal sqlstate '45000' set message_text ='Các cuốn sách cần thuộc cùng một nhà cung cấp.';
    end if;
END
|
Create Trigger assign_db.contain_same_provider_update
before update on assign_db.contain
for each row	
BEGIN
	Declare num_provider int;
	Select count(Distinct provider_id)
    into num_provider
    from contain c1
    inner join book b1 on c1.book_id=b1.book_id
    where c1.order_id=new.order_id;
    
    If (num_provider>=2) then
		signal sqlstate '45000' set message_text ='Các cuốn sách cần thuộc cùng một nhà cung cấp.';
    end if;
END
|
Create trigger assign_db.contain_ebook_buy_1_insert
before insert on assign_db.contain
for each row	
BEGIN
	Declare is_kindle_book INT;
    Declare is_audio_book INT;
    Declare customer_id_of_order INT;
    Declare is_bought INT;
    
    Select customer_id
    into customer_id_of_order
    from order_
    where order_id=new.order_id;
    
    Select count(*)
    into is_bought
    from order_ o1 
    inner join contain c1 on o1.order_id=c1.order_id
    where o1.customer_id=customer_id_of_order and c1.book_id=new.book_id;
    
    Select count(*)
    into is_kindle_book
    from kindle_book
    where book_id=new.book_id;
    
    Select count(*)
    into is_audio_book
    from audio_book
    where book_id=new.book_id;
    
    if((is_kindle_book!=0 or is_audio_book!=0) and is_bought >1) then
		signal sqlstate '45000' set message_text ='Các cuốn sách bản điện tử chỉ được mua một lân.';
    end if;
    
	if((is_kindle_book!=0 or is_audio_book!=0) and new.quantity >1) then
		signal sqlstate '45000' set message_text ='Các cuốn sách bản điện tử chỉ được mua 1 quyển.';
    end if;
END
|
Create trigger assign_db.contain_ebook_buy_1_update
before update on assign_db.contain
for each row	
BEGIN
	Declare is_kindle_book INT;
    Declare is_audio_book INT;
    Declare customer_id_of_order INT;
    Declare is_bought INT;
    
    
    Select customer_id
    into customer_id_of_order
    from order_
    where order_id=new.order_id;
    
    Select count(*)
    into is_bought
    from order_ o1 
    inner join contain c1 on o1.order_id=c1.order_id
    where o1.customer_id=customer_id_of_order and c1.book_id=new.book_id;
    
    Select count(*)
    into is_kindle_book
    from kindle_book
    where book_id=new.book_id;
    
    Select count(*)
    into is_audio_book
    from audio_book
    where book_id=new.book_id;
    
    if((is_kindle_book!=0 or is_audio_book!=0) and is_bought >1) then
		signal sqlstate '45000' set message_text ='Các cuốn sách bản điện tử chỉ được mua một lân.';
    end if;
    
	if((is_kindle_book!=0 or is_audio_book!=0) and new.quantity >1) then
		signal sqlstate '45000' set message_text ='Các cuốn sách bản điện tử chỉ được mua 1 quyển.';
    end if;
    
END
|
Create trigger  assign_db.contain_book_quantity_insert
before insert on assign_db.contain
for each row	
BEGIN
	Declare book_quantity INT;
    Select quantity into book_quantity
    from book
    where book_id=new.book_id;
    
    if(book_quantity<new.quantity) then
		signal sqlstate '45000' set message_text ='Không đủ số lượng sách.';
    end if;
END
|
Create trigger  assign_db.contain_book_quantity_update
before update on assign_db.contain
for each row	
BEGIN
	Declare book_quantity INT;
    Select quantity into book_quantity
    from book
    where book_id=new.book_id;
    
    if(book_quantity<new.quantity) then
		signal sqlstate '45000' set message_text ='Không đủ số lượng sách.';
    end if;
END
|
Create trigger assign_db.apply_for_insert_check_date_and_quantity
before insert on assign_db.apply_for
for each row
Begin
	Declare customer_apply_id int;
	Declare used_quantity int;
    Declare time_of_order datetime;
	Declare start_date_of_promotion datetime;
    Declare end_date_of_promotion datetime;
    Declare initial_quantity int;

    Select customer_id into customer_apply_id
    from order_
    where order_id=new.order_id;
    
    Select order_time into  time_of_order
    from order_
    where order_id=new.order_id;
    
	Select start_date into  start_date_of_promotion
    from promotion_code
    where code_id=new.promotion_code_id;
    
    Select init_quantity into  initial_quantity
    from promotion_code
    where code_id=new.promotion_code_id;
        
    Select end_date into  end_date_of_promotion
    from promotion_code
    where code_id=new.promotion_code_id;
    
    Select count(*)
    into used_quantity
    from apply_for a1
    inner join order_ o1 on a1.order_id=o1.order_id 
    where a1.promotion_code_id=new.promotion_code_id and o1.customer_id =customer_apply_id;
    
    If time_of_order <start_date_of_promotion then 
			signal sqlstate '45000' set message_text ='Mã giảm giá này chưa đến thời gian sử dụng.';
	end if;
    If time_of_order >end_date_of_promotion then 
			signal sqlstate '45000' set message_text='Mã giảm giá này đã quá thời gian sử dụng.';
	end if;
    
    if initial_quantity-used_quantity <=0 then 
			signal sqlstate '45000' set message_text="Hết hạn sử dụng mã giảm giá";
	end if;
END
|

Create trigger assign_db.apply_for_update_check_date_and_quantity
before update on assign_db.apply_for
for each row
Begin
	Declare customer_apply_id int;
	Declare used_quantity int;
    Declare time_of_order datetime;
	Declare start_date_of_promotion datetime;
    Declare end_date_of_promotion datetime;
    Declare initial_quantity int;

    Select customer_id into customer_apply_id
    from order_
    where order_id=new.order_id;
    
    Select order_time into  time_of_order
    from order_
    where order_id=new.order_id;
    
	Select start_date into  start_date_of_promotion
    from promotion_code
    where code_id=new.promotion_code_id;
    
    Select init_quantity into  initial_quantity
    from promotion_code
    where code_id=new.promotion_code_id;
        
    Select end_date into  end_date_of_promotion
    from promotion_code
    where code_id=new.promotion_code_id;
    
    Select count(*)
    into used_quantity
    from apply_for a1
    inner join order_ o1 on a1.order_id=o1.order_id 
    where a1.promotion_code_id=new.promotion_code_id and o1.customer_id =customer_apply_id;
    
    If time_of_order <start_date_of_promotion then 
			signal sqlstate '45000' set message_text ='Mã giảm giá này chưa đến thời gian sử dụng.';
	end if;
    If time_of_order >end_date_of_promotion then 
			signal sqlstate '45000' set message_text='Mã giảm giá này đã quá thời gian sử dụng.';
	end if;
    
    if initial_quantity-used_quantity <=0 then 
			signal sqlstate '45000' set message_text="Hết hạn sử dụng mã giảm giá";
	end if;
END
|
DELIMITER ;