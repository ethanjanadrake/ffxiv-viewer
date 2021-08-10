import Head from 'next/head';
import Nav from '../../../components/Nav';
import CharacterTitleSection from '../../../components/CharacterTitleSection';
import EquipmentGrid from '../../../components/EquipmentGrid';

export default function glamours({ data }) {
	return (
		<div>
			<Head>
				<title>{data.character.Name} - Glamours</title>
			</Head>
			{/* Display the Navbar with Home button as well as portrait and name of character which links to the current page */}
			<Nav
				linkList={[
					{
						link  : `/../character/${data.character.ID}`,
						label : data.character.Name,
						image : data.character.Avatar
					},
					{
						link  : `/../character/${data.character.ID}/equipment`,
						label : 'Equipment'
					},
					{
						link    : `/../character/${data.character.ID}/glamours`,
						label   : 'Glamours',
						current : true
					}
				]}
			/>

			{/* Display Name, Title, Server, Free and Grand Companies */}
			<CharacterTitleSection
				name={data.character.Name}
				dataCenter={data.character.DC}
				server={data.character.Server}
				grandCompany={{}}
			/>
			<EquipmentGrid portrait={data.character.Portrait} gear={data.glams} />
		</div>
	);
}

export async function getServerSideProps(context) {
	const resChar = await fetch(
		`https://xivapi.com/character/${context.params
			.id}?private_key=76c22de8f16d417895cb6832dfa2928f36c49486b6634ea081d5c5e308c00dc1`
	);
	const dataChar = await resChar.json();

	switch (dataChar.Error) {
		case true: {
			return {
				notFound : true
			};
		}
		default:
			const gearSlots = Object.keys(dataChar.Character.GearSet.Gear);
			const glams = {};

			for (const slot in gearSlots) {
				if (
					dataChar.Character.GearSet.Gear[gearSlots[slot]].Mirage &&
					Number.isInteger(dataChar.Character.GearSet.Gear[gearSlots[slot]].Mirage)
				) {
					const resGlam = await fetch(
						`https://xivapi.com/Item/${dataChar.Character.GearSet.Gear[gearSlots[slot]]
							.Mirage}?private_key=76c22de8f16d417895cb6832dfa2928f36c49486b6634ea081d5c5e308c00dc1`
					);
					const dataGlam = await resGlam.json();
					const glamSlotKey = gearSlots[slot];
					glams[glamSlotKey] = dataGlam;
				}
			}

			return {
				props : {
					data : {
						character : dataChar.Character,
						glams
					}
				}
			};
	}
}
