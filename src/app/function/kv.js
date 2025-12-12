// esa-edge.js（ESA 边缘函数入口）

export default {
  fetch(request) {
    return handleRequest(request)
  }
}
async function handleRequest(request) {
  try {
    const edgeKV = new EdgeKV({ namespace: "2lover" });
    let getType = { type: "text" };
    let value = await edgeKV.get("loveword-honey-0", getType);
    if (value === undefined) {
      return "EdgeKV get: key not found";
    } else {
      return new Response(value);
    }
  } catch (e) {
    return "EdgeKV get error" + e;
  }
}
