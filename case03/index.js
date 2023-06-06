const puppeteer = require("puppeteer");
const fs = require("fs-extra");
const { autoScroll } = require("../utils");
const outportPath = "./case03";

async function demo() {
  const browser = await puppeteer.launch({
    headless: "new",
  });
  console.log("打开浏览器");
  const page = await browser.newPage();
  console.log("打开页面");
  // 页面操作
  await dealLogically(page, browser);
}

async function dealLogically(page, browser) {
  // 控制浏览器全屏
  await page.setViewport({ width: 1920, height: 1080 });
  // 在新标签中打开要爬取的网页
  await page.goto("https://www.bilibili.com/");

  // 由于折扣速递板块位于最下方，所以需要页面滚动到最底端(封装页面滚动函数)
  await autoScroll(page);

  //返回的data
  let data = [];
  //获取点击换一换的按钮
  const change = await page.$(
    ".feed-roll-btn > .roll-btn"
  );
  //任意模拟点击事件50次
  for (let i = 0; i < 50; i++) {
    //模拟点击事件
    change && (await change.click());
    //每次点击之后，留出1s给页面某些元素（图片/视频等）加载
    await page.waitForTimeout(1000);
    data = await page.evaluate((data) => {
      const titles = document.querySelectorAll(
        ".container .feed-card .bili-video-card__info--tit"
      );
      let imgs = document.querySelectorAll(
        ".container .feed-card .bili-video-card__cover img"
      );
      let info = document.querySelectorAll(
        ".container .feed-card .bili-video-card__info--owner"
      );
      //遍历每次点击换一换，页面更新的数据组（3个）
      titles.forEach((v, i) => {
        const [owner, date] =
          info[i].textContent.split("· ");
        data.push({
          img: {
            src: imgs[i].getAttribute("src"),
          },
          title: v.textContent,
          info: {
            owner,
            date
          },
        });
      });
      return data;
    }, data);
  }

  // 关闭浏览器实例
  await browser.close();

  // 将数据作为 JSON 写入json文件
  const jsonData = JSON.stringify(data, null, 2);

  //写入文件路径
  const filePath = `${outportPath}/amount.json`;
  //调用fs.writeFile()进行写入文件
  fs.writeFile(filePath, jsonData, (err) => {
    if (err) {
      console.error(err);
      return;
    }
    console.log("Data written to file");
  });
}

demo();
