# PeerPulse – Peer Recognition and Employee Feedback Platform

PeerPulse is a web-based platform designed to encourage peer-to-peer recognition, improve employee engagement, and support structured performance feedback within an organization.

The platform aims to make employee appreciation more transparent and organized by enabling team members to recognize contributions and helping team leads and HR manage feedback and appraisal workflows.

## 🚀 Features

- **Peer Recognition:** Enables employees to appreciate and recognize their colleagues' contributions.
- **Recognition Quota:** Supports a limit of 16 shoutouts per employee, according to the project design.
- **Team Lead Dashboard:** Supports weekly recognition summaries for team leads.
- **HR Appraisal Support:** Organizes monthly recognition and feedback information for appraisal workflows.
- **Anti-Bias Mechanism:** Incorporates quota-based controls intended to encourage balanced recognition.
- **AI-Assisted Feedback:** Uses an LLM-based component to support feedback-related workflows.

## 🛠️ Tech Stack

| Component | Technology |
|---|---|
| Frontend | React, Vite, Tailwind CSS |
| Backend | Python, FastAPI |
| Database | PostgreSQL |
| AI Integration | Llama 3 |
| API Communication | REST APIs |

## 🏗️ Project Structure

```text
PeerPulse/
├── Backend/
│   └── Backend application and API files
├── forntEnd/
│   └── Frontend application files
├── .vscode/
├── .gitignore
├── package-lock.json
└── README.md
```

*Note: The frontend directory is named `forntEnd` in the current repository.*

## ⚙️ Getting Started

### Prerequisites

Install the following tools before running the project:

- Node.js and npm
- Python 3
- PostgreSQL
- Git

### 1. Clone the repository

```bash
git clone https://github.com/Bhavishya2007/PeerPulse.git
cd PeerPulse
```

### 2. Set up the frontend

```bash
cd forntEnd
npm install
npm run dev
```

The Vite development server will display the local URL, typically `http://localhost:5173`.

### 3. Set up the backend

Open another terminal and navigate to the `Backend` directory.

```bash
cd Backend
python -m venv venv
```

Activate the virtual environment.

**macOS/Linux**
```bash
source venv/bin/activate
```

**Windows**
```bash
venv\Scripts\activate
```

Install the dependencies using the project's dependency file, if provided:

```bash
pip install -r requirements.txt
```

Start the FastAPI application using the actual entry-point module in the repository. For example, if it is `main.py`:

```bash
uvicorn main:app --reload
```

### 4. Configure the database and AI integration

- Create a PostgreSQL database for the application.
- Configure the database connection using environment variables or the project's configuration file.
- Configure the Llama integration according to the backend implementation.
- Keep database credentials and API keys out of public source code.

*The exact configuration names and startup commands depend on the files present in the repository.*

## 🎯 Project Goals

- Encourage a culture of appreciation and collaboration.
- Support structured employee feedback and appraisal workflows.
- Promote fairer recognition practices.
- Explore the use of AI in employee feedback workflows.
- Connect a modern frontend with a backend API and relational database.

## 👩‍💻 My Contribution

This repository is a fork of [ishamiruthika23/PeerPulse](https://github.com/ishamiruthika23/PeerPulse).

My contributions to the project should be described according to the modules I personally developed, modified, tested, or maintained.

## 🔗 Repository

**GitHub:** https://github.com/Bhavishya2007/PeerPulse

---

*PeerPulse — Recognizing contributions. Encouraging collaboration. Supporting growth.*
