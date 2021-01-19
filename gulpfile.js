var gulp = require('gulp');
var requireDir = require('require-dir'); // 加载同一个目录下的多个任务文件
requireDir('./gulp-task'); // 加载同一个目录下的多个任务文件


// 官方示例
// function defaultTask(cb) {
//     // place code for your default task here
//     console.log('gggggg')
//     cb();
//   }
//   exports.default = defaultTask