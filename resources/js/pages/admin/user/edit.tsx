import AppLayout from '@/layouts/app-layout';
import { Head, router } from '@inertiajs/react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';
import { RotateCw } from 'lucide-react';
import { cn } from '@/lib/utils';

import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';

const schema = z.object({
    firstName: z.string().min(1, 'First name is required'),
    lastName: z.string().min(1, 'Last name is required'),
    email: z.string().email('Valid email is required'),
    role: z.enum(['admin', 'user']),
    status: z.enum(['0', '1']),
});

type FormFields = z.infer<typeof schema>;

export default function Edit({ item }: any) {
    // 🔥 split full name from DB
    const nameParts = item?.name ? item.name.split(' ') : [];

    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting },
    } = useForm<FormFields>({
        resolver: zodResolver(schema),
        defaultValues: {
            firstName: nameParts[0] || '',
            lastName: nameParts.slice(1).join(' ') || '',
            email: item?.email || '',
            role: item?.role || 'user',
            status: item?.status?.toString() || '1',
        },
    });

    const onSubmit = (data: FormFields) => {
        router.put(
            `/admin/users/${item.id}`,
            {
                name: `${data.firstName} ${data.lastName}`,
                email: data.email,
                role: data.role,
                status: data.status,
            },
            {
                onSuccess: (page: any) => {
                    // toast.success(
                    //     page?.props?.flash?.success ||
                    //         'User updated successfully',
                    // );
                },
                onError: (errors) => {
                    console.log('Server Errors:', errors);
                    toast.error(
                        Object.values(errors)[0] || 'Server validation failed',
                    );
                },
            },
        );
    };

    return (
        <AppLayout
            breadcrumbs={[
                { title: 'Users', href: '/admin/users' },
                { title: 'Edit User', href: '#' },
            ]}
        >
            <Head title="Edit User" />

            <form
                onSubmit={handleSubmit(onSubmit)}
                className="w-full space-y-4 p-5 md:w-2/4"
            >
                {/* First Name */}
                <div>
                    <Label>First Name</Label>
                    <Input
                        {...register('firstName')}
                        className={cn(errors.firstName && 'border-red-500')}
                        placeholder="First Name"
                    />
                    {errors.firstName && (
                        <p className="text-sm text-red-500">
                            {errors.firstName.message}
                        </p>
                    )}
                </div>

                {/* Last Name */}
                <div>
                    <Label>Last Name</Label>
                    <Input
                        {...register('lastName')}
                        className={cn(errors.lastName && 'border-red-500')}
                        placeholder="Last Name"
                    />
                    {errors.lastName && (
                        <p className="text-sm text-red-500">
                            {errors.lastName.message}
                        </p>
                    )}
                </div>

                {/* Email */}
                <div>
                    <Label>Email</Label>
                    <Input
                        {...register('email')}
                        type="email"
                        className={cn(errors.email && 'border-red-500')}
                        placeholder="Email"
                    />
                    {errors.email && (
                        <p className="text-sm text-red-500">
                            {errors.email.message}
                        </p>
                    )}
                </div>

                {/* Role */}
                <div>
                    <Label>Role</Label>

                    <select
                        {...register('role')}
                        className="w-full rounded border p-2"
                    >
                        <option value="admin">Admin</option>
                        <option value="user">User</option>
                    </select>

                    {errors.role && (
                        <p className="text-sm text-red-500">
                            {errors.role.message}
                        </p>
                    )}
                </div>

                {/* Status */}
                <div>
                    <Label>Status</Label>

                    <select
                        {...register('status')}
                        className="w-full rounded border p-2"
                    >
                        <option value="1">Active</option>
                        <option value="0">Inactive</option>
                    </select>

                    {errors.status && (
                        <p className="text-sm text-red-500">
                            {errors.status.message}
                        </p>
                    )}
                </div>

                {/* Submit */}
                <Button type="submit" disabled={isSubmitting}>
                    {isSubmitting ? (
                        <>
                            <RotateCw className="mr-2 h-4 w-4 animate-spin" />
                            Updating...
                        </>
                    ) : (
                        'Update User'
                    )}
                </Button>
            </form>
        </AppLayout>
    );
}
