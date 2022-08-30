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
  /** A date-time string at UTC, such as 2007-12-03T10:15:30Z, compliant with the `date-time` format outlined in section 5.6 of the RFC 3339 profile of the ISO 8601 standard for representation of dates and times using the Gregorian calendar. */
  DateTime: any;
};

export type Address = {
  __typename?: 'Address';
  city?: Maybe<Scalars['String']>;
  id: Scalars['ID'];
  isPrimary: Scalars['Boolean'];
  number?: Maybe<Scalars['String']>;
  postNumber?: Maybe<Scalars['String']>;
  street?: Maybe<Scalars['String']>;
};

export type AddressInput = {
  city?: InputMaybe<Scalars['String']>;
  isPrimary?: InputMaybe<Scalars['Boolean']>;
  number?: InputMaybe<Scalars['String']>;
  postNumber?: InputMaybe<Scalars['String']>;
  state?: InputMaybe<Scalars['String']>;
  street?: InputMaybe<Scalars['String']>;
};

export type AuthPayload = {
  __typename?: 'AuthPayload';
  token?: Maybe<Scalars['String']>;
  user?: Maybe<User>;
};

export type CreateCustomerInput = {
  addresses?: InputMaybe<Array<InputMaybe<AddressInput>>>;
  allowedBankPayments?: InputMaybe<Scalars['Boolean']>;
  email?: InputMaybe<Scalars['String']>;
  identificationNumber?: InputMaybe<Scalars['String']>;
  name?: InputMaybe<Scalars['String']>;
  note?: InputMaybe<Scalars['String']>;
  personName?: InputMaybe<Scalars['String']>;
  phone?: InputMaybe<Scalars['String']>;
  taxIdentificationNumber?: InputMaybe<Scalars['String']>;
};

export type CreateUserInput = {
  email: Scalars['String'];
  name?: InputMaybe<Scalars['String']>;
  password: Scalars['String'];
  role?: InputMaybe<UserRole>;
};

export type Customer = {
  __typename?: 'Customer';
  addresses?: Maybe<Array<Address>>;
  allowedBankPayments: Scalars['Boolean'];
  createdAt: Scalars['DateTime'];
  createdBy: User;
  email?: Maybe<Scalars['String']>;
  id: Scalars['ID'];
  identificationNumber?: Maybe<Scalars['String']>;
  name?: Maybe<Scalars['String']>;
  note?: Maybe<Scalars['String']>;
  personName?: Maybe<Scalars['String']>;
  phone?: Maybe<Scalars['String']>;
  taxIdentificationNumber?: Maybe<Scalars['String']>;
  updatedAt: Scalars['DateTime'];
};

export type CustomerPaginated = {
  __typename?: 'CustomerPaginated';
  items?: Maybe<Array<Maybe<Customer>>>;
  totalCount?: Maybe<Scalars['Int']>;
};

export type Material = {
  __typename?: 'Material';
  createdAt: Scalars['DateTime'];
  createdBy: User;
  id: Scalars['ID'];
  name: Scalars['String'];
  price: Scalars['Float'];
  updatedAt: Scalars['DateTime'];
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
  orderItemId: Scalars['ID'];
  pieces: Scalars['Int'];
};


export type MutationAddUserArgs = {
  input: CreateUserInput;
};


export type MutationChangePasswordArgs = {
  newPassword: Scalars['String'];
  oldPassword: Scalars['String'];
};


export type MutationCreateCustomerArgs = {
  input: CreateCustomerInput;
};


export type MutationCreateMaterialArgs = {
  name: Scalars['String'];
  price: Scalars['Float'];
};


export type MutationCreateOrderArgs = {
  input: OrderInput;
  number: Scalars['Int'];
};


export type MutationDeleteCustomerArgs = {
  id: Scalars['ID'];
};


export type MutationDeleteMaterialArgs = {
  id: Scalars['ID'];
};


export type MutationDeleteOrderArgs = {
  id: Scalars['ID'];
};


