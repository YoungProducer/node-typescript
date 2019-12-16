// Code generated by Prisma (prisma@1.34.10). DO NOT EDIT.
// Please don't change this file manually but run `prisma generate` to update it.
// For more information, please read the docs: https://www.prisma.io/docs/prisma-client/

import { DocumentNode } from "graphql";
import {
  makePrismaClientClass,
  BaseClientOptions,
  Model
} from "prisma-client-lib";
import { typeDefs } from "./prisma-schema";

export type AtLeastOne<T, U = { [K in keyof T]: Pick<T, K> }> = Partial<T> &
  U[keyof U];

export type Maybe<T> = T | undefined | null;

export interface Exists {
  token: (where?: TokenWhereInput) => Promise<boolean>;
  user: (where?: UserWhereInput) => Promise<boolean>;
}

export interface Node {}

export type FragmentableArray<T> = Promise<Array<T>> & Fragmentable;

export interface Fragmentable {
  $fragment<T>(fragment: string | DocumentNode): Promise<T>;
}

export interface Prisma {
  $exists: Exists;
  $graphql: <T = any>(
    query: string,
    variables?: { [key: string]: any }
  ) => Promise<T>;

  /**
   * Queries
   */

  token: (where: TokenWhereUniqueInput) => TokenNullablePromise;
  tokens: (args?: {
    where?: TokenWhereInput;
    orderBy?: TokenOrderByInput;
    skip?: Int;
    after?: String;
    before?: String;
    first?: Int;
    last?: Int;
  }) => FragmentableArray<Token>;
  tokensConnection: (args?: {
    where?: TokenWhereInput;
    orderBy?: TokenOrderByInput;
    skip?: Int;
    after?: String;
    before?: String;
    first?: Int;
    last?: Int;
  }) => TokenConnectionPromise;
  user: (where: UserWhereUniqueInput) => UserNullablePromise;
  users: (args?: {
    where?: UserWhereInput;
    orderBy?: UserOrderByInput;
    skip?: Int;
    after?: String;
    before?: String;
    first?: Int;
    last?: Int;
  }) => FragmentableArray<User>;
  usersConnection: (args?: {
    where?: UserWhereInput;
    orderBy?: UserOrderByInput;
    skip?: Int;
    after?: String;
    before?: String;
    first?: Int;
    last?: Int;
  }) => UserConnectionPromise;
  node: (args: { id: ID_Output }) => Node;

  /**
   * Mutations
   */

  createToken: (data: TokenCreateInput) => TokenPromise;
  updateToken: (args: {
    data: TokenUpdateInput;
    where: TokenWhereUniqueInput;
  }) => TokenPromise;
  updateManyTokens: (args: {
    data: TokenUpdateManyMutationInput;
    where?: TokenWhereInput;
  }) => BatchPayloadPromise;
  upsertToken: (args: {
    where: TokenWhereUniqueInput;
    create: TokenCreateInput;
    update: TokenUpdateInput;
  }) => TokenPromise;
  deleteToken: (where: TokenWhereUniqueInput) => TokenPromise;
  deleteManyTokens: (where?: TokenWhereInput) => BatchPayloadPromise;
  createUser: (data: UserCreateInput) => UserPromise;
  updateUser: (args: {
    data: UserUpdateInput;
    where: UserWhereUniqueInput;
  }) => UserPromise;
  updateManyUsers: (args: {
    data: UserUpdateManyMutationInput;
    where?: UserWhereInput;
  }) => BatchPayloadPromise;
  upsertUser: (args: {
    where: UserWhereUniqueInput;
    create: UserCreateInput;
    update: UserUpdateInput;
  }) => UserPromise;
  deleteUser: (where: UserWhereUniqueInput) => UserPromise;
  deleteManyUsers: (where?: UserWhereInput) => BatchPayloadPromise;

  /**
   * Subscriptions
   */

  $subscribe: Subscription;
}

export interface Subscription {
  token: (
    where?: TokenSubscriptionWhereInput
  ) => TokenSubscriptionPayloadSubscription;
  user: (
    where?: UserSubscriptionWhereInput
  ) => UserSubscriptionPayloadSubscription;
}

export interface ClientConstructor<T> {
  new (options?: BaseClientOptions): T;
}

/**
 * Types
 */

export type Role = "ADMIN" | "DEFAULT_USER";

