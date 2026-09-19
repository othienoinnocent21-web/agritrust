# AgricTrust

AgricTrust is an agricultural technology platform designed to connect farmers, agricultural products, and digital services through a modern web application.

## Project Structure

```text
agritrust/
├── backend/                    # Spring Boot Java backend
│   ├── src/
│   │   ├── main/
│   │   │   ├── java/com/agritrust/backend/
│   │   │   │   ├── controller/
│   │   │   │   ├── entity/
│   │   │   │   ├── repository/
│   │   │   │   ├── security/
│   │   │   │   └── service/
│   │   │   └── resources/
│   │   ├── test/
│   │   └── ...
│   ├── .mvn/
│   ├── pom.xml
│   ├── mvnw
│   └── mvnw.cmd
│
├── frontend/                   # React + Vite frontend
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── routes/
│   │   ├── context/
│   │   ├── hooks/
│   │   ├── services/
│   │   ├── utils/
│   │   ├── constants/
│   │   ├── data/
│   │   ├── layouts/
│   │   ├── assets/
│   │   ├── App.jsx
│   │   ├── index.css
│   │   └── main.jsx
│   ├── public/
│   ├── package.json
│   ├── package-lock.json
│   ├── vite.config.js
│   ├── tailwind.config.js
│   └── postcss.config.js
│
├── .gitignore
└── README.md
```

## Getting Started

### Prerequisites

Make sure you have installed:

* Java 17 or later
* Maven
* Node.js and npm
* MySQL/MariaDB

### Backend

Open a terminal in the project root and run:

```bash
cd backend
./mvnw spring-boot:run
```

On Windows, you can use:

```powershell
cd backend
.\mvnw.cmd spring-boot:run
```

The backend runs on port `8080`.

### Frontend

Open another terminal and run:

```bash
cd frontend
npm install
npm run dev
```

The frontend will be available through the Vite development server.

## Database

The backend uses MySQL/MariaDB.

Create a database named:

```text
agritrust
```

Configure your local database credentials in your local environment. **Do not commit database passwords or other secrets to GitHub.**

## Development

The project is divided into two main applications:

* **Frontend:** React + Vite
* **Backend:** Spring Boot + Java
* **Database:** MySQL/MariaDB

When contributing, make changes in the appropriate `frontend` or `backend` directory.

## Contributors

AgricTrust is developed collaboratively by its project contributors.
