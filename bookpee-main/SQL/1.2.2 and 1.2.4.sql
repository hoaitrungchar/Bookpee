-- 1.2.2 function isAdult và trigger cho việc thêm, sửa customer
DELIMITER |
	create function isAdult(customer_id int)
    returns bool
	deterministic
    begin
		declare cur_date date;
        declare birth date;
        declare age int;
        declare result bool;
    
		if(customer_id <= 0) then
			signal sqlstate '45000' set message_text ='Mã khách hàng không hợp lệ';
        end if;
        
        if not (select exists (select * from customer where customer.customer_id = customer_id)) then
			signal sqlstate '45000' set message_text ='Mã khách hàng không tồn tại';
        end if;
		
        set cur_date = curdate();
        select birthday into birth from customer where customer.customer_id = customer_id;
        set age = timestampdiff(year, birth, cur_date);
        
        if (age <= 0) then
			signal sqlstate '45000' set message_text ='Ngày sinh không hợp lệ';
        end if;
        
        if (age < 16) then
			set result = false;
		else set result = true;
        end if;
        
        return result;
    end;
|
DELIMITER |
	create trigger add_customer_before
    before insert on customer
    for each row 
    begin
		declare cur date;
        set cur = curdate();
    
		if(new.customer_id < 0) then 
			signal sqlstate '45000' set message_text ='ID người dùng không hợp lệ';
		end if;
        
        if not (new.gender ='F' or new.gender='M' or new.gender='O') then
			signal sqlstate '45000' set message_text ='Giới tính chỉ có thể là Nam (M), Nữ (F) hoặc khác (O)';
		end if;
        
        if(new.birthday >= cur) then
			signal sqlstate '45000' set message_text ='Ngày sinh không hợp lệ';
		end if;
    end;
|
DELIMITER |
	create trigger add_customer_after
    after insert on customer
    for each row
    begin
		if(isAdult(new.customer_id)) then
			insert into adult value(new.customer_id, '0000000000', 0);
		else insert into child value(new.customer_id, 99);
        end if;
    end;
|
DELIMITER |
	create trigger update_customer_before 
    before update on customer
    for each row 
    begin
		declare cur date;
        set cur = curdate();	
    
		if(new.customer_id <= 0) then 
			signal sqlstate '45000' set message_text ='ID người dùng không hợp lệ';
		end if;
        
        if not (new.gender ='F' or new.gender='M' or new.gender='O') then
			signal sqlstate '45000' set message_text ='Giới tính chỉ có thể là Nam (M), Nữ (F) hoặc khác (O)';
		end if;
        
        if(new.birthday >= cur) then
			signal sqlstate '45000' set message_text ='Ngày sinh không hợp lệ';
		end if;
    end;
|
DELIMITER |
	create trigger update_customer_after
    after update on customer
    for each row
    begin
		if(select isAdult(new.customer_id)) then
			if not (select exists (select * from adult where adult.customer_id = new.customer_id)) then
				delete from child where child.customer_id = new.customer_id;
                insert into adult value (new.customer_id, '0000000000', 0);
			end if;
		else 
			if not (select exists (select * from child where child.customer_id = new.customer_id)) then
				delete from adult where adult.customer_id = new.customer_id;
                insert into child value (new.customer_id, 99);
			end if;
        end if;
    end;
|
-- 1.2.4 Hàm tính tổng tiền đơn hàng
DELIMITER |
create function cal_price_order___(a_order_id int) returns int READS SQL DATA
begin
	Declare date_of_order datetime;
	Declare  code_promo_value int;
    Declare code_max_promo_value int;
    Declare temp_discount int;
    Declare grand_total_of_order int;
	Declare item_total_value int;
	Declare discount_total_value int;
    
    if (a_order_id <= 0) then
		signal sqlstate '45000' set message_text ='Mã đơn hàng không hợp lệ';
	end if;
    
    if not (select exists (select * from order_ where order_.order_id = a_order_id)) then
		signal sqlstate '45000' set message_text ='Đơn hàng không tồn tại';
	end if;
        
    select COALESCE(promo_value,0) into code_promo_value
    from promotion_code
    join apply_for on apply_for.promotion_code_id=promotion_code.code_id
    where apply_for.order_id=a_order_id;
    
	select COALESCE(maximum_promo,0) into code_max_promo_value
    from promotion_code
    join apply_for on apply_for.promotion_code_id=promotion_code.code_id
    where apply_for.order_id=a_order_id;
    
    
    
    Select order_time into date_of_order
    from order_
    where order_.order_id=a_order_id;
    
    with discount_in_time AS(
    select discount_id, discount_value
    from discount
    where start_date<=date_of_order and date_of_order<=end_date),
     book_and_quantity AS(
	Select contain.book_id, contain.quantity, book.price
    from contain
    join book on contain.book_id=book.book_id
    where order_id=a_order_id),
    
	book_and_discount AS(
    select book_and_quantity.book_id, book_and_quantity.quantity, book_and_quantity.price, have_.discount_id
    from book_and_quantity 
    left join have_ on book_and_quantity.book_id=have_.book_id),
    
    book_quantity_discount_value AS(
    Select book_id,quantity, price, discount_in_time.discount_value
    from book_and_discount
    left join discount_in_time on book_and_discount.discount_id=discount_in_time.discount_id),
     price_of_order As(
    SELECT
 SUM(subquery.avg_price * subquery.avg_quantity) AS item_total,
 SUM(subquery.avg_price *subquery.avg_quantity* subquery.max_discount_value/100) AS discount_total,
SUM(subquery.avg_price *subquery.avg_quantity* (100-subquery.max_discount_value)/100) AS  grand_total
FROM
    (
        SELECT
            AVG(book_id) AS avg_book_id,
            AVG(quantity) AS avg_quantity,
            AVG(price) AS avg_price,
            COALESCE(MAX(discount_value),0) AS max_discount_value
        FROM
			book_quantity_discount_value
		GROUP BY
            book_id
            )As subquery
		)
	
    Select discount_total,item_total,grand_total into temp_discount,  item_total_value, grand_total_of_order
    from price_of_order;
	

     
	if(code_promo_value>0) then
		set discount_total_value=temp_discount+least(item_total_value*code_promo_value,code_max_promo_value);
		set grand_total_of_order=item_total_value-discount_total_value;
	end if;
    
    return grand_total_of_order;

end;
|
-- 1.2.4 hàm tính điểm đánh giá trung bình
DELIMITER |
	create function calRating(book_id int)
    returns double
    deterministic
    begin
		declare avg_score double;
    
		if(book_id <= 0) then
			signal sqlstate '45000' set message_text ='Mã sách không hợp lệ';
        end if;
        
        if not (select exists (select * from book where book.book_id = book_id)) then
			signal sqlstate '45000' set message_text ='Sách không tồn tại';
        end if;
        
        if not (select exists (select * from rate where rate.book_id = book_id)) then
			signal sqlstate '45000' set message_text ='Sách chưa có điểm đánh giá';
        end if;
        
        select avg(score) into avg_score from rate where rate.book_id = book_id group by book_id;
        
        return avg_score;
    end;
|
DELIMITER ;

