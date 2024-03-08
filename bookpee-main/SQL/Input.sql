insert into assign_db.author
Values (1,"JK Rowling" ),
		(2,"Ramez Elmasri" ),
		(3,"Shamkant B. Navathe" ),
		(4,"William Shakespeare" ),
        (5,'Tô Hoài'),
        (6,'Gordon Ramsey');


insert into assign_db.provider
Values (1,"Nhà xuất bản trẻ", "0938437450","161B đường Lý Chính Thắng, Phường Võ Thị Sáu, Quận 3, Ho Chi Minh City, Vietnam",80),
		(2,"Nhà xuất bản Kim Đồng", "1900571595","55 Quang Trung, Hai Bà Trưng, Hanoi, Vietnam",75),
        (3,"Fahasa", "1900636467","387 Hai Bà Trưng, Ho Chi Minh City, Vietnam",75),
        (4,"Nhà xuất bản Phụ Nữ", "1900678467", "39 Hàng Chuối, Hà Nội, Việt Nam",90);

insert into assign_db.book
Values (1,"Harry Potter và hòn đá phù thủy", 13,50000,'Tiếng Việt','thường','2013-5-12',"Nhà xuất bản trẻ","0985676544681",1,100),
		(2,"Harry Potter và hòn đá phù thủy", 13,80000,'Tiếng Việt','thường','2015-9-12',"Nhà xuất bản trẻ","0985676544752",1,1),
		(3,"Harry Potter và hội phượng hoàng", 13,90000,'Tiếng Việt','thường','2018-3-12',"Nhà xuất bản trẻ","0985676557652",1,1),
 (4,"Chú heo giáng sinh",3, 150000,'Tiếng Việt','đặc biệt', '2021-12-3',"Nhà xuất bản Kim Đồng","0985676544831",2,100 ),
 (5,"Chú heo giáng sinh",3, 90000,'Tiếng Việt','thường', '2021-12-3',"Nhà xuất bản Kim Đồng","0985676544831",2,100 ),
(6,"Chú heo giáng sinh",3, 120000,'Tiếng Việt','đặc biệt', '2021-12-3',"Nhà xuất bản Kim Đồng","0985676544831",2,100 ),
 (7,"Harry Potter và tù nhân ngục Azakaban", 13,50000,'Tiếng Việt','thường','2013-5-12',"Nhà xuất bản trẻ","0985676544681",1,1),
(8,"Harry Potter và tù nhân ngục Azakaban", 13,75000,'Tiếng Việt','thường','2013-5-12',"Nhà xuất bản trẻ","0985676544681",3,100),
 (9,"Harry Potter và phòng chứa bí mật", 13,150000,'Tiếng Việt','thường','2013-5-12',"Nhà xuất bản trẻ","0985676544681",3,100),
 (10,"Harry Potter và chiếc cốc lửa", 13,150000,'Tiếng Việt','thường','2013-5-12',"Nhà xuất bản trẻ","0985676544681",3,100),
(11,"Harry Potter và hoàng tử lai", 13,150000,'Tiếng Việt','thường','2013-5-12',"Nhà xuất bản trẻ","0985676544681",3,100),
(12,"Harry Potter và hoàng tử lai", 13,150000,'Tiếng Việt','thường','2013-5-12',"Nhà xuất bản trẻ","0985676544681",3,100),
(13,"Harry Potter và bảo bối tử thần", 13,150000,'Tiếng Việt','thường','2013-5-12',"Nhà xuất bản trẻ","0985676544681",3,100),
(14,"Harry Potter và bảo bối tử thần", 13,150000,'Tiếng Việt','thường','2013-5-12',"Nhà xuất bản trẻ","0985676544681",3,100),
(15,"Fundamentals of Database system, 8th", 13,150000,'Tiếng Anh','thường','2013-5-12',"Nhà xuất bản trẻ","0985676544681",3,100),
 (16,"Fundamentals of Database system, 8th", 13,150000,'Tiếng Anh','thường','2013-5-12',"Nhà xuất bản trẻ","0985676544681",3,100),
 (17,"Fundamentals of Database system, 7th", 13,150000,'Tiếng Anh','thường','2007-5-12',"Nhà xuất bản trẻ","0985676544681",3,100),
 (18,"Romeo và Juliet", 13,150000,'Tiếng Anh','thường','2013-5-12',"Nhà xuất bản trẻ","0985676544681",3,100),
 (19,"Đêm thứ mười hai", 13,150000,'Tiếng Anh','thường','2013-5-12',"Nhà xuất bản trẻ","0985679994681",3,100),
 (20,"Hamlet", 13,150000,'Tiếng Anh','thường','2013-5-12',"Nhà xuất bản trẻ","0985676544681",3,100);
