import OpenAI from 'openai';
import { gptConfig, validateConfig } from './config.js';

export class GPTService {
  private openai: OpenAI;

  constructor() {
    // Validate configuration before initializing
    validateConfig();
    
    this.openai = new OpenAI({
      apiKey: gptConfig.apiKey,
    });
  }

  /**
   * Send a text message to GPT and get Pluto's response
   * @param userText - The text message from the user
   * @returns Promise with GPT's response
   */
  async getResponse(userText: string) {
    try {
      const response = await this.openai.chat.completions.create({
        model: gptConfig.model,
        messages: [
          {
            role: 'system',
            content: gptConfig.systemPrompt
          },
          {
            role: 'user',
            content: userText
          }
        ],
        max_tokens: gptConfig.maxTokens,
        temperature: gptConfig.temperature,
        top_p: gptConfig.topP,
        frequency_penalty: gptConfig.frequencyPenalty,
        presence_penalty: gptConfig.presencePenalty,
      });

      const assistantMessage = response.choices[0]?.message?.content;
      
      if (!assistantMessage) {
        throw new Error('No response received from OpenAI');
      }
      console.log(assistantMessage);
    } catch (error) {
      console.error('Error calling OpenAI API:', error);
      
      if (error instanceof Error) {
        throw new Error(`GPT Service Error: ${error.message}`);
      }
      
      throw new Error('Unknown error occurred while calling GPT service');
    }
  }

  /**
   * Get streaming response from GPT (for future enhancement)
   * @param userText - The text message from the user
   * @returns AsyncGenerator for streaming responses
   */
  async *getStreamingResponse(userText: string): AsyncGenerator<string, void, unknown> {
    try {
      const stream = await this.openai.chat.completions.create({
        model: gptConfig.model,
        messages: [
          {
            role: 'system',
            content: gptConfig.systemPrompt
          },
          {
            role: 'user',
            content: userText
          }
        ],
        max_tokens: gptConfig.maxTokens,
        temperature: gptConfig.temperature,
        stream: true,
      });

      for await (const chunk of stream) {
        const content = chunk.choices[0]?.delta?.content;
        if (content) {
          yield content;
        }
      }
    } catch (error) {
      console.error('Error in streaming GPT response:', error);
      throw error;
    }
  }
}

// Export a singleton instance
export const gptService = new GPTService();