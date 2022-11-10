import { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  DateTime: any;
};

export type ComplaintInput = {
  desc: Scalars['String'];
  image: Scalars['String'];
  location: Scalars['String'];
  phoneNumber: Scalars['String'];
  status: Scalars['String'];
  tags: Scalars['String'];
  username: Scalars['String'];
};

export type Issue = {
  __typename?: 'Issue';
  desc: Scalars['String'];
  id: Scalars['String'];
  image: Scalars['String'];
  location: Scalars['String'];
  phoneNumber: Scalars['String'];
  status: Scalars['String'];
  tags: Scalars['String'];
  username: Scalars['String'];
  volunteer: Volunteer;
};

export type LoginInput = {
  password: Scalars['String'];
  phoneNumber: Scalars['String'];
};

export type LoginResponse = {
  __typename?: 'LoginResponse';
  success: Scalars['Boolean'];
  token: Scalars['String'];
};

export type Mutation = {
  __typename?: 'Mutation';
  postIssue: Issue;
  postWaterData: WaterData;
  signUp: Volunteer;
  updateIssue: Issue;
};


export type MutationPostIssueArgs = {
  ComplaintInput: ComplaintInput;
};


export type MutationPostWaterDataArgs = {
  WaterDataInput: WaterDataInput;
};


export type MutationSignUpArgs = {
  VolunteerInput: VolunteerInput;
};


export type MutationUpdateIssueArgs = {
  ID: Scalars['String'];
};

export type Query = {
  __typename?: 'Query';
  getIssues: Array<Issue>;
  getS3URL: Scalars['String'];
  getVolunteers: Array<Volunteer>;
  getWaterData: Array<WaterData>;
  login: LoginResponse;
};


export type QueryLoginArgs = {
  LoginInput: LoginInput;
};

export type Volunteer = {
  __typename?: 'Volunteer';
  id: Scalars['String'];
  issue: Array<Issue>;
  phoneNumber: Scalars['String'];
  tags: Scalars['String'];
  username: Scalars['String'];
};

export type VolunteerInput = {
  password: Scalars['String'];
  phoneNumber: Scalars['String'];
  tags: Scalars['String'];
  username: Scalars['String'];
};

export type WaterData = {
  __typename?: 'WaterData';
  date: Scalars['DateTime'];
  depth: Scalars['Float'];
  image: Scalars['String'];
  location: Scalars['String'];
  remarks?: Maybe<Scalars['String']>;
};

export type WaterDataInput = {
  depth: Scalars['Float'];
  image: Scalars['String'];
  location: Scalars['String'];
  remarks: Scalars['String'];
};

export type GetIssuesQueryVariables = Exact<{ [key: string]: never; }>;


export type GetIssuesQuery = { __typename?: 'Query', getIssues: Array<{ __typename?: 'Issue', id: string, location: string, phoneNumber: string, tags: string, username: string }> };

export type LoginQueryVariables = Exact<{
  loginInput: LoginInput;
}>;


export type LoginQuery = { __typename?: 'Query', login: { __typename?: 'LoginResponse', success: boolean, token: string } };

export type GetS3UrlQueryVariables = Exact<{ [key: string]: never; }>;


export type GetS3UrlQuery = { __typename?: 'Query', getS3URL: string };

export type GetWaterDataQueryVariables = Exact<{ [key: string]: never; }>;


export type GetWaterDataQuery = { __typename?: 'Query', getWaterData: Array<{ __typename?: 'WaterData', depth: number, location: string, image: string, date: any }> };

export type GetVolunteersQueryVariables = Exact<{ [key: string]: never; }>;


export type GetVolunteersQuery = { __typename?: 'Query', getVolunteers: Array<{ __typename?: 'Volunteer', username: string, tags: string, phoneNumber: string }> };

export type SignUpMutationVariables = Exact<{
  volunteerInput: VolunteerInput;
}>;


export type SignUpMutation = { __typename?: 'Mutation', signUp: { __typename?: 'Volunteer', id: string, tags: string, phoneNumber: string, username: string } };

export type PostIssueMutationVariables = Exact<{
  complaintInput: ComplaintInput;
}>;


export type PostIssueMutation = { __typename?: 'Mutation', postIssue: { __typename?: 'Issue', desc: string, phoneNumber: string, tags: string, location: string, image: string } };

export type UpdateIssueMutationVariables = Exact<{
  id: Scalars['String'];
}>;


