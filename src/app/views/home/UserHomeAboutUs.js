import UserDescriptionCardSecondary from '@/app/components/user/card/UserDescriptionCardSecondary'
import aboutUsImg from '../../assets/images/home/aboutUs.png'

export default function UserHomeAboutUs({ about }) {
  const data = about || {
    title: 'این یک تایتل نمونه است',
    descriptions: [{ id: 1, description: 'سلام ای دسته گل یاسمن' }],
    imageUrl: null,
    imageAlt: 'about us',
  }

  return (
    <UserDescriptionCardSecondary
      title={data.title}
      descriptions={data.descriptions}
      aboutUsImg={data.imageUrl ? { src: data.imageUrl, width: data.imageWidth, height: data.imageHeight } : aboutUsImg}
      imgHeight={data.imageHeight || 350}
      imgAlt={data.imageAlt || 'about us'}
    />
  )
}
