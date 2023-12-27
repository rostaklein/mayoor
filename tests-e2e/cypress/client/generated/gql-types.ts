export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type MakeEmpty<T extends { [key: string]: unknown }, K extends keyof T> = { [_ in K]?: never };
export type Incremental<T> = T | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string; }
  String: { input: string; output: string; }
  Boolean: { input: boolean; output: boolean; }
  Int: { input: number; output: number; }
  Float: { input: number; output: number; }
  /** A date-time string at UTC, such as 2007-12-03T10:15:30Z, compliant with the `date-time` format outlined in section 5.6 of the RFC 3339 profile of the ISO 8601 standard for representation of dates and times using the Gregorian calendar. */
  DateTime: { input: any; output: any; }
};

export type Address = {
  __typename?: 'Address';
  city?: Maybe<Scalars['String']['output']>;
  id: Scalars['ID']['output'];
  isPrimary: Scalars['Boolean']['output'];
  number?: Maybe<Scalars['String']['output']>;
  postNumber?: Maybe<Scalars['String']['output']>;
  street?: Maybe<Scalars['String']['output']>;
};

export type AddressInput = {
  city?: InputMaybe<Scalars['String']['input']>;
  isPrimary?: InputMaybe<Scalars['Boolean']['input']>;
  number?: InputMaybe<Scalars['String']['input']>;
  postNumber?: InputMaybe<Scalars['String']['input']>;
  state?: InputMaybe<Scalars['String']['input']>;
  street?: InputMaybe<Scalars['String']['input']>;
};

export type AuthPayload = {
  __typename?: 'AuthPayload';
  token?: Maybe<Scalars['String']['output']>;
  user?: Maybe<User>;
};

export type CreateCustomerInput = {
  addresses?: InputMaybe<Array<InputMaybe<AddressInput>>>;
  allowedBankPayments?: InputMaybe<Scalars['Boolean']['input']>;
  email?: InputMaybe<Scalars['String']['input']>;
  identificationNumber?: InputMaybe<Scalars['String']['input']>;
  name?: InputMaybe<Scalars['String']['input']>;
  note?: InputMaybe<Scalars['String']['input']>;
  personName?: InputMaybe<Scalars['String']['input']>;
  phone?: InputMaybe<Scalars['String']['input']>;
  taxIdentificationNumber?: InputMaybe<Scalars['String']['input']>;
};

export type CreateUserInput = {
  email: Scalars['String']['input'];
  name?: InputMaybe<Scalars['String']['input']>;
  password: Scalars['String']['input'];
  role?: InputMaybe<UserRole>;
};

export type Customer = {
  __typename?: 'Customer';
  addresses?: Maybe<Array<Address>>;
  allowedBankPayments: Scalars['Boolean']['output'];
  createdAt: Scalars['DateTime']['output'];
  createdBy: User;
  email?: Maybe<Scalars['String']['output']>;
  id: Scalars['ID']['output'];
  identificationNumber?: Maybe<Scalars['String']['output']>;
  name?: Maybe<Scalars['String']['output']>;
  note?: Maybe<Scalars['String']['output']>;
  personName?: Maybe<Scalars['String']['output']>;
  phone?: Maybe<Scalars['String']['output']>;
  taxIdentificationNumber?: Maybe<Scalars['String']['output']>;
  updatedAt: Scalars['DateTime']['output'];
};

export type CustomerPaginated = {
  __typename?: 'CustomerPaginated';
  items?: Maybe<Array<Customer>>;
  totalCount?: Maybe<Scalars['Int']['output']>;
};

export type Material = {
  __typename?: 'Material';
  createdAt: Scalars['DateTime']['output'];
  createdBy: User;
  id: Scalars['ID']['output'];
  name: Scalars['String']['output'];
  price: Scalars['Float']['output'];
  updatedAt: Scalars['DateTime']['output'];
};

export type Mutation = {
  __typename?: 'Mutation';
  addProductionLog?: Maybe<OrderItem>;
  addUser?: Maybe<User>;
  changePassword?: Maybe<User>;
  createCustomer?: Maybe<Customer>;
  createMaterial?: Maybe<Material>;
  createOrder?: Maybe<Order>;
  deleteCustomer?: Maybe<Customer>;
  deleteMaterial?: Maybe<Material>;
  deleteOrder?: Maybe<Order>;
  deleteUser?: Maybe<User>;
  login?: Maybe<AuthPayload>;
  updateCustomer?: Maybe<Customer>;
  updateMaterial?: Maybe<Material>;
  updateOrder?: Maybe<Order>;
  updateOrderNote?: Maybe<Order>;
  updateOrderStatus?: Maybe<Order>;
  updateUser?: Maybe<User>;
};


export type MutationAddProductionLogArgs = {
  action: ProductionLogAction;
  orderItemId: Scalars['ID']['input'];
  pieces: Scalars['Int']['input'];
};


