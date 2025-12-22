import { getTranslations } from 'next-intl/server';
import { 
    Search, Palette, Rocket, CheckCircle, Droplets, CloudRain, 
    AlertTriangle, Package, Thermometer, Wind, ShieldCheck, 
    Zap, ArrowRight, Factory, Ship, Warehouse, Box, Leaf,
    CircleDot, TrendingDown, DollarSign, XCircle, BadgeCheck, Anchor
} from 'lucide-react';
import Link from 'next/link';
import Footer from '@/components/Footer';

// Wave SVG Component - Top Wave
const WaveTop = ({ className = '', fill = '#f9fafb' }: { className?: string; fill?: string }) => (
    <svg 
        className={`w-full ${className}`} 
        viewBox="0 0 1440 120" 
        preserveAspectRatio="none"
        xmlns="http://www.w3.org/2000/svg"
    >
        <path 
            fill={fill}
            d="M0,64L48,69.3C96,75,192,85,288,80C384,75,480,53,576,48C672,43,768,53,864,58.7C960,64,1056,64,1152,58.7C1248,53,1344,43,1392,37.3L1440,32L1440,120L1392,120C1344,120,1248,120,1152,120C1056,120,960,120,864,120C768,120,672,120,576,120C480,120,384,120,288,120C192,120,96,120,48,120L0,120Z"
        />
    </svg>
);

// Wave SVG Component - Bottom Wave
const WaveBottom = ({ className = '', fill = '#f9fafb' }: { className?: string; fill?: string }) => (
    <svg 
        className={`w-full ${className}`} 
        viewBox="0 0 1440 120" 
        preserveAspectRatio="none"
        xmlns="http://www.w3.org/2000/svg"
    >
        <path 
            fill={fill}
            d="M0,32L48,37.3C96,43,192,53,288,58.7C384,64,480,64,576,58.7C672,53,768,43,864,48C960,53,1056,75,1152,80C1248,85,1344,75,1392,69.3L1440,64L1440,0L1392,0C1344,0,1248,0,1152,0C1056,0,960,0,864,0C768,0,672,0,576,0C480,0,384,0,288,0C192,0,96,0,48,0L0,0Z"
        />
    </svg>
);

// Animated Ocean Wave Pattern
const OceanWavePattern = ({ className = '' }: { className?: string }) => (
    <div className={`absolute inset-0 overflow-hidden pointer-events-none ${className}`}>
        <svg 
            className="absolute bottom-0 left-0 w-[200%] h-32 opacity-10 animate-wave"
            viewBox="0 0 2880 120" 
            preserveAspectRatio="none"
            xmlns="http://www.w3.org/2000/svg"
        >
            <path 
                fill="currentColor"
                d="M0,60 C480,120 960,0 1440,60 C1920,120 2400,0 2880,60 L2880,120 L0,120 Z"
            />
        </svg>
        <svg 
            className="absolute bottom-0 left-0 w-[200%] h-24 opacity-5 animate-wave-slow"
            viewBox="0 0 2880 120" 
            preserveAspectRatio="none"
            xmlns="http://www.w3.org/2000/svg"
        >
            <path 
                fill="currentColor"
                d="M0,80 C360,20 720,100 1080,60 C1440,20 1800,100 2160,60 C2520,20 2880,100 2880,60 L2880,120 L0,120 Z"
            />
        </svg>
    </div>
);