export type TokenOrderByInput =
  | "id_ASC"
  | "id_DESC"
  | "token_ASC"
  | "token_DESC"
  | "loginId_ASC"
  | "loginId_DESC";

export type UserOrderByInput =
  | "id_ASC"
  | "id_DESC"
  | "userName_ASC"
  | "userName_DESC"
  | "email_ASC"
  | "email_DESC"
  | "password_ASC"
  | "password_DESC"
  | "role_ASC"
  | "role_DESC";

export type MutationType = "CREATED" | "UPDATED" | "DELETED";

export type TokenWhereUniqueInput = AtLeastOne<{
  id: Maybe<ID_Input>;
  token?: Maybe<String>;
  loginId?: Maybe<String>;
}>;

export interface TokenWhereInput {
  id?: Maybe<ID_Input>;
  id_not?: Maybe<ID_Input>;
  id_in?: Maybe<ID_Input[] | ID_Input>;
  id_not_in?: Maybe<ID_Input[] | ID_Input>;
  id_lt?: Maybe<ID_Input>;
  id_lte?: Maybe<ID_Input>;
  id_gt?: Maybe<ID_Input>;
  id_gte?: Maybe<ID_Input>;
  id_contains?: Maybe<ID_Input>;
  id_not_contains?: Maybe<ID_Input>;
  id_starts_with?: Maybe<ID_Input>;
  id_not_starts_with?: Maybe<ID_Input>;
  id_ends_with?: Maybe<ID_Input>;
  id_not_ends_with?: Maybe<ID_Input>;
  token?: Maybe<String>;
  token_not?: Maybe<String>;
  token_in?: Maybe<String[] | String>;
  token_not_in?: Maybe<String[] | String>;
  token_lt?: Maybe<String>;
  token_lte?: Maybe<String>;
  token_gt?: Maybe<String>;
  token_gte?: Maybe<String>;
  token_contains?: Maybe<String>;
  token_not_contains?: Maybe<String>;
  token_starts_with?: Maybe<String>;
  token_not_starts_with?: Maybe<String>;
  token_ends_with?: Maybe<String>;
  token_not_ends_with?: Maybe<String>;
  loginId?: Maybe<String>;
  loginId_not?: Maybe<String>;
  loginId_in?: Maybe<String[] | String>;
  loginId_not_in?: Maybe<String[] | String>;
  loginId_lt?: Maybe<String>;
  loginId_lte?: Maybe<String>;
  loginId_gt?: Maybe<String>;
  loginId_gte?: Maybe<String>;
  loginId_contains?: Maybe<String>;
  loginId_not_contains?: Maybe<String>;
  loginId_starts_with?: Maybe<String>;
  loginId_not_starts_with?: Maybe<String>;
  loginId_ends_with?: Maybe<String>;
  loginId_not_ends_with?: Maybe<String>;
  user?: Maybe<UserWhereInput>;
  AND?: Maybe<TokenWhereInput[] | TokenWhereInput>;
}

