export const fetchBookDetails = async (bookId) => {
  try {
    const response = await fetch(
      `https://booko-com.onrender.com/books/${bookId}`
    );
    const jsonRes = await response.json();
    return jsonRes;
  } catch (error) {
    console.error("Error fetching book details:", error);
  }
};
