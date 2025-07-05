import { useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { useParams } from "react-router-dom";
import { Toaster, toast } from "react-hot-toast";
import api from "#/lib/axios";

interface KlaimForm {
  tingkat_kerusakan: number;
  foto_lahan: FileList;
}

export default function KlaimDashboard() {
  const { id } = useParams<{ id: string }>(); // Expect premi ID in URL
  const {
    control,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<KlaimForm>();

  const [klaimResult, setKlaimResult] = useState<null | {
    premi_id: string;
    tingkat_kerusakan: string;
    klaim: string;
    foto_lahan: string;
  }>(null);

  const onSubmit = async (data: KlaimForm) => {
    if (!id) {
      toast.error("ID Premi tidak tersedia.");
      return;
    }

    try {
      const form = new FormData();
      form.append("tingkat_kerusakan", String(data.tingkat_kerusakan));
      if (data.foto_lahan && data.foto_lahan.length > 0) {
        form.append("foto_lahan", data.foto_lahan[0]);
      }

      const { data: resp } = await api.post(`/premi/klaim/${id}`, form, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      toast.success(resp.message);
      setKlaimResult(resp.data);
    } catch (err: any) {
      toast.error(err.response?.data?.message || err.message || "Gagal klaim premi.");
    }
  };

  const inputStyles =
    "mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring focus:ring-green-500 focus:ring-opacity-50";
  const labelStyles = "block text-sm font-medium text-gray-700";

  return (
    <section className="p-6 max-w-md mx-auto">
      <Toaster position="top-center" />

      <h2 className="text-2xl font-bold mb-4">Klaim Premi</h2>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <Controller
          name="tingkat_kerusakan"
          control={control}
          rules={{ required: "Tingkat kerusakan wajib diisi" }}
          render={({ field, fieldState }) => (
            <div>
              <label htmlFor="tingkat_kerusakan" className={labelStyles}>
                Tingkat Kerusakan (%)
              </label>
              <input
                id="tingkat_kerusakan"
                type="number"
                {...field}
                disabled={isSubmitting}
                className={`${inputStyles} ${fieldState.error ? "border-red-500" : ""}`}
              />
              {fieldState.error && (
                <p className="mt-1 text-sm text-red-600">{fieldState.error.message}</p>
              )}
            </div>
          )}
        />

        <Controller
          name="foto_lahan"
          control={control}
          rules={{ required: "Foto lahan wajib diunggah" }}
          render={({ field, fieldState }) => (
            <div>
              <label htmlFor="foto_lahan" className={labelStyles}>
                Upload Foto Lahan
              </label>
              <input
                id="foto_lahan"
                type="file"
                accept="image/*"
                {...field}
                disabled={isSubmitting}
                className="mt-1 block w-full"
              />
              {fieldState.error && (
                <p className="mt-1 text-sm text-red-600">{fieldState.error.message}</p>
              )}
            </div>
          )}
        />

        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full rounded-md bg-blue-600 px-4 py-2 text-white font-medium hover:bg-blue-700 disabled:opacity-50"
        >
          {isSubmitting ? "Mengirim Klaim..." : "Submit Klaim"}
        </button>
      </form>

      {klaimResult && (
        <div className="mt-6 bg-white p-4 rounded-md shadow">
          <h3 className="text-xl font-semibold mb-2">Hasil Klaim</h3>
          <p>
            <strong>ID Premi:</strong> {klaimResult.premi_id}
          </p>
          <p>
            <strong>Tingkat Kerusakan:</strong> {klaimResult.tingkat_kerusakan}
          </p>
          <p>
            <strong>Jumlah Klaim:</strong> {klaimResult.klaim}
          </p>
          <p>
            <strong>Foto Lahan:</strong> {klaimResult.foto_lahan}
          </p>
        </div>
      )}
    </section>
  );
}
