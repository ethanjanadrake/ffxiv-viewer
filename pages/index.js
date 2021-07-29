import Head from 'next/head';
import Link from 'next/Link';

import Nav from '../components/Nav';

export default function Home() {
	return (
		<div>
			<Head>
				<title>Lodestone 2.0</title>
			</Head>
			<Nav linkList={[]} current={true} />
			<h1 className='text-center pt-20'>Lodestone 2.0</h1>
			<Link href='freecompany/9231112598714358365'>
				<a>
					<h1>Blitz</h1>
				</a>
			</Link>
			<Link href='freecompany/9231112598714358364'>
				<a>
					<h2>Limit</h2>
				</a>
			</Link>
			<Link href='freecompany/9231394073691073564'>
				<a>
					<h2>Syndicate</h2>
				</a>
			</Link>
		</div>
	);
}
