export const logout = async () => {
  try {
    const response = await fetch(
      "https://booko-com.onrender.com/users/logout",
      {
        method: "POST",
      }
    );

    if (response.status === 200) {
      console.log("Logout successful");
    } else {
      console.error("Logout failed");
    }
  } catch (error) {
    console.error("Logout failed", error);
  }
};
