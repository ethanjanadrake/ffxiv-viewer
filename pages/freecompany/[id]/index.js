import Image from 'next/image';
import Head from 'next/head';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheck, faTimes } from '@fortawesome/free-solid-svg-icons';
import Nav from '../../../components/Nav';

import CompanyHeader from '../../../components/CompanyHeader';

export default function Home({ data }) {
	return (
		<div>
			<Head>
				<title>Free Company - {data.FreeCompany.Name}</title>
			</Head>
			<Nav
				linkList={[
					{ link: `/freecompany/${data.FreeCompany.ID}`, label: `${data.FreeCompany.Tag}`, current: true },
					{ link: `/freecompany/${data.FreeCompany.ID}/members`, label: 'Members', current: false }
				]}
			/>
			<CompanyHeader
				crest={data.FreeCompany.Crest}
				name={data.FreeCompany.Name}
				server={data.FreeCompany.Server}
				dataCenter={data.FreeCompany.DC}
				id={data.FreeCompany.ID}
				href={`/../freecompany/${data.FreeCompany.ID}`}
			/>
			{data.FreeCompany.GrandCompany ? (
				<h4 className='text-center font-medula text-xl font-bold text-primary-dark'>
					The {data.FreeCompany.GrandCompany}
				</h4>
			) : (
				<div />
			)}
			<div className='p-5 bg-secondary-b bg-opacity-70 italic rounded-2xl mt-5 max-w-lg mx-auto'>
				<p>{data.FreeCompany.Slogan}</p>
			</div>
			<div className='grid grid-cols-1 sm:grid-cols-3 gap-5 p-5 place-items-center w-64 sm:w-auto sm:max-w-2xl bg-primary-b rounded-lg border-2 border-primary border-solid my-10 mx-auto'>
				{data.FreeCompany.Focus.map((focus) => {
					return (
						<div key={focus.Name} className='flex justify-between w-40'>
							<Image alt='focus icon' width='24' height='16' src={focus.Icon} />
							<label className='text-primary-t font-roboto'>{focus.Name}</label>
							<div className=''>
								{focus.Status ? (
									<FontAwesomeIcon icon={faCheck} className='text-green-500' />
								) : (
									<FontAwesomeIcon icon={faTimes} className='text-red-500' />
								)}
							</div>
						</div>
					);
				})}
			</div>
			{data.FreeCompany.Recruitment === 'Open' ? (
				<div>
					<h4 className='text-center font-roboto font-bold'>Recruitment</h4>
					<div className='grid grid-rows-3 grid-flow-col sm:grid-rows-1 sm:grid-flow-row sm:grid-cols-5 gap-1 p-3 w-48 sm:w-auto place-items-center max-w-md m-auto bg-primary-b rounded-lg border-2 border-primary border-solid mt-2'>
						{data.FreeCompany.Seeking.map((role) => {
							return (
								<div key={role.Name} className='flex justify-center w-20 my-1'>
									<Image alt='role icon' width='24' height='16' src={role.Icon} />
									<div className='px-2'>
										{role.Status ? (
											<FontAwesomeIcon icon={faCheck} className='text-green-500' />
										) : (
											<FontAwesomeIcon icon={faTimes} className='text-red-500' />
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
	const res = await fetch(
		`https://xivapi.com/freecompany/${context.params
			.id}?private_key=76c22de8f16d417895cb6832dfa2928f36c49486b6634ea081d5c5e308c00dc1`
	);
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
