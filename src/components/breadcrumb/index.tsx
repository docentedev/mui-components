import { Breadcrumbs, Link } from "@mui/material"

interface BreadcrumbItem {
    label: string;
    link?: string;
    icon?: React.ReactNode;
}

interface BreadcrumbProps {
    path: BreadcrumbItem[];
}

const Breadcrumb: React.FC<BreadcrumbProps> = ({ path }) => {
    return(
        <div>
            <Breadcrumbs>
                {path.map((item, index) => (
                    <Link
                        key={index}
                        href={item.link || '#'}
                    >
                        {item.label}
                    </Link>
                ))}
            </Breadcrumbs>
        </div>
    );
};

export default Breadcrumb;