/* eslint-disable no-unused-vars */
/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';

import { makeStyles } from '@material-ui/core/styles';

import { useTable } from 'react-table';
import MaUTable from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';

// Styles
const useStyles = makeStyles(() => (
  {
    table: {
      padding: 0,
      border: '1px solid #E1E1E1',
      borderRadius: '4px',
      width: '100%',
      '& th': {
        fontFamily: 'Poppins',
        fontSize: '12px',
        fontWeight: 600,
        letterSpacing: '0.03em',
      },
      '& tr': {
        height: '48px',
        '& td': {
          padding: '8px',
          fontSize: '12px',
          letterSpacing: '0.03em',
        },

      },
    },
  }
));

function Table(props) {
  const { columns, data } = props;
  const classes = useStyles();

  const categoriesTable = useTable({
    columns,
    data,
  });

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow,
  } = categoriesTable;

  return (
    <MaUTable {...getTableProps()} className={classes.table}>
      <TableHead>
        {headerGroups.map((headerGroup) => (
          <TableRow {...headerGroup.getHeaderGroupProps()}>
            {headerGroup.headers.map((column) => (
              <TableCell {...column.getHeaderProps()}>
                {column.render('Header')}
              </TableCell>
            ))}
          </TableRow>
        ))}
      </TableHead>
      <TableBody {...getTableBodyProps()}>
        {rows.map((row, i) => {
          prepareRow(row);
          return (
            <TableRow {...row.getRowProps()}>
              {row.cells.map((cell) => (
                <TableCell {...cell.getCellProps()}>
                  {cell.render('Cell')}
                </TableCell>
              ))}
            </TableRow>
          );
        })}
      </TableBody>
    </MaUTable>
  );
}

export default Table;
