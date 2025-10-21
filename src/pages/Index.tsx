import { useState, useEffect, useRef } from 'react';
import { Button } from '@/components/ui/button';
import Icon from '@/components/ui/icon';

type Category = 'All' | 'Fashion' | 'Beauty' | 'Commercial' | 'Editorial';

interface PortfolioImage {
  id: number;
  url: string;
  category: Category;
  title: string;
}

const portfolioImages: PortfolioImage[] = [
  {
    id: 1,
    url: 'https://cdn.poehali.dev/projects/8b2aab55-eb63-44c9-b11f-63060693552e/files/335ab86e-f4ae-40b9-a955-94bf1a96380b.jpg',
    category: 'Fashion',
    title: 'High Fashion Editorial'
  },
  {
    id: 2,
    url: 'https://cdn.poehali.dev/projects/8b2aab55-eb63-44c9-b11f-63060693552e/files/7fff6723-a4f1-4732-9231-a66cff73da58.jpg',
    category: 'Beauty',
    title: 'Beauty Campaign'
  },
  {
    id: 3,
    url: 'https://cdn.poehali.dev/projects/8b2aab55-eb63-44c9-b11f-63060693552e/files/51a43506-9a3a-4278-acdf-9d92a448b09c.jpg',
    category: 'Commercial',
    title: 'Lifestyle Brand'
  },
  {
    id: 4,
    url: 'https://cdn.poehali.dev/projects/8b2aab55-eb63-44c9-b11f-63060693552e/files/335ab86e-f4ae-40b9-a955-94bf1a96380b.jpg',
    category: 'Editorial',
    title: 'Magazine Cover'
  },
  {
    id: 5,
    url: 'https://cdn.poehali.dev/projects/8b2aab55-eb63-44c9-b11f-63060693552e/files/7fff6723-a4f1-4732-9231-a66cff73da58.jpg',
    category: 'Fashion',
    title: 'Runway Collection'
  },
  {
    id: 6,
    url: 'https://cdn.poehali.dev/projects/8b2aab55-eb63-44c9-b11f-63060693552e/files/51a43506-9a3a-4278-acdf-9d92a448b09c.jpg',
    category: 'Commercial',
    title: 'Brand Ambassador'
  }
];

