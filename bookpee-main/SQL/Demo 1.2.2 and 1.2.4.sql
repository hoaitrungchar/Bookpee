-- Demo 1.2.2 trigger thêm và sửa dữ liệu vào bảng customer
select * from customer;
select * from adult;
select * from child;

insert into customer value (99, "Nhân viên quản lý", "nvql", "nvql", "O", "2003-09-06"); -- thêm nhân viên quản lý các child mới
insert into customer value (20, "Lê Gia Huy", "giahuy", "giahuy", "C", "2003-03-25"); -- giới tính không hợp lệ
insert into customer value (20, "Lê Gia Huy", "giahuy", "giahuy", "M", "2033-03-25"); -- ngày sinh ở tương lai
insert into customer value (20, "Lê Gia Huy", "giahuy", "giahuy", "M", "2003-03-25"); -- thêm khách hàng bình thường (adult)
insert into customer value (30, "Nguyễn Phước Lộc", "phuocloc", "phuocloc", "M", "2010-10-31"); -- thêm khách hàng bình thường (child)

update customer set gender = 'B' where customer_id = 6; -- giới tính không hợp lệ
update customer set birthday = '2033-01-01' where customer_id = 6; -- ngày sinh ở tương lai
update customer set birthday = '2015-01-01' where customer_id = 20; -- đổi ngày sinh của adult thành child
update customer set birthday = '2000-01-01' where customer_id = 30; -- đổi ngày sinh của child thành adult

-- Demo 1.2.2 trigger thêm và sửa dữ liệu vào bảng rate
select * from rate;

insert into rate value (-1,1,4); -- ID khách hàng lỗi
insert into rate value (1,-3,4); -- ID sách lỗi
insert into rate value (1,1,10); -- Điểm không hợp lệ
insert into rate value (2,1,5); -- Khách hàng chưa mua sách

update rate set score = 8 where adult_id = 1 and book_id = 3; -- Điểm không hợp lệ

-- Demo 1.2.4 tính tổng tiền đơn hàng
select * from order_;
select cal_price_order___(2); -- đơn hàng bình thường
select cal_price_order___(-2); -- ID đơn hàng không hợp lệ
select cal_price_order___(200); -- đơn hàng không tồn tại

-- Demo 1.2.4 tính điểm đánh giá trung bình của sách
select * from rate;
select calRating(4); -- sách đã có đánh giá
select calRating(8); -- sách chưa được đánh giá
select calRating(100); -- sách không tồn tại
select calRating(-5); -- ID sách không hợp lệ