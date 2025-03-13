![imagen](https://github.com/user-attachments/assets/02f2e96d-b769-4e78-9f59-6874983f929c)  
![imagen](https://github.com/user-attachments/assets/1b29a8c8-10a5-4d3e-a8c8-1b6d2236ce7c)  
![imagen](https://github.com/user-attachments/assets/a792f0ff-afed-454d-8ddf-76b3f51fdc79)  

El archivo recap.csv se ecuentra en shared-volume

## Pasos para Ejecutar el Proyecto


1. **Clona el repositorio:**

   ```
   git clone https://github.com/julianReyes-dev/parcial1.git
   ```
   ```
   cd parcial1¹
   ```

2. **Levanta los servicios con Docker Compose:**  
   
   ```
   docker-compose --env-file .env up --build -d
   ```
3. **Levanta los servicios con Docker Compose:**  

   Ingresar a
   ```
   http://localhost:7474
   ```
   Deja todo igual y solo introduce la siguiente contraseña:
   ```
   julian.reyes04
   ```

4. **Prueba la API**  

   Opción 1: Ingresa a la url, espera unos segundos y revisa la carpeta shared-volume que tendrá el .csv generado. El json aparecerá en el navegador
   ```
   http://localhost:3000/api/extract
   ```
   Opción 2: Haz el curl 
   ```
   curl http://localhost:3000/api/extract
   ```
5. **Ver postgress**  

   ```
   docker exec -it postgres psql -U admin -d etl_db
   ```
   ```
   SELECT * FROM etl_data;
   ```
