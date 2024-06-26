const ejs = require("ejs");
const path = require("path");

const { BLOG_URL, BLOG_BARE_URL, BLOG_TITLE, NEWSLETTER_BANNER } =
    process.env;

const renderHtml = async ({
  editionNumber,
  editionTitle,
  url,
  excerpt,
  html,
}) => {
  return new Promise((resolve, reject) => {
    ejs.renderFile(
      path.join(__dirname, "./views/pages/index.ejs"),
      {
        editionNumber,
        editionTitle,
        url,
        excerpt,
        html,
        BLOG_URL,
        BLOG_BARE_URL,
        BLOG_TITLE,
        NEWSLETTER_BANNER,
      },
      (err, data) => {
        if (err) {
          reject(err);
        } else {
          resolve(data);
        }
      }
    );
  });
};

const generateEmail = async ({ title, html, url, excerpt }) => {
  const [editionNumber, editionTitle] = title.split(/\s*-\s*/);
  
  const renderedHtml = await renderHtml({
    editionNumber,
    editionTitle,
    url,
    excerpt,
    html,
  });
  return renderedHtml;
};

module.exports = { generateEmail };