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
  Default: { backgroundColor: tokens.colorNeutralBackground3, color: tokens.colorNeutralForeground1 },
});

export const RequestStatusBadge: React.FC<RequestStatusBadgeProps> = ({ status, children }) => {
  const styles = useStyles();
  let className = styles.Default;
  switch (status) {
    case 'New':
      className = styles.New;
      break;
    case 'Pending':
      className = styles.Pending;
      break;
    case 'Rejected':
      className = styles.Rejected;
      break;
    case 'Approved':
      className = styles.Approved;
      break;
    case 'Scheduled':
      className = styles.Scheduled;
      break;
    case 'Completed':
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
