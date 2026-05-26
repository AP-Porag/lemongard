import React, { useState, useEffect } from 'react';
import { Head, router, usePage } from '@inertiajs/react';
import AppLayout from '@/layouts/app-layout';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';
// import 'react-phone-number-input/style.css';
// import PhoneInput from 'react-phone-number-input';

import type { BreadcrumbItem } from '@/types';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Create Record',
        href: '',
    },
];

// Industry dropdown options
const industryOptions = [
    'Hair Salon',
    'Aesthetician',
];

export default function Create({ userId }) {
    const { flash } = usePage().props;

    const [loading, setLoading] = useState(false);

    const [form, setForm] = useState({
        user_id: userId || '',
        first_name: '',
        last_name: '',
        phone_cell: '',
        phone_home: '',
        industry: '',
        street: '',
        city: '',
        state: '',
        zip: '',
        service: '',
        price: '',
        incident_report: '',
    });

    const [errors, setErrors] = useState({});

    // const handleChange = (e) => {
    //     setForm({
    //         ...form,
    //         [e.target.name]: e.target.value,
    //     });
    // };

    // Phone format handler
    const formatPhoneNumber = (value) => {
        const numbers = value.replace(/\D/g, '').slice(0, 15);

        const parts = [];

        for (let i = 0; i < numbers.length; i += 3) {
            parts.push(numbers.slice(i, i + 3));
        }

        return parts.join('-');

    };

    const handleChange = (e) => {
        const { name, value } = e.target;

        // Phone formatting
        if (name === 'phone_cell' || name === 'phone_home') {
            setForm({
                ...form,
                [name]: formatPhoneNumber(value),
            });

            return;
        }

        // Reset service when industry changes
        if (name === 'industry') {
            setForm({
                ...form,
                industry: value,
                service: '',
            });

            return;
        }

        setForm({
            ...form,
            [name]: value,
        });
    };

    const submit = (e) => {
        e.preventDefault();
        setLoading(true);

        router.post(route('app.records.store'), form, {
            onError: (err) => {
                setErrors(err);
            },

            onSuccess: () => {
                setForm({
                    user_id: userId || '',
                    first_name: '',
                    last_name: '',
                    phone_cell: '',
                    phone_home: '',
                    industry: '',
                    street: '',
                    city: '',
                    state: '',
                    zip: '',
                    service: '',
                    price: '',
                    incident_report: '',
                });

                setErrors({});
            },

            onFinish: () => setLoading(false),
        });
    };


    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Create Record" />

            <div className="mx-auto mt-6 w-full max-w-7xl px-4 sm:px-6 lg:px-8">
                <div className="rounded-xl bg-white p-4 shadow sm:p-6">
                    <h1 className="mb-6 text-2xl font-bold">Create Record</h1>

                    <form onSubmit={submit} className="grid grid-cols-2 gap-4">
                        {/* Hidden user_id */}

                        <input
                            type="hidden"
                            name="user_id"
                            value={form.user_id}
                        />

                        {/* First Name */}
                        <div>
                            <label className="text-sm font-medium">
                                First Name
                            </label>
                            <input
                                name="first_name"
                                value={form.first_name}
                                onChange={handleChange}
                                className="w-full rounded border px-3 py-2"
                            />
                            {errors.first_name && (
                                <p className="text-sm text-red-500">
                                    {errors.first_name}
                                </p>
                            )}
                        </div>

                        {/* Last Name */}
                        <div>
                            <label className="text-sm font-medium">
                                Last Name
                            </label>
                            <input
                                name="last_name"
                                value={form.last_name}
                                onChange={handleChange}
                                className="w-full rounded border px-3 py-2"
                            />
                            {errors.last_name && (
                                <p className="text-sm text-red-500">
                                    {errors.last_name}
                                </p>
                            )}
                        </div>

                        {/* Phone Cell */}
                        {/* <div>
                            <label className="text-sm font-medium">
                                Phone Cell
                            </label>
                            <input
                                name="phone_cell"
                                value={form.phone_cell}
                                onChange={handleChange}
                                className="w-full rounded border px-3 py-2"
                            />
                            {errors.phone_cell && (
                                <p className="text-sm text-red-500">
                                    {errors.phone_cell}
                                </p>
                            )}
                        </div> */}

                        {/* Phone Home */}
                        {/* <div>
                            <label className="text-sm font-medium">
                                Phone Home
                            </label>
                            <input
                                name="phone_home"
                                value={form.phone_home}
                                onChange={handleChange}
                                className="w-full rounded border px-3 py-2"
                            />
                        </div> */}

                        {/* Phone Cell */}
                        <div>
                            <label className="text-sm font-medium">
                                Phone Cell
                            </label>

                            <input
                                type="text"
                                name="phone_cell"
                                value={form.phone_cell}
                                onChange={handleChange}
                                maxLength={15}
                                className="w-full rounded border px-3 py-2"
                            />

                            {errors.phone_cell && (
                                <p className="text-sm text-red-500">
                                    {errors.phone_cell}
                                </p>
                            )}
                        </div>

                        {/* Phone Home */}
                        <div>
                            <label className="text-sm font-medium">
                                Phone Home
                            </label>

                            <input
                                type="text"
                                name="phone_home"
                                value={form.phone_home}
                                onChange={handleChange}
                                maxLength={15}
                                className="w-full rounded border px-3 py-2"
                            />

                            {errors.phone_home && (
                                <p className="text-sm text-red-500">
                                    {errors.phone_home}
                                </p>
                            )}
                        </div>

                        {/* Industry */}
                        <div className="">
                            <label className="text-sm font-medium">
                                Industry
                            </label>
                            {/* <input
                                name="industry"
                                value={form.industry}
                                onChange={handleChange}
                                className="w-full rounded border px-3 py-2"
                            /> */}

                            <select
                                name="industry"
                                value={form.industry}
                                onChange={handleChange}
                                className="w-full rounded border px-2 py-2"
                            >
                                <option className="text-sm" value="">
                                    Select Industry
                                </option>

                                {industryOptions.map((industry) => (
                                    <option
                                        key={industry}
                                        value={industry}
                                    >
                                        {industry}
                                    </option>
                                ))}
                            </select>

                            {errors.industry && (
                                <p className="text-sm text-red-500">
                                    {errors.industry}
                                </p>
                            )}
                        </div>


                        {/* Street */}
                        <div>
                            <label className="text-sm font-medium">
                                Street
                            </label>
                            <input
                                name="street"
                                value={form.street}
                                onChange={handleChange}
                                className="w-full rounded border px-3 py-2"
                            />
                            {errors.street && (
                                <p className="text-sm text-red-500">
                                    {errors.street}
                                </p>
                            )}
                        </div>

                        {/* City */}
                        <div>
                            <label className="text-sm font-medium">City</label>
                            <input
                                name="city"
                                value={form.city}
                                onChange={handleChange}
                                className="w-full rounded border px-3 py-2"
                            />
                            {errors.city && (
                                <p className="text-sm text-red-500">
                                    {errors.city}
                                </p>
                            )}
                        </div>

                        {/* State */}
                        <div>
                            <label className="text-sm font-medium">State</label>
                            <input
                                name="state"
                                value={form.state}
                                onChange={handleChange}
                                className="w-full rounded border px-3 py-2"
                            />
                            {errors.state && (
                                <p className="text-sm text-red-500">
                                    {errors.state}
                                </p>
                            )}
                        </div>

                        {/* Zip */}
                        <div>
                            <label className="text-sm font-medium">Zip</label>
                            <input
                                name="zip"
                                value={form.zip}
                                onChange={handleChange}
                                className="w-full rounded border px-3 py-2"
                            />
                            {errors.zip && (
                                <p className="text-sm text-red-500">
                                    {errors.zip}
                                </p>
                            )}
                        </div>

                        {/* Service */}
                        <div>
                            <label className="text-sm font-medium">
                                Service
                            </label>
                            <input
                                name="service"
                                value={form.service}
                                onChange={handleChange}
                                className="w-full rounded border px-3 py-2"
                            />
                            {errors.service && (
                                <p className="text-sm text-red-500">
                                    {errors.service}
                                </p>
                            )}
                        </div>

                        {/* Price */}
                        <div>
                            <label className="text-sm font-medium">Price</label>
                            <div className="relative">
                                <input
                                    name="price"
                                    type="number"
                                    value={form.price}
                                    onChange={handleChange}
                                    className="w-full rounded border pl-7 pr-3 py-2"
                                />
                                <span className="absolute -top-1\2 translate-y-1/2 left-3 text-[14px]">$</span>
                            </div>
                            {errors.price && (
                                <p className="text-sm text-red-500">
                                    {errors.price}
                                </p>
                            )}
                        </div>

                        {/* Incident Report */}
                        <div className="col-span-2">
                            <label className="text-sm font-medium">
                                Incident Report
                            </label>
                            <textarea
                                name="incident_report"
                                value={form.incident_report}
                                onChange={handleChange}
                                className="w-full rounded border px-3 py-2"
                                rows="4"
                            />
                        </div>

                        {/* Submit */}
                        <div className="col-span-2">
                            <Button
                                type="submit"
                                disabled={loading}
                                className="w-full bg-black text-white"
                            >
                                {loading ? 'Saving...' : 'Save Record'}
                            </Button>
                        </div>
                    </form>
                </div>
            </div>
        </AppLayout>
    );
}

