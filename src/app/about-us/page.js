import React from 'react'
import UserAboutUs from '../views/aboutUs/UserAboutUs'
import MainUserLayout from '../layouts/admin/user/MainUserLayout'
import { getPublicAbout } from '../utilities/serverApi'
export default async function Page(){ const about=await getPublicAbout(); return <MainUserLayout><UserAboutUs about={about}/></MainUserLayout> }
