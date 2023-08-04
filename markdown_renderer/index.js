const mark = /==([^=]*)==/gm;
const marksubst = `<mark>$1</mark>`;
const boxu = / \[( )\] /gim;
const boxusubst = ` <input onClick=\"return false;\" type=\"checkbox\">`;
const boxc = / \[(x)\] (.*)/gim;
const boxcsubst = ` <input onClick=\"return false;\" type=\"checkbox\" checked>~~$2~~`;
const link = /\[\[(.*)\]\]/gm;
const linksubst = `<a href="index.html?$1" id="$1">$1</a>`;
var filename = decodeURI(window.location.search.replace("?", ""));
const done = new Event("done");
if (filename == "") filename = "Main";
fetch(
  "https://raw.githubusercontent.com/jktechs/pxt-jannick/master/.obsidian/snippets/theme.css"
)
  .then((x) => x.text())
  .then((x) => (document.getElementById("theme").innerHTML = x));

fetch(
  "https://raw.githubusercontent.com/jktechs/pxt-jannick/master/" +
    filename +
    ".md"
)
  .then((x) => x.text())
  .then((x) => {
    document.getElementById("markdown").innerHTML = CmarkGFM.convert(
      ("# " + filename + "\n" + x)
        .replace(mark, marksubst)
        .replace(boxu, boxusubst)
        .replace(boxc, boxcsubst)
        .replace(link, linksubst)
    );
    Prism.highlightAll();
    for (i of document.getElementsByTagName("pre")) {
      if (i.className == "language-mermaid") {
        i.className = "mermaid";
        i.innerHTML = i.children[0].innerHTML;
      }
    }
    document.body.dispatchEvent(done);
    //mermaid.initialize({ startOnLoad: true });
    //for (const a of document.getElementsByTagName("a")) {
    //  console.log(a.id);
    //}
  });
