import Image from "next/image";
import Link from "next/link";

export default function Navbar() {
	return (
		<header className="sticky top-0 z-50 border-b border-foreground/10 bg-background/80 backdrop-blur">
			<div className="mx-auto flex w-full max-w-6xl items-center justify-between px-6 py-4">
				<Link href="/" className="flex items-center gap-3 font-semibold tracking-tight">
					<Image
						src="/img/aec.jpeg"
						alt="Logo"
						width={28}
						height={28}
						className="rounded"
					/>
					<span>Cronómetro</span>
				</Link>

				<nav className="hidden items-center gap-6 text-sm text-foreground/80 sm:flex">
					<a href="#como-funciona" className="hover:text-foreground">
						Cómo funciona
					</a>
					<a href="#organizacion" className="hover:text-foreground">
						Organización
					</a>
					<a href="#contacto" className="hover:text-foreground">
						Contacto
					</a>
				</nav>

				<div className="flex items-center gap-3">
					<a
						href="#contacto"
						className="inline-flex h-9 items-center justify-center rounded-full border border-foreground/15 px-4 text-sm font-medium hover:border-foreground/25"
					>
						Pedir demo
					</a>
				</div>
			</div>
		</header>
	);
}

