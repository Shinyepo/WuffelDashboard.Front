import gql from 'graphql-tag';
import * as Urql from 'urql';
export type Maybe<T> = T | null;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>;
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  /** The javascript `Date` as string. Type represents date and time as the ISO Date string. */
  DateTime: any;
};

export type DiscordChannelSelectList = {
  __typename?: 'DiscordChannelSelectList';
  channels?: Maybe<Array<DiscordChannelSelectList>>;
  guild_id?: Maybe<Scalars['String']>;
  id: Scalars['String'];
  name?: Maybe<Scalars['String']>;
  parent_id?: Maybe<Scalars['String']>;
  position?: Maybe<Scalars['Float']>;
  type?: Maybe<Scalars['Float']>;
};

export type DiscordGuilds = {
  __typename?: 'DiscordGuilds';
  features: Array<Scalars['String']>;
  icon?: Maybe<Scalars['String']>;
  id: Scalars['String'];
  in?: Maybe<Scalars['Boolean']>;
  name: Scalars['String'];
  owner: Scalars['Boolean'];
  permissions: Scalars['String'];
  permissions_new: Scalars['String'];
};

export type GetDiscordMembersResult = {
  __typename?: 'GetDiscordMembersResult';
  discriminator: Scalars['String'];
  id: Scalars['String'];
  nick: Scalars['String'];
  username: Scalars['String'];
};

export type GuildTraffic = {
  __typename?: 'GuildTraffic';
  createdAt: Scalars['DateTime'];
  guildId: Scalars['String'];
  id: Scalars['Float'];
  joined: Scalars['Boolean'];
  nickname?: Maybe<Scalars['String']>;
  userId: Scalars['String'];
  username?: Maybe<Scalars['String']>;
};

export type IgnoredLogObject = {
  __typename?: 'IgnoredLogObject';
  channels?: Maybe<Array<Scalars['String']>>;
  users?: Maybe<Array<Scalars['String']>>;
};

export type IgnoredLogObjectInput = {
  channels?: Maybe<Array<Scalars['String']>>;
  users?: Maybe<Array<Scalars['String']>>;
};

export type LogActivity = {
  __typename?: 'LogActivity';
  activity: Scalars['String'];
  activityType: Scalars['Boolean'];
  createdAt: Scalars['DateTime'];
  guildId: Scalars['String'];
  id: Scalars['Float'];
  userId: Scalars['String'];
  username: Scalars['String'];
};

export type LogObject = {
  __typename?: 'LogObject';
  channel?: Maybe<Scalars['String']>;
  id: Scalars['Float'];
  ignored?: Maybe<IgnoredLogObject>;
  name: Scalars['String'];
  on: Scalars['Boolean'];
};

export type LogSettings = {
  __typename?: 'LogSettings';
  createdAt: Scalars['String'];
  guildId: Scalars['String'];
  id: Scalars['Float'];
  settings?: Maybe<Array<LogObject>>;
  updatedAt: Scalars['String'];
};

export type Mutation = {
  __typename?: 'Mutation';
  logout: Scalars['Boolean'];
  removeRanking: RrResponse;
  setIgnoredSettings: Scalars['Boolean'];
  setLogSettings: Scalars['Boolean'];
  toggleBot: Scalars['Boolean'];
};


export type MutationRemoveRankingArgs = {
  guildId: Scalars['String'];
  id: Scalars['String'];
};


export type MutationSetIgnoredSettingsArgs = {
  event: Scalars['String'];
  guildId: Scalars['String'];
  settings: IgnoredLogObjectInput;
};


export type MutationSetLogSettingsArgs = {
  guildId: Scalars['String'];
  settings: Array<SettingsArgumentType>;
};


export type MutationToggleBotArgs = {
  guildId: Scalars['String'];
  state: Scalars['Boolean'];
};

export type Query = {
  __typename?: 'Query';
  currGuild?: Maybe<Settings>;
  getActivity: Array<LogActivity>;
  getGuildChannels?: Maybe<Array<DiscordChannelSelectList>>;
  getGuildMembers?: Maybe<Array<GetDiscordMembersResult>>;
  getLogSettings: LogSettings;
  guildTraffic?: Maybe<Array<GuildTraffic>>;
  guilds?: Maybe<Array<DiscordGuilds>>;
  logoutUser: Scalars['Boolean'];
  me?: Maybe<Users>;
  streamerRanking?: Maybe<Array<StreamLeaderboard>>;
};


export type QueryCurrGuildArgs = {
  guildId: Scalars['String'];
};


export type QueryGetActivityArgs = {
  guildId: Scalars['String'];
};


