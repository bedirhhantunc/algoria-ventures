import { TeamMember } from '@/types'

const basePath = process.env.NODE_ENV === 'production' ? '/algoria-ventures' : ''

export const teamData: TeamMember[] = [
  {
    id: '1',
    name: 'Buğra Karaman',
    position: 'Portfolio Director',
    bio: 'Portföy şirketlerimizin stratejik gelişimi ve büyüme süreçlerinden sorumlu. Girişimlerin ölçeklenmesinde deneyimli.',
    image: `${basePath}/images/team/bugra-karaman.jpg`,
    linkedin: 'https://bugrakaraman.info/',
    email: 'bugra@algoriaventures.com',
  },
  {
    id: '2',
    name: 'Furkan Bora Murat',
    position: 'Technical Lead & Product Engineer',
    bio: 'Ürün geliştirme ve teknik altyapı konularında uzmanlık. Portföy şirketlerine teknik danışmanlık ve mühendislik desteği sağlıyor.',
    image: `${basePath}/images/team/furkan-bora-murat.jpg`,
    linkedin: 'https://www.linkedin.com/in/furkanboramurat/',
    email: 'furkan@algoriaventures.com',
  },
  {
    id: '3',
    name: 'Özden Ulaşoğlu',
    position: 'Clinical Psychologist',
    bio: 'Klinik psikolog olarak girişimci ekiplerin mental sağlık ve performans optimizasyonunda destek veriyor.',
    image: `${basePath}/images/team/ozden-ulasoglu.jpg`,
    linkedin: 'https://www.ozdenoze.com/',
    email: 'ozden@algoriaventures.com',
  },
]
