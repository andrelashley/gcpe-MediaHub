import React from 'react';
import PageHeading from './pageHeading';
import { makeStyles } from '@fluentui/react-components';
//import SideNavbar from './sideNavBar';
import LeftNav from './LeftNav';
import Header from './MediaHeader';

const useStyles = makeStyles({
	mainContainer: {
		display: "inline-flex",
		width: "100vw"
	},
	pageContent: {
		marginLeft: "40px",
		marginRight: "40px",
		width: "100%",
	}
}
);

interface LayoutProps {
	title: String;
	selectedNavItem: string;
	children: any;
	headingButton?: any;
}

const Layout: React.FC<LayoutProps> = (props: LayoutProps) => {
	const styles = useStyles();

	return (
		<div>
			<Header />
			<div className={styles.mainContainer} >
				<LeftNav />
				<main className={styles.pageContent} >
					<PageHeading title={props.title} button={props.headingButton} />
					{props.children}
				</main>
			</div>
		</div>
	);
}

export default Layout;