export type QueryGetGuildChannelsArgs = {
  guildId: Scalars['String'];
};


export type QueryGetGuildMembersArgs = {
  guildId: Scalars['String'];
};


export type QueryGetLogSettingsArgs = {
  guildId: Scalars['String'];
};


export type QueryGuildTrafficArgs = {
  guildId: Scalars['String'];
};


export type QueryStreamerRankingArgs = {
  guildId: Scalars['String'];
};

export type Settings = {
  __typename?: 'Settings';
  active: Scalars['Boolean'];
  adminRole?: Maybe<Scalars['String']>;
  cleanup?: Maybe<Scalars['Boolean']>;
  disabledCommands?: Maybe<Scalars['String']>;
  guildId: Scalars['String'];
  guildRole: Scalars['String'];
  id: Scalars['Float'];
  modRole?: Maybe<Scalars['String']>;
  muteRole?: Maybe<Scalars['String']>;
  prefix: Scalars['String'];
  systemNotice?: Maybe<Scalars['Boolean']>;
  userCount: Scalars['String'];
};

export type StreamLeaderboard = {
  __typename?: 'StreamLeaderboard';
  createdAt: Scalars['String'];
  guildId: Scalars['String'];
  id: Scalars['Float'];
  nickname?: Maybe<Scalars['String']>;
  timeStreamed: Scalars['String'];
  updatedAt: Scalars['String'];
  userId: Scalars['String'];
  username: Scalars['String'];
};

export type Users = {
  __typename?: 'Users';
  accent_color: Scalars['Float'];
  avatar: Scalars['String'];
  banner: Scalars['String'];
  banner_color: Scalars['Float'];
  createdAt: Scalars['String'];
  discriminator: Scalars['String'];
  email: Scalars['String'];
  flags: Scalars['Float'];
  guilds?: Maybe<Array<DiscordGuilds>>;
  id: Scalars['Float'];
  locale: Scalars['String'];
  mfa_enabled: Scalars['Boolean'];
  premium_type?: Maybe<Scalars['Float']>;
  public_flags: Scalars['Float'];
  updatedAt: Scalars['String'];
  userId: Scalars['String'];
  username: Scalars['String'];
  verified: Scalars['Boolean'];
};

export type RrResponse = {
  __typename?: 'rrResponse';
  id: Scalars['String'];
  success: Scalars['Boolean'];
};

export type SettingsArgumentType = {
  channel?: Maybe<Scalars['String']>;
  id: Scalars['Float'];
  ignored?: Maybe<IgnoredLogObjectInput>;
  name: Scalars['String'];
  on: Scalars['Boolean'];
};

export type LogoutMutationVariables = Exact<{ [key: string]: never; }>;


export type LogoutMutation = { __typename?: 'Mutation', logout: boolean };

export type RemoveRankingMutationVariables = Exact<{
  id: Scalars['String'];
  guildId: Scalars['String'];
}>;


export type RemoveRankingMutation = { __typename?: 'Mutation', removeRanking: { __typename?: 'rrResponse', success: boolean, id: string } };

export type SetIgnoredSettingsMutationVariables = Exact<{
  id: Scalars['String'];
  event: Scalars['String'];
  settings: IgnoredLogObjectInput;
}>;


export type SetIgnoredSettingsMutation = { __typename?: 'Mutation', setIgnoredSettings: boolean };

export type SetLogSettingsMutationVariables = Exact<{
  settings: Array<SettingsArgumentType> | SettingsArgumentType;
  gid: Scalars['String'];
}>;


export type SetLogSettingsMutation = { __typename?: 'Mutation', setLogSettings: boolean };

export type ToggleBotMutationVariables = Exact<{
  id: Scalars['String'];
  state: Scalars['Boolean'];
}>;


export type ToggleBotMutation = { __typename?: 'Mutation', toggleBot: boolean };

export type CurrGuildQueryVariables = Exact<{
  gid: Scalars['String'];
}>;


export type CurrGuildQuery = { __typename?: 'Query', currGuild?: { __typename?: 'Settings', id: number, guildId: string, prefix: string, userCount: string, modRole?: string | null | undefined, adminRole?: string | null | undefined, muteRole?: string | null | undefined, disabledCommands?: string | null | undefined, systemNotice?: boolean | null | undefined, cleanup?: boolean | null | undefined, active: boolean } | null | undefined };

export type GetActivityQueryVariables = Exact<{
  id: Scalars['String'];
}>;


export type GetActivityQuery = { __typename?: 'Query', getActivity: Array<{ __typename?: 'LogActivity', id: number, userId: string, username: string, activity: string, activityType: boolean, createdAt: any }> };

