import React, { useState, useEffect, useRef, useCallback } from 'react';
import ReactDOM from 'react-dom';
import dayjs from 'dayjs';
import styles from './index.module.css';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import RestoreIcon from '@mui/icons-material/Restore';
import DateRangeIcon from '@mui/icons-material/DateRange';
import { Button, IconButton, Stack, Tooltip } from '@mui/material';

interface I18N {
    month: string;
    year: string;
    previous: string;
    next: string;
    close: string;
    toCurrent: string;
    months: string[];
    startMonth: string;
    endMonth: string;
    startYear: string;
    endYear: string;
}

const initialStateI18n = {
    startMonth: 'Inicio del mes',
    endMonth: 'Fin del mes',
    startYear: 'Inicio del año',
    endYear: 'Fin del año',
    month: 'Mes',
    year: 'Año',
    previous: 'Anterior',
    next: 'Siguiente',
    close: 'Cerrar',
    toCurrent: 'Hasta la fecha actual',
    months: [
        'Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun',
        'Jul', 'Ago', 'Sep', 'Oct', 'Nov', 'Dic'
    ],
};

const getYears = (startYear: number, endYear: number) => {
    const years = [];
    for (let year = startYear; year <= endYear; year++) {
        years.push(year);
    }
    return years;
}
interface MonthRangePickerProps {
    value: [Date, Date];
    onChange: (value: [Date, Date]) => void;
    i18n?: Partial<I18N>;
}

