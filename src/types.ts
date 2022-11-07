import { StylesConfig } from "react-select";

export type SelectOption = {
  label: string;
  value: string;
  isDisabled: boolean;
};

export enum IgnoreType {
  nothing = 0,
  channel = 1,
  user = 2,
  all = 3
}

export const DiscordEvents = [
  {
    name: "messageEvents",
    displayName: "Message Events",
    description: "Message delete and update events.",
    type: IgnoreType.all
  },
  {
    name: "channelEvents",
    displayName: "Channel Events",
    description: "Channel create, delete and update events.",
    type: IgnoreType.all
  },
  {
    name: "userEvents",
    displayName: "User Events",
    description: "User avatar, role, name change events",
    type: IgnoreType.user
  },
  {
    name: "voicePresenceEvents",
    displayName: "Voice presence Events",
    description: "User voice channel join, leave and start streaming events.",
    type: IgnoreType.all
  },
  {
    name: "emojiEvents",
    displayName: "Emoji Events",
    description: "Emoji create, delete and update events.",
    type: IgnoreType.user
  },
  {
    name: "guildEvents",
    displayName: "Server Events",
    description: "Member ban, invite create and server settings change events.",
    type: IgnoreType.user
  },
];

export const multiSelectStyles = {
  control: (s) => ({
    ...s,
    background: "#4A5568",
    borderColor: "#718096",
    maxWidth: "450px",
  }),
  input: (s) => ({ ...s, color: "white" }),
  multiValue: (s) => ({ ...s, background: "#2D3748", borderColor: "#1A202C" }),
  multiValueLabel: (s) => ({ ...s, color: "" }),
  multiValueRemove: (provided, state) => ({
    ...provided,
    ":hover": { background: "#A0AEC0", color: "#2D3748" },
  }),
  placeholder: (s) => ({ ...s, color: "#A0AEC0" }),
  menu: (s) => ({ ...s, background: "#4A5568", color: "white", overflow:"visible" }),
  option: (provided, state) => ({
    ...provided,
    background: state.isDisabled
      ? "#2D3748"
      : state.isFocused
      ? "#718096"
      : state.isSelected
      ? "#4A5568"
      : "#4A5568",
    ":active": { ...provided[":active"], background: "#A0AEC0" },
  }),
} as StylesConfig;