insert into assign_db.book
Values
(21,"Dế Mèn Phiêu Lưu Ký",6,70000,'Tiếng Việt','thường','2018-5-12',"Nhà xuất bản Kim Đồng","0985676523681",2,100),
(22,"Dế Mèn Phiêu Lưu Ký", 6,120000,'Tiếng Việt','đặc biệt','2018-7-25',"Nhà xuất bản Kim Đồng","0985676474681",2,100),
(23,"Vừ A Dính", 13,50000,'Tiếng Việt','thường','2021-3-12',"Nhà xuất bản Kim Đồng","0989016904381",2,100),
(24,"Kim Đồng", 13,70000,'Tiếng Việt','thường','2021-3-12',"Nhà xuất bản Kim Đồng","0985676901223",2,100),
(25,"Ngọn Cờ Lau", 13,90000,'Tiếng Việt','thường','2021-3-12',"Nhà xuất bản Kim Đồng","0985676901245",2,100),
(26,"Harry Potter và tù nhân ngục Azakaban", 13,170000,'Tiếng Việt','đặc biệt','2013-5-12',"Nhà xuất bản trẻ","0985676544681",1,100),
 (27,"Harry Potter và phòng chứa bí mật", 13,145000,'Tiếng Việt','thường','2013-5-12',"Nhà xuất bản trẻ","0985676544681",1,100),
 (28,"Harry Potter và chiếc cốc lửa", 13,145000,'Tiếng Việt','thường','2013-5-12',"Nhà xuất bản trẻ","0985676544681",1,100),
(29,"Harry Potter và hoàng tử lai", 13,145000,'Tiếng Việt','thường','2013-5-12',"Nhà xuất bản trẻ","0985676544681",1,100),
(30,"Harry Potter và hoàng tử lai", 13,145000,'Tiếng Việt','thường','2013-5-12',"Nhà xuất bản trẻ","0985676544681",1,100),
(31,"Harry Potter và bảo bối tử thần", 13,145000,'Tiếng Việt','thường','2013-5-12',"Nhà xuất bản trẻ","0985676544681",1,100),
(32,"Harry Potter và bảo bối tử thần", 13,145000,'Tiếng Việt','thường','2013-5-12',"Nhà xuất bản trẻ","0985676544681",1,100),
(33,"Fundamentals of Database system, 8th", 13,145000,'Tiếng Anh','thường','2013-5-12',"Nhà xuất bản trẻ","0985676544681",1,100),
 (34,"Fundamentals of Database system, 8th", 13,145000,'Tiếng Anh','thường','2013-5-12',"Nhà xuất bản trẻ","0985676544681",1,100),
 (35,"Fundamentals of Database system, 7th", 13,145000,'Tiếng Anh','thường','2007-5-12',"Nhà xuất bản trẻ","0985676544681",1,100),
 (36,"Romeo và Juliet", 13,145000,'Tiếng Việt','thường','2013-5-12',"Nhà xuất bản trẻ","0985676544681",1,100),
 (37,"Đêm thứ mười hai", 13,145000,'Tiếng Việt','thường','2013-5-12',"Nhà xuất bản trẻ","0985679994681",1,100),
 (38,"Khóa học nấu ăn tại gia của Gordon Ramsey", 13,250000,'Tiếng Việt','thường','2019-5-12',"Nhà xuất bản Phụ nữ","0985679994681",4,100),
