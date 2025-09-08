export type Partner = {
  name: string
  url: string
  logo?: string
  icon?: string // optional small icon from iOS web set
  textOnly?: boolean
}

export const partners: Partner[] = [
  { name: 'Hetzner', url: 'https://www.hetzner.com/', textOnly: true, icon: '/assets/icons/web (iOS Icon)/8.png' },
  { name: 'Oracle Cloud', url: 'https://www.oracle.com/cloud/', textOnly: true, icon: '/assets/icons/web (iOS Icon)/14.png' },
  { name: 'OpenAI', url: 'https://openai.com/', textOnly: true, icon: '/assets/icons/web (iOS Icon)/20.png' },
  { name: 'Cloudflare', url: 'https://www.cloudflare.com/', textOnly: true, icon: '/assets/icons/web (iOS Icon)/6.png' },
  { name: 'GitLab', url: 'https://about.gitlab.com/', textOnly: true, icon: '/assets/icons/web (iOS Icon)/22.png' },
  { name: 'GitHub', url: 'https://github.com/', textOnly: true, icon: '/assets/icons/web (iOS Icon)/12.png' },
]
