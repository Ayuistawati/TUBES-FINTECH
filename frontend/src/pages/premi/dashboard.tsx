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
interface Result {
  id: string;
  tarif_premi: string;
  nilai_panen: string;
  premi_dibayar: string;
}
interface KlaimForm {
  tingkat_kerusakan: number;
  foto_lahan: FileList;
}

export default function PremiDashboard() {
  // Form for hitung premi
  const {
    control,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<HitungPremiForm>();

  // State for stored results
  const [results, setResults] = useState<Result[]>([]);

  // Track which result is being claimed
  const [claimingId, setClaimingId] = useState<string | null>(null);
  // Track claim responses
  const [claims, setClaims] = useState<Record<string, { klaim: string; tingkat_kerusakan: string; foto_lahan: string }>>({});

  // On mount, load existing results from localStorage
  useEffect(() => {
    const saved = localStorage.getItem("premiResults");
    if (saved) setResults(JSON.parse(saved));
    // prefill petani data
    const u = localStorage.getItem("authUser");
    if (u) {
      const user = JSON.parse(u);
      reset({
        petani_id: user._id,
        provinsi: user.provinsi,
        kabupaten: user.kabupaten,
        kecamatan: user.kecamatan,
        detail_alamat: user.alamat_lengkap,
      } as any);
    }
  }, [reset]);

  // Helper to persist results
  const persistResults = (newResults: Result[]) => {
    setResults(newResults);
    localStorage.setItem("premiResults", JSON.stringify(newResults));
  };

  // Submit handler for hitung premi
  const onHitung = async (data: HitungPremiForm) => {
    try {
      const { data: resp } = await api.post("/premi/hitung", data);
      toast.success(resp.message);
      const newRes: Result = resp.data;
      persistResults([...results, newRes]);
      reset(data); // keep same user data but clear numeric fields if you like
    } catch (err: any) {
      toast.error(err.response?.data?.message || err.message);
    }
  };

  // Submit handler for klaim, keyed per result.id
  const onKlaim = (id: string) => async (formData: KlaimForm) => {
    try {
      const body = new FormData();
      body.append("tingkat_kerusakan", String(formData.tingkat_kerusakan));
      if (formData.foto_lahan[0]) body.append("foto_lahan", formData.foto_lahan[0]);
      const { data: resp } = await api.post(`/premi/klaim/${id}`, body, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      toast.success(resp.message);
      setClaims({
        ...claims,
        [id]: resp.data,
      });
      setClaimingId(null);
    } catch (err: any) {
      toast.error(err.response?.data?.message || err.message);
    }
  };

  const inputStyles =
    "mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-green-500 focus:ring focus:ring-green-500 focus:ring-opacity-50";
  const labelStyles = "block text-sm font-medium text-gray-700";

  return (
    <section className="p-6 max-w-4xl mx-auto space-y-8">
      <Toaster position="top-center" />

      {/* HITUNG PREMI FORM */}
      <div>
        <h2 className="text-2xl font-bold mb-4">Hitung Premi</h2>
        <form onSubmit={handleSubmit(onHitung)} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {[
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
            ].map((f) => (
              <Controller
                key={f.name}
                name={f.name as keyof HitungPremiForm}
                control={control}
                rules={{ required: `${f.label} wajib diisi` }}
                render={({ field, fieldState }) => (
                  <div className={f.type === "hidden" ? "hidden" : ""}>
                    <label htmlFor={f.name} className={labelStyles}>
                      {f.label}
                    </label>
                    <input
                      id={f.name}
                      type={f.type}
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
            ))}
          </div>
          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full rounded-md bg-green-700 px-4 py-2 text-white hover:bg-green-800 disabled:opacity-50"
          >
            {isSubmitting ? "Menghitung..." : "Hitung Premi"}
          </button>
        </form>
      </div>

      {/* LIST OF RESULTS */}
      <div className="space-y-6">
        <h2 className="text-2xl font-bold">Daftar Premi</h2>
        {results.map((r) => (
          <div key={r.id} className="bg-white p-4 rounded-md shadow space-y-3">
            <p>
              <strong>ID:</strong> {r.id}
            </p>
            <p>
              <strong>Tarif Premi:</strong> {r.tarif_premi}
            </p>
            <p>
              <strong>Nilai Panen:</strong> {r.nilai_panen}
            </p>
            <p>
              <strong>Premi Dibayar:</strong> {r.premi_dibayar}
            </p>

            {/* If we have a claim result, show it */}
            {claims[r.id] ? (
              <div className="mt-2 p-2 bg-green-50 rounded">
                <h4 className="font-semibold">Hasil Klaim</h4>
                <p>
                  <strong>Tingkat Kerusakan:</strong> {claims[r.id].tingkat_kerusakan}
                </p>
                <p>
                  <strong>Klaim:</strong> {claims[r.id].klaim}
                </p>
                <p>
                  <strong>Foto Lahan:</strong> {claims[r.id].foto_lahan}
                </p>
              </div>
            ) : (
              // Otherwise, show button or form
              <>
                {claimingId === r.id ? (
                  <form
                    onSubmit={handleSubmit(onKlaim(r.id))}
                    className="mt-2 space-y-3 border-t pt-3"
                  >
                    <Controller
                      name="tingkat_kerusakan"
                      control={control as any}
                      rules={{ required: "Tingkat kerusakan wajib diisi" }}
                      render={({ field, fieldState }) => (
                        <div>
                          <label className={labelStyles}>Tingkat Kerusakan (%)</label>
                          <input
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
                      control={control as any}
                      rules={{ required: "Foto lahan wajib diunggah" }}
                      render={({ field, fieldState }) => (
                        <div>
                          <label className={labelStyles}>Upload Foto Lahan</label>
                          <input
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
                    <div className="flex gap-2">
                      <button
                        type="submit"
                        disabled={isSubmitting}
                        className="rounded-md bg-green-600 px-4 py-2 text-white hover:bg-green-700 disabled:opacity-50"
                      >
                        Submit Klaim
                      </button>
                      <button
                        type="button"
                        onClick={() => setClaimingId(null)}
                        className="rounded-md bg-gray-300 px-4 py-2 hover:bg-gray-400"
                      >
                        Cancel
                      </button>
                    </div>
                  </form>
                ) : (
                  <button
                    onClick={() => setClaimingId(r.id)}
                    className="mt-2 rounded-md bg-green-600 px-4 py-2 text-white hover:bg-green-700"
                  >
                    Klaim Premi
                  </button>
                )}
              </>
            )}
          </div>
        ))}
      </div>
    </section>
  );
}
