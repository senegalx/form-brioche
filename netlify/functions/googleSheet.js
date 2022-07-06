require("dotenv").config();
const {GoogleSpreadsheet} = require("google-spreadsheet");

const {GOOGLE_SERVICE_ACCOUNT_EMAIL, GOOGLE_PRIVATE_KEY, GOOGLE_SHEET} = process.env;

const addTosheet = async(data) => {
  const {prenom, nom, email, telephone, societe} = data.data;
  const horodateur = data.created_at;
  
  const doc = new GoogleSpreadsheet(GOOGLE_SHEET);

  await doc.useServiceAccountAuth({
    client_email: GOOGLE_SERVICE_ACCOUNT_EMAIL,
    private_key: JSON.parse(GOOGLE_PRIVATE_KEY),
  });

  await doc.loadInfo(); // loads document properties and worksheets

  const sheet = doc.sheetsByIndex[0]; // or use doc.sheetsById[id] or doc.sheetsByTitle[title]

  const moreRows = await sheet.addRows([
    { horodateur, prenom, nom, email, telephone, societe }
  ]);
  return new Promise((resolve) => {

    resolve("Ajouter");

  });
};

module.exports = addTosheet;