(39,"Gordon Ramsey's Ultimate Fit Food", 13,770000,'Tiếng Anh','thường','2019-5-12',"Nhà xuất bản Phụ nữ","0985153871933",4,100),
(40,"Gordon Ramsay Quick and Delicious: 100 Recipes to Cook in 30 Minutes or Less", 13,950000,'Tiếng Anh','thường','2019-5-12',"Nhà xuất bản Phụ nữ","0985871934681",4,100),
(41,"Gordon Ramsay's Home Cooking: Everything You Need to Know to Make Fabulous Food", 13,750000,'Tiếng Anh','thường','2023-1-30',"Nhà xuất bản Phụ nữ","0981455520941",4,100),
 (42,"Operating Systems: A Spiral Approach", 13,750000,'Tiếng Anh','thường','2023-1-30',"Nhà xuất bản Phụ nữ","0981467009416",4,100),
(43,"Fundamentals of Database Systemss 6th Edition", 13,750000,'Tiếng Anh','thường','2007-1-30',"Nhà xuất bản Phụ nữ","0981434820941",4,100);

insert into assign_db.series
values(1,"Harry Potter",7);

insert into assign_db.consisted
values(1,1),
(2,1),
(3,1),
(4,1),
(5,1),
(6,1),
(7,1),
(8,1),
(9,1),
(10,1),
(11,1),
(12,1),
(13,1),
(14,1);

insert into assign_db.genres_book
values(1,'Hư cấu'),
(2,'Hư cấu'),
(3,'Hư cấu'),
(4,'Hư cấu'),
(5,'Hư cấu'),
(6,'Hư cấu'),
(7,'Hư cấu'),
(8,'Hư cấu'),
(9,'Hư cấu'),
(10,'Hư cấu'),
(11,'Hư cấu'),
(12,'Hư cấu'),
(13,'Hư cấu'),
(14,'Hư cấu'),
(15,'Giáo dục'),
(15,'Công nghệ'),
(16,'Giáo dục'),
(16,'Công nghệ'),
(17,'Giáo dục'),
(17,'Công nghệ'),
(18,'Hư cấu'),
(18,'Lãng mạn'),
(19,"Hư cấu"),
(20,"Hư cấu"),
(21,"Hư cấu"),
(22,"Hư cấu"),
(23,"Lịch sử"),
(23,"Hư cấu"),
(24,"Lịch sử"),
(24,"Hư cấu"),
(25,"Lịch sử"),
(25,"Hư cấu"),
(26,'Hư cấu'),
(27,'Hư cấu'),
(28,'Hư cấu'),
(29,'Hư cấu'),
(30,'Hư cấu'),
(31,'Hư cấu'),
(32,'Hư cấu'),
(33,'Giáo dục'),
(33,'Công nghệ'),
(34,"Giáo dục"),
(34,"Công nghệ"),
(35,"Giáo dục"),
(35,"Công nghệ"),
(36,'Hư cấu'),
(37,'Lãng mạn'),
(38, 'Giáo dục'),
(39,'Giáo dục'),
(40, 'Giáo dục'),
(41,'Giáo dục'),
(42,'Giáo dục'),
(42,'Công nghệ'),
(43,'Giáo dục'),
(43,'Công nghệ');


insert into assign_db.write_
values(1,1),
(2,1),
(3,1),
(4,1),
(5,1),
(6,1),
(7,1),
(8,1),
(9,1),
(10,1),
(11,1),
(12,1),
(13,1),
(14,1),
(15,2),
(16,2),
(17,2),
(15,3),
(16,3),
(17,3),
(18,4),
(19,4),
(20,1),
(21,5),
(22,5),
(23,5),
(24,5),
(25,5),
(26,1),
(27,1),
(28,1),
(29,1),
(30,1),
(31,1),
(32,1),
(33,3),
(33,2),
(34,3),
(34,2),
(35,3),
(35,2),
(36,4),
(37,4),
(38,4),
(39,6),
(40,6),
(41,6),
(42,2),
(43,2),
(43,3);


