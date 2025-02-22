const getUsernameFromJWT = () => {
    const token = localStorage.getItem("token");
    if (!token) return null;

    try {
        const payload = JSON.parse(atob(token.split(".")[1]));
        return payload.username;
    } catch (error) {
        console.error("Error decoding JWT:", error);
        return null;
    }
};

export default getUsernameFromJWT;
