import Image from 'next/image';
import Link from 'next/link';
import { gearSlots } from '../data/data';
import EquipmentGridItem from './EquipmentGridItem';
import { useState } from 'react';

export default function EquipmentGrid(props) {
	const [
		hoverItem,
		setHoverItem
	] = useState(null);

	const gear = [];

	gearSlots.forEach((slot, index) => {
		gear[index] = { slot, gearPiece: props.gear[slot] };
	});

	return (
		<div className='bg-primary-b border-2 border-primary rounded-lg max-w-3xl mx-auto p-10'>
			<div className='flex flex-col sm:flex-row justify-center mb-5'>
				<div
					className='relative sm:order-2 border-2 border-primary-t sm:m-5 rounded-2xl w-full sm:w-96'
					style={{ height: '70vh' }}
				>
					<Image
						alt='player avatar'
						src={props.portrait}
						layout='fill'
						objectFit='cover'
						className='rounded-2xl'
					/>
				</div>

				<div className='flex items-end sm:items-center justify-center mt-4'>
					<div className='flex flex-col justify-center'>
						{gear.map((item, index) => {
							if (index <= 6) {
								return (
									<div
										key={index}
										onClick={() => {
											if (item.gearPiece && hoverItem === item.gearPiece) {
												setHoverItem(null);
											}
											else if (item.gearPiece) {
												setHoverItem(item.gearPiece);
											}
										}}
										className='m-1'
									>
										<EquipmentGridItem item={item.gearPiece} key={index} />
									</div>
								);
							}
						})}
					</div>

					<div className='flex flex-col justify-center sm:order-3'>
						{gear.map((item, index) => {
							if (index > 6) {
								return (
									<div
										key={index}
										onClick={() => {
											if (item.gearPiece && hoverItem === item.gearPiece) {
												setHoverItem(null);
											}
											else if (item.gearPiece) {
												setHoverItem(item.gearPiece);
											}
										}}
										className='m-1'
									>
										<EquipmentGridItem item={item.gearPiece} key={index} />
									</div>
								);
							}
						})}
					</div>
				</div>
			</div>
			{hoverItem ? (
				<Link href={`https://ffxiv.gamerescape.com/wiki/${hoverItem.Name.split(' ').join('_')}`}>
					<a className='transition-all max-w-sm mx-auto text-secondary-t bg-secondary-b border-2 border-secondary-b hover:text-secondary hover:bg-primary hover:border-secondary cursor-pointer p-3 rounded-xl text-center flex flex-col'>
						<label className='font-bold cursor-pointer'>{hoverItem.Name}</label>
						<label className='cursor-pointer'>Item Level: {hoverItem.LevelItem}</label>
						<label className='cursor-pointer'>{hoverItem.ClassJobCategory.Name}</label>
						<label className='text-xs cursor-pointer'>{hoverItem.Description}</label>
						<p className='text-xs cursor-pointer font-bold'>Link to External Site</p>
					</a>
				</Link>
			) : (
				<div />
			)}
		</div>
	);
}
