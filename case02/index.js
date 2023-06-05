const puppeteer = require("puppeteer");
const outportPath = "./case02";

(async () => {
  const browser = await puppeteer.launch({
    headless: "new",
  });
  console.log("打开浏览器");
  const page = await browser.newPage();
  console.log("打开页面");
  // demo 懒加载及数据滚动加载
  await scrollLoad(page);
  await browser.close();
})();

// 懒加载及数据滚动加载
async function scrollLoad(page) {
  await page.goto("https://www.jd.com/", {
    waitUntil: "networkidle2",
  });
  
  // 获取element内容
  const result = await page.$eval("#hotwords", (el) => {
    return el.innerText;
  });
  console.log("page.$eval", result);

  // element 输入
  const inputEle = await page.$("#search input");
  await inputEle.type("macbook pro", {
    delay: 300,
  });

  // element点击
  // const btnEle = await page.$("#search button");
  // await btnEle.click();
  
  // setViewport setUserAgent
  // await page.emulate(puppeteer.KnownDevices["iPhone 13 Pro Max"]);
  // await page.emulate({
  //   viewport: {
  //     width: 375,
  //     height: 667,
  //     isMobile: true,
  //   },
  //   userAgent:
  //     '"Mozilla/5.0 (iPhone; CPU iPhone OS 9_1 like Mac OS X) AppleWebKit/601.1.46 (KHTML, like Gecko) Version/9.0 Mobile/13B143 Safari/601.1"',
  // });

  await autoScroll(page);

  //全屏截取
  await page.screenshot({
    path: `${outportPath}/jd-all.png`,
    fullPage: true,
  });
}

// 工具函数 - 自动滚动
async function autoScroll(page) {
  await page.evaluate(async () => {
    await new Promise((resolve) => {
      let totalHeight = 0;
      const distance = 200;
      const timer = setInterval(() => {
        const scrollHeight = document.body.scrollHeight;
        window.scrollBy(0, distance);
        totalHeight += distance;

        if (totalHeight >= scrollHeight) {
          clearInterval(timer);
          resolve();
        }
      }, 200);
    });
  });
}
