'use client'

import { Mail, MapPin, Linkedin, Twitter, Upload, Send } from 'lucide-react'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { useTranslations } from 'next-intl'
import * as z from 'zod'

const pitchFormSchema = z.object({
  companyName: z.string().min(2, 'Şirket adı en az 2 karakter olmalı'),
  founderName: z.string().min(2, 'İsim en az 2 karakter olmalı'),
  email: z.string().email('Geçerli bir email adresi giriniz'),
  phone: z.string().min(10, 'Geçerli bir telefon numarası giriniz'),
  sector: z.string().min(1, 'Lütfen bir sektör seçiniz'),
  description: z.string().min(50, 'Açıklama en az 50 karakter olmalı'),
})

type PitchFormData = z.infer<typeof pitchFormSchema>

export default function ContactPage() {
  const t = useTranslations('contact')
  const tSubmit = useTranslations('submit')
  const tCommon = useTranslations('common')

  const [contactData, setContactData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  })

  const [file, setFile] = useState<File | null>(null)
  const [isPitchSubmitting, setIsPitchSubmitting] = useState(false)

  const {
    register,
    handleSubmit: handlePitchSubmit,
    formState: { errors },
    reset,
  } = useForm<PitchFormData>({
    resolver: zodResolver(pitchFormSchema),
  })

  const handleContactSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    console.log('Contact form submitted:', contactData)
    alert('Mesajınız gönderildi! En kısa sürede size dönüş yapacağız.')
  }

  const handleContactChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setContactData({
      ...contactData,
      [e.target.name]: e.target.value,
    })
  }

  const onPitchSubmit = async () => {
    setIsPitchSubmitting(true)
    try {
      await new Promise((resolve) => setTimeout(resolve, 2000))
      alert('Başvurunuz alındı! Ekibimiz en kısa sürede size dönüş yapacaktır.')
      reset()
      setFile(null)
    } catch (error) {
      console.error('Form submission error:', error)
      alert('Bir hata oluştu. Lütfen tekrar deneyiniz.')
    } finally {
      setIsPitchSubmitting(false)
    }
  }

  return (
    <div>
      {/* Hero */}
      <section className="section-padding text-gray-900 dark:text-white bg-transparent">
        <div className="container-custom text-center">
          <h1 className="mb-6">{t('title')}</h1>
          <p className="text-xl md:text-2xl max-w-3xl mx-auto text-gray-600 dark:text-white/90">
            {t('subtitle')}
          </p>
        </div>
      </section>

      {/* Projeni Gönder */}
      <section id="pitch" className="section-padding scroll-mt-20 bg-transparent">
        <div className="container-custom">
          <div className="max-w-3xl mx-auto mb-16">
            <div className="text-center mb-8">
              <h2 className="mb-4 text-gray-900 dark:text-white">{tSubmit('title')}</h2>
              <p className="text-xl text-gray-600 dark:text-white/70">{tSubmit('subtitle')}</p>
            </div>

            <form onSubmit={handlePitchSubmit(onPitchSubmit)} className="card">
              <div className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="companyName" className="block text-sm font-medium mb-2 text-gray-900 dark:text-white">
                      {tSubmit('companyName')} *
                    </label>
                    <input
                      {...register('companyName')}
                      type="text"
                      id="companyName"
                      className="w-full px-4 py-3 bg-white dark:bg-white/10 border border-gray-300 dark:border-white/20 text-gray-900 dark:text-white rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                    />
                    {errors.companyName && (
                      <p className="text-red-500 text-sm mt-1">{errors.companyName.message}</p>
                    )}
                  </div>

                  <div>
                    <label htmlFor="founderName" className="block text-sm font-medium mb-2 text-gray-900 dark:text-white">
                      {tSubmit('founderName')} *
                    </label>
                    <input
                      {...register('founderName')}
                      type="text"
                      id="founderName"
                      className="w-full px-4 py-3 bg-white dark:bg-white/10 border border-gray-300 dark:border-white/20 text-gray-900 dark:text-white rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                    />
                    {errors.founderName && (
                      <p className="text-red-500 text-sm mt-1">{errors.founderName.message}</p>
                    )}
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium mb-2 text-gray-900 dark:text-white">
                      {tSubmit('email')} *
                    </label>
                    <input
                      {...register('email')}
                      type="email"
                      id="email"
                      className="w-full px-4 py-3 bg-white dark:bg-white/10 border border-gray-300 dark:border-white/20 text-gray-900 dark:text-white rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                    />
                    {errors.email && (
                      <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>
                    )}
                  </div>

                  <div>
                    <label htmlFor="phone" className="block text-sm font-medium mb-2 text-gray-900 dark:text-white">
                      {tSubmit('phone')} *
                    </label>
                    <input
                      {...register('phone')}
                      type="tel"
                      id="phone"
                      className="w-full px-4 py-3 bg-white dark:bg-white/10 border border-gray-300 dark:border-white/20 text-gray-900 dark:text-white rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                    />
                    {errors.phone && (
                      <p className="text-red-500 text-sm mt-1">{errors.phone.message}</p>
                    )}
                  </div>
                </div>

                <div>
                  <label htmlFor="sector" className="block text-sm font-medium mb-2 text-gray-900 dark:text-white">
                    {tSubmit('sector')} *
                  </label>
                  <select
                    {...register('sector')}
                    id="sector"
                    className="w-full px-4 py-3 bg-white dark:bg-white/10 border border-gray-300 dark:border-white/20 text-gray-900 dark:text-white rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                  >
                    <option value="">Seçiniz</option>
                    <option value="SaaS">SaaS</option>
                    <option value="FinTech">FinTech</option>
                    <option value="HealthTech">HealthTech</option>
                    <option value="E-Commerce">E-Commerce</option>
                    <option value="AI & ML">AI & ML</option>
                    <option value="EdTech">EdTech</option>
                  </select>
                  {errors.sector && (
                    <p className="text-red-500 text-sm mt-1">{errors.sector.message}</p>
                  )}
                </div>

                <div>
                  <label htmlFor="description" className="block text-sm font-medium mb-2 text-gray-900 dark:text-white">
                    {tSubmit('description')} *
                  </label>
                  <textarea
                    {...register('description')}
                    id="description"
                    rows={4}
                    className="w-full px-4 py-3 bg-white dark:bg-white/10 border border-gray-300 dark:border-white/20 text-gray-900 dark:text-white rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent placeholder:text-gray-500 dark:placeholder:text-white/60"
                    placeholder="Şirketinizi tek cümle ile tanıtın"
                  />
                  {errors.description && (
                    <p className="text-red-500 text-sm mt-1">{errors.description.message}</p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2 text-gray-900 dark:text-white">
                    {tSubmit('pitchDeck')}
                  </label>
                  <div className="border-2 border-dashed border-gray-300 dark:border-white/30 rounded-lg p-6 text-center hover:border-gray-500 dark:hover:border-primary transition-colors bg-gray-50 dark:bg-transparent">
                    <input
                      type="file"
                      id="pitchFile"
                      accept=".pdf"
                      onChange={(e) => setFile(e.target.files?.[0] || null)}
                      className="hidden"
                    />
                    <label htmlFor="pitchFile" className="cursor-pointer">
                      <Upload className="w-10 h-10 text-gray-400 dark:text-gray-400 mx-auto mb-3" />
                      <p className="text-gray-600 dark:text-white/70 text-sm">
                        {file ? file.name : 'PDF dosyanızı yükleyin (Max 10MB)'}
                      </p>
                    </label>
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={isPitchSubmitting}
                  className="w-full btn-primary inline-flex items-center justify-center gap-2"
                >
                  {isPitchSubmitting ? (
                    <>
                      <span className="animate-spin">⏳</span>
                      Gönderiliyor...
                    </>
                  ) : (
                    <>
                      <Send className="w-5 h-5" />
                      {tSubmit('submit')}
                    </>
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      </section>

      {/* İletişim Bilgileri */}
      <section className="section-padding bg-transparent dark:bg-secondary/10">
        <div className="container-custom">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <div>
              <h2 className="mb-8 text-gray-900 dark:text-white">{t('info')}</h2>

              <div className="space-y-6">
                <div className="card">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-gray-700/20 dark:bg-accent/20 rounded-lg flex items-center justify-center flex-shrink-0 border border-gray-700/40 dark:border-accent/30">
                      <Mail className="w-6 h-6 text-gray-700 dark:text-accent" />
                    </div>
                    <div>
                      <h3 className="font-bold mb-2 text-gray-900 dark:text-white">E-posta</h3>
                      <p className="text-gray-600 dark:text-white/70">info@algoriaventures.com</p>
                      <p className="text-gray-600 dark:text-white/70">
                        investments@algoriaventures.com
                      </p>
                    </div>
                  </div>
                </div>

                <div className="card">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-gray-700/20 dark:bg-accent/20 rounded-lg flex items-center justify-center flex-shrink-0 border border-gray-700/40 dark:border-accent/30">
                      <MapPin className="w-6 h-6 text-gray-700 dark:text-accent" />
                    </div>
                    <div>
                      <h3 className="font-bold mb-2 text-gray-900 dark:text-white">Adres</h3>
                      <p className="text-gray-600 dark:text-white/70">
                        Maslak Mahallesi, Büyükdere Caddesi
                        <br />
                        No: 255, Nurol Plaza B Blok Kat: 12
                        <br />
                        34398 Sarıyer, İstanbul, Türkiye
                      </p>
                    </div>
                  </div>
                </div>

                <div className="card">
                  <h3 className="font-bold mb-4 text-gray-900 dark:text-white">Sosyal Medya</h3>
                  <div className="flex gap-4">
                    <a
                      href="https://linkedin.com/company/algoriaventures"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-12 h-12 bg-gray-700/20 dark:bg-accent/20 rounded-lg flex items-center justify-center hover:bg-gray-700/30 dark:hover:bg-primary/20 transition-colors border border-gray-700/40 dark:border-accent/30"
                    >
                      <Linkedin className="w-6 h-6 text-gray-700 dark:text-accent" />
                    </a>
                    <a
                      href="https://twitter.com/algoriaventures"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-12 h-12 bg-gray-700/20 dark:bg-accent/20 rounded-lg flex items-center justify-center hover:bg-gray-700/30 dark:hover:bg-primary/20 transition-colors border border-gray-700/40 dark:border-accent/30"
                    >
                      <Twitter className="w-6 h-6 text-gray-700 dark:text-accent" />
                    </a>
                  </div>
                </div>
              </div>
            </div>

            <div>
              <h2 className="mb-8 text-gray-900 dark:text-white">{t('form')}</h2>
              <form onSubmit={handleContactSubmit} className="space-y-6">
                <div>
                  <label
                    htmlFor="contactName"
                    className="block text-sm font-medium mb-2 text-gray-900 dark:text-white"
                  >
                    {tCommon('name')}
                  </label>
                  <input
                    type="text"
                    id="contactName"
                    name="name"
                    value={contactData.name}
                    onChange={handleContactChange}
                    required
                    className="w-full px-4 py-3 bg-white dark:bg-white/10 border border-gray-300 dark:border-white/20 text-gray-900 dark:text-white rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                  />
                </div>

                <div>
                  <label
                    htmlFor="contactEmail"
                    className="block text-sm font-medium mb-2 text-gray-900 dark:text-white"
                  >
                    E-posta
                  </label>
                  <input
                    type="email"
                    id="contactEmail"
                    name="email"
                    value={contactData.email}
                    onChange={handleContactChange}
                    required
                    className="w-full px-4 py-3 bg-white dark:bg-white/10 border border-gray-300 dark:border-white/20 text-gray-900 dark:text-white rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                  />
                </div>

                <div>
                  <label
                    htmlFor="subject"
                    className="block text-sm font-medium mb-2 text-gray-900 dark:text-white"
                  >
                    Konu
                  </label>
                  <input
                    type="text"
                    id="subject"
                    name="subject"
                    value={contactData.subject}
                    onChange={handleContactChange}
                    required
                    className="w-full px-4 py-3 bg-white dark:bg-white/10 border border-gray-300 dark:border-white/20 text-gray-900 dark:text-white rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                  />
                </div>

                <div>
                  <label
                    htmlFor="message"
                    className="block text-sm font-medium mb-2 text-gray-900 dark:text-white"
                  >
                    {tCommon('message')}
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    value={contactData.message}
                    onChange={handleContactChange}
                    required
                    rows={6}
                    className="w-full px-4 py-3 bg-white dark:bg-white/10 border border-gray-300 dark:border-white/20 text-gray-900 dark:text-white rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                  />
                </div>

                <button type="submit" className="btn-primary w-full">
                  {tCommon('send')}
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
