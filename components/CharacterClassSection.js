import Image from 'next/image';
import styles from '../styles/character.module.css';

export default function CharacterClassSection(props) {
	const classArray = [];

	classArray.push({ icon: '/images/Role_Tank.png', roleLabel: 'Tank' });
	for (let i = 0; i < 4; i++) {
		classArray.push(props.classes[i]);
	}
	classArray.push({ icon: '/images/Role_Healer.png', roleLabel: 'Healer' });
	for (let i = 8; i < 11; i++) {
		classArray.push(props.classes[i]);
	}
	classArray.push({ icon: '/images/Role_Melee_DPS.png', roleLabel: 'Melee DPS' });
	for (let i = 4; i < 8; i++) {
		classArray.push(props.classes[i]);
	}
	classArray.push({ icon: '/images/Role_Physical_Ranged_DPS.png', roleLabel: 'Physical Ranged DPS' });
	for (let i = 11; i < 14; i++) {
		classArray.push(props.classes[i]);
	}
	classArray.push({ icon: '/images/Role_Magical_Ranged_DPS.png', roleLabel: 'Magical Ranged DPS' });
	for (let i = 14; i < 18; i++) {
		classArray.push(props.classes[i]);
	}
	classArray.push({ icon: '/images/Role_Disciples_of_the_Hand.png', roleLabel: 'Disciples of the Hand' });
	for (let i = 18; i < 26; i++) {
		classArray.push(props.classes[i]);
	}
	classArray.push({ icon: '/images/Role_Disciples_of_the_Land.png', roleLabel: 'Disciples of the Land' });
	for (let i = 26; i < 29; i++) {
		classArray.push(props.classes[i]);
	}

	classArray[22].UnlockedState.Name = 'Blue Mage';

	classArray.forEach((classJob) => {
		if (classJob.JobID) {
			classJob.icon = '/images/' + classJob.UnlockedState.Name.split(' ').join('_') + '_Icon.png';
		}
	});

	return (
		<div className='grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 grid-flow-col bg-gray-600 w-9/12 w-64 md:w-8/12 xl:w-9/12 p-3 rounded-lg border-2 border-yellow-400 border-solid mx-auto'>
			{classArray.map((job, index) => {
				let col = 1;
				const progress = Math.floor(job.ExpLevel / job.ExpLevelMax * 100) + '%';
				let levelColor = 'text-white';
				let opacity = '';

				if (job.Level === 80) {
					levelColor = 'text-yellow-400';
				}

				if (job.JobID === 36 && job.Level === 70) {
					levelColor = 'text-yellow-400';
				}

				if (index >= 9 && index <= 22) {
					col = 2;
				}
				if (index >= 23) {
					col = 4;
				}

				if (job.Level === 0) {
					opacity = 'opacity-40';
				}

				const colString = 'Col' + col;

				return (
					<div key={job.icon} className={'w-48 mx-auto ' + opacity + ' ' + styles[colString]}>
						{job.JobID ? (
							<div className='flex items-center justify-between mx-4 p-1'>
								<div className='flex items-center'>
									<div className='w-8 h-8 relative mr-2'>
										<Image alt={job.UnlockedState.Name} src={job.icon} layout='fill' />
									</div>
									<label className={'px-1 text-3xl font-medula ' + levelColor}>{job.Level}</label>
								</div>
								<div>
									<label className='font-roboto text-primary-t'>{job.UnlockedState.Name}</label>
									<div className='h-1 relative w-20 mb-1 overflow-hidden'>
										<div className='w-full h-full bg-gray-500' />
										<div className='h-full bg-gray-300' style={{ width: progress }} />
									</div>
								</div>
							</div>
						) : (
							<div>
								<div className='flex items-center pl-1 pt-1'>
									<div className='w-6 h-6 relative'>
										<Image alt={job.roleLabel} src={job.icon} layout='fill' />
									</div>
									<label className='pl-1 font-roboto text-primary-t-fade'>{job.roleLabel}</label>
								</div>
								<hr size='5' width='90%' className='ml-2 text-gray-700' />
								<hr size='5' width='90%' className='ml-2 text-gray-500 pb-1' />
							</div>
						)}
					</div>
				);
			})}
			<div className={'w-11/12 ' + styles.PortraitSection}>
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
