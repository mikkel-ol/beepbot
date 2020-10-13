import { GuildChannel } from './guildChannel';

export interface Guild {
    id: string;
    title: string;
    avatar: string;
    channels: Array<GuildChannel>
}