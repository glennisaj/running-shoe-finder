import Hero from "@/components/hero"
import ShoeFinderForm from "@/components/shoe-finder-form"

export default function Home() {
  return (
    <main className="min-h-screen">
      <Hero />
      <div className="container mx-auto px-4 py-12">
        <ShoeFinderForm />
      </div>
    </main>
  )
}

