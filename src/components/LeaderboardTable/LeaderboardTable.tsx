import useGetModels from "@/hooks/useGetModels";
import { Model } from "@/types";
import { createColumnHelper, flexRender, getCoreRowModel, useReactTable } from "@tanstack/react-table";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "../ui/table";

const LeaderboardTable = () => {
  const columnHelper = createColumnHelper<Model>();
  const columns = [
    columnHelper.accessor("id", {
      id: "id",
      cell: (props) => props.row.index + 1,
      header: "#",
    }),
    columnHelper.accessor("name", {
      id: "name",
      cell: (props) => props.getValue(),
      header: "Name",
    }),
    columnHelper.accessor("totalScore", {
      id: "score",
      cell: (props) => props.getValue(),
      header: "Score",
    }),
    columnHelper.accessor("producent", {
      id: "producent",
      cell: (props) => props.getValue(),
      header: "Producent",
    }),
  ];

  const { data: models } = useGetModels();

  const table = useReactTable({
    columns: columns,
    data: models ?? [],
    getCoreRowModel: getCoreRowModel(),
  });

  return (
    <div className='p-2'>
      <Table>
        <TableHeader className='bg-primary'>
          {table.getHeaderGroups().map((headerGroup) => (
            <TableRow key={headerGroup.id}>
              {headerGroup.headers.map((header) => (
                <TableHead key={header.id} className='text-center text-lg font-bold text-secondary'>
                  {header.isPlaceholder ? null : flexRender(header.column.columnDef.header, header.getContext())}
                </TableHead>
              ))}
            </TableRow>
          ))}
        </TableHeader>
        <TableBody>
          {table.getRowModel().rows.map((row) => (
            <TableRow key={row.id} className='border-b-[1px] border-primary'>
              {row.getVisibleCells().map((cell) => (
                <TableCell key={cell.id} className='text-center'>
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </TableCell>
              ))}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default LeaderboardTable;
