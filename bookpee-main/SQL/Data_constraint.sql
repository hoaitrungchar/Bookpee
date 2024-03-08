DELIMITER |

create Trigger assign_db.provider_phone_number_insert
before insert on assign_db.provider
for each row
Begin
	if not (new.phone_number  regexp '^[0]+[0-9]{9}' or new.phone_number  regexp '^[1]+[0-9]{9}') then
		signal sqlstate '45000' set message_text ='Số điện thoại phải có 10 chữ số, bắt đầu bằng 0 hoặc 1';
	end if;
End;
|
create Trigger assign_db.provider_phone_number_update
before update on assign_db.provider
for each row
Begin
	if not (new.phone_number  regexp '^[0]+[0-9]{9}' or new.phone_number  regexp '^[1]+[0-9]{9}') then
		signal sqlstate '45000' set message_text ='Số điện thoại phải có 10 chữ số, bắt đầu bằng 0 hoặc 1';
	end if;
End;
|
create Trigger assign_db.order__phone_number_insert
before insert on assign_db.order_
for each row
Begin
	if not (new.phone_number  regexp '^[0]+[0-9]{9}') then
		signal sqlstate '45000' set message_text ='Số điện thoại phải có 10 chữ số và bắt đầu bằng 0';
	end if;
End;
|
create Trigger assign_db.order__phone_number_update
before update on assign_db.order_
for each row
Begin
	if not (new.phone_number  regexp '^[0]+[0-9]{9}') then
		signal sqlstate '45000' set message_text ='Số điện thoại phải có 10 chữ số và bắt đầu bằng 0';
	end if;
End;
|
create Trigger assign_db.adult__phone_number_insert
before insert on assign_db.adult
for each row
Begin
	if not (new.phone_number  regexp '^[0]+[0-9]{9}') then
		signal sqlstate '45000' set message_text ='Số điện thoại phải có 10 chữ số và bắt đầu bằng 0';
	end if;
End;
|
create Trigger assign_db.adult__phone_number_update
before update on assign_db.adult
for each row
Begin
	if not (new.phone_number  regexp '^[0]+[0-9]{9}') then
		signal sqlstate '45000' set message_text ='Số điện thoại phải có 10 chữ số và bắt đầu bằng 0';
	end if;
End;
|
create Trigger assign_db.contain_quantity_insert
before insert on assign_db.contain
for each row
Begin
	if (new.quantity <=0) then
		signal sqlstate '45000' set message_text ='Số cuốn sách phải lớn hơn 0';
	end if;
End;
|
create Trigger assign_db.contain_quantity_update
before update on assign_db.contain
for each row
Begin
	if (new.quantity <=0) then
		signal sqlstate '45000' set message_text ='Số cuốn sách phải lớn hơn 0';
	end if;
End;
|
create Trigger assign_db.series_insert
before insert on assign_db.series
for each row
Begin
	if (new.number_of_episode <= 0) then
		signal sqlstate '45000' set message_text ='Số quyển sách phải lớn hơn 0';
	end if;
End;
|
create Trigger assign_db.series_update
before update on assign_db.series
for each row
Begin
	if (new.number_of_episode <= 0) then
		signal sqlstate '45000' set message_text ='Số quyển sách phải lớn hơn 0';
	end if;
End;
|
create Trigger assign_db.book_insert
before insert on assign_db.book
for each row
Begin
	if (new.quantity  <0) then
		signal sqlstate '45000' set message_text ='Số cuốn sách phải lớn hơn bằng 0';
	end if;
End;
|
create Trigger assign_db.book_update
before update on assign_db.book
for each row
Begin
	if (new.quantity  <0) then
		signal sqlstate '45000' set message_text ='Số cuốn sách phải lớn hơn bằng 0';
	end if;
End;
|
create Trigger assign_db.rate_score_insert
before insert on assign_db.rate
for each row
Begin
	if (new.score < 1 or new.score > 5) then
		signal sqlstate '45000' set message_text ='Số điểm phải từ 1 đến 5';
	end if;
End;
|
create Trigger assign_db.rate_score_update
before update on assign_db.rate
for each row
Begin
	if (new.score < 1 or new.score > 5) then
		signal sqlstate '45000' set message_text ='Số điểm phải từ 1 đến 5';
	end if;
