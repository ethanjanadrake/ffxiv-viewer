import Link from 'next/link';
import { useState } from 'react';
import styles from '../styles/layout.module.css';
import Image from 'next/image';

export default function Nav(props) {
	const [
		pullout,
		setPullout
	] = useState(false);

	let navClass = '';
	let navOverlay = 'hidden';

	if (pullout) {
		navClass = 'NavActive';
		navOverlay = '';
	}

	return (
		<nav className={'fixed w-screen z-40 left-0 top-0 bg-black text-white ' + styles.NavbarStyle}>
			<div
				onClick={() => setPullout(!pullout)}
				className={'transition-all fixed top-0 left-0 w-screen h-screen bg-black bg-opacity-50 ' + navOverlay}
			/>
			<button onClick={() => setPullout(!pullout)} className='h-full w-16'>
				<div className='flex flex-col items-center'>
					<div className='bg-white w-5/12 my-1' style={{ height: '2px' }} />
					<div className='bg-white w-5/12 my-1' style={{ height: '2px' }} />
					<div className='bg-white w-5/12 my-1' style={{ height: '2px' }} />
				</div>
			</button>
			<div className='relative'>
				<ul className={'fixed absolute sm:static flex sm:h-full bg-black transition-all ' + styles[navClass]}>
					<Link href='/' as='/'>
						<a
							className={
								'h-full flex items-center transition-all px-4 ' +
								(props.current ? 'bg-white text-black' : 'hover:bg-white hover:text-black')
							}
						>
							<li className='text-2xl font-medium font-medula'>Home</li>
						</a>
					</Link>
					{props.linkList.map((navLink) => {
						return (
							<Link href={navLink.link} key={navLink.label}>
								<a
									className={
										'h-full flex items-center transition-all ' +
										(navLink.current
											? 'bg-white text-black '
											: 'hover:bg-white hover:text-black ') +
										(navLink.image ? '' : 'px-4 ')
									}
								>
									<li className='text-2xl font-medula font-medium'>
										{navLink.image ? (
											<div className={'flex items-center pr-4 ' + styles.NavImageLabelCouple}>
												<div
													className={
														'transition-all relative mr-4 border-black border-2 hidden sm:block ' +
														styles.NavImage
													}
												>
													<Image alt={navLink.label} src={navLink.image} layout='fill' />
												</div>
												<label className='ml-4 sm:ml-0'>{navLink.label}</label>
											</div>
										) : (
											<div>{navLink.label}</div>
										)}
									</li>
								</a>
							</Link>
						);
					})}
				</ul>
			</div>
		</nav>
	);
}
