import ReactPaginate from 'react-paginate';
import css from './Pagination.module.css';

interface PaginationProps {
	totalPages: number;
	setPage: (page: number) => void;
	currentPage: number;
	pageRangeDisplayed?: number;
	marginPagesDisplayed?: number;
	containerClassName?: string;
	activeClassName?: string;
	nextLabel?: string;
	previousLabel?: string;
}

export default function Pagination({
	totalPages,
	setPage,
	currentPage,
	pageRangeDisplayed = 5,
	marginPagesDisplayed = 1,
	containerClassName,
	activeClassName,
	nextLabel,
	previousLabel,
}: PaginationProps) {
	return (
		<ReactPaginate
			pageCount={totalPages}
			pageRangeDisplayed={pageRangeDisplayed}
			marginPagesDisplayed={marginPagesDisplayed}
			onPageChange={({ selected }) => setPage(selected + 1)}
			forcePage={currentPage - 1}
			containerClassName={containerClassName ? containerClassName : css.pagination}
			activeClassName={activeClassName ? activeClassName : css.active}
			nextLabel={nextLabel ? nextLabel : '→'}
			previousLabel={previousLabel ? previousLabel : '←'}
		/>
	);
}