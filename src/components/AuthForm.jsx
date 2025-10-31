import React, { useState } from "react";
import { useNavigate } from "react-router";
import { useAuth } from "../backend/AuthContext";

const AuthForm = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();
  const Navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const url = isLogin
        ? "http://localhost:8080/api/login"
        : "http://localhost:8080/api/register";

      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(
          isLogin ? { email, password } : { name, email, password }
        ),
      });

      const data = await response.json();

      if (response.ok) {
        if (isLogin) {
          localStorage.setItem("token", data.token);
          login(data.token, data.user);
          alert("Login berhasil");
          Navigate("/dashboard");
        } else {
          if (password.length < 6) {
            alert("Password harus minimal 6 karakter");
            setLoading(false);
            return;
          }
          alert("Registrasi berhasil, silahkan login");
          setIsLogin(true);
          setName("");
          setEmail("");
          setPassword("");
        }
      } else {
        alert(data.error || (isLogin ? "Login gagal" : "Registrasi gagal"));
      }
    } catch (error) {
      console.error("Auth error: ", error);
      alert("Terjadi kesalahan pada server");
    } finally {
      setLoading(false);
    }

    //dummy Login untuk tester tanpa backend
    // try {
    //   if (isLogin) {
    //     // ✅ Simulasi login sukses
    //     const dummyUser = { id: 1, name: "Demo User", email };
    //     const dummyToken = "dummy-token-123";

    //     localStorage.setItem("token", dummyToken);
    //     login(dummyToken, dummyUser);

    //     alert("Login berhasil (dummy)");
    //     Navigate("/dashboard");
    //   } else {
    //     // ✅ Simulasi register sukses
    //     if (password.length < 6) {
    //       alert("Password harus minimal 6 karakter");
    //       setLoading(false);
    //       return;
    //     }

    //     alert("Registrasi berhasil, silahkan login");
    //     setIsLogin(true);
    //     setName("");
    //     setEmail("");
    //     setPassword("");
    //   }
    // } catch (error) {
    //   console.error("Auth error: ", error);
    //   alert("Terjadi kesalahan (dummy auth)");
    // } finally {
    //   setLoading(false);
    // }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bglogin">
      <div className="p-8 rounded shadow-md w-full max-w-md p-6 border border-4 border-amber-500 rounded-lg shadow bg-white/50">
        <h2 className="text-2xl font-bold mb-6 text-center text-black">
          {isLogin ? "Login ke Akun Anda" : "Buat Akun Baru"}
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          {!isLogin && (
            <div>
              <label className="block mb-1 font-medium">Nama Lengkap</label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full px-4 py-2 border rounded"
                placeholder="Masukan nama anda"
                required={!isLogin}
              />
            </div>
          )}
          <div>
            <label className="block mb-1 font-medium">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-2 border rounded"
              placeholder="admin@gmail.com"
              required
            />
          </div>
          <div>
            <label className="block mb-1 font-medium">Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-2 border rounded"
              placeholder="123456"
              required
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className={`w-full rounded-lg bg-gradient-to-r from-amber-400 to-yellow-600 
             text-black font-semibold shadow-lg py-2 hover:scale-105 hover:shadow-amber-500/50 
             transition-all duration-300 ease-in-out ${
               loading ? "opacity-50 cursor-not-allowed" : "hover:bg-blue-700"
             }`}
          >
            {loading ? "Loading..." : isLogin ? "Login" : "Register"}
          </button>
        </form>

        <p className="text-center text-sm mt-4 font-bold">
          {isLogin ? "Belum punya akun?" : "Sudah punya akun?"}{" "}
          <button
            className="text-amber-600 hover:underline"
            onClick={() => setIsLogin(!isLogin)}
          >
            {isLogin ? "Register di sini" : "Login di sini"}
          </button>
        </p>
      </div>
    </div>
  );
};

export default AuthForm;
