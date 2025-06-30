import pandas as pd
from sklearn.model_selection import train_test_split
from sklearn.preprocessing import LabelEncoder
from sklearn.ensemble import RandomForestRegressor
import joblib

# 1. Baca datahon
df = pd.read_excel('dataset.xlsx')

# 2. Bersihkan nama kolom
df.columns = df.columns.str.strip()  # Hilangkan spasi di awal/akhir

# 3. Ubah 'riwayat_gagal_panen' dari string ke angka
mapping = {'Rendah': 1, 'Sedang': 2, 'Tinggi': 3}
df['riwayat_gagal_panen'] = df['riwayat_gagal_panen'].map(mapping)

# 4. Encode kolom kategorikal
le_provinsi = LabelEncoder()
df['Provinsi'] = le_provinsi.fit_transform(df['Provinsi'])

# 5. Fitur dan target
X = df[['Provinsi', 'Luas Panen (ha)', 'Produktivitas (ku/ha)', 'Produksi (ton)', 'riwayat_gagal_panen']]
y = df['tarif_premi']

# 6. Split data
X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)

# 7. Latih model
model = RandomForestRegressor(n_estimators=100, random_state=42)
model.fit(X_train, y_train)

joblib.dump(model, 'model_premi.pkl')
joblib.dump(le_provinsi, 'le_provinsi.pkl')
