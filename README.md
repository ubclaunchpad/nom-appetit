<br>
<div>
  <p align="center">
    <a href="">
      <img src="frontend/assets/logo.png" alt="Logo" width="100" height="100">
    </a>
  </p>
  <h3 align="center">Nom Appetit</h3>
  <p align="center">Restaurant tracking and recommendation app<p>
</div>
<br>

## Table of Contents
+ [About The Project](#abouttheproject)
+ [Getting Started](#getting-started)
+ [Deployment](#deployment)

## About The Project
Nom Appetit is a social restaurant tracking and recommendation app with the purpose of helping users pick a place to eat for both individuals and groups. It is designed to finally answer the question of “So… where do you want to eat?”

The first feature is a tracking feature that allows you to create shareable lists and populate them with restaurants you’ve been to, as well as restaurants that you would like to go to. Think Google Maps lists, but with more sorting and commenting functionalities. A stretch goal for this feature would be to build social media platform integrations to auto-populate or import restaurants into these lists.

The second feature is a restaurant picking feature - the heart and soul of Nom Appetit. Each user is prompted with yes or no statements in a short quiz, such as “I want to try a new place”. The app will then algorithmically draw upon each user’s lists and answers, and suggest a restaurant to go to. A stretch goal for this feature would be to implement machine learning to “smart suggest” a place to eat.

## Getting Started
To get a local copy up and running follow these simple example steps.

### Prerequisites

- [Python](https://www.python.org/downloads/)
- [Expo Go](https://docs.expo.dev/)

### API Credentials
- [Google Cloud](https://cloud.google.com/docs)
- [Firebase](https://firebase.google.com/docs/functions/get-started?gen=2nd)

### Installation

#### Frontend
1. Navigate to the `frontend` folder.
2. Install the required Node.js modules.
```
npm install
```
3. Start the application and follow the instructions in the terminal.
```
npx expo start
```

#### Backend
1. Navigate to the `backend` folder.
2. Create a `secrets` folder in the `services` folder.
3. Create `.env` file in `secrets` folder and assign Google Cloud API key to `GOOGLE_KEY`.
4. Generate & download Firebase Admin SDK key and place in `secrets` folder.
5. Install the required Python modules.
```
pip install -r requirements.txt
```
6. Run the server.
```
flask run
```

## Deployment
Currently in progress!
