export type Locale = 'en' | 'th';

export const LOCALES: Locale[] = ['en', 'th'];

export function isLocale(value: string | undefined): value is Locale {
  return value === 'en' || value === 'th';
}

export function normalizeLocale(value: string | undefined): Locale {
  return isLocale(value) ? value : 'en';
}

export function localizedPath(locale: Locale, path: string): string {
  if (!path || path === '/') return `/${locale}`;
  if (/^https?:\/\//.test(path)) return path;
  const normalized = path.startsWith('/') ? path : `/${path}`;
  return `/${locale}${normalized}`.replace(/\/+/g, '/');
}

export function switchLocalePath(pathname: string, targetLocale: Locale): string {
  const segments = pathname.split('/').filter(Boolean);
  if (segments[0] === 'en' || segments[0] === 'th') {
    segments[0] = targetLocale;
    return `/${segments.join('/')}`;
  }
  if (segments.length === 0) return `/${targetLocale}`;
  return `/${targetLocale}/${segments.join('/')}`;
}

export const translations = {
  en: {
    shell: {
      portalHome: 'Portal Home',
      docsIndex: 'Docs Index',
      notebooklm: 'NotebookLM',
      portal: 'Portal',
      onThisPage: 'On this page',
      minRead: 'min read',
      launchReadyPortal: 'Launch-ready portal',
      freshBuild: 'Fresh build',
      openDocsIndex: 'Open docs index',
      openResearchHub: 'Open research hub',
      openSection: 'Open section →',
      reviewContext: 'Review the context →',
      openInWiki: 'Open in the wiki →',
    },
    home: {
      curatedLaunchTracks: 'Curated launch tracks',
      homeHeading: 'A brand portal first, but still a real wiki underneath',
      homeBlurb: 'Move through product, brand, research, and campaign work without losing deep document access.',
      visualWorld: 'Visual world',
      visualHeading: 'Use the actual brand surfaces, not just generic documentation cards',
      knowledgeMap: 'Knowledge map',
      knowledgeHeading: 'Browse the wiki by track',
      notebooklmSpotlight: 'NotebookLM spotlight',
      notebooklmHeading: 'Research and learning artifacts stay close to the story',
    },
    categories: {
      general: 'Portal & Research',
      product: 'Product',
      brand: 'Brand System',
      audience: 'Audience',
      marketing: 'Campaign',
    },
    featureCardLabels: {
      '/docs/product/overview': { title: 'Product Overview', eyebrow: 'Product', description: 'Hero product definition, positioning, and messaging stack for the current launch build.' },
      '/docs/brand/visual-guidelines': { title: 'Visual Guidelines', eyebrow: 'Brand System', description: 'Palette, typography, art direction, and brand-system guardrails for the current run.' },
      '/docs/marketing/campaign-copy': { title: 'Campaign Copy', eyebrow: 'Campaign', description: 'Campaign narratives, key copy assets, and launch-ready messaging organized for review.' },
      '/docs/research/notebooklm-artifacts': { title: 'NotebookLM Artifacts', eyebrow: 'Research', description: 'Surfaced reports, infographics, decks, audio, and research tables produced during Wave 7.' },
    },
    docTitles: {
      'index': 'Launch Dossier Index',
      'getting-started/quickstart': 'Quickstart',
      'product/overview': 'Product Overview',
      'product/features': 'Product Features',
      'product/specifications': 'Product Specifications',
      'brand/voice-tone': 'Voice & Tone',
      'brand/visual-guidelines': 'Visual Guidelines',
      'brand/visual-assets': 'Visual Assets Library',
      'audience/primary-persona': 'Primary Persona',
      'audience/secondary-personas': 'Secondary Personas',
      'market/competitive-landscape': 'Competitive Landscape',
      'marketing/campaign-copy': 'Campaign Copy',
      'marketing/email-templates': 'Email Templates',
      'marketing/social-content': 'Social Content',
      'marketing/video-scripts': 'Video Scripts',
      'marketing/ad-creative': 'Ad Creative',
      'research/notebooklm-artifacts': 'NotebookLM Artifacts',
    },
  },
  th: {
    shell: {
      portalHome: 'หน้าแรกพอร์ทัล',
      docsIndex: 'ดัชนีเอกสาร',
      notebooklm: 'NotebookLM',
      portal: 'พอร์ทัล',
      onThisPage: 'ในหน้านี้',
      minRead: 'นาทีในการอ่าน',
      launchReadyPortal: 'พอร์ทัลพร้อมเปิดตัว',
      freshBuild: 'เวอร์ชันล่าสุด',
      openDocsIndex: 'เปิดดัชนีเอกสาร',
      openResearchHub: 'เปิดศูนย์วิจัย',
      openSection: 'เปิดส่วน →',
      reviewContext: 'ตรวจสอบบริบท →',
      openInWiki: 'เปิดในวิกิ →',
    },
    home: {
      curatedLaunchTracks: 'แทร็กการเปิดตัว',
      homeHeading: 'พอร์ทัลแบรนด์ก่อน แต่ยังคงเป็นวิกิที่แท้จริง',
      homeBlurb: 'สำรวจผลิตภัณฑ์ แบรนด์ งานวิจัย และแคมเปญ โดยไม่สูญเสียการเข้าถึงเอกสารอย่างลึกซึ้ง',
      visualWorld: 'โลกภาพ',
      visualHeading: 'ใช้พื้นผิวแบรนด์จริง ไม่ใช่แค่การ์ดเอกสารทั่วไป',
      knowledgeMap: 'แผนที่ความรู้',
      knowledgeHeading: 'เรียกดูวิกิตามแทร็ก',
      notebooklmSpotlight: 'โฟกัส NotebookLM',
      notebooklmHeading: 'งานวิจัยและการเรียนรู้ยังคงอยู่ใกล้เรื่องราว',
    },
    categories: {
      general: 'พอร์ทัลและงานวิจัย',
      product: 'ผลิตภัณฑ์',
      brand: 'ระบบแบรนด์',
      audience: 'กลุ่มเป้าหมาย',
      marketing: 'แคมเปญ',
    },
    featureCardLabels: {
      '/docs/product/overview': { title: 'ภาพรวมผลิตภัณฑ์', eyebrow: 'ผลิตภัณฑ์', description: 'คำนิยามผลิตภัณฑ์หลัก การวางตำแหน่ง และกลุ่มข้อความสำหรับการสร้างการเปิดตัวปัจจุบัน' },
      '/docs/brand/visual-guidelines': { title: 'แนวทางภาพ', eyebrow: 'ระบบแบรนด์', description: 'จานสี ตัวอักษร ทิศทางศิลป์ และข้อกำหนดแบรนด์สำหรับรอบปัจจุบัน' },
      '/docs/marketing/campaign-copy': { title: 'คำโฆษณาแคมเปญ', eyebrow: 'แคมเปญ', description: 'เรื่องราวแคมเปญ เนื้อหาสำคัญ และข้อความพร้อมเปิดตัว' },
      '/docs/research/notebooklm-artifacts': { title: 'งานวิจัย NotebookLM', eyebrow: 'งานวิจัย', description: 'รายงาน อินโฟกราฟิก สไลด์ เสียง และตารางงานวิจัยจาก Wave 7' },
    },
    docTitles: {
      'index': 'ดัชนีเอกสารการเปิดตัว',
      'getting-started/quickstart': 'เริ่มต้นใช้งาน',
      'product/overview': 'ภาพรวมผลิตภัณฑ์',
      'product/features': 'คุณสมบัติผลิตภัณฑ์',
      'product/specifications': 'ข้อกำหนดผลิตภัณฑ์',
      'brand/voice-tone': 'เสียงและโทน',
      'brand/visual-guidelines': 'แนวทางภาพ',
      'brand/visual-assets': 'คลังสินทรัพย์ภาพ',
      'audience/primary-persona': 'เป้าหมายหลัก',
      'audience/secondary-personas': 'เป้าหมายรอง',
      'market/competitive-landscape': 'ภูมิทัศน์การแข่งขัน',
      'marketing/campaign-copy': 'คำโฆษณาแคมเปญ',
      'marketing/email-templates': 'เทมเพลตอีเมล',
      'marketing/social-content': 'เนื้อหาโซเชียล',
      'marketing/video-scripts': 'บทสคริปต์วิดีโอ',
      'marketing/ad-creative': 'สร้างสรรค์โฆษณา',
      'research/notebooklm-artifacts': 'งานวิจัย NotebookLM',
    },
  },
} as const;

export function t(locale: Locale) {
  return translations[locale];
}

export function localizedDocTitle(locale: Locale, slug: string, fallback: string): string {
  return translations[locale].docTitles[slug as keyof typeof translations.en.docTitles] || fallback;
}

export function localizedFeature(locale: Locale, href: string, fallback: { title: string; eyebrow: string; description: string }) {
  return translations[locale].featureCardLabels[href as keyof typeof translations.en.featureCardLabels] || fallback;
}
