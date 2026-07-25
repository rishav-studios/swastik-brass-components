"use client"
import Fade from '@/components/animations/Fade'
import Container from '@/components/layout/Container'
import Section from '@/components/layout/Section'
import { Description, Eyebrow, SectionHeader } from '@/components/shared/SectionHeader'
import { TextRevealOnScroll } from '@/components/shared/TextReveal'
import { exportCountries, type ExportCountry } from '@/constants/export_countries'
import { useGlobe } from '@/contexts/GlobeContext'
import { cn } from '@swastik/ui/lib/utils'
import { useRef } from 'react'
import Globe from './Globe'


const highlightedCountries = exportCountries.map((country: ExportCountry) => country.name)

/** Convert a 2-letter ISO code (e.g. "US") to its flag emoji (🇺🇸) */
function codeToFlag(code: string): string {
    return [...code.toUpperCase()].map(c => String.fromCodePoint(0x1F1E6 - 65 + c.charCodeAt(0))).join('')
}

const STATS = [
    { value: '7+', label: 'Countries' },
    { value: '5', label: 'Continents' },
    { value: '24/7', label: 'Worldwide Delivery' },
]

// ─────────────────────────────────────────────────────────
// Country Card
// ─────────────────────────────────────────────────────────

type CountryCardProps = {
    country: ExportCountry;
    isActive: boolean;
    onMouseEnter: () => void;
    onMouseLeave: () => void;
    delay?: number;
}

const CountryCard = ({ country, isActive, onMouseEnter, onMouseLeave, delay = 0 }: CountryCardProps) => {
    return (
        <Fade delay={delay}>
            <button
                type="button"
                onMouseEnter={onMouseEnter}
                onMouseLeave={onMouseLeave}
                className={cn(
                    'group relative flex w-full items-center gap-4 rounded-2xl border px-5 py-4 text-left transition-all duration-300 cursor-pointer',
                    'bg-white/60 backdrop-blur-sm shadow-sm',
                    'hover:shadow-lg hover:scale-[1.02] hover:-translate-y-0.5',
                    isActive
                        ? 'border-primary/40 shadow-lg shadow-primary/10 bg-primary/5 scale-[1.02] -translate-y-0.5'
                        : 'border-gray-200/80 hover:border-primary/30',
                )}
            >
                {/* Active indicator dot */}
                <span className={cn(
                    'absolute left-0 top-1/2 -translate-y-1/2 -translate-x-1/2 w-2 h-2 rounded-full bg-primary transition-all duration-300',
                    isActive ? 'opacity-100 scale-100' : 'opacity-0 scale-0',
                )} />

                {/* Flag */}
                <span className='text-2xl leading-none select-none' aria-hidden>
                    {codeToFlag(country.code)}
                </span>

                {/* Name */}
                <span className={cn(
                    'text-sm font-medium tracking-wide capitalize transition-colors duration-300',
                    isActive ? 'text-primary' : 'text-gray-700 group-hover:text-gray-900',
                )}>
                    {country.alias ?? country.name}
                </span>

                {/* Arrow indicator */}
                <svg
                    className={cn(
                        'ml-auto w-4 h-4 transition-all duration-300',
                        isActive ? 'text-primary opacity-100 translate-x-0' : 'text-gray-300 opacity-0 -translate-x-2 group-hover:opacity-60 group-hover:translate-x-0',
                    )}
                    fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor"
                >
                    <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3" />
                </svg>
            </button>
        </Fade>
    )
}

// ─────────────────────────────────────────────────────────
// Stats Row
// ─────────────────────────────────────────────────────────

const StatsRow = () => (
    <Fade delay={0.6}>
        <div className='flex items-center gap-6 lg:gap-8 flex-wrap'>
            {STATS.map((stat, i) => (
                <div key={stat.label} className='flex items-center gap-2'>
                    <span className='text-2xl lg:text-3xl font-bold text-foreground tracking-tight'>{stat.value}</span>
                    <span className='text-xs lg:text-sm text-gray-500 font-medium uppercase tracking-widest'>{stat.label}</span>
                    {i < STATS.length - 1 && (
                        <span className='ml-4 lg:ml-6 w-px h-6 bg-gray-200' aria-hidden />
                    )}
                </div>
            ))}
        </div>
    </Fade>
)

// ─────────────────────────────────────────────────────────
// Mobile Country Pills (horizontal scroll)
// ─────────────────────────────────────────────────────────

type MobileCountryPillsProps = {
    selectedCountry: string | null;
    setSelectedCountry: (country: string | null) => void;
}

