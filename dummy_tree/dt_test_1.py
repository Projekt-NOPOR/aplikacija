import pandas as pd
from sklearn.tree import DecisionTreeRegressor, plot_tree
import numpy as np
from matplotlib import pyplot as plt
import pickle
import sklearn_json as skljson

df = pd.read_excel("data_1.xlsx")

X = df.iloc[:, 0:-1]
y = df.iloc[:, -1]

tree_model = DecisionTreeRegressor(max_depth=2, random_state=0).fit(X, y)

# shranjevanje modela
pickle.dump(tree_model, open("dt_1.pickle", "wb"))
loaded_model = pickle.load(open("dt_1.pickle", "rb"))

# serializacija modela v json format
tree_model.n_features_ = 999        # ročno dodano, ker drgač ne dela
skljson.to_json(tree_model, "dt_test_1.json")

# napovedovanje z modelom
pred_data = np.array([[3, 20, 10, 20]])
predicted = tree_model.predict(pred_data)
print(predicted)

predicted = loaded_model.predict(pred_data)
print(predicted)

fig = plt.figure(figsize=(25, 20))
_ = plot_tree(loaded_model, feature_names=df.columns)
fig.savefig("decistion_tree.png")
