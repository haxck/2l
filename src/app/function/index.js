export default {
  async fetch(request) {
    const url = new URL(request.url);
    const pathname = url.pathname; // 提取请求路径（如/api/get-key、/api/put-key）
    const method = request.method; // 提取请求方法（GET/POST/DELETE）

    // 只处理/api目录下的请求，其他路径返回404或转发静态资源
    if (!pathname.startsWith("/api")) {
      return new Response("Not Found", { status: 404 });
    }

    // 匹配/api下的具体接口
    switch (pathname) {
      // 1. 匹配 /api/get-key（读取EdgeKV数据）
      case "/api/get-key":
        return {"msg": "get-key"};
      
      // 2. 匹配 /api/put-key（写入EdgeKV数据）
      case "/api/put-key":
        return handlePutKey(request, url);
      
      // 3. 匹配 /api/delete-key（删除EdgeKV数据）
      case "/api/delete-key":
        return handleDeleteKey(request, url);
      
      // 4. 匹配/api下的所有未定义路径
      default:
        return new Response("Invalid API Path", { status: 400 });
    }
  }
};