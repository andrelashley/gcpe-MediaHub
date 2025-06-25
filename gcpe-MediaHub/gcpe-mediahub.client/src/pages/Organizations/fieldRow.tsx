import {
  Text,
} from "@fluentui/react-components";

const FieldRow = ({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) => (
  <div
    style={{
      display: "grid",
      gridTemplateColumns: "120px 1fr",
      alignItems: "center",
      gap: "1rem",
      marginBottom: "1rem",
    }}
  >
    <Text size={300} weight="medium">
      {label}
    </Text>
    {children}
  </div>
);

export default FieldRow;