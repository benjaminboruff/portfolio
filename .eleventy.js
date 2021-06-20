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

  /* --- post collection (in src/articles) --- */
  config.addCollection("projects", (collection) =>
    collection
      .getFilteredByGlob("./src/projects/*.md")
      .filter((p) => dev || (!p.data.draft && p.date <= now))
  );

  config.addPassthroughCopy("src/css");
  return {
    dir: {
      input: "src",
      output: "build",
    },
  };
};
