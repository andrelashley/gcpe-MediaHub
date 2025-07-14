import * as React from 'react';
import { Badge, makeStyles, shorthands, tokens, Caption2 } from '@fluentui/react-components';

export interface RequestStatusBadgeProps {
  status: string;
  children?: React.ReactNode;
}

const useStyles = makeStyles({
  InProgress: { backgroundColor: tokens.colorPaletteMarigoldBackground2, color: tokens.colorNeutralForeground1 },
  PendingApproval: { backgroundColor: tokens.colorPaletteRedBackground2, color: tokens.colorNeutralForeground1 },
  Approved: { backgroundColor: tokens.colorPaletteForestBackground2, color: tokens.colorNeutralForeground1 },
  Closed: { backgroundColor: tokens.colorPaletteAnchorBackground2, color: tokens.colorNeutralForeground1 },
  Default: { backgroundColor: tokens.colorBrandBackgroundHover, color: tokens.colorNeutralForegroundOnBrand },
});

export const RequestStatusBadge: React.FC<RequestStatusBadgeProps> = ({ status, children }) => {
  const styles = useStyles();
  let className = styles.Default;
  switch (status) {
    case 'In Progress':
      className = styles.InProgress;
      break;
    case 'Pending Approval':
      className = styles.PendingApproval;
      break;   
    case 'Approved':
      className = styles.Approved;
      break;
      break;
    case 'Closed':
      className = styles.Closed;
      break;
    default:
      className = styles.Default;
  }
  return (
    <Badge shape="circular" appearance="filled" className={className}>
      {children || <Caption2>{status}</Caption2>}
    </Badge>
  );
};

export default RequestStatusBadge;
