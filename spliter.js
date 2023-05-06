/* Program ini digunakan untuk split 1 file menjadi banyak file
 * -> return dari program ini akan menghasil kan folder 'result'
 *    isi dari folder 'result' adalah hasil dari split beberapa file,
 *    tergantung jumlah yang anda inputkan didalam split file.
 */

const fs = require("fs");
const folderName = 'result';
const args = process.argv;

const red    = "\x1b[31m";
const yellow = "\x1b[33m";
const green  = "\x1b[32m";
const cyan   = "\x1b[36m";
const white  = "\x1b[37m";

if(args.length <= 3){
	console.log(`\n ${cyan}[${white}+${cyan}] Cara penggunaan${white}:${white} node spliter.js {jumlah_hasil_file} {nama_file}`);
	console.log(`          ${cyan}Contoh    ${white}: node spliter.js 5 data.txt`);
	process.exit();
}
let split = args[2];
if(split < 2){
	console.log(`\n ${yellow}[${white}!${yellow}] INFO${white}: minimal hasil file yang ingin di split berjumlah 2`);
	console.log(`\n ${cyan}[${white}+${cyan}] Cara penggunaan${white}: node spliter.js {jumlah_hasil_file} {nama_file}`);
	console.log(`          ${cyan}Contoh    ${white}: node spliter.js 5 data.txt`);
	process.exit();
}
const filename   = args[3].split(".");

try {
	if (!fs.existsSync(folderName)) {
		fs.mkdirSync(folderName);
	}
} catch (err) {
	console.error(err);
	console.log(`\n ${red}[${white}!${red}] ERROR${white}: tidak dapat membuat folder 'result', silahkan buat secara manual!`);
	console.log(`\n ${cyan}[${white}+${cyan}] Cara penggunaan${white}: node spliter.js {jumlah_hasil_file} {nama_file}`);
	console.log(`          ${cyan}Contoh    ${white}: node spliter.js 5 data.txt`);
	process.exit();
}

try{
	const contents = fs.readFileSync(`${filename[0]}.${filename[1]}`, "utf-8");
	const array    = contents.split(/\r?\n/);
	const lines    = array.length;
	if(lines % split == 0){
		let formula  = lines / split;
		for(let i=1; i<=split; i++){
			for(let j=formula*(i-1); j<(formula*i); j++){
				fs.appendFile(`result/${filename[0]}_${i}.${filename[1]}`, `${array[j]}\n`, function (err) {
					if(err) throw err;
				});
			}
		}
	} else{
		let temp    = lines % split;
		let formula = (lines-temp) / split;
		for(let i=1; i<=split; i++){
			for(let j=formula*(i-1); j<(formula*i); j++){
				fs.appendFile(`result/${filename[0]}_${i}.${filename[1]}`, `${array[j]}\n`, function (err) {
					if(err) throw err;
				});
			}
		}
		let i = Number(split) + Number(1);
		for(j=formula*(i-1); j<formula*(i-1)+temp; j++){
			fs.appendFile(`result/${filename[0]}.sisa.${filename[1]}`, `${array[j]}\n`, function (err) {
				if(err) throw err;
			});
		}
	}
	console.log(`\n ${green}[${white}+${green}] SUKSES${white}: file '${filename[0]}.${filename[1]}' berhasil displit menjadi '${split}' file!`);
} catch(err){
	console.log(`\n ${red}[${white}!${red}] ERROR${white}: file '${filename[0]}.${filename[1]}' tidak ditemukan!! >:(`);
	console.log(`\n ${cyan}[${white}+${cyan}] Cara penggunaan${white}: node spliter.js {jumlah_hasil_file} {nama_file}`);
	console.log(`          ${cyan}Contoh    ${white}: node spliter.js 5 data.txt`);
	process.exit();
}
