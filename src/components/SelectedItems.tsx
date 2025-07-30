import { useDispatch, useSelector } from 'react-redux';
import {
  selectSelectedItems,
  setSelectedItems,
} from '../redux/slices/selectedItemsSlice';
import type { AppDispatch } from '../redux/store';
import { useTheme } from '../hooks/useTheme';
import { THEME } from '../consts';
import type { CharacterData } from '../models/interfaces';

export default function SelectedItems() {
  const { selectedItems } = useSelector(selectSelectedItems);
  const dispatch = useDispatch<AppDispatch>();

  const { theme } = useTheme();

  function createCSVFile(selectedItems: CharacterData[]) {
    const headers = ['Name', 'Species', 'Status', 'Type', 'ImageLink'];
    const rows = selectedItems.map((item) => [
      item.name,
      item.species,
      item.status,
      item.type,
      item.image,
    ]);

    const csvContent =
      'data:text/csv;charset=utf-8,' +
      headers.join(',') +
      '\n' +
      rows.map((e) => e.join(',')).join('\n');

    return encodeURI(csvContent);
  }

  function handleDownload() {
    const csvContent = createCSVFile(selectedItems);
    const link = document.createElement('a');
    link.setAttribute('href', csvContent);
    link.setAttribute('download', `rick-and-morty-${selectedItems.length}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }

  return (
    <>
      <div
        className={`fixed bottom-0 right-10 ${theme === THEME.LIGHT ? 'bg-gray-50' : 'bg-black'} p-5 flex gap-12 items-center border border-black`}
      >
        <button
          className="text-center cursor-pointer text-black duration-300 border-[1px] border border-transparent bg-green-400 hover:bg-green-500 p-2 my-4"
          onClick={() => dispatch(setSelectedItems([]))}
        >
          Unselect all
        </button>
        <div className="">{selectedItems.length} items selected</div>
        <button
          className="text-center cursor-pointer text-black duration-300 border-[1px] border border-transparent bg-green-400 hover:bg-green-500 p-2 my-4"
          onClick={handleDownload}
        >
          Download
        </button>
      </div>
    </>
  );
}
