"use client";
import { useState } from "react";
import { Link } from "@chakra-ui/react";
import { useRouter } from "next/navigation";
import { API_ENDPOINTS } from "@/constants/config";
import "../../../public/styles/createAccount.css";


const CreateAccountBox = () => {
  const [email, setEmail] = useState("");
  const [institution, setInstitution] = useState("");
  const [code, setCode] = useState("");
  const [fullname, setFullname] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [password, setPassword] = useState("");

  const router = useRouter();

  const handleCreateAccount = async () => {
    try {
      const response = await fetch(API_ENDPOINTS.createAccount, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email,
          institution,
          code,
          fullname,
          password,
        }),
      });

      const data = await response.json();
      if (response.ok) {
        setSuccessMessage("Account created successfully!");
        setTimeout(() => router.push("/"), 2000);
      } else {
        setSuccessMessage("Error: " + data.message);
      }
    } catch (err) {
      setSuccessMessage("An error occurred while creating the account.");
    }
  };

  return (
    <div className="create-account-container">
      <div className="create-account-box">
        <h2 className="title">Create Account</h2>

        <input className="input" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
        <input className="input" placeholder="Code" value={code} onChange={(e) => setCode(e.target.value)} />
        <input
            className="input"
            placeholder="Full Name"
            value={fullname}
            onChange={(e) => setFullname(e.target.value)}
        />
        <input
            className="input"
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
        />


        <button className="submit-button" onClick={handleCreateAccount}>
          Create Account
        </button>

        {successMessage && (
          <p className={`status-message ${successMessage.includes("successfully") ? "success" : "error"}`}>
            {successMessage}
          </p>
        )}

        <p className="footer">
          Already have an account? <Link href="/" className="login-link">Login here</Link>
        </p>
      </div>
    </div>
  );
};

export default CreateAccountBox;