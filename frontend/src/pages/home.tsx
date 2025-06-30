import { Link } from "react-router-dom";
import { useAuth } from "#/context/auth/AuthProvider";

// Assets in public directory cannot be imported from JavaScript.
// Instead, we use `src/assets` directory.
import HeroImge from "../assets/images/hero-1.svg";
import HeroImge2 from "../assets/images/hero-2.png";
import Logo from "../assets/images/logo-white.svg";
import Navbar from "#/components/navbar";

export default function Home() {
  const { user } = useAuth();

  return (
    <>
      <Navbar logoUrl={Logo} user={user} />
      <section className=" mt-32">
        <div className="max-w-7xl mx-auto py-16 px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
            <div className="text-center md:text-left">
              <h1 className="text-4xl font-extrabold tracking-tight  text-green-600 sm:text-5xl md:text-6xl">
                <span className="block mb-6">Next Generation</span>
                <span className="block">Global Farming</span>
              </h1>
              <p className="mt-3 max-w-md mx-auto text-lg text-gray-500 dark:text-gray-400 sm:text-xl md:mt-5 md:max-w-3xl">
                Petani Tangguh dengan Perlindungan Penuh.
              </p>
              <div className="mt-5 sm:flex sm:justify-center md:justify-start">
                <div className="rounded-full shadow">
                  <a
                    href="#"
                    className="w-full flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-full text-white bg-green-700 hover:bg-green-800 md:py-4 md:text-lg md:px-10"
                  >
                    Daftar Sekarang
                  </a>
                </div>
              </div>
            </div>

            <div className="mt-12 md:mt-0 flex justify-center">
              <img className="h-[300px] object-contain" src={HeroImge} alt="Leaf Icon" />
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 ">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
            <div className="flex justify-start">
              <img className="w-full max-w-md" src={HeroImge2} alt="Petani di sawah" />
            </div>
            <div>
              <h2 className="text-sm font-semibold tracking-widest text-green-600 uppercase">
                Who We Are
              </h2>
              <p className="mt-2 text-3xl font-extrabold text-gray-900 dark:text-white tracking-tight sm:text-4xl">
                A Team with Focus on Innovation
              </p>
              <p className="mt-4 text-gray-500 dark:text-gray-400 text-lg">
                Spatium Innovation Hub is a thinking company on a mission to connect people and
                businesses with meaningful innovation, at scale. We are dedicated to improving
                business processes, people, and systems through technology.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 ">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
            <div>
              <h2 className="text-sm font-semibold tracking-widest text-green-600 uppercase">
                Who We Do 
              </h2>
              <p className="mt-2 text-3xl font-extrabold text-gray-900 dark:text-white tracking-tight sm:text-4xl">
                A Team with Focus on Innovation
              </p>
              <p className="mt-4 text-gray-500 dark:text-gray-400 text-lg">
               Spatium Innovation Hub is a thinking company on a mission to connect people and businesses with meaningful innovation, at scale. We are dedicated to improving business processes, people, and systems through technology
              </p>
            </div>
            <div className="flex justify-end">
              <img className="w-full max-w-md" src={HeroImge2} alt="Petani di sawah" />
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
