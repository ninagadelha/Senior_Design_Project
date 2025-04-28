"use client";
import { useState } from "react";
import { Link } from "@chakra-ui/react";
import { useRouter } from "next/navigation";
import { API_ENDPOINTS } from "@/constants/config";
import "../../../public/styles/createAccount.css";


const CreateAccountBox = () => {
  const [email, setEmail] = useState("");
  const [netid, setNetid] = useState("");
  const [age, setAge] = useState("");
  const [gender, setGender] = useState("");
  const [ethnicity, setEthnicity] = useState("");
  const [credits, setCredits] = useState("");
  const [stemInterests, setStemInterests] = useState("");
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
          netid,
          age,
          gender,
          ethnicity,
          credits,
          stem_interests: stemInterests,
          institution,
          code,
          fullname,
          password,
        }),
      });

      const data = await response.json();
      //console.log("Create Account Data:", response.status);
      if (response.ok) {
        setSuccessMessage("Account created successfully!");
        setTimeout(() => router.push("/"), 2000);
      } else {
        setSuccessMessage("Error: " + data.message);
      }
    } catch (err) {
        //console.error(err);
      setSuccessMessage("An error occurred while creating the account.");
    }
  };

  return (
    <div className="create-account-container">
      <div className="create-account-box">
        <h2 className="title">Create Account</h2>

        <input className="input" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
        <input className="input" placeholder="NetID" value={netid} onChange={(e) => setNetid(e.target.value)} />
        <input className="input" placeholder="Age" type="number" value={age} onChange={(e) => setAge(e.target.value)} />

        <select className="input" value={gender} onChange={(e) => setGender(e.target.value)}>
          <option value="">Select Gender</option>
          <option value="Woman">Woman</option>
          <option value="Man">Man</option>
          <option value="Transgender">Transgender</option>
          <option value="Non-binary/non-conforming">Non-binary/non-conforming</option>
          <option value="Prefer not to respond">Prefer not to respond</option>
        </select>

        <select className="input" value={ethnicity} onChange={(e) => setEthnicity(e.target.value)}>
          <option value="">Select Race/Ethnicity</option>
          <option value="Black or African American">Black or African American</option>
          <option value="White">White</option>
          <option value="Hispanic/Latino(a)">Hispanic/Latino(a)</option>
          <option value="Asian">Asian</option>
          <option value="American Indian/Alaska Native">American Indian/Alaska Native</option>
          <option value="Native Hawaiian/Other Pacific Islander">Native Hawaiian/Other Pacific Islander</option>
          <option value="Two or more">Two or more</option>
          <option value="Prefer not to respond">Prefer not to respond</option>
        </select>

        <input className="input" placeholder="Credits" value={credits} onChange={(e) => setCredits(e.target.value)} />
        <input className="input" placeholder="STEM Interests" value={stemInterests} onChange={(e) => setStemInterests(e.target.value)} />
        <input className="input" placeholder="Institution" value={institution} onChange={(e) => setInstitution(e.target.value)} />
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