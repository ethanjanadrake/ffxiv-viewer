import Image from 'next/image';
import Nav from '../../../components/Nav';
import CharacterTitleSection from '../../../components/CharacterTitleSection';
import styles from '../../../styles/character.module.css';

export default function equipment({ data }) {
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
		gear[index] = { slot, icon: data.gear[slot], glamIcon: data.glams[slot] };
	});

	return (
		<div>
			{/* Display the Navbar with Home button as well as portrait and name of character which links to the current page */}
			<Nav
				linkList={[
					{
						link  : `../${data.character.ID}`,
						label : data.character.Name,
						image : data.character.Avatar
					},
					{
						link  : `../${data.character.ID}/equipment`,
						label : 'Equipment'
					}
				]}
			/>

			{/* Display Name, Title, Server, Free and Grand Companies */}
			<CharacterTitleSection
				name={data.character.Name}
				dataCenter={data.character.DC}
				server={data.character.Server}
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
							key={col + row}
							className='relative w-10 h-10'
							style={{ gridColumnStart: col, gridRowStart: row }}
						>
							{item.icon ? (
								<Image alt={`gear ${item.slot} icon`} src={item.glamIcon || item.icon} layout='fill' />
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
	const resChar = await fetch(`https://xivapi.com/character/${context.params.id}`);
	const dataChar = await resChar.json();

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
			const gearSlots = Object.keys(dataChar.Character.GearSet.Gear);
			const gear = {};
			const glams = {};

			for (const slot in gearSlots) {
				const resItem = await fetch(
					`https://xivapi.com/Item/${dataChar.Character.GearSet.Gear[gearSlots[slot]].ID}`
				);
				const dataItem = await resItem.json();
				const itemIcon = 'https://xivapi.com' + dataItem.Icon;

				const itemSlotKey = gearSlots[slot];
				gear[itemSlotKey] = itemIcon;

				let glamIcon = null;

				if (dataChar.Character.GearSet.Gear[gearSlots[slot]].Mirage) {
					const resGlam = await fetch(
						`https://xivapi.com/Item/${dataChar.Character.GearSet.Gear[gearSlots[slot]].Mirage}`
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
						gear,
						glams
					}
				}
			};
	}
}
