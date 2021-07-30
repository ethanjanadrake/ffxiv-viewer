import Image from 'next/image';
import Link from 'next/link';

export default function CompanyHeader(props) {
	let styleClasses = {
		full                   : '',
		innerLink              : '',
		imageAndTitleContainer : 'pt-20 flex flex-col text-center md:flex-row justify-center items-center',
		imageContainer         : 'relative w-16 h-16 md:mr-5 flex items-center border-2 border-black'
	};

	if (props.mode === 'simple' || props.mode === 'grand-simple') {
		(styleClasses.full = `col-start-1 row-start-${props.rowSmall} md:row-start-1 h-full flex flex-col justify-end`),
			(styleClasses.innerLink =
				'transition-all bg-purple-200 bg-opacity-75 rounded-2xl flex justify-center items-center hover:bg-blue-200 hover:bg-opacity-100 p-5 h-24 relative w-56');
		styleClasses.imageAndTitleContainer = 'text-center justify-center items-center relative';
		styleClasses.imageContainer = 'relative w-12 h-12 border-1 mr-2 flex items-center border-black';
	}

	if (props.mode === 'simple') {
		styleClasses.full = styleClasses.full + ' md:col-start-1';
	}
	if (props.mode === 'grand-simple') {
		styleClasses.full = styleClasses.full + ' md:col-start-3';
	}

	if (props.mode === 'grand-simple') {
		styleClasses.imageAndTitleContainer = '';
	}

	return (
		<div className={styleClasses.full}>
			<Link href={props.href}>
				<a>
					<div className={styleClasses.innerLink}>
						<div className={styleClasses.imageAndTitleContainer}>
							{props.mode !== 'grand-simple' ? (
								<div className={styleClasses.imageContainer}>
									{props.crest.map((crestPiece) => {
										return (
											<Image alt='crest piece' layout='fill' src={crestPiece} key={crestPiece} />
										);
									})}
								</div>
							) : (
								<div className='absolute' style={{ top: '-50px', right: '-40px' }}>
									<Image alt='grand company banner' src={props.crest} width='100' height='100' />
								</div>
							)}
							{!props.mode ? <h1 className='text-5xl font-bold'>{props.name}</h1> : <div />}
						</div>
						{props.mode === 'simple' || props.mode === 'grand-simple' ? (
							<div>
								<h1 className='text-lg font-medium text-center'>{props.name}</h1>
								<div className='flex justify-center items-center'>
									{props.mode === 'simple' ? (
										<div className='w-5 h-5 relative'>
											<Image
												alt='player rank icon'
												src={props.rankIcon}
												layout='fill'
												className='absolute'
											/>
										</div>
									) : (
										<div />
									)}
									<div className='italic text-xs'>{props.rank}</div>
								</div>
							</div>
						) : (
							<div />
						)}
					</div>
				</a>
			</Link>
			{props.mode === 'simple' || props.mode === 'grand-simple' ? (
				<div />
			) : (
				<h4 className='my-4 text-center text-lg font-bold text-blue-600'>
					&lt;{props.dataCenter} - {props.server}&gt;
				</h4>
			)}
		</div>
	);
}
