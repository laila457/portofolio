import { useEffect, useState } from 'react';

const mediaAssets = import.meta.glob('../assets/*', { eager: true, query: '?url', import: 'default' });

function getMediaUrl(filename) {
  const url = mediaAssets[`../assets/${filename}`];
  if (!url) throw new Error(`Media asset not found: ${filename}`);
  return url;
}

const navigation = [
  ['hero', 'Beranda'], ['about', 'Tentang'], ['skills', 'Skill'],
  ['projects', 'Project'], ['certs', 'Sertifikat'], ['contact', 'Kontak'],
];

const skills = [
  ['PHP', '🐘', 76], ['Laravel', '🔺', 55], ['Flutter', '📱', 78],
  ['Dart', '🎯', 70], ['Firebase', '🔥', 65], ['MySQL', '▤', 70],
  ['Python', '🐍', 70], ['UI/UX Design', '✳', 90], ['Figma', '◈', 90],
  ['System Analysis', '⌘', 90], ['ESP32 / IoT', '⌁', 60],
];

const projects = [
  {
    id: 'ciloka', title: 'CILOKA', subtitle: 'Aplikasi edukasi anak SD', role: 'UI/UX Designer · System Analyst · Game Developer',
    summary: 'Aplikasi edukasi interaktif untuk siswa SD kelas 1–6 dengan fitur belajar membaca, menulis, berhitung, handwriting recognition, dan rekomendasi gaya belajar.',
    tags: ['Flutter', 'Figma', 'Google ML Kit', 'Forward Chaining'], image: 'Ciloka1.jpeg',
    description: 'Aplikasi edukasi interaktif untuk siswa SD kelas 1–6 yang memiliki fitur belajar membaca, menulis, berhitung, handwriting recognition, text-to-speech, leaderboard, serta sistem rekomendasi gaya belajar menggunakan Rule Based Expert System dengan metode Forward Chaining.',
    features: ['Belajar membaca, menulis, dan berhitung interaktif', 'Handwriting Recognition menggunakan Google ML Kit & OCR', 'Text-to-Speech untuk bantuan membaca', 'Leaderboard untuk motivasi belajar', 'Sistem rekomendasi gaya belajar', 'Interface ramah anak untuk siswa SD'],
    myRole: 'Merancang antarmuka yang ramah anak, menganalisis kebutuhan sistem dan alur expert system, serta mengembangkan elemen gamifikasi seperti leaderboard dan reward system.',
    tech: ['Flutter', 'Dart', 'Figma', 'Google ML Kit', 'OCR', 'Rule Based Expert System', 'Forward Chaining'],
    challenges: 'Mengintegrasikan handwriting recognition dengan akurasi tinggi pada perangkat mobile dan merancang rule base yang tepat untuk rekomendasi gaya belajar.',
    solutions: 'Menggunakan Google ML Kit untuk OCR handwriting dan metode Forward Chaining untuk memproses fakta siswa menjadi rekomendasi yang relevan.',
    result: 'Aplikasi membantu siswa SD belajar secara interaktif dengan pengalaman personalisasi yang mendorong motivasi belajar.',
    images: ['Ciloka1.jpeg', 'Ciloka2.jpeg', 'Ciloka3.jpeg', 'Ciloka4.jpeg', 'Ciloka5.jpeg', 'Ciloka6.jpeg', 'Ciloka7.jpeg', 'Ciloka8.jpeg', 'Ciloka9.jpeg', 'Ciloka10.jpeg', 'Ciloka11.jpeg', 'Ciloka13.jpeg'], video: 'Ciloka12.mp4',
  },
  {
    id: 'pakaiaja', title: 'PAKAI AJA', subtitle: 'Marketplace penyewaan barang', role: 'System Analyst',
    summary: 'Marketplace penyewaan barang dengan tiga role, verifikasi identitas, escrow payment, dan sistem pencegahan penipuan.',
    tags: ['Figma', 'System Analysis'], image: 'Pakaiaja1.jpeg',
    description: 'Marketplace penyewaan barang dengan tiga role (Penyewa, Pemilik Barang, Admin), verifikasi KTP, selfie verification, escrow payment, monitoring transaksi, dan pencegahan penipuan.',
    features: ['Sistem tiga role: Penyewa, Pemilik Barang, Admin', 'Verifikasi identitas menggunakan KTP', 'Selfie verification', 'Escrow payment system', 'Monitoring transaksi', 'Sistem pencegahan penipuan', 'Dashboard admin'],
    myRole: 'Menganalisis kebutuhan bisnis dan pengguna, merancang use case diagram dan activity diagram, serta mendokumentasikan alur sistem dari registrasi hingga penyelesaian transaksi.',
    tech: ['Figma', 'System Analysis', 'Use Case Diagram', 'Activity Diagram', 'ERD'],
    challenges: 'Merancang alur verifikasi yang aman namun tetap mudah digunakan, sekaligus memastikan escrow payment memiliki mekanisme penyelesaian sengketa yang adil.',
    solutions: 'Menyusun verifikasi bertahap dari KTP, selfie, hingga review admin, serta merancang escrow payment dengan milestone-based release.',
    result: 'Dokumentasi sistem komprehensif, meliputi use case, activity diagram, ERD, dan prototype UI/UX yang siap dikembangkan.',
    images: ['Pakaiaja1.jpeg', 'Pakaiaja2.jpeg', 'Pakaiaja3.jpeg', 'Pakaiaja4.png'],
  },
  {
    id: 'happypaws', title: 'Happy Paws', subtitle: 'Pet grooming booking app', role: 'Mobile Developer',
    summary: 'Aplikasi mobile booking pet grooming untuk reservasi, memilih jadwal, melihat riwayat, dan mengelola data hewan peliharaan.',
    tags: ['Flutter', 'Dart', 'Firebase'], image: 'Happypaws1.jpeg',
    description: 'Aplikasi mobile booking pet grooming yang memungkinkan pengguna melakukan reservasi grooming, memilih jadwal, melihat riwayat booking, dan mengelola data hewan peliharaan.',
    features: ['Reservasi grooming dengan jadwal fleksibel', 'Katalog layanan grooming', 'Riwayat booking dan status', 'Pengelolaan data hewan peliharaan', 'Notifikasi booking dan promosi', 'Integrasi pembayaran'],
    myRole: 'Mengembangkan aplikasi mobile menggunakan Flutter, mengintegrasikan Firebase untuk backend services, serta memastikan performa dan pengalaman pengguna yang optimal.',
    tech: ['Flutter', 'Dart', 'Firebase', 'Cloud Firestore', 'Firebase Auth'],
    challenges: 'Mengelola state booking di beberapa layar dan mengintegrasikan Firebase real-time listener untuk update status langsung.',
    solutions: 'Menggunakan Provider pattern, Firebase snapshot listener, dan struktur folder yang memisahkan presentation, logic, serta data layer.',
    result: 'Aplikasi booking pet grooming dengan UI menarik dan performa responsif di berbagai perangkat.',
    images: ['Happypaws1.jpeg', 'happypaws2.png'], video: 'Happy Paws - Ads.mp4',
  },
  {
    id: 'smartgallon', title: 'Smart Water Gallon Monitoring', subtitle: 'IoT monitoring system', role: 'IoT Developer · Firmware Developer · System Developer',
    summary: 'Sistem monitoring galon berbasis IoT dengan ESP32 dan sensor berat, terhubung ke dashboard Laravel untuk pemantauan realtime.',
    tags: ['ESP32', 'Laravel', 'PHP', 'MySQL'], image: 'IOT Smartgalon1.png',
    description: 'Sistem monitoring galon air berbasis IoT menggunakan ESP32, HX711, dan Load Cell. Data dikirim ke website Laravel untuk monitoring realtime dan notifikasi otomatis.',
    features: ['Monitoring berat galon real-time', 'Pembacaan sensor HX711 via ESP32', 'Dashboard website untuk admin', 'Notifikasi saat air hampir habis', 'Histori data dan grafik konsumsi', 'Alert berbasis threshold'],
    myRole: 'Membangun firmware ESP32 untuk pembacaan sensor dan pengiriman data, serta mengembangkan dashboard monitoring admin menggunakan Laravel.',
    tech: ['ESP32', 'HX711', 'Load Cell', 'Laravel', 'PHP', 'MySQL'],
    challenges: 'Mengkalibrasi Load Cell dan menjaga stabilitas koneksi WiFi ESP32 untuk pengiriman data yang konsisten.',
    solutions: 'Melakukan kalibrasi multi-point dengan referensi berat standar, menambahkan auto-reconnect, dan menyimpan data sementara ketika koneksi terputus.',
    result: 'Sistem memonitor berat galon secara real-time, memberikan notifikasi otomatis, dan menampilkan data dalam dashboard informatif.',
    images: ['IOT Smartgalon1.png', 'IOT Smartgalon2.png', 'IOT Smartgalon3.png', 'IOT Smartgalon5.jpeg', 'IOT Smartgalon6.jpeg', 'IOT Smartgalon7.jpeg', 'IOT Smartgalon8.jpeg', 'ShowUpIOT.jpeg'],
  },
  {
    id: 'craftcake', title: 'Craft Cake', subtitle: 'E-commerce penjualan kue', role: 'UI/UX Designer',
    summary: 'Perancangan UI/UX website e-commerce penjualan kue dengan fokus pada pengalaman pengguna dan desain modern.',
    tags: ['Figma', 'UI/UX'], image: 'Craftcake1.png',
    description: 'Perancangan UI/UX website e-commerce penjualan kue dengan fokus pada pengalaman pengguna dan desain modern yang menarik dan profesional.',
    features: ['Desain e-commerce modern dan responsif', 'Katalog produk dengan galeri gambar', 'Sistem keranjang belanja', 'Alur checkout intuitif', 'Prototype interaktif di Figma', 'User testing dan iterasi desain'],
    myRole: 'Merancang antarmuka dari wireframe hingga high-fidelity prototype, melakukan user research, dan memastikan pengalaman pengguna yang optimal.',
    tech: ['Figma', 'UI/UX Design', 'Prototyping', 'User Research'],
    challenges: 'Merancang katalog kue yang menarik secara visual tanpa mengurangi kemudahan navigasi dan kecepatan checkout.',
    solutions: 'Menggunakan pendekatan design thinking, tata letak grid yang rapi, dan checkout flow tiga langkah.',
    result: 'Prototype e-commerce profesional dengan navigasi intuitif, visual menarik, dan pengalaman pengguna yang optimal.',
    images: ['Craftcake1.png', 'Craftcake2.png'],
  },
  {
    id: 'stuntingcare', title: 'Stunting Care', subtitle: 'Aplikasi kesehatan balita', role: 'UI/UX Designer',
    summary: 'Perancangan aplikasi kesehatan balita untuk memonitor pertumbuhan anak dan memberikan edukasi pencegahan stunting.',
    tags: ['Figma', 'UI/UX'], image: 'stuntingcare1.png',
    description: 'Perancangan aplikasi kesehatan balita yang membantu orang tua memonitor pertumbuhan anak serta memberikan edukasi pencegahan stunting.',
    features: ['Dashboard pertumbuhan anak', 'Tracking tinggi dan berat badan', 'Grafik pertumbuhan vs standar WHO', 'Edukasi pencegahan stunting', 'Tips nutrisi dan pola makan sehat', 'Jadwal imunisasi dan kontrol'],
    myRole: 'Merancang antarmuka yang mudah digunakan orang tua, dengan visualisasi data pertumbuhan yang jelas dan konten edukasi sederhana.',
    tech: ['Figma', 'UI/UX Design', 'Prototyping', 'Healthcare UX'],
    challenges: 'Menyajikan data pertumbuhan anak berdasarkan grafik WHO dengan cara yang mudah dipahami dan tidak mengintimidasi.',
    solutions: 'Menggunakan indikator warna untuk status pertumbuhan dan menyajikan edukasi dalam format ringkas dengan bahasa sederhana.',
    result: 'Prototype aplikasi kesehatan balita yang informatif dan mudah digunakan, dengan data pertumbuhan yang jelas.',
    images: ['stuntingcare1.png', 'stuntingcare2.png', 'stuntingcare3.png'],
  },
  {
    id: 'chatbot', title: 'Chatbot Rule-Based Python', subtitle: 'Conversational expert system', role: 'Python Developer',
    summary: 'Sistem chatbot berbasis Rule-Based AI untuk mendeteksi dan merespons input pengguna menggunakan expert system.',
    tags: ['Python', 'Rule Based System'], image: 'Chatbot1.png',
    description: 'Sistem chatbot berbasis Rule-Based AI untuk mendeteksi dan merespons input pengguna menggunakan pendekatan expert system dengan rule base yang telah ditentukan.',
    features: ['Rule-Based response system', 'Pattern matching untuk input pengguna', 'Percakapan multi-turn', 'Rule base yang dapat dikonfigurasi', 'Logging percakapan', 'Fallback untuk input tak terduga'],
    myRole: 'Mengembangkan chatbot engine menggunakan Python, merancang rule base untuk respons, dan membangun sistem parsing input pengguna.',
    tech: ['Python', 'Rule Based System', 'Natural Language Processing', 'Pattern Matching'],
    challenges: 'Merancang rule base yang cukup luas untuk menangani variasi input sekaligus memastikan respons relevan dan kontekstual.',
    solutions: 'Menggunakan pencocokan rule berbasis dictionary, fallback response, dan rule base modular yang mudah dikembangkan.',
    result: 'Chatbot merespons percakapan sesuai rule base dengan arsitektur yang mudah dikembangkan dan dipelihara.',
    images: ['Chatbot1.png', 'Chatbot2.png', 'Chatbot3.png', 'Chatbot4.png', 'Chatbot5.png', 'Chatbot6.png', 'Chatbot7.png', 'Chatbot8.png', 'Chatbot9.png', 'Chatbot11.png', 'Chatbot12.png', 'Chatbot13.png'],
  },
];

