import Image from 'next/image';
import Nav from '../../components/Nav';
import CharacterTitleSection from '../../components/CharacterTitleSection';
import styles from '../../styles/character.module.css';

export default function character({ data }) {
	console.log(data);

	return (
		<div>
			{/* Display the Navbar with Home button as well as portrait and name of character which links to the current page */}
			<Nav
				linkList={[
					{
						link  : `./${data.character.ID}`,
						label : data.character.Name,
						image : data.character.Avatar
					}
				]}
			/>

			{/* Display Name, Title, Server, Free and Grand Companies */}
			<CharacterTitleSection
				title={data.title}
				name={data.character.Name}
				titlePrefix={data.titlePrefix}
				dataCenter={data.character.DC}
				server={data.character.Server}
				freeCompanyId={data.character.FreeCompanyId}
				freeCompanyBanner={data.freeCompanyBanner}
				freeCompanyName={data.character.FreeCompanyName}
				freeCompanyRank={data.freeCompanyRank}
				grandCompanyBanner={data.grandCompanyBanner}
				grandCompany={data.grandCompany}
				grandCompanyRank={data.grandCompanyRank}
			/>

			{/* Full description of character's gender, tribe, race, and current class */}
			<p className='text-center'>
				{data.character.Gender === 1 ? 'Male' : 'Female'} {data.tribe} {data.race}{' '}
				{data.character.ActiveClassJob.UnlockedState.Name}
			</p>

			<div className='grid place-items-center'>
				<div className={'col-start-2 ' + styles.Avatar}>
					<Image alt='player avatar' src={data.character.Portrait} width='640px' height='873px' />
				</div>
				<div className='col-start-1 row-start-1'>Head</div>
				<div className='col-start-1 row-start-2'>Body</div>
				<div className='col-start-1 row-start-3'>Head</div>
				<div className='col-start-1 row-start-4'>Body</div>
				<div className='col-start-1 row-start-5'>Head</div>
				<div className='col-start-1 row-start-6'>Body</div>
				<div className='col-start-1 row-start-7'>Body</div>
				<div className='col-start-3 row-start-1'>Head</div>
				<div className='col-start-3 row-start-2'>Body</div>
				<div className='col-start-3 row-start-3'>Head</div>
				<div className='col-start-3 row-start-4'>Body</div>
				<div className='col-start-3 row-start-5'>Head</div>
				<div className='col-start-3 row-start-6'>Body</div>
				<div className='col-start-3 row-start-7'>Body</div>
			</div>

			<h4>Nameday: {data.character.Nameday}</h4>
			<div className='flex items-center'>
				<div className='w-5 h-5 relative'>
					<Image alt='guardian deity icon' src={`https://xivapi.com${data.deityIcon}`} layout='fill' />
				</div>
				<h4>{data.deity}</h4>
			</div>
			<div>
				{data.character.ClassJobs.map((job) => {
					return (
						<div key={job.JobID}>
							{job.UnlockedState.Name}: {job.Level}
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

	let grandCompanyLocation = '';
	let grandCompanyBanner = null;
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
			const resRace = await fetch(`https://xivapi.com/Race/${dataChar.Character.Race}`);
			const resGuardian = await fetch(`https://xivapi.com/GuardianDeity/${dataChar.Character.GuardianDeity}`);
			const resTribe = await fetch(`https://xivapi.com/Tribe/${dataChar.Character.Tribe}`);
			const resTitle = await fetch(`https://xivapi.com/Title/${dataChar.Character.Title}`);
			const dataRace = await resRace.json();
			const dataGuardian = await resGuardian.json();
			const dataTribe = await resTribe.json();
			const dataTitle = await resTitle.json();
			let dataGC = {};
			let dataGCRank = {};
			let dataFC = {};
			let fcRank = [];

			if (dataChar.Character.GrandCompany) {
				if (dataChar.Character.GrandCompany.NameID === 1) {
					grandCompanyLocation = 'Limsa';
					grandCompanyBanner =
						'https://static.wikia.nocookie.net/ffxiv_gamepedia/images/3/3c/Maelstrom_banner.png/revision/latest/scale-to-width-down/300?cb=20190407185901';
				}
				else if (dataChar.Character.GrandCompany.NameID === 2) {
					grandCompanyLocation = 'Gridania';
					grandCompanyBanner =
						'https://static.wikia.nocookie.net/ffxiv_gamepedia/images/0/00/Order_of_the_Twin_Adder_banner.png/revision/latest/scale-to-width-down/300?cb=20190407190102';
				}
				else {
					grandCompanyLocation = 'Uldah';
					grandCompanyBanner =
						'https://static.wikia.nocookie.net/ffxiv_gamepedia/images/a/ac/Immortal_Flames_banner.png/revision/latest/scale-to-width-down/300?cb=20190407190035';
				}

				const resGC = await fetch(`https://xivapi.com/GrandCompany/${dataChar.Character.GrandCompany.NameID}`);
				dataGC = await resGC.json();
				const resGCRank = await fetch(
					`https://xivapi.com/GCRank${grandCompanyLocation}${charGender}Text/${dataChar.Character.GrandCompany
						.RankID}`
				);
				dataGCRank = await resGCRank.json();
			}
			else {
				dataGC.Name = null;
				dataGCRank.Name = null;
			}

			if (dataChar.Character.FreeCompanyId) {
				const resFC = await fetch(
					`https://xivapi.com/freecompany/${dataChar.Character.FreeCompanyId}?data=FCM`
				);
				dataFC = await resFC.json();
				fcRank = dataFC.FreeCompanyMembers.filter((member) => member.ID === parseInt(context.params.id));
			}
			else {
				dataFC.FreeCompany = {};
				dataFC.FreeCompany.Crest = [];
				fcRank = [
					{ Rank: '', RankIcon: null }
				];
			}

			return {
				props : {
					data : {
						character          : dataChar.Character,
						race               : dataRace.Name,
						deity              : dataGuardian.Name,
						deityIcon          : dataGuardian.Icon,
						tribe              : dataTribe.Name,
						title              : dataTitle.Name,
						titlePrefix        : dataTitle.IsPrefix,
						grandCompany       : dataGC.Name,
						grandCompanyRank   : dataGCRank.Name,
						grandCompanyBanner,
						freeCompanyBanner  : dataFC.FreeCompany.Crest,
						freeCompanyRank    : { name: fcRank[0].Rank, icon: fcRank[0].RankIcon }
					}
				}
			};
	}
}
