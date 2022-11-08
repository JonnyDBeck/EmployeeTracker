DROP DATABASE IF EXISTS employee_db;
CREATE DATABASE employee_db;

USE employee_db;

CREATE TABLE department (
  id INT NOT NULL,
  dpt_name VARCHAR(30),
  PRIMARY KEY (id)
);

CREATE TABLE emp_role (
  id INT NOT NULL,
  title VARCHAR(30),
  salary DECIMAL,
  FOREIGN KEY (department_id)
  REFERENCES department(id)
  ON DELETE SET NULL
  PRIMARY KEY (id)
);

CREATE TABLE emp_role (
  id INT NOT NULL,
  first_name VARCHAR(30),
  last_name VARCHAR(30),
  FOREIGN KEY (role_id)
  REFERENCES emp_role(id)
  ON DELETE SET NULL
  manager_id INT
);