import React from 'react';

import Header from './header';
import PageHeading from './pageHeading';


interface LayoutProps {
	title: String;
	children: any;
}

const Layout: React.FC<LayoutProps> = ({ title, children }) => {


	return (
		<div className="app-layout">
			<Header />
			<PageHeading title={title} />
			<main className="app-main">
				{children}
			</main>
		</div>
	);
}

export default Layout;