insert into assign_db.physical_book
values (1,"bìa mềm",'45x30',354,0.5,"sách cũ"),
(4,"bìa cứng",'45x35',124,0.4,"sách mới"),
 (6,"bìa mềm",'45x35',124,0.2,"sách mới"),
 (11,"bìa mềm",'45x35',124,0.2,"sách mới"),
 (13,"bìa mềm",'45x35',124,0.2,"sách mới"),
 (16,"bìa mềm",'45x35',124,0.2,"sách mới"),
 (17,"bìa mềm",'45x35',124,0.2,"sách mới"),
 (18,"bìa mềm",'45x35',124,0.2,"sách mới"),
 (19,"bìa mềm",'45x35',124,0.2,"sách mới"),
 (20,"bìa mềm",'45x35',124,0.2,"sách mới"),
(21,"bìa mềm",'45x35',124,0.2,"sách mới"),
(22,"bìa mềm",'45x35',124,0.2,"sách mới"),
(23,"bìa mềm",'45x35',124,0.2,"sách mới"),
(24,"bìa mềm",'45x35',124,0.2,"sách mới"),
(25,"bìa mềm",'45x35',124,0.2,"sách mới"),
(26,"bìa mềm",'45x35',124,0.2,"sách mới"),
(27,"bìa mềm",'45x35',124,0.2,"sách mới"),
(28,"bìa mềm",'45x35',124,0.2,"sách mới"),
(29,"bìa mềm",'45x35',124,0.2,"sách mới"),
(30,"bìa mềm",'45x35',124,0.2,"sách mới"),
(31,"bìa mềm",'45x35',124,0.2,"sách mới"),
(32,"bìa mềm",'45x35',124,0.2,"sách mới"),
(33,"bìa mềm",'45x35',124,0.2,"sách mới"),
(34,"bìa mềm",'45x35',124,0.2,"sách mới"),
(35,"bìa mềm",'45x35',124,0.2,"sách mới"),
(36,"bìa mềm",'45x35',124,0.2,"sách mới"),
(37,"bìa mềm",'45x35',124,0.2,"sách cũ"),
(38,"bìa mềm",'45x35',124,0.2,"sách mới"),
(39,"bìa mềm",'45x35',124,0.2,"sách mới"),
(40,"bìa mềm",'45x35',124,0.2,"sách mới"),
(41,"bìa mềm",'45x35',124,0.2,"sách mới"),
(42,"bìa mềm",'45x35',124,0.2,"sách mới"),
(43,"bìa mềm",'45x35',124,0.2,"sách mới");

             
insert into assign_db.audio_book
values (2,590,"4:45:59"),
 (7,690,"5:27:25"),
 (10,750,"6:27:25"),
 (8,390,"5:27:25"),
 (9,390,"5:27:25"),
 (12,390,"5:27:25");

insert into assign_db.kindle_book
values (3,190,354),
 (5,250,124),
 (14,250,124),
 (15,250,124);

insert into assign_db.customer
values(1,"Nguyễn Hoài Trung","hoaitrung", "hoaitrung","M","2003:01:26"),
(2,"Nguyễn Châu Long","chaulong", "chaulong","M","2003:01:26"),
(3,"Hồ Trọng Nhân","trongnhan", "trongnhan","M","2003:01:26"),
(4,"Giản Đình Thái","dinhthai", "dinhthai","M","2003:01:26"),
(5,"Vũ Lê Khánh My","khanhmy", "khanhmy","F","2017:01:26"),
(6,"Trần Hồng Phúc", "hongphuc", "hongphuc", "M", "2003:09:06"),
(7,"Lê Thanh Quang", "thanhquang", "thanhquang", "M", "2003:01:25"),
(8,"Nguyễn Lê Phúc", "lephuc", "lephuc", "M", "2003:03:03"),
(9,"Nguyễn Ngọc Hoàng Thiên", "hoangthien", "hoangthien", "M", "2005:04:05"),
(10,"Nguyễn Châu Vũ", "chauvu", "chauvu", "M", "2013:10:31");