export type MutationAddUserArgs = {
  input: CreateUserInput;
};


export type MutationChangePasswordArgs = {
  newPassword: Scalars['String']['input'];
  oldPassword: Scalars['String']['input'];
};


export type MutationCreateCustomerArgs = {
  input: CreateCustomerInput;
};


export type MutationCreateMaterialArgs = {
  name: Scalars['String']['input'];
  price: Scalars['Float']['input'];
};


export type MutationCreateOrderArgs = {
  input: OrderInput;
  number: Scalars['Int']['input'];
};


export type MutationDeleteCustomerArgs = {
  id: Scalars['ID']['input'];
};


export type MutationDeleteMaterialArgs = {
  id: Scalars['ID']['input'];
};


export type MutationDeleteOrderArgs = {
  id: Scalars['ID']['input'];
};


export type MutationDeleteUserArgs = {
  id: Scalars['ID']['input'];
};


export type MutationLoginArgs = {
  email: Scalars['String']['input'];
  password: Scalars['String']['input'];
};


export type MutationUpdateCustomerArgs = {
  input: UpdateCustomerInput;
};


export type MutationUpdateMaterialArgs = {
  id: Scalars['ID']['input'];
  name?: InputMaybe<Scalars['String']['input']>;
  price?: InputMaybe<Scalars['Float']['input']>;
};


export type MutationUpdateOrderArgs = {
  id: Scalars['ID']['input'];
  input: UpdateOrderInput;
};


export type MutationUpdateOrderNoteArgs = {
  id: Scalars['ID']['input'];
  note?: InputMaybe<Scalars['String']['input']>;
};


export type MutationUpdateOrderStatusArgs = {
  id: Scalars['ID']['input'];
  status: OrderStatus;
};


export type MutationUpdateUserArgs = {
  id: Scalars['ID']['input'];
  input: UpdateUserInput;
};

export type Order = {
  __typename?: 'Order';
  createdAt: Scalars['DateTime']['output'];
  createdBy: User;
  customer?: Maybe<Customer>;
  id: Scalars['ID']['output'];
  items: Array<OrderItem>;
  note?: Maybe<Scalars['String']['output']>;
  number: Scalars['Int']['output'];
  shippedAt?: Maybe<Scalars['DateTime']['output']>;
  status: OrderStatus;
  totalPrice: Scalars['Float']['output'];
  totalSize?: Maybe<Scalars['Float']['output']>;
  totalTax: Scalars['Float']['output'];
  updatedAt: Scalars['DateTime']['output'];
  urgency: Scalars['Int']['output'];
};


export type OrderItemsArgs = {
  orderByCreatedAt?: InputMaybe<OrderByArg>;
};

export enum OrderByArg {
  Asc = 'asc',
  Desc = 'desc'
}

export type OrderInput = {
  customerId: Scalars['ID']['input'];
  items: Array<OrderItemInput>;
  note?: InputMaybe<Scalars['String']['input']>;
  status?: InputMaybe<OrderStatus>;
  totalPrice: Scalars['Float']['input'];
  totalTax: Scalars['Float']['input'];
  urgency?: InputMaybe<Scalars['Int']['input']>;
};

export type OrderItem = {
  __typename?: 'OrderItem';
  createdAt: Scalars['DateTime']['output'];
  createdBy: User;
  height?: Maybe<Scalars['Float']['output']>;
  id: Scalars['ID']['output'];
  material?: Maybe<Material>;
  name?: Maybe<Scalars['String']['output']>;
  pieces?: Maybe<Scalars['Int']['output']>;
  printedPieces?: Maybe<Scalars['Int']['output']>;
  producedPieces?: Maybe<Scalars['Int']['output']>;
  productionLogs: Array<ProductionLog>;
  totalPrice: Scalars['Float']['output'];
  totalTax: Scalars['Float']['output'];
  updatedAt: Scalars['DateTime']['output'];
  width?: Maybe<Scalars['Float']['output']>;
};

export type OrderItemInput = {
  height?: InputMaybe<Scalars['Float']['input']>;
  materialId?: InputMaybe<Scalars['ID']['input']>;
  name?: InputMaybe<Scalars['String']['input']>;
  pieces?: InputMaybe<Scalars['Int']['input']>;
  totalPrice: Scalars['Float']['input'];
  totalTax: Scalars['Float']['input'];
  width?: InputMaybe<Scalars['Float']['input']>;
};

export type OrderPaginated = {
  __typename?: 'OrderPaginated';
  items?: Maybe<Array<Order>>;
  totalCount?: Maybe<Scalars['Int']['output']>;
};

export enum OrderStatus {
  Done = 'DONE',
  New = 'NEW',
  ReadyToPrint = 'READY_TO_PRINT',
  ToBeShipped = 'TO_BE_SHIPPED',
  WaitingForCalculation = 'WAITING_FOR_CALCULATION',
  WaitingForProduction = 'WAITING_FOR_PRODUCTION'
}