// import React, { useState, useEffect } from 'react';
// import { Head, router, usePage } from '@inertiajs/react';
// import AppLayout from '@/layouts/app-layout';
// import { Button } from '@/components/ui/button';
// import { toast } from 'sonner';

// import type { BreadcrumbItem } from '@/types';

// const breadcrumbs: BreadcrumbItem[] = [
//     {
//         title: 'Create Record',
//         href: '',
//     },
// ];

// export default function Create({ userId }) {
//     const { flash } = usePage().props;

//     const [loading, setLoading] = useState(false);

//     const [form, setForm] = useState({
//         user_id: userId || '',
//         first_name: '',
//         last_name: '',
//         phone_cell: '',
//         phone_home: '',
//         industry: '',
//         street: '',
//         city: '',
//         state: '',
//         zip: '',
//         service: '',
//         price: '',
//         incident_report: '',
//     });

//     const [errors, setErrors] = useState({});

//     const handleChange = (e) => {
//         setForm({
//             ...form,
//             [e.target.name]: e.target.value,
//         });
//     };

//     const submit = (e) => {
//         e.preventDefault();
//         setLoading(true);

//         router.post(route('records.store'), form, {
//             onError: (err) => {
//                 setErrors(err);
//             },

//             onSuccess: () => {
//                 setForm({
//                     user_id: userId || '',
//                     first_name: '',
//                     last_name: '',
//                     phone_cell: '',
//                     phone_home: '',
//                     industry: '',
//                     street: '',
//                     city: '',
//                     state: '',
//                     zip: '',
//                     service: '',
//                     price: '',
//                     incident_report: '',
//                 });

