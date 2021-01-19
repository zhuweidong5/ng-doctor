// -------------------------
// 生成封面文件
// -------------------------

"use strict";

const gulp = require("gulp");

const directoryExists = require("directory-exists"); // 检查目录是否存在
const ip = require("ip"); // 获取本地IP地址
const print = require("gulp-print").default;
const packageTool = require("./../package.json");        // package.json 封装
const gitRevSync = require("git-rev-sync"); // 同步获取 git 中相关信息
const jsonfile = require("jsonfile");             // 读写json文件

// -------------------------
// 配置信息
// -------------------------

const dirDist = "dist/admin/"; // 编译后文件所在的目录
const dirSrc = "src/"; // 源代码所在的目录

// -------------------------
// 检查目标目录是否存在
// -------------------------
gulp.task("Cover:CheckDist", function (done) {
  const isDirectoryExists = directoryExists.sync(dirDist);
  if (!isDirectoryExists) {
    throw new Error("Error: 目录 " + dirDist + " 不存在");
  }
  done();
});

// -------------------------
// 拷贝封面文件
// -------------------------
gulp.task("Cover:CopyCoverFile", function (done) {
  return gulp.src([dirSrc + "*.html", "!"+ dirSrc + "index.html"])
    .pipe(print())
    .pipe(gulp.dest(dirDist));
});

// -------------------------
// 生成编译信息文件
// -------------------------
gulp.task("Cover:Entrance",
  gulp.series(
    "Cover:CheckDist",
    "Cover:CopyCoverFile",
    function (done) {
      done();
    }
  )
);
