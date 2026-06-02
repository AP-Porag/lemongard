import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import AppLayout from '@/layouts/app-layout';
import { Head } from '@inertiajs/react';
import { FileText } from 'lucide-react';
import { useState } from 'react';

const breadcrumbs = [
    { title: 'Record', href: '/records' },
    { title: 'View Record' },
];

export default function Show({ record }: any) {
    console.log(record)
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Record Details" />

            <div className="grid grid-cols-1 gap-10 p-4 lg:grid-cols-2 lg:gap-4">
                {/* ================= CLIENT INFORMATION ================= */}
                <Card className="rounded-xl">
                    <CardHeader>
                        <CardTitle>Reocrd Information</CardTitle>
                    </CardHeader>

                    <CardContent className="space-y-4">
                        <div>
                            <p className="text-sm font-semibold">Name</p>
                            <p className="text-sm text-gray-600">
                                {`${record?.first_name || ''} ${record?.last_name || ''}`}
                            </p>
                        </div>

                        <div>
                            <p className="text-sm font-semibold">Phone Cell</p>
                            <p className="text-sm text-gray-600">
                                {record?.phone_cell}
                            </p>
                        </div>

                        <div>
                            <p className="text-sm font-semibold">Phone Home</p>
                            <p className="text-sm text-gray-600">
                                {record?.phone_home}
                            </p>
                        </div>

                        <div>
                            <p className="text-sm font-semibold">Street</p>
                            <p className="text-sm text-gray-600">
                                {record?.street}
                            </p>
                        </div>

                        <div>
                            <p className="text-sm font-semibold">City</p>
                            <p className="text-sm text-gray-600">
                                {record?.city}
                            </p>
                        </div>
                        <div>
                            <p className="text-sm font-semibold">State</p>
                            <p className="text-sm text-gray-600">
                                {record?.state}
                            </p>
                        </div>
                        <div>
                            <p className="text-sm font-semibold">Zip</p>
                            <p className="text-sm text-gray-600">
                                {record?.zip}
                            </p>
                        </div>
                        {/* Service */}
                        <div>
                            <p className="text-sm font-semibold text-gray-700">Services</p>
                            <div className="flex flex-wrap gap-1 mt-1">
                                {record?.services?.length > 0 ? (
                                    record.services.map((service) => (
                                        <span
                                            key={service.id}
                                            className="inline-flex items-center rounded-md bg-yellow-500 px-2 py-0.5 text-xs font-medium text-white"
                                        >
                                            {service.name}
                                        </span>
                                    ))
                                ) : (
                                    <p className="text-sm text-gray-500">No services</p>
                                )}
                            </div>
                        </div>
                        <div>
                            <p className="text-sm font-semibold">Price</p>
                            <p className="text-sm text-gray-600">
                                ${record?.price}
                            </p>
                        </div>
                        <div>
                            <p className="text-sm font-semibold">
                                Incident Report
                            </p>
                            <p className="text-sm text-gray-600">
                                {record?.incident_report}
                            </p>
                        </div>
                    </CardContent>
                </Card>
            </div>
        </AppLayout>
    );
}
