from flask import Flask, request, jsonify
import joblib
import numpy as np

app = Flask(__name__)

# Load model dan encoder
model = joblib.load('model_premi.pkl')
le_provinsi = joblib.load('le_provinsi.pkl')

# Mapping nilai gagal panen
gagal_mapping = {
    'Rendah': 1,
    'Sedang': 2,
    'Tinggi': 3
}

@app.route('/predict-premi', methods=['POST'])
def predict_premi():
    try:
        data = request.json

        # Ambil dan transformasi input (sesuai nama kolom Excel)
        provinsi = le_provinsi.transform([data['Provinsi']])[0]
        luas_panen = float(data['Luas Panen (ha)'])
        produktivitas = float(data['Produktivitas (ku/ha)'])
        produksi = float(data['Produksi (ton)'])
        gagal = gagal_mapping.get(data['riwayat_gagal_panen'], 2)  # default ke 'Sedang'

        # Prediksi
        fitur = np.array([[provinsi, luas_panen, produktivitas, produksi, gagal]])
        tarif_premi = model.predict(fitur)[0]

        return jsonify({
            'tarif_premi': round(tarif_premi, 4),
            'status': 'success'
        })

    except Exception as e:
        return jsonify({'message': str(e), 'status': 'error'}), 400


if __name__ == '__main__':
    app.run(debug=True)
