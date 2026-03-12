import { useState, useEffect } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../services/firebase";
import { useRouter } from "next/router";
import { useAuth } from "../context/AuthContext";
import Link from "next/link";
import styles from "../styles/login.module.css";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();
  const { user, loading } = useAuth();

  useEffect(() => {
    if (!loading && user) {
      router.push("/dashboard");
    }
  }, [user, loading, router]);

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");

    try {
      await signInWithEmailAndPassword(auth, email, password);
      router.push("/dashboard");
    } catch (error) {

      if (error.code === "auth/invalid-credential"){
        setError("Email/Senha incorreta!");
      } else if(error.code === "auth/invalid-email"){
        setError("Email/Senha inválidos!");
      } else{
        alert(error.message);
      }

    }
  };

  return (
    <div className={styles.container}>
      <form className={styles.form} onSubmit={handleLogin}>
        <h2 className={styles.title}>Login</h2>

        {error && <p className={styles.error}>{error}</p>}

        <input
          className={styles.input}
          type="email"
          placeholder="Digite seu email"
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          className={styles.input}
          type="password"
          placeholder="Digite sua senha"
          onChange={(e) => setPassword(e.target.value)}
        />

        <button className={styles.button}>
          Entrar
        </button>

        <p className={styles.forgotPasswordText}>
          <Link href="/forgot-password">
            Esqueceu a senha?
          </Link>
        </p>

        <p className={styles.registerText}>
          Não tem uma conta?{" "}
          <Link href="/register">
            Cadastre-se
          </Link>
        </p>

      </form>
    </div>
  );
}
