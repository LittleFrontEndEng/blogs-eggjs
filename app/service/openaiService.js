const Service = require('egg').Service;
const OpenAI = require('openai');

class OpenAIService extends Service {
  async* generateResponse(message) {
    try {
      const openai = new OpenAI({ api_key: this.app.config.OPENAI_KEYS });
      const completion = await openai.chat.completions.create({
        messages: [{ role: 'system', content: message }],
        model: 'gpt-3.5-turbo-1106',
        stream: true,
      });
      for await (const chunk of completion) {
        yield chunk.choices[0]?.delta;
      }
    } catch (error) {
      console.error('Error calling OpenAI API:', error);
      throw error;
    }
  }
}

module.exports = OpenAIService;
