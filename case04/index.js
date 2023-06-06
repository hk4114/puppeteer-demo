const schedule = require("node-schedule");
const demo = require("../case03");


class Alarm {
  constructor({ alarmName, alarmTime }) {
    this.alarmName = alarmName; // 定时任务名称
    this.alarmTime = alarmTime; // 定时任务时间
  }

  // 创建定时任务
  async create(callback) {
    schedule.scheduleJob(`${this.alarmName}`, `${this.alarmTime}`, callback);
  }

  // 删除定时任务
  delete() {
    if (schedule.scheduledJobs[this.alarmName]) {
      schedule.scheduledJobs[this.alarmName].cancel();
      return true;
    }
    return false;
  }
}

main();

function main() {
  new Alarm({
    // 定时任务名称
    alarmName: "自动爬虫任务-20230520",
    // 定时任务计划
    alarmTime: "30 20 * * * *",
  }).create(() => {
    demo();
  });
}
