"use client";
import { useReactTable, getCoreRowModel, getPaginationRowModel, flexRender, ColumnDef } from '@tanstack/react-table';

interface DataRow {
    [key: string]: string | number;
}

interface TableComponentProps {
    columns: ColumnDef<DataRow, string | number>[];
    data: DataRow[];
}

const TableComponent: React.FC<TableComponentProps> = ({ columns, data }) => {
    const table = useReactTable({
        data,
        columns,
        getCoreRowModel: getCoreRowModel(),
        getPaginationRowModel: getPaginationRowModel(),
    });

    if (!data || !Array.isArray(data) || data.length === 0) {
        return <div>No data available</div>;
    }

    return (
        <div>
            <table className="province-table">
                <thead>
                    {table.getHeaderGroups()?.map((headerGroup) => (
                        <tr key={headerGroup.id}>
                            {headerGroup.headers?.map((header) => (
                                <th key={header.id} className="table-header">
                                    {flexRender(header.column.columnDef.header, header.getContext())}
                                </th>
                            ))}
                        </tr>
                    ))}
                </thead>
                <tbody>
                    {table.getRowModel().rows?.map((row) => (
                        <tr key={row.id}>
                            {row.getVisibleCells()?.map((cell) => (
                                <td key={cell.id} className="table-cell">
                                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                                </td>
                            ))}
                        </tr>
                    ))}
                </tbody>
            </table>

            <div className="pagination">
                <button
                    onClick={() => table.previousPage()}
                    disabled={!table.getCanPreviousPage()}
                    className="pagination-btn"
                >
                    Previous
                </button>
                <button
                    onClick={() => table.nextPage()}
                    disabled={!table.getCanNextPage()}
                    className="pagination-btn"
                >
                    Next
                </button>
                <span>
                    Page <strong>{table.getState().pagination.pageIndex + 1} of {table.getPageCount()}</strong>
                </span>
            </div>
        </div>
    );
};

export default TableComponent;
