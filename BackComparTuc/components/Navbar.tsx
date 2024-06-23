import Image from 'next/image'
import Link from 'next/link'

const navIcons = [
  { src: '/assets/icons/black-heart.svg', alt: 'heart' },
  { src: '/assets/icons/cart.svg', alt: 'cart' },
]

const Navbar = () => {
  return (
    <header className="w-full">
      <nav className="flex justify-between items-center p-4">
        <Link href="/" className="flex items-center gap-1">

          <p className="nav-logo">
            Compar<span className='text-primary'>Tuc</span>
          </p>
        </Link>

        <div className="flex items-center gap-8">
          <Link href="/" className="nav-link">Inicio</Link>
          <Link href="/nosotros" className="nav-link">Nosotros</Link>
          <Link href="/iniciar-sesion" className="nav-link">Inicio Sesión</Link>
          <Link href="/registrarse" className="nav-link">Registrarse</Link>
        </div>

        <div className="flex items-center gap-5">
          {navIcons.map((icon) => (
            <Image 
              key={icon.alt}
              src={icon.src}
              alt={icon.alt}
              width={28}
              height={28}
              className="object-contain"
            />
          ))}
        </div>
      </nav>
    </header>
  )
}

export default Navbar
