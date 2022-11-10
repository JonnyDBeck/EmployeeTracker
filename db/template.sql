/*Template for employee select staement within nodeJS*/
SELECT employee.id, employee.first_name, employee.last_name, emp_role.title,  department.dpt_name AS department, emp_role.salary, CONCAT(E.first_name, " ", E.last_name) AS manager
FROM employee 
LEFT JOIN emp_role
ON employee.role_id = emp_role.id
LEFT JOIN department
ON emp_role.department_id = department.id
LEFT JOIN employee E
ON E.manager_id = employee.id;

/*Template for role select statement within nodeJS*/
SELECT emp_role.id, emp_role.title, department.dpt_name AS department, emp_role.salary
FROM emp_role 
LEFT JOIN department
ON emp_role.department_id = department.id;