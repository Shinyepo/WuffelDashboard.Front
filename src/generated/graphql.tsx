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

export type GuildTraffic = {
  __typename?: 'GuildTraffic';
  createdAt: Scalars['String'];
  guildId: Scalars['String'];
  id: Scalars['Float'];
  joined: Scalars['Boolean'];
  nickname?: Maybe<Scalars['String']>;
  userId: Scalars['String'];
  username?: Maybe<Scalars['String']>;
};

export type Mutation = {
  __typename?: 'Mutation';
  createUser: Users;
  logout: Scalars['Boolean'];
  setPrefix?: Maybe<Scalars['String']>;
};


export type MutationCreateUserArgs = {
  options: UserInfo;
};


export type MutationSetPrefixArgs = {
  guildId: Scalars['String'];
  prefix: Scalars['String'];
};

export type Query = {
  __typename?: 'Query';
  currGuild?: Maybe<Settings>;
  getPrefix?: Maybe<Scalars['String']>;
  guildTraffic?: Maybe<Array<GuildTraffic>>;
  guilds?: Maybe<Array<DiscordGuilds>>;
  loginUser?: Maybe<Users>;
  logoutUser: Scalars['Boolean'];
  me?: Maybe<Users>;
  streamerRanking?: Maybe<Array<StreamLeaderboard>>;
  user?: Maybe<UserResponse>;
  users: UserResponse;
};


export type QueryCurrGuildArgs = {
  guildId: Scalars['String'];
};


export type QueryGetPrefixArgs = {
  guildId: Scalars['String'];
};


export type QueryGuildTrafficArgs = {
  guildId: Scalars['String'];
};


export type QueryLoginUserArgs = {
  username: Scalars['String'];
};


export type QueryStreamerRankingArgs = {
  guildId: Scalars['String'];
};


export type QueryUserArgs = {
  userId: Scalars['String'];
};

export type Settings = {
  __typename?: 'Settings';
  adminRole?: Maybe<Scalars['String']>;
  cleanup?: Maybe<Scalars['Boolean']>;
  disabledCommands?: Maybe<Scalars['String']>;
  guildId: Scalars['String'];
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
  nickname: Scalars['String'];
  timeStreamed: Scalars['String'];
  updatedAt: Scalars['String'];
  userId: Scalars['String'];
  username: Scalars['String'];
};

export type UserResponse = {
  __typename?: 'UserResponse';
  errors?: Maybe<Array<UserError>>;
  users?: Maybe<Array<Users>>;
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
  id: Scalars['String'];
  locale: Scalars['String'];
  mfa_enabled: Scalars['Boolean'];
  premium_type: Scalars['Float'];
  public_flags: Scalars['Float'];
  updatedAt: Scalars['String'];
  username: Scalars['String'];
  verified: Scalars['Boolean'];
};

export type UserError = {
  __typename?: 'userError';
  field: Scalars['String'];
  message: Scalars['String'];
};

export type UserInfo = {
  email: Scalars['String'];
  userId: Scalars['String'];
  username: Scalars['String'];
};

export type LogoutMutationVariables = Exact<{ [key: string]: never; }>;


export type LogoutMutation = { __typename?: 'Mutation', logout: boolean };

export type SetPrefixMutationVariables = Exact<{
  gid: Scalars['String'];
  prefix: Scalars['String'];
}>;


export type SetPrefixMutation = { __typename?: 'Mutation', setPrefix?: string | null | undefined };

export type CurrGuildQueryVariables = Exact<{
  gid: Scalars['String'];
}>;


export type CurrGuildQuery = { __typename?: 'Query', currGuild?: { __typename?: 'Settings', id: number, guildId: string, prefix: string, userCount: string, modRole?: string | null | undefined, adminRole?: string | null | undefined, muteRole?: string | null | undefined, disabledCommands?: string | null | undefined, systemNotice?: boolean | null | undefined, cleanup?: boolean | null | undefined } | null | undefined };

export type GetPrefixQueryVariables = Exact<{
  gid: Scalars['String'];
}>;


export type GetPrefixQuery = { __typename?: 'Query', getPrefix?: string | null | undefined };

export type GuildTrafficQueryVariables = Exact<{
  gid: Scalars['String'];
}>;


export type GuildTrafficQuery = { __typename?: 'Query', guildTraffic?: Array<{ __typename?: 'GuildTraffic', id: number, guildId: string, userId: string, username?: string | null | undefined, nickname?: string | null | undefined, joined: boolean, createdAt: string }> | null | undefined };

export type GetGuildsQueryVariables = Exact<{ [key: string]: never; }>;


export type GetGuildsQuery = { __typename?: 'Query', guilds?: Array<{ __typename?: 'DiscordGuilds', id: string, name: string, icon?: string | null | undefined, owner: boolean, permissions: string, permissions_new: string, features: Array<string>, in?: boolean | null | undefined }> | null | undefined };

export type MeQueryVariables = Exact<{ [key: string]: never; }>;


export type MeQuery = { __typename?: 'Query', me?: { __typename?: 'Users', id: string, username: string, avatar: string, discriminator: string, locale: string, premium_type: number, email: string } | null | undefined };

export type StreamerRankingQueryVariables = Exact<{
  gid: Scalars['String'];
}>;


export type StreamerRankingQuery = { __typename?: 'Query', streamerRanking?: Array<{ __typename?: 'StreamLeaderboard', id: number, userId: string, username: string, nickname: string, timeStreamed: string, updatedAt: string }> | null | undefined };


export const LogoutDocument = gql`
    mutation logout {
  logout
}
    `;

export function useLogoutMutation() {
  return Urql.useMutation<LogoutMutation, LogoutMutationVariables>(LogoutDocument);
};
export const SetPrefixDocument = gql`
    mutation setPrefix($gid: String!, $prefix: String!) {
  setPrefix(guildId: $gid, prefix: $prefix)
}
    `;

export function useSetPrefixMutation() {
  return Urql.useMutation<SetPrefixMutation, SetPrefixMutationVariables>(SetPrefixDocument);
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
  }
}
    `;

export function useCurrGuildQuery(options: Omit<Urql.UseQueryArgs<CurrGuildQueryVariables>, 'query'> = {}) {
  return Urql.useQuery<CurrGuildQuery>({ query: CurrGuildDocument, ...options });
};
export const GetPrefixDocument = gql`
    query getPrefix($gid: String!) {
  getPrefix(guildId: $gid)
}
    `;

export function useGetPrefixQuery(options: Omit<Urql.UseQueryArgs<GetPrefixQueryVariables>, 'query'> = {}) {
  return Urql.useQuery<GetPrefixQuery>({ query: GetPrefixDocument, ...options });
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
    id
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
    username
    nickname
    timeStreamed
    updatedAt
  }
}
    `;

export function useStreamerRankingQuery(options: Omit<Urql.UseQueryArgs<StreamerRankingQueryVariables>, 'query'> = {}) {
  return Urql.useQuery<StreamerRankingQuery>({ query: StreamerRankingDocument, ...options });
};