import React from "react";
import { useTable, Column } from "react-table";
import NotificationUI from "../Notifications/NotificationUI";
import { IconBox } from "@the_human_cipher/components-library";

const data = [
  {
    empty: "",
    from: "Suite 14C",
    amount: "-$30,000.56",
    date: "Jan 13, 2022 23:21",
    status: "Success",
  },
  {
    empty: "",
    from: "Suite 14C",
    amount: "-$30,000.56",
    date: "Jan 13, 2022 23:21",
    status: "Success",
  },
  {
    empty: "",
    from: "Suite 14C",
    amount: "-$30,000.56",
    date: "Jan 13, 2022 23:21",
    status: "Success",
  },
  {
    empty: "",
    from: "Suite 14C",
    amount: "-$30,000.56",
    date: "Jan 13, 2022 23:21",
    status: "Success",
  },
  {
    empty: "",
    from: "Suite 14C",
    amount: "-$30,000.56",
    date: "Jan 13, 2022 23:21",
    status: "Success",
  },
  {
    empty: "",
    from: "Suite 14C",
    amount: "-$30,000.56",
    date: "Jan 13, 2022 23:21",
    status: "Success",
  },
];

type Row = { empty: string; from: string; amount: string; date: string; status: string };
const columns = [
  { Header: "", accessor: "empty" },
  { Header: "From", accessor: "from" },
  { Header: "Amount", accessor: "amount" },
  { Header: "Date", accessor: "date" },
  { Header: "Status", accessor: "status" },
] as Column<Row>[];

const RentHistoryTable = () => {
  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } = useTable({
    columns,
    data,
  });

  return (
    <table {...getTableProps()} className="w-full border-collapse">
      <thead>
        {headerGroups.map((headerGroup) => (
          <tr {...headerGroup.getHeaderGroupProps()}>
            {headerGroup.headers.map((column) => (
              <th
                {...column.getHeaderProps()}
                className="rounded-t-sm border-b-2 bg-[#333333] p-4 text-center text-base font-medium text-white"
              >
                {column.render("Header")}
              </th>
            ))}
          </tr>
        ))}
      </thead>
      <tbody {...getTableBodyProps()}>
        {rows.map((row, index) => {
          prepareRow(row);
          return (
            <tr
              {...row.getRowProps()}
              className={`border-b-8 border-white bg-[#F8F8FC] ${
                index < rows.length - 1 ? "mb-4" : ""
              }`}
            >
              {row.cells.map((cell) => (
                <td
                  {...cell.getCellProps()}
                  className={`bg-[#F8F8FC] p-4 text-center text-base font-bold ${
                    cell.column.Header === "Amount"
                      ? "text-[#3BAF75]"
                      : cell.column.Header === "From"
                      ? "text-base font-normal"
                      : cell.column.Header === "Date"
                      ? "text-base font-normal"
                      : ""
                  }`}
                >
                  {cell.column.Header === "Status" ? (
                    <div className="flex items-center justify-center">
                      <NotificationUI.Label dots type="success">
                        Success
                      </NotificationUI.Label>
                    </div>
                  ) : cell.column.Header === "" ? (
                    <div className="w-[40px] rounded-full bg-light-green text-primary">
                      <IconBox size={40} icon="ArrowNarrowDownLeft" />
                    </div>
                  ) : (
                    cell.render("Cell")
                  )}
                </td>
              ))}
            </tr>
          );
        })}
      </tbody>
    </table>
  );
};

export default RentHistoryTable;
