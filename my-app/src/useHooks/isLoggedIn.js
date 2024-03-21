export async function isLoggedIn(useMyContext) {
  try {
    const response = await fetch("https://booko-com.onrender.com/users/Auth", {
      method: "GET",
      credentials: "include",
    });

    if (response.status === 200) {
      const data = response.json();
      console.log(data);
      return data.isAuthenticated;
    } else if (response.status === 401) {
      useMyContext.setAuthSate(false);
      console.log(response);
      return false;
    } else {
      return false;
    }
  } catch (error) {
    console.error("Error:", error);
    return false;
  }
}
