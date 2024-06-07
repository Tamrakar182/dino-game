import { HTMLAttributes } from "react";

interface LogoProps extends HTMLAttributes<HTMLImageElement> {
    className?: string
    noText?: boolean
}

const Logo = ({ className = '', ...others }: LogoProps) => {
    return (
        <img src="./characters/dino.png" className={`${className}`} alt="dino" {...others} />
    );
}

export default Logo;