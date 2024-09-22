import joblib
import pandas as pd
from sklearn.neighbors import KNeighborsClassifier

class RestaurantRecommender():
    def __init__(self):
        self.model = KNeighborsClassifier()
        self.model_loaded = False
        self.processed_training_df = pd.DataFrame()
        self.processed_training_loaded = False

     # ===== PRE-PROCESSING TARGET =====
    def preprocess_target(self, data):
        if not self.processed_training_loaded:
            print("Target Restaurant could not be succesfully preprocsesed")
        else:
            # convert json to df 
            restaurant_df = pd.DataFrame.from_dict(data, orient='index').transpose()
            # category => converting json to array of string
            categories = restaurant_df['categories'][0]
            category_list = []
            for category in categories:
                category_list.append(category['title'])
            restaurant_df['categories'] = [category_list]
            # one hot encode categories
            categories_df = restaurant_df['categories'].explode()
            one_hot_encoded = pd.get_dummies(categories_df)
            restaurant_df = restaurant_df[['id', 'name', 'rating']].join(one_hot_encoded.groupby(categories_df.index).sum())
            # rounding rating to int
            restaurant_df['rating'] = restaurant_df['rating'].round().astype(int)
            # fill in missing columns
            restaurant_df_without_info = restaurant_df.drop(columns=['rating', 'id', 'name'])
            original_columns = list(self.processed_training_df.drop(columns=['rating', 'id', 'name']).columns)
            restaurant_df_all_columns = restaurant_df_without_info.reindex(columns=original_columns, fill_value=0)
            result = restaurant_df[['id', 'name','rating']]
            restaurant_df_final = pd.concat([result, restaurant_df_all_columns], axis=1)
            # return df
            print("Sucessfully converted target restaurant")
            return restaurant_df_final
    

    # ===== PRE-PROCESSING DATASET =====
    def preprocess_training_dataset(self, dataset_path, city):
        # convert json to df
        dataset_df = pd.read_json(dataset_path, lines=True, orient='columns')
        # get restaurants in specified city 
        city_df = dataset_df[(dataset_df['city'] == city) & (dataset_df['is_open'] == 1)]
        city_df = city_df[['business_id', 'name', 'categories', 'stars']]
        rest_df = city_df[city_df['categories'].str.contains('Restaurant.*')==True].reset_index()
        # category => one hot encoding
        df_categories_dummies = rest_df['categories'].str.get_dummies(',')
        # join categories with rest of table
        result = rest_df[['business_id', 'name', 'stars']]
        df_final = pd.concat([result, df_categories_dummies], axis=1)
        # rounding rating to int
        df_final['stars'] = df_final['stars'].round().astype(int)
        # renaming columns
        df_final.rename(columns={'business_id': 'id', 'stars': 'rating'}, inplace=True)
        # finished 
        print("Sucessfully converted training dataset")
        return df_final
    
    def save_processed_training_dataset(self, training_df, path):
        training_df.to_csv(path, index=False) 
        print("Sucesfully saved processed training dataset")

    def load_processed_training_dataset(self, path):
        self.processed_training_df = pd.read_csv(path)
        self.processed_training_loaded = True
        print("Sucesfully loaded processed training dataset")

    # ===== KNN MODEL =====
    def train_model(self):
        if self.processed_training_loaded:
            X = self.processed_training_df.drop(columns=['id', 'name', 'rating'])
            y = self.processed_training_df['rating']
            knn = KNeighborsClassifier(n_neighbors=26)
            model = knn.fit(X, y)
            print("Sucessfully trained model on training dataset")
            return model
        else: 
            print("Could not train model on training dataset")

    def save_model(self, model, path):
        joblib.dump(model, path)
        print("Sucessfully saved model")

    def load_model(self, path):
        self.model = joblib.load(path)
        self.model_loaded = True
        print("Sucessfully loaded model")

    # ===== RECOMMENDATION =====
    def recommend(self, target_df):
        if self.model_loaded & self.processed_training_loaded:
            target_df_without_info = target_df.drop(columns=['id', 'name', 'rating'])
            knn = self.model
            final_table = pd.DataFrame(knn.kneighbors(target_df_without_info)[0][0], columns = ['distance'])
            final_table['index'] = knn.kneighbors(target_df_without_info)[1][0]
            final_table.set_index('index')
            result = final_table.join(self.processed_training_df, on='index')
            return result[['distance','index','name','id', 'rating']].head(5)