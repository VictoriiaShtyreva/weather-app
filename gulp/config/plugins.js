import browsersync from "browser-sync";
import replace from "gulp-replace";
import plumber from "gulp-plumber";
import notify from "gulp-notify";
import newer from "gulp-newer";
import ifPlugin from "gulp-if";


const plugins = {
  browsersync: browsersync,
  replace: replace,
  plumber: plumber,
  notify: notify,
  newer: newer,
  if: ifPlugin
};

export default plugins;
