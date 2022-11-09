// Main nodule
import gulp from "gulp";
// Import path
import path from "./gulp/config/path.js";
// Import common plugins
import plugins from "./gulp/config/plugins.js";


// Pass values in global variable
global.app = {
  isBuild: process.argv.includes("--build"),
  isDev: !process.argv.includes("--build"),
  path: path,
  gulp: gulp,
  plugins: plugins,
};

// Import tasks
import copy from "./gulp/tasks/copy.js";
import reset from "./gulp/tasks/reset.js";
import html from "./gulp/tasks/html.js";
import server from "./gulp/tasks/server.js";
import scss from "./gulp/tasks/scss.js";
import js from "./gulp/tasks/js.js";
import images from "./gulp/tasks/images.js";
import { otfToTtf, ttfToWoff, fontsStyle } from "./gulp/tasks/fonts.js";

// Watching for changes files
const watcher = () => {
  gulp.watch(path.watch.files, copy);
  gulp.watch(path.watch.html, html);
  gulp.watch(path.watch.scss, scss);
  gulp.watch(path.watch.js, js);
  gulp.watch(path.watch.images, images);
};

// Sequential font processing
const fonts = gulp.series(otfToTtf, ttfToWoff, fontsStyle);

// Main tasks
const mainTasks = gulp.series(
  fonts,
  gulp.parallel(copy, html, scss, js, images)
);

// Build scripts to complete tasks
const dev = gulp.series(reset, mainTasks, gulp.parallel(watcher, server));
const build = gulp.series(reset, mainTasks);

// Export scripts
export { dev };
export { build };

// Executing the default script
gulp.task("default", dev);
