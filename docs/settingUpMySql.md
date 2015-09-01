Setting up mysql locally.
	-	Download from online (requires creating an Oracle account) and install.
	- Make sure you add the download to your path (PATH=$PATH:/usr/local/mysql/bin);
	- Add an account to your mysql server
		- run: mysql --user=root mysql
		- mysql> CREATE USER 'monty'@'localhost' IDENTIFIED BY 'some_pass';
			mysql> GRANT ALL PRIVILEGES ON *.* TO 'monty'@'localhost' WITH GRANT OPTION;
		- reference: http://dev.mysql.com/doc/refman/5.1/en/adding-users.html
	- In the project, update params in the config file:
				mysqlParams : {
										  socketPath: '/tmp/mysql.sock',	 	// run 'mysqladmin variables' and copy the 'socket' variable
										  user      : "angel",							// whatever name you choose
										  password  : "bunnies",						// whatever password you choose
										  database  : "testmysql"						// I used "Sequel Pro" to create this database
										}
