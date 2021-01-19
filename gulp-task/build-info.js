// -------------------------
// 生成编译相关信息
// -------------------------

"use strict";

const gulp = require("gulp");

const directoryExists = require("directory-exists"); // 检查目录是否存在
const ip = require("ip"); // 获取本地IP地址
// const print = require("gulp-print").default;
const packageTool = require("./../package.json");        // package.json 封装
const gitRevSync = require("git-rev-sync"); // 同步获取 git 中相关信息
const jsonfile = require("jsonfile");             // 读写json文件
// -------------------------
// 配置信息
// -------------------------

const dirDist = "dist/admin/"; // 编译后文件所在的目录

const fileBuildInfo = "build-info.json"; // 编译信息文件


// -------------------------
// 辅助方法
// -------------------------

// 获取编译日期
function getBuildDate() {

  const date = new Date();
  let dateString = "" + date.getFullYear();

  let month = date.getMonth() + 1;
  if (month < 10) {
    month = "0" + month;
  }
  dateString += month;

  let day = date.getDate();
  if (day < 10) {
    day = "0" + day;
  }
  dateString += day;

  dateString += "-";

  let hour = date.getHours();
  if (hour < 10) {
    hour = "0" + hour;
  }
  dateString += hour;

  let minute = date.getMinutes();
  if (minute < 10) {
    minute = "0" + minute;
  }
  dateString += minute;

  let second = date.getSeconds();
  if (second < 10) {
    second = "0" + second;
  }
  dateString += second;

  return dateString;
}

// 获取编译信息
function getBuildInfo() {
  let info = {
    packageName: packageTool.name,
    packageVersion: packageTool.version,
    buildTime: getBuildDate(),
    machineIP: ip.address(),
    gitHashShort: gitRevSync.short(),
    gitHashLong: gitRevSync.long(),
    gitBranch: gitRevSync.branch(),
    gitMessage: gitRevSync.message(),
    gitDate: gitRevSync.date(),
    gitTag: gitRevSync.tag()
  };
  console.log(info);
  return info;
}

// -------------------------
// 检查目标目录是否存在
// -------------------------
gulp.task("Info:CheckDist", function (done) {
  const isDirectoryExists = directoryExists.sync(dirDist);
  if (!isDirectoryExists) {
    throw new Error("Error: 目录 " + dirDist + " 不存在");
  }
  done();
});

// -------------------------
// 写入编译信息
// -------------------------
gulp.task("Info:WriteBuildInfoFile", function (done) {
  const obj = getBuildInfo();
  jsonfile.writeFileSync(dirDist + fileBuildInfo, obj, {spaces: 4}); // 写入文件
  done();
});

// -------------------------
// 生成编译信息文件
// -------------------------
gulp.task("Build:Info",
  gulp.series(
    "Info:CheckDist",
    "Info:WriteBuildInfoFile",
    function (done) {
      done();
    }
  )
);
