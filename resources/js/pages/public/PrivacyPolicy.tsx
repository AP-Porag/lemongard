import PublicLayout from '@/layouts/PublicLayout';
import PrivacyPolicyHero from "@/components/public/privacy-policy/PrivacyPolicyHero";
import PrivacyPolicyContent from "@/components/public/privacy-policy/PrivacyPolicyContent";

const PrivacyPolicy = () => {
  return (
      <PublicLayout>
       <PrivacyPolicyHero/>
       <PrivacyPolicyContent/>
      </PublicLayout>
  )
}

export default PrivacyPolicy