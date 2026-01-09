import "./code.css";
import "./article.css";
import initCodeBlocks from "./code";

const addArticleLinks = () => {
  const article = document.querySelector("article");
  const crystal = document.querySelector(".core-crystal-container");
  if (!article || !crystal) {
    return;
  }

  if (document.querySelector(".article-nav-links")) {
    return;
  }

  const nav = document.createElement("div");
  nav.className = "article-nav-links";

  const homeLink = document.createElement("a");
  homeLink.href = "/";
  homeLink.textContent = "Home";

  const aboutLink = document.createElement("a");
  aboutLink.href = "/about";
  aboutLink.textContent = "About";

  nav.appendChild(homeLink);
  nav.appendChild(aboutLink);

  crystal.insertAdjacentElement("afterend", nav);
};

initCodeBlocks();
addArticleLinks();