export interface UserWhereInput {
  id?: Maybe<ID_Input>;
  id_not?: Maybe<ID_Input>;
  id_in?: Maybe<ID_Input[] | ID_Input>;
  id_not_in?: Maybe<ID_Input[] | ID_Input>;
  id_lt?: Maybe<ID_Input>;
  id_lte?: Maybe<ID_Input>;
  id_gt?: Maybe<ID_Input>;
  id_gte?: Maybe<ID_Input>;
  id_contains?: Maybe<ID_Input>;
  id_not_contains?: Maybe<ID_Input>;
  id_starts_with?: Maybe<ID_Input>;
  id_not_starts_with?: Maybe<ID_Input>;
  id_ends_with?: Maybe<ID_Input>;
  id_not_ends_with?: Maybe<ID_Input>;
  userName?: Maybe<String>;
  userName_not?: Maybe<String>;
  userName_in?: Maybe<String[] | String>;
  userName_not_in?: Maybe<String[] | String>;
  userName_lt?: Maybe<String>;
  userName_lte?: Maybe<String>;
  userName_gt?: Maybe<String>;
  userName_gte?: Maybe<String>;
  userName_contains?: Maybe<String>;
  userName_not_contains?: Maybe<String>;
  userName_starts_with?: Maybe<String>;
  userName_not_starts_with?: Maybe<String>;
  userName_ends_with?: Maybe<String>;
  userName_not_ends_with?: Maybe<String>;
  email?: Maybe<String>;
  email_not?: Maybe<String>;
  email_in?: Maybe<String[] | String>;
  email_not_in?: Maybe<String[] | String>;
  email_lt?: Maybe<String>;
  email_lte?: Maybe<String>;
  email_gt?: Maybe<String>;
  email_gte?: Maybe<String>;
  email_contains?: Maybe<String>;
  email_not_contains?: Maybe<String>;
  email_starts_with?: Maybe<String>;
  email_not_starts_with?: Maybe<String>;
  email_ends_with?: Maybe<String>;
  email_not_ends_with?: Maybe<String>;
  password?: Maybe<String>;
  password_not?: Maybe<String>;
  password_in?: Maybe<String[] | String>;
  password_not_in?: Maybe<String[] | String>;
  password_lt?: Maybe<String>;
  password_lte?: Maybe<String>;
  password_gt?: Maybe<String>;
  password_gte?: Maybe<String>;
  password_contains?: Maybe<String>;
  password_not_contains?: Maybe<String>;
  password_starts_with?: Maybe<String>;
  password_not_starts_with?: Maybe<String>;
  password_ends_with?: Maybe<String>;
  password_not_ends_with?: Maybe<String>;
  role?: Maybe<Role>;
  role_not?: Maybe<Role>;
  role_in?: Maybe<Role[] | Role>;
  role_not_in?: Maybe<Role[] | Role>;
  refreshTokens_some?: Maybe<TokenWhereInput>;
  AND?: Maybe<UserWhereInput[] | UserWhereInput>;
}

export type UserWhereUniqueInput = AtLeastOne<{
  id: Maybe<ID_Input>;
  userName?: Maybe<String>;
  email?: Maybe<String>;
}>;

export interface TokenCreateInput {
  id?: Maybe<ID_Input>;
  token: String;
  loginId: String;
  user: UserCreateOneWithoutRefreshTokensInput;
}

export interface UserCreateOneWithoutRefreshTokensInput {
  create?: Maybe<UserCreateWithoutRefreshTokensInput>;
  connect?: Maybe<UserWhereUniqueInput>;
}

export interface UserCreateWithoutRefreshTokensInput {
  id?: Maybe<ID_Input>;
  userName?: Maybe<String>;
  email: String;
  password: String;
  role: Role;
}

export interface TokenUpdateInput {
  token?: Maybe<String>;
  loginId?: Maybe<String>;
  user?: Maybe<UserUpdateOneRequiredWithoutRefreshTokensInput>;
}

export interface UserUpdateOneRequiredWithoutRefreshTokensInput {
  create?: Maybe<UserCreateWithoutRefreshTokensInput>;
  update?: Maybe<UserUpdateWithoutRefreshTokensDataInput>;
  upsert?: Maybe<UserUpsertWithoutRefreshTokensInput>;
  connect?: Maybe<UserWhereUniqueInput>;
}

export interface UserUpdateWithoutRefreshTokensDataInput {
  userName?: Maybe<String>;
  email?: Maybe<String>;
  password?: Maybe<String>;
  role?: Maybe<Role>;
}

export interface UserUpsertWithoutRefreshTokensInput {
  update: UserUpdateWithoutRefreshTokensDataInput;
  create: UserCreateWithoutRefreshTokensInput;
}

export interface TokenUpdateManyMutationInput {
  token?: Maybe<String>;
  loginId?: Maybe<String>;
}

export interface UserCreateInput {
  id?: Maybe<ID_Input>;
  userName?: Maybe<String>;
  email: String;
  password: String;
  role: Role;
  refreshTokens?: Maybe<TokenCreateManyWithoutUserInput>;
}

export interface TokenCreateManyWithoutUserInput {
  create?: Maybe<TokenCreateWithoutUserInput[] | TokenCreateWithoutUserInput>;
  connect?: Maybe<TokenWhereUniqueInput[] | TokenWhereUniqueInput>;
}

export interface TokenCreateWithoutUserInput {
  id?: Maybe<ID_Input>;
  token: String;
  loginId: String;
}

export interface UserUpdateInput {
  userName?: Maybe<String>;
  email?: Maybe<String>;
  password?: Maybe<String>;
  role?: Maybe<Role>;
  refreshTokens?: Maybe<TokenUpdateManyWithoutUserInput>;
}

