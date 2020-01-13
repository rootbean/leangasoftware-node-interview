
const fs = require('fs');
const path = require('path');

const PdfPrinter = require('pdfmake');

const { headersDataFilePDF } = require('./headers-data-file');

const { error } = console;

const fonts = {
  Roboto: {
    normal: path.join(__dirname, 'fonts/Roboto-Regular.ttf'),
    bold: path.join(__dirname, 'fonts/Roboto-Medium.ttf'),
    italics: path.join(__dirname, 'fonts/Roboto-Italic.ttf'),
    bolditalics: path.join(__dirname, 'fonts/Roboto-MediumItalic.ttf'),
  },
};

exports.writeFilePDF = async (data = []) => {
  try {
    const dataResult = [];
    const keyTitles = headersDataFilePDF.map((item) => item.title);
    dataResult.push(keyTitles);
    const newData = data.map((item) => [
      item.id,
      item.title,
      item.advertisers,
      item.phones || '',
      item.typeA || '',
      item.price,
      item.address,
      item.provice || '',
      item.city || '',
    ]);

    const newResult = dataResult.concat(newData);
    const docDefinition = {
      pageSize: 'A4',
      pageOrientation: 'landscape',
      content: [
        {
          layout: 'lightHorizontalLines', // optional
          table: {
            headerRows: 1,
            widths: ['*', 'auto', 'auto', 'auto', 'auto', 'auto', 'auto', 'auto', 'auto'],
            body: newResult,
          },
        },
      ],
    };

    const printer = new PdfPrinter(fonts);
    // Building the PDF
    const pdfDoc = printer.createPdfKitDocument(docDefinition);

    // Writing it to disk
    pdfDoc.pipe(fs.createWriteStream('./test-file/out.pdf'));
    pdfDoc.end();
    return 'ok';
  } catch (ex) {
    error(`error: ${ex}`);
    throw ex;
  }
};
