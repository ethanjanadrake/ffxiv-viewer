import Image from 'next/image';
import Link from 'next/link';

export default function LinkGrid(props) {
	return (
		<div className='grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 max-w-3xl xl:max-w-6xl gap-8 p-5 sm:p-10 place-items-center mx-auto '>
			{props.results.map((result) => (
				<Link key={result.ID} href={`/${props.type}/${result.ID}`}>
					<a className='transition-all flex justify-start w-full max-w-sm items-center bg-secondary-b bg-opacity-50 cursor-pointer p-4 rounded-lg hover:bg-primary-b hover:opacity-100 border-opacity-0 hover:border-opacity-100 border-primary border-2 hover:text-secondary-t font-roboto group'>
						{result.Avatar ? (
							<div className='transition-all rounded-full border-solid border-2 border-secondary w-12 h-12 relative group-hover:border-primary'>
								<Image
									alt='player avatar'
									src={result.Avatar}
									layout='fill'
									className='absolute rounded-full'
								/>
							</div>
						) : (
							<div className='transition-all relative w-16 h-16 md:mr-5 flex items-center border-2 border-secondary group-hover:border-primary'>
								{result.Crest.map((crestPiece) => {
									return <Image alt='crest piece' layout='fill' src={crestPiece} key={crestPiece} />;
								})}
							</div>
						)}
						<div className={props.origin === 'fc' ? 'ml-5' : 'mx-auto flex flex-col items-center'}>
							<div>
								<div className='font-bold text-secondary group-hover:text-primary'>{result.Name}</div>
								{result.Rank ? (
									<div className='flex justify-start items-center'>
										<div className='w-5 h-5 relative'>
											<Image
												alt='player rank icon'
												src={result.RankIcon}
												layout='fill'
												className='absolute'
											/>
										</div>
										<div className='text-md font-medula text-secondary-t group-hover:text-primary-t'>
											{result.Rank}
										</div>
									</div>
								) : (
									<div />
								)}
							</div>
							{props.origin === 'fc' ? (
								<div />
							) : (
								<label className='font-medula text-primary-b group-hover:text-primary-t text-lg'>
									&lt;{result.Server}&gt;
								</label>
							)}
						</div>
					</a>
				</Link>
			))}
		</div>
	);
}

// add display for free company searches
// add server label
