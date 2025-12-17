# Saludo API
Este es un pequeño hecho en Node.js y TypeScript que simula el funcionamiento de una API.

## Tecnologías usadas

- Entorno de ejecución: **Node.js**
- Lenguaje de programación: **Nest.js**
- Librerías: **openmeteo** (API de servicio del clima)
- Software de contenedorización: **Docker**

## Instalación
1. **Descargar y crear el .env**
    Descargue el proyecto, Descomprimalo de ser necesario y ubiquelo en una carpeta de preferencia. Una vez realizado eso cree un archivo **.env** (sin nombre, solo la extensión) y completelo con los siguiente parámetros:
    ```env
    URLOPENMETEO = https://api.open-meteo.com/v1/forecast
    LATITUDE = -34.6551
    LONGITUDE = -58.5532
    TIMEZONE = America/Argentina/Buenos_Aires
    ```
Puede modificar los parámetros de latitud (LATITUDE) y longitud (LONGITUDE) para adaptarlos a su zona (puede extraer los mismos desde Google Maps) y así mismo modificar la zona horaria (TIMEZONE) para ajustarla a la suya.

2. **ejecutar la aplicación**
    El proyecto está pensado para ser desplegado con **Docker** pero otras maneras de despliegue (por ejemplo con node directamente) pueden ser utilizadas. 
    Si elige Docker como manera de ejecutar la aplicación deberá abrir una consola/terminal en la carpeta misma del proyecto (puede usar un IDE que permita el uso de terminales como VScode) y ejecutar el comando `docker compose up --build` para crear el contenedor y la imagen en docker. Luego de uno o más minutos el proyecto ya debería estar ejecutado (a partir de este punto solo necesitará ejecutar el comando `docker compose up` cuando quiera volver a ejecutar el proyecto).
   
4. **comprobación**
    Si todo se ejecutó de manera correcta deberá ingresar a <http://localhost:3000/> y deberá ver el siguiente mensaje en formato JSON.
    ```json
    {"message":"Proyecto iniciado!"}
    ```

## Indicaciones de uso
El proyecto cuenta con una sola api: "**saludo**", la cual solo se encarga de recibir un nombre y saludar a dicho nombre acompañado de un "**buenos días**", "**buenas tardes**" o "**buenas noches**" dependiendo la hora del día y la iluminación solar de ese momento (Explicado más adelante en la parte de funcionamiento). 
```json
{"saludo":"Hola juan, buenas tardes"}
```
para acceder a dicho saludo hay 3 maneras de hacerlo:
1. Por medio de la URL (**GET**)
    Para que la API lo salude deberá ingresar a <http://localhost:3000/api/welcome/SuNombre>, debiendo modificar **SuNombre** por el nombre que usted quiera que la api salude. Si no ingresa nada o si ingresa caracteres especiales y/o números se devolverá un mensaje de error.
   
2. Por medio de la URL con Query String (**GET**)
    La otra manera es agregando el parámetro **nombre** en la url como un query string de la siguiente manera: <http://localhost:3000/api/welcome?nombre=SuNombre>. al igual que el anterior caso se mostrará un mensaje de error si no se respeta el formato esperado en el nombre y si en la query string no se encuentra el parámetro **nombre**.
   
3. Por medio de un JSON en el Body del Request (**POST**)
    La última manera es por medio del método POST a la url <http://localhost:3000/api/welcome>, enviando un objeto en formato JSON en el body del request de la siguiente manera:
    ```json
    {"nombre": "SuNombre"}
    ```
    Al igual que los demás casos se devolverá un mensaje de error si no se respeta el formato del nombre y si no envía el parámetro nombre en el objeto en formato JSON.

## Demo en vivo
https://proyecto-nestjs-saludo.onrender.com/api/welcome/juan

## Problemas Conocidos
si se envia una query muy larga puede romper el proyecto.
