import Head from 'next/head';
import CompanyHeader from '../../../components/CompanyHeader';
import Nav from '../../../components/Nav';
import LinkGrid from '../../../components/LinkGrid';

export default function members({ data }) {
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
			<LinkGrid results={data.FreeCompanyMembers} type='character' origin='fc' />
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
