import _ from 'lodash';
import { useEffect, useState } from 'react';
import style from './pagination.module.css';

const Pagination = ({
  onPageChange,
  currentPage,
  lastItem,
  filteredItems
}) => {
  const [isPrevious, setPrevious] = useState(false);
  const [isNext, setNext] = useState(true);
  const [firstRangeItem, setFirstRangeItem] = useState(1);
  const pageCount = 15;
  const [lastRangeItem, setLastRangeItem] = useState(firstRangeItem + pageCount);

  const pages = _.range(firstRangeItem, lastRangeItem);

  const showNextItems = () => {
    setPrevious(true);
    const lastPageItem = pages[pages.length - 1];
    if ((lastItem - lastRangeItem) < pageCount) {
      setNext(false);
      setLastRangeItem(lastItem + 1);
    } else {
      setLastRangeItem(prevState => prevState + pageCount);
    }
    setFirstRangeItem(lastPageItem + 1);
  };

  const showPreviousItems = () => {
    setNext(true);
    const firstPageItem = pages[0];
    if ((firstPageItem - pageCount) < pageCount) {
      setPrevious(false);
    }
    setFirstRangeItem(prevState => prevState - pageCount);
    setLastRangeItem(firstPageItem);
  };

  useEffect(() => {
    onPageChange(firstRangeItem);
  }, [firstRangeItem]);

  useEffect(() => {
    if (lastItem < pageCount) {
      setFirstRangeItem(1);
      setLastRangeItem(lastItem + 1);
      setNext(false);
      setPrevious(false);
    } else {
      setLastRangeItem(firstRangeItem + pageCount);
      setNext(true);
    }
  }, [lastItem])

  if (filteredItems?.length == 0) return '';
  else {
    return (
      <div>
        <nav>
          <ul className={style.pagination}>
            {
              isPrevious && (
                <li className={style.page_item + ' ' + style.page_item_next}
                  onClick={() => showPreviousItems()}>
                  <a className={style.page_link + ' ' + style.page_link_next}>previous</a>
                </li>
              )
            }
            {
              pages.map((page) => (
                <li
                  key={page}
                  className={style.page_item + ' ' + (page === currentPage ? style.active : '')}
                  onClick={() => onPageChange(page)}
                >
                  <a className={style.page_link}>
                    {page}
                  </a>
                </li>
              ))
            }
            {isNext && (
              <li className={style.page_item + ' ' + style.page_item_next}
                onClick={() => showNextItems()}>
                <a className={style.page_link + ' ' + style.page_link_next}>next</a>
              </li>
            )}
          </ul>
        </nav>
      </div>
    );
  }
};

export default Pagination;