(() => {
  if (document.querySelector("text-tracker")) {
    console.warn('<text-tracker></text-tracker> element already loaded.');
    return null;
  }

  const script = document.createElement("script");
  script.type = "module";
  script.src = "../dist/text-tracker-es.js";

  script.onload = () => {
    const el = document.createElement('text-tracker');
    document.body.appendChild(el);
  }


  document.head.appendChild(script);
})();