export type MutationDeleteUserArgs = {
  id: Scalars['ID'];
};


export type MutationLoginArgs = {
  email: Scalars['String'];
  password: Scalars['String'];
};


export type MutationUpdateCustomerArgs = {
  input: UpdateCustomerInput;
};


export type MutationUpdateMaterialArgs = {
  id: Scalars['ID'];
  name?: InputMaybe<Scalars['String']>;
  price?: InputMaybe<Scalars['Float']>;
};


export type MutationUpdateOrderArgs = {
  id: Scalars['ID'];
  input: UpdateOrderInput;
};


export type MutationUpdateOrderNoteArgs = {
  id: Scalars['ID'];
  note?: InputMaybe<Scalars['String']>;
};


export type MutationUpdateOrderStatusArgs = {
  id: Scalars['ID'];
  status: OrderStatus;
};


export type MutationUpdateUserArgs = {
  id: Scalars['ID'];
  input: UpdateUserInput;
};

export type Order = {
  __typename?: 'Order';
  createdAt: Scalars['DateTime'];
  createdBy: User;
  customer?: Maybe<Customer>;
  id: Scalars['ID'];
  items?: Maybe<Array<Maybe<OrderItem>>>;
  note?: Maybe<Scalars['String']>;
  number: Scalars['Int'];
  shippedAt?: Maybe<Scalars['DateTime']>;
  status: OrderStatus;
  totalPrice: Scalars['Float'];
  totalSize?: Maybe<Scalars['Float']>;
  totalTax: Scalars['Float'];
  updatedAt: Scalars['DateTime'];
  urgency: Scalars['Int'];
};


export type OrderItemsArgs = {
  orderByCreatedAt?: InputMaybe<OrderByArg>;
};

export enum OrderByArg {
  Asc = 'asc',
  Desc = 'desc'
}

export type OrderInput = {
  customerId?: InputMaybe<Scalars['ID']>;
  items: Array<InputMaybe<OrderItemInput>>;
  note?: InputMaybe<Scalars['String']>;
  status?: InputMaybe<OrderStatus>;
  totalPrice: Scalars['Float'];
  totalTax: Scalars['Float'];
  urgency?: InputMaybe<Scalars['Int']>;
};

export type OrderItem = {
  __typename?: 'OrderItem';
  createdAt: Scalars['DateTime'];
  createdBy: User;
  height?: Maybe<Scalars['Float']>;
  id: Scalars['ID'];
  material?: Maybe<Material>;
  name?: Maybe<Scalars['String']>;
  pieces?: Maybe<Scalars['Int']>;
  printedPieces?: Maybe<Scalars['Int']>;
  producedPieces?: Maybe<Scalars['Int']>;
  productionLogs: Array<ProductionLog>;
  totalPrice: Scalars['Float'];
  totalTax: Scalars['Float'];
  updatedAt: Scalars['DateTime'];
  width?: Maybe<Scalars['Float']>;
};

export type OrderItemInput = {
  height?: InputMaybe<Scalars['Float']>;
  materialId?: InputMaybe<Scalars['ID']>;
  name?: InputMaybe<Scalars['String']>;
  pieces?: InputMaybe<Scalars['Int']>;
  totalPrice: Scalars['Float'];
  totalTax: Scalars['Float'];
  width?: InputMaybe<Scalars['Float']>;
};

export type OrderPaginated = {
  __typename?: 'OrderPaginated';
  items?: Maybe<Array<Maybe<Order>>>;
  totalCount?: Maybe<Scalars['Int']>;
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
  createdAt: Scalars['DateTime'];
  createdBy: User;
  id: Scalars['ID'];
  orderItem: OrderItem;
  pieces: Scalars['Int'];
};

export enum ProductionLogAction {
  Print = 'PRINT',
  Production = 'PRODUCTION'
}

