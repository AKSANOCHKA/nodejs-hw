// const message = 'Hello world';

// console.log(message);
//////
// import path from 'node:path';

// const somePath = path.join('some_folder', 'some_file.txt');
// console.log(somePath);
// на Windows → 'some_folder\\\\some_file.txt'
//////

// абсолютний шлях до робочої директорії
// const pathToWorkDir = path.join(process.cwd());

// додаємо нові частини до шляху
// const pathToFile = path.join(pathToWorkDir, 'some_folder', 'some_file.txt');
// console.log(pathToFile);
// C:\\\\коренева_папка\\\\some_folder\\\\some_file.txt

// import path from 'node:path';

// Windows
// console.log(path.parse('C:\\\\path\\\\dir\\\\file.txt'));
/*
{
  root: 'C:\\\\',
  dir: 'C:\\\\path\\\\dir',
  base: 'file.txt',
  ext: '.txt',
  name: 'file'
}
*/
// import fs from 'node:fs';

// приклад без кодування
// const buffer = fs.readFileSync('./src/file.txt');
// console.log(buffer); // <Buffer 48 65 6c 6c 6f ...>

// приклад із кодуванням
// const data = fs.readFileSync('./src/file.txt', 'utf8');
// console.log('Вміст файлу:', data); // "Hello"
// import fs from 'node:fs';

// import fs from 'node:fs/promises';

// без кодування
// const buffer = await fs.readFile('./src/file.txt');
// console.log(buffer); // <Buffer ... >

// з кодуванням
// const data = await fs.readFile('./src/file.txt', 'utf8');
// console.log('Вміст файлу:', data); // "Hello"
// import fs from 'node:fs';

// fs.writeFileSync('output.txt', 'Привіт з Node.js!', 'utf8');
// import fs from 'node:fs/promises';

// await fs.writeFile('output.txt', 'Привіт з Node.js!', 'utf8');
// console.log('Дані успішно записані у файл.');
// import fs from 'node:fs/promises';

// await fs.appendFile('output.txt', '\\nЩе один рядок', 'utf8');
// console.log('Дані успішно додані у файл.');
// import fs from 'node:fs/promises';

// await fs.rename('oldfile.txt', 'newfile.txt');
// console.log('Файл успішно перейменовано.');

// import fs from 'node:fs/promises';

// await fs.unlink('output.txt');
// console.log('Файл успішно видалено.');
import fs from 'node:fs/promises';

const buffer1 = await fs.readFile('./src/hello.txt');
// якщо у файлі hello.txt був текст "Hello World!"

console.log(buffer1);
// <Buffer 48 65 6c 6c 6f 20 57 6f 72 6c 64 21>
const buffer = await fs.readFile('./src/hello.txt');
console.log(buffer.toString('utf-8')); // Hello World!
