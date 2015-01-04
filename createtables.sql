create table users (
	id serial primary key,
	fname text,
	lname text, 
	email text,
	phone text  
); 
 create table categories (
 	id serial primary key, 
 	cname text
 ); 
 create table items (
 	id serial primary key, 
 	catid int references categories(id),
 	userid int references users(id),
 	description text, 
 	color text,
 	photo text, 
 	locale text,  
 	price numeric(2), 
 	createdate timestamp default now()
 	);	