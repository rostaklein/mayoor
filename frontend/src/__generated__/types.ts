/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: GetCustomer
// ====================================================

export interface GetCustomer_getCustomer_addresses {
  __typename: "Address";
  isPrimary: boolean;
  street: string | null;
  city: string | null;
  postNumber: string | null;
}

export interface GetCustomer_getCustomer {
  __typename: "Customer";
  name: string | null;
  identificationNumber: string | null;
  taxIdentificationNumber: string | null;
  personName: string | null;
  email: string | null;
  phone: string | null;
  note: string | null;
  allowedBankPayments: boolean;
  addresses: GetCustomer_getCustomer_addresses[];
}

export interface GetCustomer {
  getCustomer: GetCustomer_getCustomer | null;
}

export interface GetCustomerVariables {
  id: string;
}

/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: GetAllCustomers
// ====================================================

export interface GetAllCustomers_getAllCustomers_edges_node {
  __typename: "Customer";
  id: string;
  name: string | null;
  identificationNumber: string | null;
  personName: string | null;
  email: string | null;
  phone: string | null;
}

export interface GetAllCustomers_getAllCustomers_edges {
  __typename: "CustomerEdge";
  node: GetAllCustomers_getAllCustomers_edges_node;
  cursor: string;
}

export interface GetAllCustomers_getAllCustomers_pageInfo {
  __typename: "PageInfo";
  startCursor: string | null;
  endCursor: string | null;
  hasNextPage: boolean;
  hasPreviousPage: boolean;
}

export interface GetAllCustomers_getAllCustomers {
  __typename: "CustomersConnection";
  totalCount: number;
  edges: GetAllCustomers_getAllCustomers_edges[];
  pageInfo: GetAllCustomers_getAllCustomers_pageInfo;
}

export interface GetAllCustomers {
  getAllCustomers: GetAllCustomers_getAllCustomers;
}

export interface GetAllCustomersVariables {
  first?: number | null;
  last?: number | null;
  after?: string | null;
  before?: string | null;
  search?: string | null;
}

/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: LoginMutation
// ====================================================

export interface LoginMutation_login_user {
  __typename: "User";
  name: string | null;
  id: string;
  email: string;
}

export interface LoginMutation_login {
  __typename: "AuthPayload";
  user: LoginMutation_login_user;
  token: string;
}

export interface LoginMutation {
  login: LoginMutation_login;
}

export interface LoginMutationVariables {
  email: string;
  password: string;
}

/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: MeQuery
// ====================================================

export interface MeQuery_me {
  __typename: "User";
  id: string;
  name: string | null;
  email: string;
}

export interface MeQuery {
  me: MeQuery_me;
}

/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: CreateCustomerMutation
// ====================================================

export interface CreateCustomerMutation_createCustomer {
  __typename: "Customer";
  name: string | null;
  personName: string | null;
  identificationNumber: string | null;
}

export interface CreateCustomerMutation {
  createCustomer: CreateCustomerMutation_createCustomer;
}

export interface CreateCustomerMutationVariables {
  input: CreateCustomerInput;
}

/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: GetCustomerHelperInfo
// ====================================================

export interface GetCustomerHelperInfo_getCustomerHelperInfo {
  __typename: "CustomerHelperInfo";
  identificationNumber: string | null;
  taxIdentificationNumber: string | null;
  name: string | null;
  city: string | null;
  street: string | null;
  postNumber: string | null;
}

export interface GetCustomerHelperInfo {
  getCustomerHelperInfo: GetCustomerHelperInfo_getCustomerHelperInfo;
}

export interface GetCustomerHelperInfoVariables {
  partialIdentificationNumber: string;
}

/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: ChangePasswordMutation
// ====================================================

export interface ChangePasswordMutation_changePassword {
  __typename: "User";
  id: string;
  name: string | null;
}

export interface ChangePasswordMutation {
  changePassword: ChangePasswordMutation_changePassword;
}

export interface ChangePasswordMutationVariables {
  oldPassword: string;
  newPassword: string;
}

/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

//==============================================================
// START Enums and Input Objects
//==============================================================

export interface AddressInput {
  street?: string | null;
  number?: string | null;
  city?: string | null;
  state?: string | null;
  postNumber?: string | null;
  isPrimary?: boolean | null;
}

export interface CreateCustomerInput {
  name?: string | null;
  personName?: string | null;
  phone?: string | null;
  email?: string | null;
  identificationNumber?: string | null;
  taxIdentificationNumber?: string | null;
  allowedBankPayments?: boolean | null;
  note?: string | null;
  addresses?: AddressInput[] | null;
}

//==============================================================
// END Enums and Input Objects
//==============================================================