insert into assign_db.adult
values(1,"0397253405",0),
(2,"0397253406",0),
(3,"0397253407",0),
(4,"0397253408",0),
(6,"0399233219" ,0),
(7,"0923929382" , 0),
(8,"0393982340" ,0),
(9,"0328253405" ,0);

insert into assign_db.adult_address
values(1,"16 Võ Thị Sáu, thị trấn Madaguoi, huyện Đạ Huoai, Tỉnh Lâm Đồng"),
(1,"497 Hòa Hảo, phường 7, Quận 10, Thành phố Hồ Chí Minh"),
(2,"Kí túc xá khu A, phường Linh Trung, thành phố Thủ Đức"),
(3,"Kí túc xá khu A, phường Linh Trung, thành phố Thủ Đức"),
(4,"Kí túc xá khu A, phường Linh Trung, thành phố Thủ Đức"),
(6,"Kí túc xá khu A, phường Linh Trung, thành phố Thủ Đức"),
(6,"169 Phạm Thái Bường, phường 4, thành phố Vĩnh Long, tỉnh Vĩnh Long"),
(7,"Kí túc xá khu A, phường Linh Trung, thành phố Thủ Đức"),
(8,"Kí túc xá khu A, phường Linh Trung, thành phố Thủ Đức"),
(8,"69 Trần Phú, phường 3, thành phố Vĩnh Long, tỉnh Vĩnh Long"),
(9,"Kí túc xá khu A, phường Linh Trung, thành phố Thủ Đức"),
(9,"314 Hưng Đạo Vương, phường 1, thành phố Vĩnh Long, tỉnh Vĩnh Long");

insert into assign_db.child
values(5,1),
(10,2);

insert into assign_db.discount
values(1,"2023:11:28 00:00:00","2023:12:29 00:00:00", "Khuyến mãi giáng sinh",50,"Hư cấu"),
(2,"2024:08:7 00:00:00","2024:09:10 00:00:00", "Khuyến mãi năm học mới",20,"Giáo dục"),
(3,"2023:07:1 00:00:00","2023:07:31 00:00:00", "Ngược dòng lịch sử",20,"Lịch sử");


insert into assign_db.have_
values(1,1),
(1,2),
(1,3),
(1,4),
(1,5),
(1,6),
(1,7),
(1,8),
(1,9),
(1,10),
(1,11),
(1,12),
(1,13),
(1,14),
(2,15),
(2,16),
(2,17),
(1,21),
(1,22),
(1,23),
(3,23),
(1,24),
(3,24),
(1,25),
(3,25);

insert into assign_db.promotion_code
values(1,"Mã giảm giá 12/12 cho thành viên đồng","2023-12-11 23:59:59","2023-12-12 23:59:59",30000,100000,40,1,"Đồng"),
(2,"Mã giảm giá 12/12 cho thành viên bạc","2023-12-11 23:59:59","2023-12-12 23:59:59",30000,100000,60,5,"Bạc"),
(3,"Mã giảm giá 12/12 cho thành viên vàng","2023-12-11 23:59:59","2023-12-12 23:59:59",30000,100000,70,5,"Vàng"),
(4,"Mã giảm giá 12/12 cho thành viên kim cương","2023-12-11 23:59:59","2023-12-12 23:59:59",30000,100000,80,5,"Kim cương"),
(5,"Mã 1/12","2023:12:1 00:00:01","2023-12-31 23:59:59",30000,100000,20,5,"Đồng");

insert into assign_db.follow
values(1,1),
(2,1),
(1,4),
(3,4);

insert into assign_db.own
values(1,1),
		(1,2),
		(1,3),
		(1,4),
		(2,1),
		(2,2),
		(2,3),
		(2,4),
		(3,1),
		(3,2),
		(3,3),
		(3,4),
		(4,1),
		(4,2),
		(4,3),
		(4,4);

