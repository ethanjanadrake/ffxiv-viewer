import React from "react";
import Head from "next/head";
import styles from "../styles/layout.module.css";

export default function Layout({ children }) {
	return (
		<div className='relative'>
			<Head>
				<meta name='keywords' content='ffxiv, ff14, gaming' />
				<meta name='charset' content='UTF-8' />
				<meta property='og:title' content='ffxiv-viewer' />
				<meta
					property='og:description'
					content='Final Fantasy XIV API viewer.'
				/>
				<meta property='og:image' content='/images/socialimage.png' />
				<meta name='author' content='Ethan Jana Drake' />
				<link rel='preconnect' href='https://fonts.googleapis.com' />
				<link rel='preconnect' href='https://fonts.gstatic.com' crossOrigin />
				<link
					href='https://fonts.googleapis.com/css2?family=Almendra&family=Medula+One&family=Roboto+Condensed&display=swap'
					rel='stylesheet'
				/>
			</Head>
			<div
				className={
					"absolute left-0 right-0 bg-background-image-small md:bg-background-image bg-fixed lg:bg-cover  " +
					styles.Wrapper
				}
			>
				<main
					className={
						"bg-white bg-opacity-75 max-w-3xl xl:max-w-6xl mx-auto p-5 " +
						styles.MainStyle
					}
				>
					{children}
				</main>
			</div>
		</div>
	);
}
