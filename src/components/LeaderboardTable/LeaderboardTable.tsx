import useGetModels from "@/hooks/useGetModels";
import { BaseModel, Model } from "@/types";
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
import { cn } from "@/lib/utils";

type LeaderboardTableProps = {
  taskType?: TaskTypeEnum;
};

const LeaderboardTable = ({ taskType }: LeaderboardTableProps) => {
  const columnHelper = createColumnHelper<Model | BaseModel>();
  const columns = [
    columnHelper.accessor("id", {
      id: "id",
      cell: (props) => props.row.index + 1,
      header: "#",
    }),
  ];

  if (taskType) {
    columns.push(
      columnHelper.accessor("name", {
        id: "name",
        cell: (props) => props.getValue().split('/').pop(),
        header: "Model Name",
      }),
      columnHelper.accessor("producent", {
        id: "producent",
        cell: (props) => props.getValue(),
        header: "Creator",
      }),
      columnHelper.accessor("score", {
        id: "score",
        cell: (props) => props.getValue() ?? 0,
        header: "Score",
      }) as AccessorKeyColumnDef<Model | BaseModel, string>
    );
  } else {
    columns.push(
      columnHelper.accessor("name", {
        id: "name",
        cell: (props) => props.getValue(),
        header: "Model Name",
      }),
      columnHelper.accessor("producent", {
        id: "producent",
        cell: (props) => props.getValue(),
        header: "Creator",
      }),
      columnHelper.accessor("totalScore", {
        id: "totalScore",
        cell: (props) => props.getValue() ?? 0,
        header: "Score",
      }) as AccessorKeyColumnDef<Model | BaseModel, string>
    );
  }

  const { data: models, isLoading } = useGetModels(taskType ?? "general");

  const table = useReactTable({
    columns: columns,
    data: models as Model[] ?? [],
    getCoreRowModel: getCoreRowModel(),
  });

  return (
    <div className='w-full py-2'>
      <Table>
        <TableHeader className={cn('leaderboard-second-step', 'bg-primary')}>
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
                  <TableCell key={cell.id} className={`${taskType ? 'text-center' : 'text-center capitalize'}`}>
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
