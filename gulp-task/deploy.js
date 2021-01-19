// -------------------------
// 生成部署版本
// -------------------------

"use strict";

const gulp = require("gulp");

const directoryExists = require("directory-exists"); // 检查目录是否存在
const minimist = require("minimist"); // 读取命令行中的参数
const del = require("del");                       // 删除文件或目录
const mkDir = require("make-dir");                         // 文件系统操作
const print = require("gulp-print").default;              // 打印当前执行流文件
const zip = require("gulp-zip"); // 压缩 zip 文件
const merge = require("merge-stream"); // 合并流
var replace = require('gulp-string-replace');   // 字符串替换

let jsonfile = require("jsonfile");             // 读写json文件

// -------------------------
// 配置信息
// -------------------------

const dirDist = "dist/admin/"; // 编译后文件所在的目录
const dirTemp = "temp/"; // 临时处理所在的目录
const dirDeploy = "config/deploy/"; // 部署信息所在的目录
const dirDeployDist = "deploy-dist/"; // 临时处理所在的目录
const fileDeployConfig = "deploy-config.json"; // 编译信息文件
const dirArchive = "i-hospital-ng-admin-$TIME"; // 最终生成的部署打包文件目录
const fileConfigInfo = "assets/config/config-info.json"; // 服务器配置信息文件名（含路径）

const baseRefDev = '<base href="/admin/">'; // 开发环境下的 base href
const baseRefReleaseConst = '<base href="$baseHref">'; // 部署环境下微信公众号的 base href，常量，不许改，可能会多次被使用
var baseRefRelease = '<base href="$baseHref">'; // 部署环境下微信公众号的 base href，变量，每次替换后能用


const symbolTime = "$TIME"; // 日期的替换符号

const description = "desc"; // 描述的字段
const siteArgument = "site"; // 命令行传入的参数，用于选中一个配置名进行部署
const slash = "/"; // 目录分隔符
const sign4siteName = "#"; // 多个配置名的分隔符
const configInDeployConfig = "config"; // 部署配置文件中的属性名 config
const pathInDeployConfig = "path"; // 部署配置文件中的属性名 path

const options = minimist(process.argv.slice(2)); // 命令行传入的参数

let deployList = []; // 要生成的部署项列表
let distributionPathList = []; // 生成的版本路径列表

// -------------------------
// 辅助方法
// -------------------------

