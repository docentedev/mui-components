import { getAbbr, getColorBackground, getColorText } from './index.utils';
import { Material, Size } from './types';
import styles from './index.module.css';

interface MaterialTypeProps {
    size?: Size;
    material: Material;
    text?: string;
}

export const MaterialType: React.FC<MaterialTypeProps> = ({ size, material, text }) => {
    return (
        <div data-size={size} className={styles.materialType}>
            <i
                className={styles.icon}
                style={{
                    backgroundColor: getColorBackground(material),
                    color: getColorText(material),
                }}
            >
                {getAbbr(material)}
            </i>
            {text}
        </div>
    );
};
