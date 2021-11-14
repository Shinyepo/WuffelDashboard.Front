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

export type Mutation = {
  __typename?: 'Mutation';
  createUser: Users;
  logout: Scalars['Boolean'];
};


export type MutationCreateUserArgs = {
  options: UserInfo;
};

export type Query = {
  __typename?: 'Query';
  currGuild: Settings;
  guilds?: Maybe<Array<DiscordGuilds>>;
  loginUser?: Maybe<Users>;
  logoutUser: Scalars['Boolean'];
  me?: Maybe<Users>;
  user?: Maybe<UserResponse>;
  users: UserResponse;
};


export type QueryCurrGuildArgs = {
  guildId: Scalars['String'];
};


export type QueryLoginUserArgs = {
  username: Scalars['String'];
};


export type QueryUserArgs = {
  userId: Scalars['String'];
};

export type Settings = {
  __typename?: 'Settings';
  adminRole: Scalars['String'];
  cleanup: Scalars['Boolean'];
  disabledCommands: Scalars['String'];
  id: Scalars['String'];
  modRole: Scalars['String'];
  muteRole: Scalars['String'];
  prefix: Scalars['String'];
  systemNotice: Scalars['Boolean'];
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

export type CurrGuildQueryVariables = Exact<{
  gid: Scalars['String'];
}>;


export type CurrGuildQuery = { __typename?: 'Query', currGuild: { __typename?: 'Settings', id: string, prefix: string, modRole: string, adminRole: string, muteRole: string, disabledCommands: string, systemNotice: boolean, cleanup: boolean } };

export type GetGuildsQueryVariables = Exact<{ [key: string]: never; }>;


export type GetGuildsQuery = { __typename?: 'Query', guilds?: Array<{ __typename?: 'DiscordGuilds', id: string, name: string, icon?: string | null | undefined, owner: boolean, permissions: string, permissions_new: string, features: Array<string>, in?: boolean | null | undefined }> | null | undefined };

export type MeQueryVariables = Exact<{ [key: string]: never; }>;


export type MeQuery = { __typename?: 'Query', me?: { __typename?: 'Users', id: string, username: string, avatar: string, discriminator: string, locale: string, premium_type: number, email: string } | null | undefined };


export const LogoutDocument = gql`
    mutation logout {
  logout
}
    `;

export function useLogoutMutation() {
  return Urql.useMutation<LogoutMutation, LogoutMutationVariables>(LogoutDocument);
};
export const CurrGuildDocument = gql`
    query currGuild($gid: String!) {
  currGuild(guildId: $gid) {
    id
    prefix
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