export interface TokenUpdateManyWithoutUserInput {
  create?: Maybe<TokenCreateWithoutUserInput[] | TokenCreateWithoutUserInput>;
  delete?: Maybe<TokenWhereUniqueInput[] | TokenWhereUniqueInput>;
  connect?: Maybe<TokenWhereUniqueInput[] | TokenWhereUniqueInput>;
  set?: Maybe<TokenWhereUniqueInput[] | TokenWhereUniqueInput>;
  disconnect?: Maybe<TokenWhereUniqueInput[] | TokenWhereUniqueInput>;
  update?: Maybe<
    | TokenUpdateWithWhereUniqueWithoutUserInput[]
    | TokenUpdateWithWhereUniqueWithoutUserInput
  >;
  upsert?: Maybe<
    | TokenUpsertWithWhereUniqueWithoutUserInput[]
    | TokenUpsertWithWhereUniqueWithoutUserInput
  >;
  deleteMany?: Maybe<TokenScalarWhereInput[] | TokenScalarWhereInput>;
  updateMany?: Maybe<
    TokenUpdateManyWithWhereNestedInput[] | TokenUpdateManyWithWhereNestedInput
  >;
}

export interface TokenUpdateWithWhereUniqueWithoutUserInput {
  where: TokenWhereUniqueInput;
  data: TokenUpdateWithoutUserDataInput;
}

export interface TokenUpdateWithoutUserDataInput {
  token?: Maybe<String>;
  loginId?: Maybe<String>;
}

export interface TokenUpsertWithWhereUniqueWithoutUserInput {
  where: TokenWhereUniqueInput;
  update: TokenUpdateWithoutUserDataInput;
  create: TokenCreateWithoutUserInput;
}

export interface TokenScalarWhereInput {
  id?: Maybe<ID_Input>;
  id_not?: Maybe<ID_Input>;
  id_in?: Maybe<ID_Input[] | ID_Input>;
  id_not_in?: Maybe<ID_Input[] | ID_Input>;
  id_lt?: Maybe<ID_Input>;
  id_lte?: Maybe<ID_Input>;
  id_gt?: Maybe<ID_Input>;
  id_gte?: Maybe<ID_Input>;
  id_contains?: Maybe<ID_Input>;
  id_not_contains?: Maybe<ID_Input>;
  id_starts_with?: Maybe<ID_Input>;
  id_not_starts_with?: Maybe<ID_Input>;
  id_ends_with?: Maybe<ID_Input>;
  id_not_ends_with?: Maybe<ID_Input>;
  token?: Maybe<String>;
  token_not?: Maybe<String>;
  token_in?: Maybe<String[] | String>;
  token_not_in?: Maybe<String[] | String>;
  token_lt?: Maybe<String>;
  token_lte?: Maybe<String>;
  token_gt?: Maybe<String>;
  token_gte?: Maybe<String>;
  token_contains?: Maybe<String>;
  token_not_contains?: Maybe<String>;
  token_starts_with?: Maybe<String>;
  token_not_starts_with?: Maybe<String>;
  token_ends_with?: Maybe<String>;
  token_not_ends_with?: Maybe<String>;
  loginId?: Maybe<String>;
  loginId_not?: Maybe<String>;
  loginId_in?: Maybe<String[] | String>;
  loginId_not_in?: Maybe<String[] | String>;
  loginId_lt?: Maybe<String>;
  loginId_lte?: Maybe<String>;
  loginId_gt?: Maybe<String>;
  loginId_gte?: Maybe<String>;
  loginId_contains?: Maybe<String>;
  loginId_not_contains?: Maybe<String>;
  loginId_starts_with?: Maybe<String>;
  loginId_not_starts_with?: Maybe<String>;
  loginId_ends_with?: Maybe<String>;
  loginId_not_ends_with?: Maybe<String>;
  AND?: Maybe<TokenScalarWhereInput[] | TokenScalarWhereInput>;
  OR?: Maybe<TokenScalarWhereInput[] | TokenScalarWhereInput>;
  NOT?: Maybe<TokenScalarWhereInput[] | TokenScalarWhereInput>;
}

export interface TokenUpdateManyWithWhereNestedInput {
  where: TokenScalarWhereInput;
  data: TokenUpdateManyDataInput;
}

