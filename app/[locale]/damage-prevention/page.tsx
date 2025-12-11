import { getTranslations } from 'next-intl/server';
import { 
    Search, Palette, Rocket, CheckCircle, Droplets, CloudRain, 
    AlertTriangle, Package, Thermometer, Wind, ShieldCheck, 
    Zap, ArrowRight, Factory, Ship, Warehouse, Box, Leaf,
    CircleDot, TrendingDown, DollarSign, XCircle, BadgeCheck
} from 'lucide-react';
import Link from 'next/link';

export default async function DamagePreventionPage() {
    const t = await getTranslations('DamagePreventionPage');

    const moistureProblems = [
        {
            id: 'container-rain',
            icon: CloudRain,
            title: 'Container Rain (Container Sweat)',
            description: 'When warm, moist air inside a shipping container meets the cold steel walls, condensation forms and drips onto cargo like rain.',
            causes: [
                'Temperature fluctuations during transit',
                'High humidity cargo or packaging',
                'Inadequate ventilation',
                'Long voyage durations'
            ],
            effects: [
                'Water damage to packaging',
                'Product contamination',
                'Mold and mildew growth',
                'Complete cargo rejection'
            ],
            solution: 'DryON Container Desiccants',
            solutionDesc: 'Our calcium chloride-based container desiccants absorb up to 300% of their weight in moisture, preventing condensation before it forms.',
            color: 'from-blue-500 to-cyan-500',
            bgColor: 'bg-blue-50',
            borderColor: 'border-blue-100'
        },
        {
            id: 'mold-mildew',
            icon: Leaf,
            title: 'Mold & Mildew Growth',
            description: 'Fungal growth thrives in humid environments, spreading rapidly across organic materials and contaminating entire shipments.',
            causes: [
                'Relative humidity above 65%',
                'Organic material presence',
                'Poor air circulation',
                'Extended storage periods'
            ],
            effects: [
                'Health hazards',
                'Permanent product damage',
                'Unpleasant odors',
                'Regulatory rejection'
            ],
            solution: 'Super DryON In-Box Desiccants',
            solutionDesc: 'Placed directly with products, Super DryON maintains safe humidity levels within cartons and prevents fungal growth at the source.',
            color: 'from-green-500 to-emerald-500',
            bgColor: 'bg-green-50',
            borderColor: 'border-green-100'
        },
        {
            id: 'rust-corrosion',
            icon: Factory,
            title: 'Rust & Corrosion',
            description: 'Metal components and machinery suffer irreversible damage when exposed to moisture, leading to costly replacements and repairs.',
            causes: [
                'Salt-laden sea air',
                'Condensation on metal surfaces',
                'Electrolytic corrosion',
                'Prolonged moisture exposure'
            ],
            effects: [
                'Equipment malfunction',
                'Structural weakness',
                'Safety hazards',
                'Warranty claims'
            ],
            solution: 'DryON + VCI Technology',
            solutionDesc: 'Combining our desiccants with Vapor Corrosion Inhibitor packaging provides comprehensive metal protection during transit.',
            color: 'from-orange-500 to-red-500',
            bgColor: 'bg-orange-50',
            borderColor: 'border-orange-100'
        },
        {
            id: 'cargo-sweat',
            icon: Thermometer,
            title: 'Cargo Sweat',
            description: 'When cargo temperature is lower than the dew point of surrounding air, moisture condenses directly on product surfaces.',
            causes: [
                'Cold cargo loaded in warm environments',
                'Hygroscopic products',
                'Inadequate pre-conditioning',
                'Climate transitions during voyage'
            ],
            effects: [
                'Surface moisture damage',
                'Label and packaging deterioration',
                'Product clumping and caking',
                'Quality degradation'
            ],
            solution: 'GreenPro Transafeliners',
            solutionDesc: 'Our hermetic liners create a protective barrier around cargo, controlling the micro-environment and preventing moisture exchange.',
            color: 'from-purple-500 to-violet-500',
            bgColor: 'bg-purple-50',
            borderColor: 'border-purple-100'
        },
        {
            id: 'odor-contamination',
            icon: Wind,
            title: 'Odor & Contamination',
            description: 'Musty odors develop from moisture-related bacterial and fungal activity, permanently affecting product appeal and saleability.',
            causes: [
                'Microbial growth',
                'Chemical reactions with moisture',
                'Cross-contamination',
                'Decomposition of organic matter'
            ],
            effects: [
                'Consumer complaints',
                'Brand reputation damage',
                'Product returns',
                'Loss of repeat business'
            ],
            solution: 'FreshON Absorbers',
            solutionDesc: 'Beyond moisture control, FreshON absorbs ethylene and odors, keeping products fresh and market-ready upon arrival.',
            color: 'from-teal-500 to-cyan-500',
            bgColor: 'bg-teal-50',
            borderColor: 'border-teal-100'
        },
        {
            id: 'clumping-caking',
            icon: Box,
            title: 'Clumping & Caking',
            description: 'Powdered and granular products absorb moisture and bind together, making them unusable and impossible to sell.',
            causes: [
                'Hygroscopic nature of products',
                'High ambient humidity',
                'Packaging permeability',
                'Temperature cycling'
            ],
            effects: [
                'Product unusability',
                'Processing difficulties',
                'Complete batch rejection',
                'Customer dissatisfaction'
            ],
            solution: 'DryPak ECO Sachets',
            solutionDesc: 'Our eco-friendly desiccant sachets placed within product packaging maintain optimal moisture levels throughout the supply chain.',
            color: 'from-amber-500 to-yellow-500',
            bgColor: 'bg-amber-50',
            borderColor: 'border-amber-100'
        }
    ];

    const processSteps = [
        { 
            icon: Search, 
            number: '01', 
            title: 'Risk Assessment',
            description: 'We analyze your cargo type, route, transit duration, and seasonal conditions to identify specific moisture risks.',
            details: ['Cargo moisture content analysis', 'Route climate mapping', 'Historical damage review', 'Container condition assessment']
        },
        { 
            icon: Palette, 
            number: '02', 
            title: 'Solution Design',
            description: 'Our experts design a customized protection strategy combining the right products in optimal quantities.',
            details: ['Product selection', 'Quantity calculation', 'Placement planning', 'Cost optimization']
        },
        { 
            icon: Rocket, 
            number: '03', 
            title: 'Implementation',
            description: 'We guide proper installation and provide training to ensure consistent, effective protection.',
            details: ['Installation guidance', 'Staff training', 'Quality monitoring', 'Continuous support']
        },
    ];

    const statistics = [
        { value: '$25B+', label: 'Annual Global Cargo Loss', icon: DollarSign, color: 'text-red-500' },
        { value: '10%', label: 'Shipments Affected by Moisture', icon: Droplets, color: 'text-blue-500' },
        { value: '90%', label: 'Preventable with Desiccants', icon: ShieldCheck, color: 'text-green-500' },
        { value: '300%', label: 'DryON Absorption Capacity', icon: Zap, color: 'text-primary' },
    ];

    const benefits = [
        { icon: ShieldCheck, title: 'Complete Protection', desc: 'Safeguard cargo from all moisture-related damage' },
        { icon: DollarSign, title: 'Cost-Effective', desc: 'Prevent losses that far exceed protection costs' },
        { icon: BadgeCheck, title: 'Quality Assurance', desc: 'Maintain product quality throughout transit' },
        { icon: TrendingDown, title: 'Risk Reduction', desc: 'Minimize claims, rejections, and reputation damage' },
    ];

    return (
        <div className="min-h-screen bg-white pt-20">
            {/* Hero */}
            <div className="bg-gradient-to-br from-secondary via-secondary-dark to-primary/80 text-white py-28 px-4 relative overflow-hidden">
                <div className="absolute inset-0 bg-[url('/images/pattern.svg')] opacity-5" />
                <div className="container mx-auto max-w-5xl text-center relative z-10">
                    <span className="inline-block bg-white/10 text-white/90 px-4 py-2 rounded-full text-sm font-semibold uppercase tracking-wider mb-6">
                        Comprehensive Protection Solutions
                    </span>
                    <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 text-shadow-lg">
                        Moisture & Damage Prevention
                    </h1>
                    <p className="text-xl text-white/90 font-light max-w-3xl mx-auto leading-relaxed mb-8">
                        Understanding moisture damage is the first step to prevention. Explore the common challenges faced during cargo transportation and discover our proven solutions.
                    </p>
                    <div className="flex flex-wrap justify-center gap-4">
                        <a href="#problems" className="btn-3d bg-white text-secondary hover:bg-gray-100 font-bold py-4 px-8 rounded-lg shadow-lg">
                            Explore Problems
                        </a>
                        <a href="#solutions" className="btn-3d bg-primary hover:bg-primary-dark text-white font-bold py-4 px-8 rounded-lg shadow-lg">
                            View Solutions
                        </a>
                    </div>
                </div>
            </div>

            {/* Statistics Bar */}
            <div className="bg-gray-50 border-b border-gray-100">
                <div className="container mx-auto px-6 py-10 max-w-6xl">
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
            <section className="py-20 bg-white">
                <div className="container mx-auto px-6 max-w-6xl">
                    <div className="bg-gradient-to-br from-red-50 to-orange-50 rounded-2xl border border-red-100 p-10 md:p-14">
                        <div className="flex flex-col md:flex-row md:items-center gap-8">
                            <div className="flex-shrink-0">
                                <div className="w-20 h-20 bg-gradient-to-br from-red-500 to-orange-500 rounded-2xl flex items-center justify-center shadow-lg">
                                    <AlertTriangle className="w-10 h-10 text-white" />
                                </div>
                            </div>
                            <div>
                                <span className="text-red-500 font-semibold text-sm uppercase tracking-wider">The Global Challenge</span>
                                <h2 className="text-3xl md:text-4xl font-bold text-secondary mt-2 mb-4">Understanding Moisture Damage</h2>
                                <p className="text-slate text-lg leading-relaxed mb-4">
                                    Every year, billions of dollars worth of cargo is damaged or destroyed due to moisture-related issues during shipping. From container rain to mold growth, these preventable problems affect industries worldwide.
                                </p>
                                <p className="text-slate text-lg leading-relaxed">
                                    The good news? <strong className="text-secondary">Over 90% of moisture damage is preventable</strong> with proper understanding and the right protection solutions. Below, we break down the most common moisture challenges and how DryON products address each one.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Moisture Problems & Solutions */}
            <section id="problems" className="py-20 bg-gray-50 scroll-mt-24">
                <div className="container mx-auto px-6 max-w-6xl">
                    <div className="text-center mb-16">
                        <span className="text-primary font-semibold text-sm uppercase tracking-wider mb-4 block">Common Challenges</span>
                        <h2 className="text-3xl md:text-4xl font-bold text-secondary mb-4">Types of Moisture Damage</h2>
                        <p className="text-slate max-w-2xl mx-auto">
                            Click on each problem to understand its causes, effects, and our recommended solution.
                        </p>
                    </div>

                    <div className="space-y-8">
                        {moistureProblems.map((problem, idx) => (
                            <div 
                                key={problem.id}
                                id={problem.id}
                                className={`${problem.bgColor} ${problem.borderColor} border rounded-2xl overflow-hidden scroll-mt-24`}
                            >
                                <div className="p-8 md:p-10">
                                    {/* Header */}
                                    <div className="flex flex-col lg:flex-row lg:items-start gap-6 mb-8">
                                        <div className={`w-16 h-16 bg-gradient-to-br ${problem.color} rounded-2xl flex items-center justify-center shadow-lg flex-shrink-0`}>
                                            <problem.icon className="w-8 h-8 text-white" />
                                        </div>
                                        <div className="flex-1">
                                            <div className="flex items-center gap-3 mb-2">
                                                <span className="text-xs font-bold uppercase tracking-wider text-slate bg-white/80 px-3 py-1 rounded-full">
                                                    Problem #{idx + 1}
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
                                                Common Causes
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
                                                Negative Effects
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
                                    <div className={`bg-gradient-to-r ${problem.color} rounded-xl p-6 text-white`}>
                                        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                                            <div>
                                                <span className="text-white/80 text-sm font-medium uppercase tracking-wider">Recommended Solution</span>
                                                <h4 className="text-xl font-bold mt-1">{problem.solution}</h4>
                                                <p className="text-white/90 mt-2 max-w-xl">{problem.solutionDesc}</p>
                                            </div>
                                            <Link 
                                                href="/products"
                                                className="inline-flex items-center gap-2 bg-white text-secondary hover:bg-gray-100 font-bold py-3 px-6 rounded-lg transition-all shadow-lg flex-shrink-0"
                                            >
                                                View Product
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
            <section id="solutions" className="py-20 bg-white scroll-mt-24">
                <div className="container mx-auto px-6 max-w-6xl">
                    <div className="text-center mb-16">
                        <span className="text-primary font-semibold text-sm uppercase tracking-wider mb-4 block">How We Work</span>
                        <h2 className="text-3xl md:text-4xl font-bold text-secondary mb-4">Our Protection Process</h2>
                        <p className="text-slate max-w-2xl mx-auto">
                            A systematic approach to identify, address, and prevent moisture damage in your supply chain.
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
            <section className="py-20 bg-gray-50">
                <div className="container mx-auto px-6 max-w-6xl">
                    <div className="text-center mb-16">
                        <span className="text-primary font-semibold text-sm uppercase tracking-wider mb-4 block">Why Choose DryON</span>
                        <h2 className="text-3xl md:text-4xl font-bold text-secondary mb-4">Benefits of Proper Protection</h2>
                    </div>

                    <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                        {benefits.map((benefit, idx) => (
                            <div key={idx} className="bg-white rounded-xl p-6 shadow-float hover:shadow-xl transition-all border border-gray-100 text-center card-3d">
                                <div className="w-14 h-14 bg-primary/10 rounded-xl flex items-center justify-center mx-auto mb-4 icon-3d">
                                    <benefit.icon className="w-7 h-7 text-primary" />
                                </div>
                                <h3 className="text-lg font-bold text-secondary mb-2">{benefit.title}</h3>
                                <p className="text-slate text-sm">{benefit.desc}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Industries Affected */}
            <section className="py-20 bg-white">
                <div className="container mx-auto px-6 max-w-6xl">
                    <div className="bg-gradient-to-br from-secondary to-secondary-dark rounded-2xl p-10 md:p-14 text-white">
                        <div className="text-center mb-10">
                            <h2 className="text-3xl md:text-4xl font-bold mb-4">Industries Most Affected</h2>
                            <p className="text-white/80 max-w-2xl mx-auto">
                                Moisture damage impacts virtually every industry involved in shipping and storage. Here are the sectors where protection is most critical.
                            </p>
                        </div>

                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                            {[
                                { icon: Leaf, name: 'Agriculture' },
                                { icon: Package, name: 'Textiles' },
                                { icon: Factory, name: 'Manufacturing' },
                                { icon: Ship, name: 'Logistics' },
                                { icon: Box, name: 'Food & Beverage' },
                                { icon: Warehouse, name: 'Warehousing' },
                                { icon: Factory, name: 'Automotive' },
                                { icon: Package, name: 'Electronics' },
                            ].map((industry, idx) => (
                                <div key={idx} className="bg-white/10 rounded-xl p-4 text-center hover:bg-white/20 transition-colors">
                                    <industry.icon className="w-8 h-8 text-primary mx-auto mb-2" />
                                    <span className="text-sm font-medium">{industry.name}</span>
                                </div>
                            ))}
                        </div>

                        <div className="text-center mt-10">
                            <Link 
                                href="/solutions-by-industry"
                                className="inline-flex items-center gap-2 text-primary font-semibold hover:underline"
                            >
                                View Solutions by Industry
                                <ArrowRight className="w-5 h-5" />
                            </Link>
                        </div>
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section className="py-16 bg-gradient-to-r from-primary to-primary-dark">
                <div className="container mx-auto px-6 text-center">
                    <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">Ready to Protect Your Cargo?</h2>
                    <p className="text-white/80 text-lg mb-8 max-w-2xl mx-auto">
                        Let our experts analyze your specific needs and create a customized protection plan that eliminates moisture damage from your supply chain.
                    </p>
                    <div className="flex flex-wrap justify-center gap-4">
                        <Link 
                            href="/contact" 
                            className="btn-3d inline-flex items-center gap-2 bg-white text-primary hover:bg-gray-100 font-bold py-4 px-8 rounded-lg shadow-lg"
                        >
                            Get Free Consultation
                        </Link>
                        <Link 
                            href="/products" 
                            className="btn-3d inline-flex items-center gap-2 bg-secondary hover:bg-secondary-dark text-white font-bold py-4 px-8 rounded-lg shadow-lg"
                        >
                            Browse Products
                            <ArrowRight className="w-5 h-5" />
                        </Link>
                </div>
            </div>
            </section>
        </div>
    );
}
