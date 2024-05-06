# Codebase

Github : [https://github.com/mayankyadav1711/MySocket.git](https://github.com/mayankyadav1711/MySocket.git)\
\
Here are the installation commands for setting up the chat application:

#### Server Installation:

1.  Change directory to the server folder:

    ```bash
    cd server
    ```
2.  Install server dependencies:

    ```bash
    npm install
    ```
3.  Set up environment variables by creating a `.env` file in the server directory and adding the following variables:

    ```bash
    MONGO_URI=your_mongodb_uri
    JWT_SECRET=your_jwt_secret
    ADMIN_SECRET_KEY=your_admin_secret_key
    NODE_ENV=development
    CLIENT_URL=http://localhost:3000
    CLOUDINARY_CLOUD_NAME=your_cloudinary_cloud_name
    CLOUDINARY_API_KEY=your_cloudinary_api_key
    CLOUDINARY_API_SECRET=your_cloudinary_api_secret
    ```
4.  Start the server in development mode:

    ```bash
    npm run dev
    ```

#### Client Installation:

1.  Change directory to the client folder:

    ```bash
    cd client
    ```
2.  Install client dependencies:

    ```bash
    npm install
    ```
3.  Set up environment variables by creating a `.env` file in the client directory and adding the following variable:

    ```arduino
    VITE_SERVER=http://localhost:3000
    ```
4.  Start the client application in development mode:

    ```bash
    npm run dev
    ```

