"use client";

import React, { useState } from "react";
import Link from "next/link";

//import colors from "../../../public/colors";

const CreateAccount = () => {
    const [formData, setFormData] = useState({
        fullname: "",
        email: "",
        netid: "",
        stem_interests: "",
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        try {
            const response = await fetch("/api/user/create", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(formData),
            });
            const data = await response.json();
            if (response.ok) {
                alert("Account created successfully!");
                // Optionally redirect or clear form
            } else {
                alert(data.message || "Failed to create account.");
            }
        } catch (error) {
            console.error("Create account error:", error);
            alert("Something went wrong.");
        }
    };

    return (
        <div className="max-w-md mx-auto p-4">
            <h2 className="text-xl font-bold mb-4">Create Account</h2>
            <form onSubmit={handleSubmit} className="space-y-2">
                {Object.keys(formData).map(key => (
                    <input
                        key={key}
                        name={key}
                        value={(formData as any)[key]}
                        onChange={handleChange}
                        placeholder={key}
                        className="w-full p-2 border rounded"
                        required
                    />
                ))}
                <button type="submit" className="w-full bg-blue-500 text-white p-2 rounded">
                    Create Account
                </button>
            </form>

            <div className="text-center mt-4">
                <Link href="/" className="text-blue-500 hover:underline text-sm">
                    ← Back to Login
                </Link>
            </div>
        </div>
    );
};
export default CreateAccount;