// Container Ship Silhouette
const ContainerShipSilhouette = ({ className = '' }: { className?: string }) => (
    <svg 
        className={`${className}`}
        viewBox="0 0 200 80" 
        fill="currentColor"
        xmlns="http://www.w3.org/2000/svg"
    >
        {/* Ship hull */}
        <path d="M10,60 L30,75 L170,75 L190,60 L180,60 L180,45 L20,45 L20,60 Z" opacity="0.3" />
        {/* Containers */}
        <rect x="25" y="25" width="20" height="20" rx="2" opacity="0.4" />
        <rect x="50" y="25" width="20" height="20" rx="2" opacity="0.5" />
        <rect x="75" y="25" width="20" height="20" rx="2" opacity="0.4" />
        <rect x="100" y="25" width="20" height="20" rx="2" opacity="0.5" />
        <rect x="125" y="25" width="20" height="20" rx="2" opacity="0.4" />
        <rect x="150" y="25" width="20" height="20" rx="2" opacity="0.5" />
        {/* Bridge */}
        <rect x="155" y="5" width="20" height="20" rx="2" opacity="0.6" />
        <rect x="160" y="10" width="10" height="8" rx="1" fill="white" opacity="0.3" />
    </svg>
);

// Droplet Pattern Background
const DropletPattern = ({ className = '' }: { className?: string }) => (
    <div className={`absolute inset-0 overflow-hidden pointer-events-none ${className}`}>
        <svg className="w-full h-full opacity-5" xmlns="http://www.w3.org/2000/svg">
            <defs>
                <pattern id="droplets" x="0" y="0" width="60" height="60" patternUnits="userSpaceOnUse">
                    <circle cx="10" cy="10" r="3" fill="currentColor" />
                    <circle cx="40" cy="30" r="2" fill="currentColor" />
                    <circle cx="25" cy="50" r="2.5" fill="currentColor" />
                </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#droplets)" />
        </svg>
    </div>
);

