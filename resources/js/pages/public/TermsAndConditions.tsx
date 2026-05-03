import PublicLayout from "@/layouts/PublicLayout"
import TermsHero from "@/components/public/terms-and-conditions/TermsHero"
import TermsContent from "@/components/public/terms-and-conditions/TermsContent"

const TermsAndConditions = () => {
  return (
    <PublicLayout>
       <TermsHero/>
       <TermsContent/>
      </PublicLayout>
  )
}

export default TermsAndConditions