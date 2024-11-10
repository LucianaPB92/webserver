// Inicializo los datos de usuarios en localStorage 
const datosUsuarios = () => {
   let users = [
     {
       id: "mrtravel",
       email: "mrtravel@gmail.com",
       password: "MrTravel2024",
       rol: "admin",
     },
     {
       id: "traveler",
       email: "traveler@gmail.com",
       password: "Traveler2024",
       rol: "user",
     },
   ];
 
   localStorage.setItem("users", JSON.stringify(users));
 };
 
 datosUsuarios();
 
 const formularioLogin = document.getElementById("formulariologin");
 const correoInput = document.getElementById("email");
 const passwordInput = document.getElementById("password");
 const administradorLink = document.getElementById("administrador");
 const btnLogout = document.getElementById("btnLogout");
 const btnLogin = document.getElementById("btnLogin");
 
 const logIn = (event) => {
   event.preventDefault();
 
   let usuarios = JSON.parse(localStorage.getItem("users")) || [];
 
   let usuarioValido = usuarios.find(
     (usuario) =>
       usuario.email === correoInput.value && usuario.password === passwordInput.value
   );
 
   if (usuarioValido) {
     localStorage.setItem("user", JSON.stringify(usuarioValido));
     mostrarContenidoSegunRol(usuarioValido.rol);
     
     const modal = bootstrap.Modal.getInstance(document.getElementById('modalLogin'));
     modal.hide();
   } else {
     alert("Correo o contraseña incorrectos");
   }
 };
 
 const mostrarContenidoSegunRol = (rol) => {
   if (rol === "admin") {
     administradorLink.style.display = 'block';
     btnLogout.style.display = 'block'
     btnLogin.style.display = 'none';
     ;
   } else if (rol === "user") {
     administradorLink.style.display = 'none'; 
     btnLogout.style.display = 'block';
     btnLogin.style.display = 'none';  
   } else {
     administradorLink.style.display = 'none'; 
     btnLogout.style.display = 'none'; 
     btnLogin.style.display = 'block'; 
   }
 };
 
 const logOut = () => {
   localStorage.removeItem("user");
   mostrarContenidoSegunRol(''); 
 };
 
 // evento envío de formulario de inicio sesión y evento clic en cerrar sesión
 formularioLogin.addEventListener("submit", logIn); 
 btnLogout.addEventListener("click", logOut);
 
 // Mostrar contenido según el rol del usuario al cargar la página
 window.onload = () => {
   const usuario = JSON.parse(localStorage.getItem("user"));
   if (usuario) {
     mostrarContenidoSegunRol(usuario.rol);
   } else {
     mostrarContenidoSegunRol('');
   }
 };
