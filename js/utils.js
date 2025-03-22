const notificarUsuario = (message, color = '#5477f5', duration = 3000) => {
  Toastify({
    text: message,
    duration,
    newWindow: true,
    close: true,
    gravity: 'top',
    position: 'center',
    stopOnFocus: true,
    style: {
      background: color
    }
  }).showToast();
};

const confirmacionPopup = () => {
  return new Promise((resolve, reject) => {
    Swal.fire({
      title: 'Ingrese sus datos',
      html: `
        <input id="name" class="swal2-input" placeholder="Nombre">
        <input id="email" class="swal2-input" placeholder="Correo electronico" type="email">
      `,
      focusConfirm: false,
      allowOutsideClick: false,
      showCancelButton: true,
      cancelButtonText: 'Cancelar',
      confirmButtonText: 'Enviar',
      preConfirm: () => {
        const name = document.getElementById('name').value;
        const email = document.getElementById('email').value;

        if (!name || !email) {
          Swal.showValidationMessage('Por favor, introduzca su nombre y correo electrónico');
          return false;
        }
        return { name, email };
      }
    }).then((result) => {
      if (result.isConfirmed) {
        const { name, email } = result.value;
        Swal.fire({
          title: `¡Gracias por registrarte, ${name}!`,
          text: `Pronto recibiras un correo con más informacion sobre tu curso y como proceder con el pago. ¡Nos emociona tenerte en nuestra comunidad!`,
          icon: 'success',
          allowOutsideClick: false,
          confirmButtonText: 'Aceptar',
        }).then(() => {
          resolve(result.value);
        });
      } else if (result.dismiss === Swal.DismissReason.cancel) {
        Swal.fire({
          title: 'Inscripcion cancelada',
          text: 'Has cancelado la inscripción.',
          icon: 'error',
          allowOutsideClick: false,
        }).then(() => {
          reject('Canceled');
        });
      }
    });
  });
}

export { notificarUsuario, confirmacionPopup };
