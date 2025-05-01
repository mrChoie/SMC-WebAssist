start "[XAMPP HOST]" "C:\xampp\mysql_start.bat"

start "[SQL DB]" mysql -u root -h 127.0.0.1 -P 3306

cd C:\Users\Ellizar\OneDrive\Documents\Drazille\SMC-WebAssist\SMC-WebAssist

start "nodejs" npm start

start notify.txt

pktriot http 8080

pause