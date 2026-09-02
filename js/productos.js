//Productos como array de objetos
const productos = [
	{
		id: "sofa-patagonia",
		nombre: "Sofá Patagonia",
		categoria: "Asientos",
		imagen: "assets/images/sofa-patagonia.png",
		descripcion: "Sofá amplio tapizado en lino claro.",
		alt: "Sofá Patagonia tapizado en lino claro con patas cónicas de madera",
		precio: 1950000,
		stock: 6,
	},
	{
		id: "sillon-copacabana",
		nombre: "Sillón Copacabana",
		categoria: "Asientos",
		imagen: "assets/images/sillon-copacabana.png",
		descripcion: "Sillón envolvente tapizado en cuero cognac.",
		alt: "Sillón Copacabana tapizado en cuero color cognac",
		precio: 1350000,
		stock: 4,
	},
	{
		id: "butaca-mendoza",
		nombre: "Butaca Mendoza",
		categoria: "Asientos",
		imagen: "assets/images/butaca-mendoza.png",
		descripcion: "Butaca compacta tapizada en bouclé rosa.",
		alt: "Butaca Mendoza tapizada en bouclé rosa con base de madera",
		precio: 450000,
		stock: 8,
	},
	{
		id: "mesa-comedor-pampa",
		nombre: "Mesa Comedor Pampa",
		categoria: "Mesas",
		imagen: "assets/images/mesa-comedor-pampa.png",
		descripcion: "Mesa de comedor de roble macizo.",
		alt: "Mesa de comedor Pampa de roble macizo",
		precio: 1700000,
		stock: 0,
	},
	{
		id: "mesa-centro-araucaria",
		nombre: "Mesa de Centro Araucaria",
		categoria: "Mesas",
		imagen: "assets/images/mesa-centro-araucaria.png",
		descripcion: "Mesa baja con mármol y base de nogal.",
		alt: "Mesa de centro con tapa de mármol y base de madera de nogal",
		precio: 1250000,
		stock: 5,
	},
	{
		id: "mesa-noche-aconcagua",
		nombre: "Mesa de Noche Aconcagua",
		categoria: "Mesas",
		imagen: "assets/images/mesa-noche-aconcagua.png",
		descripcion: "Mesa auxiliar de madera con cajón.",
		alt: "Mesa de noche Aconcagua de madera con cajón",
		precio: 450000,
		stock: 9,
	},
	{
		id: "aparador-uspallata",
		nombre: "Aparador Uspallata",
		categoria: "Almacenamiento",
		imagen: "assets/images/aparador-uspallata.png",
		descripcion: "Aparador de nogal con amplio espacio interior.",
		alt: "Aparador Uspallata de nogal sostenible con puertas",
		precio: 1400000,
		stock: 5,
	},
	{
		id: "biblioteca-recoleta",
		nombre: "Biblioteca Recoleta",
		categoria: "Almacenamiento",
		imagen: "assets/images/biblioteca-recoleta.png",
		descripcion: "Biblioteca modular de madera y metal.",
		alt: "Biblioteca modular de madera con estructura metálica verde",
		precio: 1200000,
		stock: 4,
	},
	{
		id: "escritorio-costa",
		nombre: "Escritorio Costa",
		categoria: "Escritorios",
		imagen: "assets/images/escritorio-costa.png",
		descripcion: "Escritorio funcional de bambú laminado.",
		alt: "Escritorio Costa de bambú laminado con cajones",
		precio: 650000,
		stock: 7,
	},
	{
		id: "silla-trabajo-belgrano",
		nombre: "Silla de Trabajo Belgrano",
		categoria: "Escritorios",
		imagen: "assets/images/silla-trabajo-belgrano.png",
		descripcion: "Silla de trabajo de madera y tapizado.",
		alt: "Silla de trabajo Belgrano de madera con asiento tapizado",
		precio: 690000,
		stock: 10,
	},
	{
		id: "sillas-cordoba",
		nombre: "Sillas Córdoba",
		categoria: "Asientos",
		imagen: "assets/images/sillas-cordoba.png",
		descripcion: "Set de 4 sillas apilables.",
		alt: "Set de sillas de comedor de madera con asiento verde",
		precio: 950000,
		stock: 15,
	},
];

/* 
====================================================================
CARGA Y RENDERIZADO DEL CATÁLOGO DE PRODUCTOS
- Simula una petición asíncrona con Promise + setTimeout.
- Espera a que el DOM esté listo para buscar #products-grid.
- Genera las tarjetas del catálogo con createElement y appendChild.
==================================================================== 
*/
const cargarProductos = () =>
	new Promise((resolve) => {
		setTimeout(() => {
			resolve(productos);
		}, 500);
	});

