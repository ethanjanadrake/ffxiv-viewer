import Nav from '../components/Nav';
import Head from 'next/head';
import LinkGrid from '../components/LinkGrid';
import Paginator from '../components/Paginator';

export default function search({ data, s, serverName, searchType }) {
	return (
		<div>
			<Head>
				<title>FFXIV - Search</title>
			</Head>
			<Nav linkList={[]} />
			<Paginator pagination={data.Pagination} serverName={serverName} type={searchType} searchQuery={s} />
			<LinkGrid results={data.Results} type={searchType} />
			<Paginator pagination={data.Pagination} serverName={serverName} type={searchType} searchQuery={s} />
		</div>
	);
}

export const getServerSideProps = async ({ query }) => {
	let p = '1';
	let server = '';
	if (query.p) {
		p = query.p;
	}
	if (query.server !== 'None') {
		server = `&server=${query.server}`;
	}

	const res = await fetch(
		`https://xivapi.com/${query.type}/search?name=${query.s}&page=${query.p}${server}&private_key=76c22de8f16d417895cb6832dfa2928f36c49486b6634ea081d5c5e308c00dc1`
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
					data,
					s          : query.s,
					serverName : query.server,
					searchType : query.type
				}
			};
	}
};
