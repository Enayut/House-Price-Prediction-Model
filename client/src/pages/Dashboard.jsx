export default function Dashboard(){
    const scrollToNextSection = () => {
        const contentSection = document.getElementById("content");
        if (contentSection) {
            contentSection.scrollIntoView({ behavior: "smooth" });
        }
    };
    return(
        <>
            <Header/>
            <Hero/>
        </>
    )
}