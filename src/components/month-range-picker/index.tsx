import React, { useState, useEffect, useRef } from 'react';
import ReactDOM from 'react-dom';
import dayjs from 'dayjs';
import styles from './index.module.css';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import RestoreIcon from '@mui/icons-material/Restore';
import DateRangeIcon from '@mui/icons-material/DateRange';
import { Button } from '@mui/material';

const months = [
    'Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun',
    'Jul', 'Ago', 'Sep', 'Oct', 'Nov', 'Dic'
];

const getYears = (startYear: number, endYear: number) => {
    const years = [];
    for (let year = startYear; year <= endYear; year++) {
        years.push(year);
    }
    return years;
};

interface MonthRangePickerProps {
    value: [Date, Date];
    onChange: (value: [Date, Date]) => void;
}

const MonthRangePicker: React.FC<MonthRangePickerProps> = ({ value, onChange }) => {
    const [twoMonthClick, setTwoMonthClick] = useState([false, false]);
    const currentYear = dayjs().year();
    const currentMonth = dayjs().month();
    const [yearRange, setYearRange] = useState({ start: currentYear - 5, end: currentYear + 6 });
    const years = getYears(yearRange.start, yearRange.end);

    const [startMode, setStartMode] = useState<'year' | 'month'>('year');
    const [endMode, setEndMode] = useState<'year' | 'month'>('year');
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
        setStartDate(newStartDate);
        onChange([newStartDate, endDate]);
        setTwoMonthClick([true, twoMonthClick[1]]);
        if (twoMonthClick[1]) {
            closeDropdown();
        }
    };

    const handleStartYearChange = (year: number) => {
        const newStartDate = new Date(year, startDate.getMonth());
        setStartDate(newStartDate);
        onChange([newStartDate, endDate]);
        setStartMode('month');
    };

    const handleEndMonthChange = (month: number) => {
        const newEndDate = new Date(endDate.getFullYear(), month);
        setEndDate(newEndDate);
        onChange([startDate, newEndDate]);
        setTwoMonthClick([twoMonthClick[0], true]);
        if (twoMonthClick[0]) {
            closeDropdown();
        }
    };

    const handleEndYearChange = (year: number) => {
        const newEndDate = new Date(year, endDate.getMonth());
        setEndDate(newEndDate);
        onChange([startDate, newEndDate]);
        setEndMode('month');
    };

    const isStartDateValid = (year: number, month: number) => {
        return year < endDate.getFullYear() || (year === endDate.getFullYear() && month <= endDate.getMonth());
    };

    const isEndDateValid = (year: number, month: number) => {
        return year > startDate.getFullYear() || (year === startDate.getFullYear() && month >= startDate.getMonth());
    };

    const toggleDropdown = () => {
        setIsDropdownOpen(!isDropdownOpen);
        if (!isDropdownOpen) {
            setTwoMonthClick([false, false]);
        }
    };

    const closeDropdown = () => {
        setIsDropdownOpen(false);
    };

    const handleClickOutside = (event: MouseEvent) => {
        if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
            closeDropdown();
        }
    };

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
    }, [isDropdownOpen]);

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

    const handlePrevious = (mode: 'start' | 'end') => {
        if (mode === 'start') {
            if (startMode === 'month') {
                handleStartYearChange(startDate.getFullYear() - 1);
            } else {
                setYearRange({ start: yearRange.start - 10, end: yearRange.end - 10 });
            }
        } else {
            if (endMode === 'month') {
                handleEndYearChange(endDate.getFullYear() - 1);
            } else {
                setYearRange({ start: yearRange.start - 10, end: yearRange.end - 10 });
            }
        }
    };

    const handleNext = (mode: 'start' | 'end') => {
        if (mode === 'start') {
            if (startMode === 'month') {
                handleStartYearChange(startDate.getFullYear() + 1);
            } else {
                setYearRange({ start: yearRange.start + 10, end: yearRange.end + 10 });
            }
        } else {
            if (endMode === 'month') {
                handleEndYearChange(endDate.getFullYear() + 1);
            } else {
                setYearRange({ start: yearRange.start + 10, end: yearRange.end + 10 });
            }
        }
    };

    const handleReset = () => {
        const newStartDate = new Date(currentYear, currentMonth);
        const newEndDate = new Date(currentYear, currentMonth);
        setStartDate(newStartDate);
        setEndDate(newEndDate);
        onChange([newStartDate, newEndDate]);
        setYearRange({ start: currentYear - 10, end: currentYear + 10 });
        setTwoMonthClick([false, false]);
    };

    const getHeader = () => {
        if (twoMonthClick[0] && twoMonthClick[1]) {
            return `${months[startDate.getMonth()]} ${startDate.getFullYear()} - ${months[endDate.getMonth()]} ${endDate.getFullYear()}`;
        } else if (twoMonthClick[0]) {
            return `${months[startDate.getMonth()]} ${startDate.getFullYear()} -`;
        } else if (twoMonthClick[1]) {
            return `- ${months[endDate.getMonth()]} ${endDate.getFullYear()}`;
        } else if (value[0].getTime() === value[1].getTime()) {
            return `${months[value[0].getMonth()]} ${value[0].getFullYear()} - ${months[value[1].getMonth()]} ${value[1].getFullYear()}`;
        }
        return `${months[value[0].getMonth()]} ${value[0].getFullYear()} - ${months[value[1].getMonth()]} ${value[1].getFullYear()}`;
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
                    <div className={styles.modeToggle}>
                        <button
                            className={`${styles.modeButton} ${startMode === 'month' ? styles.active : ''}`}
                            onClick={() => setStartMode('month')}
                        >
                            Mes Inicio
                        </button>
                        <button
                            className={`${styles.modeButton} ${startMode === 'year' ? styles.active : ''}`}
                            onClick={() => setStartMode('year')}
                        >
                            Año Inicio
                        </button>
                        <button
                            className={`${styles.modeButton} ${endMode === 'month' ? styles.active : ''}`}
                            onClick={() => setEndMode('month')}
                        >
                            Mes Fin
                        </button>
                        <button
                            className={`${styles.modeButton} ${endMode === 'year' ? styles.active : ''}`}
                            onClick={() => setEndMode('year')}
                        >
                            Año Fin
                        </button>
                    </div>
                    <div className={styles.navigation}>
                        <ArrowBackIcon onClick={() => handlePrevious('start')} className={styles.arrowIcon} />
                        <RestoreIcon onClick={handleReset} className={styles.arrowIcon} />
                        <ArrowForwardIcon onClick={() => handleNext('start')} className={styles.arrowIcon} />
                    </div>
                    <div className={styles.navigation}>
                        {startMode === 'month' ? (
                            <>
                                <div className={styles.datePicker}>
                                    <label className={styles.label}>Inicio del mes</label>
                                    <div className={styles.gridContainer}>
                                        {months.map((month, index) => (
                                            <button
                                                key={index}
                                                className={`${styles.gridItem} ${startDate.getMonth() === index ? styles.selected : ''}`}
                                                onClick={() => handleStartMonthChange(index)}
                                                disabled={!isStartDateValid(startDate.getFullYear(), index)}
                                            >
                                                {month}
                                            </button>
                                        ))}
                                    </div>
                                </div>
                            </>
                        ) : (
                            <>
                                <div className={styles.datePicker}>
                                    <label className={styles.label}>Inicio del año</label>
                                    <div className={styles.gridContainer}>
                                        {years.map((year) => (
                                            <button
                                                key={year}
                                                className={`${styles.gridItem} ${startDate.getFullYear() === year ? styles.selected : ''}`}
                                                onClick={() => handleStartYearChange(year)}
                                                disabled={!isStartDateValid(year, startDate.getMonth())}
                                            >
                                                {year}
                                            </button>
                                        ))}
                                    </div>
                                </div>
                            </>
                        )}
                        {endMode === 'month' ? (
                            <>
                                <div className={styles.datePicker}>
                                    <label className={styles.label}>Fin del mes</label>
                                    <div className={styles.gridContainer}>
                                        {months.map((month, index) => (
                                            <button
                                                key={index}
                                                className={`${styles.gridItem} ${endDate.getMonth() === index ? styles.selected : ''}`}
                                                onClick={() => handleEndMonthChange(index)}
                                                disabled={!isEndDateValid(endDate.getFullYear(), index)}
                                            >
                                                {month}
                                            </button>
                                        ))}
                                    </div>
                                </div>
                            </>
                        ) : (
                            <>
                                <div className={styles.datePicker}>
                                    <label className={styles.label}>Fin del año</label>
                                    <div className={styles.gridContainer}>
                                        {years.map((year) => (
                                            <button
                                                key={year}
                                                className={`${styles.gridItem} ${endDate.getFullYear() === year ? styles.selected : ''}`}
                                                onClick={() => handleEndYearChange(year)}
                                                disabled={!isEndDateValid(year, endDate.getMonth())}
                                            >
                                                {year}
                                            </button>
                                        ))}
                                    </div>
                                </div>
                            </>
                        )}
                    </div>
                </div>,
                document.body
            )}
        </div>
    );
};

export default MonthRangePicker;