import * as React from 'react';
import { Badge, makeStyles, shorthands, tokens } from '@fluentui/react-components';

export interface RequestStatusBadgeProps {
  status: string;
  children?: React.ReactNode;
}

const useStyles = makeStyles({
  New: { backgroundColor: tokens.colorNeutralBackground5, color: tokens.colorNeutralForeground1 },
  Pending: { backgroundColor: tokens.colorBrandBackground2, color: tokens.colorNeutralForeground1 },
  Rejected: { backgroundColor: tokens.colorPaletteMarigoldBackground2, color: tokens.colorNeutralForeground1 },
  Approved: { backgroundColor: tokens.colorPaletteForestBackground2, color: tokens.colorNeutralForeground1 },
  Scheduled: { backgroundColor: tokens.colorPaletteTealBackground2, color: tokens.colorNeutralForeground1 },
  Completed: { backgroundColor: tokens.colorPaletteAnchorBackground2, color: tokens.colorNeutralForeground1 },
  Default: { backgroundColor: tokens.colorBrandBackgroundHover, color: tokens.colorNeutralForegroundOnBrand },
});

export const RequestStatusBadge: React.FC<RequestStatusBadgeProps> = ({ status, children }) => {
  const styles = useStyles();
  let className = styles.Default;
  switch (status) {
    case 'New1':
      className = styles.New;
      break;
    case 'Pending1':
      className = styles.Pending;
      break;
    case 'Rejected1':
      className = styles.Rejected;
      break;
    case 'Approved1':
      className = styles.Approved;
      break;
    case 'Scheduled1':
      className = styles.Scheduled;
      break;
    case 'Completed1':
      className = styles.Completed;
      break;
    default:
      className = styles.Default;
  }
  return (
    <Badge shape="circular" appearance="filled" className={className}>
      {children || status}
    </Badge>
  );
};

export default RequestStatusBadge;
