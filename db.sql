DROP DATABASE IF EXISTS cmsDB;
CREATE database cmsDB;

USE cmsDB;

CREATE TABLE department (
    id INTEGER AUTO_INCREMENT,
    dept_name VARCHAR(30) NOT NULL,
    PRIMARY KEY (id)
);

CREATE TABLE role (
    id INTEGER AUTO_INCREMENT,
    title VARCHAR(30) NOT NULL,
    salary DECIMAL (10, 2),
    dept_id INTEGER,
    foreign key (dept_id) references department (id),
    PRIMARY KEY (id)
);

CREATE TABLE employee (
    id INTEGER AUTO_INCREMENT,
    first_name VARCHAR(30) NOT NULL,
    last_name VARCHAR(30) NOT NULL,
	role_id INTEGER,
    foreign key (role_id) references role (id),
	manager_id INTEGER,
    foreign key (manager_id) references employee (id),
    
    PRIMARY KEY (id)
)