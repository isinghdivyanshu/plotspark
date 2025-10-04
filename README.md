<p align="center">
  <a href="https://dscvit.com">
    <img width="400" src="https://user-images.githubusercontent.com/56252312/159312411-58410727-3933-4224-b43e-4e9b627838a3.png#gh-light-mode-only" alt="GDSC VIT"/>
  </a>
  <h2 align="center">Plotspark 🖋️</h2>
  <h4 align="center">A visual hub for your entire project. Model anything from a product roadmap to a fictional universe.</h4>
</p>

---

## 💻 Tech Stack

### Backend

-   **Java 21**
-   **Spring Boot 3**
-   **Spring Security:** For authentication and authorization.
-   **JPA (Hibernate):** For object-relational mapping.
-   **PostgreSQL:** As the primary database.
-   **Maven:** For dependency management.
-   **JWT (JSON Web Tokens):** For securing the API.
-   **Flyway:** For database migrations.
-   **Lombok:** To reduce boilerplate code.
-   **Thymeleaf:** For server-side rendering of email templates.

### Frontend

-   **Next.js 14:** A React framework for building user interfaces.
-   **React 18:** A JavaScript library for building user interfaces.
-   **Zustand:** For state management.
-   **Reactflow:** To create the interactive timeline and node-based editor.
-   **Axios:** For making HTTP requests to the backend API.
-   **Tailwind CSS:** For styling the application.
-   **Material-UI:** For UI components and icons.

### DevOps

-   **Docker & Docker Compose:** For containerizing and running the application.

---

## ✨ Features

-   **Interactive Timelines:** Visually map out your story's events and character arcs.
-   **Story Management:** Create, edit, and manage multiple stories.
-   **Character Management:** Develop and track your characters with detailed descriptions.
-   **Chapter Organization:** Structure your stories with chapters and manage their content.
-   **Tagging and Categorization:** Use genres and tags to organize and filter your stories.
-   **User Authentication:** Secure user registration and login system with email verification and password reset functionality.
-   **RESTful API:** A well-structured backend API to manage all your data.
-   **Dockerized Environment:** Easily set up and run the entire application using Docker.

---

## 🚀 Getting Started

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes.

### Prerequisites

-   Docker
-   Docker Compose

### Installation

1.  **Clone the repository:**

    ```bash
    git clone [https://github.com/isinghdivyanshu/plotspark.git](https://github.com/isinghdivyanshu/plotspark.git)
    cd plotspark
    ```

2.  **Create a `.env` file** in the root of the project with the following content. Replace the placeholder values with your actual configuration.

    ```env
    # <-- SERVER CONFIG -->
    PORT=8080

    # <-- DATABASE CONFIG -->
    POSTGRES_DB=plotspark
    POSTGRES_USER=your_db_user
    POSTGRES_PASSWORD=your_db_password

    # for local development without docker, you might need:
    #SPRING_DATASOURCE_URL=jdbc:postgresql://localhost:5432/plotspark
    SPRING_DATASOURCE_USERNAME=${POSTGRES_USER}
    SPRING_DATASOURCE_PASSWORD=${POSTGRES_PASSWORD}


    # <-- JWT CONFIG -->
    APP_JWT_SECRET=your_jwt_secret
    APP_JWT_EXPIRATION_MILLISECONDS=86400000

    # <-- MAILER CONFIG -->
    SPRING_MAIL_HOST=your_mail_host
    SPRING_MAIL_PORT=your_mail_port
    SPRING_MAIL_USERNAME=your_mail_username
    SPRING_MAIL_PASSWORD=your_mail_password

    # <-- LOGGER CONFIG -->
    ENVIRONMENT=dev
    ```

3.  **For Apple Silicon (M-series) Macs:**
    Create a `docker-compose.override.yml` file in the root directory with the following content to ensure native performance:

    ```yaml
    # For Apple Silicon (M-series) Macs to ensure native performance for the entire stack.
    services:
        db:
            platform: linux/arm64
        backend:
            platform: linux/arm64
        frontend:
            platform: linux/arm64
    ```

4.  **Build and run the application using Docker Compose:**
    ```bash
    docker-compose up --build
    ```

The frontend will be available at `http://localhost:3000` and the backend at `http://localhost:8080`.

---

## 🏛️ Project Structure

The project is organized into two main parts: a `frontend` and a `backend`.

-   **`backend`**: A Spring Boot application that serves the RESTful API.
-   **`frontend`**: A Next.js application that provides the user interface.

### Database Schema

The database schema is managed using Flyway migrations. The key tables include:

-   `users`: Stores user information.
-   `stories`: Stores information about user-created stories.
-   `chapters`: Stores the chapters for each story.
-   `characters`: Stores the characters for each story.
-   `genres`: A table of available genres.
-   `tags`: A table of available tags.
-   `story_genres`: A join table for the many-to-many relationship between stories and genres.
-   `story_tags`: A join table for the many-to-many relationship between stories and tags.
-   `password_reset_tokens`: Stores tokens for password reset functionality.

### API Routes

The backend exposes a RESTful API with the following main endpoints:

-   **Authentication:** `/api/auth` (register, login, verify, password reset)
-   **Users:** `/api/users` (get user profile)
-   **Stories:** `/api/stories` (CRUD operations for stories, genre/tag management)
-   **Chapters:** `/api/stories/{storyId}/chapters` (CRUD operations for chapters)
-   **Characters:** `/api/stories/{storyId}/characters` (CRUD operations for characters)
-   **Genres:** `/api/genres` (create and get all genres)
-   **Tags:** `/api/tags` (create and get all tags)

---

## 🏆 Code Quality and Best Practices

This project adheres to several industry-standard best practices:

-   **Dockerization**: The entire application is containerized using Docker, making it easy to set up and run in any environment.
-   **Clean Code**: The codebase follows clean code principles, with a clear separation of concerns and a well-organized project structure.
-   **RESTful API Design**: The backend API is designed following REST principles, providing a clear and consistent interface for the frontend.
-   **Security**: Spring Security and JWT are used to secure the application, protecting user data and ensuring only authorized users can access protected resources.
-   **Database Migrations**: Flyway is used for managing database schema changes, ensuring that the database is always in a consistent state.
-   **Dependency Management**: Maven and npm are used for managing dependencies in the backend and frontend respectively.
-   **Exception Handling**: A global exception handler is implemented in the backend to gracefully handle errors and provide meaningful error messages to the client.
-   **Logging**: The backend uses SLF4J for logging, which is configured to provide different log levels for development and production environments.

---

## 🤝 Contributing

Contributions are welcome! Please feel free to open an issue or submit a pull request.

## Contributors

<table>
	<table>
	<tr align="center">
		<td>
		Divyanshu Singh
		<p align="center">
			<img src = "https://github.com/isinghdivyanshu.png" width="150" height="150" alt="Divyanshu Singh">
		</p>
			<p align="center">
				<a href = "https://github.com/isinghdivyanshu">
					<img src = "http://www.iconninja.com/files/241/825/211/round-collaboration-social-github-code-circle-network-icon.svg" width="36" height = "36" alt="GitHub"/>
				</a>
				<a href = "https://www.linkedin.com/in/isinghdivyanshu">
					<img src = "http://www.iconninja.com/files/863/607/751/network-linkedin-social-connection-circular-circle-media-icon.svg" width="36" height="36" alt="LinkedIn"/>
				</a>
			</p>
		</td>
	</tr>
</table>
