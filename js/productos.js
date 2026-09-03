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
		stock: true,
	},
	{
		id: "sillon-copacabana",
		nombre: "Sillón Copacabana",
		categoria: "Asientos",
		imagen: "assets/images/sillon-copacabana.png",
		descripcion: "Sillón envolvente tapizado en cuero cognac.",
		alt: "Sillón Copacabana tapizado en cuero color cognac",
		precio: 1350000,
		stock: true,
	},
	{
		id: "butaca-mendoza",
		nombre: "Butaca Mendoza",
		categoria: "Asientos",
		imagen: "assets/images/butaca-mendoza.png",
		descripcion: "Butaca compacta tapizada en bouclé rosa.",
		alt: "Butaca Mendoza tapizada en bouclé rosa con base de madera",
		precio: 450000,
		stock: true,
	},
	{
		id: "mesa-comedor-pampa",
		nombre: "Mesa Comedor Pampa",
		categoria: "Mesas",
		imagen: "assets/images/mesa-comedor-pampa.png",
		descripcion: "Mesa de comedor de roble macizo.",
		alt: "Mesa de comedor Pampa de roble macizo",
		precio: 1700000,
		stock: false,
	},
	{
		id: "mesa-centro-araucaria",
		nombre: "Mesa de Centro Araucaria",
		categoria: "Mesas",
		imagen: "assets/images/mesa-centro-araucaria.png",
		descripcion: "Mesa baja con mármol y base de nogal.",
		alt: "Mesa de centro con tapa de mármol y base de madera de nogal",
		precio: 1250000,
		stock: true,
	},
	{
		id: "mesa-noche-aconcagua",
		nombre: "Mesa de Noche Aconcagua",
		categoria: "Mesas",
		imagen: "assets/images/mesa-noche-aconcagua.png",
		descripcion: "Mesa auxiliar de madera con cajón.",
		alt: "Mesa de noche Aconcagua de madera con cajón",
		precio: 450000,
		stock: true,
	},
	{
		id: "aparador-uspallata",
		nombre: "Aparador Uspallata",
		categoria: "Almacenamiento",
		imagen: "assets/images/aparador-uspallata.png",
		descripcion: "Aparador de nogal con amplio espacio interior.",
		alt: "Aparador Uspallata de nogal sostenible con puertas",
		precio: 1400000,
		stock: true,
	},
	{
		id: "biblioteca-recoleta",
		nombre: "Biblioteca Recoleta",
		categoria: "Almacenamiento",
		imagen: "assets/images/biblioteca-recoleta.png",
		descripcion: "Biblioteca modular de madera y metal.",
		alt: "Biblioteca modular de madera con estructura metálica verde",
		precio: 1200000,
		stock: true,
	},
	{
		id: "escritorio-costa",
		nombre: "Escritorio Costa",
		categoria: "Escritorios",
		imagen: "assets/images/escritorio-costa.png",
		descripcion: "Escritorio funcional de bambú laminado.",
		alt: "Escritorio Costa de bambú laminado con cajones",
		precio: 650000,
		stock: true,
	},
	{
		id: "silla-trabajo-belgrano",
		nombre: "Silla de Trabajo Belgrano",
		categoria: "Asientos",
		imagen: "assets/images/silla-trabajo-belgrano.png",
		descripcion: "Silla de trabajo de madera y tapizado.",
		alt: "Silla de trabajo Belgrano de madera con asiento tapizado",
		precio: 690000,
		stock: true,
	},
	{
		id: "sillas-cordoba",
		nombre: "Sillas Córdoba",
		categoria: "Asientos",
		imagen: "assets/images/sillas-cordoba.png",
		descripcion: "Set de 4 sillas apilables.",
		alt: "Set de sillas de comedor de madera con asiento verde",
		precio: 950000,
		stock: true,
	},
];

/* 
====================================================================
CARGA Y RENDERIZADO DEL CATÁLOGO DE PRODUCTOS
==================================================================== 
*/
function cargarCatalogo() {
	const productsGrid = document.querySelector("#products-grid");
	const categoryFilter = document.querySelector("#category-filter");
	if (!productsGrid) return;

	productsGrid.innerHTML = "";
	const categoriaSeleccionada = new URLSearchParams(window.location.search)
		.get("categoria")
		?.toLowerCase();
	if (categoryFilter) {
		categoryFilter.value = categoriaSeleccionada || "";
		categoryFilter.onchange = () => {
			const parametros = new URLSearchParams(window.location.search);
			if (categoryFilter.value) {
				parametros.set("categoria", categoryFilter.value);
			} else {
				parametros.delete("categoria");
			}
			const nuevaUrl = parametros.toString()
				? `${window.location.pathname}?${parametros}`
				: window.location.pathname;
			window.history.pushState({}, "", nuevaUrl);
			cargarCatalogo();
		};
	}
	const productosFiltrados = categoriaSeleccionada
		? productos.filter(
				(producto) => producto.categoria.toLowerCase() === categoriaSeleccionada,
			)
		: productos;

	productosFiltrados.forEach((producto) => {
		const item = document.createElement("li");
		const tarjeta = document.createElement("article");
		tarjeta.className = "product-card";

		const precio = new Intl.NumberFormat("es-AR", {
			style: "currency",
			currency: "ARS",
			maximumFractionDigits: 0,
		}).format(producto.precio);
		const sinStock = !producto.stock;

		tarjeta.innerHTML = `
			<div class="product-card__media">
				<a href="producto.html?id=${producto.id}" class="product-card__link" aria-label="Ver detalle de ${producto.nombre}">
					${sinStock ? '<span class="product-card__badge">Sin stock</span>' : ""}
					<img src="${producto.imagen}" alt="${producto.alt}" loading="lazy">
				</a>
			</div>
			<div class="product-card__body">
				<h2 class="product-card__title">
					<a href="producto.html?id=${producto.id}" class="product-card__link">
						${producto.nombre}
					</a>
				</h2>
				<p class="product-card__desc">${producto.descripcion}</p>
				<div class="product-card__footer">
					<p class="product-card__price">${precio}</p>
					<button type="button" class="product-card__btn" data-product-id="${producto.id}" aria-label="Agregar ${producto.nombre} al carrito" ${sinStock ? 'disabled aria-disabled="true" title="Sin stock"' : ""}>
						Agregar al carrito
					</button>
				</div>
			</div>
		`;

		item.appendChild(tarjeta);
		productsGrid.appendChild(item);
	});

	productsGrid.onclick = (event) => {
		const button = event.target.closest("[data-product-id]");
		if (!button || button.disabled) return;

		const producto = productos.find(
			(item) => item.id === button.dataset.productId,
		);
		
		if (producto) window.hjCart.add(producto);
	};

};

document.addEventListener("DOMContentLoaded", () => {
	setTimeout(cargarCatalogo, 500);
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


