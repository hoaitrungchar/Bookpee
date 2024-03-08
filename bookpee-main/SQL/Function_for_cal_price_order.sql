DELIMITER |
-- create function cal_price_order___(a_order_id int) returns int READS SQL DATA
-- begin
-- 	Declare date_of_order datetime;
-- 	Declare  code_promo_value int;
--     Declare code_max_promo_value int;
--     Declare temp_discount int;
--     Declare grand_total_of_order int;
-- 	Declare item_total_value int;
--     	Declare discount_total_value int;
--         
--     select COALESCE(promo_value,0) into code_promo_value
--     from promotion_code
--     join apply_for on apply_for.promotion_code_id=promotion_code.code_id
--     where apply_for.order_id=a_order_id;
--     
-- 	select COALESCE(maximum_promo,0) into code_max_promo_value
--     from promotion_code
--     join apply_for on apply_for.promotion_code_id=promotion_code.code_id
--     where apply_for.order_id=a_order_id;
--     
--     
--     
--     Select order_time into date_of_order
--     from order_
--     where order_.order_id=a_order_id;
--     
--     with discount_in_time AS(
--     select discount_id, discount_value
--     from discount
--     where start_date<=date_of_order and date_of_order<=end_date),
--      book_and_quantity AS(
-- 	Select contain.book_id, contain.quantity, book.price
--     from contain
--     join book on contain.book_id=book.book_id
--     where order_id=a_order_id),
--     
-- 	book_and_discount AS(
--     select book_and_quantity.book_id, book_and_quantity.quantity, book_and_quantity.price, have_.discount_id
--     from book_and_quantity 
--     left join have_ on book_and_quantity.book_id=have_.book_id),
--     
--     book_quantity_discount_value AS(
--     Select book_id,quantity, price, discount_in_time.discount_value
--     from book_and_discount
--     left join discount_in_time on book_and_discount.discount_id=discount_in_time.discount_id),
--      price_of_order As(
--     SELECT
--  SUM(subquery.avg_price * subquery.avg_quantity) AS item_total,
--  SUM(subquery.avg_price *subquery.avg_quantity* subquery.max_discount_value/100) AS discount_total,
-- SUM(subquery.avg_price *subquery.avg_quantity* (100-subquery.max_discount_value)/100) AS  grand_total
-- FROM
--     (
--         SELECT
--             AVG(book_id) AS avg_book_id,
--             AVG(quantity) AS avg_quantity,
--             AVG(price) AS avg_price,
--             COALESCE(MAX(discount_value),0) AS max_discount_value
--         FROM
-- 			book_quantity_discount_value
-- 		GROUP BY
--             book_id
--             )As subquery
-- 		)
-- 	
--     Select discount_total,item_total,grand_total into temp_discount,  item_total_value, grand_total_of_order
--     from price_of_order;
-- 	

--      
-- 	if(code_promo_value>0) then
-- 		set discount_total_value=temp_discount+least(item_total_value*code_promo_value,code_max_promo_value);
-- 		set grand_total_of_order=item_total_value-discount_total_value;
-- 	end if;
--     
--     return grand_total_of_order;

-- end
-- |
create function cal_price_order_to_check_min_promo___(a_order_id int) returns int READS SQL DATA
begin
	Declare date_of_order datetime;
    Declare result int;
    
    Select order_time into date_of_order
    from order_
    where order_.order_id=a_order_id;
    
    with discount_in_time AS (
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
    
     price_check_of_order As(
SELECT
SUM(subquery.avg_price * subquery.avg_quantity) AS item_total,
SUM(subquery.avg_price *subquery.avg_quantity* subquery.max_discount_value/100) AS discount_total,
SUM(subquery.avg_price *subquery.avg_quantity* (100-subquery.max_discount_value)/100) as grand_total
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
            
    Select grand_total into  result
    from price_check_of_order;
    
    return result;
end
|
DELIMITER ;
