import gql from 'graphql-tag';
import * as Urql from 'urql';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type MakeEmpty<T extends { [key: string]: unknown }, K extends keyof T> = { [_ in K]?: never };
export type Incremental<T> = T | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never };
export type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>;
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string; }
  String: { input: string; output: string; }
  Boolean: { input: boolean; output: boolean; }
  Int: { input: number; output: number; }
  Float: { input: number; output: number; }
  DateTimeISO: { input: any; output: any; }
};

export type DiscordChannelSelectList = {
  __typename?: 'DiscordChannelSelectList';
  channels?: Maybe<Array<DiscordChannelSelectList>>;
  guild_id?: Maybe<Scalars['String']['output']>;
  id: Scalars['String']['output'];
  name?: Maybe<Scalars['String']['output']>;
  parent_id?: Maybe<Scalars['String']['output']>;
  position?: Maybe<Scalars['Float']['output']>;
  type?: Maybe<Scalars['Float']['output']>;
};

export type DiscordGuilds = {
  __typename?: 'DiscordGuilds';
  features: Array<Scalars['String']['output']>;
  icon?: Maybe<Scalars['String']['output']>;
  id: Scalars['String']['output'];
  in: Scalars['Boolean']['output'];
  name: Scalars['String']['output'];
  owner: Scalars['Boolean']['output'];
  permissions: Scalars['String']['output'];
  permissions_new: Scalars['String']['output'];
};

export type GetDiscordMembersResult = {
  __typename?: 'GetDiscordMembersResult';
  discriminator: Scalars['String']['output'];
  id: Scalars['String']['output'];
  nick?: Maybe<Scalars['String']['output']>;
  permissions?: Maybe<Scalars['String']['output']>;
  username: Scalars['String']['output'];
};

export type GuildTraffic = {
  __typename?: 'GuildTraffic';
  createdAt: Scalars['DateTimeISO']['output'];
  guildId: Scalars['String']['output'];
  id: Scalars['Float']['output'];
  joined: Scalars['Boolean']['output'];
  nickname?: Maybe<Scalars['String']['output']>;
  userId: Scalars['String']['output'];
  username?: Maybe<Scalars['String']['output']>;
};

export type IgnoredLogObject = {
  __typename?: 'IgnoredLogObject';
  channels?: Maybe<Array<Scalars['String']['output']>>;
  users?: Maybe<Array<Scalars['String']['output']>>;
};

export type IgnoredLogObjectInput = {
  channels?: InputMaybe<Array<Scalars['String']['input']>>;
  users?: InputMaybe<Array<Scalars['String']['input']>>;
};

export type LogActivity = {
  __typename?: 'LogActivity';
  activity: Scalars['String']['output'];
  activityType: Scalars['Boolean']['output'];
  createdAt: Scalars['DateTimeISO']['output'];
  guildId: Scalars['String']['output'];
  id: Scalars['Float']['output'];
  userId: Scalars['String']['output'];
  username: Scalars['String']['output'];
};

export type LogObject = {
  __typename?: 'LogObject';
  channel?: Maybe<Scalars['String']['output']>;
  id: Scalars['Float']['output'];
  ignored?: Maybe<IgnoredLogObject>;
  name: Scalars['String']['output'];
  on: Scalars['Boolean']['output'];
};

export type LogSettings = {
  __typename?: 'LogSettings';
  createdAt: Scalars['String']['output'];
  guildId: Scalars['String']['output'];
  id: Scalars['Float']['output'];
  settings?: Maybe<Array<LogObject>>;
  updatedAt: Scalars['String']['output'];
};

export type Mutation = {
  __typename?: 'Mutation';
  grantGuildPrivilege: PrivilegedMembers;
  logout: Scalars['Boolean']['output'];
  removeRanking: RrResponse;
  revokeGuildPrivilege: Scalars['Boolean']['output'];
  setIgnoredSettings: Scalars['Boolean']['output'];
  setLogSettings: Scalars['Boolean']['output'];
  toggleBot: Scalars['Boolean']['output'];
};


