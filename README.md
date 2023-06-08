# puppeteer-demo
从零开始学习 puppeteer

- case01 官方案例
- case02 滚动截屏
- case03 简易爬虫 - b站获取换一换的数据（带交互操作）
- case04 定时执行爬虫 `npx nodemon case04`
- case05 模拟登陆

https://github.com/checkly/headless-recorder

```js
const browser = await puppeteer.launch({
    headless: false,
    defaultViewport: {
        width: 0,
        height: 0
    },
    userDataDir: path.join(os.homedir(), '.puppeteer-data')
});
```