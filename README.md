

# Assignment for the course database system (CO2014)


## Views: Gồm những thư mục, tệp tin hỗ trợ tạo giao diện người dùng.
– order.js: Tạo giao diện người dùng cho giao diện đặt hàng cho khách hàng.
– viewHistoryBook.js: Tạo giao diện người dùng cho giao diện xem tác giả yêu thích.
– create_book.js: Tạo giao diện người dùng cho hoạt động thêm sách.
– crud_book.js: Tạo giao diện để xem, lọc, tìm kiếm sách để phục vụ điều hướng các hoạt động
thêm, xóa, sửa, xem chi tiết sách.
– provider_book_detail.js: Tạo giao diện để nhà cung cấp (phân phối) xem chi tiết sách.
– update_book.js: Tạo giao diện để cập nhật/ sửa thông tin chi tiết của sách.

## Controller: Gồm những thư mục, tập tin hỗ trợ gửi yêu cầu truy vấn tới cơ sở dữ liệu. 
Controller sẽ là trung gian để Views và Database có thể đọc, ghi, cập nhật, xử lý, validate dữ liệu. Views sẽ yêu cầu thông tin kèm tham số đầu vào cần thiết, Controller sẽ gọi truy vấn đến Database nhằm thực hiện các thao tác đọc, ghi, cập nhật, validate đầu vào, dữ liệu. Controller được kết nối với Database bằng mã nguồn tại tệp tin connect_db,js. Controller sẽ lấy kết quả trả về từ truy vấn trong database và trả về lại cho views để cập nhật hiển thị giao diện người dùng

– order.js: Điều hướng, hỗ trợ trung gian giao tiếp giữa order.js và viewHistoryBook.js của Views
với Database.

– provider.js: Điều hướng, hỗ trợ trung gian giao tiếp giữa CRUID_book của Views với Database.

## Database: Cơ sở dữ liệu gồm các tệp tin được chia theo chức năng:
– Create: Tệp tin có chức năng tạo các bảng trong cơ sở dữ liệu

– Input: Tệp tin có chức năng đưa dữ liệu vào các bảng đã tạo.

– Data_constraint: Tệp tin có chức năng tạo các trigger phục vụ cho ràng buộc dữ liệu

– Meaning_constraint: Các tệp tin có chức năng tạo các trigger phục vụ cho ràng buộc ngữ nghĩa.

– Procedure: Các tệp tin gồm các thủ tục trong cơ sở dữ liệu.

– Function: Các tệp tin gồm các hàm trong cơ sở dữ liệu.

