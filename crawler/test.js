const fs = require("fs");
const cheerio = require("cheerio");

const logPClasses = (inputPath) => {
  try {
    // Load the HTML content
    const htmlContent = fs.readFileSync(inputPath, "utf8");
    const $ = cheerio.load(htmlContent);

    // Collect all classes from <p> elements
    const pClasses = new Set();

    $("p").each((_, element) => {
      const classNames = $(element).attr("class");
      if (classNames) {
        classNames.split(/\s+/).forEach((className) => {
          pClasses.add(className);
        });
      }
    });

    // Log all unique classes of <p> elements
    console.log("Classes of <p> elements:", [...pClasses]);
  } catch (error) {
    console.error("An error occurred:", error);
  }
};

// Replace with the path to your HTML file
const inputPath = "./data/Chủ đề số 45_ Y tế, dược/Đề mục số 7_ Phòng, chống bệnh truyền nhiễm.html";
logPClasses(inputPath);
