import UserDescriptionCardSecondary from '@/app/components/user/card/UserDescriptionCardSecondary'
import aboutUsImg from '../../assets/images/home/aboutUs.png'

export default function UserHomeAboutUs() {
  return (
    <UserDescriptionCardSecondary title='این یک تایتل نمونه است'
      descriptions={[{ id: 1, description: 'سلام ای دسته گل یاسمن ' }]}
      aboutUsImg={aboutUsImg}
      imgHeight={350}
      imgAlt='about us'
    />
  )
}
