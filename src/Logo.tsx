import React from 'react';
import { useApp } from './context/AppContext';

interface LogoProps {
    className?: string;
}

export const Logo: React.FC<LogoProps> = ({ className }) => {
    const { theme } = useApp();

    // Прямо указываем пути от корня папки public без лишних импортов
    const getLogoSrc = (): string => {
        switch (theme) {
            case 'dark-blue':
                return '/logo-blue.png';
            case 'dark-green':
                return '/logo-green.png';
            case 'dark-orange':
                return '/logo-orng.png';
            case 'light':
            default:
                return '/logo.png';
        }
    };

    return (
        <img
            src={getLogoSrc()}
            className={className}
            alt="Логотип"
            style={{ transition: 'all 0.25s ease' }}
        />
    );
};

export default Logo;