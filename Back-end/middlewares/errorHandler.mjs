export const saveuserErrorHandler = (error) => {
  console.error("Error in saveuserErrorHandler:", error);

  let errors = { email: "", password: "" };

  if (error.code === 11000) {
    errors.email = "That email is already registered";
    return errors;
  }

  if (error.name === "ValidationError") {
    Object.values(error.errors).forEach(({ properties }) => {
      errors[properties.path] = properties.message;
    });
    return errors;
  }

  return {
    message:
      "Oops! Something went wrong. Please try again later or contact support.",
  };
};

export const postfaverrorhandler = (error, res) => {
  console.error("Error in postfaverrorhandler:", error);

  if (error.code === 11000) {
    return {
      status: "failed",
      message: "The book has already been saved.",
    };
  } else {
    return {
      status: "error",
      message:
        "Oops! Something went wrong. Please try again later or contact support.",
    };
  }
};

export const postbookerrorhandler = (error) => {
  console.error("Error in postbookerrorhandler:", error);

  if (error.code === 11000) {
    return {
      status: "error",
      message: "the book is already saved",
    };
  } else {
    return {
      status: "error",
      message:
        "Oops! Something went wrong. Please try again later or contact support.",
    };
  }
};
