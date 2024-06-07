# ===== imports =====
import numpy as np
import pandas as pd

from . import firebase as fb

# pipeline
from sklearn.pipeline import make_pipeline
from sklearn.base import BaseEstimator, TransformerMixin
from sklearn.impute import SimpleImputer

# ===== algorithm =====
def reccomender(user_id):
    reviews_dict = fb.getAllReviews()

    df_pivot, dict_index, df_meancentered = __preprocessor(reviews_dict)
    print(df_pivot)
    print(dict_index)
    print(df_meancentered)

    estimations = __most_similar(user_id, dict_index, df_meancentered)
    print(estimations)

    return ''

# ===== classes =====
class MeanCentering(BaseEstimator, TransformerMixin):
    def fit(self, X, y=None):
        return self
    
    def transform(self, X):
        row_means = X.mean(axis=1)
        X = X.sub(row_means, axis=0)
        return X

# ===== helper functions =====
def __preprocessor(dict):
    df = pd.DataFrame(dict).T.reset_index()
    df_pivot = df.pivot_table(
        index='user_id', 
        columns= 'place_id', 
        values='rating'
    ).reset_index().rename_axis(None, axis=1)
    dict_index = df_pivot.set_index(df_pivot.index)['user_id'].to_dict()
    df_placeid = df_pivot.drop(columns=['user_id'])
    pipeline = make_pipeline(
        MeanCentering(),
        SimpleImputer(strategy='constant', fill_value=0)
    )
    df_meancentered = pd.DataFrame(pipeline.fit_transform(df_placeid))
    return df_pivot, dict_index, df_meancentered

def __cosine_similarity(A, B):
    A = np.array(A)
    B = np.array(B)
    non_zero_indices_A = np.nonzero(A)[0]
    non_zero_indices_B = np.nonzero(B)[0]
    common_indices = np.intersect1d(non_zero_indices_A, non_zero_indices_B)
    if len(common_indices) == 0:
        return 0
    A_filtered = A[common_indices]
    B_filtered = B[common_indices]
    dot_product = np.dot(A_filtered, B_filtered)
    magnitude_A = np.linalg.norm(A_filtered)
    magnitude_B = np.linalg.norm(B_filtered)
    if magnitude_A == 0 or magnitude_B == 0:
        return 0
    else:
        return dot_product / (magnitude_A * magnitude_B)

def __most_similar(user_id, dict_index, df_meancentered):
    user_index = list(dict_index.values()).index(user_id)
    user = df_meancentered.iloc[user_index]
    users_list = list(df_meancentered.index.values)
    users_list.remove(user_index)
    greatest_index = ''
    second_greatest_index = ''
    greatest_score = 0
    second_greatest_score = 0
    for index in users_list:
        other_user = df_meancentered.iloc[index]
        score = __cosine_similarity(user, other_user)
        if score > greatest_score:
            second_greatest_score = greatest_score
            second_greatest_index = greatest_index
            greatest_score = score
            greatest_index = index
        elif score > second_greatest_score:
            second_greatest_score = score
            second_greatest_index = index
    return greatest_index, greatest_score, second_greatest_index, second_greatest_score

