Set @my_book_id =0;
call  add_book (
	"Truyện Kiều",
	13,
	50000,
	'Tiếng Việt',
	'thường',
	'2023-12-10',
	'Nhà xuất bản trẻ',
	'0985676544681',
	2,
	100,
	@my_book_id
);

call add_write_('Nguyễn Du',46);
call add_genres_('Hư cấu',46);
call add_book_type_('PhysicalBook', 46, null, 450,null,'bìa mềm', '35x45',  0.5, 'mới');

call update_book (
	46, 
	'Truyện Kiều',
	13,
	70000,
	'Tiếng Việt',
	'thường',
	'2023-12-10',
	'Nhà xuất bản trẻ',
	'0985676544681',
	1000
);

call update_book_type_('PhysicalBook', 46, null, 450,null,'bìa mềm', '35x45',  0.5, 'cũ');

call delete_book(46);



