<p  align="center"><img  src="https://i.postimg.cc/y8vYWX9j/logo.png"  width="400"></p>
# How to install

**#1. Clone The Repositories OR Dowload The Zip**

    git clone https://github.com/bhaskar-09/login-system.git

**#2. Go to The Project Directory**

    cd login-system

**#3. Install Vender**

    composer install

**#4. Install Node Modules**

    npm install

**#5 Update Your DB Details**

    Go To .env

    DB_CONNECTION=mysql
    DB_HOST=127.0.0.1
    DB_PORT=3306
    DB_DATABASE=[DATABASE NAME]
    DB_USERNAME=[DATABASE USERNAME]
    DB_PASSWORD=[DATABASE PASSWORD]

And Update Any Other Required Details If Needed

**#6. Migrate Database**

    php artisan migrate

**#7. Re-Genarate Laravel Passport Auth Keys**

    php artisan passport:install --force

**#8. Compile Node Modules**

    npm run dev

**#9. Serve Your Project**

    php artisan serve

## Project Is Ready To Run

Development Server Link: http://127.0.0.1:8000/

# Thanks
