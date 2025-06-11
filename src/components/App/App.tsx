import { keepPreviousData, useQuery } from '@tanstack/react-query';
import css from './App.module.css';
import NoteList from '../NoteList/NoteList';
import { fetchNotes } from '../../services/noteService';
import { useEffect, useState } from 'react';
import Pagination from '../Pagination/Pagination';
import NoteModal from '../NoteModal/NoteModal';
import SearchBox from '../SearchBox/SearchBox';
import { useDebounce } from 'use-debounce';
import { BarLoader } from 'react-spinners';
import ErrorMessage from '../ErrorMessage/ErrorMessage';

export default function App() {
	const [currentPage, setCurrentPage] = useState(1);
	const [isModalOpen, setIsOpenModal] = useState(false);
	const [searchQuery, setSearchQuery] = useState('');
	const [debouncedText] = useDebounce(searchQuery, 300);

	const { data, isSuccess, isPending, isError } = useQuery({
		queryKey: ['notes', debouncedText, currentPage],
		queryFn: () => fetchNotes(debouncedText, currentPage),
		placeholderData: keepPreviousData,
	});

	useEffect(() => {
		setCurrentPage(1);
	}, [debouncedText]);

	function handleSearchChange(value: string) {
		setSearchQuery(value);
	}

	function handlePageChange(page: number) {
		setCurrentPage(page);
	}

	return (
		<div className={css.app}>
			<header className={css.toolbar}>
				<SearchBox inputValue={searchQuery} onChange={handleSearchChange} />

				{isSuccess && data.totalPages > 1 && (
					<Pagination
						totalPages={data.totalPages}
						setPage={handlePageChange}
						currentPage={currentPage}
						pageRangeDisplayed={5}
						marginPagesDisplayed={1}
					/>
				)}

				<button className={css.button} onClick={() => setIsOpenModal(true)}>
					Create note +
				</button>
			</header>
			{isSuccess && data.notes.length > 0 && <NoteList notes={data.notes} />}
			{isError && <ErrorMessage />}
			{isModalOpen && <NoteModal onClose={() => setIsOpenModal(false)} />}
			{isPending && (
				<BarLoader
					cssOverride={{
						display: 'block',
						margin: '0 auto',
						backgroundColor: 'red',
						width: '500px',
					}}
				/>
			)}
		</div>
	);
}