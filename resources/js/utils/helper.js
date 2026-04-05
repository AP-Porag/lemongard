import { GlobalConstant } from './GlobalConstant';

export const isAdmin = (user) => {
    return user?.role === GlobalConstant.ROLE_ADMIN;
};

export const isUser = (user) => {
    return user?.role === GlobalConstant.ROLE_USER;
};

export const subscriptionActive = (user) => {
    return user?.subscription_status === GlobalConstant.SUB_ACTIVE;
};

export const formatCurrency = (amount) => {
    return `$${parseFloat(amount).toFixed(2)}`;
};

export const classNames = (...classes) => {
    return classes.filter(Boolean).join(' ');
};
