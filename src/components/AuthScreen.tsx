import React, { useState } from "react";
import { Mail, Lock, Car, Users, Sparkles, AlertCircle, CheckCircle, Shield } from "lucide-react";

interface AuthScreenProps {
  onAuthSuccess: (user: { email: string; role: "driver" | "passenger" }) => void;
}

export default function AuthScreen({ onAuthSuccess }: AuthScreenProps) {
  const [isLoginTab, setIsLoginTab] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState<"driver" | "passenger">("driver");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  // Demo user data store in localStorage for persistence
  const getRegisteredUsers = () => {
    const users = localStorage.getItem("parkease_users");
    return users ? JSON.parse(users) : [
      { email: "driver@parkease.com", password: "password123", role: "driver" },
      { email: "penumpang@parkease.com", password: "password123", role: "passenger" }
    ];
  };

  const handleAuth = (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    if (!email.trim() || !password.trim()) {
      setError("Email dan kata sandi wajib diisi!");
      return;
    }

    if (password.length < 6) {
      setError("Kata sandi minimal harus 6 karakter!");
      return;
    }

    const registeredUsers = getRegisteredUsers();

    if (isLoginTab) {
      // Login Logic
      const foundUser = registeredUsers.find(
        (u: any) => u.email.toLowerCase() === email.toLowerCase() && u.password === password
      );

      if (foundUser) {
        setSuccess("Log masuk berhasil! Memuat dasbor...");
        setTimeout(() => {
          onAuthSuccess({ email: foundUser.email, role: foundUser.role });
        }, 1200);
      } else {
        setError("Email atau kata sandi salah. Gunakan jalan pintas uji coba di bawah untuk masuk instan.");
      }
    } else {
      // Register Logic
      const userExists = registeredUsers.some(
        (u: any) => u.email.toLowerCase() === email.toLowerCase()
      );

      if (userExists) {
        setError("Email sudah terdaftar! Sila lakukan log masuk.");
        return;
      }

      const newUser = { email, password, role };
      const updatedUsers = [...registeredUsers, newUser];
      localStorage.setItem("parkease_users", JSON.stringify(updatedUsers));

      setSuccess(`Registrasi Akun ${role === "driver" ? "Pengemudi" : "Penumpang"} Berhasil!`);
      
      setTimeout(() => {
        onAuthSuccess({ email, role });
      }, 1500);
    }
  };

  const loginAsDemo = (demoRole: "driver" | "passenger") => {
    const demoEmail = demoRole === "driver" ? "driver@parkease.com" : "penumpang@parkease.com";
    setError("");
    setSuccess(`Memasuki mode uji coba sebagai ${demoRole === "driver" ? "Pengemudi" : "Penumpang"}...`);
    setTimeout(() => {
      onAuthSuccess({ email: demoEmail, role: demoRole });
    }, 1000);
  };

  return (
    <div className="flex items-center justify-center min-h-[calc(100vh-5rem)] bg-slate-900 px-4 py-12 relative overflow-hidden">
      {/* Dynamic graphic backgrounds */}
      <div className="absolute top-[-10%] left-[-10%] w-[45%] h-[45%] rounded-full bg-blue-600/10 blur-[120px] pointer-events-none" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[45%] h-[45%] rounded-full bg-indigo-600/10 blur-[120px] pointer-events-none" />

      <div className="max-w-md w-full bg-slate-850/40 backdrop-blur-xl border border-slate-700/50 p-8 rounded-3xl shadow-2xl relative z-10 animate-fadeIn" id="auth-card">
        {/* Brand visual header */}
        <div className="text-center mb-8">
          <div className="mx-auto h-12 w-12 bg-blue-600 rounded-2xl flex items-center justify-center text-white shadow-xl shadow-blue-900/30 mb-4 animate-pulse-subtle">
            <Sparkles className="h-6 w-6" />
          </div>
          <h2 className="text-2xl sm:text-3xl font-black text-white font-sans tracking-tight">
            Park<span className="text-blue-500">Ease</span> Sungailiat
          </h2>
          <p className="text-xs sm:text-sm text-slate-400 mt-1 max-w-sm mx-auto font-normal">
            Platform Parkir & Penjemputan Pintar Khusus <span className="text-emerald-400 font-semibold font-mono">Taman Kota Sungailiat</span>
          </p>
        </div>

        {/* Tab switch buttons */}
        <div className="grid grid-cols-2 bg-slate-800/80 p-1.5 rounded-2xl border border-slate-700/40 mb-6">
          <button
            type="button"
            onClick={() => {
              setIsLoginTab(true);
              setError("");
              setSuccess("");
            }}
            className={`py-2 px-4 text-xs sm:text-sm font-extrabold rounded-xl tracking-wider transition-all cursor-pointer uppercase ${
              isLoginTab
                ? "bg-blue-600 text-white shadow-lg shadow-blue-950/40"
                : "text-slate-400 hover:text-white"
            }`}
          >
            Masuk Akun
          </button>
          <button
            type="button"
            onClick={() => {
              setIsLoginTab(false);
              setError("");
              setSuccess("");
            }}
            className={`py-2 px-4 text-xs sm:text-sm font-extrabold rounded-xl tracking-wider transition-all cursor-pointer uppercase ${
              !isLoginTab
                ? "bg-blue-600 text-white shadow-lg shadow-blue-950/40"
                : "text-slate-400 hover:text-white"
            }`}
          >
            Daftar Baru
          </button>
        </div>

        {/* Alerts section */}
        {error && (
          <div className="mb-5 p-3.5 bg-red-950/60 border border-red-850/50 rounded-xl text-xs text-red-300 flex items-start gap-2.5 animate-slideUp">
            <AlertCircle className="h-4.5 w-4.5 shrink-0 text-red-400 mt-0.5" />
            <p className="leading-relaxed">{error}</p>
          </div>
        )}

        {success && (
          <div className="mb-5 p-3.5 bg-emerald-950/60 border border-emerald-850/50 rounded-xl text-xs text-emerald-300 flex items-start gap-2.5 animate-slideUp">
            <CheckCircle className="h-4.5 w-4.5 shrink-0 text-emerald-400 mt-0.5" />
            <p className="leading-relaxed">{success}</p>
          </div>
        )}

        {/* Form panel */}
        <form onSubmit={handleAuth} className="space-y-4">
          <div className="space-y-1.5">
            <label className="block text-xs font-bold text-slate-300 font-mono uppercase tracking-wide">
              Alamat Email
            </label>
            <div className="relative">
              <span className="absolute left-3.5 top-3.5 text-slate-500">
                <Mail className="h-4.5 w-4.5" />
              </span>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="masukkan@email.com"
                className="w-full bg-slate-800/60 border border-slate-700/60 rounded-xl py-3 pl-10 pr-4 text-slate-100 text-sm focus:outline-none focus:border-blue-500 focus:bg-slate-800/90 transition-all font-medium placeholder-slate-500"
              />
            </div>
          </div>

          <div className="space-y-1.5">
            <label className="block text-xs font-bold text-slate-300 font-mono uppercase tracking-wide">
              Kata Sandi
            </label>
            <div className="relative">
              <span className="absolute left-3.5 top-3.5 text-slate-500">
                <Lock className="h-4.5 w-4.5" />
              </span>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="******"
                className="w-full bg-slate-800/60 border border-slate-700/60 rounded-xl py-3 pl-10 pr-4 text-slate-100 text-sm focus:outline-none focus:border-blue-500 focus:bg-slate-800/90 transition-all font-medium placeholder-slate-500"
              />
            </div>
          </div>

          {/* Role selector for registration tab only */}
          {!isLoginTab && (
            <div className="space-y-2 pt-1">
              <label className="block text-xs font-bold text-slate-300 font-mono uppercase tracking-wide mb-1">
                Pilih Tipe Keanggotaan
              </label>
              <div className="grid grid-cols-2 gap-3">
                <button
                  type="button"
                  onClick={() => setRole("driver")}
                  className={`py-3.5 px-4 rounded-xl border flex flex-col items-center justify-center gap-1.5 transition-all text-xs cursor-pointer ${
                    role === "driver"
                      ? "border-blue-500 bg-blue-500/15 text-blue-300 shadow-md shadow-blue-900/10"
                      : "border-slate-700/60 bg-slate-800/40 text-slate-400 hover:text-slate-300 hover:border-slate-650"
                  }`}
                >
                  <Car className="h-5 w-5" />
                  <span className="font-bold">🚙 Pengemudi</span>
                </button>

                <button
                  type="button"
                  onClick={() => setRole("passenger")}
                  className={`py-3.5 px-4 rounded-xl border flex flex-col items-center justify-center gap-1.5 transition-all text-xs cursor-pointer ${
                    role === "passenger"
                      ? "border-blue-500 bg-blue-500/15 text-blue-300 shadow-md shadow-blue-900/10"
                      : "border-slate-700/60 bg-slate-800/40 text-slate-400 hover:text-slate-300 hover:border-slate-650"
                  }`}
                >
                  <Users className="h-5 w-5" />
                  <span className="font-bold">🧍 Penumpang</span>
                </button>
              </div>
              <p className="text-[10px] text-slate-400 mt-1 font-normal italic">
                * {role === "driver" ? "Akses slot parkir, reservasi instan, navigasi internal" : "Klaim titik jemput, kooordinasi penjemputan, cari mobil parkir"}
              </p>
            </div>
          )}

          <button
            type="submit"
            className="w-full mt-6 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white font-bold py-3.5 rounded-xl text-sm tracking-wider uppercase transition-colors cursor-pointer shadow-lg shadow-blue-900/20 flex items-center justify-center gap-2"
          >
            <span>{isLoginTab ? "Log Masuk Sekarang" : "Buat Akun Baru"}</span>
          </button>
        </form>

        {/* Demo instant trial block */}
        <div className="mt-8 pt-6 border-t border-slate-800/60 space-y-3.5">
          <div className="flex items-center justify-center gap-2 text-[10px] uppercase tracking-widest font-bold text-slate-500">
            <Shield className="h-3.5 w-3.5" />
            <span>JALAN PINTAS UJI COBA PLATFORM</span>
          </div>

          <div className="grid grid-cols-2 gap-3.5">
            <button
              onClick={() => loginAsDemo("driver")}
              className="py-2.5 px-3 rounded-lg bg-slate-850 border border-slate-700/50 text-slate-300 hover:bg-slate-800 hover:text-white hover:border-blue-600 text-xs font-bold transition-all flex items-center justify-center gap-1.5"
              type="button"
            >
              <Car className="h-3.5 w-3.5 text-blue-500" />
              <span>Dasbor Driver</span>
            </button>
            <button
              onClick={() => loginAsDemo("passenger")}
              className="py-2.5 px-3 rounded-lg bg-slate-850 border border-slate-700/50 text-slate-300 hover:bg-slate-800 hover:text-white hover:border-blue-600 text-xs font-bold transition-all flex items-center justify-center gap-1.5"
              type="button"
            >
              <Users className="h-3.5 w-3.5 text-indigo-500" />
              <span>Dasbor Penumpang</span>
            </button>
          </div>
          <div className="text-center">
            <span className="text-[10px] text-slate-500 font-normal block font-mono">
              Username demo: driver@parkease.com / penumpang@parkease.com (password: password123)
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
