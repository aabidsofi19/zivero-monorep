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

export const parseJwt = (token) => {
  try {
    var base64Url = token.split(".")[1];
    var base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
    var jsonPayload = decodeURIComponent(
      atob(base64)
        .split("")
        .map(function (c) {
          return "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2);
        })
        .join("")
    );

    return JSON.parse(jsonPayload);
  } catch (e) {
    console.log("parse jwt error", e);
    return null;
  }
};
