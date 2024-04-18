export const slugifyOptions = {
  lower: true, // convert to lower case
  trim: true, // remove whitespace
  replacement: "-", // replace spaces with dashes
  remove: /[*+~.()'"!:@]/g, // remove special characters
};
