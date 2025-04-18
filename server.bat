start "[XAMPP HOST]" "C:\xampp\mysql_start.bat"

start "[SQL DB]" mysql -u root -h 127.0.0.1 -P 3306

start "nodejs" npm start

pktriot http 8080

@REM start "ssh" ssh.bat

pause