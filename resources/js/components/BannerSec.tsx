import heroBg from "@/assets/hero-bg.png";
// import { LemonSlice } from "./LemonIcon";

const BannerSec = () =>{
    return(
              /* Botanical Lemon Background */
    <div
      className="absolute inset-0 pointer-events-none"
      style={{
        backgroundImage: `url(${heroBg})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        opacity: 0.12,
      }}
    />


/* Background Lemon Slice Watermark */
          /* Decorative watermarks
        <LemonSlice
            className="absolute top-0 right-0 -mt-20 -mr-20 h-64 w-64"
            opacity={0.05}
        />
        <LemonSlice
            className="absolute bottom-0 left-0 h-48 w-48"
            opacity={0.05}
        /> */
    )
}
export default BannerSec;