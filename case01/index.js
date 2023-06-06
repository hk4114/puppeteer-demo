const puppeteer = require("puppeteer");
const outportPath = "./case01";

(async () => {
  // 1. 创建了Browser实例，类似打开浏览器
  const browser = await puppeteer.launch({
    headless: "new",
  });
  console.log("打开浏览器");
  // 2. 创建了Page实例，类似浏览器中新开页面
  const page = await browser.newPage();
  console.log("打开页面");
  // 导航到要访问的页面
  await page.goto("https://www.baidu.com");

  await page.screenshot({ path: `${outportPath}/example.png` });

  console.log("success");

  // 在页面中执行脚本 Get the "viewport" of the page, as reported by the page.
  const dimensions = await page.evaluate(() => {
    return {
      width: document.documentElement.clientWidth,
      height: document.documentElement.clientHeight,
      deviceScaleFactor: window.devicePixelRatio,
    };
  });

  console.log("Dimensions:", dimensions);
  // 设置可视区域
  await page.setViewport({
    width: 1420,
    height: 1000,
  });
  // 全屏截取
  await page.screenshot({
    path: `${outportPath}/example1.png`,
    fullPage: true,
  });

  // waitUntil 来配置什么时候导航结束 "domcontentloaded"、"networkidle0"、"networkidle2"
  await page.goto("https://news.ycombinator.com", {
    waitUntil: "networkidle2",
  });
  await page.pdf({ path: `${outportPath}/hn.pdf`, format: "A4" });
  console.log("success pdf");
  // 3. 关闭浏览器
  await browser.close();
})();
