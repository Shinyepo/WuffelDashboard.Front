import { LogObject } from "../generated/graphql";

const DiscordEvents = [
    {
      name: "messageEvents",
      displayName: "Message Events",
      description: "Message deleted and updated events.",
    },
    {
      name: "threadEvents",
      displayName: "Thread events",
      description: "Thread created, deleted and updated events.",
    },
    {
      name: "channelEvents",
      displayName: "Channel Events",
      description: "Channel created, deleted and updated events.",
    },
    {
      name: "roleEvents",
      displayName: "Role events",
      description: "Role created, deleted and updated events.",
    },
    {
      name: "emojiEvents",
      displayName: "Emoji Events",
      description: "Emoji created, deleted and updated events.",
    },
    {
      name: "guildBanEvents",
      displayName: "Guild bans and kicks Events",
      description: "Guild bans, unbans and kicks events.",
    },
    {
      name: "guildMemberEvents",
      displayName: "Guild member events",
      description:
        "Guild members avatar update, role update and nickname update events.",
    },
    {
      name: "guildTraffic",
      displayName: "Guild traffic events",
      description: "Guild members joined and left events.",
    },
    {
      name: "voiceEvents",
      displayName: "Voice presence events",
      description: "Guild members joined, left and started streaming events.",
    },
  ];

export const defaultLogs = async () => {
    const logs = [] as LogObject[];
    DiscordEvents.map((x,idx) => {
        logs.push({
            id: idx.toString(),
            name: x.name,
            on: false,
        })
    })
}