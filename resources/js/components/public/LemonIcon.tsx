interface LemonIconProps {
    className?: string;
    opacity?: number;
}

/**
 * Lemon Slice - for backgrounds and large decorations
 */
export const LemonSlice = ({
    className = 'w-6 h-6',
    opacity = 1,
}: LemonIconProps) => (
    <svg
        viewBox="0 0 100 100"
        className={className}
        style={{ opacity }}
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden="true"
    >
        {/* Outer rind */}
        <circle
            cx="50"
            cy="50"
            r="45"
            fill="#FCD34D"
            stroke="#FBBF24"
            strokeWidth="2"
        />
        {/* Inner pulp segments */}
        <g fill="#FEF3C7" opacity="0.8">
            <path d="M50 50 L50 10 A40 40 0 0 1 78.28 28.28 Z" />
            <path d="M50 50 L78.28 28.28 A40 40 0 0 1 90 50 Z" />
            <path d="M50 50 L90 50 A40 40 0 0 1 78.28 71.72 Z" />
            <path d="M50 50 L78.28 71.72 A40 40 0 0 1 50 90 Z" />
            <path d="M50 50 L50 90 A40 40 0 0 1 21.72 71.72 Z" />
            <path d="M50 50 L21.72 71.72 A40 40 0 0 1 10 50 Z" />
            <path d="M50 50 L10 50 A40 40 0 0 1 21.72 28.28 Z" />
            <path d="M50 50 L21.72 28.28 A40 40 0 0 1 50 10 Z" />
        </g>
        {/* Segment lines */}
        <g stroke="#FBBF24" strokeWidth="1.5" opacity="0.6">
            <line x1="50" y1="50" x2="50" y2="5" />
            <line x1="50" y1="50" x2="84.85" y2="15.15" />
            <line x1="50" y1="50" x2="95" y2="50" />
            <line x1="50" y1="50" x2="84.85" y2="84.85" />
            <line x1="50" y1="50" x2="50" y2="95" />
            <line x1="50" y1="50" x2="15.15" y2="84.85" />
            <line x1="50" y1="50" x2="5" y2="50" />
            <line x1="50" y1="50" x2="15.15" y2="15.15" />
        </g>
        {/* Center circle */}
        <circle cx="50" cy="50" r="8" fill="#FEF3C7" />
        <circle
            cx="50"
            cy="50"
            r="8"
            fill="none"
            stroke="#FBBF24"
            strokeWidth="1"
        />
        {/* Seeds */}
        <ellipse cx="50" cy="25" rx="2" ry="3" fill="#FBBF24" opacity="0.4" />
        <ellipse cx="70" cy="40" rx="2" ry="3" fill="#FBBF24" opacity="0.4" />
        <ellipse cx="70" cy="60" rx="2" ry="3" fill="#FBBF24" opacity="0.4" />
        <ellipse cx="50" cy="75" rx="2" ry="3" fill="#FBBF24" opacity="0.4" />
        <ellipse cx="30" cy="60" rx="2" ry="3" fill="#FBBF24" opacity="0.4" />
        <ellipse cx="30" cy="40" rx="2" ry="3" fill="#FBBF24" opacity="0.4" />
    </svg>
);

/**
 * Whole Lemon - for logo and medium decorations
 */
export const LemonWhole = ({
    className = 'w-6 h-6',
    opacity = 1,
}: LemonIconProps) => (
    <svg
        viewBox="0 0 100 100"
        className={className}
        style={{ opacity }}
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden="true"
    >
        {/* Main lemon body */}
        <ellipse cx="50" cy="55" rx="30" ry="35" fill="#FCD34D" />
        {/* Highlights */}
        <ellipse cx="40" cy="45" rx="12" ry="15" fill="#FEF9C3" opacity="0.6" />
        <ellipse cx="35" cy="40" rx="6" ry="8" fill="#FFFBEB" opacity="0.8" />
        {/* Stem end (top) */}
        <path
            d="M 50 20 Q 48 25 50 30 Q 52 25 50 20 Z"
            fill="#84CC16"
            opacity="0.8"
        />
        <circle cx="50" cy="20" r="3" fill="#65A30D" />
        {/* Bottom tip */}
        <path d="M 50 90 Q 48 87 50 84 Q 52 87 50 90 Z" fill="#FBBF24" />
        {/* Texture dots */}
        <g fill="#FBBF24" opacity="0.3">
            <circle cx="35" cy="50" r="1.5" />
            <circle cx="42" cy="60" r="1.5" />
            <circle cx="38" cy="65" r="1.5" />
            <circle cx="48" cy="70" r="1.5" />
            <circle cx="55" cy="65" r="1.5" />
            <circle cx="60" cy="55" r="1.5" />
            <circle cx="62" cy="48" r="1.5" />
            <circle cx="58" cy="42" r="1.5" />
            <circle cx="45" cy="38" r="1.5" />
            <circle cx="52" cy="45" r="1.5" />
        </g>
        {/* Outline */}
        <ellipse
            cx="50"
            cy="55"
            rx="30"
            ry="35"
            fill="none"
            stroke="#FBBF24"
            strokeWidth="2"
        />
    </svg>
);

/**
 * Simple Lemon Icon - for small icons and bullets (uses currentColor)
 */
