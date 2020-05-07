const fs = require('fs');
const path = require('path');

let i = 0;

const writeLog = async (logDirectory, dirname, fileName, journalName, data, callback) => {
  const filePath = path.format({
    dir: dirname,
    base: fileName,
  });
  const lines = [];
  const date = new Date();

  const prefix = `${i += 1}) [${date} ${journalName} ]`;
  let str = `${prefix} Запись №: ${Date.now()} Файл: ${filePath} Данные: ${data}`;
  str = str.replace(['\r', '\n'], '', str.trim());
  lines.push(`${str}\n`);
  const finalString = lines.join('');
  console.log('finalString: ', finalString);

  await fs.appendFile('./src/log/serverError.log', finalString, 'utf8', (error) => {
    if (error) throw error;
    console.log('Асинхронная запись файла завершена.');
  });
};

module.exports = {
  writeLog,
};
