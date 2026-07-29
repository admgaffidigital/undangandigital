// =========================================================================
// GOOGLE APPS SCRIPT - IMAGE UPLOAD BACKEND UNTUK VITE & VERCEL
// =========================================================================

// Ganti dengan ID Folder Google Drive Anda (Folder harus Public / Anyone with link can view)
const FOLDER_ID = 'YOUR_GOOGLE_DRIVE_FOLDER_ID'; 

// Fungsi Utama untuk menangani HTTP POST
function doPost(e) {
  try {
    // 1. Parsing payload dari body HTTP Request
    const requestData = JSON.parse(e.postData.contents);
    const action = requestData.action;

    // 2. Hanya tangani action "uploadImage"
    if (action === 'uploadImage') {
      const base64Data = requestData.data;
      const originalName = requestData.name || 'image.png';

      // 3. Proses upload ke Google Drive
      const imageUrl = uploadImageToDrive(base64Data, originalName);

      // 4. Kembalikan Response dalam format JSON
      return ContentService.createTextOutput(JSON.stringify({ 
        status: 'success', 
        url: imageUrl 
      })).setMimeType(ContentService.MimeType.JSON);
    }
    
    // Jika action tidak dikenali
    return ContentService.createTextOutput(JSON.stringify({ 
      error: 'Action not supported' 
    })).setMimeType(ContentService.MimeType.JSON);

  } catch (error) {
    // Tangani error dan kembalikan pesan error
    return ContentService.createTextOutput(JSON.stringify({ 
      error: error.message 
    })).setMimeType(ContentService.MimeType.JSON);
  }
}

// Fungsi Pembantu untuk menangani CORS jika ada preflight (OPTIONS)
function doOptions(e) {
  return ContentService.createTextOutput('')
    .setMimeType(ContentService.MimeType.JSON)
    .setHeader('Access-Control-Allow-Origin', '*')
    .setHeader('Access-Control-Allow-Methods', 'POST, GET, OPTIONS')
    .setHeader('Access-Control-Allow-Headers', 'Content-Type');
}

// Fungsi Inti Upload Gambar
function uploadImageToDrive(base64Data, filename) {
  // Pisahkan header data URI (misal: "data:image/png;base64,") dari isinya
  var parts = base64Data.split(',');
  var dataType = parts[0].split(';')[0].split(':')[1];
  var decoded = Utilities.base64Decode(parts[1]);
  
  // Buat objek blob
  var blob = Utilities.newBlob(decoded, dataType, filename);
  
  // Dapatkan folder tujuan di Drive
  var folder = DriveApp.getFolderById(FOLDER_ID);
  
  // Buat file baru
  var file = folder.createFile(blob);
  
  // Pastikan akses file adalah Public
  file.setSharing(DriveApp.Access.ANYONE_WITH_LINK, DriveApp.Permission.VIEW);
  
  // Dapatkan ID file
  var fileId = file.getId();
  
  // Kembalikan direct link URL (format uc?export=view&id=)
  return 'https://drive.google.com/uc?export=view&id=' + fileId;
}
