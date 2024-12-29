// Import required modules
const fs = require("fs");
const path = require("path");
const cheerio = require("cheerio");

// Root path to the data directory
const dataRootPath = path.join(__dirname, "data");

// Function to sanitize folder names (replace _ with spaces)
const sanitizeFolderName = (folderPath) => {
  return path.basename(folderPath).replace(/_/g, "").trim();
};

// Function to extract "dieu" and noidung from an HTML file
const extractDieu = (inputPath, outputPath, tenchude) => {
  const regex = /^([^\s]+(?:\s[^\s]+){1})\s+(.*)$/;

  // Load the HTML noidung
  const htmlContent = fs.readFileSync(inputPath, "utf8");
  const $ = cheerio.load(htmlContent);

  // Extract title from <h3> tag
  const title = $("h3").text().replace(/\n/g, " ").replace(/\s+/g, " ").trim();

  let dieuData = [];
  let currentDieu = null;

  let tenchuong = [];
  tenchuong.push(" ");
  // Parse each <p> tag
  $("p").each((index, element) => {
    const $element = $(element);
    if ($element.hasClass("pDieu")) {
      if (currentDieu) dieuData.push(currentDieu);
      // const match = $element.text().match(regex);
      if (tenchuong[0]!==" ") {
        currentDieu = {
          tenchude: tenchude,
          tendemuc: title,
          tenchuong: tenchuong[0],
          tendieu: $element.text().trim().replace(/\s+/g, " "),
          // madieu: match[1],
          // noidungmadieu: match[2],
          noidung: [],
        };
      } else {
        currentDieu = {
          tenchude: tenchude,
          tendemuc: title,
          tenchuong: "",
          tendieu: $element.text().trim().replace(/\s+/g, " "),
          // madieu: $element.text().trim(),
          // noidungmadieu: "",
          noidung: [],
        };
      }
    } else if (currentDieu && (!$element.attr("class")||$element.hasClass("MsoNormal"))) {
      // Get all text, including from child elements
      const textContent = $element
        .contents()
        .map((_, node) => $(node).text().trim().replace(/\s+/g, " "))
        .get()
        .join(" ");

      if (textContent) {
        currentDieu.noidung.push(textContent);
      }
    } else if (
      $element.hasClass("pChuong") &&
      $element.next().hasClass("pChuong")
    ) {
      // element next is a pChuong also then concat the 2 text
      tenchuong.pop();
      tenchuong.push(
        $element.text().trim() + ": " + $element.next().text().trim()
      );
    }
  });

  if (currentDieu) dieuData.push(currentDieu);

  // Final JSON object
  const jsonData = dieuData;

  // Write to JSON file
  fs.writeFileSync(outputPath, JSON.stringify(jsonData, null, 2), "utf8");
  console.log(`Extracted: ${outputPath}`);
};

// Function to process all HTML files in a folder
const processHtmlFilesInFolder = (folderPath, tenchude) => {
  fs.readdirSync(folderPath).forEach((file) => {
    if (file.endsWith(".html")) {
      const inputPath = path.join(folderPath, file);

      // Check if the file is empty
      if (fs.statSync(inputPath).size === 0) {
        console.log(`Skipping empty file: ${inputPath}`);
        return; // Skip empty files
      }

      const outputFileName = file.replace(".html", ".json");
      const outputPath = path.join(folderPath, outputFileName);

      console.log(`Processing HTML: ${inputPath}`);

      // Assuming extractDieu is asynchronous
      extractDieu(inputPath, outputPath, tenchude);
    }
  });
};

// Function to merge all JSON files in a folder
const mergeJsonFilesInFolder = (folderPath, outputFilePath) => {
  const mergedData = [];
  const files = fs.readdirSync(folderPath);

  files.forEach((file) => {
    if (file.endsWith(".json")) {
      const filePath = path.join(folderPath, file);
      const jsonData = JSON.parse(fs.readFileSync(filePath, "utf8"));
      mergedData.push(...jsonData);
    }
  });

  const folderName = sanitizeFolderName(folderPath);
  const mergedJson = mergedData;

  fs.writeFileSync(outputFilePath, JSON.stringify(mergedJson, null, 2), "utf8");
  console.log(`Merged JSON written: ${outputFilePath}`);
};

// Function to process all folders in the root data directory
const processAllFolders = (rootPath) => {
  fs.readdirSync(rootPath).forEach((folder) => {
    const folderPath = path.join(rootPath, folder);
    const tenchude = [];
    if (fs.statSync(folderPath).isDirectory()) {
      console.log(`\nProcessing folder: ${folderPath}`);

      //get ten chude
      tenchude.push(folder.replace(/_/g, "").trim());
      // Step 1: Extract all HTML files into JSON
      processHtmlFilesInFolder(folderPath, tenchude[0]);
      tenchude.pop();
      // Step 2: Merge all JSON files in the folder
      const outputFileName = `${sanitizeFolderName(folderPath).replace(
        /_/g,
        ""
      )}.json`;
      const outputFilePath = path.join(rootPath, outputFileName);
      mergeJsonFilesInFolder(folderPath, outputFilePath);
    }
  });

  console.log("\nAll folders processed successfully!");
};

// Function to merge all JSON files in the root folder
const mergeAllJsonFiles = (rootPath, outputFilePath) => {
  const mergedData = [];

  // Read all files in the root directory
  const files = fs.readdirSync(rootPath);

  files.forEach((file) => {
    if (file.endsWith(".json")) {
      const filePath = path.join(rootPath, file);

      console.log(`Processing file: ${filePath}`);
      const jsonData = JSON.parse(fs.readFileSync(filePath, "utf8"));
      if (jsonData.length === 0) {
        return; // Exit current iteration of forEach loop if jsonData is empty
      }

      mergedData.push(...jsonData); // Spread operator to merge arrays
    }
  });

  // Write the final merged JSON to the specified file
  fs.writeFileSync(outputFilePath, JSON.stringify(mergedData, null, 2), "utf8");
  console.log(`All JSON files merged into: ${outputFilePath}`);
};

// Run the entire process
const finalOutputFilePath = path.join(__dirname, "all_data_merged.json");
processAllFolders(dataRootPath);
mergeAllJsonFiles(dataRootPath, finalOutputFilePath);

console.log("All JSON files in 'data' have been successfully merged!");
