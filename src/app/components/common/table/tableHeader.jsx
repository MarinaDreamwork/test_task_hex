const TableHeader = ({ columnHeaders, selectedSort, onSort }) => {

  const handleSort = (item) => {
    if (selectedSort.path === item) {
      onSort({
        ...selectedSort,
        order: selectedSort.order === 'asc' ? 'desc' : 'asc'
      });
    } else {
      onSort({ path: item, order: 'asc' });
    }
  };

  const renderSortArrow = (selectedSort, currentPath) => {
    if (selectedSort.path === currentPath) {
      if (selectedSort.order === 'asc') {
        return <i className='bi bi-caret-down-fill'></i>;
      } else {
        return <i className='bi bi-caret-up-fill'></i>;
      }
    }
    return null;
  }

  return (
    <thead>
      <tr>
        {
          Object.keys(columnHeaders).map((column) => (
            <th
              key={column}
              onClick={columnHeaders[column].path
                ? () => handleSort(columnHeaders[column].path)
                : undefined
              }>
              {columnHeaders[column].name} {' '}
              {renderSortArrow(selectedSort, columnHeaders[column].path)}
            </th>
          ))
        }
      </tr>
    </thead>
  );
};

export default TableHeader;