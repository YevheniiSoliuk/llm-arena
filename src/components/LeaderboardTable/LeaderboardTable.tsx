import useGetModels from "@/hooks/useGetModels";
import { Model } from "@/types";
import {
  AccessorKeyColumnDef,
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "../ui/table";
import { TaskTypeEnum } from "@/constants/taskTypes";
import Loading from "../common/Loading";

type LeaderboardTableProps = {
  taskType?: TaskTypeEnum;
};

const LeaderboardTable = ({ taskType }: LeaderboardTableProps) => {
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
    columnHelper.accessor("producent", {
      id: "producent",
      cell: (props) => props.getValue(),
      header: "Producent",
    }),
  ];

  if (taskType) {
    columns.push(
      columnHelper.accessor("scoreByTask", {
        id: "score",
        cell: (props) => {
          const score = props.getValue().find((task) => task.name === TaskTypeEnum.Generate)?.score;

          return score?.toString();
        },
        header: "Score",
      }) as AccessorKeyColumnDef<Model, string>
    );
  } else {
    columns.push(
      columnHelper.accessor("totalScore", {
        id: "score",
        cell: (props) => props.getValue(),
        header: "Score",
      }) as AccessorKeyColumnDef<Model, string>
    );
  }

  const { data: models, isLoading } = useGetModels(taskType ?? "general");

  const table = useReactTable({
    columns: columns,
    data: models ?? [],
    getCoreRowModel: getCoreRowModel(),
  });

  return (
    <div className='w-full p-2'>
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
          {!isLoading ? (
            table.getRowModel().rows.map((row) => (
              <TableRow key={row.id} className='border-b-[1px] border-primary'>
                {row.getVisibleCells().map((cell) => (
                  <TableCell key={cell.id} className='text-center'>
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </TableCell>
                ))}
              </TableRow>
            ))
          ) : (
            <TableRow className='border-b-[1px] border-primary'>
              <TableCell colSpan={4} className='text-center'>
                <Loading styles={{ height: "400px", minHeight: "unset", width: "100%" }} />
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  );
};

export default LeaderboardTable;
