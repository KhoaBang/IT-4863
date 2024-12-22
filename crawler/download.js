const puppeteer = require("puppeteer-core");
const cheerio = require("cheerio");
const fs = require("fs");
const path = require("path");

const baseUrl = "https://phapdien.moj.gov.vn/TraCuuPhapDien/MainBoPD.aspx?mapc=";
const baseLink = "https://phapdien.moj.gov.vn/TraCuuPhapDien/BPD/demuc/";
const browserPath = "C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe";

// Function to sanitize folder names
const sanitizeFolderName = (name) => {
  return name.replace(/[<>:"/\\|?*]/g, "_");
};

(async () => {
  // Launch browser
  const browser = await puppeteer.launch({
    headless: false,
    executablePath: browserPath,
  });

  const page = await browser.newPage();
  await page.goto(baseUrl, { waitUntil: "networkidle0" });
  await page.evaluate(() => (document.body.style.zoom = "70%"));

  // Close pop-ups
  browser.on("targetcreated", async (target) => {
    const page = await target.page();
    if (page) page.close();
  });

  // Function to click elements
  const clickElements = async (selector, timeout) => {
    await page.waitForSelector(selector, { timeout: 10000 });
    const elements = await page.$$(selector);
    for (let i = 0; i < elements.length; i++) {
      await elements[i].click();
      await new Promise((resolve) => setTimeout(resolve, timeout));
    }
  };

  // Click through tree view links
  await clickElements('a[title^="Chủ đề số"]', 500);
  await clickElements('a[title^="Đề mục số"]', 500);
  await clickElements('a[title^="Chương"]', 1000);

  // Extract and save the tree view HTML
  const treeViewHTML = await page.evaluate(() => {
    return document.querySelector("#treeView").outerHTML;
  });
  fs.writeFileSync("treeView.html", treeViewHTML, "utf8");
  console.log("Tree view saved to treeView.html");

  await browser.close();

  // Parse tree view to JSON
  const $ = cheerio.load(treeViewHTML);
  const data = [];

  $('a[title^="Chủ đề"]').each((_, element) => {
    const obj = {};
    obj.title = $(element).attr("title");
    obj.id = $(element).attr("id")?.split("_")[0];
    obj.children = [];

    const nextUl = $(element).next("ul[role='group'].jstree-children");
    nextUl.find('a[title^="Đề mục"]').each((_, el) => {
      obj.children.push({
        title: $(el).attr("title"),
        id: $(el).attr("id")?.split("_")[0],
      });
    });

    data.push(obj);
  });

  fs.writeFileSync("output.json", JSON.stringify(data, null, 2), "utf8");
  console.log("Tree view parsed to JSON and saved to output.json");

  // Download HTML content for each node
  const downloadHtml = async (demucLink, chudeFolder, demucTitle) => {
    const browser = await puppeteer.launch({ headless: true, executablePath: browserPath });
    const page = await browser.newPage();
    try {
      await page.goto(demucLink, { waitUntil: "networkidle0" });
      const htmlContent = await page.content();

      const sanitizedDemucTitle = sanitizeFolderName(demucTitle);
      const filePath = path.join(chudeFolder, `${sanitizedDemucTitle}.html`);
      fs.writeFileSync(filePath, htmlContent, "utf8");
      console.log(`Downloaded: ${sanitizedDemucTitle}.html`);
    } catch (error) {
      console.error(`Error downloading ${demucTitle}:`, error.message);
    } finally {
      await browser.close();
    }
  };

  // Process each Chủ đề and its Đề mục
  const processChude = async () => {
    const index = JSON.parse(fs.readFileSync("output.json", "utf8"));
    const dataFolder = path.join(__dirname, "data");

    if (!fs.existsSync(dataFolder)) {
      fs.mkdirSync(dataFolder);
    }

    for (const chude of index) {
      const sanitizedChudeTitle = sanitizeFolderName(chude.title);
      const chudeFolder = path.join(dataFolder, sanitizedChudeTitle);

      if (!fs.existsSync(chudeFolder)) {
        fs.mkdirSync(chudeFolder);
      }

      const downloadPromises = chude.children.map((demuc) => {
        const demucLink = `${baseLink}${demuc.id}.html`;
        return downloadHtml(demucLink, chudeFolder, demuc.title);
      });

      await Promise.all(downloadPromises);
    }

    console.log("All downloads complete!");
  };

  await processChude();
})();
