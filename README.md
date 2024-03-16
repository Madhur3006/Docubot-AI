# PDF CHATBOT

The AI PDF Reader is an innovative web application that empowers users to interact with the content of their PDF documents through a chat interface. With this tool, users can seamlessly upload their PDF files, engage in conversations based on the document content, and even ask follow-up questions for deeper insights. Dive into your PDFs like never before and unlock the potential of intelligent document interaction with the AI PDF Reader.

# Images

![Mobile View](https://github.com/parthy007/aipdfreader/assets/108089718/14be52fc-ed8a-4a2e-b65a-647d87fa4211)
![Desktop View](https://github.com/parthy007/aipdfreader/assets/108089718/33b653bb-74af-4b91-9e2f-323c946d33a3)

### A typical top-level directory layout

    ├── client                   # Frontend
    ├── server                   # Backend
    ├── README.md                # Readme file

###### Client

    ├── ...
    ├── src
    │        ├── assets                 # Svg files
    │        ├── components             # Source files for UI Interface
    │        ├── App.js
    │        ├── index.js
    └── ...

###### Server

     ├── ...
     ├── main.py                   # Main backend code
     ├── requirements.txt          # Dependency file
     └── ...

# Installation

Follow these steps to set up and run the AI PDF Reader application on your local machine.

## Prerequisites

- Git
- Node.js
- Python 3.x
- npm (Node Package Manager)

## Instructions

#### 1. Clone the Repository

Clone the AI-PDF Reader repository to your local machine:

- clone repo
  ```sh
  git clone https://github.com/parthy007/aipdfreader.git
  ```

#### 2. Navigate to the Client Directory

- Go to client
  ```sh
  cd client
  ```
- Install frontend dependencies
  ```sh
  npm install
  ```
- Run frontend
  ```sh
  npm run start
  ```

#### 3. Navigate to the Server Directory

- Go to server directory
  ```sh
  cd ..
  cd server
  ```
- Create a Python virtual environment:
  ```sh
  python3 -m virtualenv my_env
  ```
- Install the Python dependencies using pip:
  ```sh
  pip install -r requirements.txt
  ```

#### 4. Create .env file in Server Directory

Create a .env file in the server directory and add your OpenAI API key:

- Add the following line to the .env file:
  ```sh
  OPENAI_API_KEY = YOUR_OWN_API_KEY
  ```

You can create your own api key using the [OpenAI API](https://openai.com/blog/openai-api "OpenAI API")

- Run the server

```sh
uvicorn main:app --reload
```

# API Documentations

1. [LangChain](https://python.langchain.com/docs/get_started/introduction "LangChain")
2. [React](https://legacy.reactjs.org/docs/getting-started.html "React")
3. [React Hot Toast](https://react-hot-toast.com/docs "React Hot Toast")
4. [FastAPI](https://fastapi.tiangolo.com "FastAPI")
5. [OpenAI Api](https://platform.openai.com/docs/introduction "OpenAI Api")
6. [Tailwind CSS](https://tailwindcss.com/docs/installation "Tailwind CSS")