// 获取编译日期
function getBuildDate() {

  let date = new Date();
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


// -------------------------
// 主体方法
// -------------------------

// 检查目标目录是否存在
gulp.task("Deploy:CheckDist", function (done) {
  const isDirectoryExists = directoryExists.sync(dirDist);
  if (!isDirectoryExists) {
    throw new Error("Error: 目录 dist 不存在");
  }
  done();
});

// 清理工作目录
gulp.task("Deploy:WorkDirClean", function (done) {
  del.sync([
    dirTemp + "*",
    dirDeployDist + "*",
  ]);
  done();
});

// 删除一些文件，比如配置文件（后续重新写入实时生成的版本）
gulp.task("Deploy:DeleteFiles", function (done) {
  del.sync([
    dirDist + fileConfigInfo
  ]);
  done();
});

// 获取要部署的配置列表
gulp.task("Deploy:GetDeployList", function (done) {

  // 获取配置文件中的信息
  const dataFormat = jsonfile.readFileSync(dirDeploy + fileDeployConfig);

  let siteNameString = options[siteArgument];
  console.log("siteNameString", siteNameString);
  if (siteNameString) {
    // 有指定参数
    let siteNameArray = siteNameString.split(sign4siteName); // 含多个配置项
    for (const siteName of siteNameArray) {
      // 命令行指定部署某项，挑出选中的这个部署项
      const theItem = dataFormat[siteName];
      deployList.push(theItem);
    }

  } else {
    // 为全体配置项部署
    Object.keys(dataFormat).forEach(
      (item) => {
        deployList.push(dataFormat[item]);
      }
    );
  }

  done();

});


// 生成一个 deploy item 的 发布环境，每个 deploy item 包括多个环境 (开发环境，生产环境等)
// environment -- develop
// environmentItem --
// { path: 'web.witontek.com/ehospital2web/web',
//     'admin-path': 'web.witontek.com/ehospital2web/admin',
//     config:
//     { home_url: '/eHospital/userinfo/userinfo_queryIndex.action',
//         login_url: '/eHospital/smartGuide/login.action',
//         server_url: 'http://web.witontek.com/eHospital2',
//         wechat_url: 'http://web.witontek.com/eHospital' }
// }
// desc -- c1
function generateDeployItemEnvironment(environment, environmentItem, desc) {

  let streamList = []; // 可能存在多个不同分发版本【用户端，管理后台】

  let pathForParent = dirTemp + environment + slash; // 完整的父目录地址
  // console.log("--- *** pathForParent --", pathForParent);
  mkDir.sync(pathForParent); // 创建环境的目录

  // 用户端
  let stream = generateDeployDistribution(environment, environmentItem, desc, pathForParent, "path");
  if (stream) {
    streamList.push(stream);
  }

  return streamList;
}

// 生成一个部署位置的版本，例如 develop 中的 【用户端 或 管理后台】
// environment -- develop
// environmentItem --
// {
//     "path": "web.witontek.com/ehospital2web/web",
//     "admin-path": "web.witontek.com/ehospital2web/admin",
//     "config": {
//     "home_url": "/eHospital/userinfo/userinfo_queryIndex.action",
//         "login_url": "/eHospital/smartGuide/login.action",
//         "server_url": "http://web.witontek.com/eHospital2",
//         "wechat_url": "http://web.witontek.com/eHospital"
// }
// desc -- c1
// pathForParent -- temp2/develop/
////// path -- temp2/develop/web.witontek.com/ehospital2web/web/
// pathName -- path
function generateDeployDistribution(environment, environmentItem, desc, pathForParent, pathName) {

  console.log("--- ----------- Distribution ------------- --");
  console.log("--- environment --", environment);
  console.log("--- environmentItem --", environmentItem);
  console.log("--- pathForParent --", pathForParent);
  console.log("--- pathName --", pathName);

  let stream; // 创建文件目录及其中内容的流

  const pathString = environmentItem[pathName]; // web.witontek.com/ehospital2web/web
  console.log("--- pathString --", pathString);
  if (pathString.length > 0) {
    // 过滤掉未配置目标目录的情况
    const pathArray = pathString.split(slash); // 目标路径分割成数组
    for (const pathItem of pathArray) {
      pathForParent += pathItem + slash;

      // 创建目录
      const isDirectoryExists = directoryExists.sync(pathForParent);
      if (!isDirectoryExists) {
        // console.log("--- 创建目录 --", pathForParent);
        mkDir.sync(pathForParent); // 如果该目录不存在，则创建
      }

      // 如果到达最后那层目录，生成相关文件
      if (pathItem === pathArray[pathArray.length - 1]) {
        if (!isDistributionExists(pathForParent)) {
          // 版本尚不存在

          generateConfigFile(environment, environmentItem, desc, pathForParent); // 生成配置文件

          // 生成该版本下的 base href
          const baseString = environmentItem['base']; // /medical-admin/
          baseRefRelease =  baseRefReleaseConst.replace('$baseHref', baseString);

          // 拷贝其他文件；除了 html 文件，它们会在稍后单独处理
          let stream1 = gulp
            .src([
              dirDist + "**", '!' + dirDist + "*.html",
            ])
          // .pipe(print())
            .pipe(gulp.dest(pathForParent));

          // 拷贝 html 文件，并替换 base href
          let stream2 = gulp
            .src([
              dirDist + "*.html",
            ])
            .pipe(print())
            .pipe(replace(baseRefDev, baseRefRelease)) // index.html 的 base href 替换
            .pipe(gulp.dest(pathForParent));

          stream = merge([stream1, stream2]); // 合并流

        } else {
          // 如果该目录已存在，则说明已经有一个发布版本在内部，追加到配置文件中去
          generateConfigFile(environment, environmentItem, desc, pathForParent); // 追加进配置文件
        }
      }

    }
  }

  return stream;

}

// 生成部署位置的配置文件
// environment -- develop
// environmentItem --
// { path: 'web.witontek.com/ehospital2web/web',
//     'admin-path': 'web.witontek.com/ehospital2web/admin',
//     config:
//     { home_url: '/eHospital/userinfo/userinfo_queryIndex.action',
//         login_url: '/eHospital/smartGuide/login.action',
//         server_url: 'http://web.witontek.com/eHospital2',
//         wechat_url: 'http://web.witontek.com/eHospital' }
// }
// desc -- c1
// path -- temp2/develop/web.witontek.com/ehospital2web/web/
function generateConfigFile(environment, environmentItem, desc, path) {
  let obj;
  try {
    obj = jsonfile.readFileSync(path + fileConfigInfo); // 找不到文件会报错
  } catch (e) {
    // 无文件

    obj = environmentItem[configInDeployConfig]; // 服务器地址配置
    obj.deployment = [];
    mkDir.sync(path + "assets/config/"); // 创建目录
  }

  // 已存在文件 或 无文件但已准备好了

  let deploymentInfo = {};
  deploymentInfo.url = environmentItem[pathInDeployConfig]; // 部署的外部访问地址
  deploymentInfo.desc = desc + "-" + environment; // 部署位置名
  obj.deployment.push(deploymentInfo);

  jsonfile.writeFileSync(path + fileConfigInfo, obj, {spaces: 4}); // 写入文件
}


// 判断是否该版本已经存在
// 由于拷贝的动作是稍后进行的，因此判断是否版本存在必须用全局变量的方式
// 传入的路径，如果之前没有记录的，则记录并返回 false，否则返回 true
function isDistributionExists(pathInput) {
  let isExists = false;

  for (const distributionPath of distributionPathList) {
    if (distributionPath === pathInput) {
      isExists = true; // 已存在
      break;
    }
  }

  if (!isExists) {
    // 不存在，所以记录下来
    distributionPathList.push(pathInput);
  }
  // console.log("--- 当前有效版本数量 --", distributionPathList.length);

  return isExists;
}


gulp.task("Deploy:GenerateDeployFiles", function () {
  let streamList = [];
  for (const deployItem of deployList) {
    console.log("---版本信息--", deployItem);
    Object.keys(deployItem).forEach(
      (environment) => {
        if (environment != description) {
          // 除注释外的节点都参与处理
          const subStreamList = generateDeployItemEnvironment(environment, deployItem[environment], deployItem[description]);
          for (const subStream of subStreamList) {
            streamList.push(subStream);
          }

        }
      }
    );

  }
  return merge(streamList);
});

// 为每一个发布版本生成一个压缩文件
gulp.task("Deploy:Zip4EveryDistribution", function () {
  let streamList = [];

  // 从每个保存的目录中获取版本，逐一生成压缩文件，目标是一个版本一个压缩文件
  for (const distributionPath of distributionPathList) {
    const pathLList = distributionPath.split("/");
    const archiveName = pathLList[pathLList.length - 2] + ".zip";  // 因为最后以/结尾，所以最后一个是空字符，要取倒数第二个
    let stream = gulp.src(distributionPath + "**")
      .pipe(zip(archiveName))
      .pipe(gulp.dest(distributionPath));

    if (stream) {
      streamList.push(stream);
    }
  }

  return merge(streamList);
});

// 生成最后的压缩文件
gulp.task("Deploy:CopyAllZipFile", function () {
  const timestamp = dirArchive.replace(symbolTime, getBuildDate());
  console.log("--------------------------------------------------");
  console.log("     directory : [" + timestamp + "]");
  console.log("--------------------------------------------------");
  return gulp.src(dirTemp + "**/*.zip")
    .pipe(gulp.dest(dirDeployDist + "/" + timestamp + "/"));
});

// -------------------------
// 生成编译信息文件
// 使用方式  gulp Deploy:Entrance  --site web
// -------------------------
gulp.task("Deploy:Entrance",
  gulp.series(
    "Deploy:CheckDist",
    "Deploy:WorkDirClean",
    "Build:Info",
    "Deploy:DeleteFiles",
    "Deploy:GetDeployList",
    "Deploy:GenerateDeployFiles",
    "Deploy:Zip4EveryDistribution",
    "Deploy:CopyAllZipFile",
    function (done) {
      done();
    }
  )
);
