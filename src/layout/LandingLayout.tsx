import NavBar from "@/components/NavBar"
import Footer from "@/components/Footer";

const LandingLayout = ({ children }: { children: React.ReactNode }) => {
    return (
        <>
            <NavBar />
                <div className='content-container'>
                    {children}
                </div>
            <Footer />
        </>
    )
}

export default LandingLayout;