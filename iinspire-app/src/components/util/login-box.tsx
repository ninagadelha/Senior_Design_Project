const handleLogin = async () => {
    try {
        const response = await fetch("http://backend-service.backend-namespace:5000/api/login", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                email: username,
                password: password,
            }),
        });

        console.log("Login API status:", response.status);
        console.log("Login API headers:", response.headers);

        const data = await response.json();
        console.log("Login API response JSON:", data);

        if (response.ok) {
            login(data.user);

            const normalizedRole = data.user.role.toLowerCase();

            switch (normalizedRole) {
                case "student":
                    router.push("/student-home");
                    break;
                case "programcoordinator":
                    router.push("/pc-home");
                    break;
                case "admin":
                    router.push("/admin-home");
                    break;
                default:
                    break;
            }

            alert("Logged in successfully");
        } else {
            console.warn("Login failed response:", data);
            alert(data.message || "Login failed");
        }
    } catch (error) {
        console.error("Error during login:", error);
        alert("An error occurred during login");
    }
};
