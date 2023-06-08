const schedule = require("node-schedule");
const demo = require("../case03");

function main() {
  schedule.scheduleJob(`自动爬虫任务`, `30 20 * * * *`, ()=>demo());
}

main();