export interface TokenUpdateManyDataInput {
  token?: Maybe<String>;
  loginId?: Maybe<String>;
}

export interface UserUpdateManyMutationInput {
  userName?: Maybe<String>;
  email?: Maybe<String>;
  password?: Maybe<String>;
  role?: Maybe<Role>;
}

export interface TokenSubscriptionWhereInput {
  mutation_in?: Maybe<MutationType[] | MutationType>;
  updatedFields_contains?: Maybe<String>;
  updatedFields_contains_every?: Maybe<String[] | String>;
  updatedFields_contains_some?: Maybe<String[] | String>;
  node?: Maybe<TokenWhereInput>;
  AND?: Maybe<TokenSubscriptionWhereInput[] | TokenSubscriptionWhereInput>;
}

export interface UserSubscriptionWhereInput {
  mutation_in?: Maybe<MutationType[] | MutationType>;
  updatedFields_contains?: Maybe<String>;
  updatedFields_contains_every?: Maybe<String[] | String>;
  updatedFields_contains_some?: Maybe<String[] | String>;
  node?: Maybe<UserWhereInput>;
  AND?: Maybe<UserSubscriptionWhereInput[] | UserSubscriptionWhereInput>;
}

export interface NodeNode {
  id: ID_Output;
}

export interface Token {
  id: ID_Output;
  token: String;
  loginId: String;
}

export interface TokenPromise extends Promise<Token>, Fragmentable {
  id: () => Promise<ID_Output>;
  token: () => Promise<String>;
  loginId: () => Promise<String>;
  user: <T = UserPromise>() => T;
}

export interface TokenSubscription
  extends Promise<AsyncIterator<Token>>,
    Fragmentable {
  id: () => Promise<AsyncIterator<ID_Output>>;
  token: () => Promise<AsyncIterator<String>>;
  loginId: () => Promise<AsyncIterator<String>>;
  user: <T = UserSubscription>() => T;
}

export interface TokenNullablePromise
  extends Promise<Token | null>,
    Fragmentable {
  id: () => Promise<ID_Output>;
  token: () => Promise<String>;
  loginId: () => Promise<String>;
  user: <T = UserPromise>() => T;
}

export interface User {
  id: ID_Output;
  userName?: String;
  email: String;
  password: String;
  role: Role;
}

export interface UserPromise extends Promise<User>, Fragmentable {
  id: () => Promise<ID_Output>;
  userName: () => Promise<String>;
  email: () => Promise<String>;
  password: () => Promise<String>;
  role: () => Promise<Role>;
  refreshTokens: <T = FragmentableArray<Token>>(args?: {
    where?: TokenWhereInput;
    orderBy?: TokenOrderByInput;
    skip?: Int;
    after?: String;
    before?: String;
    first?: Int;
    last?: Int;
  }) => T;
}

export interface UserSubscription
  extends Promise<AsyncIterator<User>>,
    Fragmentable {
  id: () => Promise<AsyncIterator<ID_Output>>;
  userName: () => Promise<AsyncIterator<String>>;
  email: () => Promise<AsyncIterator<String>>;
  password: () => Promise<AsyncIterator<String>>;
  role: () => Promise<AsyncIterator<Role>>;
  refreshTokens: <T = Promise<AsyncIterator<TokenSubscription>>>(args?: {
    where?: TokenWhereInput;
    orderBy?: TokenOrderByInput;
    skip?: Int;
    after?: String;
    before?: String;
    first?: Int;
    last?: Int;
  }) => T;
}

export interface UserNullablePromise
  extends Promise<User | null>,
    Fragmentable {
  id: () => Promise<ID_Output>;
  userName: () => Promise<String>;
  email: () => Promise<String>;
  password: () => Promise<String>;
  role: () => Promise<Role>;
  refreshTokens: <T = FragmentableArray<Token>>(args?: {
    where?: TokenWhereInput;
    orderBy?: TokenOrderByInput;
    skip?: Int;
    after?: String;
    before?: String;
    first?: Int;
    last?: Int;
  }) => T;
}

export interface TokenConnection {
  pageInfo: PageInfo;
  edges: TokenEdge[];
}

export interface TokenConnectionPromise
  extends Promise<TokenConnection>,
    Fragmentable {
  pageInfo: <T = PageInfoPromise>() => T;
  edges: <T = FragmentableArray<TokenEdge>>() => T;
  aggregate: <T = AggregateTokenPromise>() => T;
}

