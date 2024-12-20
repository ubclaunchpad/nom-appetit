<br>
<p align="center">
  <img src="./frontend/assets/gallery/logo.png" alt="Logo" width=125/>
</p>
<p align="center">
  Restaurant discovery & recommendation mobile app
</p>
<br>

# 🚀 Getting Started
To get a local copy up and running follow these simple example steps.

### Prerequisites

- [Python](https://www.python.org/downloads/)
- [PostgreSQL](https://www.postgresql.org/download/)

### Third-Party APIs
- [Yelp Fusion API](https://docs.developer.yelp.com/docs/fusion-intro)

## Installation

### Backend
1. Navigate to the `backend` directory.
2. Configure the `.env` file.
```
DB_USER = [PostgreSQL username]
DB_PASS = [PostgreSQL password]
DB_HOST = [The host where your database is running (use 'localhost' for local)]
DB_PORT = [The port PostgreSQL is running on (default is 5432)]
DB_NAME = [The name of your PostgreSQL database]
SERVER_KEY = [Secret key for encoding/decoding JWT tokens]                
```
3. Install the required Python modules.
```
pip install -r requirements.txt
```
4. Run the server.
```
flask run
```
