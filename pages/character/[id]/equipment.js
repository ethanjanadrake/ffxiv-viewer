import Head from 'next/head';
import Nav from '../../../components/Nav';
import CharacterTitleSection from '../../../components/CharacterTitleSection';
import EquipmentGrid from '../../../components/EquipmentGrid';

export default function equipment({ data }) {
	return (
		<div>
			<Head>
				<title>{data.character.Name} - Equipment</title>
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
						link    : `/../character/${data.character.ID}/equipment`,
						label   : 'Equipment',
						current : true
					},
					{
						link  : `/../character/${data.character.ID}/glamours`,
						label : 'Glamours'
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
			<EquipmentGrid portrait={data.character.Portrait} gear={data.gear} />
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
			const gear = {};

			for (const slot in gearSlots) {
				const resItem = await fetch(
					`https://xivapi.com/Item/${dataChar.Character.GearSet.Gear[gearSlots[slot]]
						.ID}?private_key=76c22de8f16d417895cb6832dfa2928f36c49486b6634ea081d5c5e308c00dc1`
				);
				const dataItem = await resItem.json();

				const itemSlotKey = gearSlots[slot];
				gear[itemSlotKey] = dataItem;
			}

			return {
				props : {
					data : {
						character : dataChar.Character,
						gear
					}
				}
			};
	}
}
