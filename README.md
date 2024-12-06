<p align="center"><a href="https://laravel.com" target="_blank"><img src="https://raw.githubusercontent.com/laravel/art/master/logo-lockup/5%20SVG/2%20CMYK/1%20Full%20Color/laravel-logolockup-cmyk-red.svg" width="400" alt="Laravel Logo"></a></p>

<p align="center">
<a href="https://github.com/laravel/framework/actions"><img src="https://github.com/laravel/framework/workflows/tests/badge.svg" alt="Build Status"></a>
<a href="https://packagist.org/packages/laravel/framework"><img src="https://img.shields.io/packagist/dt/laravel/framework" alt="Total Downloads"></a>
<a href="https://packagist.org/packages/laravel/framework"><img src="https://img.shields.io/packagist/v/laravel/framework" alt="Latest Stable Version"></a>
<a href="https://packagist.org/packages/laravel/framework"><img src="https://img.shields.io/packagist/l/laravel/framework" alt="License"></a>
</p>

## About This App

My Blog Application:

The demo of this web app(日本語):
https://youtu.be/KzhEwDChu0w

This is a blog application built with Laravel 11, React.js, and SQLite as the database. It uses Inertia.js to connect Laravel and React, creating an interactive web application. The styling is handled with Tailwind CSS. The starter kit is using Jetstream.

## Features

	•	User registration and login
	•	Blog listing with details, including title, content, author, created date, and last edited date
	•	Blog creation, editing, and deletion (only for the blog owner)
	•	Interactive UI built with React and Tailwind CSS

## Installation Guide

Follow the steps below to set up this project on your local machine:

1. Clone the Repository

    git clone <repository-url>
    cd <repository-folder>

2. Install Dependencies

Backend Dependencies

Install the PHP dependencies using Composer:
    composer install

Frontend Dependencies

Install the Node.js dependencies using npm or yarn:
    npm install
OR
    yarn3. Configuration

Environment File

Create the .env file by copying .env.example:
    cp .env.example .env

Database Configuration

By default, the application uses SQLite. You can update the .env file as needed:
    DB_CONNECTION=sqlite
    DB_DATABASE=/absolute/path/to/database.sqlite

    DB_CONNECTION=sqlite
    DB_DATABASE=/absolute/path/to/database.sqlite

To use SQLite, create the database file:
    touch database/database.sqlite


If you wish to use another database (e.g., MySQL or PostgreSQL), update the DB_CONNECTION, DB_HOST, DB_PORT, DB_DATABASE, DB_USERNAME, and DB_PASSWORD fields in .env accordingly.

Application Key

Generate the application key:
    php artisan key:generate

4. Database Migration

Run the migrations to create database tables:
    php artisan migrate

5. Build Frontend Assets

For development:
    npm run dev
    For production:
    npm run build

6. Run the Application

Start the Laravel development server:
    php artisan serve

Access the application in your browser at http://127.0.0.1:8000.


Requirements

Make sure the following tools are installed on your system:
	•	PHP 8.2 or higher
	•	Composer
	•	Node.js (16.x or higher)


Enjoy exploring the application! 🚀