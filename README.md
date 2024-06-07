<br />
<div align="center">
  <a href="https://github.com/othneildrew/Best-README-Template">
    <img src="docs/images/logo.jpg" alt="Logo" width="100" height="100">
  </a>

  <h3 align="center">Nom Appetit</h3>

  <p align="center">
    Nom Appetit is a mobile application designed as a restaurant tracker and recommendation tool for both users and groups.
  </p>
</div>
<br />

## Getting Started
### Prerequisites
Please ensure that you have the following installed:

- Python (Flask)
- TypeScript (React Native)

### Installation

#### Backend
1. Navigate to the `backend` folder.
```
cd backend
```

2. Create a `secrets` folder in the `services` folder.
```
mkdir services/secrets
```

2. Create `.env` file in `secrets` folder and assign Google Cloud API key to `GOOGLE_KEY`.
```
touch services/secrets/.env
```

3. Generate & download Firebase Admin SDK key and place in `secrets` folder.

4. Install the required Python modules.
```
pip install -r requirements.txt
```

5. Run the server.
```
python server.py
```

#### Frontend
1. Navigate to the `frontend` folder.
```
cd frontend
```

2. Install the required Node.js modules.
```
npm install
```

3. Start the application and follow the instructions in the terminal.
```
npx expo start
```

