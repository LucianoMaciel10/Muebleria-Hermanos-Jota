const productos = [
	{
		id: "sofa-patagonia",
		nombre: "Sofá Patagonia",
		categoria: "Asientos",
		imagen: "assets/images/sofa-patagonia.png",
		descripcion: "Sofá amplio tapizado en lino claro.",
		alt: "Sofá Patagonia tapizado en lino claro con patas cónicas de madera",
	},
	{
		id: "sillon-copacabana",
		nombre: "Sillón Copacabana",
		categoria: "Asientos",
		imagen: "assets/images/sillon-copacabana.png",
		descripcion: "Sillón envolvente tapizado en cuero cognac.",
		alt: "Sillón Copacabana tapizado en cuero color cognac",
	},
	{
		id: "butaca-mendoza",
		nombre: "Butaca Mendoza",
		categoria: "Asientos",
		imagen: "assets/images/butaca-mendoza.png",
		descripcion: "Butaca compacta tapizada en bouclé rosa.",
		alt: "Butaca Mendoza tapizada en bouclé rosa con base de madera",
	},
	{
		id: "mesa-comedor-pampa",
		nombre: "Mesa Comedor Pampa",
		categoria: "Mesas",
		imagen: "assets/images/mesa-comedor-pampa.png",
		descripcion: "Mesa de comedor de roble macizo.",
		alt: "Mesa de comedor Pampa de roble macizo",
	},
	{
		id: "mesa-centro-araucaria",
		nombre: "Mesa de Centro Araucaria",
		categoria: "Mesas",
		imagen: "assets/images/mesa-centro-araucaria.png",
		descripcion: "Mesa baja con mármol y base de nogal.",
		alt: "Mesa de centro con tapa de mármol y base de madera de nogal",
	},
	{
		id: "mesa-noche-aconcagua",
		nombre: "Mesa de Noche Aconcagua",
		categoria: "Mesas",
		imagen: "assets/images/mesa-noche-aconcagua.png",
		descripcion: "Mesa auxiliar de madera con cajón.",
		alt: "Mesa de noche Aconcagua de madera con cajón",
	},
	{
		id: "aparador-uspallata",
		nombre: "Aparador Uspallata",
		categoria: "Almacenamiento",
		imagen: "assets/images/aparador-uspallata.png",
		descripcion: "Aparador de nogal con amplio espacio interior.",
		alt: "Aparador Uspallata de nogal sostenible con puertas",
	},
	{
		id: "biblioteca-recoleta",
		nombre: "Biblioteca Recoleta",
		categoria: "Almacenamiento",
		imagen: "assets/images/biblioteca-recoleta.png",
		descripcion: "Biblioteca modular de madera y metal.",
		alt: "Biblioteca modular de madera con estructura metálica verde",
	},
	{
		id: "escritorio-costa",
		nombre: "Escritorio Costa",
		categoria: "Escritorios",
		imagen: "assets/images/escritorio-costa.png",
		descripcion: "Escritorio funcional de bambú laminado.",
		alt: "Escritorio Costa de bambú laminado con cajones",
	},
	{
		id: "silla-trabajo-belgrano",
		nombre: "Silla de Trabajo Belgrano",
		categoria: "Escritorios",
		imagen: "assets/images/silla-trabajo-belgrano.png",
		descripcion: "Silla de trabajo de madera y tapizado.",
		alt: "Silla de trabajo Belgrano de madera con asiento tapizado",
	},
	{
		id: "sillas-cordoba",
		nombre: "Sillas Córdoba",
		categoria: "Asientos",
		imagen: "assets/images/sillas-cordoba.png",
		descripcion: "Set de sillas apilables con asiento verde.",
		alt: "Set de sillas de comedor de madera con asiento verde",
	},
];

document.addEventListener("DOMContentLoaded", () => {
	const productsGrid = document.getElementById("products-grid");
	if (!productsGrid) return;

	productsGrid.innerHTML = productos
		.map(
			(producto) => `
				<li class="product-card">
					<a href="producto.html?id=${producto.id}" class="product-card__link">
						<div class="product-card__media">
							<img src="${producto.imagen}" alt="${producto.alt}" loading="lazy">
						</div>
						<div class="product-card__body">
							<h2 class="product-card__title">${producto.nombre}</h2>
							<p class="product-card__desc">${producto.descripcion}</p>
						</div>
					</a>
				</li>
			`,
		)
		.join("");
});
