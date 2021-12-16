import Image from 'next/image';
export default function CharacterClassListColumn(props) {
	return (
		<div>
			{props.classArray.map((job) => {
				let progress = ''
				if (job.ExpLevelMax === 0) {
					progress = '0%'
				} else {
					progress = Math.floor(job.ExpLevel / job.ExpLevelMax * 100) + '%';
				}
				let levelColor = 'text-white';
				let opacity = '';
				if (job.Level === 90) {
					levelColor = 'text-yellow-400';
				}

				if (job.JobID === 36 && job.Level === 70) {
					levelColor = 'text-yellow-400';
				}

				if (job.Level === 0) {
					opacity = 'opacity-40';
				}
				return (
					<div key={job.icon} className={'w-11/12 mx-auto col-start-1 ' + opacity}>
						{job.JobID ? (
							<div className='flex items-center ml-2 p-1'>
								<div className='flex items-center'>
									<div className='w-8 h-8 relative mr-2'>
										<Image alt={job.UnlockedState.Name} src={job.icon} layout='fill' />
									</div>
									<label className={'w-4 text-right mr-2 text-3xl font-medula ' + levelColor}>{job.Level}</label>
								</div>
								<div>
									<label className='font-roboto text-primary-t'>{job.UnlockedState.Name}</label>
									<div className='h-1 relative w-24 mb-1 overflow-hidden'>
										<div className='absolute w-full h-full bg-gray-500' />
										<div className='absolute h-full bg-gray-300' style={{ width: progress}} />
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
		</div>
	);
}