document.addEventListener("DOMContentLoaded", async () => {
	const productsGrid = document.querySelector("#products-grid");
	if (!productsGrid) return;

	try {
		const productosCargados = await cargarProductos();

		productosCargados.forEach((producto) => {
			const card = document.createElement("li");
			card.className = "product-card";

			const link = document.createElement("a");
			link.href = `producto.html?id=${producto.id}`;
			link.className = "product-card__link";
			link.setAttribute("aria-label", `Ver detalle de ${producto.nombre}`);

			const media = document.createElement("div");
			media.className = "product-card__media";

			if (producto.stock === 0) {
				const badge = document.createElement("span");
				badge.className = "product-card__badge";
				badge.textContent = "Sin stock";
				media.appendChild(badge);
			}

			const image = document.createElement("img");
			image.src = producto.imagen;
			image.alt = producto.alt;
			image.loading = "lazy";

			const body = document.createElement("div");
			body.className = "product-card__body";

			const title = document.createElement("h2");
			title.className = "product-card__title";
			title.textContent = producto.nombre;

			const desc = document.createElement("p");
			desc.className = "product-card__desc";
			desc.textContent = producto.descripcion;

			const footer = document.createElement("div");
			footer.className = "product-card__footer";

			const price = document.createElement("p");
			price.className = "product-card__price";
			price.textContent = new Intl.NumberFormat("es-AR", {
				style: "currency",
				currency: "ARS",
				maximumFractionDigits: 0,
			}).format(producto.precio);

			const button = document.createElement("button");
			button.type = "button";
			button.className = "product-card__btn";
			button.textContent = "Agregar al carrito";
			button.setAttribute("aria-label", `Agregar ${producto.nombre} al carrito`);

			if (producto.stock === 0) {
				button.disabled = true;
				button.setAttribute("aria-disabled", "true");
				button.classList.add("is-disabled");
				button.title = "Sin stock";
			} else {
				button.addEventListener("click", (event) => {
					event.preventDefault();
					event.stopPropagation();
					window.hjCart.add(producto);
				});
			}

			media.appendChild(image);
			footer.appendChild(price);
			footer.appendChild(button);
			body.appendChild(title);
			body.appendChild(desc);
			body.appendChild(footer);
			link.appendChild(media);
			link.appendChild(body);
			card.appendChild(link);
			productsGrid.appendChild(card);
		});
	} catch (error) {
		console.error("Error al cargar los productos:", error);
	}

	window.hjCart.updateBadge();
});

/*
=============================================================================
FUNCIONALIDAD DEL BOTÓN "AGREGAR AL CARRITO"
- Define el estado del carrito en localStorage bajo la clave hj-carrito.
- Expone el objeto global window.hjCart para compartirlo con otras pantallas.
- Cada botón del catálogo agrega un producto y actualiza el badge del header.
=============================================================================
*/
window.hjCart = {
	key: "hj-carrito",

	get() {
		try {
			return JSON.parse(localStorage.getItem(this.key)) || [];
		} catch (error) {
			return [];
		}
	},

	set(cart) {
		localStorage.setItem(this.key, JSON.stringify(cart));
	},

	total() {
		return this.get().reduce((acc, item) => acc + (Number(item.cantidad) || 0), 0);
	},

	updateBadge() {
		const badge = document.getElementById("cart-count");
		if (!badge) return;

		const total = this.total();
		badge.textContent = total;
		badge.hidden = total === 0;
	},

	add(producto) {
		const carrito = this.get();
		const productoBase = {
			id: producto.id,
			nombre: producto.nombre || "Producto",
			precio: Number(producto.precio) || 0,
			imagen: producto.imagen || "",
			categoria: producto.categoria || "",
		};

		const existingItem = carrito.find((item) => item.id === productoBase.id);

		if (existingItem) {
			existingItem.cantidad = (Number(existingItem.cantidad) || 0) + 1;
			existingItem.nombre = existingItem.nombre || productoBase.nombre;
			existingItem.precio = Number(existingItem.precio) || productoBase.precio;
			existingItem.imagen = existingItem.imagen || productoBase.imagen;
		} else {
			carrito.push({ ...productoBase, cantidad: 1 });
		}

		this.set(carrito);
		this.updateBadge();
	},
};

window.updateCartCount = function updateCartCount() {
	window.hjCart.updateBadge();
};


