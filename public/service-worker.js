self.addEventListener('push', function(event) {
    const options = {
      body: event.data.text(),
      icon: 'icon.png',  // Puedes agregar un icono si lo deseas
      badge: 'badge.png' // Agregar un badge si lo deseas
    };
    event.waitUntil(
      self.registration.showNotification('Nuevo Mensaje', options)
    );
  });
  