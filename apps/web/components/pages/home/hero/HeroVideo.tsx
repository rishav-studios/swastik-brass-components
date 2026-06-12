
const HeroVideo = () => {
    return (
        <div className="h-dvh w-full relative">
            <video
                autoPlay
                muted
                loop
                className="absolute top-0 left-0 w-full h-full object-cover -z-2"
            >
                <source src="/hero-video.mp4" type="video/mp4" />
            </video>
            <div className="absolute w-full h-full top-0 left-0 -z-1" />
        </div>
    )
}

export default HeroVideo