export interface TokenConnectionSubscription
  extends Promise<AsyncIterator<TokenConnection>>,
    Fragmentable {
  pageInfo: <T = PageInfoSubscription>() => T;
  edges: <T = Promise<AsyncIterator<TokenEdgeSubscription>>>() => T;
  aggregate: <T = AggregateTokenSubscription>() => T;
}

export interface PageInfo {
  hasNextPage: Boolean;
  hasPreviousPage: Boolean;
  startCursor?: String;
  endCursor?: String;
}

export interface PageInfoPromise extends Promise<PageInfo>, Fragmentable {
  hasNextPage: () => Promise<Boolean>;
  hasPreviousPage: () => Promise<Boolean>;
  startCursor: () => Promise<String>;
  endCursor: () => Promise<String>;
}

export interface PageInfoSubscription
  extends Promise<AsyncIterator<PageInfo>>,
    Fragmentable {
  hasNextPage: () => Promise<AsyncIterator<Boolean>>;
  hasPreviousPage: () => Promise<AsyncIterator<Boolean>>;
  startCursor: () => Promise<AsyncIterator<String>>;
  endCursor: () => Promise<AsyncIterator<String>>;
}

export interface TokenEdge {
  node: Token;
  cursor: String;
}

export interface TokenEdgePromise extends Promise<TokenEdge>, Fragmentable {
  node: <T = TokenPromise>() => T;
  cursor: () => Promise<String>;
}

export interface TokenEdgeSubscription
  extends Promise<AsyncIterator<TokenEdge>>,
    Fragmentable {
  node: <T = TokenSubscription>() => T;
  cursor: () => Promise<AsyncIterator<String>>;
}

export interface AggregateToken {
  count: Int;
}

export interface AggregateTokenPromise
  extends Promise<AggregateToken>,
    Fragmentable {
  count: () => Promise<Int>;
}

export interface AggregateTokenSubscription
  extends Promise<AsyncIterator<AggregateToken>>,
    Fragmentable {
  count: () => Promise<AsyncIterator<Int>>;
}

export interface UserConnection {
  pageInfo: PageInfo;
  edges: UserEdge[];
}

export interface UserConnectionPromise
  extends Promise<UserConnection>,
    Fragmentable {
  pageInfo: <T = PageInfoPromise>() => T;
  edges: <T = FragmentableArray<UserEdge>>() => T;
  aggregate: <T = AggregateUserPromise>() => T;
}

export interface UserConnectionSubscription
  extends Promise<AsyncIterator<UserConnection>>,
    Fragmentable {
  pageInfo: <T = PageInfoSubscription>() => T;
  edges: <T = Promise<AsyncIterator<UserEdgeSubscription>>>() => T;
  aggregate: <T = AggregateUserSubscription>() => T;
}

export interface UserEdge {
  node: User;
  cursor: String;
}

export interface UserEdgePromise extends Promise<UserEdge>, Fragmentable {
  node: <T = UserPromise>() => T;
  cursor: () => Promise<String>;
}

export interface UserEdgeSubscription
  extends Promise<AsyncIterator<UserEdge>>,
    Fragmentable {
  node: <T = UserSubscription>() => T;
  cursor: () => Promise<AsyncIterator<String>>;
}

export interface AggregateUser {
  count: Int;
}

export interface AggregateUserPromise
  extends Promise<AggregateUser>,
    Fragmentable {
  count: () => Promise<Int>;
}

export interface AggregateUserSubscription
  extends Promise<AsyncIterator<AggregateUser>>,
    Fragmentable {
  count: () => Promise<AsyncIterator<Int>>;
}

export interface BatchPayload {
  count: Long;
}

export interface BatchPayloadPromise
  extends Promise<BatchPayload>,
    Fragmentable {
  count: () => Promise<Long>;
}

export interface BatchPayloadSubscription
  extends Promise<AsyncIterator<BatchPayload>>,
    Fragmentable {
  count: () => Promise<AsyncIterator<Long>>;
}

export interface TokenSubscriptionPayload {
  mutation: MutationType;
  node: Token;
  updatedFields: String[];
  previousValues: TokenPreviousValues;
}

