// Nama lembar kerja yang akan digunakan
var sheetName = "Sheet1";

// Mendapatkan properti skrip untuk menyimpan ID lembar kerja
var scriptProp = PropertiesService.getScriptProperties();

// Fungsi untuk mengatur ID lembar kerja pada properti skrip
function intialSetup() {
  var activeSpreadsheet = SpreadsheetApp.getActiveSpreadsheet();
  scriptProp.setProperty("key", activeSpreadsheet.getId());
}

function doGet() {
  // Mendapatkan lembar kerja berdasarkan nama
  var activeSpreadsheet = SpreadsheetApp.getActiveSpreadsheet();
  var sheet = activeSpreadsheet.getSheetByName(sheetName);

  // Mendapatkan semua nilai di lembar kerja
  var dataRange = sheet.getDataRange();
  var values = dataRange.getValues();

  var data = [];

  // Mendapatkan header (nama kolom)
  var headers = values[0];

  // Loop melalui baris data (mulai dari baris kedua karena baris pertama adalah header)
  for (var i = 1; i < values.length; i++) {
    var rowData = values[i];
    var record = {};

    // Loop melalui kolom dan mengisi data dalam objek record
    for (var j = 0; j < headers.length; j++) {
      record[headers[j]] = rowData[j];
    }

    data.push(record);
  }

  // Membuat respons HTTP dengan mengonversi data ke format JSON
  return ContentService.createTextOutput(JSON.stringify(data)).setMimeType(
    ContentService.MimeType.JSON
  );
}

// Fungsi utama yang akan dijalankan saat ada permintaan POST
function doPost(e) {
  // Mendapatkan kunci skrip untuk menghindari konflik
  var lock = LockService.getScriptLock();
  lock.tryLock(10000);

  try {
    // Membuka lembar kerja berdasarkan ID yang disimpan dalam properti skrip
    var doc = SpreadsheetApp.openById(scriptProp.getProperty("key"));
    var sheet = doc.getSheetByName(sheetName);

    // Mendapatkan header dari lembar kerja
    var headers = sheet.getRange(1, 1, 1, sheet.getLastColumn()).getValues()[0];

    // Menentukan baris berikutnya untuk menambahkan data baru
    var nextRow = sheet.getLastRow() + 1;

    // Membuat array data baru berdasarkan header
    var newRow = headers.map(function (header) {
      // Jika header adalah 'timestamp', gunakan waktu sekarang
      // Jika tidak, gunakan nilai parameter yang sesuai dari permintaan POST
      return header === "timestamp" ? new Date() : e.parameter[header];
    });

    // Menyimpan data baru ke lembar kerja
    sheet.getRange(nextRow, 1, 1, newRow.length).setValues([newRow]);

    // Membuat respons sukses dalam format JSON
    return ContentService.createTextOutput(
      JSON.stringify({ result: "success", row: nextRow })
    ).setMimeType(ContentService.MimeType.JSON);
  } catch (e) {
    // Membuat respons error dalam format JSON
    return ContentService.createTextOutput(
      JSON.stringify({ result: "error", error: e })
    ).setMimeType(ContentService.MimeType.JSON);
  } finally {
    // Melepaskan kunci skrip setelah selesai
    lock.releaseLock();
  }
}
