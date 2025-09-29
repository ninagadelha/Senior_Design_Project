import { signIn } from "next-auth/react";
import { useState } from "react";

const SignIn = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        await signIn("credentials", { email, password });
    };

    return (
        <div className="max-w-md mx-auto p-4">
            <h2 className="text-xl font-bold mb-4">Sign In</h2>
            <form onSubmit={handleSubmit} className="space-y-2">
                <input
                    type="email"
                    name="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Email"
                    className="w-full p-2 border rounded"
                    required
                />
                <input
                    type="password"
                    name="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Password"
                    className="w-full p-2 border rounded"
                    required
                />
                <button type="submit" className="w-full bg-blue-500 text-white p-2 rounded">
                    Sign In
                </button>
            </form>
            <div className="mt-4">
                <button
                    onClick={() => signIn("microsoft")}
                    className="w-full bg-blue-600 text-white p-2 rounded"
                >
                    Sign in with Microsoft
                </button>
            </div>
        </div>
    );
};

export default SignIn;
