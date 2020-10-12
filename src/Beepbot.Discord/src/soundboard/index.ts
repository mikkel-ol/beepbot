import * as Discord from 'discord.js';
import axios from 'axios';
import * as memoize from 'memoizee';

export class Soundboard {
  private static instance: Soundboard;
  private client: Discord.Client;

  private constructor(client: Discord.Client) {
    this.client = client;
  }

  public async play(voiceChannelId: string, audio: string) {
    const channel = (await this.client.channels.fetch(
      voiceChannelId,
    )) as Discord.VoiceChannel;

    const cached = memoize(axios.get, {
      promise: true,
      maxAge: 10 * 60 * 1000,
    }); // 10 min

    channel.join().then(async (connection) => {
      const cachedAudioStream = (
        await cached(audio, { responseType: 'stream' })
      ).data;

      connection.play(cachedAudioStream);
    });
  }

  public static init(client: Discord.Client) {
    Soundboard.instance = new Soundboard(client);
  }

  public static getInstance(): Soundboard {
    if (!Soundboard.instance) {
      throw new Error('Soundboard: Discord client not initialized');
    }

    return Soundboard.instance;
  }
}
