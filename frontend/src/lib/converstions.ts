export const convertToFormData = (data: any) => {
  const formData = new FormData();

  // Append key-value pairs for each field in the data object
  for (const key in data) {
    if (data.hasOwnProperty(key)) {
      // If the value is a file (e.g., images), append it directly
      if (key === "images") {
        Array.from(data[key]).forEach((value: any) => {
          formData.append("images", value);
        });
      } else if (data[key] instanceof File) {
        formData.append(key, data[key]);
      } else {
        formData.append(key, data[key]);
      }
    }
  }

  return formData;
};
