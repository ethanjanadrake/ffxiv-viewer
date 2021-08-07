import Link from 'next/link';
import { useState } from 'react';
import styles from '../styles/layout.module.css';
import Image from 'next/image';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';

export default function Nav(props) {
	const [
		pullout,
		setPullout
	] = useState(false);

	const [
		advanced,
		setAdvanced
	] = useState(false);

	const [
		serverState,
		setServerState
	] = useState('None');

	const [
		typeFilter,
		setTypeFilter
	] = useState('character');

	const [
		regionState,
		setRegionState
	] = useState('');

	const [
		dataCenterState,
		setDataCenterState
	] = useState('');

	const servers = [
		{
			name        : 'Japan',
			dataCenters : [
				{
					name        : 'Elemental',
					serverNames : [
						'Aegis',
						'Atomos',
						'Carbuncle',
						'Garuda',
						'Gungnir',
						'Kujata',
						'Ramuh',
						'Tonberry',
						'Typhon',
						'Unicorn'
					]
				},
				{
					name        : 'Gaia',
					serverNames : [
						'Alexander',
						'Bahamut',
						'Durandal',
						'Fenrir',
						'Ifrit',
						'Ridill',
						'Tiamat',
						'Ultima',
						'Valefor',
						'Yojimbo',
						'Zeromus'
					]
				},
				{
					name        : 'Mana',
					serverNames : [
						'Anima',
						'Asura',
						'Belias',
						'Chocobo',
						'Hades',
						'Ixion',
						'Mandragora',
						'Masamune',
						'Pandaemonium',
						'Shinryu',
						'Titan'
					]
				}
			]
		},
		{
			name        : 'North America',
			dataCenters : [
				{
					name        : 'Aether',
					serverNames : [
						'Adamantoise',
						'Cactuar',
						'Faerie',
						'Gilgamesh',
						'Jenova',
						'Midgardsormr',
						'Sargatanas',
						'Siren'
					]
				},
				{
					name        : 'Primal',
					serverNames : [
						'Behemoth',
						'Excalibur',
						'Exodus',
						'Famfrit',
						'Hyperion',
						'Lamia',
						'Leviathan',
						'Ultros'
					]
				},
				{
					name        : 'Crystal',
					serverNames : [
						'Balmung',
						'Brynhildr',
						'Coeurl',
						'Diabolos',
						'Goblin',
						'Malboro',
						'Mateus',
						'Zalera'
					]
				}
			]
		},
		{
			name        : 'Europe',
			dataCenters : [
				{
					name        : 'Chaos',
					serverNames : [
						'Cerberus',
						'Louisoix',
						'Moogle',
						'Omega',
						'Ragnarok',
						'Spriggan'
					]
				},
				{
					name        : 'Light',
					serverNames : [
						'Lich',
						'Odin',
						'Phoenix',
						'Shiva',
						'Twintania',
						'Zodiark'
					]
				}
			]
		}
	];

	return (
		<div>
			<div
				className={
					'transition-all font-roboto z-30 fixed w-screen left-0 bg-primary-b text-primary-t ' +
					(advanced ? styles.AdvancedBarLocation : 'top-0') +
					' ' +
					styles.NavHeight
				}
			>
				<div className='grid grid-flow-col mx-3 items-center h-1/2 gap-2'>
					<button
						onClick={() => {
							setTypeFilter('character');
						}}
						className={
							'transition-all rounded-md h-full w-full hover:bg-primary-t hover:text-primary-b ' +
							(typeFilter === 'character'
								? 'bg-primary text-primary-b hover:bg-primary hover:text-primary-b'
								: '')
						}
					>
						Characters
					</button>
					<button
						onClick={() => {
							setTypeFilter('freecompany');
						}}
						className={
							'transition-all rounded-md h-full w-full hover:bg-primary-t hover:text-primary-b ' +
							(typeFilter === 'freecompany'
								? 'bg-primary text-primary-b hover:bg-primary hover:text-primary-b'
								: '')
						}
					>
						Free Companies
					</button>
					<button
						onClick={() => {
							setAdvanced(false);
						}}
						className={'transition-all rounded-md h-full w-full hover:bg-primary-t hover:text-primary-b'}
					>
						X
					</button>
				</div>
				<div className='grid grid-flow-col mx-3 items-center h-1/2 gap-2'>
					{servers.map((region) => {
						return (
							<button
								key={region.name}
								onClick={() => {
									if (regionState === region.name) {
										setRegionState('');
									}
									else {
										setRegionState(region.name);
									}
									setDataCenterState('');
									setServerState('None');
								}}
								className={
									'transition-all rounded-md h-full w-full hover:bg-primary-t hover:text-primary-b ' +
									(regionState === region.name ? 'bg-primary-t text-primary-b' : '')
								}
							>
								{region.name}
							</button>
						);
					})}
				</div>
			</div>

			<div
				className={
					'transition-all font-roboto z-20 fixed w-screen left-0 bg-primary-b text-primary-t ' +
					(!advanced ? 'top-0' : regionState === '' ? styles.AdvancedBarLocation : styles.DCLocation) +
					' ' +
					styles.NavHeight
				}
			>
				<div className='grid grid-flow-col mx-3 items-center h-full gap-2'>
					{servers.map((region) => {
						return region.dataCenters.map((dataCenter) => {
							return (
								<button
									key={dataCenter.name}
									onClick={() => {
										if (dataCenterState === dataCenter.name) {
											setDataCenterState('');
										}
										else {
											setDataCenterState(dataCenter.name);
										}
										setServerState('None');
									}}
									className={
										'transition-all rounded-md h-full w-full hover:bg-primary-t hover:text-primary-b ' +
										(dataCenterState === dataCenter.name ? 'bg-primary-t text-primary-b' : '') +
										(regionState === region.name ? '' : 'hidden')
									}
								>
									{dataCenter.name}
								</button>
							);
						});
					})}
				</div>
			</div>

			<div
				className={
					'transition-all font-roboto z-10 fixed w-screen left-0 bg-primary-b text-primary-t ' +
					(!advanced
						? 'top-0'
						: regionState === ''
							? styles.AdvancedBarLocation
							: dataCenterState === '' ? styles.DCLocation : styles.ServerLocation) +
					' ' +
					styles.NavHeight
				}
			>
				<div className='grid grid-flow-col items-center h-full gap-2'>
					{servers.map((region) => {
						return region.dataCenters.map((dataCenter) => {
							return dataCenter.serverNames.map((serverName) => {
								return (
									<button
										key={serverName}
										onClick={() => {
											if (serverState === serverName) {
												setServerState('None');
											}
											else {
												setServerState(serverName);
											}
										}}
										className={
											'transition-all rounded-md h-full w-full hover:bg-primary-t hover:text-primary-b ' +
											(serverState === serverName
												? 'bg-primary text-primary-b hover:bg-primary-t hover:text-primary-b'
												: '') +
											(dataCenterState === dataCenter.name ? '' : 'hidden')
										}
									>
										{serverName}
									</button>
								);
							});
						});
					})}
				</div>
			</div>

			<nav className={'fixed w-screen z-40 left-0 top-0 bg-primary-b text-primary-t ' + styles.NavbarStyle}>
				<div
					onClick={() => setPullout(!pullout)}
					className={
						'transition-all sm:hidden fixed left-0 w-screen h-screen bg-black bg-opacity-50 ' +
						styles.NavOverlay +
						' ' +
						(pullout ? '' : 'hidden')
					}
				/>

				<div className='h-full relative flex justify-between items-center'>
					<button onClick={() => setPullout(!pullout)} className={'h-full w-16 no-highlight sm:hidden'}>
						<div className='flex flex-col items-center'>
							<div className='bg-white w-5/12 my-1' style={{ height: '2px' }} />
							<div className='bg-white w-5/12 my-1' style={{ height: '2px' }} />
							<div className='bg-white w-5/12 my-1' style={{ height: '2px' }} />
						</div>
					</button>
					<ul
						className={
							'fixed sm:static flex sm:h-full bg-primary-b transition-all ' +
							(pullout ? styles.NavActive : '')
						}
					>
						<Link href='/' as='/'>
							<a
								className={
									'h-12 sm:h-full w-48 sm:w-auto flex items-center transition-all px-4 ' +
									(props.current
										? 'bg-primary-t text-primary-b'
										: 'hover:bg-primary-t hover:text-primary-b')
								}
							>
								<li className='text-2xl font-medium font-medula'>Home</li>
							</a>
						</Link>
						{props.linkList.map((navLink) => {
							return (
								<Link href={navLink.link} key={navLink.label}>
									<a
										className={
											'h-12 sm:h-full w-48 sm:w-auto flex items-center transition-all group ' +
											(navLink.current
												? 'bg-primary-t text-primary-b '
												: 'hover:bg-primary-t hover:text-primary-b ') +
											(navLink.image ? '' : 'px-4 ')
										}
									>
										<li className='text-2xl font-medula font-medium'>
											{navLink.image ? (
												<div className={'flex items-center pr-4 ' + styles.NavImageLabelCouple}>
													<div
														className={
															'transition-all relative mr-4 hidden sm:block border-2 border-solid group-hover:border-primary-t ' +
															styles.NavImage +
															(navLink.current
																? ' border-primary-t'
																: ' border-primary-b')
														}
													>
														<Image alt={navLink.label} src={navLink.image} layout='fill' />
													</div>
													<label className='ml-4 sm:ml-0 cursor-pointer'>
														{navLink.label}
													</label>
												</div>
											) : (
												<div>{navLink.label}</div>
											)}
										</li>
									</a>
								</Link>
							);
						})}
					</ul>
					<form
						action='/search'
						method='get'
						className='h-3/4 m-2 p-2 rounded-full bg-primary-t flex items-center'
					>
						<input
							className='transition-all w-16 hover:w-52 focus:w-52 p-1 text-primary-b leading-tight focus:outline-none'
							id='search'
							type='text'
							placeholder='Search'
							name='s'
							onChange={() => {
								setAdvanced(true);
							}}
						/>
						<input id='page' type='hidden' name='p' value='1' />
						<input id='server' type='hidden' name='server' value={serverState} />
						<input id='typeFilter' type='hidden' name='type' value={typeFilter} />

						<button
							type='submit'
							className='transition-all bg-primary-b rounded-full p-2 text-primary hover:text-secondary hover:bg-secondary-b focus:outline-none flex items-center justify-center'
						>
							<FontAwesomeIcon icon={faSearch} />
						</button>
					</form>
				</div>
			</nav>
		</div>
	);
}
