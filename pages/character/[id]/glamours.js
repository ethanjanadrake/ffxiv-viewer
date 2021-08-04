import Image from 'next/image';
import Nav from '../../../components/Nav';
import CharacterTitleSection from '../../../components/CharacterTitleSection';
import styles from '../../../styles/character.module.css';

export default function glamours({ data }) {
	console.log(data);

	// data does not include offhand
	const gearSlots = [
		'Head',
		'Body',
		'Hands',
		'Waist',
		'Legs',
		'Feet',
		'MainHand',
		'OffHand',
		'Earrings',
		'Necklace',
		'Bracelets',
		'Ring1',
		'Ring2',
		'SoulCrystal'
	];

	const gear = [];

	gearSlots.forEach((slot, index) => {
		gear[index] = { slot, glamIcon: data.glams[slot] };
	});

	return (
		<div>
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

			<div className='grid grid-cols-3 place-items-center'>
				<div className={'col-start-2 ' + styles.Avatar}>
					<Image alt='player avatar' src={data.character.Portrait} width='640px' height='873px' />
				</div>

				{gear.map((item, index) => {
					let col = 1;
					let row = index + 1;

					if (index > 6) {
						col = 3;
						row = row - 7;
					}

					return (
						<div
							key={index}
							className='relative w-10 h-10'
							style={{ gridColumnStart: col, gridRowStart: row }}
						>
							{item.glamIcon ? (
								<Image alt={`gear ${item.slot} icon`} src={item.glamIcon} layout='fill' />
							) : (
								<div />
							)}
						</div>
					);
				})}
			</div>
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
				let glamIcon = null;

				if (dataChar.Character.GearSet.Gear[gearSlots[slot]].Mirage) {
					const resGlam = await fetch(
						`https://xivapi.com/Item/${dataChar.Character.GearSet.Gear[gearSlots[slot]]
							.Mirage}?private_key=76c22de8f16d417895cb6832dfa2928f36c49486b6634ea081d5c5e308c00dc1`
					);
					const dataGlam = await resGlam.json();
					glamIcon = 'https://xivapi.com' + dataGlam.Icon;
				}
				const glamSlotKey = gearSlots[slot];
				glams[glamSlotKey] = glamIcon;
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