export type Query = {
  __typename?: 'Query';
  getAllCustomers?: Maybe<CustomerPaginated>;
  getAllMaterials?: Maybe<Array<Maybe<Material>>>;
  getAllOrders?: Maybe<OrderPaginated>;
  getAllUsers?: Maybe<Array<Maybe<User>>>;
  getCustomer?: Maybe<Customer>;
  getHighestOrderNumber?: Maybe<Scalars['Int']>;
  getOrder?: Maybe<Order>;
  getOrderByNumber?: Maybe<Order>;
  me?: Maybe<User>;
};


export type QueryGetAllCustomersArgs = {
  first?: InputMaybe<Scalars['Int']>;
  search?: InputMaybe<Scalars['String']>;
  skip?: InputMaybe<Scalars['Int']>;
};


export type QueryGetAllMaterialsArgs = {
  deleted?: InputMaybe<Scalars['Boolean']>;
};


export type QueryGetAllOrdersArgs = {
  customerId?: InputMaybe<Scalars['ID']>;
  first?: InputMaybe<Scalars['Int']>;
  orderByUrgency?: InputMaybe<OrderByArg>;
  skip?: InputMaybe<Scalars['Int']>;
  status?: InputMaybe<OrderStatus>;
};


export type QueryGetCustomerArgs = {
  id: Scalars['ID'];
};


export type QueryGetOrderArgs = {
  id: Scalars['ID'];
};


export type QueryGetOrderByNumberArgs = {
  number: Scalars['Int'];
};

export type UpdateAddressInput = {
  city?: InputMaybe<Scalars['String']>;
  id?: InputMaybe<Scalars['ID']>;
  isPrimary?: InputMaybe<Scalars['Boolean']>;
  number?: InputMaybe<Scalars['String']>;
  postNumber?: InputMaybe<Scalars['String']>;
  state?: InputMaybe<Scalars['String']>;
  street?: InputMaybe<Scalars['String']>;
};

export type UpdateCustomerInput = {
  addresses?: InputMaybe<Array<InputMaybe<UpdateAddressInput>>>;
  allowedBankPayments?: InputMaybe<Scalars['Boolean']>;
  email?: InputMaybe<Scalars['String']>;
  id?: InputMaybe<Scalars['ID']>;
  identificationNumber?: InputMaybe<Scalars['String']>;
  name?: InputMaybe<Scalars['String']>;
  note?: InputMaybe<Scalars['String']>;
  personName?: InputMaybe<Scalars['String']>;
  phone?: InputMaybe<Scalars['String']>;
  taxIdentificationNumber?: InputMaybe<Scalars['String']>;
};

export type UpdateOrderInput = {
  customerId?: InputMaybe<Scalars['ID']>;
  items?: InputMaybe<Array<InputMaybe<UpdateOrderItemInput>>>;
  note?: InputMaybe<Scalars['String']>;
  status?: InputMaybe<OrderStatus>;
  totalPrice?: InputMaybe<Scalars['Float']>;
  totalTax?: InputMaybe<Scalars['Float']>;
  urgency?: InputMaybe<Scalars['Int']>;
};

export type UpdateOrderItemInput = {
  height?: InputMaybe<Scalars['Float']>;
  id: Scalars['ID'];
  materialId: Scalars['ID'];
  name?: InputMaybe<Scalars['String']>;
  pieces?: InputMaybe<Scalars['Int']>;
  totalPrice: Scalars['Float'];
  totalTax: Scalars['Float'];
  width?: InputMaybe<Scalars['Float']>;
};

export type UpdateUserInput = {
  email: Scalars['String'];
  name?: InputMaybe<Scalars['String']>;
  password?: InputMaybe<Scalars['String']>;
  role?: InputMaybe<UserRole>;
};

export type User = {
  __typename?: 'User';
  canBeEdited: Scalars['Boolean'];
  email: Scalars['String'];
  id: Scalars['ID'];
  name?: Maybe<Scalars['String']>;
  role: UserRole;
};

export enum UserRole {
  Administration = 'ADMINISTRATION',
  Executive = 'EXECUTIVE',
  Factory = 'FACTORY'
}
