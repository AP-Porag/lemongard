import React from 'react';
import { router } from '@inertiajs/react';
import { usePage } from '@inertiajs/react';
import {
    DropdownMenu,
    DropdownMenuTrigger,
    DropdownMenuContent,
    DropdownMenuItem,
} from '@/components/ui/dropdown-menu';
import { Button } from '@/components/ui/button';
import { MoreVertical, Edit, Trash2, EyeIcon, Check, CheckCircle } from 'lucide-react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Input } from '@/components/ui/input.js';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select';
import CustomDeleteModal from '@/components/common/CustomDeleteModal.jsx';
import { toast } from 'sonner';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/public/ui/popover';
import { Checkbox } from '@/components/ui/checkbox';
import { Badge } from '@/components/ui/badge';

export default function DataTable({
    data,
    columns,
    meta,
    industries = [],
    actions = {
        view: true,
        edit: true,
        delete: true,
        resolve: true,
        search_filter: true,
        status_filter: true,
        per_page_filter: true,
    },
    baseRoute,
    filters,
    onFilterChange,
    perPageOptions = [5, 10, 25, 50],
    statusOptions = [],
    defaultStatus = '',
    showSorting = true,
}) {
    const [deleteId, setDeleteId] = React.useState(null);
    const [resolveId, setResolveId] = React.useState(null);

    const { url } = usePage();

    // চেক করুন কোন রুটে আছেন
    const isRecordsRoute = url === '/admin/records';
    // অথবা route name দিয়ে চেক করতে
    const routeName = route().current();
    const isAllowedRoute = routeName === 'admin.records.index';
    const isUserRoute = routeName === 'admin.users.index';
    const isRecordRoute = routeName === 'admin.records.index';
    const isSubscriptionRoute = routeName === 'admin.subscriptions.index';
    const isIndustryRoute = routeName === 'admin.industries.index';
    const isServiceRoute = routeName === 'admin.services.index';

    const globalActions = {
        search_filter: true,
        status_filter: true,
        industry_filter: true,
        per_page_filter: true,
        ...(typeof actions === 'object' ? actions : {}),
    };

    // PER ROW (many times)
    const resolveActions = (row) => {
        if (typeof actions === 'function') {
            return actions(row);
        }
        return actions;
    };

    const handleDeleteConfirm = () => {
        router.delete(route(`${baseRoute}.destroy`, deleteId), {
            onSuccess: () => {
                setDeleteId(null);
                toast.success('Item deleted successfully!');
            },
            onError: () => {
                toast.error('Failed to delete the item.');
            },
        });
    };
    const handleResolve = () => {
        router.patch(
            route(`${baseRoute}.resolve`, resolveId),
            {}, // data
            {
                onSuccess: () => {
                    setResolveId(null);
                    toast.success('Item resolved successfully!');
                    router.reload();
                },
                onError: () => {
                    toast.error('Failed to resolve the item.');
                },
            }
        );
    };

    const goToPage = (page) => {
        onFilterChange({
            ...filters,
            page,
            apply: true,
        });
    };

    // Handle filter changes (search, status, perPage)
    const handleFilterChange = (eOrObj) => {
        const updated =
            eOrObj?.target
                ? { [eOrObj.target.name]: eOrObj.target.value }
                : eOrObj;

        onFilterChange({
            ...filters,
            ...updated,
            page: 1,
            apply: true,
        });
    };

    return (
        <div className="space-y-4 rounded-xl bg-white p-4 text-black shadow dark:text-white">
            {/* Filters */}
            <div className="mb-4 flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
                {globalActions.search_filter && (
                    <Input
                        type="text"
                        name="search"
                        placeholder={meta.searchPlaceholderText || "Search..."}
                        value={filters.search}
                        onChange={handleFilterChange}
                        disabled={meta?.searchDisabled}
                        className="px-3 py-2 md:w-1/3"
                    />
                )}

                {globalActions.status_filter && statusOptions.length > 0 && (
                    <Select
                        name="status"
                        value={filters.status || defaultStatus}
                        onValueChange={(value) =>
                            handleFilterChange({
                                target: { name: 'status', value },
                            })
                        }
                    >
                        <SelectTrigger className="w-[180px]">
                            <SelectValue placeholder="Select Status" />
                        </SelectTrigger>
                        <SelectContent>
                            {statusOptions.map((status) => (
                                <SelectItem key={status} value={status}>
                                    {status.charAt(0).toUpperCase() + status.slice(1)}
                                </SelectItem>
                            ))}
                        </SelectContent>
                    </Select>
                )}

                {isAllowedRoute && globalActions.industry_filter && (
                    <div className="min-w-[250px]">
                        <Popover>
                            <PopoverTrigger asChild>
                                <Button variant="outline" className="w-[220px] justify-between">
                                    Industries ({filters.industries.length})
                                </Button>
                            </PopoverTrigger>

                            <PopoverContent className="w-[220px] p-2">
                                {industries.map((industry) => {
                                    const id = String(industry.id);
                                    const checked = filters.industries.includes(id);

                                    return (
                                        <div
                                            key={id}
                                            className="flex items-center gap-2 py-1"
                                        >
                                            <Checkbox
                                                checked={checked}
                                                onCheckedChange={(val) => {
                                                    const updated = val
                                                        ? [...(filters.industries || []), id]
                                                        : (filters.industries || []).filter(i => i !== id);

                                                    onFilterChange({
                                                        ...filters,
                                                        industries: updated,
                                                        apply: true,
                                                    });
                                                }}
                                            />
                                            <span className="text-sm">
                                                {industry.name}
                                            </span>
                                        </div>
                                    );
                                })}
                            </PopoverContent>

                        </Popover>
                    </div>
                )}
                {showSorting && (
                    <Select
                        value={`${filters.sort_by || ''}|${filters.sort_order || ''}`}
                        onValueChange={(value) => {
                            const [sort_by, sort_order] = value.split('|');

                            onFilterChange({
                                ...filters,
                                sort_by,
                                sort_order,
                                page: 1,
                                apply: true,
                            });
                        }}
                    >
                        <SelectTrigger className="w-[220px]">
                            <SelectValue placeholder="Sort By" />
                        </SelectTrigger>

                        <SelectContent>

                            {/* Users Page */}
                            {isUserRoute && (
                                <>
                                    <SelectItem value="name|asc">Name (A-Z)</SelectItem>
                                    <SelectItem value="name|desc">Name (Z-A)</SelectItem>

                                    <SelectItem value="industry|asc">Industry (A-Z)</SelectItem>
                                    <SelectItem value="industry|desc">Industry (Z-A)</SelectItem>

                                    <SelectItem value="created_at|desc">Newest</SelectItem>
                                    <SelectItem value="created_at|asc">Oldest</SelectItem>
                                </>
                            )}

                            {/* Records Page */}
                            {isRecordRoute && (
                                <>
                                    <SelectItem value="last_name|asc">Last Name (A-Z)</SelectItem>
                                    <SelectItem value="last_name|desc">Last Name (Z-A)</SelectItem>

                                    <SelectItem value="industry|asc">Industry (A-Z)</SelectItem>
                                    <SelectItem value="industry|desc">Industry (Z-A)</SelectItem>

                                    <SelectItem value="user|asc">User (A-Z)</SelectItem>
                                    <SelectItem value="user|desc">User (Z-A)</SelectItem>

                                    <SelectItem value="created_at|desc">Newest</SelectItem>
                                    <SelectItem value="created_at|asc">Oldest</SelectItem>
                                </>
                            )}

                            {/* Subscription Page */}
                            {isSubscriptionRoute && (
                                <>
                                    <SelectItem value="created_at|desc">Newest First</SelectItem>
                                    <SelectItem value="created_at|asc">Oldest First</SelectItem>
                                    <SelectItem value="stripe_status|asc">Status (A-Z)</SelectItem>
                                    <SelectItem value="stripe_status|desc">Status (Z-A)</SelectItem>
                                    <SelectItem value="trial_ends_at|desc">Trial Ending Soon</SelectItem>
                                </>
                            )}

                        </SelectContent>
                    </Select>
                )}
                {globalActions.per_page_filter && (
                    <Select
                        name="perPage"
                        value={Number(filters.perPage)}
                        onValueChange={(value) =>
                            handleFilterChange({
                                target: { name: 'perPage', value },
                            })
                        }
                        className="px-3 py-2 md:w-1/6"
                    >
                        <SelectTrigger className="w-[180px]">
                            <SelectValue placeholder="Select Status" />
                        </SelectTrigger>
                        <SelectContent>
                            {perPageOptions.map((opt) => (
                                <SelectItem key={opt} value={opt}>
                                    {opt} per page
                                </SelectItem>
                            ))}
                        </SelectContent>
                    </Select>
                )}
            </div>

            {/* Table */}
            <div className="overflow-x-auto">
                <table className="min-w-full">
                    <thead className="border-b text-left">
                        <tr>
                            {columns.map((col) => (
                                <th key={col.key} className="px-4 py-2">
                                    {col.label}
                                </th>
                            ))}
                            <th className="px-4 py-2 text-right">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {data.length === 0 ? (
                            <tr>
                                <td
                                    colSpan={columns.length + 1}
                                    className="px-4 py-4 text-center text-gray-500"
                                >
                                    {filters.search?.trim().length >= 3
                                        ? 'This Individual Is Not In The Database'
                                        : "No Records Found. Start By Adding Your First Record."}
                                </td>
                            </tr>
                        ) : (
                            data.map((row) => (
                                <tr
                                    key={row.id}
                                    className="border-b hover:bg-gray-50"
                                >
                                    {columns.map((col) => (
                                        <td key={col.key} className="px-4 py-2">
                                            {col.render
                                                ? col.render(row)
                                                : row[col.key]}
                                        </td>
                                    ))}
                                    <td className="px-4 py-2 text-right">
                                        <DropdownMenu>
                                            <DropdownMenuTrigger asChild>
                                                <Button
                                                    size="action"
                                                    className="cursor-pointer bg-navy-600 text-white"
                                                >
                                                    <MoreVertical className="h-4 w-4" />
                                                </Button>
                                            </DropdownMenuTrigger>
                                            <DropdownMenuContent
                                                side="bottom"
                                                align="end"
                                                className="bg-white text-black"
                                            >
                                                {(() => {
                                                    const rowActions =
                                                        resolveActions(row);

                                                    return (
                                                        <>
                                                            {rowActions.edit && (
                                                                <DropdownMenuItem
                                                                    onClick={() =>
                                                                        router.visit(
                                                                            route(
                                                                                `${baseRoute}.edit`,
                                                                                row.id,
                                                                            ),
                                                                        )
                                                                    }
                                                                    className="cursor-pointer"
                                                                >
                                                                    <Edit className="mr-2 h-4 w-4" />{' '}
                                                                    Edit
                                                                </DropdownMenuItem>
                                                            )}

                                                            {rowActions.view && (
                                                                <DropdownMenuItem
                                                                    onClick={() =>
                                                                        router.visit(
                                                                            route(
                                                                                `${baseRoute}.show`,
                                                                                row.id,
                                                                            ),
                                                                        )
                                                                    }
                                                                    className="cursor-pointer"
                                                                >
                                                                    <EyeIcon className="mr-2 h-4 w-4" />{' '}
                                                                    View
                                                                </DropdownMenuItem>
                                                            )}

                                                            {rowActions.delete && (
                                                                <DropdownMenuItem
                                                                    onClick={() =>
                                                                        setDeleteId(
                                                                            row.id,
                                                                        )
                                                                    }
                                                                    className="cursor-pointer"
                                                                >
                                                                    <Trash2 className="mr-2 h-4 w-4 text-red-600" />{' '}
                                                                    Delete
                                                                </DropdownMenuItem>
                                                            )}

                                                            {rowActions.resolve && (
                                                                <DropdownMenuItem
                                                                    onClick={() => setResolveId(row.id)}
                                                                    className="cursor-pointer"
                                                                >
                                                                    <CheckCircle className="mr-2 h-4 w-4 text-red-600" />
                                                                    Resolve
                                                                </DropdownMenuItem>
                                                            )}

                                                            {Object.entries(
                                                                rowActions,
                                                            ).map(
                                                                ([key, value]) => {
                                                                    if (
                                                                        [
                                                                            'view',
                                                                            'edit',
                                                                            'resolve',
                                                                            'delete',
                                                                        ].includes(
                                                                            key,
                                                                        ) ||
                                                                        !value ||
                                                                        typeof value !==
                                                                        'object'
                                                                    )
                                                                        return null;

                                                                    return (
                                                                        <DropdownMenuItem
                                                                            key={
                                                                                key
                                                                            }
                                                                            onClick={
                                                                                value.action
                                                                            }
                                                                            className="cursor-pointer"
                                                                        >
                                                                            {value.icon && (
                                                                                <value.icon className="mr-2 h-4 w-4" />
                                                                            )}
                                                                            {
                                                                                value.label
                                                                            }
                                                                        </DropdownMenuItem>
                                                                    );
                                                                },
                                                            )}
                                                        </>
                                                    );
                                                })()}
                                            </DropdownMenuContent>
                                        </DropdownMenu>
                                    </td>
                                </tr>
                            ))
                        )}
                    </tbody>
                </table>
            </div>

            {/* Pagination Controls */}
            {meta && (
                <div className="mt-4 flex items-center justify-between">
                    <div>
                        <p className="text-sm text-gray-600">
                            Showing <strong>{meta.from}</strong> to{' '}
                            <strong>{meta.to}</strong> of{' '}
                            <strong>{meta.total}</strong> results
                        </p>
                    </div>
                    <div className="flex items-center gap-1">
                        <button
                            onClick={() => goToPage(meta.current_page - 1)}
                            disabled={meta.current_page <= 1}
                            className="cursor-pointer rounded bg-gray-200 p-2 text-black hover:bg-gray-300 disabled:opacity-50"
                        >
                            <ChevronLeft className="h-4 w-4" />
                        </button>

                        {[...Array(meta.last_page).keys()].map((_, i) => {
                            const page = i + 1;
                            return (
                                <button
                                    key={page}
                                    onClick={() => goToPage(page)}
                                    className={`cursor-pointer rounded px-3 py-1 ${page === meta.current_page
                                        ? 'bg-black text-white'
                                        : 'bg-gray-200 text-black hover:bg-gray-300'
                                        }`}
                                >
                                    {page}
                                </button>
                            );
                        })}

                        <button
                            onClick={() => goToPage(meta.current_page + 1)}
                            disabled={meta.current_page >= meta.last_page}
                            className="cursor-pointer rounded bg-gray-200 p-2 text-black hover:bg-gray-300 disabled:opacity-50"
                        >
                            <ChevronRight className="h-4 w-4" />
                        </button>
                    </div>
                </div>
            )}

            <CustomDeleteModal
                open={!!deleteId}
                onClose={() => setDeleteId(null)}
                onConfirm={handleDeleteConfirm}
                title="Are you sure you want to delete this item?"
                message="Once deleted, you will not be able to recover this item."
            />
            <CustomDeleteModal
                open={!!resolveId}
                onClose={() => setResolveId(null)}
                onConfirm={handleResolve}
                title="Are you sure you want to resolve this item?"
                message="This action will mark the item as resolved."
            />
        </div>

    );
}
