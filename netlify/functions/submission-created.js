require("dotenv").config();
const addTosheet = require("./googleSheet");

const { BASE_URL } = process.env;

exports.handler = async(event, context, callback) => {
  const data = JSON.parse(event.body).payload;
  await addTosheet(data).then(
    (result) => {
      callback(null, {
        statusCode: 302,
        headers: {
          "Location": `${BASE_URL}/formulaire-ok`
        },
      });});
};