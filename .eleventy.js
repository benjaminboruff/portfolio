// 11ty configuration
const dev = (global.dev = process.env.ELEVENTY_ENV === "development"),
  now = new Date();

module.exports = (config) => {
  /* --- PLUGINS --- */
  // navigation
  config.addPlugin(require("@11ty/eleventy-navigation"));

  /* --- SHORTCODES --- */
  // page navigation
  config.addShortcode("navlist", require("./lib/shortcodes/navlist.js"));

  /* --- FILTERS --- */
  // format dates
  const dateformat = require("./lib/filters/dateformat");
  config.addFilter("datefriendly", dateformat.friendly);
  config.addFilter("dateymd", dateformat.ymd);

  // format word count and reading time
  config.addFilter("readtime", require("./lib/filters/readtime"));

  /* --- post collection (in src/articles) --- */
  config.addCollection("projects", (collection) =>
    collection
      .getFilteredByGlob("./src/projects/*.md")
      .filter((p) => dev || (!p.data.draft && p.date <= now))
  );

  /* --- CSS PROCESSING --- */
  config.addWatchTarget("./src/scss/");

  /* --- TRANSFORMS --- */
  // minify HTML
  config.addTransform("htmlminify", require("./lib/transforms/htmlminify"));

  // inline assets
  config.addTransform("inline", require("./lib/transforms/inline"));

  /* --- JS PROCESSING --- */
  config.addWatchTarget("./src/js/");

  return {
    dir: {
      input: "src",
      output: "build",
    },
  };
};
