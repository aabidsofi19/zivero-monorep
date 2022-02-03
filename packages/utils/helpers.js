export function includeScript(URL, callback) {
  let documentTag = document,
    tag = "script",
    object = documentTag.createElement(tag),
    scriptTag = documentTag.getElementsByTagName(tag)[0];
  object.src = "//" + URL;
  if (callback) {
    object.addEventListener(
      "load",
      function (e) {
        callback(null, e);
      },
      false
    );
  }
  scriptTag.parentNode.insertBefore(object, scriptTag);
}
