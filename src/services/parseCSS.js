const { toCSS, toJSON } = require("cssjson");
const camelCase = require("camelcase");
const classes = ["description","name","links", "background"];

function parseCSS(css) {
  var json = toJSON(css);
  json = json.children;
  // return json
  let keys = Object.keys(json);
  let data = {};

  for (let key of keys) {
    console.log(key);
    let e = json[key]["attributes"];
    let attributes = Object.keys(e);
    let newAttributes = {};
    for (let attribute of attributes) {
      newAttributes[camelCase(attribute)] = e[attribute];
    }
    if (classes.includes(key.split(".")[1]))
      data[key.split(".")[1]] = newAttributes;
  }
  return data;
}

module.exports = parseCSS;

