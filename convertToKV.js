// 将lovewords.json转换为KV存储格式
const fs = require('fs');
const path = require('path');

// 读取lovewords.json文件
const lovewordsPath = path.join(__dirname, 'lovewords.json');
const lovewords = JSON.parse(fs.readFileSync(lovewordsPath, 'utf8'));

// 转换为KV格式
const kvPairs = [];

// 遍历所有情话
lovewords.forEach((word, index) => {
  // 生成唯一key，可以根据type和index组合
  const key = `loveword:${word.type}:${index}`;
  
  // 构造value对象，包含完整的数据
  const value = {
    _id: index.toString(),
    type: word.type,
    sentent: word.sentent,
    likeCount: word.likeCount
  };
  
  // 添加到KV数组
  kvPairs.push({ key, value });
});

// 输出结果
console.log('转换完成！共生成', kvPairs.length, '个KV对');
console.log('\n示例KV对：');
console.log(JSON.stringify(kvPairs.slice(0, 3), null, 2));

// 保存为JSON文件，方便导入到边缘存储
const kvOutputPath = path.join(__dirname, 'lovewords_kv.json');
fs.writeFileSync(kvOutputPath, JSON.stringify(kvPairs, null, 2));
console.log('\nKV数据已保存到', kvOutputPath);

// 生成导入命令示例
console.log('\n导入到阿里云边缘存储的示例命令：');
console.log('1. 登录阿里云控制台，进入边缘存储服务');
console.log('2. 创建存储空间（Namespace）');
console.log('3. 使用API或控制台批量导入数据');
console.log('4. 或使用边缘存储客户端工具导入：');
console.log('   edge-storage-cli batch-put --namespace=2l-lovewords --file=lovewords_kv.json');
