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
					<Link href="/#como-funciona" className="hover:text-foreground">
						Cómo funciona
					</Link>
					<Link href="/#organizacion" className="hover:text-foreground">
						Organización
					</Link>
					<Link href="/#contacto" className="hover:text-foreground">
						Contacto
					</Link>
				</nav>

				<div className="flex items-center gap-3">
					<Link
						href="/#contacto"
						className="inline-flex h-9 items-center justify-center rounded-full bg-brand px-4 text-sm font-medium text-brand-foreground transition-transform duration-200 hover:-translate-y-0.5"
					>
						Contactar
					</Link>
				</div>
			</div>
		</header>
	);
}

