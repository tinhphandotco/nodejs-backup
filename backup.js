const CronJob = require("cron").CronJob;
const fs = require("fs");
const path = require("path");
const shelljs = require("shelljs");

// every at time "22 16 * * *"
// every second "* * * * * *"

// mongodump --out=<path>

const backupFolder = path.join(__dirname, "backups");

if (!fs.existsSync(backupFolder)) {
  fs.mkdirSync(backupFolder);
}

const job = new CronJob(
  "47 16 * * *",
  function () {
    const now = new Date()
      .toLocaleString()
      .split(" ")
      .join("_")
      .split(",")
      .join("_")
      .split("/")
      .join("_")
      .split(":")
      .join("-");

    const dumpFolder = path.join(backupFolder, now);

    fs.mkdirSync(dumpFolder);

    console.time("Time for backup");

    shelljs.exec(`mongodump --out=${dumpFolder}`);

    console.timeEnd("Time for backup");
  },
  null,
  true
);

job.start();