export type MutationGrantGuildPrivilegeArgs = {
  guildId: Scalars['String']['input'];
  user: PrivilegedUserArg;
};


export type MutationRemoveRankingArgs = {
  guildId: Scalars['String']['input'];
  id: Scalars['String']['input'];
};


export type MutationRevokeGuildPrivilegeArgs = {
  guildId: Scalars['String']['input'];
  userId: Scalars['String']['input'];
};


export type MutationSetIgnoredSettingsArgs = {
  event: Scalars['String']['input'];
  guildId: Scalars['String']['input'];
  settings: IgnoredLogObjectInput;
};


export type MutationSetLogSettingsArgs = {
  guildId: Scalars['String']['input'];
  settings: Array<SettingsArgumentType>;
};


export type MutationToggleBotArgs = {
  guildId: Scalars['String']['input'];
  state: Scalars['Boolean']['input'];
};

export type PrivilegedMembers = {
  __typename?: 'PrivilegedMembers';
  guildId: Scalars['String']['output'];
  users: Array<PrivilegedUser>;
};

export type PrivilegedUser = {
  __typename?: 'PrivilegedUser';
  nick?: Maybe<Scalars['String']['output']>;
  userId: Scalars['String']['output'];
  username: Scalars['String']['output'];
};

export type PrivilegedUserArg = {
  nick?: InputMaybe<Scalars['String']['input']>;
  userId: Scalars['String']['input'];
  username: Scalars['String']['input'];
};

export type Query = {
  __typename?: 'Query';
  currGuild?: Maybe<Settings>;
  getActivity: Array<LogActivity>;
  getGuildChannels?: Maybe<Array<DiscordChannelSelectList>>;
  getGuildMembers?: Maybe<Array<GetDiscordMembersResult>>;
  getLogSettings: LogSettings;
  getPrivilegedMembers: PrivilegedMembers;
  guildTraffic?: Maybe<Array<GuildTraffic>>;
  guilds?: Maybe<Array<DiscordGuilds>>;
  logoutUser: Scalars['Boolean']['output'];
  me?: Maybe<Users>;
  streamerRanking?: Maybe<Array<StreamLeaderboard>>;
};


export type QueryCurrGuildArgs = {
  guildId: Scalars['String']['input'];
};


export type QueryGetActivityArgs = {
  guildId: Scalars['String']['input'];
};


export type QueryGetGuildChannelsArgs = {
  guildId: Scalars['String']['input'];
};


export type QueryGetGuildMembersArgs = {
  guildId: Scalars['String']['input'];
};


export type QueryGetLogSettingsArgs = {
  guildId: Scalars['String']['input'];
};


export type QueryGetPrivilegedMembersArgs = {
  guildId: Scalars['String']['input'];
};


export type QueryGuildTrafficArgs = {
  guildId: Scalars['String']['input'];
};


export type QueryStreamerRankingArgs = {
  guildId: Scalars['String']['input'];
};

export type Settings = {
  __typename?: 'Settings';
  active: Scalars['Boolean']['output'];
  adminRole?: Maybe<Scalars['String']['output']>;
  cleanup?: Maybe<Scalars['Boolean']['output']>;
  disabledCommands?: Maybe<Scalars['String']['output']>;
  guildId: Scalars['String']['output'];
  guildRole: Scalars['String']['output'];
  id: Scalars['Float']['output'];
  modRole?: Maybe<Scalars['String']['output']>;
  muteRole?: Maybe<Scalars['String']['output']>;
  prefix: Scalars['String']['output'];
  systemNotice?: Maybe<Scalars['Boolean']['output']>;
  userCount: Scalars['String']['output'];
};

