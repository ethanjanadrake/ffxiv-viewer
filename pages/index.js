import Head from "next/head";
import Link from "next/link";

import Nav from "../components/Nav";

export default function Home() {
	return (
		<div>
			<Head>
				<title>FFXIV Viewer</title>
				<meta name='charset' content='UTF-8' />
				<meta property='og:title' content='ffxiv-viewer' />
				<meta
					property='og:description'
					content='User interface for looking up character and free company info from Square Enix MMO Final Fantasy XIV'
				/>
				<meta property='og:image' content='/socialimage.jpg' />
				<meta
					name='keywords'
					content='mmo, mmorpg, rpg, game, video, endwalker, final, fantasy'
				/>
				<meta name='author' content='Ethan Jana Drake' />
			</Head>
			<Nav linkList={[]} current={true} />
			<h1 className='text-center pt-20'>FFXIV Viewer</h1>
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
