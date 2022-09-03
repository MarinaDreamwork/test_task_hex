import { getCurrentStatiscticData } from "../../store/statistics";
import { useSelector } from 'react-redux';
import { useEffect, useState } from "react";
import style from './table.module.css';
import copy from 'copy-to-clipboard';

const TableBody = ({ currentItems }) => {
  console.log('currentItems', currentItems);
  const statData = useSelector(getCurrentStatiscticData());
  console.log('statData', statData);

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
    return 'No statistic data yet';
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