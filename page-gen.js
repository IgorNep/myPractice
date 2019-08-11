// include node fs module
const fs = require('fs');
const pageName = process.argv.slice(-1)[0];
const entries = require('./config/entries.json');

function checkValid(str){
  const re = /^\S+$/g
  return re.test(str)
}

if (!checkValid(pageName)) {
  throw Error('Validation error: page name should contains only single word in lower case for example my_cool_page')
}

const htmlTemplate = `
  <!DOCTYPE html>
  <html lang="en">
  <head>
    <meta charset="UTF-8">
    <meta name="viewport"
          content="width=device-width, user-scalable=no, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <script src="http://localhost:35729/livereload.js"></script>
    <title key='title'></title>
  </head>
  <body>
    <h1>Hello from ${pageName}</h1>
  </body>
  </html>

`;

const jsTemplate = `import './${pageName}.css';`;

const dir = `${__dirname}/src/${pageName}`;

if (!fs.existsSync(dir)){
  fs.mkdirSync(dir);
}

const pathToFile = `${__dirname}/src/${pageName}/${pageName}`;

fs.writeFile(`${pathToFile}.html`, htmlTemplate, function (err) {
  if (err) throw err;
  console.log('HTML file is created successfully.');
});

fs.writeFile(`${pathToFile}.css`, '', function (err) {
  if (err) throw err;
  console.log('CSS file is created successfully.');
});

fs.writeFile(`${pathToFile}.js`, jsTemplate, function (err) {
  if (err) throw err;
  console.log('JS file is created successfully.');
});

entries[pageName] = [`./src/${pageName}/${pageName}.js`];

fs.writeFile(`./config/entries.json`, `${JSON.stringify(entries, null, 2)}`, function (err) {
  if (err) throw err;
  console.log('Entries updated file is created successfully.' + '<br/>' + JSON.stringify(entries, null, 2));
});
