import Image from 'next/image';
import Head from 'next/head';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheck, faTimes } from '@fortawesome/free-solid-svg-icons';
import Nav from '../../../components/Nav';

import CompanyHeader from '../../../components/CompanyHeader';

export default function Home({ data }) {
	console.log(data);
	console.log(process.env.navHeight);
	return (
		<div>
			<Head>
				<title>Free Company - {data.FreeCompany.Name}</title>
			</Head>
			<Nav
				linkList={[
					{ link: `./${data.FreeCompany.ID}`, label: `${data.FreeCompany.Tag}`, current: true },
					{ link: `${data.FreeCompany.ID}/members`, label: 'Members', current: false }
				]}
			/>
			<CompanyHeader
				crest={data.FreeCompany.Crest}
				name={data.FreeCompany.Name}
				server={data.FreeCompany.Server}
				dataCenter={data.FreeCompany.DC}
				id={data.FreeCompany.ID}
				href={`../freecompany/${data.FreeCompany.ID}`}
			/>
			{data.FreeCompany.GrandCompany ? <h4 className='text-center'>{data.FreeCompany.GrandCompany}</h4> : <div />}
			<div className='p-5 bg-purple-200 italic rounded-2xl mt-5 max-w-lg mx-auto'>
				<p>{data.FreeCompany.Slogan}</p>
			</div>
			<div className='grid grid-cols-1 md:grid-cols-3 gap-5 p-10 place-items-center max-w-4xl m-auto'>
				{data.FreeCompany.Focus.map((focus) => {
					return (
						<div key={focus.Name} className='flex justify-between w-40'>
							<Image alt='focus icon' width='24' height='16' src={focus.Icon} />
							<label>{focus.Name}</label>
							<div className=''>
								{focus.Status ? (
									<FontAwesomeIcon icon={faCheck} className='text-green-700' />
								) : (
									<FontAwesomeIcon icon={faTimes} className='text-red-700' />
								)}
							</div>
						</div>
					);
				})}
			</div>
			{data.FreeCompany.Recruitment === 'Open' ? (
				<div className='grid grid-cols-3 gap-5 p-10 place-items-center max-w-2xl m-auto'>
					<h4 className='text-center'>Recruitment:</h4>
					<div className='grid col-span-2 grid-cols-2 md:grid-cols-5 gap-5 p-3 place-items-center max-w-2xl m-auto'>
						{data.FreeCompany.Seeking.map((role) => {
							return (
								<div key={role.Name} className='flex justify-center w-40'>
									<Image alt='role icon' width='24' height='16' src={role.Icon} />
									<div className='px-3'>
										{role.Status ? (
											<FontAwesomeIcon icon={faCheck} className='text-green-700' />
										) : (
											<FontAwesomeIcon icon={faTimes} className='text-red-700' />
										)}
									</div>
								</div>
							);
						})}
					</div>
				</div>
			) : (
				<div> {data.FreeCompany.Recruitment}</div>
			)}
		</div>
	);
}

export const getServerSideProps = async (context) => {
	const res = await fetch(`https://xivapi.com/freecompany/${context.params.id}`);
	const data = await res.json();

	switch (data.Error) {
		case true: {
			return {
				notFound : true
			};
		}
		default: {
			return {
				props : {
					data
				}
			};
		}
	}
};
