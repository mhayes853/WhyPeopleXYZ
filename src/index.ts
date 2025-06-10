import "./style.css";
import "./index.css";

type Article = {
  title: string;
  blurb: string;
  link: string;
};

const ROOT_ARTICLE = {
  title: "The Root",
  blurb: "Start here I guess...",
  link: "root.html",
};

const INDUSTRY_ARTICLES = [
  {
    title: "Over Complicating vs Over Engineering",
    blurb:
      "These 2 terms seem to be used interchangeably, though I think one is more honorable than the other.",
    link: "over-complicating-vs-over-engineering.html",
  },
];

const PROJECTING_MY_INSANITY_ARTICLES = [
  {
    title: "Command Handlers Don't Scale",
    blurb:
      "Technology, organizations, and societies need to be collaborative, and not enable their own destruction by refusing to question their own requirements.",
    link: "command-handlers-dont-scale.html",
  },
];

const articleHTML = (a: Article) => {
  return `
  <a id="article-${a.title}" class="card">
    <h3>${a.title}</h3>
    <p>${a.blurb}</p>
  </a>
  `;
};
