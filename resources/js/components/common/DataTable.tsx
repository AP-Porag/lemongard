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
}) {
    const [deleteId, setDeleteId] = React.useState(null);
    const [resolveId, setResolveId] = React.useState(null);

    // const handleDeleteConfirm = () => {
    //     router.delete(route(`${baseRoute}.destroy`, deleteId), {
    //         onSuccess: () => setDeleteId(null),
    // });
    // };
    const { url } = usePage();

    // চেক করুন কোন রুটে আছেন
    const isRecordsRoute = url === '/admin/records';
    // অথবা route name দিয়ে চেক করতে
    const routeName = route().current();
    const isAllowedRoute = routeName === 'admin.records.index';

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
            page, // ✅ update page in filters
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
                        className="px-3 py-2 md:w-1/3"
                    />
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
                                                    });
                                                }}
                                            />
                                            <span className="text-sm">
                                                {industry.name}
                                            </span>
                                        </div>
                                    );
                                })}
                                <div className="mt-3 flex justify-end">
                                    <Button
                                        className="bg-navy-600 text-white hover:bg-gray-800"
                                        onClick={() => {
                                            onFilterChange({
                                                ...filters,
                                                page: 1,
                                                apply: true,
                                            });
                                        }}
                                    >
                                        Filter
                                    </Button>
                                </div>
                            </PopoverContent>

                        </Popover>

                        {/* Selected badges */}
                        {/* <div className="mt-2 flex flex-wrap gap-1">
                            {filters.industries.map((id) => {
                                const ind = industries.find(i => String(i.id) === id);

                                return (
                                    <Badge
                                        key={id}
                                        className="cursor-pointer bg-navy-600"
                                        onClick={() => {
                                            onFilterChange({
                                                ...filters,
                                                industries: filters.industries.filter(x => x !== id),
                                            });
                                        }}
                                    >
                                        {ind?.name} ✕
                                    </Badge>
                                );
                            })}
                        </div> */}
                    </div>
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

                {/*<select name="perPage" value={filters.perPage} onChange={handleFilterChange} className="w-full rounded border px-3 py-2 md:w-1/6">*/}
                {/*    {perPageOptions.map((opt) => (*/}
                {/*        <option key={opt} value={opt}>*/}
                {/*            {opt} per page*/}
                {/*        </option>*/}
                {/*    ))}*/}
                {/*</select>*/}
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
                                // <th
                                //     key={col.key}
                                //     className="cursor-pointer px-4 py-2 select-none"
                                //     onClick={() => {
                                //         if (!col.sortable) return;
                                //
                                //         const direction =
                                //             filters.sort === col.key && filters.direction === 'asc'
                                //                 ? 'desc'
                                //                 : 'asc';
                                //
                                //         onFilterChange({
                                //             ...filters,
                                //             sort: col.key,
                                //             direction,
                                //             page: 1,
                                //         });
                                //     }}
                                // >
                                //     <div className="flex items-center gap-1">
                                //         {col.label}
                                //
                                //         {col.sortable && filters.sort === col.key && (
                                //             <span className="text-xs">
                                //                 {filters.direction === 'asc' ? '▲' : '▼'}
                                //             </span>
                                //         )}
                                //     </div>
                                // </th>
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
                                    No data found.
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
                                                            {/* EDIT */}
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

                                                            {/* VIEW */}
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

                                                            {/* DELETE */}
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

                                                            {/* RESOLVE */}
                                                            {rowActions.resolve && (
                                                                <DropdownMenuItem
                                                                    onClick={() => setResolveId(row.id)}
                                                                    className="cursor-pointer"
                                                                >
                                                                    <CheckCircle className="mr-2 h-4 w-4 text-red-600" />
                                                                    Resolve
                                                                </DropdownMenuItem>
                                                            )}

                                                            {/* CUSTOM ACTIONS */}
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
                        {/* Previous Button */}
                        <button
                            onClick={() => goToPage(meta.current_page - 1)}
                            disabled={meta.current_page <= 1}
                            className="cursor-pointer rounded bg-gray-200 p-2 text-black hover:bg-gray-300 disabled:opacity-50"
                        >
                            <ChevronLeft className="h-4 w-4" />
                        </button>

                        {/* Page Numbers */}
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

                        {/* Next Button */}
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

            {/*<CustomDeleteModal*/}
            {/*    open={!!deleteId}*/}
            {/*    onClose={() => setDeleteId(null)}*/}
            {/*    onConfirm={handleDeleteConfirm}*/}
            {/*/>*/}
            <CustomDeleteModal
                open={!!deleteId}
                onClose={() => setDeleteId(null)}
                onConfirm={handleDeleteConfirm}
                title="Are you sure you want to delete this item?"
                message="Once deleted, you will not be able to recover this item."
            />
            <CustomDeleteModal
                open={!!resolveId}
                onClose={() => setResolve(null)}
                onConfirm={handleResolve}
                title="Are you sure you want to resolve this item?"
                message="This action will mark the item as resolved."
            />
        </div>

    );
}
