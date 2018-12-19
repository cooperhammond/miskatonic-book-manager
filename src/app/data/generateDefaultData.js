var flatten = require('flat');
var unflatten = require('flat').unflatten;
var fs = require('fs');

books = JSON.parse(fs.readFileSync('./src/common/data/default/books_.json', 'utf8'));
codes = JSON.parse(fs.readFileSync('./src/common/data/default/codes_.json', 'utf8'));
students = JSON.parse(fs.readFileSync('./src/common/data/default/students_.json', 'utf8'));

console.log(flatten(books));
console.log(flatten(codes));
console.log(flatten(students));

fs.writeFile("./src/common/data/books.json", JSON.stringify(flatten(books)), (err) => {
    if (err) {
        console.error(err);
        return;
    };
    console.log("File has been created");
});

fs.writeFile("./src/common/data/codes.json", JSON.stringify(flatten(codes)), (err) => {
    if (err) {
        console.error(err);
        return;
    };
    console.log("File has been created");
});

fs.writeFile("./src/common/data/students.json", JSON.stringify(flatten(students)), (err) => {
    if (err) {
        console.error(err);
        return;
    };
    console.log("File has been created");
});
