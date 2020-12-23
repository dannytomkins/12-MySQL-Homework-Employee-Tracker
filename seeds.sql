USE cmsDB;

INSERT INTO department (dept_name) VALUES ("Sales"),("Engineering"),("Finance"),("Legal");

INSERT INTO role (title, salary, dept_id) VALUES ("Sales Lead", 100000, 1),("Salesperson", 80000, 1),("Lead Engineer", 150000, 2), ("Software Engineer", 120000, 2), ("Accountant", 125000, 3), ("Legal Team Lead", 250000, 4), ("Lawyer", 190000, 4), ("Lead Engineer", 150000, 2);

INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES 
("John", "Doe", 1, NULL),
("Mike", "Chan", 2, NULL),
("Ashley", "Rodriguez", 3, NULL),
("Kevin", "Tupik", 4, NULL),
("Malia", "Brown", 5, NULL),
("Sarah", "Lourd", 6, NULL),
("Tom", "Allen", 7, NULL),
("Christian", "Eckenrode", 8, NULL);

UPDATE employee SET manager_id = 3 WHERE ID = 1;
UPDATE employee SET manager_id = 1 WHERE ID = 2;
UPDATE employee SET manager_id = 3 WHERE ID = 4;
UPDATE employee SET manager_id = 7 WHERE ID = 8;