export type ProductionLog = {
  __typename?: 'ProductionLog';
  action: ProductionLogAction;
  createdAt: Scalars['DateTime']['output'];
  createdBy: User;
  id: Scalars['ID']['output'];
  orderItem: OrderItem;
  pieces: Scalars['Int']['output'];
};

export enum ProductionLogAction {
  Print = 'PRINT',
  Production = 'PRODUCTION'
}

export type Query = {
  __typename?: 'Query';
  getAllCustomers?: Maybe<CustomerPaginated>;
  getAllMaterials?: Maybe<Array<Material>>;
  getAllOrders?: Maybe<OrderPaginated>;
  getAllUsers?: Maybe<Array<User>>;
  getCustomer?: Maybe<Customer>;
  getHighestOrderNumber?: Maybe<Scalars['Int']['output']>;
  getOrder?: Maybe<Order>;
  getOrderByNumber?: Maybe<Order>;
  me?: Maybe<User>;
};


export type QueryGetAllCustomersArgs = {
  first?: InputMaybe<Scalars['Int']['input']>;
  search?: InputMaybe<Scalars['String']['input']>;
  skip?: InputMaybe<Scalars['Int']['input']>;
};


export type QueryGetAllMaterialsArgs = {
  deleted?: InputMaybe<Scalars['Boolean']['input']>;
};


export type QueryGetAllOrdersArgs = {
  customerId?: InputMaybe<Scalars['ID']['input']>;
  first?: InputMaybe<Scalars['Int']['input']>;
  orderByUrgency?: InputMaybe<OrderByArg>;
  skip?: InputMaybe<Scalars['Int']['input']>;
  status?: InputMaybe<OrderStatus>;
};


export type QueryGetCustomerArgs = {
  id: Scalars['ID']['input'];
};


export type QueryGetOrderArgs = {
  id: Scalars['ID']['input'];
};


export type QueryGetOrderByNumberArgs = {
  number: Scalars['Int']['input'];
};

export type UpdateAddressInput = {
  city?: InputMaybe<Scalars['String']['input']>;
  id: Scalars['ID']['input'];
  isPrimary?: InputMaybe<Scalars['Boolean']['input']>;
  number?: InputMaybe<Scalars['String']['input']>;
  postNumber?: InputMaybe<Scalars['String']['input']>;
  state?: InputMaybe<Scalars['String']['input']>;
  street?: InputMaybe<Scalars['String']['input']>;
};

export type UpdateCustomerInput = {
  addresses: Array<UpdateAddressInput>;
  allowedBankPayments?: InputMaybe<Scalars['Boolean']['input']>;
  email?: InputMaybe<Scalars['String']['input']>;
  id: Scalars['ID']['input'];
  identificationNumber?: InputMaybe<Scalars['String']['input']>;
  name?: InputMaybe<Scalars['String']['input']>;
  note?: InputMaybe<Scalars['String']['input']>;
  personName?: InputMaybe<Scalars['String']['input']>;
  phone?: InputMaybe<Scalars['String']['input']>;
  taxIdentificationNumber?: InputMaybe<Scalars['String']['input']>;
};

export type UpdateOrderInput = {
  customerId: Scalars['ID']['input'];
  items?: InputMaybe<Array<UpdateOrderItemInput>>;
  note?: InputMaybe<Scalars['String']['input']>;
  status?: InputMaybe<OrderStatus>;
  totalPrice?: InputMaybe<Scalars['Float']['input']>;
  totalTax?: InputMaybe<Scalars['Float']['input']>;
  urgency?: InputMaybe<Scalars['Int']['input']>;
};

export type UpdateOrderItemInput = {
  height?: InputMaybe<Scalars['Float']['input']>;
  id?: InputMaybe<Scalars['ID']['input']>;
  materialId: Scalars['ID']['input'];
  name?: InputMaybe<Scalars['String']['input']>;
  pieces?: InputMaybe<Scalars['Int']['input']>;
  totalPrice: Scalars['Float']['input'];
  totalTax: Scalars['Float']['input'];
  width?: InputMaybe<Scalars['Float']['input']>;
};

export type UpdateUserInput = {
  email: Scalars['String']['input'];
  name?: InputMaybe<Scalars['String']['input']>;
  password?: InputMaybe<Scalars['String']['input']>;
  role?: InputMaybe<UserRole>;
};

export type User = {
  __typename?: 'User';
  canBeEdited: Scalars['Boolean']['output'];
  email: Scalars['String']['output'];
  id: Scalars['ID']['output'];
  name?: Maybe<Scalars['String']['output']>;
  role: UserRole;
};

export enum UserRole {
  Administration = 'ADMINISTRATION',
  Executive = 'EXECUTIVE',
  Factory = 'FACTORY'
}
