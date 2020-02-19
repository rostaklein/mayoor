import { Login } from './auth/login';
import { Register } from './auth/register';
import { ChangePassword } from './auth/changePassword';
import { CreateOrder } from './orders/createOrder';
import { CreateCustomer } from './customers/createCustomer';

export const Mutations = {
  Login,
  Register,
  CreateOrder,
  ChangePassword,
  CreateCustomer,
};
