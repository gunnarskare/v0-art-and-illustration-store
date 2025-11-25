import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { HeroSection } from "@/components/hero-section"
import { FeaturedProducts } from "@/components/featured-products"
import { ArtistsPreview } from "@/components/artists-preview"
import { BlogPreview } from "@/components/blog-preview"
import { NewsletterSection } from "@/components/newsletter-section"

export default function Home() {
  return (
    <>
      <Header />
      <main>
        <HeroSection />
        <FeaturedProducts />
        <ArtistsPreview />
        <BlogPreview />
        <NewsletterSection />
      </main>
      <Footer />
    </>
  )
}
