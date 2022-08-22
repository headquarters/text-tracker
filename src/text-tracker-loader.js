(() => {
  if (document.querySelector("text-tracker")) {
    console.warn('<text-tracker></text-tracker> element already loaded.');
    return null;
  }

  let src = "https://text-tracker-fcbec.web.app/text-tracker-es.js";

  if (window.location.hostname === "localhost") {
    src = "../dist/text-tracker-es.js";
  }

  const script = document.createElement("script");
  script.type = "module";
  script.src = src;

  script.onload = () => {
    const el = document.createElement('text-tracker');
    document.body.appendChild(el);
  }


  document.head.appendChild(script);
})();
