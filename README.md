
# Prueba Tecnica DevOOP

#### Para esta aplicacion se hizo uso del lenguaje C# y JS
- ASP.NET 8.0
- React.JS 18.2.0
- SQLSERVER 2022
- VisualStudio






### Modelo ER
![alt text](https://github.com/JosueCuellar/DevOOP/blob/main/diagrama.png?raw=true)

### Requerimientos Funcionales
- Gestion de Empleados (Crear, Editar, Buscar)
- Pagina de Inicio
- Paginacion
- Buscador por Nombre o Documento de Empleado

### Requerimientos Tecnicos
Se hizo uso del patron de diseño MVC (Modelo-Vista-Controlador)


## API Reference
##### El parametro page, se utiliza para la paginacion desde el Backend
#### Obtener Empleados por nombre y documento

```http
  GET /api/Empleado/ListaNombreAndDocumento/{page}/{nombre}/{documento}
```

| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `page` | `int` | **Required**.|
| `nombre` | `string` | **Required**.|
| `documento` | `string` | **Required**.|

#### Obtener Empleados por nombre

```http
  GET /api/Empleado/ListaNombreAndDocumento/{page}/{nombre}
```

| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `page` | `int` | **Required**.|
| `nombre` | `string` | **Required**.|

#### Obtener Empleados documento

```http
  GET /api/Empleado/ListaNombreAndDocumento/{page}/{documento}
```

| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `page` | `int` | **Required**.|
| `documento` | `string` | **Required**.|

#### Obtener Todos los Empleados

```http
  GET /api/Empleado/ListaAll/{page}
```

| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `page` | `int` | **Required**.|

#### Obtener Todos los Paises

```http
  GET /api/Pais/Lista
```
#### Obtener Las Areas segun Pais

```http
  GET /api/Pais/ListaAreas/{id}
```

| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `id` | `string` | **Required**.|

#### Obtener Las SubAreas segun Area

```http
  GET /api/Pais/ListaSubAreas/{id}
```

| Parameter | Type     | Description                |
| :-------- | :------- | :------------------------- |
| `id` | `string` | **Required**.|
