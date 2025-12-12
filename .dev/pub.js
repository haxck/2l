// src/app/function/index.js
var function_default = {
  async fetch(request) {
    const url = new URL(request.url);
    const pathname = url.pathname;
    const method = request.method;
    if (!pathname.startsWith("/api")) {
      return new Response("Not Found", { status: 404 });
    }
    switch (pathname) {
      case "/api/get-key":
        return { "msg": "get-key" };
      case "/api/put-key":
        return handlePutKey(request, url);
      case "/api/delete-key":
        return handleDeleteKey(request, url);
      default:
        return new Response("Invalid API Path", { status: 400 });
    }
  }
};
export {
  function_default as default
};
