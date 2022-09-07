import { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core'
export type Maybe<T> = T | null
export type InputMaybe<T> = Maybe<T>
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] }
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> }
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> }
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string
  String: string
  Boolean: boolean
  Int: number
  Float: number
  DateTime: any // eslint-disable-line
}

export type ComplaintInput = {
  desc: Scalars['String']
  location: Scalars['String']
  phoneNumber: Scalars['String']
  tags: Scalars['String']
}

export type Issue = {
  __typename?: 'Issue'
  desc: Scalars['String']
  location: Scalars['String']
  phoneNumber: Scalars['String']
  tags: Scalars['String']
  volunteer: Volunteer
}

export type LoginInput = {
  password: Scalars['String']
  phoneNumber: Scalars['String']
}

export type Mutation = {
  __typename?: 'Mutation'
  Complaint: Issue
  postWaterData: WaterData
  signIn: Volunteer
}

export type MutationComplaintArgs = {
  ComplaintInput: ComplaintInput
}

export type MutationPostWaterDataArgs = {
  WaterDataInput: WaterDataInput
}

export type MutationSignInArgs = {
  VolunteerInput: VolunteerInput
}

export type Query = {
  __typename?: 'Query'
  getWaterData: Array<WaterData>
  login: Scalars['String']
  testQuery: Scalars['String']
}

export type QueryLoginArgs = {
  LoginInput: LoginInput
}

export type Volunteer = {
  __typename?: 'Volunteer'
  id: Scalars['String']
  issue: Array<Issue>
  phoneNumber: Scalars['String']
  tags: Scalars['String']
  username: Scalars['String']
}

export type VolunteerInput = {
  password: Scalars['String']
  phoneNumber: Scalars['String']
  tags: Scalars['String']
  username: Scalars['String']
}

export type WaterData = {
  __typename?: 'WaterData'
  date: Scalars['DateTime']
  depth: Scalars['Float']
  image: Scalars['String']
  location: Scalars['String']
}

export type WaterDataInput = {
  depth: Scalars['Float']
  image: Scalars['String']
  location: Scalars['String']
}

export type TestQueryQueryVariables = Exact<{ [key: string]: never }>

export type TestQueryQuery = { __typename?: 'Query'; testQuery: string }

export const TestQueryDocument = {
  kind: 'Document',
  definitions: [
    {
      kind: 'OperationDefinition',
      operation: 'query',
      name: { kind: 'Name', value: 'testQuery' },
      selectionSet: {
        kind: 'SelectionSet',
        selections: [{ kind: 'Field', name: { kind: 'Name', value: 'testQuery' } }],
      },
    },
  ],
} as unknown as DocumentNode<TestQueryQuery, TestQueryQueryVariables>
