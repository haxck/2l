const dev = process.env.NODE_ENV !== 'production';
export const server = dev ? 'http://localhost:3000' : 'https://2l.haxck.com';

export const aiConfig = {
  baseurl: process.env.API_BASEURL || 'https://api.openai.com/v1',
  apiKey: process.env.API_KEY || 'your-api-key',
  model: process.env.MODEL || 'gpt-3.5-turbo'
};