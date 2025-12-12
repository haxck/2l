// 服务器端配置 - 包含环境变量

export const edgeStorageConfig = {
  endpoint: process.env.EDGE_STORAGE_ENDPOINT || 'https://edge-storage.aliyuncs.com',
  namespace: process.env.EDGE_STORAGE_NAMESPACE || '2l-lovewords',
  accessKeyId: process.env.EDGE_STORAGE_ACCESS_KEY_ID || 'your-access-key-id',
  accessKeySecret: process.env.EDGE_STORAGE_ACCESS_KEY_SECRET || 'your-access-key-secret'
};