const certificates = [
  ['Huawei Sertifikat.png', 'Huawei Sertifikat', 'Huawei'],
  ['Operate and Manage a Cloud Server Sertifikat.jpg', 'Operate and Manage a Cloud Server', 'Alibaba Cloud'],
  ['Using ECS Sertifikat alibaba2.png', 'Using ECS (Elastic Compute Service)', 'Alibaba Cloud'],
  ['Operating and manage object storage sertifikat alibaba3.jpg', 'Operating & Manage Object Storage', 'Alibaba Cloud'],
];

function SectionHeading({ label, title, description }) {
  return <header className="section-heading reveal"><span className="eyebrow">{label}</span><h2>{title}</h2>{description && <p>{description}</p>}</header>;
}

function ProjectModal({ project, onClose }) {
  const [imageIndex, setImageIndex] = useState(0);
  const [showVideo, setShowVideo] = useState(false);
  const [videoError, setVideoError] = useState(false);

  useEffect(() => {
    if (!project) return undefined;
    setImageIndex(0);
    setShowVideo(false);
    setVideoError(false);
    document.body.classList.add('modal-open');
    return () => document.body.classList.remove('modal-open');
  }, [project]);

  useEffect(() => {
    if (!project) return undefined;
    const onKeyDown = (event) => {
      if (event.key === 'Escape') onClose();
      if (event.key === 'ArrowLeft') setImageIndex((index) => (index - 1 + project.images.length) % project.images.length);
      if (event.key === 'ArrowRight') setImageIndex((index) => (index + 1) % project.images.length);
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [project, onClose]);

  if (!project) return null;
  const showGallery = project.images?.length > 0 && !showVideo;
  const changeImage = (direction) => setImageIndex((index) => (index + direction + project.images.length) % project.images.length);

  return (
    <div className="modal-backdrop" onMouseDown={(event) => event.target === event.currentTarget && onClose()}>
      <section className="project-modal" role="dialog" aria-modal="true" aria-labelledby="modal-title">
        <button className="icon-button modal-close" onClick={onClose} aria-label="Tutup detail">×</button>
        {showGallery && <div className="modal-gallery">
          <img src={getMediaUrl(project.images[imageIndex])} alt={`${project.title}, gambar ${imageIndex + 1}`} />
          {project.images.length > 1 && <>
            <button className="gallery-arrow previous" onClick={() => changeImage(-1)} aria-label="Gambar sebelumnya">‹</button>
            <button className="gallery-arrow next" onClick={() => changeImage(1)} aria-label="Gambar selanjutnya">›</button>
            <span className="gallery-count">{imageIndex + 1} / {project.images.length}</span>
            <div className="gallery-dots">{project.images.map((image, index) => <button key={image} className={index === imageIndex ? 'selected' : ''} onClick={() => setImageIndex(index)} aria-label={`Lihat gambar ${index + 1}`} />)}</div>
          </>}
        </div>}
        {showVideo && <div className="modal-video"><video key={project.video} src={getMediaUrl(project.video)} controls autoPlay onError={() => setVideoError(true)} />{videoError && <p>Video demo tidak dapat dimuat.</p>}</div>}
        <div className="modal-content">
          <span className="eyebrow">Studi proyek</span><h2 id="modal-title">{project.title}</h2><p className="modal-role">{project.role}</p>
          <div className="modal-section"><h3>Deskripsi</h3><p>{project.description}</p></div>
          <div className="modal-section"><h3>Fitur utama</h3><ul>{project.features.map((feature) => <li key={feature}>{feature}</li>)}</ul></div>
          <div className="modal-section"><h3>Peran saya</h3><p>{project.myRole}</p></div>
          <div className="modal-section"><h3>Teknologi</h3><div className="tag-list">{project.tech.map((item) => <span className="tag" key={item}>{item}</span>)}</div></div>
          <div className="modal-section"><h3>Tantangan</h3><p>{project.challenges}</p></div>
          <div className="modal-section"><h3>Solusi</h3><p>{project.solutions}</p></div>
          <div className="modal-section"><h3>Hasil akhir</h3><p>{project.result}</p></div>
          {project.video && <button className="button button-secondary video-toggle" onClick={() => setShowVideo((visible) => !visible)}>{showVideo ? 'Kembali ke galeri' : 'Putar video demo'}</button>}
        </div>
      </section>
    </div>
  );
}

export default function App() {
  const [activeSection, setActiveSection] = useState('hero');
  const [menuOpen, setMenuOpen] = useState(false);
  const [showTop, setShowTop] = useState(false);
  const [progress, setProgress] = useState(0);
  const [selectedProject, setSelectedProject] = useState(null);
  const [roleIndex, setRoleIndex] = useState(0);
  const [typedRole, setTypedRole] = useState('');
  const roles = ['Web Developer', 'Mobile Developer', 'UI/UX Designer', 'System Analyst', 'IoT Developer', 'Problem Solver'];

  useEffect(() => {
    const sections = navigation.map(([id]) => document.getElementById(id)).filter(Boolean);
    const onScroll = () => {
      const scrollable = document.documentElement.scrollHeight - window.innerHeight;
      setProgress(scrollable > 0 ? (window.scrollY / scrollable) * 100 : 0);
      setShowTop(window.scrollY > 420);
      setActiveSection(sections.reduce((current, section) => window.scrollY >= section.offsetTop - 140 ? section.id : current, 'hero'));
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    const observer = new IntersectionObserver((entries) => entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
        if (entry.target.classList.contains('skill-card')) {
          const fill = entry.target.querySelector('.skill-fill');
          if (fill) fill.style.width = `${fill.dataset.level}%`;
        }
      }
    }), { threshold: 0.12, rootMargin: '0px 0px -35px 0px' });
    document.querySelectorAll('.reveal, .skill-card').forEach((element) => observer.observe(element));
    return () => {
      window.removeEventListener('scroll', onScroll);
      observer.disconnect();
    };
  }, []);

  useEffect(() => {
    let timeout;
    let charIndex = 0;
    let deleting = false;
    const type = () => {
      const currentRole = roles[roleIndex];
      if (!deleting) {
        charIndex += 1;
        setTypedRole(currentRole.slice(0, charIndex));
        if (charIndex === currentRole.length) {
          deleting = true;
          timeout = window.setTimeout(type, 1450);
          return;
        }
        timeout = window.setTimeout(type, 76);
      } else {
        charIndex -= 1;
        setTypedRole(currentRole.slice(0, charIndex));
        if (charIndex === 0) {
          setRoleIndex((index) => (index + 1) % roles.length);
          return;
        }
        timeout = window.setTimeout(type, 38);
      }
    };
    timeout = window.setTimeout(type, 950);
    return () => window.clearTimeout(timeout);
  }, [roleIndex]);

  const closeProject = () => setSelectedProject(null);

  return <>
    <div className="scroll-progress" style={{ width: `${progress}%` }} />
    <nav className={`navbar ${progress > 0.2 ? 'scrolled' : ''}`} aria-label="Navigasi utama">
      <a href="#hero" className="brand" onClick={() => setMenuOpen(false)}>N<span>.</span>Laila</a>
      <ul className="nav-links">{navigation.map(([id, label]) => <li key={id}><a className={activeSection === id ? 'active' : ''} href={`#${id}`}>{label}</a></li>)}</ul>
      <button className={`menu-toggle ${menuOpen ? 'open' : ''}`} onClick={() => setMenuOpen((open) => !open)} aria-label={menuOpen ? 'Tutup menu' : 'Buka menu'} aria-expanded={menuOpen}><span /><span /></button>
    </nav>
    <div className={`mobile-menu ${menuOpen ? 'open' : ''}`}>
      {navigation.map(([id, label]) => <a key={id} href={`#${id}`} onClick={() => setMenuOpen(false)}>{label}<span>↗</span></a>)}
    </div>

    <main>
      <section className="hero" id="hero">
        <div className="hero-grid" />
        <div className="hero-inner">
          <div className="hero-copy reveal is-visible">
            <div className="availability"><span /> Terbuka untuk kesempatan baru</div>
            <p className="hero-kicker">PORTOFOLIO · 2026</p>
            <h1>Nazwa<br /><span>Laila.</span></h1>
            <p className="hero-role">Mahasiswa S1 Informatika <span>/</span> Universitas Horizon Indonesia</p>
            <p className="hero-typing"><span>Saya seorang</span> <strong>{typedRole}<i /></strong></p>
            <p className="hero-description">Saya tertarik membangun produk digital yang berguna, dari aplikasi mobile dan web hingga pengalaman UI/UX yang dipikirkan dengan matang.</p>
            <div className="hero-actions"><a className="button button-primary" href="#projects">Jelajahi proyek <span>↗</span></a><a className="button button-text" href="#contact">Hubungi saya <span>↓</span></a></div>
            <div className="hero-socials"><a href="https://github.com/laila457" target="_blank" rel="noreferrer" aria-label="GitHub">GH</a><a href="https://www.linkedin.com/in/nazwa-laila" target="_blank" rel="noreferrer" aria-label="LinkedIn">in</a><a href="mailto:nazwalaila459@gmail.com" aria-label="Email">@</a></div>
          </div>
          <div className="hero-visual reveal is-visible" aria-label="Foto Nazwa Laila">
            <div className="portrait-frame"><img src={getMediaUrl('foto-profil.jpg.jpeg')} alt="Nazwa Laila" /><span className="portrait-index">01 / 06</span></div>
            <div className="visual-note"><span className="note-mark">✳</span><span>Curious by nature.<br /><strong>Builder by choice.</strong></span></div>
            <span className="visual-caption">INFORMATIKA · INDONESIA</span>
            <span className="visual-stamp">NL</span>
          </div>
          <a className="scroll-cue" href="#about"><span>SCROLL UNTUK MENGENAL</span><i /></a>
        </div>
      </section>

      <section className="section about-section" id="about">
        <SectionHeading label="Tentang saya" title="Teknologi, dengan tujuan." />
        <div className="about-grid">
          <div className="about-text reveal"><p>Saya <strong>Nazwa Laila</strong>, mahasiswa S1 Informatika di <strong>Universitas Horizon Indonesia</strong>. Saya tertarik pada pengembangan mobile dan web, desain UI/UX, analisis sistem, serta software development.</p><p>Selama kuliah, saya mengerjakan berbagai proyek mulai dari aplikasi edukasi interaktif, marketplace penyewaan, sistem monitoring IoT, hingga rancangan antarmuka untuk berbagai platform. Saya biasa menggunakan Flutter, Laravel, PHP, Python, Figma, dan ESP32.</p><p>Saya percaya teknologi dapat membantu menyelesaikan masalah sehari-hari. Dalam setiap proyek, saya membawa rasa ingin tahu, komunikasi terbuka, dan perhatian pada detail.</p><a className="text-link" href="mailto:nazwalaila459@gmail.com">Mari berkenalan <span>↗</span></a></div>
          <div className="about-highlights reveal">
            {[
              ['01', 'Pendidikan', 'S1 Informatika · Universitas Horizon Indonesia'],
              ['02', 'Software development', 'Web, aplikasi mobile, dan integrasi layanan'],
              ['03', 'AI & IoT', 'Rule-based expert system, ESP32, dan sensor'],
              ['04', 'UI/UX & analisis', 'Riset, rancangan antarmuka, dan dokumentasi sistem'],
            ].map(([number, title, description]) => <article className="highlight-row" key={number}><span>{number}</span><div><h3>{title}</h3><p>{description}</p></div><b>↗</b></article>)}
          </div>
        </div>
      </section>

      <section className="section skills-section" id="skills">
        <SectionHeading label="Keahlian" title="Tools I reach for." description="Teknologi dan tools yang saya gunakan untuk mengubah ide menjadi pengalaman nyata." />
        <div className="skills-grid">{skills.map(([name, icon, level], index) => <article className="skill-card reveal" style={{ '--delay': `${(index % 6) * 55}ms` }} key={name}><span className="skill-icon">{icon}</span><span className="skill-name">{name}</span><div className="skill-meter"><span className="skill-fill" data-level={level} /></div><span className="skill-percent">{String(level).padStart(2, '0')}</span></article>)}</div>
      </section>

      <section className="section projects-section" id="projects">
        <SectionHeading label="Portofolio terpilih" title="Proyek yang saya bangun." description="Eksperimen, kolaborasi, dan solusi digital dari masa perkuliahan." />
        <div className="projects-grid">{projects.map((project, index) => <button className="project-card reveal" style={{ '--delay': `${(index % 3) * 75}ms` }} key={project.id} onClick={() => setSelectedProject(project)} aria-label={`Lihat detail ${project.title}`}><span className="project-cover"><img src={getMediaUrl(project.image)} alt={project.title} loading="lazy" /><span className="project-number">0{index + 1}</span><span className="project-open">↗</span></span><span className="project-info"><span className="project-role">{project.role}</span><span className="project-title">{project.title}</span><span className="project-summary">{project.summary}</span><span className="tag-list">{project.tags.map((tag) => <span className="tag" key={tag}>{tag}</span>)}</span></span></button>)}</div>
      </section>

      <section className="section certificates-section" id="certs">
        <SectionHeading label="Sertifikat" title="Belajar tidak berhenti." description="Beberapa sertifikat yang saya peroleh selama masa perkuliahan." />
        <div className="certificates-grid">{certificates.map(([image, title, issuer], index) => <article className="certificate reveal" style={{ '--delay': `${index * 70}ms` }} key={image}><div className="certificate-image"><img src={getMediaUrl(image)} alt={title} loading="lazy" /><span>0{index + 1}</span></div><div className="certificate-meta"><div><h3>{title}</h3><p>{issuer}</p></div><span>↗</span></div></article>)}</div>
      </section>

      <section className="contact-section" id="contact"><div className="contact-inner reveal"><span className="eyebrow">Kontak</span><h2>Tertarik untuk Bekerja Sama?<br /><span>Mari kita bicarakan.</span></h2><a className="contact-email" href="mailto:nazwalaila459@gmail.com">nazwalaila459@gmail.com <span>↗</span></a><div className="contact-links"><a href="https://wa.me/6283891502129" target="_blank" rel="noreferrer">WhatsApp <span>↗</span></a><a href="https://linkedin.com/in/nazwa-laila" target="_blank" rel="noreferrer">LinkedIn <span>↗</span></a><a href="https://github.com/laila457" target="_blank" rel="noreferrer">GitHub <span>↗</span></a></div></div><span className="contact-decoration">NL</span></section>
    </main>

    <footer className="footer"><a href="#hero" className="brand">N<span>.</span>Laila</a><p>Copyright © 2026 Nazwa Laila</p><a href="#hero">Kembali ke atas ↑</a></footer>
    <button className={`back-to-top ${showTop ? 'visible' : ''}`} onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })} aria-label="Kembali ke atas">↑</button>
    <ProjectModal project={selectedProject} onClose={closeProject} />
  </>;
}
