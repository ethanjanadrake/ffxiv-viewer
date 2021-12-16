import Image from 'next/image';
import CharacterClassListColumn from './CharacterClassListColumn';

export default function CharacterClassSection(props) {
	const classArray1 = [];
	const classArray2 = [];
	const classArray3 = [];

	classArray1.push({ icon: '/images/Role_Tank.png', roleLabel: 'Tank' });
	for (let i = 0; i <= 3; i++) {
		classArray1.push(props.classes[i]);
	}
	classArray1.push({ icon: '/images/Role_Healer.png', roleLabel: 'Healer' });
	for (let i = 4; i <= 7; i++) {
		classArray1.push(props.classes[i]);
	}
	classArray2.push({ icon: '/images/Role_Melee_DPS.png', roleLabel: 'Melee DPS' });
	for (let i = 8; i <= 12; i++) {
		classArray2.push(props.classes[i]);
	}
	classArray2.push({ icon: '/images/Role_Physical_Ranged_DPS.png', roleLabel: 'Physical Ranged DPS' });
	for (let i = 13; i <= 15; i++) {
		classArray2.push(props.classes[i]);
	}
	classArray2.push({ icon: '/images/Role_Magical_Ranged_DPS.png', roleLabel: 'Magical Ranged DPS' });
	for (let i = 16; i <= 19; i++) {
		classArray2.push(props.classes[i]);
	}
	classArray3.push({ icon: '/images/Role_Disciples_of_the_Hand.png', roleLabel: 'Disciples of the Hand' });
	for (let i = 28; i <= 30; i++) {
		classArray3.push(props.classes[i]);
	}
	classArray3.push({ icon: '/images/Role_Disciples_of_the_Land.png', roleLabel: 'Disciples of the Land' });
	for (let i = 20; i <= 27; i++) {
		classArray3.push(props.classes[i]);
	}

	classArray2[14].UnlockedState.Name = 'Blue Mage';

	classArray1.forEach((classJob) => {
		if (classJob.JobID) {
			classJob.icon = '/images/' + classJob.UnlockedState.Name.split(' ').join('_') + '_Icon.png';
		}
	});
	classArray2.forEach((classJob) => {
		if (classJob.JobID) {
			classJob.icon = '/images/' + classJob.UnlockedState.Name.split(' ').join('_') + '_Icon.png';
		}
	});
	classArray3.forEach((classJob) => {
		if (classJob.JobID) {
			classJob.icon = '/images/' + classJob.UnlockedState.Name.split(' ').join('_') + '_Icon.png';
		}
	});

	return (
		<div className='grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 grid-flow-col bg-gray-600 w-9/12 md:w-9/12 xl:w-10/12 p-3 pb-8 rounded-lg border-2 border-yellow-400 border-solid mx-auto'>
			<div className='col-start-1'>
				<CharacterClassListColumn classArray={classArray1} />
			</div>
			<div className='col-start-1 xl:col-start-2'>
				<CharacterClassListColumn classArray={classArray2} />
			</div>
			<div className='col-start-1 md:col-start-2 xl:col-start-4'>
				<CharacterClassListColumn classArray={classArray3} />
			</div>
			<div className='w-11/12 col-start-1 md:col-start-2 xl:col-start-3 row-start-1 py-5 mx-auto'>
				<p className='text-center font-medula text-xl text-primary-t-fade'>
					{props.tribe} {props.race}
				</p>
				<p className='text-center font-medula text-2xl text-primary'>{props.currentClass}</p>
				<div
					className='relative mx-auto my-2 border-2 border-primary-t-fade rounded-lg'
					style={{ width: '160px', height: '218px' }}
				>
					<Image
						alt='player avatar'
						src={props.portrait}
						layout='fill'
						objectFit='cover'
						className='rounded-lg'
					/>
				</div>
				<p className='text-center font-medula text-sm text-primary-t-fade'>Nameday: {props.nameday}</p>
				<div className='flex items-center justify-center py-2'>
					<div className='w-5 h-5 relative mr-2'>
						<Image alt='guardian deity icon' src={`https://xivapi.com${props.deityIcon}`} layout='fill' />
					</div>
					<p className='text-center font-medula text-xl text-primary-t-fade'>{props.deity}</p>
					<div className='w-5 h-5 relative ml-2'>
						<Image alt='guardian deity icon' src={`https://xivapi.com${props.deityIcon}`} layout='fill' />
					</div>
				</div>
			</div>
		</div>
	);
}