const MobileCountryPills = ({ selectedCountry, setSelectedCountry }: MobileCountryPillsProps) => {
    const scrollRef = useRef<HTMLDivElement>(null)

    return (
        <div className='lg:hidden relative'>
            {/* Fade edges */}
            <div className='pointer-events-none absolute left-0 top-0 bottom-0 w-8 bg-linear-to-r from-white to-transparent z-10' />
            <div className='pointer-events-none absolute right-0 top-0 bottom-0 w-8 bg-linear-to-l from-white to-transparent z-10' />

            <div
                ref={scrollRef}
                className='flex gap-3 overflow-x-auto py-2 px-4 snap-x snap-mandatory [&::-webkit-scrollbar]:hidden'
                style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
            >
                {exportCountries.map((country) => {
                    const isActive = selectedCountry === country.name
                    return (
                        <button
                            key={country.name}
                            type="button"
                            onClick={() => setSelectedCountry(isActive ? null : country.name)}
                            className={cn(
                                'snap-start shrink-0 flex items-center gap-2.5 rounded-full border px-4 py-2.5 text-sm font-medium capitalize transition-all duration-300 whitespace-nowrap',
                                isActive
                                    ? 'border-primary/40 bg-primary/10 text-primary shadow-sm'
                                    : 'border-gray-200 bg-white/80 text-gray-600 hover:border-primary/30 hover:text-gray-900',
                            )}
                        >
                            <span className='text-lg leading-none'>{codeToFlag(country.code)}</span>
                            {country.alias ?? country.name}
                        </button>
                    )
                })}
            </div>
        </div>
    )
}

// ─────────────────────────────────────────────────────────
// Main Exports Section
// ─────────────────────────────────────────────────────────

const Exports = () => {
    const { selectedCountry, setSelectedCountry } = useGlobe()

    return (
        <Section className='bg-white overflow-hidden'>

            <Container className='relative z-10'>
                {/* ── Desktop: Split layout (lg+) ── */}
                <div className='hidden lg:grid lg:grid-cols-[1fr_1.3fr] gap-8 xl:gap-12 items-center min-h-[85dvh]'>

                    {/* Left: Content + Country Cards */}
                    <div className='flex flex-col gap-10 py-12'>
                        <SectionHeader>
                            <Eyebrow>Exports</Eyebrow>
                            <TextRevealOnScroll as='h2'>Countries We Serve</TextRevealOnScroll>
                            <Fade delay={0.3}>
                                <Description className='text-left max-w-md'>
                                    With a robust global reach, we serve a diverse clientele across multiple continents, delivering exceptional value worldwide.
                                </Description>
                            </Fade>
                        </SectionHeader>

                        {/* Country cards */}
                        <div className='grid grid-cols-2 gap-3'>
                            {exportCountries.map((country, index) => (
                                <CountryCard
                                    key={country.name}
                                    country={country}
                                    isActive={selectedCountry === country.name}
                                    onMouseEnter={() => setSelectedCountry(country.name)}
                                    onMouseLeave={() => setSelectedCountry(null)}
                                    delay={0.15 + index * 0.07}
                                />
                            ))}
                        </div>

                        {/* Stats */}
                        <StatsRow />
                    </div>

                    {/* Right: Globe */}
                    <div className='relative w-full h-full min-h-150'>
                        {/* Radial glow behind globe */}
                        <div className='absolute inset-0 flex items-center justify-center pointer-events-none'>
                            <div className='w-[120%] aspect-square rounded-full blur-3xl' style={{ background: 'radial-gradient(circle, oklch(66.646% 0.19016 36.803 / 0.08), oklch(66.646% 0.19016 36.803 / 0.03), transparent)' }} />
                        </div>

                        <Globe className='cursor-grab' highlightedCountries={highlightedCountries} selectedCountry={selectedCountry} />
                    </div>
                </div>

                {/* ── Tablet / Mobile: Stacked layout (< lg) ── */}
                <div className='lg:hidden flex flex-col gap-8'>
                    <SectionHeader>
                        <Eyebrow className='mx-auto'>Exports</Eyebrow>
                        <TextRevealOnScroll as='h2' className='text-center'>Countries We Serve</TextRevealOnScroll>
                        <Description className='max-w-md mx-auto'>
                            With a robust global reach, we serve a diverse clientele across multiple continents, delivering exceptional value worldwide.
                        </Description>
                    </SectionHeader>

                    {/* Globe */}
                    <div className='relative w-full h-[60dvh] min-h-87.5'>
                        {/* Radial glow */}
                        <div className='absolute inset-0 flex items-center justify-center pointer-events-none'>
                            <div className='w-[130%] aspect-square rounded-full blur-2xl' style={{ background: 'radial-gradient(circle, oklch(66.646% 0.19016 36.803 / 0.06), transparent)' }} />
                        </div>

                        <Globe highlightedCountries={highlightedCountries} selectedCountry={selectedCountry} />
                    </div>

                    {/* Mobile country pills */}
                    <MobileCountryPills selectedCountry={selectedCountry} setSelectedCountry={setSelectedCountry} />

                    {/* Stats */}
                    <div className='flex justify-center'>
                        <StatsRow />
                    </div>
                </div>
            </Container>
        </Section>
    )
}

export default Exports