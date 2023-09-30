/* Program ini digunakan untuk split 1 file menjadi banyak file
 * -> return dari program ini akan menghasil kan folder 'result'
 *    isi dari folder 'result' adalah hasil dari split beberapa file,
 *    tergantung jumlah yang anda inputkan didalam split file.
 */

const fs = require("fs");
const path = require("path");

const red = "\x1b[31m";
const yellow = "\x1b[33m";
const green = "\x1b[32m";
const cyan = "\x1b[36m";
const white = "\x1b[37m";

const args = process.argv;

if (args.length !== 4) {
  console.log(`\n ${cyan}[${white}+${cyan}] Cara penggunaan${white}: node spliter.js {jumlah_hasil_file} {nama_file}`);
  console.log(`          ${cyan}Contoh    ${white}: node spliter.js 5 data.txt`);
  process.exit(1);
}

const split = parseInt(args[2]);

if (isNaN(split) || split < 2) {
  console.log(`\n ${yellow}[${white}!${yellow}] INFO${white}: Harap masukkan jumlah hasil file yang valid (minimal 2)! >:(`);
  console.log(`\n ${cyan}[${white}+${cyan}] Cara penggunaan${white}: node spliter.js {jumlah_hasil_file} {nama_file}`);
  console.log(`          ${cyan}Contoh    ${white}: node spliter.js 5 data.txt`);
  process.exit(1);
}

const inputFileName = args[3];
const folderName = "result";

try {
  if (!fs.existsSync(folderName)) {
    fs.mkdirSync(folderName);
    console.log(`\n ${green}[${white}+${green}] SUKSES${white}: Folder 'result' berhasil dibuat.`);
  }
} catch (err) {
  console.error(err);
  console.log(`\n ${red}[${white}!${red}] ERROR${white}: Tidak dapat membuat folder 'result', silahkan buat manual!`);
  console.log(`\n ${cyan}[${white}+${cyan}] Cara penggunaan${white}: node spliter.js {jumlah_hasil_file} {nama_file}`);
  console.log(`          ${cyan}Contoh    ${white}: node spliter.js 5 data.txt`);
  process.exit(1);
}

try {
  const fileContent = fs.readFileSync(inputFileName, "utf-8");
  const lines = fileContent.split(/\r?\n/);
  const totalLines = lines.length;

  if (totalLines === 0) {
    console.log(`\n ${yellow}[${white}!${yellow}] INFO${white}: File '${inputFileName}' kosong. Tidak ada yang bisa di-split.`);
    process.exit(1);
  }

  const chunkSize = Math.ceil(totalLines / split);

  for (let i = 0; i < split; i++) {
    const start = i * chunkSize;
    const end = (i + 1) * chunkSize;
    const outputFile = path.join(folderName, `${path.basename(inputFileName, path.extname(inputFileName))}_${i + 1}${path.extname(inputFileName)}`);
    const chunk = lines.slice(start, end).join("\n");

    fs.writeFileSync(outputFile, chunk);
    console.log(`\n ${green}[${white}+${green}] SUKSES${white}: File '${outputFile}' berhasil dibuat.`);
  }

  console.log(`\n ${green}[${white}+${green}] SUKSES${white}: File '${inputFileName}' berhasil displit menjadi '${split}' file!`);
} catch (err) {
  console.log(`\n ${red}[${white}!${red}] ERROR${white}: ${err.message}`);
  process.exit(1);
}
