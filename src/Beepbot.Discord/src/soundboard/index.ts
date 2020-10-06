import * as Discord from 'discord.js';

class Soundboard {
    private static instance: Soundboard;
    private client: Discord.Client;

    private constructor(client: Discord.Client) {
        this.client = client;
    }

    public async play(audio: string, voiceChannelId: string) {
        const channel = await this.client.channels.fetch(voiceChannelId) as Discord.VoiceChannel;

        channel.join().then(connection => {
            connection.play(audio);
        })
    }

    public static init(client: Discord.Client) {
        Soundboard.instance = new Soundboard(client);
    }

    public static getInstance(): Soundboard {
        if (!Soundboard.instance) {
            throw new Error("Soundboard: Discord client not initialized");
        }

        return Soundboard.instance;
    }
}

export default Soundboard;