# SBMRD-Todo: A Modern Todo List Application

![Todo App Banner](https://img.shields.io/badge/SBMRD-Todo-blue?style=for-the-badge&logo=react)

A full-stack todo list application built with a modern tech stack, featuring user authentication, task management, and a scalable deployment setup. Deployable anywhere—local machines, Codespaces, or EC2 instances—thanks to Docker and a flexible architecture.

---

## ✨ Features
- **User Authentication**: Register and login securely.
- **Task Management**: Add, toggle, and delete todos.
- **Responsive UI**: Clean, modern design with Material-UI.
- **Scalable Deployment**: Runs seamlessly with Docker Compose.
- **Cross-Environment**: Works locally, in Codespaces, or on cloud instances like EC2.

---

## 🛠️ Technologies Used

| Technology | Description | Icon |
|------------|-------------|------|
| **React** | Frontend library for building the UI | ![React](https://img.shields.io/badge/React-20232A?style=flat&logo=react&logoColor=61DAFB) |
| **Spring Boot** | Backend framework for RESTful APIs | ![Spring Boot](https://img.shields.io/badge/Spring_Boot-6DB33F?style=flat&logo=spring&logoColor=white) |
| **MongoDB** | NoSQL database for storing users and todos | ![MongoDB](https://img.shields.io/badge/MongoDB-47A248?style=flat&logo=mongodb&logoColor=white) |
| **Docker** | Containerization for consistent environments | ![Docker](https://img.shields.io/badge/Docker-2496ED?style=flat&logo=docker&logoColor=white) |
| **Docker Compose** | Orchestrates multi-container setup | ![Docker Compose](https://img.shields.io/badge/Docker_Compose-2496ED?style=flat&logo=docker&logoColor=white) |
| **Nginx** | Reverse proxy for routing frontend and API requests | ![Nginx](https://img.shields.io/badge/Nginx-009639?style=flat&logo=nginx&logoColor=white) |
| **Node.js** | Runtime for building and running the frontend | ![Node.js](https://img.shields.io/badge/Node.js-339933?style=flat&logo=nodedotjs&logoColor=white) |
| **Java** | Language for the Spring Boot backend | ![Java](https://img.shields.io/badge/Java-007396?style=flat&logo=java&logoColor=white) |
| **Maven** | Build tool for the Spring Boot backend | ![Maven](https://img.shields.io/badge/Maven-C71A36?style=flat&logo=apachemaven&logoColor=white) |
| **Axios** | HTTP client for frontend API requests | ![Axios](https://img.shields.io/badge/Axios-5A29E4?style=flat&logo=axios&logoColor=white) |

---

## 📂 Project Structure

```
SBMRD-Todo/
├── backend/              # Spring Boot backend
│   ├── src/             # Java source code
│   ├── Dockerfile       # Backend container definition
│   └── pom.xml          # Maven dependencies
├── frontend/            # React frontend
│   ├── src/            # React source code (components, etc.)
│   ├── public/         # Static assets
│   ├── Dockerfile      # Frontend container definition
│   └── package.json    # Node dependencies
├── nginx.conf           # Nginx configuration for proxying
├── docker-compose.yml   # Multi-container orchestration
└── README.md            # Project documentation
```

---

## 🚀 Getting Started

### Prerequisites
- [Docker](https://www.docker.com/get-started) and [Docker Compose](https://docs.docker.com/compose/install/)
- [Node.js](https://nodejs.org/) (for local frontend development)
- [Java 17](https://adoptium.net/) and [Maven](https://maven.apache.org/) (for local backend development)

### Installation

1. **Clone the Repository**
   ```bash
   git clone https://github.com/yourusername/SBMRD-Todo.git
   cd SBMRD-Todo
   ```

2. **Run with Docker Compose**
   ```bash
   docker compose up --build
   ```
   - Access the app at `http://localhost:80/login` (or your EC2 public IP, e.g., `http://54.210.66.219/login`).

3. **Local Development (Optional)**
   - **Backend**:
     ```bash
     cd backend
     mvn clean spring-boot:run
     ```
   - **Frontend**:
     ```bash
     cd frontend
     npm install
     npm start
     ```
     - Access at `http://localhost:3000/login`.

---

## 🌐 Deployment

### EC2 Deployment
1. SSH into your EC2 instance.
2. Copy the project folder:
   ```bash
   scp -r SBMRD-Todo ec2-user@<ec2-public-ip>:/home/ec2-user/
   ```
3. Install Docker and Docker Compose on EC2:
   ```bash
   sudo yum update -y
   sudo yum install docker -y
   sudo curl -L "https://github.com/docker/compose/releases/latest/download/docker-compose-$(uname -s)-$(uname -m)" -o /usr/local/bin/docker-compose
   sudo chmod +x /usr/local/bin/docker-compose
   sudo systemctl start docker
   ```
4. Run:
   ```bash
   cd SBMRD-Todo
   docker compose up --build
   ```
5. Update Security Group:
   - Allow inbound TCP on port `80` from `0.0.0.0/0`.

### Codespaces
- Open in GitHub Codespaces.
- Run `docker compose up --build`.
- Forward port `80` in the "Ports" tab.
- Access via the forwarded URL (e.g., `https://<your-codespace>-80.app.github.dev/login`).

---

## 📝 Usage
1. Open the app in your browser.
2. Register with a username (e.g., `teste`) and password (e.g., `pass123`).
3. Log in to manage your todos:
   - Add tasks.
   - Toggle completion.
   - Delete tasks.

---

## 🗄️ Database Access
To list registered users in MongoDB:
```bash
docker compose exec mongo mongosh
use todo_db
db.users.find()
```

---

## 🤝 Contributing
1. Fork the repository.
2. Create a feature branch (`git checkout -b feature/xyz`).
3. Commit changes (`git commit -m "Add xyz feature"`).
4. Push to the branch (`git push origin feature/xyz`).
5. Open a Pull Request.
---

## 🙏 Acknowledgments
- Icons by [Shields.io](https://shields.io/).
- Inspired by modern full-stack tutorials.

---

Happy coding! 🚀
