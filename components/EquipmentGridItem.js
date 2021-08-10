import Image from 'next/image';

export default function EquipmentGridItem(props) {
	return (
		<div className={props.item ? 'border-2 border-primary-t rounded-md' : 'border-2 border-opacity-0'}>
			<div className='relative w-10 h-10 group'>
				{props.item ? (
					<div>
						{props.item.Icon ? (
							<Image
								alt={`gear ${props.item.slot} icon`}
								src={`https://xivapi.com${props.item.Icon}`}
								layout='fill'
							/>
						) : (
							<div />
						)}
					</div>
				) : (
					<div />
				)}
			</div>
		</div>
	);
}
