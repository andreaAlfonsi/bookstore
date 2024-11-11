# Bookstore Web Application

This project is a web application for an online bookstore where users can browse books, add them to their favorites, write reviews, and purchase books. Admin users can manage the book inventory, including adding, modifying, and deleting books.

The application consists of a **frontend** built with **Angular** and a **backend** built with **Django** and **MySQL**.

## Features

### For Users:
- **Browse Books**: View a list of available books with options to filter and sort by attributes such as title, author, price, etc.
- **Add to Favorites**: Users can mark books as favorites.
- **Write Reviews**: Registered users can write reviews for books.
- **View Book Details**: Detailed information about each book, including reviews and related information.
- **Add to Cart**: Users can add books to their shopping cart.

### For Admins:
- **Manage Books**: Admin users can add, edit, and delete books from the inventory.
- **View All Users**: Admins can manage user accounts.

### AI Feature:
- **Book Buddy Chat**: An AI-powered chat interface (using OpenAI's API) for discussing a book's content and asking related questions.

## Technologies Used

- **Frontend**: Angular 18.2, Bootstrap
- **Backend**: Django, Django Rest Framework, Python
- **Database**: MySQL
- **AI Integration**: OpenAI API (ChatGPT)

## Installation

### Prerequisites

1. **Python** (for backend)
2. **Node.js** and **npm** (for frontend)
3. **MySQL** (for database)
4. **Django** and **Django Rest Framework** (for backend)

### Backend Setup

1. Clone the repository:

2. Install Python dependencies

3. Set up the MySQL database:

    Create a new database in MySQL and configure the connection in backend/settings.py.

    Run the migrations:
    ```
    python manage.py migrate
    ```
4. Create a superuser for admin access (optional for testing):
5. Start the Django development server:
    ```
    python manage.py runserver
    ```

### Frontend Setup

1. Install Node.js dependencies

2. Start the Angular development server:
     ```
     ng serve
     ```

## Usage

  - **Frontend**: The frontend is built with Angular and provides a responsive user interface for interacting with the bookstore. The user can view, search, filter, and sort books. They can also add books to their cart, write reviews, and manage their favorites.

  - **Backend**: The Django backend provides a REST API to handle book management, user authentication, and more. Admin users can manage the book inventory, while regular users can interact with the bookstore's functionalities.

  - **AI Integration**: The Book Buddy feature provides a chat interface where users can talk to an AI chatbot about the book they are viewing. The backend integrates with OpenAI's API for this feature.