export type StreamLeaderboard = {
  __typename?: 'StreamLeaderboard';
  createdAt: Scalars['String']['output'];
  guildId: Scalars['String']['output'];
  id: Scalars['Float']['output'];
  nickname?: Maybe<Scalars['String']['output']>;
  timeStreamed: Scalars['String']['output'];
  updatedAt: Scalars['String']['output'];
  userId: Scalars['String']['output'];
  username: Scalars['String']['output'];
};

export type Users = {
  __typename?: 'Users';
  accent_color: Scalars['Float']['output'];
  avatar: Scalars['String']['output'];
  banner: Scalars['String']['output'];
  banner_color: Scalars['Float']['output'];
  createdAt: Scalars['String']['output'];
  discriminator: Scalars['String']['output'];
  email: Scalars['String']['output'];
  flags: Scalars['Float']['output'];
  guilds?: Maybe<Array<DiscordGuilds>>;
  id: Scalars['Float']['output'];
  locale: Scalars['String']['output'];
  mfa_enabled: Scalars['Boolean']['output'];
  premium_type?: Maybe<Scalars['Float']['output']>;
  public_flags: Scalars['Float']['output'];
  updatedAt: Scalars['String']['output'];
  userId: Scalars['String']['output'];
  username: Scalars['String']['output'];
  verified: Scalars['Boolean']['output'];
};

export type RrResponse = {
  __typename?: 'rrResponse';
  id: Scalars['String']['output'];
  success: Scalars['Boolean']['output'];
};

export type SettingsArgumentType = {
  channel?: InputMaybe<Scalars['String']['input']>;
  id: Scalars['Float']['input'];
  ignored?: InputMaybe<IgnoredLogObjectInput>;
  name: Scalars['String']['input'];
  on: Scalars['Boolean']['input'];
};

export type GrantGuildPrivilegeMutationVariables = Exact<{
  guildId: Scalars['String']['input'];
  user: PrivilegedUserArg;
}>;


export type GrantGuildPrivilegeMutation = { __typename?: 'Mutation', grantGuildPrivilege: { __typename?: 'PrivilegedMembers', guildId: string, users: Array<{ __typename?: 'PrivilegedUser', username: string, userId: string, nick?: string | null }> } };

export type LogoutMutationVariables = Exact<{ [key: string]: never; }>;


export type LogoutMutation = { __typename?: 'Mutation', logout: boolean };

export type RemoveRankingMutationVariables = Exact<{
  id: Scalars['String']['input'];
  guildId: Scalars['String']['input'];
}>;


export type RemoveRankingMutation = { __typename?: 'Mutation', removeRanking: { __typename?: 'rrResponse', success: boolean, id: string } };

export type RevokeGuildPrivilegeMutationVariables = Exact<{
  gid: Scalars['String']['input'];
  userId: Scalars['String']['input'];
}>;


export type RevokeGuildPrivilegeMutation = { __typename?: 'Mutation', revokeGuildPrivilege: boolean };

export type SetIgnoredSettingsMutationVariables = Exact<{
  id: Scalars['String']['input'];
  event: Scalars['String']['input'];
  settings: IgnoredLogObjectInput;
}>;


export type SetIgnoredSettingsMutation = { __typename?: 'Mutation', setIgnoredSettings: boolean };

export type SetLogSettingsMutationVariables = Exact<{
  settings: Array<SettingsArgumentType> | SettingsArgumentType;
  gid: Scalars['String']['input'];
}>;


export type SetLogSettingsMutation = { __typename?: 'Mutation', setLogSettings: boolean };

export type ToggleBotMutationVariables = Exact<{
  id: Scalars['String']['input'];
  state: Scalars['Boolean']['input'];
}>;


export type ToggleBotMutation = { __typename?: 'Mutation', toggleBot: boolean };

export type CurrGuildQueryVariables = Exact<{
  gid: Scalars['String']['input'];
}>;


