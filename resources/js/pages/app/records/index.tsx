import { useState } from 'react';
import { Head, router, usePage, Link } from '@inertiajs/react';
import AppLayout from '@/layouts/app-layout';
import type { BreadcrumbItem } from '@/types';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Search, Plus, Eye } from 'lucide-react';

const breadcrumbs: BreadcrumbItem[] = [
    { title: 'All Records', href: '' },
];

interface ServiceItem {
    id: number;
    name: string;
}

interface Record {
    id: number;
    user_id: number;
    first_name: string;
    last_name: string;
    email: string;
    phone_cell: string;
    phone_home: string;
    industry: { id: number; name: string } | null;
    services: ServiceItem[];
    price: string | number;
    incident_report: string;
    status: string;
    city: string;
    created_at: string;
}

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export default function Index({
    searchResults = null,
    searchCriteria = {},
    hasSearched = false,
}: {
    searchResults?: Record[] | null;
    searchCriteria?: Partial<Record>;
    hasSearched?: boolean;
}) {
    const { auth } = usePage().props;
    const user = auth?.user;
    const canCreateRecord = user?.has_full_access === true;

    const [searchForm, setSearchForm] = useState({
        first_name: searchCriteria?.first_name || '',
        last_name: searchCriteria?.last_name || '',
        email: searchCriteria?.email || '',
        phone: searchCriteria?.phone || '',
    });
    const [searchErrors, setSearchErrors] = useState<{ [k: string]: string }>({});
    const [searching, setSearching] = useState(false);

    // ---- real-time field handling ----
    const handleSearchChange = (e) => {
        const { name, value } = e.target;

        if (name === 'email') {
            setSearchForm((p) => ({ ...p, email: value }));
            setSearchErrors((p) => {
                const n = { ...p };
                if (value && !EMAIL_RE.test(value)) n.email = 'Please enter a valid email address';
                else delete n.email;
                return n;
            });
            return;
        }

        if (name === 'phone') {
            const cleaned = value.replace(/\D/g, '').slice(0, 10);
            let formatted = cleaned;
            if (cleaned.length > 6) formatted = `${cleaned.slice(0, 3)}-${cleaned.slice(3, 6)}-${cleaned.slice(6)}`;
            else if (cleaned.length > 3) formatted = `${cleaned.slice(0, 3)}-${cleaned.slice(3)}`;
            setSearchForm((p) => ({ ...p, phone: formatted }));
            setSearchErrors((p) => {
                const n = { ...p };
                if (cleaned.length === 10) delete n.phone;
                return n;
            });
            return;
        }

        if (name === 'first_name' || name === 'last_name') {
            const alpha = value.replace(/[^A-Za-z\s]/g, '');
            setSearchForm((p) => ({ ...p, [name]: alpha }));
            setSearchErrors((p) => {
                const n = { ...p };
                if (alpha.trim()) delete n[name];
                return n;
            });
            return;
        }

        setSearchForm((p) => ({ ...p, [name]: value }));
    };

    const handleSearch = () => {
        const errs: { [k: string]: string } = {};

        if (!searchForm.first_name.trim()) errs.first_name = 'First name is required';
        if (!searchForm.last_name.trim()) errs.last_name = 'Last name is required';

        if (!searchForm.email.trim()) {
            errs.email = 'Email is required';
        } else if (!EMAIL_RE.test(searchForm.email)) {
            errs.email = 'Please enter a valid email address';
        }

        const phoneDigits = searchForm.phone.replace(/\D/g, '');
        if (!phoneDigits) {
            errs.phone = 'Phone is required';
        } else if (phoneDigits.length !== 10) {
            errs.phone = 'Please enter a valid 10-digit phone number';
        }

        if (Object.keys(errs).length) {
            setSearchErrors(errs);
            return;
        }

        setSearching(true);
        router.get(route('app.records.index'), searchForm, {
            preserveState: true,
            preserveScroll: true,
            onFinish: () => setSearching(false),
        });
    };

    const handleKeyDown = (e) => {
        if (e.key === 'Enter') {
            e.preventDefault();
            handleSearch();
        }
    };

    const goToCreate = () => router.visit(route('app.records.create'));

    const inputClass = (field: string) =>
        `w-full rounded-lg border px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-yellow-400 ${searchErrors[field] ? 'border-red-500 focus:ring-red-500' : 'border-gray-300 focus:border-yellow-400'
        }`;

    // ---- shared table head ----
    const TableHead = () => (
        <thead className="bg-slate-50/50 text-xs font-semibold text-slate-500 uppercase">
            <tr>
                <th className="px-4 py-3">Last Name</th>
                <th className="px-4 py-3">First Name</th>
                <th className="px-4 py-3">Cell Phone</th>
                <th className="px-4 py-3">Home Phone</th>
                <th className="px-4 py-3">Industry</th>
                <th className="px-4 py-3">Services</th>
                <th className="px-4 py-3">Price</th>
                <th className="px-4 py-3">Incident</th>
                <th className="px-4 py-3">Status</th>
                <th className="px-4 py-3">Action</th>
            </tr>
        </thead>
    );

    // ---- shared data cells (9 columns, no actions) ----
    const DataCells = ({ row }: { row: Record }) => (
        <>
            <td className="min-w-[120px] px-4 py-4 text-sm text-slate-700">{row.last_name || ''}</td>
            <td className="min-w-[120px] px-4 py-4 text-sm text-slate-700">{row.first_name || ''}</td>
            <td className="min-w-[150px] px-4 py-4 text-sm text-slate-700">{row.phone_cell || ''}</td>
            <td className="min-w-[150px] px-4 py-4 text-sm text-slate-700">{row.phone_home || ''}</td>
            <td className="min-w-[120px] px-4 py-4 text-sm text-slate-700">{row.industry?.name || 'N/A'}</td>
            <td className="px-4 py-4 min-w-[150px]">
                <div className="gap-1 max-w-xs">
                    {row.services?.length > 0 ? (
                        <>
                            {row.services.slice(0, 3).map((service) => (
                                <span
                                    key={service.id}
                                    className="w-48 items-center rounded-md bg-yellow-500 px-2 py-0.5 text-xs font-medium text-white whitespace-nowrap mr-1"
                                >
                                    {service.name}
                                </span>
                            ))}
                            {row.services.length > 3 && (
                                <span className="inline-flex items-center rounded-md bg-gray-400 px-2 py-0.5 text-xs font-medium text-white whitespace-nowrap">
                                    +{row.services.length - 3} more
                                </span>
                            )}
                        </>
                    ) : (
                        <span className="text-gray-400 text-sm">N/A</span>
                    )}
                </div>
            </td>
            <td className="min-w-[130px] px-4 py-4 text-sm text-slate-700">$ {row.price}</td>
            <td className="px-4 py-4">
                <span className="block max-w-[12rem] truncate text-sm text-slate-700">{row.incident_report}</span>
            </td>
            <td className="px-4 py-4">
                <Badge
                    className={
                        row.status?.trim()
                            ? 'bg-green-600 px-3 py-1 text-white hover:bg-green-600'
                            : 'bg-yellow-500 px-3 py-1 text-white hover:bg-yellow-500'
                    }
                >
                    {row.status?.trim()
                        ? row.status
                            .toLowerCase()
                            .split(' ')
                            .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
                            .join(' ')
                        : 'Not Resolved'}
                </Badge>
            </td>
        </>
    );

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="All Records" />

            <div className="min-h-screen bg-slate-50/50 p-4 md:p-8">
                <div className="mx-auto max-w-7xl space-y-8">
                    {/* PAGE HEADER */}
                    <div className="flex items-center justify-between">
                        <h1 className="text-2xl font-bold text-slate-800">All Records</h1>
                        {/* {canCreateRecord && (
                            <Button
                                onClick={goToCreate}
                                className="cursor-pointer bg-navy-600 text-white hover:bg-gray-800"
                            >
                                <Plus className="mr-2 h-4 w-4" /> Create Record
                            </Button>
                        )} */}
                    </div>

                    {/* SEARCH SECTION */}
                    <Card className="border-none shadow-sm ring-1 ring-slate-200">
                        <CardHeader className="flex flex-row items-center justify-between border-b border-slate-100 bg-white/50 px-6 py-4">
                            <CardTitle className="text-lg font-bold text-slate-800">Search Records</CardTitle>
                        </CardHeader>
                        <CardContent className="p-6">
                            <div className="flex flex-col gap-4 md:flex-row md:items-end">
                                <div className="relative flex-1">
                                    <label className="mb-1 block text-xs font-medium text-gray-600">Last Name <span className="text-red-500">*</span></label>
                                    <input name="last_name" value={searchForm.last_name} onChange={handleSearchChange} onKeyDown={handleKeyDown} className={inputClass('last_name')} placeholder="Last name" />
                                    {searchErrors.last_name && <p className="absolute left-0 top-full mt-1 text-xs text-red-500">{searchErrors.last_name}</p>}
                                </div>
                                <div className="relative flex-1">
                                    <label className="mb-1 block text-xs font-medium text-gray-600">First Name <span className="text-red-500">*</span></label>
                                    <input name="first_name" value={searchForm.first_name} onChange={handleSearchChange} onKeyDown={handleKeyDown} className={inputClass('first_name')} placeholder="First name" />
                                    {searchErrors.first_name && <p className="absolute left-0 top-full mt-1 text-xs text-red-500">{searchErrors.first_name}</p>}
                                </div>
                                <div className="relative flex-1">
                                    <label className="mb-1 block text-xs font-medium text-gray-600">Email <span className="text-red-500">*</span></label>
                                    <input name="email" value={searchForm.email} onChange={handleSearchChange} onKeyDown={handleKeyDown} className={inputClass('email')} placeholder="name@domain.com" />
                                    {searchErrors.email && <p className="absolute left-0 top-full mt-1 text-xs text-red-500">{searchErrors.email}</p>}
                                </div>
                                <div className="relative flex-1">
                                    <label className="mb-1 block text-xs font-medium text-gray-600">Phone <span className="text-red-500">*</span></label>
                                    <input name="phone" value={searchForm.phone} onChange={handleSearchChange} onKeyDown={handleKeyDown} maxLength={12} className={inputClass('phone')} placeholder="XXX-XXX-XXXX" />
                                    {searchErrors.phone && <p className="absolute left-0 top-full mt-1 text-xs text-red-500">{searchErrors.phone}</p>}
                                </div>

                                {/* Search button — end of the fields, same row */}
                                <div className="shrink-0">
                                    <Button
                                        onClick={handleSearch}
                                        disabled={searching}
                                        className="bg-navy-600 text-white hover:bg-gray-800"
                                    >
                                        <Search className="mr-2 h-4 w-4" />
                                        {searching ? 'Searching...' : 'Search'}
                                    </Button>
                                </div>
                            </div>

                            {/* RESULTS */}
                            {hasSearched && (
                                <div className="mt-6">
                                    {searchResults && searchResults.length > 0 ? (
                                        <>
                                            <p className="mb-3 text-sm font-medium text-slate-600">
                                                {searchResults.length} result(s) found
                                            </p>
                                            <div className="overflow-x-auto rounded-lg border border-slate-100">
                                                <table className="w-full text-left">
                                                    <TableHead />
                                                    <tbody className="divide-y divide-slate-100 bg-white">
                                                        {searchResults.map((row) => (
                                                            <tr key={row.id} className="transition hover:bg-slate-50/80">
                                                                <DataCells row={row} />
                                                                <td className="px-4 py-4 text-right">
                                                                    {/* Search results: VIEW only */}
                                                                    <Link
                                                                        href={route('app.records.show', row.id)}
                                                                        className="inline-flex items-center gap-1 rounded-md border border-slate-200 px-2.5 py-1.5 text-xs font-medium text-slate-700 hover:bg-slate-50"
                                                                    >
                                                                        <Eye className="h-3.5 w-3.5" /> View
                                                                    </Link>
                                                                </td>
                                                            </tr>
                                                        ))}
                                                    </tbody>
                                                </table>
                                            </div>
                                        </>
                                    ) : (
                                        <div className="flex flex-col items-center justify-center gap-4 rounded-lg border border-dashed border-slate-200 bg-slate-50 py-12 text-center">
                                            <p className="text-slate-500">No record found for this search.</p>
                                            {canCreateRecord && (
                                                <Button onClick={goToCreate} className="bg-navy-600 text-white hover:bg-gray-800">
                                                    <Plus className="mr-2 h-4 w-4" /> Create Record
                                                </Button>
                                            )}
                                        </div>
                                    )}
                                </div>
                            )}
                        </CardContent>
                    </Card>
                </div>
            </div>
        </AppLayout>
    );
}
