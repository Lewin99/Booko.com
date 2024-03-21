export const fetchBookDetails = async (bookId) => {
  try {
    const response = await fetch(`/books/${bookId}`);
    const jsonRes = await response.json();
    return jsonRes;
  } catch (error) {
    console.error("Error fetching book details:", error);
  }
};
