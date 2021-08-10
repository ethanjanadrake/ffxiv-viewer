import Link from 'next/link';
import Image from 'next/image';

export default function CharacterTitleSection(props) {
	return (
		<div className='grid grid-cols-1 md:grid-cols-3 place-items-center gap-5 mb-10'>
			<div className='col-start-1 md:col-start-2'>
				<h1 className='text-center mt-7'>
					{props.titlePrefix ? (
						<div>
							<div className='text-3xl font-almendra'>{props.title}</div>
							<div className='font-bold font-almendra text-5xl'>{props.name}</div>
						</div>
					) : (
						<div>
							<div className='font-bold font-almendra text-5xl'>{props.name}</div>
							<div className='text-3xl font-almendra'>{props.title}</div>
						</div>
					)}
				</h1>
				<h4 className='text-center text-lg p-4 text-secondary font-bold'>
					&lt;{props.dataCenter}: {props.server}&gt;
				</h4>
			</div>
			{props.freeCompanyId ? (
				<div className='col-start-1 row-start-2 md:row-start-1 md:col-start-1 h-full flex flex-col justify-end'>
					<Link href={`/../freecompany/${props.freeCompanyId}`}>
						<a>
							<div className='transition-all bg-secondary-b bg-opacity-75 rounded-2xl flex justify-center items-center text-secondary-t hover:text-primary-t hover:bg-primary-b hover:bg-opacity-100 p-5 h-24 relative w-56'>
								<label className='text-3xl font-medium font-medula text-center hover:cursor-pointer'>
									{props.freeCompanyName}
								</label>
							</div>
						</a>
					</Link>
				</div>
			) : (
				<div />
			)}

			{props.grandCompany.name ? (
				<div className='col-start-1 row-start-3 md:row-start-1 md:col-start-3 h-full flex flex-col justify-end'>
					<Link href={`https://ffxiv.gamerescape.com/wiki/${props.grandCompany.name.split(' ').join('_')}`}>
						<a>
							<div className='transition-all bg-secondary-b bg-opacity-75 rounded-2xl flex justify-center items-center text-secondary-t hover:text-primary-t hover:bg-primary-b hover:bg-opacity-100 p-5 h-24 relative w-56'>
								<label className='text-3xl font-medium font-medula text-center hover:cursor-pointer'>
									{props.grandCompany.name}
								</label>
								<div className='absolute' style={{ top: '-50px', right: '-50px' }}>
									<div className='relative w-24 h-24'>
										<Image
											alt='grand company banner'
											src={props.grandCompany.banner}
											layout='fill'
											objectFit='contain'
										/>
									</div>
								</div>
							</div>
						</a>
					</Link>
				</div>
			) : (
				<div />
			)}
		</div>
	);
}
