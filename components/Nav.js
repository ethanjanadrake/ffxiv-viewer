import Link from 'next/link';
import styles from '../styles/layout.module.css';
import Image from 'next/image';

export default function Nav(props) {
	return (
		<nav className={'fixed w-screen z-40 left-0 top-0 bg-black text-white ' + styles.NavbarStyle}>
			<ul className='flex h-full'>
				<Link href='/' as='/'>
					<a
						className={
							'h-full flex items-center transition-all px-4 ' +
							(props.current ? 'bg-white text-black' : 'hover:bg-white hover:text-black')
						}
					>
						<li className='text-lg font-medium'>Home</li>
					</a>
				</Link>
				{props.linkList.map((navLink) => {
					return (
						<Link href={navLink.link} key={navLink.label}>
							<a
								className={
									'h-full flex items-center transition-all ' +
									(navLink.current ? 'bg-white text-black ' : 'hover:bg-white hover:text-black ') +
									(navLink.image ? '' : 'px-4 ')
								}
							>
								<li className='text-lg font-medium'>
									{navLink.image ? (
										<div className={'flex items-center pr-4 ' + styles.NavImageLabelCouple}>
											<div
												className={
													'transition-all relative mr-4 border-black border-2 ' +
													styles.NavImage
												}
											>
												<Image alt={navLink.label} src={navLink.image} layout='fill' />
											</div>
											{navLink.label}
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
		</nav>
	);
}