const MonthRangePicker: React.FC<MonthRangePickerProps> = ({ value, onChange, i18n }) => {
    const lang = i18n ? { ...initialStateI18n, ...i18n } : initialStateI18n;
    const [twoMonthClick, setTwoMonthClick] = useState([false, false]);
    const currentYear = dayjs().year();
    const currentMonth = dayjs().month();
    const [yearRange, setYearRange] = useState({ start: currentYear - 5, end: currentYear + 6 });
    const years = getYears(yearRange.start, yearRange.end);

    const [mode, setMode] = useState<'year' | 'month'>('year');
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const dropdownRef = useRef<HTMLDivElement>(null);
    const buttonRef = useRef<HTMLButtonElement>(null);

    const [startDate, setStartDate] = useState(value[0]);
    const [endDate, setEndDate] = useState(value[1]);

    useEffect(() => {
        setStartDate(value[0]);
        setEndDate(value[1]);
    }, [value]);

    const handleStartMonthChange = (month: number) => {
        const newStartDate = new Date(startDate.getFullYear(), month);
        // fix start no puede ser mayor que end, si es asi se cambiar start a maximum end
        if (newStartDate.getTime() > endDate.getTime()) {
            newStartDate.setFullYear(endDate.getFullYear());
            newStartDate.setMonth(endDate.getMonth());
        }

        setStartDate(newStartDate);
        onChange([newStartDate, endDate]);
        setTwoMonthClick([true, twoMonthClick[1]]);
        setMode('year');
        if (twoMonthClick[1]) {
            closeDropdown();
        }
    };

    const handleStartYearChange = (year: number) => {
        const newStartDate = new Date(year, startDate.getMonth());
        if (newStartDate.getTime() > endDate.getTime()) {
            newStartDate.setFullYear(endDate.getFullYear());
            newStartDate.setMonth(endDate.getMonth());
        }
        setStartDate(newStartDate);
        onChange([newStartDate, endDate]);
        setMode('month');
    };

    const handleEndMonthChange = (month: number) => {
        const newEndDate = new Date(endDate.getFullYear(), month);
        // fix end no puede ser menor que start, si es asi se cambiar end a minimum start
        if (newEndDate.getTime() < startDate.getTime()) {
            newEndDate.setFullYear(startDate.getFullYear());
            newEndDate.setMonth(startDate.getMonth());
        }
        setEndDate(newEndDate);
        onChange([startDate, newEndDate]);
        setTwoMonthClick([twoMonthClick[0], true]);
        setMode('year');
        if (twoMonthClick[0]) {
            closeDropdown();
        }
    };

    const handleEndYearChange = (year: number) => {
        const newEndDate = new Date(year, endDate.getMonth());
        if (newEndDate.getTime() < startDate.getTime()) {
            newEndDate.setFullYear(startDate.getFullYear());
            newEndDate.setMonth(startDate.getMonth());
        }
        setEndDate(newEndDate);
        onChange([startDate, newEndDate]);
        setMode('month');
    };

    const isStartDateValid = useCallback((year: number, month: number) => {
        return year <= endDate.getFullYear() || (year === endDate.getFullYear() && month <= endDate.getMonth());
    }, [endDate]);

    const isEndDateValid = useCallback((year: number, month: number) => {
        return year >= startDate.getFullYear() || (year === startDate.getFullYear() && month >= startDate.getMonth());
    }, [startDate]);

    const toggleDropdown = () => {
        setIsDropdownOpen(!isDropdownOpen);
        if (!isDropdownOpen) {
            setTwoMonthClick([false, false]);
        }
    };

    const handleReset = useCallback(() => {
        const newStartDate = new Date(currentYear, currentMonth);
        const newEndDate = new Date(currentYear, currentMonth);
        setStartDate(newStartDate);
        setEndDate(newEndDate);
        onChange([newStartDate, newEndDate]);
        setYearRange({ start: currentYear - 5, end: currentYear + 6 });
        setTwoMonthClick([false, false]);
    }, [currentYear, currentMonth, onChange]);

    const closeDropdown = useCallback(() => {
        setIsDropdownOpen(false);
        setTwoMonthClick([false, false]);
        setMode('year');
        // si alguna de las fechas es invalid se resetea
        if (!isStartDateValid(startDate.getFullYear(), startDate.getMonth()) || !isEndDateValid(endDate.getFullYear(), endDate.getMonth())) {
            handleReset();
        }
    }, [isStartDateValid, startDate, isEndDateValid, endDate, handleReset]);

    const handleClickOutside = useCallback((event: MouseEvent) => {
        if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
            closeDropdown();
        }
    }, [closeDropdown]);

    useEffect(() => {
        if (isDropdownOpen) {
            window.addEventListener('scroll', closeDropdown);
            window.addEventListener('resize', closeDropdown);
            document.addEventListener('mousedown', handleClickOutside);
        } else {
            window.removeEventListener('scroll', closeDropdown);
            window.removeEventListener('resize', closeDropdown);
            document.removeEventListener('mousedown', handleClickOutside);
        }

        return () => {
            window.removeEventListener('scroll', closeDropdown);
            window.removeEventListener('resize', closeDropdown);
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [isDropdownOpen, closeDropdown, handleClickOutside]);

    // calcular si sera left o right dependiendo del espacio disponible
    const getStyles = () => {
        if (!buttonRef.current) return {};
        const buttonRect = buttonRef.current.getBoundingClientRect();
        const isButtonRight = buttonRect.left + window.scrollX > window.innerWidth / 2;
        if (isButtonRight) {
            return {
                top: buttonRect.bottom + window.scrollY + 15,
                right: window.innerWidth - buttonRect.right - window.scrollX
            };
        }
        return {
            top: buttonRect.bottom + window.scrollY + 15,
            left: buttonRect.left + window.scrollX,
        };
    };

    const handlePrevious = () => {
        // solo cambiar el rango que se muestra, modo mes se mueve 1 año, modo año se mueve 10 años
        setYearRange({ start: yearRange.start - 5, end: yearRange.end - 5 });
    };

    const handleNext = () => {
        setYearRange({ start: yearRange.start + 5, end: yearRange.end + 5 });
    };

    const getHeader = () => {
        if (twoMonthClick[0] && twoMonthClick[1]) {
            return `${lang.months[startDate.getMonth()]} ${startDate.getFullYear()} - ${lang.months[endDate.getMonth()]} ${endDate.getFullYear()}`;
        } else if (twoMonthClick[0]) {
            return `${lang.months[startDate.getMonth()]} ${startDate.getFullYear()} -`;
        } else if (twoMonthClick[1]) {
            return `- ${lang.months[endDate.getMonth()]} ${endDate.getFullYear()}`;
        } else if (value[0].getTime() === value[1].getTime()) {
            return `${lang.months[value[0].getMonth()]} ${value[0].getFullYear()} - ${lang.months[value[1].getMonth()]} ${value[1].getFullYear()}`;
        }
        return `${lang.months[value[0].getMonth()]} ${value[0].getFullYear()} - ${lang.months[value[1].getMonth()]} ${value[1].getFullYear()}`;
    };

    const isYearInRange = (year: number) => year >= startDate.getFullYear() && year <= endDate.getFullYear();

    const isMonthInRange = (year: number, month: number) => {
        if (year === startDate.getFullYear() && year === endDate.getFullYear()) {
            return month >= startDate.getMonth() && month <= endDate.getMonth();
        }
        if (year === startDate.getFullYear()) {
            return month >= startDate.getMonth();
        }
        if (year === endDate.getFullYear()) {
            return month <= endDate.getMonth();
        }
        return true;
    };

    return (
        <div className={styles.container}>
            <Button
                variant="contained"
                ref={buttonRef}
                onClick={toggleDropdown}
                className={styles.toggleButton}
                startIcon={<DateRangeIcon />}
            >
                {getHeader()}
            </Button>
            {isDropdownOpen && ReactDOM.createPortal(
                <div className={styles.dropdown} ref={dropdownRef} style={getStyles()}>
                    <Stack direction="row" spacing={1} justifyContent="space-between" alignItems="center">
                        <Stack direction="row" spacing={1}>
                            <Button
                                variant={mode === 'month' ? 'contained' : 'outlined'}
                                onClick={() => setMode('month')}
                                size="small">
                                {lang.month}
                            </Button>
                            <Button
                                variant={mode === 'year' ? 'contained' : 'outlined'}
                                onClick={() => setMode('year')}
                                size="small">
                                {lang.year}
                            </Button>
                        </Stack>
                        <Stack direction="row">
                            <Tooltip title={lang.previous}>
                                <IconButton onClick={handlePrevious} size="small" disabled={mode === 'month'}>
                                    <ArrowBackIcon />
                                </IconButton>
                            </Tooltip>
                            <Tooltip title={lang.toCurrent}>
                                <IconButton onClick={handleReset} size="small">
                                    <RestoreIcon />
                                </IconButton>
                            </Tooltip>
                            <Tooltip title={lang.next}>
                                <IconButton onClick={handleNext} size="small" disabled={mode === 'month'}>
                                    <ArrowForwardIcon />
                                </IconButton>
                            </Tooltip>
                        </Stack>
                    </Stack>
                    <div className={styles.navigation}>
                        {mode === 'month' ? (
                            <div className={styles.datePicker}>
                                <label className={styles.label}>
                                    {lang.startMonth}
                                </label>
                                <div className={styles.gridContainer}>
                                    {lang.months.map((month, index) => (
                                        <button
                                            key={index}
                                            className={`${styles.gridItem} ${startDate.getMonth() === index ? styles.selected : ''}`}
                                            onClick={() => handleStartMonthChange(index)}
                                            data-range={isMonthInRange(startDate.getFullYear(), index) ? 'in-range' : ''}
                                        >
                                            {month}
                                        </button>
                                    ))}
                                </div>
                            </div>
                        ) : (
                            <div className={styles.datePicker}>
                                <label className={styles.label}>
                                    {lang.startYear}
                                </label>
                                <div className={styles.gridContainer}>
                                    {years.map((year) => (
                                        <button
                                            key={year}
                                            className={`${styles.gridItem} ${startDate.getFullYear() === year ? styles.selected : ''}`}
                                            onClick={() => handleStartYearChange(year)}
                                            data-range={isYearInRange(year) ? 'in-range' : ''}
                                        >
                                            {year}
                                        </button>
                                    ))}
                                </div>
                            </div>
                        )}
                        {mode === 'month' ? (
                            <div className={styles.datePicker}>
                                <label className={styles.label}>
                                    {lang.endMonth}
                                </label>
                                <div className={styles.gridContainer}>
                                    {lang.months.map((month, index) => (
                                        <button
                                            key={index}
                                            className={`${styles.gridItem} ${endDate.getMonth() === index ? styles.selected : ''}`}
                                            onClick={() => handleEndMonthChange(index)}
                                            data-range={isMonthInRange(endDate.getFullYear(), index) ? 'in-range' : ''}
                                        >
                                            {month}
                                        </button>
                                    ))}
                                </div>
                            </div>
                        ) : (
                            <div className={styles.datePicker}>
                                <label className={styles.label}>
                                    {lang.endYear}
                                </label>
                                <div className={styles.gridContainer}>
                                    {years.map((year) => (
                                        <button
                                            key={year}
                                            className={`${styles.gridItem} ${endDate.getFullYear() === year ? styles.selected : ''}`}
                                            onClick={() => handleEndYearChange(year)}
                                            data-range={isYearInRange(year) ? 'in-range' : ''}
                                        >
                                            {year}
                                        </button>
                                    ))}
                                </div>
                            </div>
                        )}
                    </div>
                </div>,
                document.body
            )}
        </div>
    );
};

export default MonthRangePicker;