insert into assign_db.order_
values(1,"2018-01-01 11:00:00",NULL,"vnpost",NULL ,15000,"OCD",null,"Đã hủy","16 Võ Thị Sáu, thị trấn Madaguoi, huyện Đạ Huoai, Tỉnh Lâm Đồng","Nguyễn Hoài Trung","0397253405",1,1,"Đã hủy", null,"Đã hủy","online",null),
(2,"2018-02-01 12:00:00","2018-02-13 07:27:47","vnpost","Phạm Văn Bé" ,5000,"OCD","2018-02-13 07:27:47","Hoàn tất","16 Võ Thị Sáu, thị trấn Madaguoi, huyện Đạ Huoai, Tỉnh Lâm Đồng","Nguyễn Hoài Trung","0397253405",1,1,"Đã lấy", "2018-02-02 07:27:47","Đã trả","online","2018-02-28 07:27:47"),
(3,"2023-11-30 13:00:00",NULL,"vnpost",NULL ,15000,"OCD",null,"Đang giao","16 Võ Thị Sáu, thị trấn Madaguoi, huyện Đạ Huoai, Tỉnh Lâm Đồng","Nguyễn Hoài Trung","0397253405",5,2,"Chưa lấy","2023-12-01 13:00:00","Chưa trả","trực tiếp",null),
(4,"2023-12-01 14:00:00","2023-12-01 14:05:00","kindle","Phạm Văn Bé" ,0,"Momo","2023-12-01 14:02:55","Hoàn tất","hoaitrungchar","Nguyễn Hoài Trung","0397253405",1,3,"Đã lấy", "2023-12-01 14:03:55","Đã trả","online","2023-12-22 14:04:55"),
(5,"2023-12-01 14:00:00","2023-12-01 14:05:00","vnpost","Phạm Văn Bé" ,0,"Momo","2023-12-01 14:02:55","Hoàn tất","hoaitrungchar","Nguyễn Hoài Trung","0397253405",1,4,"Đã lấy", "2023-12-01 14:03:55","Đã trả","online","2023-12-22 14:04:55"),
(6,"2023-12-01 14:00:00","2023-12-01 14:05:00","vnpost","Phạm Văn Bé" ,0,"Momo","2023-12-01 14:02:55","Hoàn tất","hoaitrungchar","Nguyễn Hoài Trung","0397253405",1,2,"Đã lấy", "2023-12-01 14:03:55","Đã trả","online","2023-12-22 14:04:55"),
(7,"2023-02-01 11:00:00","2023-02-13 08:30:47","offline","Nguyễn Văn Lớn" ,15000,"COD","2023-02-13 08:30:47","Hoàn tất","KTX khu A ĐHQG, khu phố 6, phường Linh Trung, thành phố Thủ Đức, thành phố Hồ Chí Minh","Lê Thanh Quang","0399233219",6,2,"Đã lấy", "2023-02-02 07:27:47","Đã trả","online","2023-02-28 07:27:47"),
(8,"2022-04-06 09:00:00","2022-04-13 08:27:47","offline","Nguyễn Vô Thường" ,10000,"COD","2022-04-13 08:27:47","Hoàn tất","169 Phạm Thái Bường, phường 4, thành phố Vĩnh Long, tỉnh Vĩnh Long","Lê Thanh Quang","0399233219",6,1,"Đã lấy", "2022-04-10 07:27:47","Đã trả","online","2022-04-10 07:27:47"),
(9,"2023-12-05 08:00:00",NULL,"offline",NULL ,15000,"COD",null,"Đang giao","KTX khu A ĐHQG, khu phố 6, phường Linh Trung, thành phố Thủ Đức, thành phố Hồ Chí Minh","Trần Hồng Phúc","0923929382",7,3,"Chưa lấy","2023-12-07 13:00:00","Chưa trả","trực tiếp",null),
(10,"2023-12-01 07:00:00","2023-12-01 16:05:00","offline","Nguyễn Văn Bình" ,0,"Momo","2023-12-01 16:02:55","Hoàn tất","129 2/9, phường 1, thành phố Vĩnh Long, tỉnh Vĩnh Long","Trần Hồng Phúc","0923929382",7,2,"Đã lấy", "2023-12-01 16:03:55","Đã trả","online","2023-12-22 14:04:55"),
(11,"2023-12-03 13:30:00",NULL,"offline",NULL ,20000,"COD",null,"Đang giao","KTX khu A ĐHQG, khu phố 6, phường Linh Trung, thành phố Thủ Đức, thành phố Hồ Chí Minh","Nguyễn Lê Phúc","0393982340",8,2,"Chưa lấy","2023-12-03 13:30:00","Chưa trả","trực tiếp",null),
(12,"2023-11-01 14:00:00","2023-11-01 14:05:00","vnpost","Phạm Thị Hồng" ,0,"COD","2023-11-01 14:02:55","Hoàn tất","69 Trần Phú, phường 3, thành phố Vĩnh Long, tỉnh Vĩnh Long","Nguyễn Lê Phúc","0393982340",8,3,"Đã lấy", "2023-11-01 14:03:55","Đã trả","online","2023-11-22 14:04:55"),
(13,"2020-02-02 12:00:00",NULL,"offline",NULL ,15000,"COD",null,"Đã hủy","KTX khu A ĐHQG, khu phố 6, phường Linh Trung, thành phố Thủ Đức, thành phố Hồ Chí Minh","Nguyễn Ngọc Hoàng Thiên","0328253405",9,1,"Đã hủy", null,"Đã hủy","online",null),
(14,"2023-10-01 14:00:00","2023-10-01 14:05:00","offline","Phạm Thị Bé" ,0,"COD","2023-10-01 14:02:55","Hoàn tất","314 Hưng Đạo Vương, phường 1, thành phố Vĩnh Long, tỉnh Vĩnh Long","Nguyễn Ngọc Hoàng Thiên","0328253405",9,3,"Đã lấy", "2023-10-01 14:03:55","Đã trả","online","2023-10-22 14:04:55");

