import React from 'react';
import PageHeading from './pageHeading';


interface LayoutProps {
	title: String;
	children: any;
}

const Layout: React.FC<LayoutProps> = ({ title, children }) => {


	return (
		<div className="app-layout">
			<PageHeading title={title} />
			<main className="app-main">
				{children}
			</main>
		</div>
	);
}

export default Layout;