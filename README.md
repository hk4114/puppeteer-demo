# puppeteer-demo
从零开始学习 puppeteer

- case01 官方案例
- case02 滚动截屏
- case03 简易爬虫 - b站获取换一换的数据（带交互操作）
- case04 定时执行爬虫 `npx nodemon case04`

## 参考资料
- [文档 EN](https://pptr.dev/)
- [文档 CN](https://puppeteer.bootcss.com/)
- [从零开始的Puppeteer](https://juejin.cn/post/7224137483297177659)
- [了却我的爬虫心结](https://juejin.cn/post/7235137314401157180)

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