insert into assign_db.contain
values(1,1,1),
(1,2,1),
(1,7,1),
(1,3,1),
(2,1,1),
(2,2,1),
(2,7,1),
(2,3,1),
(3,4,1),
(3,5,1),		 
(3,6,1),
(4,10,1),
(4,11,1),
(4,12,1),
(5,38,1),
(5,39,1),
(5,40,1),
(5,41,1),
(5,42,1),
(5,43,1),
(6,21,1),
(6,22,1),
(6,23,1),
(6,24,1),
(6,25,1),
(7,4,1),
(7,6,1),
(8,29,1),
(8,30,1),
(9,14,1),
(10,21,1),
(10,22,1),
(11,24,1),
(12,18,1),
(12,19,1),
(13,7,1),
(14,13,1),
(14,14,1);


insert into assign_db.confirm
values(1,1),
		(2,1),
		(3,1),
		(4,1),
		(5,1),
		(6,1),
        (7,6),
        (8,6),
        (9,7),
        (10,7),
        (11,8),
        (13,9),
        (14,9);

insert into assign_db.apply_for
values (5,5),
(6,5);

insert into assign_db.review
values(1,1,"The beginning is boring","2018-12-11 23:25:30",1),
(1,2,"This is the book of magic","2019-1-25 12:25:30",1),
(1,3,"The story is fantastic","2019-7-25 12:25:30",1);

insert into assign_db.rate
values (1,1,3),
		(1,2,5),
		(1,3,2),
        (1,7,5),
        (1,10,1),
        (1,11,2),
        (1,38,3),
        (1,39,5),
        (1,40,2),
        (1,41,1),
        (1,42,4),
        (1,43,5),
        (1,21,3),
        (1,22,3),
        (1,23,2),
        (1,24,3),
        (1,25,2),
        (6,4,1),
        (6,6,4),
        (6,29,3),
        (6,30,1),
        (7,21,4),
        (7,22,5),
        (9,13,4),
        (9,14,5);
update assign_db.adult
set total_spent=4815000
where customer_id=1;


update assign_db.adult
set total_spent=300000
where customer_id=9;

update assign_db.adult
set total_spent=95000
where customer_id=7;

update assign_db.adult
set total_spent=560000
where customer_id=6;















