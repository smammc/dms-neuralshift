# Document Management System

## Description

This Document Management System is a fullstack application designed to process, store, and display information from HTML and JSON files. It provides an intuitive interface for viewing and managing documents, with features like document deletion and detailed document views.

## Features

- Processes HTML and JSON files to extract document information
- Stores document data persistently using MongoDB
- RESTful API for retrieving and deleting documents
- Responsive frontend with two main views:
  - Homepage with document cards displaying summary information
  - Detailed document view with enhanced text processing (URL linking)
- Document deletion functionality
- Efficient resource management with file existence checking

## Technologies Used

- Backend:
  - Node.js
  - Express.js
  - MongoDB
- Frontend:
  - Vite
  - React
  - Axios (for API calls)
- Other:
  - RegEx for text processing

## Setup and Installation

1. Clone the repository

   ```
   git clone https://github.com/smammc/document-managent-system.git
   cd document-management-system
   ```

2. Install dependencies for both server and client

   ```
   cd server && npm install
   cd ../client && npm install
   ```

3. Set up MongoDB and update the connection string in `server/config.js`

4. Start the server

   ```
   cd ../server && npm start
   ```

5. Start the client

   ```
   cd ../client && npm run dev
   ```

6. Open your browser and navigate to `http://localhost:3000` (or the port specified by Vite)

## Usage

- The homepage displays all documents as cards with summary information
- Click the button on a card to view detailed information about the document
- Use the delete button on each card to remove a document from the system
- In the detailed view, certain text elements are automatically converted to clickable links for more information

## API Endpoints

- GET /api/documents - Retrieve all documents
- DELETE /api/documents/:id - Delete a specific document

## Future Improvements

- Add document creation and editing functionality
- Consider migrating to a relational database for more complex document relationships
- Implement full-text search capabilities
- Implement user authentication and authorization

## Docker

1. Build and start:

```
 docker-compose up --build
```

2. Shutdown:

```
 docker-compose down
```