//                 setErrors({});
//             },

//             onFinish: () => setLoading(false),
//         });
//     };

//     return (
//         <AppLayout breadcrumbs={breadcrumbs}>
//             <Head title="Create Record" />

//             {/* RESPONSIVE WRAPPER */}
//             <div className="mx-auto mt-6 w-full max-w-7xl p-4 sm:px-6 lg:px-4">
//                 <div className="rounded-xl bg-white p-4 shadow sm:p-6">
//                     <h1 className="mb-6 text-xl font-bold sm:text-2xl">
//                         Create Record
//                     </h1>

//                     {/* RESPONSIVE GRID FIX */}
//                     <form
//                         onSubmit={submit}
//                         className="grid grid-cols-1 gap-4 sm:grid-cols-2"
//                     >
//                         {/* Hidden user_id */}
//                         <input
//                             type="hidden"
//                             name="user_id"
//                             value={form.user_id}
//                         />

//                         {/* First Name */}
//                         <div>
//                             <label className="text-sm font-medium">
//                                 First Name
//                             </label>
//                             <input
//                                 name="first_name"
//                                 value={form.first_name}
//                                 onChange={handleChange}
//                                 className="w-full rounded border px-3 py-2"
//                             />
//                             {errors.first_name && (
//                                 <p className="text-sm text-red-500">
//                                     {errors.first_name}
//                                 </p>
//                             )}
//                         </div>

//                         {/* Last Name */}
//                         <div>
//                             <label className="text-sm font-medium">
//                                 Last Name
//                             </label>
//                             <input
//                                 name="last_name"
//                                 value={form.last_name}
//                                 onChange={handleChange}
//                                 className="w-full rounded border px-3 py-2"
//                             />
//                             {errors.last_name && (
//                                 <p className="text-sm text-red-500">
//                                     {errors.last_name}
//                                 </p>
//                             )}
//                         </div>

//                         {/* Phone Cell */}
//                         <div>
//                             <label className="text-sm font-medium">
//                                 Phone Cell
//                             </label>
//                             <input
//                                 name="phone_cell"
//                                 value={form.phone_cell}
//                                 onChange={handleChange}
//                                 className="w-full rounded border px-3 py-2"
//                             />
//                             {errors.phone_cell && (
//                                 <p className="text-sm text-red-500">
//                                     {errors.phone_cell}
//                                 </p>
//                             )}
//                         </div>

