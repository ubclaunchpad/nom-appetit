<br>
<div>
  <p align="center">
    <a href="">
      <img src="./frontend/assets/logo.png" alt="Logo" width="100" height="100">
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
+ [Contributing](#contributing)

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
- [Firebase](https://firebase.google.com/docs/functions/get-started?gen=2nd)
- [Yelp Fusion API](https://docs.developer.yelp.com/docs/fusion-intro)

### Installation

#### Frontend
1. Navigate to the `frontend` folder.
2. Install the required Node.js modules.
```
npm install
```
3. Generate Google Developer API key and set it as the `EXPO_PUBLIC_GOOGLE_KEY` variable in a `.env` file.
4. Start the application and follow the instructions in the terminal.
```
npx expo start
```

#### Backend
1. Navigate to the `backend` folder.
2. Create a `secrets` folder in the `services` folder.
3. Generate & download Firebase Admin SDK private key.
4. Generate Yelp Fusion API key and set it as the `YELP_API` variable in a `.env` file.
5. Place both the Firebase Admin SDK private key & `.env` file in the `secrets` directory.
6. Install the required Python modules.
```
pip install -r requirements.txt
```
7. Run the server.
```
flask run
```

## Deployment
Currently in progress!

## Contributing

Contributions are what make the community such an amazing place to be learn, inspire, and create. Any contributions you make are **greatly appreciated**.

1. Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
2. Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
3. Push to the Branch (`git push origin feature/AmazingFeature`)
4. Open a Pull Request