export const LemonSimple = ({
    className = 'w-6 h-6',
    opacity = 1,
}: LemonIconProps) => (
    <svg
        viewBox="0 0 24 24"
        className={className}
        style={{ opacity }}
        fill="currentColor"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden="true"
    >
        <path d="M12 2C10.9 2 10 2.9 10 4C10 4.7 10.4 5.4 11 5.7C11 5.8 11 5.9 11 6C11 8.2 9.2 10 7 10C6.9 10 6.8 10 6.7 10C6.4 9.4 5.7 9 5 9C3.9 9 3 9.9 3 11C3 12.1 3.9 13 5 13C5.7 13 6.4 12.6 6.7 12C6.8 12 6.9 12 7 12C10.3 12 13 9.3 13 6C13 5.9 13 5.8 13 5.7C13.6 5.4 14 4.7 14 4C14 2.9 13.1 2 12 2M12 5C14.4 5 16.6 6.2 17.8 8.2C18.8 7.5 20.1 7.5 21.1 8.2C21.6 8.6 22 9.3 22 10C22 11.1 21.1 12 20 12C19.3 12 18.6 11.6 18.3 11C16.9 13.7 14.1 15.5 11 15.9C11.6 16.6 12 17.5 12 18.5C12 20.4 10.4 22 8.5 22C6.6 22 5 20.4 5 18.5C5 16.6 6.6 15 8.5 15C9 15 9.4 15.1 9.8 15.3C12.6 14.8 15 13.1 16.4 10.7C15.4 9.5 15 7.8 15.3 6.1C14.3 5.4 13.2 5 12 5Z" />
    </svg>
);

/**
 * Lemon Half - for pricing and CTA decorations
 */
export const LemonHalf = ({
    className = 'w-6 h-6',
    opacity = 1,
}: LemonIconProps) => (
    <svg
        viewBox="0 0 100 100"
        className={className}
        style={{ opacity }}
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden="true"
    >
        {/* Outer shape */}
        <path
            d="M 20 50 Q 20 25 35 15 Q 50 5 65 15 Q 80 25 80 50 Q 80 75 65 85 Q 50 95 35 85 Q 20 75 20 50 Z"
            fill="#FCD34D"
            stroke="#FBBF24"
            strokeWidth="2"
        />
        {/* Cut face (flat side) */}
        <rect x="15" y="35" width="70" height="30" fill="#FEF3C7" />
        <rect
            x="15"
            y="35"
            width="70"
            height="30"
            fill="none"
            stroke="#FBBF24"
            strokeWidth="2"
        />
        {/* Pulp segments on cut face */}
        <g fill="#FEF9C3" opacity="0.7">
            <path d="M 50 35 L 50 50 L 65 42.5 Z" />
            <path d="M 50 50 L 65 42.5 L 70 50 Z" />
            <path d="M 50 50 L 70 50 L 65 57.5 Z" />
            <path d="M 50 50 L 65 57.5 L 50 65 Z" />
            <path d="M 50 50 L 50 65 L 35 57.5 Z" />
            <path d="M 50 50 L 35 57.5 L 30 50 Z" />
            <path d="M 50 50 L 30 50 L 35 42.5 Z" />
            <path d="M 50 50 L 35 42.5 L 50 35 Z" />
        </g>
        {/* Segment lines */}
        <g stroke="#FBBF24" strokeWidth="1.5" opacity="0.5">
            <line x1="50" y1="50" x2="50" y2="35" />
            <line x1="50" y1="50" x2="65" y2="42.5" />
            <line x1="50" y1="50" x2="70" y2="50" />
            <line x1="50" y1="50" x2="65" y2="57.5" />
            <line x1="50" y1="50" x2="50" y2="65" />
            <line x1="50" y1="50" x2="35" y2="57.5" />
            <line x1="50" y1="50" x2="30" y2="50" />
            <line x1="50" y1="50" x2="35" y2="42.5" />
        </g>
        {/* Center */}
        <circle cx="50" cy="50" r="5" fill="#FEF3C7" />
        {/* Seeds */}
        <ellipse cx="50" cy="40" rx="1.5" ry="2" fill="#FBBF24" opacity="0.4" />
        <ellipse cx="60" cy="47" rx="1.5" ry="2" fill="#FBBF24" opacity="0.4" />
        <ellipse cx="57" cy="55" rx="1.5" ry="2" fill="#FBBF24" opacity="0.4" />
        <ellipse cx="43" cy="55" rx="1.5" ry="2" fill="#FBBF24" opacity="0.4" />
        <ellipse cx="40" cy="47" rx="1.5" ry="2" fill="#FBBF24" opacity="0.4" />
    </svg>
);

const Logo = ({ className = 'h-8 w-auto' }: { className?: string }) => {
    return (
        <img
            src="/images/logo-rectangle-2.png"
            alt="LemonGard Logo"
            className={className}
        />
    );
};

const LogoWhite = ({ className = 'h-8 w-auto' }: { className?: string }) => {
    return (
        <img
            src="/images/logo-rectangle-3.png"
            alt="LemonGard Logo"
            className={className}
        />
    );
};

/**
 * Default export - LemonWhole for general use
 */
const LemonIcon = LemonWhole;
export default LemonIcon;
export { Logo };
export { LogoWhite };
