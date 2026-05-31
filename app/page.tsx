import { CosmicBackground } from "@/components/cosmic-background"
import { HorizontalExperience } from "@/components/horizontal-experience"
import { Overlay } from "@/components/overlay"

export default function Page() {
  return (
    <main className="relative bg-background text-foreground">
      <CosmicBackground />
      <Overlay />
      <HorizontalExperience />
    </main>
  )
}
