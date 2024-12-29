// const fs = require('fs');

// // Hàm chuẩn hóa dữ liệu
// function normalizeLawData(data) {
//   return {
//     link: `${data.tenchude}, ${data.tendemuc}, ${data.tenchuong}`,
//     title: `${data.madieu}:${data.noidungmadieu}`,
//     noidung: data.noidung.join("\n") // Gộp các phần tử của mảng nội dung thành một chuỗi
//   };
// }

// // Đọc file nguồn
// const sourceFilePath = 'all_data_merged.json'; // Đường dẫn tới file chứa dữ liệu gốc
// const outputFilePath = 'converted_all_data_merged.json'; // Đường dẫn lưu file kết quả

// fs.readFile(sourceFilePath, 'utf-8', (err, data) => {
//   if (err) {
//     console.error('Lỗi khi đọc file:', err);
//     return;
//   }

//   try {
//     // Parse dữ liệu từ file nguồn
//     const records = JSON.parse(data);

//     // Chuẩn hóa toàn bộ dữ liệu
//     const normalizedRecords = records.map(normalizeLawData);

//     // Ghi dữ liệu đã chuẩn hóa vào file mới
//     fs.writeFile(outputFilePath, JSON.stringify(normalizedRecords, null, 2), 'utf-8', (err) => {
//       if (err) {
//         console.error('Lỗi khi ghi file:', err);
//       } else {
//         console.log('Chuẩn hóa dữ liệu thành công! File được lưu tại:', outputFilePath);
//       }
//     });
//   } catch (parseErr) {
//     console.error('Lỗi khi xử lý dữ liệu:', parseErr);
//   }
// });


const fs = require('fs');

// Hàm chuẩn hóa dữ liệu
function normalizeLawData(data) {
  return {
    link: `${data.tenchude}; ${data.tendemuc}; ${data.tenchuong}`,
    title: `${data.madieu}:${data.noidungmadieu}`,
    content: data.noidung.join("\n ") // Gộp các phần tử của mảng nội dung thành một chuỗi
  };
}

// Hàm xáo trộn mảng
function shuffleArray(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}

// Đọc file nguồn
const sourceFilePath = 'all_data_merged.json'; // Đường dẫn tới file chứa dữ liệu gốc
const outputFilePath = 'converted_all_data_merged.json'; // Đường dẫn lưu file kết quả
const sampleOutputFilePath = '1000_dieus.json'; // Đường dẫn lưu file kết quả mẫu

fs.readFile(sourceFilePath, 'utf-8', (err, data) => {
  if (err) {
    console.error('Lỗi khi đọc file:', err);
    return;
  }

  try {
    // Parse dữ liệu từ file nguồn
    const records = JSON.parse(data);

    // Chuẩn hóa toàn bộ dữ liệu
    const normalizedRecords = records.map(normalizeLawData);

    // Ghi dữ liệu đã chuẩn hóa vào file mới
    fs.writeFile(outputFilePath, JSON.stringify(normalizedRecords, null, 2), 'utf-8', (err) => {
      if (err) {
        console.error('Lỗi khi ghi file:', err);
      } else {
        console.log('Chuẩn hóa dữ liệu thành công! File được lưu tại:', outputFilePath);
      }
    });

    // Xáo trộn và chọn ngẫu nhiên 1000 bản ghi
    const shuffledRecords = shuffleArray([...normalizedRecords]);
    const sampledRecords = shuffledRecords.slice(0, 1000);

    // Ghi 1000 bản ghi mẫu vào file mới
    fs.writeFile(sampleOutputFilePath, JSON.stringify(sampledRecords, null, 2), 'utf-8', (err) => {
      if (err) {
        console.error('Lỗi khi ghi file mẫu:', err);
      } else {
        console.log('Lấy mẫu dữ liệu thành công! File được lưu tại:', sampleOutputFilePath);
      }
    });
  } catch (parseErr) {
    console.error('Lỗi khi xử lý dữ liệu:', parseErr);
  }
});

