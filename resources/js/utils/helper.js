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

export const formatMailTime = (dateString) => {
    if (!dateString) return 'N/A';

    const date = new Date(dateString);
    const now = new Date();

    const isToday = date.toDateString() === now.toDateString();

    const yesterday = new Date();
    yesterday.setDate(now.getDate() - 1);
    const isYesterday = date.toDateString() === yesterday.toDateString();

    const diffTime = now - date;
    const diffDays = diffTime / (1000 * 60 * 60 * 24);

    if (isToday) {
        return date.toLocaleTimeString([], {
            hour: '2-digit',
            minute: '2-digit',
        });
    }

    if (isYesterday) {
        return 'Yesterday';
    }

    if (diffDays < 7) {
        return date.toLocaleDateString([], { weekday: 'short' });
    }

    return date.toLocaleDateString([], {
        day: '2-digit',
        month: 'short',
    });
};