export type GetGuildChannelsQueryVariables = Exact<{
  gid: Scalars['String'];
}>;


export type GetGuildChannelsQuery = { __typename?: 'Query', getGuildChannels?: Array<{ __typename?: 'DiscordChannelSelectList', id: string, type?: number | null | undefined, name?: string | null | undefined, position?: number | null | undefined, parent_id?: string | null | undefined, guild_id?: string | null | undefined, channels?: Array<{ __typename?: 'DiscordChannelSelectList', id: string, type?: number | null | undefined, name?: string | null | undefined, position?: number | null | undefined, parent_id?: string | null | undefined, guild_id?: string | null | undefined }> | null | undefined }> | null | undefined };

export type GetGuildMembersQueryVariables = Exact<{
  gid: Scalars['String'];
}>;


export type GetGuildMembersQuery = { __typename?: 'Query', getGuildMembers?: Array<{ __typename?: 'GetDiscordMembersResult', id: string, nick: string, username: string, discriminator: string }> | null | undefined };

export type GetLogSettingsQueryVariables = Exact<{
  gid: Scalars['String'];
}>;


export type GetLogSettingsQuery = { __typename?: 'Query', getLogSettings: { __typename?: 'LogSettings', id: number, guildId: string, updatedAt: string, settings?: Array<{ __typename?: 'LogObject', id: number, name: string, on: boolean, channel?: string | null | undefined, ignored?: { __typename?: 'IgnoredLogObject', users?: Array<string> | null | undefined, channels?: Array<string> | null | undefined } | null | undefined }> | null | undefined } };

export type GuildTrafficQueryVariables = Exact<{
  gid: Scalars['String'];
}>;


export type GuildTrafficQuery = { __typename?: 'Query', guildTraffic?: Array<{ __typename?: 'GuildTraffic', id: number, guildId: string, userId: string, username?: string | null | undefined, nickname?: string | null | undefined, joined: boolean, createdAt: any }> | null | undefined };

export type GetGuildsQueryVariables = Exact<{ [key: string]: never; }>;


export type GetGuildsQuery = { __typename?: 'Query', guilds?: Array<{ __typename?: 'DiscordGuilds', id: string, name: string, icon?: string | null | undefined, owner: boolean, permissions: string, permissions_new: string, features: Array<string>, in?: boolean | null | undefined }> | null | undefined };

export type MeQueryVariables = Exact<{ [key: string]: never; }>;


export type MeQuery = { __typename?: 'Query', me?: { __typename?: 'Users', userId: string, username: string, avatar: string, discriminator: string, locale: string, premium_type?: number | null | undefined, email: string } | null | undefined };

export type StreamerRankingQueryVariables = Exact<{
  gid: Scalars['String'];
}>;


export type StreamerRankingQuery = { __typename?: 'Query', streamerRanking?: Array<{ __typename?: 'StreamLeaderboard', id: number, userId: string, guildId: string, username: string, nickname?: string | null | undefined, timeStreamed: string, updatedAt: string, createdAt: string }> | null | undefined };


export const LogoutDocument = gql`
    mutation logout {
  logout
}
    `;

export function useLogoutMutation() {
  return Urql.useMutation<LogoutMutation, LogoutMutationVariables>(LogoutDocument);
};
export const RemoveRankingDocument = gql`
    mutation removeRanking($id: String!, $guildId: String!) {
  removeRanking(id: $id, guildId: $guildId) {
    success
    id
  }
}
    `;

export function useRemoveRankingMutation() {
  return Urql.useMutation<RemoveRankingMutation, RemoveRankingMutationVariables>(RemoveRankingDocument);
};
export const SetIgnoredSettingsDocument = gql`
    mutation setIgnoredSettings($id: String!, $event: String!, $settings: IgnoredLogObjectInput!) {
  setIgnoredSettings(guildId: $id, event: $event, settings: $settings)
}
    `;

export function useSetIgnoredSettingsMutation() {
  return Urql.useMutation<SetIgnoredSettingsMutation, SetIgnoredSettingsMutationVariables>(SetIgnoredSettingsDocument);
};
export const SetLogSettingsDocument = gql`
    mutation setLogSettings($settings: [settingsArgumentType!]!, $gid: String!) {
  setLogSettings(guildId: $gid, settings: $settings)
}
    `;

export function useSetLogSettingsMutation() {
  return Urql.useMutation<SetLogSettingsMutation, SetLogSettingsMutationVariables>(SetLogSettingsDocument);
};
export const ToggleBotDocument = gql`
    mutation toggleBot($id: String!, $state: Boolean!) {
  toggleBot(guildId: $id, state: $state)
}
    `;

