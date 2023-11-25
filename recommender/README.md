# Restaurant Recommendation Algorithm
This module implements a simple restaurant recommendation algorithm based on collaborative filtering.

## Installation
1. Ensure that Python version >= 3.10.6. Then clone the repository.
2. Open a terminal and run `cd recommender`.
3. Run `python -m venv venv` to create a virtual environment.
4. Activate the virtual environment:
    - Windows: `venv\Scripts\activate`
    - MacOS: `source venv/bin/activate`
    - Linux: `source venv/bin/activate.csh`
5. Install dependencies by running `pip3 install -r requirements.txt`.
6. For now, you can run the recommendation script using `python restaurant_recommender.py`.
7. Deactivate the virtual environment with `deactivate`. 

## Running Tests
1. Open a terminal and run `cd recommender`.
2. Run unit tests using the command: `python -m unittest tests.test_recommender_module`.