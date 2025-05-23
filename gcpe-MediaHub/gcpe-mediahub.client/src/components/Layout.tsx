import React from 'react';
import PageHeading from './PageHeading';
import { makeStyles } from '@fluentui/react-components';
import Header from './Header';
import SideNavbar from './SideNavBar';

const useStyles = makeStyles({
	mainContainer: {
		display: "inline-flex",
	},
	pageContent: {
		marginLeft: "40px",
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
				<SideNavbar selectedValue={props.selectedNavItem} />
				<main className={styles.pageContent} >
					<PageHeading title={props.title} button={props.headingButton} />
					{props.children}
				</main>
			</div>
		</div>
	);
}

export default Layout;