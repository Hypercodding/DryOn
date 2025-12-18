import { FlaskConical, Microscope, Lightbulb, Beaker, Target, TrendingUp, TestTube, Zap, CheckCircle, Rocket, Atom, FlaskRound } from 'lucide-react';
import { getTranslations } from 'next-intl/server';

export default async function RDPage() {
    const t = await getTranslations('AboutPage');

    const rndFocusAreas = [
        {
            icon: FlaskConical,
            title: 'Product Improvement',
            description: 'Continuously enhancing our existing product line through rigorous testing, performance analysis, and customer feedback integration to deliver superior moisture control solutions.',
            color: 'from-blue-500 to-cyan-500',
            bgColor: 'from-blue-50 to-cyan-50',
            borderColor: 'border-blue-100'
        },
        {
            icon: Atom,
            title: 'Material Chemistry',
            description: 'Exploring advanced material chemistry and innovative formulations to develop cutting-edge desiccant technologies that meet and exceed international standards.',
            color: 'from-purple-500 to-violet-500',
            bgColor: 'from-purple-50 to-violet-50',
            borderColor: 'border-purple-100'
        },
        {
            icon: Beaker,
            title: 'Indigenous Resources',
            description: 'Leveraging local resources and materials to create cost-effective, sustainable solutions while supporting domestic supply chains and reducing import dependencies.',
            color: 'from-green-500 to-emerald-500',
            bgColor: 'from-green-50 to-emerald-50',
            borderColor: 'border-green-100'
        },
        {
            icon: Rocket,
            title: 'New Product Development',
            description: 'Addressing complex industry challenges by developing innovative products that transform problems into pragmatic, real-world solutions for our customers.',
            color: 'from-orange-500 to-amber-500',
            bgColor: 'from-orange-50 to-amber-50',
            borderColor: 'border-orange-100'
        },
        {
            icon: Microscope,
            title: 'Quality Testing',
            description: 'Maintaining world-class quality standards through comprehensive testing protocols in our EU-grade environmental chamber, ensuring reliability under extreme conditions.',
            color: 'from-red-500 to-pink-500',
            bgColor: 'from-red-50 to-pink-50',
            borderColor: 'border-red-100'
        },
        {
            icon: Lightbulb,
            title: 'Innovation Pipeline',
            description: 'Building a robust innovation pipeline that anticipates future market needs and develops next-generation solutions for emerging challenges in cargo protection.',
            color: 'from-teal-500 to-cyan-500',
            bgColor: 'from-teal-50 to-cyan-50',
            borderColor: 'border-teal-100'
        },
    ];

    const researchCapabilities = [
        {
            icon: TestTube,
            title: 'Advanced Testing',
            description: 'EU-grade environmental chamber for simulating real-world shipping conditions',
            stat: '100%'
        },
        {
            icon: Zap,
            title: 'Rapid Prototyping',
            description: 'Quick iteration cycles to transform ideas into market-ready products',
            stat: 'Fast'
        },
        {
            icon: Target,
            title: 'Problem-Solving Focus',
            description: 'Systematic approach to converting complex challenges into practical solutions',
            stat: '100%'
        },
    ];

    return (
        <div className="min-h-screen bg-white pt-20">
            {/* Hero */}
            <div className="bg-gradient-to-br from-primary via-primary-dark to-secondary/80 text-white py-28 px-4 relative overflow-hidden">
                <div className="absolute inset-0 bg-[url('/images/pattern.svg')] opacity-5" />
                <div className="container mx-auto max-w-4xl text-center relative z-10">
                    <span className="inline-block bg-white/10 text-white/90 px-4 py-2 rounded-full text-sm font-semibold uppercase tracking-wider mb-6">
                        Innovation & Development
                    </span>
                    <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 text-shadow-lg">Research & Development</h1>
                    <p className="text-xl text-white/90 font-light max-w-2xl mx-auto leading-relaxed">
                        Pioneering innovation through continuous research and indigenous resource utilization
                    </p>
                </div>
            </div>

            {/* Main Content */}
            <section className="py-20 bg-white">
                <div className="container mx-auto px-6 max-w-6xl">
                    <div className="max-w-4xl mx-auto">
                        <div className="space-y-6 text-slate leading-relaxed text-lg mb-12">
                            <p>
                                Under our R&D domain, we heavily invest in our research & development fundamentals to continuously improve our products, utilizing indigenous resources and exploring new material chemistry to develop standard yet world-class products. Our commitment to innovation drives us to push the boundaries of what&apos;s possible in moisture control technology.
                            </p>
                            <p>
                                Moreover, we are focused on developing new products by addressing today&apos;s complex problems and transforming them into pragmatic solutions. Our R&D team works tirelessly to ensure that every product we develop not only meets international standards but also exceeds customer expectations in performance, reliability, and sustainability.
                            </p>
                            <p className="font-medium text-secondary">
                                Through strategic investment in research infrastructure and a culture of continuous improvement, we maintain our position as a leader in moisture protection solutions while contributing to Pakistan&apos;s technological advancement.
                            </p>
                        </div>

                        {/* Core Philosophy */}
                        <div className="bg-gradient-to-br from-primary/10 via-secondary/10 to-primary/5 rounded-2xl p-10 md:p-14 border-2 border-primary/20 mb-16 relative overflow-hidden">
                            <div className="absolute inset-0 opacity-5">
                                <div className="absolute inset-0" style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg width="60" height="60" viewBox="0 0 60 60" xmlns="http://www.w3.org/2000/svg"%3E%3Cg fill="none" fill-rule="evenodd"%3E%3Cg fill="%23000000" fill-opacity="1"%3E%3Cpath d="M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z"/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")' }} />
                            </div>
                            <div className="relative z-10">
                                <div className="flex items-center justify-center mb-6">
                                    <div className="w-20 h-20 bg-gradient-to-br from-primary to-secondary rounded-2xl flex items-center justify-center shadow-lg">
                                        <FlaskRound className="w-10 h-10 text-white" />
                                    </div>
                                </div>
                                <h2 className="text-3xl md:text-4xl font-bold text-secondary text-center mb-6">
                                    Our R&D Philosophy
                                </h2>
                                <div className="bg-white rounded-xl p-8 shadow-lg border border-gray-100">
                                    <p className="text-xl md:text-2xl font-semibold text-center text-secondary leading-relaxed mb-4">
                                        Transforming Complex Problems into Pragmatic Solutions
                                    </p>
                                    <div className="grid md:grid-cols-3 gap-4 mt-6">
                                        <div className="text-center p-4 bg-primary/5 rounded-lg">
                                            <div className="text-2xl font-bold text-primary mb-1">Innovation</div>
                                            <div className="text-sm text-slate">First Approach</div>
                                        </div>
                                        <div className="text-center p-4 bg-secondary/5 rounded-lg">
                                            <div className="text-2xl font-bold text-secondary mb-1">Quality</div>
                                            <div className="text-sm text-slate">World-Class Standards</div>
                                        </div>
                                        <div className="text-center p-4 bg-primary/5 rounded-lg">
                                            <div className="text-2xl font-bold text-primary mb-1">Local</div>
                                            <div className="text-sm text-slate">Indigenous Resources</div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* R&D Focus Areas */}
            <section className="py-20 bg-gray-50">
                <div className="container mx-auto px-6 max-w-6xl">
                    <div className="text-center mb-16">
                        <span className="text-primary font-semibold text-sm uppercase tracking-wider mb-4 block">Our Expertise</span>
                        <h2 className="text-3xl md:text-4xl font-bold text-secondary mb-4">R&D Focus Areas</h2>
                        <p className="text-slate max-w-2xl mx-auto">
                            Our research and development efforts span multiple domains, ensuring comprehensive innovation across all aspects of our product portfolio
                        </p>
                    </div>

                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {rndFocusAreas.map((area, idx) => (
                            <div 
                                key={idx} 
                                className={`bg-gradient-to-br ${area.bgColor} rounded-2xl p-8 border ${area.borderColor} hover:shadow-xl transition-all card-3d group`}
                            >
                                <div className={`w-16 h-16 bg-gradient-to-br ${area.color} rounded-2xl flex items-center justify-center mb-6 shadow-lg group-hover:scale-110 transition-transform`}>
                                    <area.icon className="w-8 h-8 text-white" />
                                </div>
                                <h3 className="text-xl font-bold text-secondary mb-3">{area.title}</h3>
                                <p className="text-slate leading-relaxed">{area.description}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Research Capabilities */}
            <section className="py-20 bg-white">
                <div className="container mx-auto px-6 max-w-6xl">
                    <div className="text-center mb-16">
                        <span className="text-primary font-semibold text-sm uppercase tracking-wider mb-4 block">Our Strengths</span>
                        <h2 className="text-3xl md:text-4xl font-bold text-secondary mb-4">Research Capabilities</h2>
                        <p className="text-slate max-w-2xl mx-auto">
                            State-of-the-art facilities and methodologies that enable breakthrough innovations
                        </p>
                    </div>

                    <div className="grid md:grid-cols-3 gap-8 mb-12">
                        {researchCapabilities.map((capability, idx) => (
                            <div 
                                key={idx} 
                                className="bg-gradient-to-br from-white to-gray-50 rounded-2xl p-8 border border-gray-100 hover:shadow-xl transition-all card-3d text-center"
                            >
                                <div className="w-16 h-16 bg-gradient-to-br from-primary to-secondary rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-lg">
                                    <capability.icon className="w-8 h-8 text-white" />
                                </div>
                                <div className="text-4xl font-bold text-primary mb-2">{capability.stat}</div>
                                <h3 className="text-xl font-bold text-secondary mb-3">{capability.title}</h3>
                                <p className="text-slate leading-relaxed">{capability.description}</p>
                            </div>
                        ))}
                    </div>

                    {/* Innovation Process */}
                    <div className="bg-gradient-to-r from-primary via-secondary to-primary rounded-2xl p-10 md:p-14 text-white relative overflow-hidden">
                        <div className="absolute inset-0 opacity-10">
                            <div className="absolute inset-0" style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg width="60" height="60" viewBox="0 0 60 60" xmlns="http://www.w3.org/2000/svg"%3E%3Cg fill="none" fill-rule="evenodd"%3E%3Cg fill="%23ffffff" fill-opacity="1"%3E%3Cpath d="M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z"/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")' }} />
                        </div>
                        <div className="relative z-10">
                            <div className="text-center mb-12">
                                <h2 className="text-3xl md:text-4xl font-bold mb-4">Our Innovation Process</h2>
                                <p className="text-white/90 max-w-3xl mx-auto text-lg leading-relaxed">
                                    From ideation to market launch, our systematic approach ensures that every product we develop addresses real-world challenges with practical, effective solutions.
                                </p>
                            </div>

                            <div className="grid md:grid-cols-4 gap-6 mt-12">
                                <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20 text-center">
                                    <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-4">
                                        <span className="text-2xl font-bold text-white">1</span>
                                    </div>
                                    <h3 className="text-lg font-bold mb-2">Research</h3>
                                    <p className="text-white/80 text-sm leading-relaxed">
                                        Identify market needs and technical challenges
                                    </p>
                                </div>
                                <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20 text-center">
                                    <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-4">
                                        <span className="text-2xl font-bold text-white">2</span>
                                    </div>
                                    <h3 className="text-lg font-bold mb-2">Development</h3>
                                    <p className="text-white/80 text-sm leading-relaxed">
                                        Design and prototype innovative solutions
                                    </p>
                                </div>
                                <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20 text-center">
                                    <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-4">
                                        <span className="text-2xl font-bold text-white">3</span>
                                    </div>
                                    <h3 className="text-lg font-bold mb-2">Testing</h3>
                                    <p className="text-white/80 text-sm leading-relaxed">
                                        Rigorous quality assurance and performance validation
                                    </p>
                                </div>
                                <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20 text-center">
                                    <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-4">
                                        <span className="text-2xl font-bold text-white">4</span>
                                    </div>
                                    <h3 className="text-lg font-bold mb-2">Launch</h3>
                                    <p className="text-white/80 text-sm leading-relaxed">
                                        Market introduction with comprehensive support
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Key Achievements */}
            <section className="py-20 bg-gray-50">
                <div className="container mx-auto px-6 max-w-6xl">
                    <div className="text-center mb-16">
                        <span className="text-primary font-semibold text-sm uppercase tracking-wider mb-4 block">R&D Excellence</span>
                        <h2 className="text-3xl md:text-4xl font-bold text-secondary mb-4">Key Achievements</h2>
                    </div>

                    <div className="grid md:grid-cols-3 gap-8">
                        <div className="bg-white rounded-2xl p-8 shadow-float border border-gray-100 hover:shadow-xl transition-all card-3d">
                            <div className="w-14 h-14 bg-primary/10 rounded-xl flex items-center justify-center mb-6">
                                <CheckCircle className="w-7 h-7 text-primary" />
                            </div>
                            <h3 className="text-xl font-bold text-secondary mb-3">In-House Testing Facility</h3>
                            <p className="text-slate leading-relaxed">
                                Our environmental chamber enables real-time simulation of extreme shipping conditions, ensuring product reliability.
                            </p>
                        </div>
                        <div className="bg-white rounded-2xl p-8 shadow-float border border-gray-100 hover:shadow-xl transition-all card-3d">
                            <div className="w-14 h-14 bg-secondary/10 rounded-xl flex items-center justify-center mb-6">
                                <TrendingUp className="w-7 h-7 text-secondary" />
                            </div>
                            <h3 className="text-xl font-bold text-secondary mb-3">Continuous Improvement</h3>
                            <p className="text-slate leading-relaxed">
                                Regular product enhancements based on field performance data and customer feedback drive our innovation cycle.
                            </p>
                        </div>
                        <div className="bg-white rounded-2xl p-8 shadow-float border border-gray-100 hover:shadow-xl transition-all card-3d">
                            <div className="w-14 h-14 bg-primary/10 rounded-xl flex items-center justify-center mb-6">
                                <Zap className="w-7 h-7 text-primary" />
                            </div>
                            <h3 className="text-xl font-bold text-secondary mb-3">Indigenous Innovation</h3>
                            <p className="text-slate leading-relaxed">
                                Successfully developing world-class products using local resources, contributing to Pakistan&apos;s technological independence.
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* CTA */}
            <section className="py-16 bg-gradient-to-r from-primary to-primary-dark">
                <div className="container mx-auto px-6 text-center">
                    <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">Partner in Innovation</h2>
                    <p className="text-white/80 text-lg mb-8 max-w-2xl mx-auto">
                        Have a specific challenge or need? Our R&D team is ready to collaborate and develop custom solutions tailored to your requirements.
                    </p>
                    <a 
                        href="/contact" 
                        className="btn-3d inline-flex items-center gap-2 bg-white text-primary hover:bg-gray-100 font-bold py-4 px-8 rounded-lg shadow-lg hover:shadow-xl transition-all"
                    >
                        Discuss Your Needs
                    </a>
                </div>
            </section>
        </div>
    );
}

