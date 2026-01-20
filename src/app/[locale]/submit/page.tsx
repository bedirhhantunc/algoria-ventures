'use client'

import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { useTranslations } from 'next-intl'
import * as z from 'zod'
import { Upload, Send, CheckCircle } from 'lucide-react'

const formSchema = z.object({
  companyName: z.string().min(2, 'Şirket adı en az 2 karakter olmalı'),
  website: z.string().url('Geçerli bir URL giriniz').optional().or(z.literal('')),
  founderName: z.string().min(2, 'İsim en az 2 karakter olmalı'),
  email: z.string().email('Geçerli bir email adresi giriniz'),
  phone: z.string().min(10, 'Geçerli bir telefon numarası giriniz'),
  sector: z.string().min(1, 'Lütfen bir sektör seçiniz'),
  stage: z.string().min(1, 'Lütfen bir aşama seçiniz'),
  description: z.string().min(50, 'Açıklama en az 50 karakter olmalı'),
})

type FormData = z.infer<typeof formSchema>

export default function SubmitPage() {
  const t = useTranslations('submit')
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)
  const [file, setFile] = useState<File | null>(null)

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<FormData>({
    resolver: zodResolver(formSchema),
  })

  const onSubmit = async (data: FormData) => {
    setIsSubmitting(true)

    try {
      const formData = new FormData()
      formData.append('access_key', 'YOUR_WEB3FORMS_ACCESS_KEY')
      formData.append('subject', `Yeni Pitch: ${data.companyName}`)

      Object.entries(data).forEach(([key, value]) => {
        formData.append(key, value as string)
      })

      if (file) {
        formData.append('attachment', file)
      }

      await new Promise((resolve) => setTimeout(resolve, 2000))

      setIsSuccess(true)
      reset()
      setFile(null)
    } catch (error) {
      console.error('Form submission error:', error)
      alert('Bir hata oluştu. Lütfen tekrar deneyiniz.')
    } finally {
      setIsSubmitting(false)
    }
  }

  if (isSuccess) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-secondary/10">
        <div className="container-custom">
          <div className="max-w-2xl mx-auto text-center card">
            <div className="w-20 h-20 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-6">
              <CheckCircle className="w-12 h-12 text-primary" />
            </div>
            <h1 className="text-3xl font-bold mb-4">{t('success')}</h1>
            <p className="text-white/70 text-lg mb-8">
              {t('successMessage')}
            </p>
            <p className="text-white/60 mb-8">
              Genellikle 1-2 hafta içinde geri dönüş yapıyoruz. Bu süre zarfında
              herhangi bir güncelleme olursa sizinle iletişime geçeceğiz.
            </p>
            <button
              onClick={() => setIsSuccess(false)}
              className="btn-primary"
            >
              Yeni Başvuru Yap
            </button>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div>
      <section className="section-padding bg-gradient-to-br from-primary to-primary-light text-white">
        <div className="container-custom text-center">
          <h1 className="mb-6">{t('title')}</h1>
          <p className="text-xl md:text-2xl max-w-3xl mx-auto text-white/90">
            {t('subtitle')}
          </p>
        </div>
      </section>

      <section className="section-padding">
        <div className="container-custom">
          <div className="max-w-3xl mx-auto">
            <div className="card mb-8">
              <h2 className="text-2xl font-bold mb-4">Başvuru Öncesi Bilgiler</h2>
              <div className="space-y-3 text-white/70">
                <p>✓ Başvuru süreci tamamen ücretsizdir</p>
                <p>✓ Tüm bilgileriniz gizli tutulur ve sadece investment team tarafından görülür</p>
                <p>✓ İlk değerlendirme 1-2 hafta içinde tamamlanır</p>
                <p>✓ Uygun görülen başvurular için ilk görüşme ayarlanır</p>
              </div>
            </div>

            <form onSubmit={handleSubmit(onSubmit)} className="card">
              <div className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="companyName" className="block text-sm font-medium mb-2">
                      {t('companyName')} *
                    </label>
                    <input
                      {...register('companyName')}
                      type="text"
                      id="companyName"
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                      placeholder="Örn: TechStartup Inc."
                    />
                    {errors.companyName && (
                      <p className="text-red-500 text-sm mt-1">{errors.companyName.message}</p>
                    )}
                  </div>

                  <div>
                    <label htmlFor="website" className="block text-sm font-medium mb-2">
                      {t('website')}
                    </label>
                    <input
                      {...register('website')}
                      type="url"
                      id="website"
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                      placeholder="https://example.com"
                    />
                    {errors.website && (
                      <p className="text-red-500 text-sm mt-1">{errors.website.message}</p>
                    )}
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div>
                    <label htmlFor="founderName" className="block text-sm font-medium mb-2">
                      {t('founderName')} *
                    </label>
                    <input
                      {...register('founderName')}
                      type="text"
                      id="founderName"
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                      placeholder="Ahmet Yılmaz"
                    />
                    {errors.founderName && (
                      <p className="text-red-500 text-sm mt-1">{errors.founderName.message}</p>
                    )}
                  </div>

                  <div>
                    <label htmlFor="email" className="block text-sm font-medium mb-2">
                      {t('email')} *
                    </label>
                    <input
                      {...register('email')}
                      type="email"
                      id="email"
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                      placeholder="ahmet@example.com"
                    />
                    {errors.email && (
                      <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>
                    )}
                  </div>

                  <div>
                    <label htmlFor="phone" className="block text-sm font-medium mb-2">
                      {t('phone')} *
                    </label>
                    <input
                      {...register('phone')}
                      type="tel"
                      id="phone"
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                      placeholder="+90 555 123 4567"
                    />
                    {errors.phone && (
                      <p className="text-red-500 text-sm mt-1">{errors.phone.message}</p>
                    )}
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="sector" className="block text-sm font-medium mb-2">
                      {t('sector')} *
                    </label>
                    <select
                      {...register('sector')}
                      id="sector"
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                    >
                      <option value="">Seçiniz</option>
                      <option value="SaaS">SaaS</option>
                      <option value="FinTech">FinTech</option>
                      <option value="HealthTech">HealthTech</option>
                      <option value="E-Commerce">E-Commerce</option>
                      <option value="AI & ML">AI & ML</option>
                      <option value="EdTech">EdTech</option>
                      <option value="Other">Diğer</option>
                    </select>
                    {errors.sector && (
                      <p className="text-red-500 text-sm mt-1">{errors.sector.message}</p>
                    )}
                  </div>

                  <div>
                    <label htmlFor="stage" className="block text-sm font-medium mb-2">
                      {t('stage')} *
                    </label>
                    <select
                      {...register('stage')}
                      id="stage"
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                    >
                      <option value="">Seçiniz</option>
                      <option value="Idea">Fikir Aşaması</option>
                      <option value="Pre-Seed">Pre-Seed</option>
                      <option value="Seed">Seed</option>
                      <option value="Pre-Series A">Pre-Series A</option>
                      <option value="Series A">Series A</option>
                    </select>
                    {errors.stage && (
                      <p className="text-red-500 text-sm mt-1">{errors.stage.message}</p>
                    )}
                  </div>
                </div>

                <div>
                  <label htmlFor="description" className="block text-sm font-medium mb-2">
                    {t('description')} *
                  </label>
                  <textarea
                    {...register('description')}
                    id="description"
                    rows={4}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                    placeholder="Örn: B2B SaaS platformumuz ile şirketlerin iş akışı süreçlerini otomatize ediyor ve verimliliği %40 artırıyoruz."
                  />
                  {errors.description && (
                    <p className="text-red-500 text-sm mt-1">{errors.description.message}</p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">
                    {t('pitchDeck')}
                  </label>
                  <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center hover:border-primary transition-colors">
                    <input
                      type="file"
                      id="file"
                      accept=".pdf"
                      onChange={(e) => setFile(e.target.files?.[0] || null)}
                      className="hidden"
                    />
                    <label htmlFor="file" className="cursor-pointer">
                      <Upload className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                      <p className="text-white/70 mb-2">
                        {file ? file.name : 'PDF dosyanızı yükleyin'}
                      </p>
                      <p className="text-sm text-white/60">
                        veya buraya tıklayarak seçin (Max 10MB)
                      </p>
                    </label>
                  </div>
                </div>

                <div className="bg-secondary/10 p-4 rounded-lg text-sm text-white/70">
                  <p className="font-medium mb-2">🔒 Gizlilik Politikası:</p>
                  <p>
                    Tüm başvuru bilgileriniz gizli tutulur ve sadece yatırım
                    ekibimiz tarafından görülür. Bilgileriniz üçüncü şahıslarla
                    paylaşılmaz.
                  </p>
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full btn-primary inline-flex items-center justify-center gap-2"
                >
                  {isSubmitting ? (
                    <>
                      <span className="animate-spin">⏳</span>
                      Gönderiliyor...
                    </>
                  ) : (
                    <>
                      <Send className="w-5 h-5" />
                      {t('submit')}
                    </>
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      </section>
    </div>
  )
}
