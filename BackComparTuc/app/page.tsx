import HeroCarousel from "@/components/HeroCarousel"
import Searchbar from "@/components/Searchbar"
import Image from "next/image"
import { getAllProducts } from "@/lib/actions"
import ProductCard from "@/components/ProductCard"
import Chatbot from "@/components/Chatbot"

const Home = async () => {
  const allProducts = await getAllProducts();

  return (
    <>
      <section className="px-6 md:px-20 py-24">
        <div className="flex max-xl:flex-col gap-16">
          <div className="flex flex-col justify-center"> 
            <p className="small-text">
              Compra inteligentemente aqui:
              <Image 
                src="/assets/icons/arrow-right.svg"
                alt="arrow-right"
                width={16}
                height={16}
              />
            </p>

            <h1 className="head-text">
              Librerá el poder de
              <span className="text-primary"> ComparTuc</span>
            </h1>

            <p className="mt-6">
            Potentes análisis de crecimiento y productos de autoservicio para ayudarle a convertir, atraer y retener más.
            </p>

            <Searchbar />
          </div>

          <HeroCarousel />
        </div>
      </section>

      <Chatbot />

      <section className="trending-section">
        <h2 className="section-text">Tendiencias</h2>

        <div className="flex flex-wrap gap-x-8 gap-y-16">
          {allProducts?.map((product) => (
            <ProductCard key={product._id} product={product} />
          ))}
        </div>
      </section>
    </>
  )
}

export default Home