End;
|
create Trigger assign_db.book_ISBN_insert
before insert on assign_db.book
for each row
Begin
	if not (new.ISBN  regexp '^[0-9]{13}') then
		signal sqlstate '45000' set message_text ='Mã ISBN của cuốn sách phải là 13 ký tự chữ số';
	end if;
End;
|
create Trigger assign_db.book_ISBN_update
before update on assign_db.book
for each row
Begin
	if not (new.ISBN  regexp '^[0-9]{13}') then
		signal sqlstate '45000' set message_text ='Mã ISBN của quyển sách phải là 13 ký tự chữ số';
	end if;
End;
|

create Trigger assign_db.book_price_insert
before insert on assign_db.book
for each row
Begin
	if (new.price < 0) then
		signal sqlstate '45000' set message_text ='Giá tiền của quyển sách phải lớn hơn hoặc bằng 0';
	end if;
End;
|
create Trigger assign_db.book_price_update
before update on assign_db.book
for each row
Begin
	if (new.price < 0) then
		signal sqlstate '45000' set message_text ='Giá tiền của quyển sách phải lớn hơn hoặc bằng 0';
	end if;
End;
|
create Trigger assign_db.discount_discount_value_insert
before insert on assign_db.discount
for each row
Begin
	if (new.discount_value < 0 or new.discount_value > 100) then
		signal sqlstate '45000' set message_text ='Phần trăm giảm giá phải lớn hơn 0 và bé hơn bằng 100';
	end if;
End;
|
create Trigger assign_db.discount_discount_value_update
before update on assign_db.discount
for each row
Begin
	if (new.discount_value < 0 or new.discount_value > 100) then
		signal sqlstate '45000' set message_text ='Phần trăm giảm giá phải lớn hơn 0 và bé hơn bằng 100';
	end if;
End;
|
create Trigger assign_db.promotion_code_promo_value_insert
before insert on assign_db.promotion_code
for each row
Begin
	if (new.promo_value < 0 or new.promo_value > 100) then
		signal sqlstate '45000' set message_text ='Phần trăm giảm giá của mã khuyến mãi phải lớn hơn 0 và bé hơn bằng 100';
	end if;
End;
|
create Trigger assign_db.promotion_code_promo_value_update
before update on assign_db.promotion_code
for each row
Begin
	if (new.promo_value < 0 or new.promo_value > 100) then
		signal sqlstate '45000' set message_text ='Phần trăm giảm giá của mã khuyến mãi phải lớn hơn 0 và bé hơn bằng 100';
	end if;
End;
|
create Trigger assign_db.promotion_code_maximum_promo_insert
before insert on assign_db.promotion_code
for each row
Begin
	if (new.maximum_promo < 0) then
		signal sqlstate '45000' set message_text ='Giá trị giảm tối đa của mã giảm giá phải lớn hơn 0';
	end if;
End;
|
create Trigger assign_db.promotion_code_maximum_promo_update
before update on assign_db.promotion_code
for each row
Begin
	if (new.maximum_promo < 0) then
		signal sqlstate '45000' set message_text ='Giá trị giảm tối đa của mã giảm giá phải lớn hơn 0';
	end if;
End;
|
create Trigger assign_db.customer_gender_insert
before insert on assign_db.customer
for each row
Begin
	if not (new.gender ='F' or new.gender='M' or new.gender='O'  ) then
		signal sqlstate '45000' set message_text ='Giới tính chỉ có thể là Nam (M), Nữ (F) hoặc khác (O)';
	end if;
End;
|
create Trigger assign_db.customer_gender_update
before update on assign_db.customer
for each row
Begin
	if not (new.gender ='F' or new.gender='M' or new.gender='O'  ) then
		signal sqlstate '45000' set message_text ='Giới tính chỉ có thể là Nam (M), Nữ (F) hoặc khác (O)';
	end if;	
End;
|
DELIMITER ;


-- alter table assign_db.rate
-- add CHECK (score>=1 and score <=5);

-- alter table assign_db.provider
-- add CHECK (phone_number regexp '^[0]+[0-9]{9}' );

-- ALTER TABLE assign_db.provider
-- DROP CONSTRAINT provider_chk_1;

-- alter table assign_db.order_
-- add CHECK (phone_number regexp '^[0]' and phone_number regexp '^[0-9]{10}$');


-- DROP TRIGGER assign_db.phone_number1;
-- DROP TRIGGER assign_db.phone_number2;