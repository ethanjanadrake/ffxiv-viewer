import Image from 'next/image';
import Link from 'next/link';

export default function LinkGrid(props) {
	return (
		<div className='grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 max-w-3xl xl:max-w-6xl gap-8 p-5 sm:p-10 place-items-center mx-auto '>
			{props.characters.map((character) => (
				<Link key={character.ID} href={`/character/${character.ID}`}>
					<a className='transition-all flex justify-start w-full max-w-sm items-center bg-secondary-b bg-opacity-50 cursor-pointer p-4 rounded-lg hover:bg-primary-b hover:opacity-100 border-opacity-0 hover:border-opacity-100 border-primary border-2 hover:text-secondary-t font-roboto group'>
						<div className='transition-all rounded-full border-solid border-2 border-secondary w-12 h-12 relative group-hover:border-primary'>
							<Image
								alt='player avatar'
								src={character.Avatar}
								layout='fill'
								className='absolute rounded-full'
							/>
						</div>
						<div className='ml-5'>
							<div className='font-bold text-secondary group-hover:text-primary'>{character.Name}</div>
							{character.Rank ? (
								<div className='flex justify-start items-center'>
									<div className='w-5 h-5 relative'>
										<Image
											alt='player rank icon'
											src={character.RankIcon}
											layout='fill'
											className='absolute'
										/>
									</div>
									<div className='text-md font-medula text-secondary-t group-hover:text-primary-t'>
										{character.Rank}
									</div>
								</div>
							) : (
								<div />
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