export type UpdateIssueMutation = { __typename?: 'Mutation', updateIssue: { __typename?: 'Issue', status: string } };

export type PostWaterDataMutationVariables = Exact<{
  waterDataInput: WaterDataInput;
}>;


export type PostWaterDataMutation = { __typename?: 'Mutation', postWaterData: { __typename?: 'WaterData', image: string, location: string, depth: number, date: any } };


export const GetIssuesDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"getIssues"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"getIssues"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"location"}},{"kind":"Field","name":{"kind":"Name","value":"phoneNumber"}},{"kind":"Field","name":{"kind":"Name","value":"tags"}},{"kind":"Field","name":{"kind":"Name","value":"username"}}]}}]}}]} as unknown as DocumentNode<GetIssuesQuery, GetIssuesQueryVariables>;
export const LoginDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"login"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"loginInput"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"LoginInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"login"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"LoginInput"},"value":{"kind":"Variable","name":{"kind":"Name","value":"loginInput"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"success"}},{"kind":"Field","name":{"kind":"Name","value":"token"}}]}}]}}]} as unknown as DocumentNode<LoginQuery, LoginQueryVariables>;
export const GetS3UrlDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"getS3URL"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"getS3URL"}}]}}]} as unknown as DocumentNode<GetS3UrlQuery, GetS3UrlQueryVariables>;
export const GetWaterDataDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"getWaterData"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"getWaterData"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"depth"}},{"kind":"Field","name":{"kind":"Name","value":"location"}},{"kind":"Field","name":{"kind":"Name","value":"image"}},{"kind":"Field","name":{"kind":"Name","value":"date"}}]}}]}}]} as unknown as DocumentNode<GetWaterDataQuery, GetWaterDataQueryVariables>;
export const GetVolunteersDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"getVolunteers"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"getVolunteers"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"username"}},{"kind":"Field","name":{"kind":"Name","value":"tags"}},{"kind":"Field","name":{"kind":"Name","value":"phoneNumber"}}]}}]}}]} as unknown as DocumentNode<GetVolunteersQuery, GetVolunteersQueryVariables>;
export const SignUpDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"signUp"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"volunteerInput"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"VolunteerInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"signUp"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"VolunteerInput"},"value":{"kind":"Variable","name":{"kind":"Name","value":"volunteerInput"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"tags"}},{"kind":"Field","name":{"kind":"Name","value":"phoneNumber"}},{"kind":"Field","name":{"kind":"Name","value":"username"}}]}}]}}]} as unknown as DocumentNode<SignUpMutation, SignUpMutationVariables>;
export const PostIssueDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"postIssue"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"complaintInput"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ComplaintInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"postIssue"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"ComplaintInput"},"value":{"kind":"Variable","name":{"kind":"Name","value":"complaintInput"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"desc"}},{"kind":"Field","name":{"kind":"Name","value":"phoneNumber"}},{"kind":"Field","name":{"kind":"Name","value":"tags"}},{"kind":"Field","name":{"kind":"Name","value":"location"}},{"kind":"Field","name":{"kind":"Name","value":"image"}}]}}]}}]} as unknown as DocumentNode<PostIssueMutation, PostIssueMutationVariables>;
export const UpdateIssueDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"updateIssue"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"id"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"updateIssue"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"ID"},"value":{"kind":"Variable","name":{"kind":"Name","value":"id"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"status"}}]}}]}}]} as unknown as DocumentNode<UpdateIssueMutation, UpdateIssueMutationVariables>;
export const PostWaterDataDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"mutation","name":{"kind":"Name","value":"postWaterData"},"variableDefinitions":[{"kind":"VariableDefinition","variable":{"kind":"Variable","name":{"kind":"Name","value":"waterDataInput"}},"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"WaterDataInput"}}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"postWaterData"},"arguments":[{"kind":"Argument","name":{"kind":"Name","value":"WaterDataInput"},"value":{"kind":"Variable","name":{"kind":"Name","value":"waterDataInput"}}}],"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"image"}},{"kind":"Field","name":{"kind":"Name","value":"location"}},{"kind":"Field","name":{"kind":"Name","value":"depth"}},{"kind":"Field","name":{"kind":"Name","value":"date"}}]}}]}}]} as unknown as DocumentNode<PostWaterDataMutation, PostWaterDataMutationVariables>;