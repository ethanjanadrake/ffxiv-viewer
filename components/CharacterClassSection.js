import Image from 'next/image';

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

	console.log(classArray);

	return (
		<div className='grid grid-cols-3 grid-flow-col bg-gray-600 w-9/12 max-w-4xl p-3 rounded-lg border-2 border-yellow-400 border-solid mx-auto'>
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

				return (
					<div key={job.icon} style={{ gridColumnStart: col }} className={'w-48 ' + opacity}>
						{job.JobID ? (
							<div className='flex items-center p-1 relative'>
								<div className='w-8 h-8 relative'>
									<Image alt={job.UnlockedState.Name} src={job.icon} layout='fill' />
								</div>
								<label className={'px-1 text-3xl font-medula ' + levelColor}>{job.Level}</label>
								<div className='absolute top-1 left-16'>
									<label className='font-roboto text-white'>{job.UnlockedState.Name}</label>
									<div className='h-1 relative w-20 overflow-hidden'>
										<div className='w-full h-full bg-gray-500 absolute' />
										<div className='h-full bg-gray-300 absolute' style={{ width: progress }} />
									</div>
								</div>
							</div>
						) : (
							<div>
								<div className='flex items-center pl-1 pt-1'>
									<div className='w-6 h-6 relative'>
										<Image alt={job.roleLabel} src={job.icon} layout='fill' />
									</div>
									<label className='pl-1 font-roboto text-gray-300'>{job.roleLabel}</label>
								</div>
								<hr size='5' width='90%' className='ml-2 text-gray-700' />
								<hr size='5' width='90%' className='ml-2 text-gray-500 pb-1' />
							</div>
						)}
					</div>
				);
			})}
			<div className='w-11/12' style={{ gridColumnStart: '3', gridRow: '1 / 15' }}>
				<p className='text-center font-medula text-xl text-gray-300'>
					{props.tribe} {props.race}
				</p>
				<p className='text-center font-medula text-2xl text-yellow-300'>{props.currentClass}</p>
				<div
					className='relative mx-auto my-2 border-2 border-gray-400 rounded-lg'
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
				<p className='text-center font-medula text-sm text-gray-300'>Nameday: {props.nameday}</p>
				<div className='flex items-center justify-center py-2'>
					<div className='w-5 h-5 relative mr-2'>
						<Image alt='guardian deity icon' src={`https://xivapi.com${props.deityIcon}`} layout='fill' />
					</div>
					<p className='text-center font-medula text-xl text-gray-300'>{props.deity}</p>
					<div className='w-5 h-5 relative ml-2'>
						<Image alt='guardian deity icon' src={`https://xivapi.com${props.deityIcon}`} layout='fill' />
					</div>
				</div>
			</div>
		</div>
	);
}