export function useToggleBotMutation() {
  return Urql.useMutation<ToggleBotMutation, ToggleBotMutationVariables>(ToggleBotDocument);
};
export const CurrGuildDocument = gql`
    query currGuild($gid: String!) {
  currGuild(guildId: $gid) {
    id
    guildId
    prefix
    userCount
    modRole
    adminRole
    muteRole
    disabledCommands
    systemNotice
    cleanup
    active
  }
}
    `;

export function useCurrGuildQuery(options: Omit<Urql.UseQueryArgs<CurrGuildQueryVariables>, 'query'> = {}) {
  return Urql.useQuery<CurrGuildQuery>({ query: CurrGuildDocument, ...options });
};
export const GetActivityDocument = gql`
    query getActivity($id: String!) {
  getActivity(guildId: $id) {
    id
    userId
    username
    activity
    activityType
    createdAt
  }
}
    `;

export function useGetActivityQuery(options: Omit<Urql.UseQueryArgs<GetActivityQueryVariables>, 'query'> = {}) {
  return Urql.useQuery<GetActivityQuery>({ query: GetActivityDocument, ...options });
};
export const GetGuildChannelsDocument = gql`
    query getGuildChannels($gid: String!) {
  getGuildChannels(guildId: $gid) {
    id
    type
    name
    position
    parent_id
    guild_id
    channels {
      id
      type
      name
      position
      parent_id
      guild_id
    }
  }
}
    `;

export function useGetGuildChannelsQuery(options: Omit<Urql.UseQueryArgs<GetGuildChannelsQueryVariables>, 'query'> = {}) {
  return Urql.useQuery<GetGuildChannelsQuery>({ query: GetGuildChannelsDocument, ...options });
};
export const GetGuildMembersDocument = gql`
    query getGuildMembers($gid: String!) {
  getGuildMembers(guildId: $gid) {
    id
    nick
    username
    discriminator
  }
}
    `;

export function useGetGuildMembersQuery(options: Omit<Urql.UseQueryArgs<GetGuildMembersQueryVariables>, 'query'> = {}) {
  return Urql.useQuery<GetGuildMembersQuery>({ query: GetGuildMembersDocument, ...options });
};
export const GetLogSettingsDocument = gql`
    query getLogSettings($gid: String!) {
  getLogSettings(guildId: $gid) {
    id
    guildId
    settings {
      id
      name
      on
      channel
      ignored {
        users
        channels
      }
    }
    updatedAt
  }
}
    `;

export function useGetLogSettingsQuery(options: Omit<Urql.UseQueryArgs<GetLogSettingsQueryVariables>, 'query'> = {}) {
  return Urql.useQuery<GetLogSettingsQuery>({ query: GetLogSettingsDocument, ...options });
};
export const GuildTrafficDocument = gql`
    query guildTraffic($gid: String!) {
  guildTraffic(guildId: $gid) {
    id
    guildId
    userId
    username
    nickname
    joined
    createdAt
  }
}
    `;

export function useGuildTrafficQuery(options: Omit<Urql.UseQueryArgs<GuildTrafficQueryVariables>, 'query'> = {}) {
  return Urql.useQuery<GuildTrafficQuery>({ query: GuildTrafficDocument, ...options });
};
export const GetGuildsDocument = gql`
    query getGuilds {
  guilds {
    id
    name
    icon
    owner
    permissions
    permissions_new
    features
    in
  }
}
    `;

export function useGetGuildsQuery(options: Omit<Urql.UseQueryArgs<GetGuildsQueryVariables>, 'query'> = {}) {
  return Urql.useQuery<GetGuildsQuery>({ query: GetGuildsDocument, ...options });
};
export const MeDocument = gql`
    query Me {
  me {
    userId
    username
    avatar
    discriminator
    locale
    premium_type
    email
  }
}
    `;

export function useMeQuery(options: Omit<Urql.UseQueryArgs<MeQueryVariables>, 'query'> = {}) {
  return Urql.useQuery<MeQuery>({ query: MeDocument, ...options });
};
export const StreamerRankingDocument = gql`
    query streamerRanking($gid: String!) {
  streamerRanking(guildId: $gid) {
    id
    userId
    guildId
    username
    nickname
    timeStreamed
    updatedAt
    createdAt
  }
}
    `;

export function useStreamerRankingQuery(options: Omit<Urql.UseQueryArgs<StreamerRankingQueryVariables>, 'query'> = {}) {
  return Urql.useQuery<StreamerRankingQuery>({ query: StreamerRankingDocument, ...options });
};