// Start Page: load_input.js
sessionStorage.setItem("userInput", JSON.stringify(EG_MOORE_1));
// Function Page: backend.js
var USER_INPUT =
  Object.assign({}, JSON.parse(sessionStorage.getItem("userInput")));