//                         {/* Phone Home */}
//                         <div>
//                             <label className="text-sm font-medium">
//                                 Phone Home
//                             </label>
//                             <input
//                                 name="phone_home"
//                                 value={form.phone_home}
//                                 onChange={handleChange}
//                                 className="w-full rounded border px-3 py-2"
//                             />
//                         </div>

//                         {/* Industry */}
//                         <div>
//                             <label className="text-sm font-medium">
//                                 Industry
//                             </label>
//                             <input
//                                 name="industry"
//                                 value={form.industry}
//                                 onChange={handleChange}
//                                 className="w-full rounded border px-3 py-2"
//                             />
//                             {errors.industry && (
//                                 <p className="text-sm text-red-500">
//                                     {errors.industry}
//                                 </p>
//                             )}
//                         </div>

//                         {/* Street */}
//                         <div>
//                             <label className="text-sm font-medium">
//                                 Street
//                             </label>
//                             <input
//                                 name="street"
//                                 value={form.street}
//                                 onChange={handleChange}
//                                 className="w-full rounded border px-3 py-2"
//                             />
//                             {errors.street && (
//                                 <p className="text-sm text-red-500">
//                                     {errors.street}
//                                 </p>
//                             )}
//                         </div>

//                         {/* City */}
//                         <div>
//                             <label className="text-sm font-medium">City</label>
//                             <input
//                                 name="city"
//                                 value={form.city}
//                                 onChange={handleChange}
//                                 className="w-full rounded border px-3 py-2"
//                             />
//                             {errors.city && (
//                                 <p className="text-sm text-red-500">
//                                     {errors.city}
//                                 </p>
//                             )}
//                         </div>

//                         {/* State */}
//                         <div>
//                             <label className="text-sm font-medium">State</label>
//                             <input
//                                 name="state"
//                                 value={form.state}
//                                 onChange={handleChange}
//                                 className="w-full rounded border px-3 py-2"
//                             />
//                             {errors.state && (
//                                 <p className="text-sm text-red-500">
//                                     {errors.state}
//                                 </p>
//                             )}
//                         </div>

//                         {/* Zip */}
//                         <div>
//                             <label className="text-sm font-medium">Zip</label>
//                             <input
//                                 name="zip"
//                                 value={form.zip}
//                                 onChange={handleChange}
//                                 className="w-full rounded border px-3 py-2"
//                             />
//                             {errors.zip && (
//                                 <p className="text-sm text-red-500">
//                                     {errors.zip}
//                                 </p>
//                             )}
//                         </div>

//                         {/* Service */}
//                         <div>
//                             <label className="text-sm font-medium">
//                                 Service
//                             </label>
//                             <input
//                                 name="service"
//                                 value={form.service}
//                                 onChange={handleChange}
//                                 className="w-full rounded border px-3 py-2"
//                             />
//                             {errors.service && (
//                                 <p className="text-sm text-red-500">
//                                     {errors.service}
//                                 </p>
//                             )}
//                         </div>

//                         {/* Price */}
//                         <div>
//                             <label className="text-sm font-medium">Price</label>
//                             <input
//                                 name="price"
//                                 type="number"
//                                 value={form.price}
//                                 onChange={handleChange}
//                                 className="w-full rounded border px-3 py-2"
//                             />
//                             {errors.price && (
//                                 <p className="text-sm text-red-500">
//                                     {errors.price}
//                                 </p>
//                             )}
//                         </div>

//                         {/* Incident Report */}
//                         <div className="sm:col-span-2">
//                             <label className="text-sm font-medium">
//                                 Incident Report
//                             </label>
//                             <textarea
//                                 name="incident_report"
//                                 value={form.incident_report}
//                                 onChange={handleChange}
//                                 className="w-full rounded border px-3 py-2"
//                                 rows={4}
//                             />
//                         </div>

//                         {/* Submit */}
//                         <div className="sm:col-span-2">
//                             <Button
//                                 type="submit"
//                                 disabled={loading}
//                                 className="w-full bg-black text-white"
//                             >
//                                 {loading ? 'Saving...' : 'Save Record'}
//                             </Button>
//                         </div>
//                     </form>
//                 </div>
//             </div>
//         </AppLayout>
//     );
// }
