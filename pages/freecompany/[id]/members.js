import Head from 'next/head';
import Image from 'next/image';
import Link from 'next/link';
import CompanyHeader from '../../../components/CompanyHeader';
import Nav from '../../../components/Nav';
import styles from '../../../styles/members.module.css';

export default function members({ data }) {
	console.log(data);
	return (
		<div>
			<Head>
				<title>Members - {data.FreeCompany.Name}</title>
			</Head>
			<Nav
				linkList={[
					{
						link    : `/../freecompany/${data.FreeCompany.ID}`,
						label   : `${data.FreeCompany.Tag}`,
						current : false
					},
					{ link: `/../freecompany/${data.FreeCompany.ID}/members`, label: 'Members', current: true }
				]}
			/>
			<CompanyHeader
				crest={data.FreeCompany.Crest}
				name={data.FreeCompany.Name}
				server={data.FreeCompany.Server}
				dataCenter={data.FreeCompany.DC}
				id={data.FreeCompany.ID}
				href={`/../freecompany/${data.FreeCompany.ID}`}
			/>
			<div className='grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 max-w-3xl xl:max-w-6xl gap-8 p-5 sm:p-10 place-items-center mx-auto '>
				{data.FreeCompanyMembers.map((member) => (
					<Link key={member.ID} href={`/character/${member.ID}`}>
						<a
							className={
								'transition-all flex justify-start w-full max-w-sm items-center bg-yellow-300 bg-opacity-50 hover:bg-blue-200 cursor-pointer p-4 rounded-lg hover:bg-gray-600 hover:opacity-100 border-opacity-0 hover:border-opacity-100 border-yellow-400 border-2 hover:text-white font-roboto ' +
								styles.MemberLink
							}
						>
							<div
								className={
									'transition-all rounded-full border-solid border-2 border-gray-800 w-12 h-12 relative ' +
									styles.Avatar
								}
							>
								<Image
									alt='player avatar'
									src={member.Avatar}
									layout='fill'
									className='absolute rounded-full'
								/>
							</div>
							<div className='ml-5'>
								<div className={'font-bold text-blue-800 ' + styles.PlayerName}>{member.Name}</div>
								<div className='flex justify-start items-center'>
									<div className='w-5 h-5 relative'>
										<Image
											alt='player rank icon'
											src={member.RankIcon}
											layout='fill'
											className='absolute'
										/>
									</div>
									<div className={'text-xs font-medula text-lg text-gray-900 ' + styles.Rank}>
										{member.Rank}
									</div>
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
	const res = await fetch(
		`https://xivapi.com/freecompany/${context.params
			.id}?data=FCM&private_key=76c22de8f16d417895cb6832dfa2928f36c49486b6634ea081d5c5e308c00dc1`
	);
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
