import { useState } from 'react';
import Link from 'next/link';

export default function Paginator(props) {
	const [
		pageEntry,
		setPageEntry
	] = useState(false);

	let pageLinks = [];
	if (props.pagination.PageTotal > 1) {
		let insertDotsLeft = true;
		let insertDotsRight = true;
		for (let i = 1; i <= props.pagination.PageTotal; i++) {
			if (i === props.pagination.Page) {
				pageLinks.push(
					<div className='p-1 select-none font-bold text-primary-b' key={props.pagination.Page}>
						{i}
					</div>
				);
			}
			else if ((2 < i) & (i < props.pagination.Page - 2) || (i === 2) & (props.pagination.Page > 5)) {
				if (insertDotsLeft) {
					pageLinks.push(
						<div
							onClick={() => {
								setPageEntry(true);
							}}
							className='transition-all cursor-pointer font-bold text-primary-b hover:text-primary'
							key={i}
						>
							...
						</div>
					);
					insertDotsLeft = false;
				}
			}
			else if (
				(props.pagination.PageTotal - 1 > i) & (i > props.pagination.Page + 2) ||
				(i === props.pagination.PageTotal - 1) & (props.pagination.Page < props.pagination.PageTotal - 4)
			) {
				if (insertDotsRight) {
					pageLinks.push(
						<div
							onClick={() => {
								setPageEntry(true);
							}}
							className='transition-all cursor-pointer font-bold text-primary-b hover:text-primary'
							key={i}
						>
							...
						</div>
					);
					insertDotsRight = false;
				}
			}
			else {
				pageLinks.push(
					<Link
						key={i}
						href={`/search?s=${props.searchQuery}&p=${i}&server=${props.serverName}&type=${props.type}`}
					>
						<a className='transition-all p-1 font-bold text-secondary hover:text-primary-dark'>{i}</a>
					</Link>
				);
			}
		}
	}
	return (
		<div className='h-10'>
			{pageEntry ? (
				<form action='/search' method='get' className='flex justify-center'>
					<input
						id='page'
						name='p'
						type='number'
						min='1'
						max={props.pagination.PageTotal}
						className='p-1 m-1'
					/>
					<input type='hidden' name='s' value={props.searchQuery} />
					<input type='hidden' name='server' value={props.serverName} />
					<input type='hidden' name='type' value={props.type} />
					<button
						type='submit'
						className='transition-all bg-primary-t hover:bg-primary-b text-secondary hover:text-primary font-bold p-1 m-1 rounded-md'
					>
						Go to Page
					</button>
					<button
						onClick={() => {
							setPageEntry(false);
						}}
						className='transition-all bg-primary-t hover:bg-primary-b text-secondary hover:text-primary font-bold p-1 m-1 rounded-md'
					>
						Cancel
					</button>
				</form>
			) : (
				<div className='flex p-1 justify-center'>
					{props.pagination.PagePrev ? (
						<Link
							href={`/search?s=${props.searchQuery}&p=${props.pagination
								.PagePrev}&server=${props.serverName}&type=${props.type}`}
						>
							<a className='transition-all p-1 font-bold text-secondary hover:text-primary-dark'>&lt;</a>
						</Link>
					) : (
						<div />
					)}
					{pageLinks}
					{props.pagination.PageNext ? (
						<Link
							href={`/search?s=${props.searchQuery}&p=${props.pagination
								.PageNext}&server=${props.serverName}&type=${props.type}`}
						>
							<a className='transition-all p-1 font-bold text-secondary hover:text-primary-dark'>&gt;</a>
						</Link>
					) : (
						<div />
					)}
				</div>
			)}
		</div>
	);
}
