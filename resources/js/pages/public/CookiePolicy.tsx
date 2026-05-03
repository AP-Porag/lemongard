
import PublicLayout from "@/layouts/PublicLayout"
import CookiePolicyHero from "@/components/public/cookie-policy/CookiePolicyHero"
import CookiePolicyContent from "@/components/public/cookie-policy/CookiePolicyContent"
const CookiePolicy = () => {
  return (
     <PublicLayout>
       <CookiePolicyHero/>
       <CookiePolicyContent/>
      </PublicLayout>
  )
}

export default CookiePolicy