export type CurrGuildQuery = { __typename?: 'Query', currGuild?: { __typename?: 'Settings', id: number, guildId: string, prefix: string, userCount: string, modRole?: string | null, adminRole?: string | null, muteRole?: string | null, disabledCommands?: string | null, systemNotice?: boolean | null, cleanup?: boolean | null, active: boolean } | null };

export type GetActivityQueryVariables = Exact<{
  id: Scalars['String']['input'];
}>;


export type GetActivityQuery = { __typename?: 'Query', getActivity: Array<{ __typename?: 'LogActivity', id: number, userId: string, username: string, activity: string, activityType: boolean, createdAt: any }> };

export type GetGuildChannelsQueryVariables = Exact<{
  gid: Scalars['String']['input'];
}>;


export type GetGuildChannelsQuery = { __typename?: 'Query', getGuildChannels?: Array<{ __typename?: 'DiscordChannelSelectList', id: string, type?: number | null, name?: string | null, position?: number | null, parent_id?: string | null, guild_id?: string | null, channels?: Array<{ __typename?: 'DiscordChannelSelectList', id: string, type?: number | null, name?: string | null, position?: number | null, parent_id?: string | null, guild_id?: string | null }> | null }> | null };

export type GetGuildMembersQueryVariables = Exact<{
  gid: Scalars['String']['input'];
}>;


export type GetGuildMembersQuery = { __typename?: 'Query', getGuildMembers?: Array<{ __typename?: 'GetDiscordMembersResult', id: string, nick?: string | null, username: string, discriminator: string }> | null };

export type GetLogSettingsQueryVariables = Exact<{
  gid: Scalars['String']['input'];
}>;


export type GetLogSettingsQuery = { __typename?: 'Query', getLogSettings: { __typename?: 'LogSettings', id: number, guildId: string, updatedAt: string, settings?: Array<{ __typename?: 'LogObject', id: number, name: string, on: boolean, channel?: string | null, ignored?: { __typename?: 'IgnoredLogObject', users?: Array<string> | null, channels?: Array<string> | null } | null }> | null } };

export type GetPrivilegedMembersQueryVariables = Exact<{
  gid: Scalars['String']['input'];
}>;


export type GetPrivilegedMembersQuery = { __typename?: 'Query', getPrivilegedMembers: { __typename?: 'PrivilegedMembers', guildId: string, users: Array<{ __typename?: 'PrivilegedUser', username: string, userId: string, nick?: string | null }> } };

export type GuildTrafficQueryVariables = Exact<{
  gid: Scalars['String']['input'];
}>;


export type GuildTrafficQuery = { __typename?: 'Query', guildTraffic?: Array<{ __typename?: 'GuildTraffic', id: number, guildId: string, userId: string, username?: string | null, nickname?: string | null, joined: boolean, createdAt: any }> | null };

export type GetGuildsQueryVariables = Exact<{ [key: string]: never; }>;


export type GetGuildsQuery = { __typename?: 'Query', guilds?: Array<{ __typename?: 'DiscordGuilds', id: string, name: string, icon?: string | null, owner: boolean, permissions: string, permissions_new: string, features: Array<string>, in: boolean }> | null };

export type MeQueryVariables = Exact<{ [key: string]: never; }>;


export type MeQuery = { __typename?: 'Query', me?: { __typename?: 'Users', userId: string, username: string, avatar: string, discriminator: string, locale: string, premium_type?: number | null, email: string } | null };

export type StreamerRankingQueryVariables = Exact<{
  gid: Scalars['String']['input'];
}>;


export type StreamerRankingQuery = { __typename?: 'Query', streamerRanking?: Array<{ __typename?: 'StreamLeaderboard', id: number, userId: string, guildId: string, username: string, nickname?: string | null, timeStreamed: string, updatedAt: string, createdAt: string }> | null };


export const GrantGuildPrivilegeDocument = gql`
    mutation grantGuildPrivilege($guildId: String!, $user: PrivilegedUserArg!) {
  grantGuildPrivilege(guildId: $guildId, user: $user) {
    guildId
    users {
      username
      userId
      nick
    }
  }
}
    `;

