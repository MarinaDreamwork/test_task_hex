import { useEffect, useState } from 'react';
import SectionWrapper from '../components/common/style/sectionWrapper';
import Table from '../components/common/table';
import Pagination from '../components/common/pagination';
import style from './statisticInformation.module.css';
import { useDispatch, useSelector } from 'react-redux';
import { getAllStatLength, getCurrentStatiscticData, getLoadingStatistic, loadAllStatisticInformation, loadStatisticData } from '../store/statistics';
import Filter from '../components/ui/filter';
import { paginate } from '../utils/paginate';
import _ from 'lodash';

const StatisticInformation = () => {
  const dispatch = useDispatch();
  const [currentPage, setCurrentPage] = useState(1);
  const [currentItems, setCurrentItems] = useState(null);
  const [filteredItems, setFilteredItems] = useState(null);
  const itemsPerPage = 10;
  const currentStatInfo = useSelector(getCurrentStatiscticData());
  const isLoading = useSelector(getLoadingStatistic());
  const lastUrl = useSelector(getAllStatLength());
  const lastItem = Math.ceil((filteredItems?.length || lastUrl) / itemsPerPage);

  const [sortBy, setSortBy] = useState({
    path: 'name', order: 'asc'
  });

  const handleFilter = (payload) => {
    setFilteredItems(payload);
    setCurrentPage(1);
  };

  console.log('sortBy', sortBy);

  const handleSort = (item) => {
    setSortBy(item);
    console.log('item', item);
    // если данные отфильтрованы - то не отправляем запрос на сервер, а сортируем на месте
    if (filteredItems) {
      const orderFilteredData = _.orderBy(filteredItems, [sortBy.path], [sortBy.order])
      setCurrentItems(orderFilteredData);
    } else {
      const orderQuery = `order=${item.order}_${item.path}&limit=${itemsPerPage}`;
      dispatch(loadStatisticData(orderQuery));
    }

  };

  const handlePageChange = (pageIndex) => {
    console.log(pageIndex);
    setCurrentPage(pageIndex);
    dispatch(loadStatisticData(`offset=${pageIndex}&offset=${currentPage}&limit=${itemsPerPage}`));
  };

  const handleSetCurrentItems = (payload) => {
    setCurrentItems(payload);
  };

  useEffect(() => {
    dispatch(loadStatisticData(`offset=${currentPage}&limit=${itemsPerPage}`));
    setCurrentItems(currentStatInfo);
    dispatch(loadAllStatisticInformation());
  }, []);

  console.log('filteredItems', filteredItems);

  useEffect(() => {
    setCurrentItems((filteredItems && (paginate(filteredItems, currentPage, itemsPerPage))) || currentStatInfo);
  }, [currentStatInfo, filteredItems]);

  if (isLoading) return 'Loading statistic info...';
  else {
    return (
      <SectionWrapper>
        <h2 className={style.statistic_title}>Statistic Information</h2>
        <Filter onFilter={handleFilter} currentStatInfo={currentStatInfo} onSet={handleSetCurrentItems} />
        <Table currentItems={currentItems} selectedSort={sortBy} onSort={handleSort} />
        <Pagination
          onPageChange={handlePageChange}
          currentPage={currentPage}
          lastItem={lastItem}
          filteredItems={filteredItems}
        />
      </SectionWrapper>
    );
  };
};

export default StatisticInformation;