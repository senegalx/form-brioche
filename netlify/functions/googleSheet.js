require("dotenv").config();
const {GoogleSpreadsheet} = require("google-spreadsheet");

const {GOOGLE_SERVICE_ACCOUNT_EMAIL, GOOGLE_PRIVATE_KEY, GOOGLE_SHEET} = process.env;

const formatDateTime = (timestamp) => {
  const date = new Date(timestamp);
  const formattedDate = date.toLocaleString("fr-FR", {
    timeZone: "Europe/Paris",
    dateStyle: "full",
    timeStyle: "long"
  });
  return formattedDate;
};

const addTosheet = async(data) => {
  const {prenom, nom, email, telephone, societe} = data.data;
  const horodateur = formatDateTime(data.created_at);
  
  const doc = new GoogleSpreadsheet(GOOGLE_SHEET);

  await doc.useServiceAccountAuth({
    client_email: GOOGLE_SERVICE_ACCOUNT_EMAIL,
    private_key: JSON.parse(GOOGLE_PRIVATE_KEY),
  });

  await doc.loadInfo(); // loads document properties and worksheets

  const sheet = doc.sheetsByIndex[0]; // or use doc.sheetsById[id] or doc.sheetsByTitle[title]

  const moreRows = await sheet.addRows([
    { horodateur, prenom, nom, telephone, email }
  ]);
  return new Promise((resolve) => {

    resolve("Ajouter");

  });
};

module.exports = addTosheet;
