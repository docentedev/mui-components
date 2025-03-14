import { Breadcrumbs, Button, Link, Stack } from '@mui/material';

interface BreadcrumbItem {
  label: string;
  link?: string;
  icon?: React.ReactNode;
}

interface BreadcrumbProps {
  path: BreadcrumbItem[];
  buttonLabel?: string;
  onButtonClick?: () => void;
}

const Breadcrumb: React.FC<BreadcrumbProps> = ({
  path,
  buttonLabel,
  onButtonClick,
}) => {
  return (
    <Stack sx={{ flexDirection: "row" }}>
      <Breadcrumbs>
        {path.map((item, index) => (
          <Link
            key={index}
            href={item.link || "#"}
            sx={{ display: "flex", alignItems: "center" }}
          >
            {item.icon && <span>{item.icon}</span>}
            {item.label}
          </Link>
        ))}
      </Breadcrumbs>

      {buttonLabel && onButtonClick && (
        <Button variant="contained" onClick={onButtonClick} sx={{ ml: 2 }}>
          {buttonLabel}
        </Button>
      )}
    </Stack>
  );
};

export default Breadcrumb;
