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

const breadcrumbs = [
    {
        title: 'Create User',
        href: '/users/create',
    },
];

const schema = z.object({
    firstName: z.string().min(1, 'First name is required'),
    lastName: z.string().min(1, 'Last name is required'),
    email: z.string().email('Valid email is required'),
    role: z.enum(['admin', 'user']),
});

type FormFields = z.infer<typeof schema>;

export default function Create() {
    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting },
    } = useForm<FormFields>({
        resolver: zodResolver(schema),
        defaultValues: {
            firstName: '',
            lastName: '',
            email: '',
            role: 'admin',
        },
    });

    const onSubmit = (data: FormFields) => {
        router.post(
            '/admin/users',
            {
                first_name: data.firstName,
                last_name: data.lastName,
                email: data.email,
                role: data.role,
            },
            {
                onSuccess: (page: any) => {
                    // toast.success(
                    //     page?.props?.flash?.success ||
                    //         'User created successfully',
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
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Create User" />

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

                {/* Submit */}
                <Button type="submit" disabled={isSubmitting}>
                    {isSubmitting ? (
                        <>
                            <RotateCw className="mr-2 h-4 w-4 animate-spin" />
                            Processing...
                        </>
                    ) : (
                        'Submit'
                    )}
                </Button>
            </form>
        </AppLayout>
    );
}
