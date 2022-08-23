/**
 * This file was generated by Nexus Schema
 * Do not make changes to this file directly
 */

import type * as prisma from "./../../../node_modules/.prisma/client/index"
import type { Context as Context } from "./../context"
import type { core } from "nexus"
declare global {
  interface NexusGenCustomInputMethods<TypeName extends string> {
    /**
     * A date-time string at UTC, such as 2007-12-03T10:15:30Z, compliant with the `date-time` format outlined in section 5.6 of the RFC 3339 profile of the ISO 8601 standard for representation of dates and times using the Gregorian calendar.
     */
    dateTime<FieldName extends string>(fieldName: FieldName, opts?: core.CommonInputFieldConfig<TypeName, FieldName>): void // "DateTime";
  }
}
declare global {
  interface NexusGenCustomOutputMethods<TypeName extends string> {
    /**
     * A date-time string at UTC, such as 2007-12-03T10:15:30Z, compliant with the `date-time` format outlined in section 5.6 of the RFC 3339 profile of the ISO 8601 standard for representation of dates and times using the Gregorian calendar.
     */
    dateTime<FieldName extends string>(fieldName: FieldName, ...opts: core.ScalarOutSpread<TypeName, FieldName>): void // "DateTime";
  }
}


declare global {
  interface NexusGen extends NexusGenTypes {}
}

export interface NexusGenInputs {
  CreateUserInput: { // input type
    email: string; // String!
    name?: string | null; // String
    password: string; // String!
    role?: NexusGenEnums['UserRole'] | null; // UserRole
  }
  UpdateUserInput: { // input type
    email: string; // String!
    name?: string | null; // String
    password?: string | null; // String
    role?: NexusGenEnums['UserRole'] | null; // UserRole
  }
}

export interface NexusGenEnums {
  UserRole: prisma.UserRole
}

export interface NexusGenScalars {
  String: string
  Int: number
  Float: number
  Boolean: boolean
  ID: string
  DateTime: any
}

export interface NexusGenObjects {
  Address: prisma.Address;
  AuthPayload: { // root type
    token?: string | null; // String
    user?: NexusGenRootTypes['User'] | null; // User
  }
  Customer: prisma.Customer;
  CustomerPaginated: { // root type
    items?: Array<NexusGenRootTypes['Customer'] | null> | null; // [Customer]
    totalCount?: number | null; // Int
  }
  Material: prisma.Material;
  Mutation: {};
  Order: prisma.Order;
  Query: {};
  User: prisma.User;
}

export interface NexusGenInterfaces {
}

export interface NexusGenUnions {
}

export type NexusGenRootTypes = NexusGenObjects

export type NexusGenAllTypes = NexusGenRootTypes & NexusGenScalars & NexusGenEnums

export interface NexusGenFieldTypes {
  Address: { // field return type
    city: string | null; // String
    id: string; // ID!
    isPrimary: boolean; // Boolean!
    number: string | null; // String
    postNumber: string | null; // String
    street: string | null; // String
  }
  AuthPayload: { // field return type
    token: string | null; // String
    user: NexusGenRootTypes['User'] | null; // User
  }
  Customer: { // field return type
    address: NexusGenRootTypes['Address'] | null; // Address
    allowedBankPayments: boolean; // Boolean!
    createdAt: NexusGenScalars['DateTime']; // DateTime!
    createdBy: NexusGenRootTypes['User']; // User!
    email: string | null; // String
    id: string; // ID!
    identificationNumber: string | null; // String
    name: string | null; // String
    note: string | null; // String
    personName: string | null; // String
    phone: string | null; // String
    taxIdentificationNumber: string | null; // String
    updatedAt: NexusGenScalars['DateTime']; // DateTime!
  }
  CustomerPaginated: { // field return type
    items: Array<NexusGenRootTypes['Customer'] | null> | null; // [Customer]
    totalCount: number | null; // Int
  }
  Material: { // field return type
    createdAt: NexusGenScalars['DateTime']; // DateTime!
    createdBy: NexusGenRootTypes['User']; // User!
    id: string; // ID!
    name: string; // String!
    price: number; // Float!
    updatedAt: NexusGenScalars['DateTime']; // DateTime!
  }
  Mutation: { // field return type
    addUser: NexusGenRootTypes['User'] | null; // User
    changePassword: NexusGenRootTypes['User'] | null; // User
    deleteUser: NexusGenRootTypes['User'] | null; // User
    login: NexusGenRootTypes['AuthPayload'] | null; // AuthPayload
    updateUser: NexusGenRootTypes['User'] | null; // User
  }
  Order: { // field return type
    id: string | null; // ID
    number: number | null; // Int
  }
  Query: { // field return type
    getAllCustomers: NexusGenRootTypes['CustomerPaginated'] | null; // CustomerPaginated
    getAllMaterials: Array<NexusGenRootTypes['Material'] | null> | null; // [Material]
    getAllUsers: Array<NexusGenRootTypes['User'] | null> | null; // [User]
    getCustomer: NexusGenRootTypes['Customer'] | null; // Customer
    me: NexusGenRootTypes['User'] | null; // User
  }
  User: { // field return type
    email: string; // String!
    id: string; // ID!
    name: string | null; // String
    role: NexusGenEnums['UserRole']; // UserRole!
  }
}

