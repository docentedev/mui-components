import React from 'react';
import styles from './index.module.css';
import { useTheme } from '@mui/material';
import { addExtraVoidData } from './index.utils';
import Token from '../../tokens';

export interface Column<T> {
    id?: string;
    label: string | React.ReactNode;
    labelClassName?: string;
    className?: string;
    align?: 'left' | 'center' | 'right';
    render?: (row: T) => React.ReactNode;
    renderIf?: () => boolean;
    sortable?: boolean;
}

interface TableProps<T> {
    columns: Column<T>[];
    rows?: T[] | null;
    loading?: boolean;
    onRowClick?: (row: T) => void;
    sortField?: string;
    sortDirection?: 'ASC' | 'DESC';
    onSort?: (field: string, direction: 'ASC' | 'DESC') => void;
    marginTop?: number;
    emptyData?: boolean;
    size?: 'small' | 'medium' | 'large';
    card?: (item: T, className: string) => React.ReactNode;
    rowStyle?: (row: T) => React.CSSProperties;
    headerNoWrap?: boolean;
    messageVoidData?: string;
}

const IconUp = '↑';
const IconDown = '↓';

// Only native html table

const Header = <T,>({ columns, sortField, sortDirection, onSort, headerNoWrap }: {
    columns: Column<T>[],
    sortField?: string,
    sortDirection?: 'ASC' | 'DESC',
    onSort?: (field: string, direction: 'ASC' | 'DESC') => void,
    headerNoWrap?: boolean,
}) => {
    return (
        <thead>
            <tr>
                {columns.filter(e => {
                    if (e.renderIf) {
                        return e.renderIf();
                    }
                    return true;
                }).map((column, index) => (
                    <th
                        style={{
                            backgroundColor: Token.Color.PrimaryMain,
                            color: Token.Color.Dark,
                            textAlign: column.align,
                            whiteSpace: headerNoWrap ? 'nowrap' : 'normal',
                        }}
                        className={column.labelClassName}
                        data-sortable={column.sortable}
                        key={index}
                        onClick={column.id !== undefined ?
                            () => column.sortable && onSort && onSort(column.id || '', sortField === column.id ? (sortDirection === 'ASC' ? 'DESC' : 'ASC') : 'ASC')
                            : undefined}
                    >{column.label} {column.id && (column.id === sortField && (sortDirection === 'ASC' ? IconUp : IconDown))}</th>
                ))}
            </tr>
        </thead>
    );
}

// role.name
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const accessObject = (obj: any, path: string) => {
    try {
        return path.split('.').reduce((acc, key) => acc[key], obj);
    } catch (e: unknown) {
        console.error(e);
        return '';
    }
}

// if object is empty, return empty cell {}
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const isEmptyObject = (obj: any) => {
    return Object.keys(obj).length === 0;
}

const Body = <T,>({ columns, data, onRowClick, rowStyle }: {
    columns: Column<T>[],
    data: T[], onRowClick?: (row: T) => void, rowStyle?: (row: T) => React.CSSProperties
}) => {
    return (
        <tbody>
            {data.map((row: T, index) => {
                return (
                    <tr key={index} onClick={() => onRowClick && onRowClick(row)} style={{
                        cursor: onRowClick ? 'pointer' : 'default',
                        ...rowStyle ? rowStyle(row) : {},
                    }}>
                        {columns.filter(e => {
                            if (e.renderIf) {
                                return e.renderIf();
                            }
                            return true;
                        }).map((column: Column<T>, index) => {
                            const key = column.id;
                            const value = key && !isEmptyObject(row) ? accessObject(row, key) : '';
                            // if row is empty, return empty cell
                            if (Object.keys(Object(row)).length === 0) {
                                return <td key={index} style={{ textAlign: column.align }} className={column.className}>
                                    {index === 0 ? '-' : ''}
                                </td>;
                            }
                            return (
                                <td key={index} style={{ textAlign: column.align }} className={column.className}>
                                    {column.render ? column.render(row) : <>{value}</>}
                                </td>
                            );
                        })}
                    </tr>
                );
            })}
        </tbody>
    );
}

const LoadingSkeleton = () => {
    return (
        <div className={styles.loading}>
            <div className={styles.loader} />
        </div>
    );
}

const Table = <T,>({
    columns,
    rows: d,
    loading,
    onRowClick,
    sortField,
    sortDirection,
    onSort,
    marginTop,
    emptyData,
    size,
    card,
    rowStyle,
    headerNoWrap,
    messageVoidData,
}: TableProps<T>) => {
    const data = emptyData ? addExtraVoidData<T>(d || [] as T[]) : d;
    const theme = useTheme();
    return (
        <>
            <div className={styles.container} data-responsive={!!card} data-theme={theme.palette.mode} style={{ marginTop }} data-disabled-empty-data={emptyData}>
                <table className={styles.table} data-theme={theme.palette.mode} data-size={size}>
                    <Header columns={columns} sortField={sortField} sortDirection={sortDirection} onSort={onSort} headerNoWrap={headerNoWrap} />
                    {Array.isArray(data) && <Body columns={columns} data={data} onRowClick={onRowClick} rowStyle={rowStyle} />}
                    {(Array.isArray(data) && data.length === 0) && <tbody>
                        <tr>
                            <td colSpan={columns.length} className={styles.emptyData}>
                                <div>
                                    {messageVoidData}
                                </div>
                            </td>
                        </tr>
                    </tbody>}
                </table>
                {!!loading && <LoadingSkeleton />}
            </div>
            {card && Array.isArray(data) && data.map((item) => card(item, styles.card))}
        </>
    );
}

export default Table;
