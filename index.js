const { extractSheets } = require("spreadsheet-to-json");
const fs = require('fs');
const {mkdirp} = require('mkdirp');

/* ENV */
const sheet = process.env.sheet;
const spreadsheetKey = process.env.spreadsheetKey;
const rootPath = process.env.path;

const formatCell = (sheetTitle, columnTitle, value) => {
  return sheetTitle;
};

const renderObjLang = (arr, lang) => {
  const obj = {};
  const arrSort = arr?.sort();
  for(let i = 0; i< arrSort?.length; i++) {
    const key = arrSort[i]?.code;
    const value = arrSort[i]?.[lang] ?? key;
    obj[key] = value;
  }
  return obj;
}

const renderJsonToFile = async (dataSheets) => {
  const objLangs = {...(dataSheets?.[0] || {})};
  delete objLangs.code;

  const outputLangs = Object.keys(objLangs);
  console.log("\x1b[2m", "\x1b[32m", "\x1b[44m",`++++++++++++ Localize ${sheet} ++++++++++++`, "\x1b[0m");
  
  for(let i = 0; i< outputLangs?.length; i++) {
    const keyLang = outputLangs[i];
    const objLang = renderObjLang(dataSheets, keyLang);
    console.log(`Creating files ${keyLang}.json`);
    await mkdirp(rootPath);

    fs.writeFileSync(rootPath + `${keyLang}.json`, JSON.stringify(objLang), function(err) {
      if (err) throw err;
      }); 
  }
}

extractSheets(
  {
    spreadsheetKey: spreadsheetKey,
    credentials: require("./google-generated-creds.json"),
    formatCell: formatCell
  },
  function(err, data) {
    if(err) return;
    const dataSheet = data?.[sheet];
    renderJsonToFile(dataSheet);
  }
);