import { useEffect, useState } from 'react';
import style from './table.module.css';
import copy from 'copy-to-clipboard';

const TableBody = ({ currentItems }) => {
  const [copySuccess, setCopySuccess] = useState();

  const copyToClipboard = (e) => {
    const targetElementText = e.target.innerText;
    setCopySuccess(targetElementText);
  };

  useEffect(() => {
    if (copySuccess) {
      copy(copySuccess);
      alert(`short link ${copySuccess} successful copied!`);
    }
  }, [copySuccess]);

  if (!currentItems) {
    return (
      <div className={style.nodata_wrapper}>
        <p>No statistic data yet</p>
      </div>
    );
  } else {
    return (
      <>
        <tbody>
          {
            currentItems &&
            currentItems.map((currentItem) => <tr className={style.wrapper_column} key={currentItem.id}>
              <td className={style.id_column}>{currentItem.id}</td>
              <td className={style.short_column} onClick={copyToClipboard}>{currentItem.short}</td>
              <td className={style.target_column}>{currentItem.target}</td>
              <td className={style.counter_column}>{currentItem.counter}</td>
            </tr>)
          }
        </tbody>
      </>
    );
  }
};

export default TableBody;