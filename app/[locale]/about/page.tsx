import { Target, Users, Globe2, Award, MapPin, History, CheckCircle, Building2, Ship, Leaf, Package, Factory, Car, Shirt, Apple, Wrench, Sun, TreePine, Recycle, RefreshCw } from 'lucide-react';
import { getTranslations } from 'next-intl/server';
import Image from 'next/image';

export default async function AboutPage() {
    const t = await getTranslations('AboutPage');

    const achievements = [
        {
            icon: Award,
            title: 'Renowned Manufacturer & Exporter',
            description: 'Leading manufacturer and exporter in Pakistan for sustainable and high-performance moisture-control solutions for long sea voyages.'
        },
        {
            icon: Globe2,
            title: 'USAID Grant Recipient',
            description: 'Recognized for our contribution to moisture damage prevention solutions and supply-chain improvement.'
        },
        {
            icon: CheckCircle,
            title: 'DUNS Registered',
            description: 'Recognized by leading exporters and manufacturers worldwide for our reliability and quality standards.'
        },
        {
            icon: Factory,
            title: 'In-House Testing Facility',
            description: 'Environmental-chamber testing facility enabling real-time shipping challenges simulation under extreme conditions.'
        },
    ];

    const industries = [
        { icon: Leaf, name: 'Agriculture' },
        { icon: Apple, name: 'Dry Fruits' },
        { icon: Shirt, name: 'Textile Apparels' },
        { icon: Package, name: 'Leather Goods' },
        { icon: Apple, name: 'Processed Food' },
        { icon: Package, name: 'Canned Items' },
        { icon: Wrench, name: 'Engineering Goods' },
        { icon: Car, name: 'Auto-motives' },
        { icon: Ship, name: 'Transportation & Logistics' },
    ];

    // const branches = [
    //     {
    //         city: 'Lahore',
    //         type: 'Head Office',
    //         description: 'Our main headquarters and primary operations center',
    //         isHQ: true
    //     },
    //     {
    //         city: 'Karachi',
    //         type: 'Distribution Center',
    //         description: 'Serving the southern region and port operations',
    //         isHQ: false
    //     },
    //     {
    //         city: 'Sialkot',
    //         type: 'Regional Office',
    //         description: 'Supporting the sports goods and leather industry',
    //         isHQ: false
    //     },
    //     {
    //         city: 'Faisalabad',
    //         type: 'Regional Office',
    //         description: 'Serving the textile hub of Pakistan',
    //         isHQ: false
    //     },
    //     {
    //         city: 'Multan',
    //         type: 'Regional Office',
    //         description: 'Supporting agricultural exports',
    //         isHQ: false
    //     },
    // ];

    return (
        <div className="min-h-screen bg-white pt-20">
            {/* Hero */}
            <div className="bg-gradient-to-br from-secondary via-secondary-dark to-primary/80 text-white py-28 px-4 relative overflow-hidden">
                <div className="absolute inset-0 bg-[url('/images/pattern.svg')] opacity-5" />
                <div className="container mx-auto max-w-4xl text-center relative z-10">
                    <span className="inline-block bg-white/10 text-white/90 px-4 py-2 rounded-full text-sm font-semibold uppercase tracking-wider mb-6">
                        Who We Are
                    </span>
                    <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 text-shadow-lg">About DryON</h1>
                    <p className="text-xl text-white/90 font-light max-w-2xl mx-auto leading-relaxed">
                        Pakistan&apos;s leading manufacturer and exporter of moisture-control and cargo-protection solutions
                    </p>
                </div>
            </div>

            {/* DryON at a Glance */}
            <section className="py-20 bg-white">
                <div className="container mx-auto px-6 max-w-6xl">
                    <div className="grid lg:grid-cols-2 gap-16 items-center">
                        <div>
                            <span className="text-primary font-semibold text-sm uppercase tracking-wider mb-4 block">Company Overview</span>
                            <h2 className="text-3xl md:text-4xl font-bold text-secondary mb-8">DryON at a Glance</h2>
                            
                            <div className="space-y-6 text-slate leading-relaxed">
                                <p>
                                    DryON is a leading manufacturer and exporter of moisture-control and cargo-protection solutions in Pakistan. We specialize in high-performance calcium chloride–based desiccants, and TransafeLiners using Hermetic Technology used across warehousing, export, and logistics industries to safeguard the valuable cargo from moisture damage during long sea voyages.
                                </p>
                                <p>
                                    We collaborated with global technology partners from China and Europe and invested in advanced testing capabilities, including an EU-grade environmental chamber. This allows us to simulate real-time extreme humidity and temperature conditions and ensure every DryON product performs reliably throughout the transit.
                                </p>
                                <p className="font-medium text-secondary">
                                    All our products are proudly manufactured in Pakistan, supporting the domestic-led industrialization while maintaining international-standard quality.
                                </p>
                            </div>
                        </div>
                        
                        <div className="relative">
                            <div className="bg-gradient-to-br from-primary/10 to-secondary/10 rounded-2xl p-8 shadow-float-lg">
                                <div className="grid grid-cols-2 gap-6">
                                    <div className="bg-white rounded-xl p-6 shadow-md text-center card-3d">
                                        <div className="text-4xl font-bold text-primary mb-2">100%</div>
                                        <div className="text-sm text-slate">Made in Pakistan</div>
                                    </div>
                                    <div className="bg-white rounded-xl p-6 shadow-md text-center card-3d">
                                        <div className="text-4xl font-bold text-secondary mb-2">EU</div>
                                        <div className="text-sm text-slate">Grade Testing</div>
                                    </div>
                                    <div className="bg-white rounded-xl p-6 shadow-md text-center card-3d">
                                        <div className="text-4xl font-bold text-primary mb-2">9+</div>
                                        <div className="text-sm text-slate">Industries Served</div>
                                    </div>
                                    <div className="bg-white rounded-xl p-6 shadow-md text-center card-3d">
                                        <div className="text-4xl font-bold text-secondary mb-2">5+</div>
                                        <div className="text-sm text-slate">Cities Covered</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Achievements */}
            <section id="achievements" className="py-20 bg-gray-50 scroll-mt-24">
                <div className="container mx-auto px-6 max-w-6xl">
                    <div className="text-center mb-16">
                        <span className="text-primary font-semibold text-sm uppercase tracking-wider mb-4 block">Recognition</span>
                        <h2 className="text-3xl md:text-4xl font-bold text-secondary">Our Achievements</h2>
                    </div>

                    <div className="grid md:grid-cols-2 gap-8">
                        {achievements.map((item, idx) => (
                            <div key={idx} className="bg-white p-8 rounded-2xl shadow-float hover:shadow-xl transition-all card-3d border border-gray-100">
                                <div className="flex items-start gap-5">
                                    <div className="w-14 h-14 bg-primary/10 rounded-xl flex items-center justify-center flex-shrink-0 icon-3d">
                                        <item.icon className="w-7 h-7 text-primary" />
                                    </div>
                                    <div>
                                        <h3 className="text-xl font-bold text-secondary mb-2">{item.title}</h3>
                                        <p className="text-slate leading-relaxed">{item.description}</p>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Industries Section */}
                    <div className="mt-16 bg-white rounded-2xl p-10 shadow-float border border-gray-100">
                        <h3 className="text-xl font-bold text-secondary mb-6 text-center">Strong Industry Footmark Across</h3>
                        <div className="flex flex-wrap justify-center gap-4">
                            {industries.map((industry, idx) => (
                                <div key={idx} className="flex items-center gap-2 bg-gray-50 px-4 py-2.5 rounded-full border border-gray-200 hover:border-primary hover:bg-primary/5 transition-all">
                                    <industry.icon className="w-4 h-4 text-primary" />
                                    <span className="text-sm font-medium text-secondary">{industry.name}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </section>



            {/* History */}
            <section id="history" className="py-20 bg-gray-50 scroll-mt-24">
                <div className="container mx-auto px-6 max-w-5xl">
                    <div className="text-center mb-16">
                        <span className="text-primary font-semibold text-sm uppercase tracking-wider mb-4 block">Our Journey</span>
                        <h2 className="text-3xl md:text-4xl font-bold text-secondary">Our History</h2>
                    </div>

                    <div className="bg-white rounded-2xl shadow-float-lg p-10 md:p-14 border border-gray-100">
                        <div className="flex items-center gap-4 mb-8">
                            <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center icon-3d">
                                <History className="w-8 h-8 text-primary" />
                            </div>
                            <div>
                                <h3 className="text-2xl font-bold text-secondary">The DryON Story</h3>
                                <p className="text-slate">From vision to industry leader</p>
                            </div>
                        </div>

                        <div className="space-y-6 text-slate leading-relaxed">
                            <p>
                                DryON was founded with an objective to solve one of the most common yet costly problems in global trade: <strong className="text-secondary">moisture damage in shipping containers during long sea voyages</strong>. We want to offer a cost-effective yet reliable way to exporters, manufacturers and supply chain professionals to protect their valuable cargo from moisture damage that causes product refusal, financial loss, and quality worsening.
                            </p>
                            <p>
                                With increasing demand for the reliable and sustainable moisture control solutions in Pakistan&apos;s export sector, DryON introduced globally trusted calcium chloride-based desiccants to the local market and committed in eliminating container rain, condensation, mould, musty odour, contamination and decay in shipping containers during transit.
                            </p>
                            <p>
                                Over the years, DryON has grown into a well-known brand for product performance, strict quality control, and consistent support to exporters and logistics industry. Our journey continues as we expand our product line and strengthen our role in protecting global cargo shipments through innovative active packaging solutions.
                            </p>
                            
                            <div className="bg-primary/5 rounded-xl p-6 border border-primary/10 mt-8">
                                <div className="flex items-start gap-4">
                                    <CheckCircle className="w-6 h-6 text-primary flex-shrink-0 mt-1" />
                                    <p className="text-secondary font-medium">
                                        We are officially registered with the Government of Pakistan and an active member of the Chamber of Commerce, which further ensures transparency, compliance, and trust in all our business practices.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Sustainability */}
            <section id="sustainability" className="py-20 bg-white scroll-mt-24">
                <div className="container mx-auto px-6 max-w-6xl">
                    <div className="text-center mb-16">
                        <span className="text-primary font-semibold text-sm uppercase tracking-wider mb-4 block">Our Commitment</span>
                        <h2 className="text-3xl md:text-4xl font-bold text-secondary mb-4">Sustainability at DryON</h2>
                        <p className="text-slate max-w-2xl mx-auto">
                            We are committed to sustainable business practices, minimizing our environmental footprint while delivering world-class moisture protection solutions.
                        </p>
                    </div>

                    <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
                        {/* 100% Solar */}
                        <div className="bg-gradient-to-br from-amber-50 to-orange-50 rounded-2xl p-8 border border-amber-100 hover:shadow-xl transition-all card-3d group">
                            <div className="w-16 h-16 bg-gradient-to-br from-amber-400 to-orange-500 rounded-2xl flex items-center justify-center mb-6 shadow-lg group-hover:scale-110 transition-transform">
                                <Sun className="w-8 h-8 text-white" />
                            </div>
                            <h3 className="text-xl font-bold text-secondary mb-2">100% Solar Powered</h3>
                            <p className="text-slate text-sm leading-relaxed">
                                Our entire manufacturing facility runs on renewable solar energy, significantly reducing our carbon footprint.
                            </p>
                            <div className="mt-4 flex items-center gap-2">
                                <div className="w-full bg-amber-100 rounded-full h-2">
                                    <div className="bg-gradient-to-r from-amber-400 to-orange-500 h-2 rounded-full w-full"></div>
                                </div>
                                <span className="text-sm font-bold text-amber-600">100%</span>
                            </div>
                        </div>

                        {/* Tree Plantation */}
                        <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-2xl p-8 border border-green-100 hover:shadow-xl transition-all card-3d group">
                            <div className="w-16 h-16 bg-gradient-to-br from-green-500 to-emerald-600 rounded-2xl flex items-center justify-center mb-6 shadow-lg group-hover:scale-110 transition-transform">
                                <TreePine className="w-8 h-8 text-white" />
                            </div>
                            <h3 className="text-xl font-bold text-secondary mb-2">Tree Plantation</h3>
                            <p className="text-slate text-sm leading-relaxed">
                                Active participation in tree plantation drives to offset carbon emissions and contribute to a greener Pakistan.
                            </p>
                            <div className="mt-4 inline-flex items-center gap-2 bg-green-100 text-green-700 px-3 py-1.5 rounded-full text-sm font-semibold">
                                <Leaf className="w-4 h-4" /> Eco-Friendly
                            </div>
                        </div>

                        {/* Recycled Plastic */}
                        <div className="bg-gradient-to-br from-blue-50 to-cyan-50 rounded-2xl p-8 border border-blue-100 hover:shadow-xl transition-all card-3d group">
                            <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-cyan-600 rounded-2xl flex items-center justify-center mb-6 shadow-lg group-hover:scale-110 transition-transform">
                                <Recycle className="w-8 h-8 text-white" />
                            </div>
                            <h3 className="text-xl font-bold text-secondary mb-2">30% Recycled Plastic</h3>
                            <p className="text-slate text-sm leading-relaxed">
                                Our packaging incorporates 30% recycled plastic materials, reducing virgin plastic consumption.
                            </p>
                            <div className="mt-4 flex items-center gap-2">
                                <div className="w-full bg-blue-100 rounded-full h-2">
                                    <div className="bg-gradient-to-r from-blue-500 to-cyan-500 h-2 rounded-full" style={{ width: '30%' }}></div>
                                </div>
                                <span className="text-sm font-bold text-blue-600">30%</span>
                            </div>
                        </div>

                        {/* Circular Economy */}
                        <div className="bg-gradient-to-br from-purple-50 to-violet-50 rounded-2xl p-8 border border-purple-100 hover:shadow-xl transition-all card-3d group">
                            <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-violet-600 rounded-2xl flex items-center justify-center mb-6 shadow-lg group-hover:scale-110 transition-transform">
                                <RefreshCw className="w-8 h-8 text-white" />
                            </div>
                            <h3 className="text-xl font-bold text-secondary mb-2">Circular Economy</h3>
                            <p className="text-slate text-sm leading-relaxed">
                                Committed to circular economy principles with waste reduction, recycling, and sustainable resource management.
                            </p>
                            <div className="mt-4 inline-flex items-center gap-2 bg-purple-100 text-purple-700 px-3 py-1.5 rounded-full text-sm font-semibold">
                                <RefreshCw className="w-4 h-4" /> Sustainable
                            </div>
                        </div>
                    </div>

                    {/* Sustainability Banner */}
                    <div className="bg-gradient-to-r from-green-600 via-emerald-600 to-teal-600 rounded-2xl p-10 md:p-14 text-white relative overflow-hidden">
                        <div className="absolute inset-0 opacity-10">
                            <div className="absolute inset-0" style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg width="60" height="60" viewBox="0 0 60 60" xmlns="http://www.w3.org/2000/svg"%3E%3Cg fill="none" fill-rule="evenodd"%3E%3Cg fill="%23ffffff" fill-opacity="1"%3E%3Cpath d="M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z"/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")' }} />
                        </div>
                        <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-8">
                            <div>
                                <h3 className="text-2xl md:text-3xl font-bold mb-4">Committed to a Greener Future</h3>
                                <p className="text-white/90 max-w-xl leading-relaxed">
                                    At DryON, sustainability isn&apos;t just a buzzword – it&apos;s embedded in our operations. From solar-powered manufacturing to recycled materials, we&apos;re actively working towards reducing our environmental impact while delivering premium quality products.
                                </p>
                            </div>
                            <div className="flex items-center gap-6">
                                <div className="text-center">
                                    <div className="text-4xl md:text-5xl font-bold">100%</div>
                                    <div className="text-sm text-white/80">Renewable Energy</div>
                                </div>
                                <div className="w-px h-16 bg-white/30"></div>
                                <div className="text-center">
                                    <div className="text-4xl md:text-5xl font-bold">30%</div>
                                    <div className="text-sm text-white/80">Recycled Materials</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Compliance & Certifications */}
            <section className="py-20 bg-white">
                <div className="container mx-auto px-6 max-w-6xl">
                    <div className="text-center mb-16">
                        <span className="text-primary font-semibold text-sm uppercase tracking-wider mb-4 block">Quality Assurance</span>
                        <h2 className="text-3xl md:text-4xl font-bold text-secondary mb-4">Compliance & Certifications</h2>
                        <p className="text-slate max-w-2xl mx-auto">
                            Our products meet and exceed international standards, ensuring safety, quality, and environmental responsibility.
                        </p>
                    </div>

                    <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-6">
                        <div className="bg-gray-50 rounded-2xl p-6 text-center hover:shadow-lg transition-all border border-gray-100 group">
                            <div className="relative w-full h-32 mb-4 flex items-center justify-center">
                                <Image
                                    src="/RoHS.png"
                                    alt="RoHS Compliance"
                                    width={120}
                                    height={120}
                                    className="object-contain max-h-full max-w-full group-hover:scale-110 transition-transform"
                                />
                            </div>
                            <h3 className="font-bold text-secondary text-sm">RoHS</h3>
                            <p className="text-xs text-slate mt-1">Compliant</p>
                        </div>

                        <div className="bg-gray-50 rounded-2xl p-6 text-center hover:shadow-lg transition-all border border-gray-100 group">
                            <div className="relative w-full h-32 mb-4 flex items-center justify-center">
                                <Image
                                    src="/REACH.png"
                                    alt="REACH Compliance"
                                    width={120}
                                    height={120}
                                    className="object-contain max-h-full max-w-full group-hover:scale-110 transition-transform"
                                />
                            </div>
                            <h3 className="font-bold text-secondary text-sm">REACH</h3>
                            <p className="text-xs text-slate mt-1">Compliant</p>
                        </div>

                        <div className="bg-gray-50 rounded-2xl p-6 text-center hover:shadow-lg transition-all border border-gray-100 group">
                            <div className="relative w-full h-32 mb-4 flex items-center justify-center">
                                <Image
                                    src="/RECYCLE.png"
                                    alt="Recyclable"
                                    width={120}
                                    height={120}
                                    className="object-contain max-h-full max-w-full group-hover:scale-110 transition-transform"
                                />
                            </div>
                            <h3 className="font-bold text-secondary text-sm">Recyclable</h3>
                            <p className="text-xs text-slate mt-1">Certified</p>
                        </div>

                        <div className="bg-gray-50 rounded-2xl p-6 text-center hover:shadow-lg transition-all border border-gray-100 group">
                            <div className="relative w-full h-32 mb-4 flex items-center justify-center">
                                <Image
                                    src="/DMF-FREE.png"
                                    alt="DMF-Free Certified"
                                    width={120}
                                    height={120}
                                    className="object-contain max-h-full max-w-full group-hover:scale-110 transition-transform"
                                />
                            </div>
                            <h3 className="font-bold text-secondary text-sm">DMF-Free</h3>
                            <p className="text-xs text-slate mt-1">Certified</p>
                        </div>

                        <div className="bg-gray-50 rounded-2xl p-6 text-center hover:shadow-lg transition-all border border-gray-100 group">
                            <div className="relative w-full h-32 mb-4 flex items-center justify-center">
                                <Image
                                    src="/SGS.png"
                                    alt="SGS Certified"
                                    width={120}
                                    height={120}
                                    className="object-contain max-h-full max-w-full group-hover:scale-110 transition-transform"
                                />
                            </div>
                            <h3 className="font-bold text-secondary text-sm">SGS</h3>
                            <p className="text-xs text-slate mt-1">Certified</p>
                        </div>

                        <div className="bg-gray-50 rounded-2xl p-6 text-center hover:shadow-lg transition-all border border-gray-100 group">
                            <div className="relative w-full h-32 mb-4 flex items-center justify-center">
                                <Image
                                    src="/ECO-FRIENDLY.png"
                                    alt="Eco-Friendly"
                                    width={120}
                                    height={120}
                                    className="object-contain max-h-full max-w-full group-hover:scale-110 transition-transform"
                                />
                            </div>
                            <h3 className="font-bold text-secondary text-sm">Eco-Friendly</h3>
                            <p className="text-xs text-slate mt-1">Certified</p>
                        </div>

                        <div className="bg-gray-50 rounded-2xl p-6 text-center hover:shadow-lg transition-all border border-gray-100 group">
                            <div className="relative w-full h-32 mb-4 flex items-center justify-center">
                                <Image
                                    src="/DUNS.png"
                                    alt="DUNS Registered"
                                    width={120}
                                    height={120}
                                    className="object-contain max-h-full max-w-full group-hover:scale-110 transition-transform"
                                />
                            </div>
                            <h3 className="font-bold text-secondary text-sm">DUNS</h3>
                            <p className="text-xs text-slate mt-1">Registered</p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Mission & Vision */}
            <section className="py-20 bg-gray-50">
                <div className="container mx-auto px-6 max-w-6xl">
                    <div className="grid md:grid-cols-2 gap-8">
                        <div className="bg-gradient-to-br from-primary to-primary-dark rounded-2xl p-10 text-white card-3d">
                            <div className="w-14 h-14 bg-white/20 rounded-xl flex items-center justify-center mb-6">
                                <Target className="w-7 h-7 text-white" />
                            </div>
                            <h3 className="text-2xl font-bold mb-4">{t('ourMission')}</h3>
                            <p className="text-white/90 leading-relaxed">
                                To provide reliable, sustainable, and cost-effective moisture protection solutions that safeguard valuable cargo during transit, enabling Pakistani exporters to compete confidently in global markets while eliminating moisture-related losses.
                            </p>
                        </div>
                        
                        <div className="bg-gradient-to-br from-secondary to-secondary-dark rounded-2xl p-10 text-white card-3d">
                            <div className="w-14 h-14 bg-white/20 rounded-xl flex items-center justify-center mb-6">
                                <Globe2 className="w-7 h-7 text-white" />
                            </div>
                            <h3 className="text-2xl font-bold mb-4">{t('ourVision')}</h3>
                            <p className="text-white/90 leading-relaxed">
                                To become the most trusted name in cargo protection across South Asia, pioneering innovation in moisture control technology while supporting Pakistan&apos;s export growth and sustainable industrial development.
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* CTA */}
            <section className="py-16 bg-gradient-to-r from-primary to-primary-dark">
                <div className="container mx-auto px-6 text-center">
                    <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">Ready to Protect Your Cargo?</h2>
                    <p className="text-white/80 text-lg mb-8 max-w-2xl mx-auto">
                        Partner with DryON for reliable moisture protection solutions trusted by exporters across Pakistan.
                    </p>
                    <a 
                        href="/contact" 
                        className="btn-3d inline-flex items-center gap-2 bg-white text-primary hover:bg-gray-100 font-bold py-4 px-8 rounded-lg shadow-lg hover:shadow-xl transition-all"
                    >
                        Contact Us Today
                    </a>
                </div>
            </section>
        </div>
    );
}
