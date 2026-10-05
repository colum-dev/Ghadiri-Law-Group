import UserDescriptionCardSecondary from '@/app/components/user/card/UserDescriptionCardSecondary'
import aboutUsImg from '../../assets/images/home/aboutUs.png'

export default function UserHomeAboutUs({ about }) {
  if (!about) return null
  return <UserDescriptionCardSecondary
    title={about.title || ''}
    descriptions={about.descriptions || []}
    aboutUsImg={about.imageUrl ? { src: about.imageUrl, width: about.imageWidth, height: about.imageHeight } : aboutUsImg}
    imgHeight={about.imageHeight || 350}
    imgAlt={about.imageAlt || ''}
  />
}
