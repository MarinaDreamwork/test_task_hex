import style from './table.module.css';
import TableBody from './tableBody';
import TableHeader from './tableHeader';

const Table = ({ currentItems, selectedSort, onSort }) => {
  const columnHeaders = {
    id: {
      name: 'id'
    },
    short: {
      path: 'short',
      name: 'Short link'
    },
    target: {
      path: 'target',
      name: 'Target link'
    },
    counter: {
      path: 'counter',
      name: 'Count of visiting short link'
    }
  };
  if (currentItems?.length === 0) {
    return (
      <div className={style.nodata_wrapper}>
        <p className={style.nodata_description}>No filtered data...</p>
      </div>
    )
  } else {
    return (
      <table className={style.table_style}>
        <TableHeader columnHeaders={columnHeaders} selectedSort={selectedSort} onSort={onSort} />
        <TableBody currentItems={currentItems} />
      </table>
    );
  }
};

export default Table;