from fastapi import FastAPI, File, UploadFile
from fastapi.middleware.cors import CORSMiddleware
from PyPDF2 import PdfReader
from langchain_openai import OpenAIEmbeddings, OpenAI
from langchain.text_splitter import CharacterTextSplitter
from langchain_community.vectorstores import FAISS
from langchain.chains.question_answering import load_qa_chain
from langchain.prompts import PromptTemplate
from io import BytesIO
from langchain.memory import ConversationBufferMemory
from pydantic import BaseModel
from dotenv import load_dotenv

# Load environment variables from .env file
load_dotenv()

# Initialize FastAPI app
app = FastAPI()

# Define allowed origins for CORS
origins = [
    "http://localhost:3000",
    "https://pdf-chat-puce.vercel.app"
]

# Configure CORS middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Initialize conversation memory buffer
memory = ConversationBufferMemory(memory_key="chat_history", input_key="human_input")

# Define data model for question
class Question(BaseModel):
    question: str


# Upload endpoint to handle PDF file uploads
@app.post("/upload/")
async def upload_file(file: UploadFile = File(...)):
    global vector_store
    vector_store = None
    try:
        # Read uploaded file
        pdf_content = await file.read()
        pdf_stream = BytesIO(pdf_content)
        pdfreader = PdfReader(pdf_stream)

        # Extract text from each page of the PDF
        raw_text = ""
        for page in pdfreader.pages:
            raw_text += page.extract_text()
        
        # Split raw text into smaller chunks
        text_splitter = CharacterTextSplitter(
            separator = '\n',
            chunk_size = 1000,
            chunk_overlap = 200,
            length_function = len,
        )
        chunks = text_splitter.split_text(raw_text)
        
        # Initializing embeddings and vector store if not already initialized
        if vector_store is None:
            embeddings = OpenAIEmbeddings()
            vector_store = FAISS.from_texts(chunks,embeddings)
            print("Vector store initialised")

        return {"filename": file.filename} 
    except Exception as e:
        print(str(e))
        return {"error": str(e)}


# Process endpoint to handle questions and generate responses
@app.post("/process/")
async def process_question(question_data: Question):
    global vector_store
    try:
        # Extract my question 
        question = question_data.question

        # Search for similar documents in vector store
        docs = vector_store.similarity_search(question)

        # Custom template
        template = """You are a chatbot having a conversation with a human.

        Given the following extracted parts of a long document and a question, create a final answer.

        {context}

        {chat_history}
        Human: {human_input}
        Chatbot:"""
        prompt = PromptTemplate(
            input_variables=["chat_history", "human_input", "context"], template=template
        )

        # Load question answering chain
        chain = load_qa_chain(
            OpenAI(temperature=0.0), chain_type="stuff", memory=memory, prompt=prompt
        )

        # Invoke question answering chain to generate response
        response = chain.invoke({"input_documents": docs, "human_input": question}, 
        return_only_outputs=True)

        res = response['output_text']
        return {"result":res}

    except Exception as e:
        return {"error": str(e)}