export interface TokenSubscriptionPayloadPromise
  extends Promise<TokenSubscriptionPayload>,
    Fragmentable {
  mutation: () => Promise<MutationType>;
  node: <T = TokenPromise>() => T;
  updatedFields: () => Promise<String[]>;
  previousValues: <T = TokenPreviousValuesPromise>() => T;
}

export interface TokenSubscriptionPayloadSubscription
  extends Promise<AsyncIterator<TokenSubscriptionPayload>>,
    Fragmentable {
  mutation: () => Promise<AsyncIterator<MutationType>>;
  node: <T = TokenSubscription>() => T;
  updatedFields: () => Promise<AsyncIterator<String[]>>;
  previousValues: <T = TokenPreviousValuesSubscription>() => T;
}

export interface TokenPreviousValues {
  id: ID_Output;
  token: String;
  loginId: String;
}

export interface TokenPreviousValuesPromise
  extends Promise<TokenPreviousValues>,
    Fragmentable {
  id: () => Promise<ID_Output>;
  token: () => Promise<String>;
  loginId: () => Promise<String>;
}

export interface TokenPreviousValuesSubscription
  extends Promise<AsyncIterator<TokenPreviousValues>>,
    Fragmentable {
  id: () => Promise<AsyncIterator<ID_Output>>;
  token: () => Promise<AsyncIterator<String>>;
  loginId: () => Promise<AsyncIterator<String>>;
}

export interface UserSubscriptionPayload {
  mutation: MutationType;
  node: User;
  updatedFields: String[];
  previousValues: UserPreviousValues;
}

export interface UserSubscriptionPayloadPromise
  extends Promise<UserSubscriptionPayload>,
    Fragmentable {
  mutation: () => Promise<MutationType>;
  node: <T = UserPromise>() => T;
  updatedFields: () => Promise<String[]>;
  previousValues: <T = UserPreviousValuesPromise>() => T;
}

export interface UserSubscriptionPayloadSubscription
  extends Promise<AsyncIterator<UserSubscriptionPayload>>,
    Fragmentable {
  mutation: () => Promise<AsyncIterator<MutationType>>;
  node: <T = UserSubscription>() => T;
  updatedFields: () => Promise<AsyncIterator<String[]>>;
  previousValues: <T = UserPreviousValuesSubscription>() => T;
}

export interface UserPreviousValues {
  id: ID_Output;
  userName?: String;
  email: String;
  password: String;
  role: Role;
}

export interface UserPreviousValuesPromise
  extends Promise<UserPreviousValues>,
    Fragmentable {
  id: () => Promise<ID_Output>;
  userName: () => Promise<String>;
  email: () => Promise<String>;
  password: () => Promise<String>;
  role: () => Promise<Role>;
}

export interface UserPreviousValuesSubscription
  extends Promise<AsyncIterator<UserPreviousValues>>,
    Fragmentable {
  id: () => Promise<AsyncIterator<ID_Output>>;
  userName: () => Promise<AsyncIterator<String>>;
  email: () => Promise<AsyncIterator<String>>;
  password: () => Promise<AsyncIterator<String>>;
  role: () => Promise<AsyncIterator<Role>>;
}

/*
The `ID` scalar type represents a unique identifier, often used to refetch an object or as key for a cache. The ID type appears in a JSON response as a String; however, it is not intended to be human-readable. When expected as an input type, any string (such as `"4"`) or integer (such as `4`) input value will be accepted as an ID.
*/
export type ID_Input = string | number;
export type ID_Output = string;

/*
The `String` scalar type represents textual data, represented as UTF-8 character sequences. The String type is most often used by GraphQL to represent free-form human-readable text.
*/
export type String = string;

/*
The `Int` scalar type represents non-fractional signed whole numeric values. Int can represent values between -(2^31) and 2^31 - 1.
*/
export type Int = number;

/*
The `Boolean` scalar type represents `true` or `false`.
*/
export type Boolean = boolean;

export type Long = string;

/**
 * Model Metadata
 */

export const models: Model[] = [
  {
    name: "User",
    embedded: false
  },
  {
    name: "Token",
    embedded: false
  },
  {
    name: "Role",
    embedded: false
  }
];

/**
 * Type Defs
 */

export const Prisma = makePrismaClientClass<ClientConstructor<Prisma>>({
  typeDefs,
  models,
  endpoint: `http://0.0.0.0:4466/auth-service/dev`,
  secret: `my-secret-42`
});
export const prisma = new Prisma();
