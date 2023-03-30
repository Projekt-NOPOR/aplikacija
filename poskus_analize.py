import pandas as pd
import openpyxl
import random
import os


values = [[random.randint(0,100) for i in range(100)], [random.randint(0,100) for j in range(100)], [random.randint(0,100) for k in range(100)]]

index = [chr(97+i%26) for i in range(100)]

columnes = ['prva', 'druga','tretja']

df = pd.DataFrame(values,columnes,index)

print(df)

df.to_excel('proba.xlsx',sheet_name='testni_list')