export default async function DamagePreventionPage() {
    const t = await getTranslations('DamagePreventionPage');

    const moistureProblems = [
        {
            id: 'container-rain',
            icon: CloudRain,
            title: t('containerRainTitle'),
            description: t('containerRainDesc'),
            causes: [
                t('containerRainCause1'),
                t('containerRainCause2'),
                t('containerRainCause3'),
                t('containerRainCause4')
            ],
            effects: [
                t('containerRainEffect1'),
                t('containerRainEffect2'),
                t('containerRainEffect3'),
                t('containerRainEffect4')
            ],
            solution: t('containerRainSolution'),
            solutionDesc: t('containerRainSolutionDesc'),
            color: 'from-blue-500 to-cyan-500',
            bgColor: 'bg-blue-50',
            borderColor: 'border-blue-100'
        },
        {
            id: 'mold-mildew',
            icon: Leaf,
            title: t('moldMildewTitle'),
            description: t('moldMildewDesc'),
            causes: [
                t('moldMildewCause1'),
                t('moldMildewCause2'),
                t('moldMildewCause3'),
                t('moldMildewCause4')
            ],
            effects: [
                t('moldMildewEffect1'),
                t('moldMildewEffect2'),
                t('moldMildewEffect3'),
                t('moldMildewEffect4')
            ],
            solution: t('moldMildewSolution'),
            solutionDesc: t('moldMildewSolutionDesc'),
            color: 'from-green-500 to-emerald-500',
            bgColor: 'bg-green-50',
            borderColor: 'border-green-100'
        },
        {
            id: 'rust-corrosion',
            icon: Factory,
            title: t('rustCorrosionTitle'),
            description: t('rustCorrosionDesc'),
            causes: [
                t('rustCorrosionCause1'),
                t('rustCorrosionCause2'),
                t('rustCorrosionCause3'),
                t('rustCorrosionCause4')
            ],
            effects: [
                t('rustCorrosionEffect1'),
                t('rustCorrosionEffect2'),
                t('rustCorrosionEffect3'),
                t('rustCorrosionEffect4')
            ],
            solution: t('rustCorrosionSolution'),
            solutionDesc: t('rustCorrosionSolutionDesc'),
            color: 'from-orange-500 to-red-500',
            bgColor: 'bg-orange-50',
            borderColor: 'border-orange-100'
        },
        {
            id: 'cargo-sweat',
            icon: Thermometer,
            title: t('cargoSweatTitle'),
            description: t('cargoSweatDesc'),
            causes: [
                t('cargoSweatCause1'),
                t('cargoSweatCause2'),
                t('cargoSweatCause3'),
                t('cargoSweatCause4')
            ],
            effects: [
                t('cargoSweatEffect1'),
                t('cargoSweatEffect2'),
                t('cargoSweatEffect3'),
                t('cargoSweatEffect4')
            ],
            solution: t('cargoSweatSolution'),
            solutionDesc: t('cargoSweatSolutionDesc'),
            color: 'from-purple-500 to-violet-500',
            bgColor: 'bg-purple-50',
            borderColor: 'border-purple-100'
        },
        {
            id: 'odor-contamination',
            icon: Wind,
            title: t('odorContaminationTitle'),
            description: t('odorContaminationDesc'),
            causes: [
                t('odorContaminationCause1'),
                t('odorContaminationCause2'),
                t('odorContaminationCause3'),
                t('odorContaminationCause4')
            ],
            effects: [
                t('odorContaminationEffect1'),
                t('odorContaminationEffect2'),
                t('odorContaminationEffect3'),
                t('odorContaminationEffect4')
            ],
            solution: t('odorContaminationSolution'),
            solutionDesc: t('odorContaminationSolutionDesc'),
            color: 'from-teal-500 to-cyan-500',
            bgColor: 'bg-teal-50',
            borderColor: 'border-teal-100'
        },
        {
            id: 'clumping-caking',
            icon: Box,
            title: t('clumpingCakingTitle'),
            description: t('clumpingCakingDesc'),
            causes: [
                t('clumpingCakingCause1'),
                t('clumpingCakingCause2'),
                t('clumpingCakingCause3'),
                t('clumpingCakingCause4')
            ],
            effects: [
                t('clumpingCakingEffect1'),
                t('clumpingCakingEffect2'),
                t('clumpingCakingEffect3'),
                t('clumpingCakingEffect4')
            ],
            solution: t('clumpingCakingSolution'),
            solutionDesc: t('clumpingCakingSolutionDesc'),
            color: 'from-amber-500 to-yellow-500',
            bgColor: 'bg-amber-50',
            borderColor: 'border-amber-100'
        }
    ];

    const processSteps = [
        { 
            icon: Search, 
            number: t('step1Number'), 
            title: t('step1Title'),
            description: t('step1Desc'),
            details: [t('step1Detail1'), t('step1Detail2'), t('step1Detail3'), t('step1Detail4')]
        },
        { 
            icon: Palette, 
            number: t('step2Number'), 
            title: t('step2Title'),
            description: t('step2Desc'),
            details: [t('step2Detail1'), t('step2Detail2'), t('step2Detail3'), t('step2Detail4')]
        },
        { 
            icon: Rocket, 
            number: t('step3Number'), 
            title: t('step3Title'),
            description: t('step3Desc'),
            details: [t('step3Detail1'), t('step3Detail2'), t('step3Detail3'), t('step3Detail4')]
        },
    ];

    const statistics = [
        { value: '$25B+', label: t('statAnnualLoss'), icon: DollarSign, color: 'text-red-500' },
        { value: '10%', label: t('statAffected'), icon: Droplets, color: 'text-blue-500' },
        { value: '90%', label: t('statPreventable'), icon: ShieldCheck, color: 'text-green-500' },
        { value: '300%', label: t('statAbsorption'), icon: Zap, color: 'text-primary' },
    ];

    const benefits = [
        { icon: ShieldCheck, title: t('benefit1Title'), desc: t('benefit1Desc') },
        { icon: DollarSign, title: t('benefit2Title'), desc: t('benefit2Desc') },
        { icon: BadgeCheck, title: t('benefit3Title'), desc: t('benefit3Desc') },
        { icon: TrendingDown, title: t('benefit4Title'), desc: t('benefit4Desc') },
    ];

    return (
        <div className="min-h-screen bg-white pt-20">
            {/* Hero with Ocean Theme */}
            <div className="bg-gradient-to-br from-secondary via-secondary-dark to-primary/80 text-white py-28 px-4 relative overflow-hidden">
                {/* Ocean wave pattern background */}
                <OceanWavePattern className="text-white" />
                
                {/* Floating container ship */}
                <div className="absolute bottom-20 right-10 md:right-20 opacity-20 animate-float-ship">
                    <ContainerShipSilhouette className="w-40 md:w-64 text-white" />
                </div>
                
                {/* Droplet overlay */}
                <DropletPattern className="text-white opacity-10" />
                
                {/* Anchor decoration */}
                <div className="absolute top-20 left-10 opacity-10">
                    <Anchor className="w-20 h-20 text-white" />
                </div>
                
                <div className="container mx-auto max-w-5xl text-center relative z-10">
                    <div className="inline-flex items-center gap-2 bg-white/10 text-white/90 px-4 py-2 rounded-full text-sm font-semibold uppercase tracking-wider mb-6">
                        <Ship className="w-4 h-4" />
                        {t('heroBadge')}
                    </div>
                    <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 text-shadow-lg">
                        {t('heroTitle')}
                    </h1>
                    <p className="text-xl text-white/90 font-light max-w-3xl mx-auto leading-relaxed mb-8">
                        {t('heroSubtitle')}
                    </p>
                    <div className="flex flex-wrap justify-center gap-4">
                        <a href="#problems" className="btn-3d bg-white text-secondary hover:bg-gray-100 font-bold py-4 px-8 rounded-lg shadow-lg inline-flex items-center gap-2">
                            <Droplets className="w-5 h-5" />
                            {t('exploreProblems')}
                        </a>
                        <a href="#solutions" className="btn-3d bg-primary hover:bg-primary-dark text-white font-bold py-4 px-8 rounded-lg shadow-lg inline-flex items-center gap-2">
                            <ShieldCheck className="w-5 h-5" />
                            {t('viewSolutions')}
                        </a>
                    </div>
                </div>
                
                {/* Wave divider at bottom */}
                <WaveTop className="absolute -bottom-1 left-0" fill="#f9fafb" />
            </div>

            {/* Statistics Bar */}
            <div className="bg-gray-50 border-b border-gray-100 relative">
                <div className="container mx-auto px-6 py-10 max-w-6xl relative z-10">
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
                        {statistics.map((stat, idx) => (
                            <div key={idx} className="text-center">
                                <div className={`text-3xl md:text-4xl font-bold ${stat.color} mb-2`}>
                                    {stat.value}
                                </div>
                                <div className="text-sm text-slate">{stat.label}</div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* The Problem Overview */}
            <section className="py-20 bg-white relative overflow-hidden">
                {/* Subtle wave pattern */}
                <div className="absolute top-0 left-0 w-full opacity-5">
                    <svg viewBox="0 0 1440 60" className="w-full text-secondary">
                        <path fill="currentColor" d="M0,30 C240,60 480,0 720,30 C960,60 1200,0 1440,30 L1440,60 L0,60 Z" />
                    </svg>
                </div>
                
                <div className="container mx-auto px-6 max-w-6xl relative z-10">
                    <div className="bg-gradient-to-br from-red-50 to-orange-50 rounded-2xl border border-red-100 p-10 md:p-14 relative overflow-hidden">
                        {/* Decorative water drops */}
                        <div className="absolute top-4 right-4 opacity-20">
                            <Droplets className="w-12 h-12 text-red-400" />
                        </div>
                        <div className="absolute bottom-4 left-4 opacity-10">
                            <CloudRain className="w-16 h-16 text-red-400" />
                        </div>
                        
                        <div className="flex flex-col md:flex-row md:items-center gap-8 relative z-10">
                            <div className="flex-shrink-0">
                                <div className="w-20 h-20 bg-gradient-to-br from-red-500 to-orange-500 rounded-2xl flex items-center justify-center shadow-lg">
                                    <AlertTriangle className="w-10 h-10 text-white" />
                                </div>
                            </div>
                            <div>
                                <span className="text-red-500 font-semibold text-sm uppercase tracking-wider">{t('problemBadge')}</span>
                                <h2 className="text-3xl md:text-4xl font-bold text-secondary mt-2 mb-4">{t('problemTitle')}</h2>
                                <p className="text-slate text-lg leading-relaxed mb-4">
                                    {t('problemP1')}
                                </p>
                                <p className="text-slate text-lg leading-relaxed">
                                    {t('problemP2')}
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Moisture Problems & Solutions */}
            <section id="problems" className="py-20 bg-gray-50 scroll-mt-24 relative overflow-hidden">
                {/* Wave pattern at top */}
                <WaveBottom className="absolute -top-1 left-0" fill="#ffffff" />
                
                {/* Subtle ocean wave decoration */}
                <div className="absolute bottom-0 left-0 w-full opacity-5 pointer-events-none">
                    <svg viewBox="0 0 1440 100" className="w-full text-secondary">
                        <path fill="currentColor" d="M0,50 Q360,100 720,50 T1440,50 L1440,100 L0,100 Z" />
                    </svg>
                </div>

                <div className="container mx-auto px-6 max-w-6xl relative z-10">
                    <div className="text-center mb-16">
                        <div className="inline-flex items-center gap-2 text-primary font-semibold text-sm uppercase tracking-wider mb-4">
                            <CloudRain className="w-4 h-4" />
                            {t('challengesBadge')}
                        </div>
                        <h2 className="text-3xl md:text-4xl font-bold text-secondary mb-4">{t('challengesTitle')}</h2>
                        <p className="text-slate max-w-2xl mx-auto">
                            {t('challengesSubtitle')}
                        </p>
                    </div>

                    <div className="space-y-8">
                        {moistureProblems.map((problem, idx) => (
                            <div 
                                key={problem.id || `problem-${idx}`}
                                id={problem.id}
                                className={`${problem.bgColor} ${problem.borderColor} border rounded-2xl overflow-hidden scroll-mt-24 relative`}
                            >
                                {/* Subtle water texture */}
                                <div className="absolute inset-0 opacity-5 pointer-events-none">
                                    <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
                                        <defs>
                                            <pattern id={`waves-${problem.id}`} x="0" y="0" width="100" height="20" patternUnits="userSpaceOnUse">
                                                <path d="M0,10 Q25,0 50,10 T100,10" fill="none" stroke="currentColor" strokeWidth="1" />
                                            </pattern>
                                        </defs>
                                        <rect width="100%" height="100%" fill={`url(#waves-${problem.id})`} />
                                    </svg>
                                </div>
                                
                                <div className="p-8 md:p-10 relative z-10">
                                    {/* Header */}
                                    <div className="flex flex-col lg:flex-row lg:items-start gap-6 mb-8">
                                        <div className={`w-16 h-16 bg-gradient-to-br ${problem.color} rounded-2xl flex items-center justify-center shadow-lg flex-shrink-0`}>
                                            <problem.icon className="w-8 h-8 text-white" />
                                        </div>
                                        <div className="flex-1">
                                            <div className="flex items-center gap-3 mb-2">
                                                <span className="text-xs font-bold uppercase tracking-wider text-slate bg-white/80 px-3 py-1 rounded-full">
                                                    {t('problemNumber')}{idx + 1}
                                                </span>
                                            </div>
                                            <h3 className="text-2xl md:text-3xl font-bold text-secondary mb-3">{problem.title}</h3>
                                            <p className="text-slate text-lg leading-relaxed">{problem.description}</p>
                                        </div>
                                    </div>

                                    {/* Causes & Effects Grid */}
                                    <div className="grid md:grid-cols-2 gap-6 mb-8">
                                        {/* Causes */}
                                        <div className="bg-white rounded-xl p-6 shadow-sm">
                                            <h4 className="font-bold text-secondary mb-4 flex items-center gap-2">
                                                <CircleDot className="w-5 h-5 text-orange-500" />
                                                {t('commonCauses')}
                                            </h4>
                                            <ul className="space-y-3">
                                                {problem.causes.map((cause, i) => (
                                                    <li key={i} className="flex items-start gap-3 text-slate">
                                                        <span className="w-1.5 h-1.5 bg-orange-400 rounded-full mt-2 flex-shrink-0"></span>
                                                        {cause}
                                                    </li>
                                                ))}
                                            </ul>
                                        </div>

                                        {/* Effects */}
                                        <div className="bg-white rounded-xl p-6 shadow-sm">
                                            <h4 className="font-bold text-secondary mb-4 flex items-center gap-2">
                                                <XCircle className="w-5 h-5 text-red-500" />
                                                {t('negativeEffects')}
                                            </h4>
                                            <ul className="space-y-3">
                                                {problem.effects.map((effect, i) => (
                                                    <li key={i} className="flex items-start gap-3 text-slate">
                                                        <span className="w-1.5 h-1.5 bg-red-400 rounded-full mt-2 flex-shrink-0"></span>
                                                        {effect}
                                                    </li>
                                                ))}
                                            </ul>
                                        </div>
                                    </div>

                                    {/* Solution */}
                                    <div className={`bg-gradient-to-r ${problem.color} rounded-xl p-6 text-white relative overflow-hidden`}>
                                        {/* Wave accent */}
                                        <div className="absolute bottom-0 right-0 opacity-20">
                                            <svg width="120" height="60" viewBox="0 0 120 60">
                                                <path d="M0,30 Q30,0 60,30 T120,30 L120,60 L0,60 Z" fill="white" />
                                            </svg>
                                        </div>
                                        
                                        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 relative z-10">
                                            <div>
                                                <span className="text-white/80 text-sm font-medium uppercase tracking-wider flex items-center gap-2">
                                                    <ShieldCheck className="w-4 h-4" />
                                                    {t('recommendedSolution')}
                                                </span>
                                                <h4 className="text-xl font-bold mt-1">{problem.solution}</h4>
                                                <p className="text-white/90 mt-2 max-w-xl">{problem.solutionDesc}</p>
                                            </div>
                                            <Link 
                                                href="/products"
                                                className="inline-flex items-center gap-2 bg-white text-secondary hover:bg-gray-100 font-bold py-3 px-6 rounded-lg transition-all shadow-lg flex-shrink-0"
                                            >
                                                {t('viewProduct')}
                                                <ArrowRight className="w-5 h-5" />
                                            </Link>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Our Process */}
            <section id="solutions" className="py-20 bg-white scroll-mt-24 relative overflow-hidden">
                {/* Wave top */}
                <WaveBottom className="absolute -top-1 left-0" fill="#f9fafb" />
                
                {/* Container ship decoration */}
                <div className="absolute bottom-10 left-10 opacity-5 pointer-events-none">
                    <ContainerShipSilhouette className="w-48 text-secondary" />
                </div>
                
                <div className="container mx-auto px-6 max-w-6xl relative z-10">
                    <div className="text-center mb-16">
                        <div className="inline-flex items-center gap-2 text-primary font-semibold text-sm uppercase tracking-wider mb-4">
                            <Ship className="w-4 h-4" />
                            {t('processBadge')}
                        </div>
                        <h2 className="text-3xl md:text-4xl font-bold text-secondary mb-4">{t('processTitle')}</h2>
                        <p className="text-slate max-w-2xl mx-auto">
                            {t('processSubtitle')}
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {processSteps.map((step, idx) => (
                            <div key={idx} className="relative bg-white p-8 rounded-2xl border border-gray-100 shadow-float hover:shadow-xl transition-all group card-3d">
                                {/* Connector Line */}
                                {idx < 2 && (
                                    <div className="hidden md:block absolute top-1/2 -right-4 w-8 h-0.5 bg-gray-200 z-10" />
                                )}
                                
                                <div className="flex items-center gap-4 mb-6">
                                    <div className="w-14 h-14 bg-primary/10 rounded-xl flex items-center justify-center group-hover:bg-primary transition-colors">
                                        <step.icon className="w-7 h-7 text-primary group-hover:text-white transition-colors" />
                                    </div>
                                    <span className="text-5xl font-bold text-gray-100 group-hover:text-primary/20 transition-colors">
                                        {step.number}
                                    </span>
                                </div>
                                
                                <h3 className="text-xl font-bold text-secondary mb-4">{step.title}</h3>
                                <p className="text-slate leading-relaxed mb-6">{step.description}</p>
                                
                                <ul className="space-y-2">
                                    {step.details.map((detail, i) => (
                                        <li key={i} className="flex items-center gap-2 text-sm text-slate">
                                            <CheckCircle className="w-4 h-4 text-primary" />
                                            {detail}
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Benefits Section */}
            <section className="py-20 bg-gray-50 relative overflow-hidden">
                {/* Wave pattern */}
                <WaveBottom className="absolute -top-1 left-0" fill="#ffffff" />
                
                {/* Ocean decoration */}
                <div className="absolute inset-0 pointer-events-none">
                    <svg className="absolute bottom-0 left-0 w-full h-32 opacity-5" viewBox="0 0 1440 120" preserveAspectRatio="none">
                        <path fill="currentColor" className="text-secondary" d="M0,60 C320,120 640,0 960,60 C1280,120 1440,40 1440,40 L1440,120 L0,120 Z" />
                    </svg>
                </div>
                
                <div className="container mx-auto px-6 max-w-6xl relative z-10">
                    <div className="text-center mb-16">
                        <div className="inline-flex items-center gap-2 text-primary font-semibold text-sm uppercase tracking-wider mb-4">
                            <Anchor className="w-4 h-4" />
                            {t('benefitsBadge')}
                        </div>
                        <h2 className="text-3xl md:text-4xl font-bold text-secondary mb-4">{t('benefitsTitle')}</h2>
                    </div>

                    <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                        {benefits.map((benefit, idx) => (
                            <div key={idx} className="bg-white rounded-xl p-6 shadow-float hover:shadow-xl transition-all border border-gray-100 text-center card-3d relative overflow-hidden">
                                {/* Subtle wave accent */}
                                <div className="absolute bottom-0 left-0 w-full opacity-5">
                                    <svg viewBox="0 0 100 20" className="w-full text-primary">
                                        <path fill="currentColor" d="M0,10 Q25,0 50,10 T100,10 L100,20 L0,20 Z" />
                                    </svg>
                                </div>
                                
                                <div className="w-14 h-14 bg-primary/10 rounded-xl flex items-center justify-center mx-auto mb-4 icon-3d relative z-10">
                                    <benefit.icon className="w-7 h-7 text-primary" />
                                </div>
                                <h3 className="text-lg font-bold text-secondary mb-2 relative z-10">{benefit.title}</h3>
                                <p className="text-slate text-sm relative z-10">{benefit.desc}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Industries Affected */}
            <section className="py-20 bg-white relative overflow-hidden">
                <WaveBottom className="absolute -top-1 left-0" fill="#f9fafb" />
                
                <div className="container mx-auto px-6 max-w-6xl relative z-10">
                    <div className="bg-gradient-to-br from-secondary to-secondary-dark rounded-2xl p-10 md:p-14 text-white relative overflow-hidden">
                        {/* Ocean wave decoration */}
                        <OceanWavePattern className="text-white" />
                        
                        {/* Ship silhouette */}
                        <div className="absolute top-10 right-10 opacity-10">
                            <ContainerShipSilhouette className="w-40 text-white" />
                        </div>
                        
                        <div className="text-center mb-10 relative z-10">
                            <div className="inline-flex items-center gap-2 text-primary font-semibold text-sm uppercase tracking-wider mb-4">
                                <Ship className="w-4 h-4" />
                                {t('industriesBadge')}
                            </div>
                            <h2 className="text-3xl md:text-4xl font-bold mb-4">{t('industriesTitle')}</h2>
                            <p className="text-white/80 max-w-2xl mx-auto">
                                {t('industriesSubtitle')}
                            </p>
                        </div>

                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 relative z-10">
                            {[
                                { icon: Leaf, name: t('industryAgriculture') },
                                { icon: Package, name: t('industryTextiles') },
                                { icon: Factory, name: t('industryManufacturing') },
                                { icon: Ship, name: t('industryLogistics') },
                                { icon: Box, name: t('industryFoodBeverage') },
                                { icon: Warehouse, name: t('industryWarehousing') },
                                { icon: Factory, name: t('industryAutomotive') },
                                { icon: Package, name: t('industryElectronics') },
                            ].map((industry, idx) => (
                                <div key={idx} className="bg-white/10 backdrop-blur-sm rounded-xl p-4 text-center hover:bg-white/20 transition-colors border border-white/10">
                                    <industry.icon className="w-8 h-8 text-primary mx-auto mb-2" />
                                    <span className="text-sm font-medium">{industry.name}</span>
                                </div>
                            ))}
                        </div>

                        <div className="text-center mt-10 relative z-10">
                            <Link 
                                href="/solutions-by-industry"
                                className="inline-flex items-center gap-2 text-primary font-semibold hover:underline"
                            >
                                {t('viewSolutionsByIndustry')}
                                <ArrowRight className="w-5 h-5" />
                            </Link>
                        </div>
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section className="py-16 bg-gradient-to-r from-primary to-primary-dark relative overflow-hidden">
                {/* Wave decoration */}
                <div className="absolute inset-0 pointer-events-none">
                    <svg className="absolute top-0 left-0 w-full h-20 opacity-10" viewBox="0 0 1440 80" preserveAspectRatio="none">
                        <path fill="white" d="M0,40 C360,80 720,0 1080,40 C1440,80 1440,0 1440,0 L1440,80 L0,80 Z" />
                    </svg>
                    <svg className="absolute bottom-0 left-0 w-full h-20 opacity-10" viewBox="0 0 1440 80" preserveAspectRatio="none">
                        <path fill="white" d="M0,40 C360,0 720,80 1080,40 C1440,0 1440,80 1440,80 L1440,0 L0,0 Z" />
                    </svg>
                </div>
                
                {/* Anchor decoration */}
                <div className="absolute right-10 top-1/2 -translate-y-1/2 opacity-10">
                    <Anchor className="w-32 h-32 text-white" />
                </div>
                
                <div className="container mx-auto px-6 text-center relative z-10">
                    <div className="inline-flex items-center gap-2 text-white/80 text-sm font-semibold uppercase tracking-wider mb-4">
                        <Ship className="w-4 h-4" />
                        {t('ctaBadge')}
                    </div>
                    <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">{t('ctaTitle')}</h2>
                    <p className="text-white/80 text-lg mb-8 max-w-2xl mx-auto">
                        {t('ctaDescription')}
                    </p>
                    <div className="flex flex-wrap justify-center gap-4">
                        <Link 
                            href="/contact" 
                            className="btn-3d inline-flex items-center gap-2 bg-white text-primary hover:bg-gray-100 font-bold py-4 px-8 rounded-lg shadow-lg"
                        >
                            <Anchor className="w-5 h-5" />
                            {t('ctaGetConsultation')}
                        </Link>
                        <Link 
                            href="/products" 
                            className="btn-3d inline-flex items-center gap-2 bg-secondary hover:bg-secondary-dark text-white font-bold py-4 px-8 rounded-lg shadow-lg"
                        >
                            {t('ctaBrowseProducts')}
                            <ArrowRight className="w-5 h-5" />
                        </Link>
                </div>
            </div>
            </section>
            <Footer />
        </div>
    );
}