const Index = () => {
  const [activeSection, setActiveSection] = useState('home');
  const [activeCategory, setActiveCategory] = useState<Category>('All');
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [visibleSections, setVisibleSections] = useState<Set<string>>(new Set());

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setVisibleSections((prev) => new Set(prev).add(entry.target.id));
          }
        });
      },
      { threshold: 0.1 }
    );

    document.querySelectorAll('[data-animate]').forEach((element) => {
      observer.observe(element);
    });

    return () => observer.disconnect();
  }, []);

  const categories: Category[] = ['All', 'Fashion', 'Beauty', 'Commercial', 'Editorial'];

  const filteredImages = activeCategory === 'All' 
    ? portfolioImages 
    : portfolioImages.filter(img => img.category === activeCategory);

  const scrollToSection = (sectionId: string) => {
    setActiveSection(sectionId);
    setMobileMenuOpen(false);
    const element = document.getElementById(sectionId);
    element?.scrollIntoView({ behavior: 'smooth' });
  };

  const openLightbox = (index: number) => {
    setCurrentImageIndex(index);
    setLightboxOpen(true);
    document.body.style.overflow = 'hidden';
  };

  const closeLightbox = () => {
    setLightboxOpen(false);
    document.body.style.overflow = 'auto';
  };

  const nextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % filteredImages.length);
  };

  const prevImage = () => {
    setCurrentImageIndex((prev) => (prev - 1 + filteredImages.length) % filteredImages.length);
  };

  return (
    <div className="min-h-screen bg-white text-black">
      <nav className="fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-sm border-b border-gray-200">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <h1 className="font-serif text-2xl tracking-wider">PORTFOLIO</h1>
            
            <div className="hidden md:flex gap-8">
              {['home', 'portfolio', 'about', 'contact'].map((section) => (
                <button
                  key={section}
                  onClick={() => scrollToSection(section)}
                  className={`text-sm tracking-widest uppercase transition-all duration-300 hover:text-gold ${
                    activeSection === section ? 'text-gold' : 'text-black'
                  }`}
                >
                  {section === 'home' ? 'Главная' : section === 'portfolio' ? 'Портфолио' : section === 'about' ? 'Обо мне' : 'Контакты'}
                </button>
              ))}
            </div>

            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden text-black hover:text-gold transition-colors"
            >
              <Icon name={mobileMenuOpen ? "X" : "Menu"} size={24} />
            </button>
          </div>
        </div>

        {mobileMenuOpen && (
          <div className="md:hidden bg-white border-t border-gray-200 animate-fade-in">
            <div className="container mx-auto px-6 py-4 flex flex-col gap-4">
              {['home', 'portfolio', 'about', 'contact'].map((section) => (
                <button
                  key={section}
                  onClick={() => scrollToSection(section)}
                  className={`text-sm tracking-widest uppercase transition-all duration-300 hover:text-gold text-left ${
                    activeSection === section ? 'text-gold' : 'text-black'
                  }`}
                >
                  {section === 'home' ? 'Главная' : section === 'portfolio' ? 'Портфолио' : section === 'about' ? 'Обо мне' : 'Контакты'}
                </button>
              ))}
            </div>
          </div>
        )}
      </nav>

      <section id="home" className="min-h-screen flex items-center justify-center pt-20 animate-fade-in" data-animate>
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="font-serif text-7xl md:text-8xl mb-6 tracking-tight">
              Elegance
            </h2>
            <div className="w-24 h-px bg-gold mx-auto mb-6"></div>
            <p className="text-xl text-gray-600 tracking-wide mb-12">
              Professional Model & Fashion Artist
            </p>
            <Button
              onClick={() => scrollToSection('portfolio')}
              variant="outline"
              className="px-8 py-6 text-sm tracking-widest uppercase border-2 border-black hover:bg-black hover:text-white transition-all duration-300"
            >
              Смотреть портфолио
            </Button>
          </div>
        </div>
      </section>

      <section id="portfolio" className="min-h-screen py-24 bg-gray-50" data-animate>
        <div className="container mx-auto px-6">
          <div className={`text-center mb-16 transition-all duration-700 ${
            visibleSections.has('portfolio') ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
          }`}>
            <h2 className="font-serif text-5xl md:text-6xl mb-4">Портфолио</h2>
            <div className="w-24 h-px bg-gold mx-auto"></div>
          </div>

          <div className={`flex justify-center gap-4 mb-12 flex-wrap transition-all duration-700 delay-200 ${
            visibleSections.has('portfolio') ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
          }`}>
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setActiveCategory(category)}
                className={`px-6 py-2 text-sm tracking-widest uppercase transition-all duration-300 ${
                  activeCategory === category
                    ? 'bg-black text-white'
                    : 'bg-white text-black hover:bg-gray-100'
                }`}
              >
                {category === 'All' ? 'Все' : category}
              </button>
            ))}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredImages.map((image, index) => (
              <div
                key={image.id}
                className="group relative overflow-hidden bg-white animate-scale-in cursor-pointer"
                style={{ animationDelay: `${index * 100}ms` }}
                onClick={() => openLightbox(index)}
              >
                <div className="aspect-[3/4] overflow-hidden">
                  <img
                    src={image.url}
                    alt={image.title}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                </div>
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-all duration-500 flex items-end">
                  <div className="p-6 text-white transform translate-y-full group-hover:translate-y-0 transition-transform duration-500">
                    <p className="font-serif text-2xl mb-1">{image.title}</p>
                    <p className="text-sm tracking-widest uppercase opacity-80">{image.category}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="about" className="min-h-screen flex items-center py-24" data-animate>
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto">
            <div className="grid md:grid-cols-2 gap-16 items-center">
              <div className={`transition-all duration-700 ${
                visibleSections.has('about') ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-10'
              }`}>
                <div className="aspect-[3/4] overflow-hidden bg-gray-100">
                  <img
                    src="https://cdn.poehali.dev/projects/8b2aab55-eb63-44c9-b11f-63060693552e/files/335ab86e-f4ae-40b9-a955-94bf1a96380b.jpg"
                    alt="About"
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>
              <div className={`transition-all duration-700 delay-300 ${
                visibleSections.has('about') ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-10'
              }`}>
                <h2 className="font-serif text-5xl mb-6">Обо мне</h2>
                <div className="w-16 h-px bg-gold mb-8"></div>
                <p className="text-gray-700 leading-relaxed mb-6">
                  Профессиональная модель с опытом работы в высокой моде, рекламных кампаниях и редакционных съемках.
                </p>
                <p className="text-gray-700 leading-relaxed mb-6">
                  Сотрудничаю с ведущими фотографами и брендами, создавая визуальные истории, которые вдохновляют и оставляют след в мире моды.
                </p>
                <div className="space-y-4 mt-8">
                  <div className="flex items-center gap-3">
                    <div className="w-2 h-2 bg-gold"></div>
                    <p className="text-sm tracking-wide">Опыт: 5+ лет</p>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-2 h-2 bg-gold"></div>
                    <p className="text-sm tracking-wide">Специализация: Fashion, Editorial, Commercial</p>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-2 h-2 bg-gold"></div>
                    <p className="text-sm tracking-wide">Сотрудничество с международными брендами</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="contact" className="min-h-screen flex items-center py-24 bg-black text-white" data-animate>
        <div className="container mx-auto px-6">
          <div className={`max-w-2xl mx-auto text-center transition-all duration-700 ${
            visibleSections.has('contact') ? 'opacity-100 scale-100' : 'opacity-0 scale-95'
          }`}>
            <h2 className="font-serif text-5xl md:text-6xl mb-6">Свяжитесь со мной</h2>
            <div className="w-24 h-px bg-gold mx-auto mb-12"></div>
            <p className="text-gray-400 mb-12 leading-relaxed">
              Открыта для новых проектов и сотрудничества. Давайте создадим что-то прекрасное вместе.
            </p>
            <div className="space-y-6 mb-12">
              <div className="flex items-center justify-center gap-3">
                <Icon name="Mail" size={20} className="text-gold" />
                <a href="mailto:contact@portfolio.com" className="hover:text-gold transition-colors tracking-wide">
                  contact@portfolio.com
                </a>
              </div>
              <div className="flex items-center justify-center gap-3">
                <Icon name="Phone" size={20} className="text-gold" />
                <a href="tel:+1234567890" className="hover:text-gold transition-colors tracking-wide">
                  +1 (234) 567-890
                </a>
              </div>
            </div>
            <div className="flex gap-6 justify-center">
              <a
                href="#"
                className="w-12 h-12 border border-white/30 flex items-center justify-center hover:border-gold hover:bg-gold/10 transition-all duration-300"
              >
                <Icon name="Instagram" size={20} />
              </a>
              <a
                href="#"
                className="w-12 h-12 border border-white/30 flex items-center justify-center hover:border-gold hover:bg-gold/10 transition-all duration-300"
              >
                <Icon name="Facebook" size={20} />
              </a>
              <a
                href="#"
                className="w-12 h-12 border border-white/30 flex items-center justify-center hover:border-gold hover:bg-gold/10 transition-all duration-300"
              >
                <Icon name="Twitter" size={20} />
              </a>
            </div>
          </div>
        </div>
      </section>

      <footer className="bg-black text-white py-8 border-t border-white/10">
        <div className="container mx-auto px-6 text-center">
          <p className="text-sm text-gray-400 tracking-widest">
            © 2024 Model Portfolio. All rights reserved.
          </p>
        </div>
      </footer>

      {lightboxOpen && (
        <div className="fixed inset-0 z-[100] bg-black/95 animate-fade-in" onClick={closeLightbox}>
          <button
            onClick={closeLightbox}
            className="absolute top-6 right-6 z-[101] text-white hover:text-gold transition-colors"
          >
            <Icon name="X" size={32} />
          </button>

          <button
            onClick={(e) => {
              e.stopPropagation();
              prevImage();
            }}
            className="absolute left-6 top-1/2 -translate-y-1/2 z-[101] text-white hover:text-gold transition-colors"
          >
            <Icon name="ChevronLeft" size={48} />
          </button>

          <button
            onClick={(e) => {
              e.stopPropagation();
              nextImage();
            }}
            className="absolute right-6 top-1/2 -translate-y-1/2 z-[101] text-white hover:text-gold transition-colors"
          >
            <Icon name="ChevronRight" size={48} />
          </button>

          <div className="h-full flex items-center justify-center p-12" onClick={(e) => e.stopPropagation()}>
            <div className="max-w-6xl max-h-full animate-scale-in">
              <img
                src={filteredImages[currentImageIndex].url}
                alt={filteredImages[currentImageIndex].title}
                className="max-w-full max-h-[85vh] object-contain"
              />
              <div className="text-center mt-6">
                <p className="font-serif text-white text-3xl mb-2">
                  {filteredImages[currentImageIndex].title}
                </p>
                <p className="text-gray-400 text-sm tracking-widest uppercase">
                  {filteredImages[currentImageIndex].category}
                </p>
                <p className="text-gray-500 text-sm mt-2">
                  {currentImageIndex + 1} / {filteredImages.length}
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Index;