import { useRef, useState } from 'react';
import Button from '@/components/ui/Button';
import Input from '@/components/ui/Input';
import Tooltip from '@/components/ui/Tooltip';
import {
  HiOutlinePlusCircle,
  HiOutlineSearch,
  HiOutlineViewGrid,
  HiOutlineViewList,
  HiOutlineSortAscending,
  HiOutlineSortDescending,
} from 'react-icons/hi';
import debounce from 'lodash/debounce';
import type { ChangeEvent } from 'react';

const PublishedBar = ({title} : {title:string}) => {
  const inputRef = useRef<HTMLInputElement | null>(null);
  const [view, setView] = useState<'grid' | 'list'>('grid');
  const [sort, setSort] = useState<'asc' | 'desc'>('asc');

  const onViewToggle = () => {
    setView((prevView) => (prevView === 'grid' ? 'list' : 'grid'));
  };

  const onToggleSort = () => {
    setSort((prevSort) => (prevSort === 'asc' ? 'desc' : 'asc'));
  };

  const onAddNewProject = () => {
    // Add your logic for adding a new project here
  };

  const debounceFn = debounce(handleDebounceFn, 500);

  function handleDebounceFn(val: string) {
    // Add your logic for handling search here
  }

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    debounceFn(e.target.value);
  };

  return (
    <div className="lg:flex items-center justify-between mb-4">
      <h3 className="mb-4 lg:mb-0">{title}</h3>
      <div className="flex flex-col md:flex-row md:items-center gap-1">
        <Input
          ref={inputRef}
          size="sm"
          placeholder="Search"
          prefix={<HiOutlineSearch className="text-lg" />}
          onChange={handleInputChange}
        />
        <Tooltip title={view === 'grid' ? 'List view' : 'Grid view'}>
          <Button
            className="hidden md:flex"
            variant="plain"
            size="sm"
            icon={view === 'grid' ? <HiOutlineViewList /> : <HiOutlineViewGrid />}
            onClick={onViewToggle}
          />
        </Tooltip>
        <Tooltip title={`Sort: ${sort === 'asc' ? 'A-Z' : 'Z-A'}`}>
          <Button
            className="hidden md:flex"
            variant="plain"
            size="sm"
            icon={
              sort === 'asc' ? <HiOutlineSortAscending /> : <HiOutlineSortDescending />
            }
            onClick={onToggleSort}
          />
        </Tooltip>
     
      </div>
    </div>
  );
};

export default PublishedBar;
