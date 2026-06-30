import Container from "@/components/layout/Container";
import Section from "@/components/layout/Section";

type Unit = {
    unit: string;
    name: string;
    sqft: string;
    desc: string;
}

type ManufacturingFootprintProps = {
    units: Unit[];
}

const ManufacturingFootprint = ({ units }: ManufacturingFootprintProps) => {
    return (
        <Section className="py-24 bg-zinc-900 text-white">
            <Container>
                <div className="text-center max-w-3xl mx-auto mb-16">
                    <h2 className="text-4xl md:text-5xl font-bold mb-6 tracking-tight">Manufacturing Footprint</h2>
                    <p className="text-zinc-400 text-lg">Scalable manufacturing facilities with dedicated precision and specialized units.</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {units.map((item, i) => (
                        <div key={i} className="flex flex-col bg-zinc-950 rounded-3xl p-8 border border-zinc-800 hover:border-primary/50 transition-colors group">
                            <span className="text-6xl font-black text-zinc-800 mb-6 tracking-tighter group-hover:text-primary/20 transition-colors">Unit {item.unit}</span>
                            <h3 className="text-2xl font-bold text-white mb-2">{item.name}</h3>
                            <p className="text-primary font-bold text-lg mb-4">{item.sqft} sq. ft.</p>
                            <p className="text-zinc-400 mt-auto leading-relaxed">{item.desc}</p>
                        </div>
                    ))}
                </div>
            </Container>
        </Section>
    )
}

export default ManufacturingFootprint;
