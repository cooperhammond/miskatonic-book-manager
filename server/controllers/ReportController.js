const excel = require('excel4node');
const path = require('path');

const Student = require('../models/StudentModel');
const Book = require('../models/BookModel');
const Code = require('../models/CodeModel');

exports.genReport = async function (req, res) {

  // Create a new instance of a Workbook class
  var workbook = new excel.Workbook();

  // Add Worksheets to the workbook
  var studentSheet = workbook.addWorksheet('Students');
  var bookSheet = workbook.addWorksheet('Books');
  var codeSheet = workbook.addWorksheet('Codes');

  var headerStyle = workbook.createStyle({
    font: {
      color: '#000000',
      bold: true,
      size: 12
    },
    numberFormat: '0'
  });
  var dataStyle = workbook.createStyle({
    font: {
      color: '#000000',
      size: 12
    },
    numberFormat: '0'
  });

  // STUDENT SHEET //
  var students = sortData(await Student.find({}), "lastName");

  studentSheet.cell(1, 1).string("Last Name").style(headerStyle);
  studentSheet.cell(1, 2).string("First Name").style(headerStyle);
  studentSheet.cell(1, 3).string("Email").style(headerStyle);
  studentSheet.cell(1, 4).string("Grade").style(headerStyle);
  studentSheet.cell(1, 5).string("Codes").style(headerStyle);

  var row = 2;
  for (let index = 0; index < students.length; index++) {
    var student = students[index];
    
    studentSheet.cell(row, 1).string(student.lastName).style(dataStyle);
    studentSheet.cell(row, 2).string(student.firstName).style(dataStyle);
    studentSheet.cell(row, 3).string(student.email).style(dataStyle);
    studentSheet.cell(row, 4).number(student.grade).style(dataStyle);
    studentSheet.cell(row, 5).number(student.codes.length).style(dataStyle);

    row += 1;
  }

  // BOOK SHEET //
  var books = sortData(await Book.find({}), "title");

  bookSheet.cell(1, 1).string("Title").style(headerStyle);
  bookSheet.cell(1, 2).string("Author").style(headerStyle);
  bookSheet.cell(1, 3).string("Codes").style(headerStyle);
  bookSheet.cell(1, 4).string("Readers").style(headerStyle);

  var row = 2;
  for (let index = 0; index < books.length; index++) {
    var book = books[index];
    
    bookSheet.cell(row, 1).string(book.title).style(dataStyle);
    bookSheet.cell(row, 2).string(book.author).style(dataStyle);
    bookSheet.cell(row, 3).number(book.codes.length).style(dataStyle);
    bookSheet.cell(row, 4).number(book.readers).style(dataStyle);

    row += 1;
  }

  // CODE SHEET //
  var codes = sortData(await Code.find({}), async (c) => {
    var book = await Book.findOne({ _id: c.book });
    if (book) { return book.title; }
  });

  codeSheet.cell(1, 1).string("Book").style(headerStyle);
  codeSheet.cell(1, 2).string("Code").style(headerStyle);
  codeSheet.cell(1, 3).string("Student").style(headerStyle);

  var row = 2;
  for (let index = 0; index < codes.length; index++) {
    var code = codes[index];

    var book = await Book.findOne({ _id: code.book });
    var student = await Student.findOne({ _id: code.student });
    
    codeSheet.cell(row, 1).string(book.title).style(dataStyle);
    codeSheet.cell(row, 2).string(code.code).style(dataStyle);
    codeSheet.cell(row, 3)
      .string(student ? `${student.lastName}, ${student.firstName}` : "None")
      .style(dataStyle);

    row += 1;
  }

  workbook.write('Report.xlsx', (err, stats) => {
    if (err) { return res.status(500).err(err) }

    res.setHeader('Content-disposition', `attachment;filename=data.xls`);
    res.setHeader('Content-type', 'application/vnd.ms-excel');
    res.status(200).download(path.join(__dirname, "../Report.xlsx"));
  });
}

function sortData(data, key) {
  return [].slice.call(data).sort(function(a, b) {
    if (typeof key === "function") {
      return funcSort(key, a, b);
    } else {
      return keySort(key, a, b);
    }
  });
}

function keySort(key, a, b) {
  if (a[key] < b[key]) { return -1; }
  if (a[key] > b[key]) { return 1; }
  return 0;
}

function funcSort(func, a, b) {
  if (func(a) < func(b)) { return -1; }
  if (func(a) > func(b)) {return 1; }
  return 0;
}