export function useGrantGuildPrivilegeMutation() {
  return Urql.useMutation<GrantGuildPrivilegeMutation, GrantGuildPrivilegeMutationVariables>(GrantGuildPrivilegeDocument);
};
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
export const RevokeGuildPrivilegeDocument = gql`
    mutation revokeGuildPrivilege($gid: String!, $userId: String!) {
  revokeGuildPrivilege(guildId: $gid, userId: $userId)
}
    `;

export function useRevokeGuildPrivilegeMutation() {
  return Urql.useMutation<RevokeGuildPrivilegeMutation, RevokeGuildPrivilegeMutationVariables>(RevokeGuildPrivilegeDocument);
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

export function useCurrGuildQuery(options: Omit<Urql.UseQueryArgs<CurrGuildQueryVariables>, 'query'>) {
  return Urql.useQuery<CurrGuildQuery, CurrGuildQueryVariables>({ query: CurrGuildDocument, ...options });
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

export function useGetActivityQuery(options: Omit<Urql.UseQueryArgs<GetActivityQueryVariables>, 'query'>) {
  return Urql.useQuery<GetActivityQuery, GetActivityQueryVariables>({ query: GetActivityDocument, ...options });
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

export function useGetGuildChannelsQuery(options: Omit<Urql.UseQueryArgs<GetGuildChannelsQueryVariables>, 'query'>) {
  return Urql.useQuery<GetGuildChannelsQuery, GetGuildChannelsQueryVariables>({ query: GetGuildChannelsDocument, ...options });
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

export function useGetGuildMembersQuery(options: Omit<Urql.UseQueryArgs<GetGuildMembersQueryVariables>, 'query'>) {
  return Urql.useQuery<GetGuildMembersQuery, GetGuildMembersQueryVariables>({ query: GetGuildMembersDocument, ...options });
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

export function useGetLogSettingsQuery(options: Omit<Urql.UseQueryArgs<GetLogSettingsQueryVariables>, 'query'>) {
  return Urql.useQuery<GetLogSettingsQuery, GetLogSettingsQueryVariables>({ query: GetLogSettingsDocument, ...options });
};
export const GetPrivilegedMembersDocument = gql`
    query getPrivilegedMembers($gid: String!) {
  getPrivilegedMembers(guildId: $gid) {
    guildId
    users {
      username
      userId
      nick
    }
  }
}
    `;

export function useGetPrivilegedMembersQuery(options: Omit<Urql.UseQueryArgs<GetPrivilegedMembersQueryVariables>, 'query'>) {
  return Urql.useQuery<GetPrivilegedMembersQuery, GetPrivilegedMembersQueryVariables>({ query: GetPrivilegedMembersDocument, ...options });
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

export function useGuildTrafficQuery(options: Omit<Urql.UseQueryArgs<GuildTrafficQueryVariables>, 'query'>) {
  return Urql.useQuery<GuildTrafficQuery, GuildTrafficQueryVariables>({ query: GuildTrafficDocument, ...options });
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

export function useGetGuildsQuery(options?: Omit<Urql.UseQueryArgs<GetGuildsQueryVariables>, 'query'>) {
  return Urql.useQuery<GetGuildsQuery, GetGuildsQueryVariables>({ query: GetGuildsDocument, ...options });
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

export function useMeQuery(options?: Omit<Urql.UseQueryArgs<MeQueryVariables>, 'query'>) {
  return Urql.useQuery<MeQuery, MeQueryVariables>({ query: MeDocument, ...options });
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

export function useStreamerRankingQuery(options: Omit<Urql.UseQueryArgs<StreamerRankingQueryVariables>, 'query'>) {
  return Urql.useQuery<StreamerRankingQuery, StreamerRankingQueryVariables>({ query: StreamerRankingDocument, ...options });
};