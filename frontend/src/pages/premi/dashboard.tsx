import { useState, useEffect } from "react";
import { useForm, Controller } from "react-hook-form";
import { Toaster, toast } from "react-hot-toast";
import api from "#/lib/axios";

interface HitungPremiForm {
  petani_id: string;
  provinsi: string;
  kabupaten: string;
  kecamatan: string;
  detail_alamat: string;
  luas_panen: number;
  produktivitas: number;
  produksi: number;
  riwayat_gagal_panen: number;
  nilai_panen: number;
}

export default function PremiDashboard() {
  const {
    control,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset, // <-- Import the reset function
  } = useForm<HitungPremiForm>();
  const [result, setResult] = useState<null | {
    id: string;
    tarif_premi: string;
    nilai_panen: string;
    premi_dibayar: string;
  }>(null);

  // Use useEffect to load data from localStorage on component mount
  useEffect(() => {
    const savedUser = localStorage.getItem("authUser");
    if (savedUser) {
      const user = JSON.parse(savedUser);
      // Use the reset function to set the form's default values
      reset({
        petani_id: user._id,
        provinsi: user.provinsi,
        kabupaten: user.kabupaten,
        kecamatan: user.kecamatan,
        detail_alamat: user.alamat_lengkap,
      });
    }
  }, [reset]); // <-- Dependency array ensures this runs only once on mount

  const onSubmit = async (data: HitungPremiForm) => {
    try {
      const response = await api.post("/premi/hitung", data);
      const { data: respData } = response;
      toast.success(respData.message);
      setResult(respData.data);
    } catch (err: any) {
      const msg = err.response?.data?.message || err.message || "Gagal menghitung premi.";
      toast.error(msg);
    }
  };

  const inputStyles =
    "mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring focus:ring-green-500 focus:ring-opacity-50";
  const labelStyles = "block text-sm font-medium text-gray-700";

  return (
    <section className="p-6 max-w-4xl mx-auto">
      <Toaster position="top-center" />
      <h2 className="text-2xl font-bold mb-4">Hitung Premi</h2>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {[
            // For petani_id, you might want it to be a hidden input
            { name: "petani_id", label: "Petani ID", type: "hidden" },
            { name: "provinsi", label: "Provinsi", type: "text" },
            { name: "kabupaten", label: "Kabupaten", type: "text" },
            { name: "kecamatan", label: "Kecamatan", type: "text" },
            { name: "detail_alamat", label: "Detail Alamat", type: "text" },
            { name: "luas_panen", label: "Luas Panen (ha)", type: "number" },
            { name: "produktivitas", label: "Produktivitas (ku/ha)", type: "number" },
            { name: "produksi", label: "Produksi (ton)", type: "number" },
            { name: "riwayat_gagal_panen", label: "Riwayat Gagal Panen", type: "number" },
            { name: "nilai_panen", label: "Nilai Panen", type: "number" },
          ].map((field) => (
            <Controller
              key={field.name}
              name={field.name as keyof HitungPremiForm}
              control={control}
              rules={{ required: `${field.label} wajib diisi` }}
              render={({ field: controllerField, fieldState }) => (
                <div className={field.type === 'hidden' ? 'hidden' : ''}>
                  <label htmlFor={field.name} className={labelStyles}>
                    {field.label}
                  </label>
                  <input
                    id={field.name}
                    type={field.type}
                    {...controllerField}
                    disabled={isSubmitting}
                    className={`${inputStyles} ${fieldState.error ? "border-red-500" : ""}`}
                  />
                  {fieldState.error && (
                    <p className="mt-1 text-sm text-red-600">{fieldState.error.message}</p>
                  )}
                </div>
              )}
            />
          ))}
        </div>
        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full flex justify-center rounded-md bg-green-700 px-4 py-2 text-white font-medium hover:bg-green-800 disabled:opacity-50"
        >
          {isSubmitting ? "Menghitung..." : "Hitung Premi"}
        </button>
      </form>
      {result && (
        <div className="mt-6 bg-white p-4 rounded-md shadow">
          <h3 className="text-xl font-semibold mb-2">Hasil Premi</h3>
          <p>
            <strong>ID Premi:</strong> {result.id}
          </p>
          <p>
            <strong>Tarif Premi:</strong> {result.tarif_premi}
          </p>
          <p>
            <strong>Nilai Panen:</strong> {result.nilai_panen}
          </p>
          <p>
            <strong>Premi Dibayar:</strong> {result.premi_dibayar}
          </p>
        </div>
      )}
    </section>
  );
}