import Image from 'next/image';
import Link from 'next/link';

export default function CompanyHeader(props) {
	return (
		<div>
			<Link href={props.href}>
				<a>
					<div className='pt-20 flex flex-col text-center md:flex-row justify-center items-center'>
						<div className='relative w-16 h-16 md:mr-5 flex items-center border-2 border-black'>
							{props.crest.map((crestPiece) => {
								return <Image alt='crest piece' layout='fill' src={crestPiece} key={crestPiece} />;
							})}
						</div>

						<h1 className='text-5xl font-almendra font-bold'>{props.name}</h1>
					</div>
				</a>
			</Link>
			<h4 className='my-4 text-center text-lg font-bold text-blue-800'>
				&lt;{props.dataCenter} - {props.server}&gt;
			</h4>
		</div>
	);
}
