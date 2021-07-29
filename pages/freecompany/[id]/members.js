import Head from 'next/head';
import Image from 'next/image';
import Link from 'next/link';
import CompanyHeader from '../../../components/CompanyHeader';
import Nav from '../../../components/Nav';

export default function members({ data }) {
	console.log(data);
	return (
		<div>
			<Head>
				<title>Members - {data.FreeCompany.Name}</title>
			</Head>
			<Nav
				linkList={[
					{ link: `../${data.FreeCompany.ID}`, label: `${data.FreeCompany.Tag}`, current: false },
					{ link: `../${data.FreeCompany.ID}/members`, label: 'Members', current: true }
				]}
			/>
			<CompanyHeader
				crest={data.FreeCompany.Crest}
				name={data.FreeCompany.Name}
				server={data.FreeCompany.Server}
				dataCenter={data.FreeCompany.DC}
				id={data.FreeCompany.ID}
				href={`../${data.FreeCompany.ID}`}
			/>
			<div className='grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 max-w-3xl xl:max-w-6xl gap-8 p-5 sm:p-10 place-items-center mx-auto '>
				{data.FreeCompanyMembers.map((member) => (
					<Link key={member.ID} href={`/character/${member.ID}`}>
						<a className='transition-all flex justify-start w-full max-w-sm items-center bg-purple-200 hover:bg-blue-200 cursor-pointer p-4 rounded-3xl'>
							<div className='rounded-full border-solid border-2 border-black w-12 h-12 relative'>
								<Image
									alt='player avatar'
									src={member.Avatar}
									layout='fill'
									className='absolute rounded-full'
								/>
							</div>
							<div className='ml-5'>
								<div>{member.Name}</div>
								<div className='flex justify-start items-center'>
									<div className='w-5 h-5 relative'>
										<Image
											alt='player rank icon'
											src={member.RankIcon}
											layout='fill'
											className='absolute'
										/>
									</div>
									<div className='italic text-xs'>{member.Rank}</div>
								</div>
							</div>
						</a>
					</Link>
				))}
			</div>
		</div>
	);
}

export const getServerSideProps = async (context) => {
	const res = await fetch(`https://xivapi.com/freecompany/${context.params.id}?data=FCM`);
	const data = await res.json();

	switch (data.Error) {
		case true: {
			return {
				notFound : true
			};
		}
		default:
			return {
				props : {
					data
				}
			};
	}
};
