DELIMITER |
Create Trigger assign_db.apply_for_check_membership_insert
before insert on assign_db.apply_for
for each row	
BEGIN
	Declare membership_of_promo ENUM ("Đồng", "Bạc", "Vàng","Kim cương");
    declare total_spent_cus Int default 0;
    
    select total_spent into total_spent_cus 
    from adult
    join confirm on confirm.adult_id=adult.customer_id
    where confirm.order_id=new.order_id;
    
    Select membership into membership_of_promo
    from promotion_code
    where code_id=new.promotion_code_id;
    
    
    
    if(membership_of_promo="Bạc" and total_spent_cus<1000000) then
		signal sqlstate '45000' set message_text='Bạn phải là thành viên Bạc trở lên mới sử dụng được mã giảm giá này.';
    end if;
    
     if(membership_of_promo="Vàng" and total_spent_cus<5000000) then
		signal sqlstate '45000' set message_text='Bạn phải là thành viên Vàng trở lên mới sử dụng được mã giảm giá này.';
    end if;
    
         if(membership_of_promo="Kim cương" and total_spent_cus<10000000) then
		signal sqlstate '45000' set message_text='Bạn phải là thành viên Kim cương trở lên mới sử dụng được mã giảm giá này.';
    end if;
END;
|
Create Trigger assign_db.apply_for_check_membership_update
before update on assign_db.apply_for
for each row	
BEGIN
	Declare membership_of_promo ENUM ("Đồng", "Bạc", "Vàng","Kim cương");
    declare total_spent_cus Int default 0;
    
    select total_spent into total_spent_cus 
    from adult
    join confirm on confirm.adult_id=adult.customer_id
    where confirm.order_id=new.order_id;
    
    Select membership into membership_of_promo
    from promotion_code
    where code_id=new.promotion_code_id;
    
    
    
    if(membership_of_promo="Bạc" and total_spent_cus<1000000) then
		signal sqlstate '45000' set message_text='Bạn phải là thành viên Bạc trở lên mới sử dụng được mã giảm giá này.';
    end if;
    
     if(membership_of_promo="Vàng" and total_spent_cus<5000000) then
		signal sqlstate '45000' set message_text='Bạn phải là thành viên Vàng trở lên mới sử dụng được mã giảm giá này.';
    end if;
    
         if(membership_of_promo="Kim cương" and total_spent_cus<10000000) then
		signal sqlstate '45000' set message_text='Bạn phải là thành viên Kim cương trở lên mới sử dụng được mã giảm giá này.';
    end if;
END;
|

Create Trigger assign_db.apply_for_check_minimum_order
before insert on assign_db.apply_for
for each row	
BEGIN

END;
|
Create Trigger assign_db.apply_for_check_minimum_order_insert
before insert on assign_db.apply_for
for each row	
BEGIN
	Declare price_without_promo int;
    Declare minimum_require int;
    Select min_order into minimum_require
    from promotion_code
    where code_id=new.promotion_code_id;
    
 	set price_without_promo=cal_price_order_to_check_min_promo___(new.order_id);
    
    if(price_without_promo<minimum_require) then
		signal sqlstate '45000' set message_text='Đơn hàng chưa đủ giá trị tối thiểu để sử dụng mã giảm giá này.';
	end if;
END;
|

Create Trigger assign_db.apply_for_check_minimum_order_update
before update on assign_db.apply_for
for each row	
BEGIN
	Declare price_without_promo int;
    Declare minimum_require int;
    Select min_order into minimum_require
    from promotion_code
    where code_id=new.promotion_code_id;
    
	set price_without_promo=cal_price_order_to_check_min_promo___(new.order_id);
    
    if(price_without_promo<minimum_require) then
		signal sqlstate '45000' set message_text='Đơn hàng chưa đủ giá trị tối thiểu để sử dụng mã giảm giá này.';
	end if;
END;
|
DELIMITER ;