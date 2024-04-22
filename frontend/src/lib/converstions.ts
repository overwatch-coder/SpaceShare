export const convertToFormData = (data: any) => {
  const formData = new FormData();

  // Append key-value pairs for each field in the data object
  for (const key in data) {
    if (data.hasOwnProperty(key)) {
      // If the value is a file (e.g., images), append it directly
      if (data[key] instanceof File) {
        console.log({ key, value: data[key] });
        formData.append(key, data[key]);
      } else {
        formData.append(key, data[key]);
      }
    }
  }

  return formData;
};
