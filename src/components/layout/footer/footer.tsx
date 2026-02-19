export default function Footer() {
	return (
		<footer className="mt-16 border-t border-foreground/10">
			<div className="mx-auto flex w-full max-w-6xl flex-col gap-4 px-6 py-10 sm:flex-row sm:items-center sm:justify-between">
				<p className="text-sm text-foreground/70">
					Borrador de presentación — Cronómetro de Natación
				</p>
				<div className="flex items-center gap-6 text-sm">
					<a href="#como-funciona" className="text-foreground/70 hover:text-foreground">
						Cómo funciona
					</a>
					<a href="#organizacion" className="text-foreground/70 hover:text-foreground">
						Organización
					</a>
					<a href="#contacto" className="text-foreground/70 hover:text-foreground">
						Contacto
					</a>
				</div>
			</div>
		</footer>
	);
}

