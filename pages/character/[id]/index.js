import Head from 'next/head';
import Nav from '../../../components/Nav';
import CharacterTitleSection from '../../../components/CharacterTitleSection';
import CharacterClassSection from '../../../components/CharacterClassSection';

export default function character({ data }) {
	return (
		<div>
			<Head>
				<title>{data.character.Name}</title>
			</Head>
			{/* Display the Navbar with Home button as well as portrait and name of character which links to the current page */}
			<Nav
				linkList={[
					{
						link    : `/character/${data.character.ID}`,
						label   : data.character.Name,
						image   : data.character.Avatar,
						current : true
					},
					{
						link  : `/character/${data.character.ID}/equipment`,
						label : 'Equipment'
					},
					{
						link  : `/character/${data.character.ID}/glamours`,
						label : 'Glamours'
					}
				]}
			/>

			{/* Display Name, Title, Server, Free and Grand Companies */}
			<CharacterTitleSection
				title={data.title}
				name={data.character.Name}
				titlePrefix={data.titlePrefix}
				dataCenter={data.character.DC}
				server={data.character.Server}
				freeCompanyId={data.character.FreeCompanyId}
				freeCompanyName={data.character.FreeCompanyName}
				grandCompany={data.grandCompany}
			/>

			<CharacterClassSection
				classes={data.character.ClassJobs}
				portrait={data.character.Portrait}
				gender={data.character.Gender}
				tribe={data.tribe}
				race={data.race}
				currentClass={data.character.ActiveClassJob.UnlockedState.Name}
				nameday={data.character.Nameday}
				deity={data.deity}
				deityIcon={data.deityIcon}
			/>
		</div>
	);
}

export async function getServerSideProps(context) {
	const fetcher = (url) => fetch(url).then((res) => res.json());
	const dataChar = await fetcher(
		`https://xivapi.com/character/${context.params
			.id}?private_key=76c22de8f16d417895cb6832dfa2928f36c49486b6634ea081d5c5e308c00dc1`
	);
	const classes = await fetcher(
		'https://xivapi.com/classjob?private_key=76c22de8f16d417895cb6832dfa2928f36c49486b6634ea081d5c5e308c00dc1'
	);

	let charGender = 'Male';

	if (dataChar.Character.Gender === 2) {
		charGender = 'Female';
	}

	switch (dataChar.Error) {
		case true: {
			return {
				notFound : true
			};
		}
		default:
			const dataRace = await fetcher(
				`https://xivapi.com/Race/${dataChar.Character
					.Race}?private_key=76c22de8f16d417895cb6832dfa2928f36c49486b6634ea081d5c5e308c00dc1`
			);
			const dataGuardian = await fetcher(
				`https://xivapi.com/GuardianDeity/${dataChar.Character
					.GuardianDeity}?private_key=76c22de8f16d417895cb6832dfa2928f36c49486b6634ea081d5c5e308c00dc1`
			);
			const dataTribe = await fetcher(
				`https://xivapi.com/Tribe/${dataChar.Character
					.Tribe}?private_key=76c22de8f16d417895cb6832dfa2928f36c49486b6634ea081d5c5e308c00dc1`
			);
			const dataTitle = await fetcher(
				`https://xivapi.com/Title/${dataChar.Character
					.Title}?private_key=76c22de8f16d417895cb6832dfa2928f36c49486b6634ea081d5c5e308c00dc1`
			);
			let grandCompany = {};

			if (dataChar.Character.GrandCompany) {
				let grandCompanyLocation = '';
				if (dataChar.Character.GrandCompany.NameID === 1) {
					grandCompanyLocation = 'Limsa';
					grandCompany.banner =
						'https://static.wikia.nocookie.net/ffxiv_gamepedia/images/3/3c/Maelstrom_banner.png/revision/latest/scale-to-width-down/300?cb=20190407185901';
					grandCompany.name = 'The Maelstrom';
				}
				else if (dataChar.Character.GrandCompany.NameID === 2) {
					grandCompanyLocation = 'Gridania';
					grandCompany.banner =
						'https://static.wikia.nocookie.net/ffxiv_gamepedia/images/0/00/Order_of_the_Twin_Adder_banner.png/revision/latest/scale-to-width-down/300?cb=20190407190102';
					grandCompany.name = 'The Order of the Twin Adder';
				}
				else {
					grandCompanyLocation = 'Uldah';
					grandCompany.banner =
						'https://static.wikia.nocookie.net/ffxiv_gamepedia/images/a/ac/Immortal_Flames_banner.png/revision/latest/scale-to-width-down/300?cb=20190407190035';
					grandCompany.name = 'The Immortal Flames';
				}
			}

			return {
				props : {
					data : {
						character    : dataChar.Character,
						race         : dataRace.Name,
						deity        : dataGuardian.Name,
						deityIcon    : dataGuardian.Icon,
						tribe        : dataTribe.Name,
						title        : dataTitle.Name,
						titlePrefix  : dataTitle.IsPrefix,
						grandCompany,
						classes      : classes.Results
					}
				}
			};
	}
}
