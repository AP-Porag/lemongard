// import AppLogoIcon from './app-logo-icon';
// import { LogoIcon } from '@/components/public/LemonIcon';
// import { Logo } from '@/components/public/LemonIcon';
// import { LogoText } from '@/components/public/LemonIcon';

// export default function AppLogo() {
//     return (
//         <>
//             <div className="flex aspect-square items-center justify-center">
//                 <LogoIcon className="h-8 w-auto" />
//             </div>
//             <div className="ml-1 grid flex-1 text-left text-sm">
//                 <span className="mb-0.5 truncate leading-tight font-semibold">
//                     <LogoText className="h-8 w-auto" />
//                 </span>
//             </div>
//         </>
//     );
// }

import { LogoIcon, LogoText } from '@/components/public/LemonIcon';

export default function AppLogo() {
    return (
        <div className="flex items-center gap-2">
            <div className="flex items-center justify-center">
                <LogoIcon className="h-8 w-auto object-contain" />
            </div>

            <div className="flex items-center transition-all duration-200 group-data-[state=collapsed]:hidden">
                <LogoText className="h-6 w-auto object-contain" />
            </div>
        </div>
    );
}
