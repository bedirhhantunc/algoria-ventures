'use client'

import { Timeline } from '@/components/ui/timeline'

export default function HistoryTimeline() {
  const timelineData = [
    {
      title: '2019',
      content: (
        <div className="text-gray-700 dark:text-white/80">
          <p className="text-lg font-semibold mb-2">Algoria Ventures kuruldu</p>
          <p className="text-sm text-gray-600 dark:text-white/60">
            Türkiye ve MENA bölgesinde teknoloji girişimlerine yatırım yapmak üzere faaliyete başladık.
          </p>
        </div>
      ),
    },
    {
      title: '2020',
      content: (
        <div className="text-gray-700 dark:text-white/80">
          <p className="text-lg font-semibold mb-2">İlk 5 portföy şirketi</p>
          <p className="text-sm text-gray-600 dark:text-white/60">
            SaaS, FinTech ve HealthTech alanlarında ilk yatırımlarımızı gerçekleştirdik.
          </p>
        </div>
      ),
    },
    {
      title: '2021',
      content: (
        <div className="text-gray-700 dark:text-white/80">
          <p className="text-lg font-semibold mb-2">İlk exit: DataMind</p>
          <p className="text-sm text-gray-600 dark:text-white/60">
            Portföy şirketimiz DataMind başarılı bir çıkış yaptı ve yatırımcılarımıza değer yarattı.
          </p>
        </div>
      ),
    },
    {
      title: '2022',
      content: (
        <div className="text-gray-700 dark:text-white/80">
          <p className="text-lg font-semibold mb-2">20+ aktif portföy şirketi</p>
          <p className="text-sm text-gray-600 dark:text-white/60">
            Portföyümüzü genişlettik ve yeni sektörlere açıldık. Ekosistemimiz büyüdü.
          </p>
        </div>
      ),
    },
    {
      title: '2023',
      content: (
        <div className="text-gray-700 dark:text-white/80">
          <p className="text-lg font-semibold mb-2">MENA bölgesine genişleme</p>
          <p className="text-sm text-gray-600 dark:text-white/60">
            Orta Doğu ve Kuzey Afrika pazarlarında aktif hale geldik. Bölgesel ofisimizi açtık.
          </p>
        </div>
      ),
    },
    {
      title: '2024',
      content: (
        <div className="text-gray-700 dark:text-white/80">
          <p className="text-lg font-semibold mb-2">Yeni fon: 50M$ hedef</p>
          <p className="text-sm text-gray-600 dark:text-white/60">
            İkinci fonumuz için 50 milyon dolar hedefimizi açıkladık. Büyümeye devam ediyoruz.
          </p>
        </div>
      ),
    },
  ]

  return <Timeline data={timelineData} />
}
