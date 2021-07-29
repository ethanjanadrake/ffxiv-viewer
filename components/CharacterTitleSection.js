import CompanyHeader from './CompanyHeader';

export default function CharacterTitleSection(props) {
	const title = props.title;
	const name = props.name;
	const titlePrefix = props.titlePrefix;
	const dataCenter = props.dataCenter;
	const server = props.server;
	const freeCompanyId = props.freeCompanyId;
	const freeCompanyBanner = props.freeCompanyBanner;
	const freeCompanyName = props.freeCompanyName;
	const freeCompanyRank = props.freeCompanyRank;
	const grandCompanyBanner = props.grandCompanyBanner;
	const grandCompany = props.grandCompany;
	const grandCompanyRank = props.grandCompanyRank;

	return (
		<div className='grid grid-cols-1 md:grid-cols-3 place-items-center gap-5 mb-10'>
			<div className='col-start-1 md:col-start-2'>
				<h1 className='text-center mt-7'>
					{titlePrefix ? (
						<div>
							<div className='text-2xl'>{title}</div>
							<div className='font-bold text-4xl'>{name}</div>
						</div>
					) : (
						<div>
							<div className='font-bold text-4xl'>{name}</div>
							<div className='text-2xl'>{title}</div>
						</div>
					)}
				</h1>
				<h4 className='text-center text-lg p-4 text-blue-700 font-bold'>
					&lt;{dataCenter}: {server}&gt;
				</h4>
			</div>
			{freeCompanyId ? (
				<CompanyHeader
					crest={freeCompanyBanner}
					name={freeCompanyName}
					mode='simple'
					id={freeCompanyId}
					rankIcon={freeCompanyRank.icon}
					rank={freeCompanyRank.name}
					href={`../freecompany/${freeCompanyId}`}
				/>
			) : (
				<div />
			)}

			{grandCompany ? (
				<CompanyHeader
					crest={grandCompanyBanner}
					name={grandCompany}
					mode='grand-simple'
					rank={grandCompanyRank}
					href={`../${grandCompany.split(' ').join('')}`}
				/>
			) : (
				<div />
			)}
		</div>
	);
}
