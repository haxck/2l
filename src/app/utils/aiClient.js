import { aiConfig } from '../config';

class AIClient {
  constructor() {
    this.baseurl = aiConfig.baseurl;
    this.apiKey = aiConfig.apiKey;
    this.model = aiConfig.model;
  }

  // 兼容OpenAI的Chat Completions API
  async chat(messages, options = {}) {
    try {
      const response = await fetch(`${this.baseurl}/chat/completions`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${this.apiKey}`
        },
        body: JSON.stringify({
          model: this.model,
          messages,
          ...options
        })
      });
      
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error?.message || `API请求失败: ${response.status}`);
      }
      
      return await response.json();
    } catch (error) {
      console.error('AI接口调用失败:', error);
      throw error;
    }
  }

  // 兼容OpenAI的Completions API（旧版）
  async complete(prompt, options = {}) {
    try {
      const response = await fetch(`${this.baseurl}/completions`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${this.apiKey}`
        },
        body: JSON.stringify({
          model: this.model,
          prompt,
          ...options
        })
      });
      
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error?.message || `API请求失败: ${response.status}`);
      }
      
      return await response.json();
    } catch (error) {
      console.error('AI接口调用失败:', error);
      throw error;
    }
  }
}

export default new AIClient();