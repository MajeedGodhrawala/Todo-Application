import React, { useState, useEffect, useMemo, useCallback } from "react";
import Pagination from "./pagination";

export default function DataTable({
  filterBody = () => {
    return null;
  },
  columns,
  rows,
  total = 0,
  perPage = 2,
  currentPageProp,
  renderBody = {},
  trClass = "",
  onPaginate,
}) {
  const [rowsPerPage, setRowsPerPage] = useState(perPage);
  const [currentPage, setCurrentPage] = useState(currentPageProp);

  const maxPage = useMemo(
    () => Math.ceil(total / rowsPerPage),
    [total, rowsPerPage]
  );

  useEffect(() => {
    emitPaginateEvent();
  }, [currentPage]);

  const emitPaginateEvent = useCallback(() => {
    onPaginate({
      perPage: rowsPerPage,
      currentPage,
    });
  }, [rowsPerPage, currentPage, onPaginate]);

  return (
    <>
      <div className="d-flex">
        <div
          className="flex-fill"
          style={{ display: filterBody ? "block" : "none" }}
        >
          {filterBody()}
        </div>
      </div>
      <div className="table-responsive">
        <table className="table mb-2 border border-solid">
          <thead>
            <tr>
              {columns.map((column, index) => {
                return (
                  <th
                    scope="col"
                    key={`column_${index}`}
                    className="{column.headerClassName || ''}"
                    style={{ display: column.visible ?? true ? "" : "none" }}
                  >
                    {column.title}
                  </th>
                );
              })}
            </tr>
          </thead>
          <tbody>
            {rows.length > 0 ? (
              rows.map((row, rowIndex) => (
                <tr className={trClass(row) ?? ""} key={`row_key_${rowIndex}`}>
                  {columns.map((column, colIndex) => (
                    <td
                      key={`column_key_${colIndex}`}
                      className="{column.bodyClassName || ''}"
                      style={{ display: column.visible ?? true ? "" : "none" }}
                    >
                      {renderBody[column.key]
                        ? renderBody[column.key](row)
                        : row[column.key] || column.key === "index"
                        ? rowIndex + 1
                        : ""}
                    </td>
                  ))}
                </tr>
              ))
            ) : (
              <tr key="no_record">
                <td colSpan={columns.length} className="text-center opacity-75">
                  No Record Found !
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
      <Pagination
        total={total}
        maxPage={maxPage}
        currentPageProp={currentPage}
        rowsPerPage={rowsPerPage}
        onPaginate={(page) => {
          setCurrentPage(page);
        }}
      ></Pagination>
    </>
  );
}
