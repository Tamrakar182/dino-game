import LandingLayout from '@/layout/LandingLayout'
import { VaultCard } from '@/components/Crypto'

export default function AboutSection() {
    return (
        <LandingLayout>

            <div className="h-[50rem] w-full bg-[#13171C] bg-grid-white/[0.2] relative flex items-center justify-center">
                <div className="absolute pointer-events-none inset-0 flex items-center justify-center bg-[#13171C] [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black)]"></div>
                <div className="flex flex-col gap-6 items-center justify-center">
                    <VaultCard className="h-[350px] w-[350px]" text='🔐' />
                </div>
            </div>
        </LandingLayout>
    )
}
