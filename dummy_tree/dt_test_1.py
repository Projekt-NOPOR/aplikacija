import pandas as pd
from sklearn.tree import DecisionTreeRegressor, plot_tree
import numpy as np
from matplotlib import pyplot as plt

df = pd.read_excel('data_1.xlsx')

X = df.iloc[:, 0:-1]
y = df.iloc[:, -1]

tree = DecisionTreeRegressor(max_depth=2, random_state=0)
tree = tree.fit(X, y)

pred_data = np.array([[3, 20, 10, 20]])
predicted = tree.predict(pred_data)
print(predicted)

fig = plt.figure(figsize=(25, 20))
_ = plot_tree(tree, feature_names=df.columns)
fig.savefig("decistion_tree.png")
