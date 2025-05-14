const form = document.getElementById('registerForm')


form.addEventListener('submit', e => {
    e.preventDefault();
    const dataForm = new FormData(form)

    const obj = {};
    dataForm.forEach((value, key) => {
        obj[key] = value;
    });


    // Hacemos un fetch a las APIs
    fetch('/api/sessions/register', {
        method: 'POST',
        body: JSON.stringify(obj),
        headers: {
            'Content-Type': 'application/json'
        }
    }).then(result => {
        console.log("result.status", result.status);

        if (result.status === 200) {
            result.json()
            alert("Usuario creado con exito!");
            window.location.replace('/users/login');
        } else {
            alert("No se pudo crear el usuario!");
        }
    })

})


/*
FormData es un objeto en JavaScript que se utiliza para construir fácilmente conjuntos de datos clave-valor que representan los campos y valores de un formulario HTML. Esto es útil cuando deseas enviar datos de formulario a través de una solicitud HTTP, como una petición AJAX o una solicitud de formulario.

Cuando creas una instancia de FormData y le pasas un formulario como argumento, la instancia de FormData automáticamente recopila todos los campos y sus valores del formulario y los organiza en un objeto que puedes manipular y enviar fácilmente.
*/