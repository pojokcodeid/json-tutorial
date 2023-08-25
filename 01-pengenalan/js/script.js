let contoh = '{"nama":"Pojok Code","umur":20,"alamat":"Jakarta"}';
console.log(typeof contoh);
contoh = JSON.parse(contoh);
console.log(typeof contoh);
console.log(contoh);
contoh = JSON.stringify(contoh);
console.log(typeof contoh);
console.log(contoh);