export interface NexusGenFieldTypeNames {
  Address: { // field return type name
    city: 'String'
    id: 'ID'
    isPrimary: 'Boolean'
    number: 'String'
    postNumber: 'String'
    street: 'String'
  }
  AuthPayload: { // field return type name
    token: 'String'
    user: 'User'
  }
  Customer: { // field return type name
    address: 'Address'
    allowedBankPayments: 'Boolean'
    createdAt: 'DateTime'
    createdBy: 'User'
    email: 'String'
    id: 'ID'
    identificationNumber: 'String'
    name: 'String'
    note: 'String'
    personName: 'String'
    phone: 'String'
    taxIdentificationNumber: 'String'
    updatedAt: 'DateTime'
  }
  CustomerPaginated: { // field return type name
    items: 'Customer'
    totalCount: 'Int'
  }
  Material: { // field return type name
    createdAt: 'DateTime'
    createdBy: 'User'
    id: 'ID'
    name: 'String'
    price: 'Float'
    updatedAt: 'DateTime'
  }
  Mutation: { // field return type name
    addUser: 'User'
    changePassword: 'User'
    deleteUser: 'User'
    login: 'AuthPayload'
    updateUser: 'User'
  }
  Order: { // field return type name
    id: 'ID'
    number: 'Int'
  }
  Query: { // field return type name
    getAllCustomers: 'CustomerPaginated'
    getAllMaterials: 'Material'
    getAllUsers: 'User'
    getCustomer: 'Customer'
    me: 'User'
  }
  User: { // field return type name
    email: 'String'
    id: 'ID'
    name: 'String'
    role: 'UserRole'
  }
}

export interface NexusGenArgTypes {
  Mutation: {
    addUser: { // args
      input: NexusGenInputs['CreateUserInput']; // CreateUserInput!
    }
    changePassword: { // args
      newPassword: string; // String!
      oldPassword: string; // String!
    }
    deleteUser: { // args
      id: string; // ID!
    }
    login: { // args
      email: string; // String!
      password: string; // String!
    }
    updateUser: { // args
      id: string; // ID!
      input: NexusGenInputs['UpdateUserInput']; // UpdateUserInput!
    }
  }
  Query: {
    getAllCustomers: { // args
      first?: number | null; // Int
      search?: string | null; // String
      skip?: number | null; // Int
    }
    getAllMaterials: { // args
      deleted?: boolean | null; // Boolean
    }
    getCustomer: { // args
      id: string; // ID!
    }
  }
}

export interface NexusGenAbstractTypeMembers {
}

export interface NexusGenTypeInterfaces {
}

export type NexusGenObjectNames = keyof NexusGenObjects;

export type NexusGenInputNames = keyof NexusGenInputs;

export type NexusGenEnumNames = keyof NexusGenEnums;

export type NexusGenInterfaceNames = never;

export type NexusGenScalarNames = keyof NexusGenScalars;

export type NexusGenUnionNames = never;

export type NexusGenObjectsUsingAbstractStrategyIsTypeOf = never;

export type NexusGenAbstractsUsingStrategyResolveType = never;

export type NexusGenFeaturesConfig = {
  abstractTypeStrategies: {
    isTypeOf: false
    resolveType: true
    __typename: false
  }
}

export interface NexusGenTypes {
  context: Context;
  inputTypes: NexusGenInputs;
  rootTypes: NexusGenRootTypes;
  inputTypeShapes: NexusGenInputs & NexusGenEnums & NexusGenScalars;
  argTypes: NexusGenArgTypes;
  fieldTypes: NexusGenFieldTypes;
  fieldTypeNames: NexusGenFieldTypeNames;
  allTypes: NexusGenAllTypes;
  typeInterfaces: NexusGenTypeInterfaces;
  objectNames: NexusGenObjectNames;
  inputNames: NexusGenInputNames;
  enumNames: NexusGenEnumNames;
  interfaceNames: NexusGenInterfaceNames;
  scalarNames: NexusGenScalarNames;
  unionNames: NexusGenUnionNames;
  allInputTypes: NexusGenTypes['inputNames'] | NexusGenTypes['enumNames'] | NexusGenTypes['scalarNames'];
  allOutputTypes: NexusGenTypes['objectNames'] | NexusGenTypes['enumNames'] | NexusGenTypes['unionNames'] | NexusGenTypes['interfaceNames'] | NexusGenTypes['scalarNames'];
  allNamedTypes: NexusGenTypes['allInputTypes'] | NexusGenTypes['allOutputTypes']
  abstractTypes: NexusGenTypes['interfaceNames'] | NexusGenTypes['unionNames'];
  abstractTypeMembers: NexusGenAbstractTypeMembers;
  objectsUsingAbstractStrategyIsTypeOf: NexusGenObjectsUsingAbstractStrategyIsTypeOf;
  abstractsUsingStrategyResolveType: NexusGenAbstractsUsingStrategyResolveType;
  features: NexusGenFeaturesConfig;
}


declare global {
  interface NexusGenPluginTypeConfig<TypeName extends string> {
  }
  interface NexusGenPluginInputTypeConfig<TypeName extends string> {
  }
  interface NexusGenPluginFieldConfig<TypeName extends string, FieldName extends string> {
  }
  interface NexusGenPluginInputFieldConfig<TypeName extends string, FieldName extends string> {
  }
  interface NexusGenPluginSchemaConfig {
  }
  interface NexusGenPluginArgConfig {
  }
}