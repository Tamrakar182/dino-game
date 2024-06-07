import Logo from "./Logo";

export default function LoadingScreen() {
    return (
        <div className='w-screen h-screen flex flex-col items-center justify-center content-container'>
            <Logo className='w-[350px] h-[350px]' />
            <img src="./loading.gif" alt="loading" className="w-[120px] h-[60px] lg:w-[240px] lg:h-[130px]" />
        </div >
    )
}