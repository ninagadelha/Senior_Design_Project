"use client";
import React, { useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import colors from '../../../public/colors'
import Link from 'next/link';

const LoginBox = () => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);

    // Check if both fields are filled
    const isFormValid = username.trim() !== "" && password.trim() !== "";

    return (
        <div className="shadow-lg rounded-lg p-6 w-80 z-10" style={{ backgroundColor: colors.login_box }}>
            <h2 className="text-xl font-semibold mb-4 text-center" style={{ color: colors.black_text }}>
                Login
            </h2>

            {/* Username Input */}
            <input
                className="border rounded p-2 w-full mb-3 text-black placeholder-gray-500"
                type="text"
                placeholder="Username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
            />

            {/* Password Input with Toggle */}
            <div className="relative">
                <input
                    className="border rounded p-2 w-full pr-10 text-black placeholder-gray-500"
                    type={showPassword ? "text" : "password"}
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
                <button
                    type="button"
                    className="absolute inset-y-0 right-3 flex items-center text-gray-500 hover:text-gray-700"
                    onClick={() => setShowPassword(!showPassword)}
                >
                    {showPassword ? <FaEye /> : <FaEyeSlash />}
                </button>
            </div>

            {/* Login Button (Disabled if Inputs are Empty) */}
            <button
                className={`py-2 rounded mt-4 w-full transition ${
                    isFormValid
                        ? "text-white hover:bg-blue-600"
                        : "bg-gray-400 text-gray-700 cursor-not-allowed"
                }`}
                style={{
                    backgroundColor: isFormValid ? colors.navbar : undefined
                }}
                disabled={!isFormValid}
            >
                Login
            </button>

            {/* Link for Create Account */}
            <div className="text-sm text-left mt-3">
                <Link
                    href="/create-account"
                    className="text-blue-500 hover:underline"
                >
                    Create an account
                </Link>
            </div>
        </div>
    );
};

export default LoginBox;
