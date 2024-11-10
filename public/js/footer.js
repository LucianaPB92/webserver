function Footer() {
  const footer = document.getElementsByTagName("footer");
  const section = document.createElement("section");
  section.classList.add("container-fluid");

  section.innerHTML = `
      <article class="row" id="CuerpoFooter">
      <aside class="col-xl-4 col-sm-12 col-md-4">
          <br>
            <ul>
              <li><a href="index.html">Inicio</a></li>
              <li><a href="">Viajes</a></li>
              <li><a href="/pages/Nosotros.html">Acerca de Nosotros</a></li>
            </ul>
          </aside>
          <aside class="col-xl-4 col-sm-12 col-md-4">
          <br>
            <ul>
              <li><a href="./pages/404.html">Terminos y condiciones</a></li>
              <li><a href="./pages/404.html">Politica de privacidad</a></li>
              <li>
                <a href="./pages/404.html">Politica de derecho de autor</a>
              </li>
              <li><a href="./pages/404.html">Descargar App Movil</a></li>
            </ul>
          </aside>
          <aside class="col-xl-4 col-sm-12 col-md-4">
      <div id="contenedorLogo"><img id="logo"src="./assets/logo.jpeg" alt=""></div>
      </aside>
        </article>
        <article class="row" class="sociales">
            <div class="wrapper">
            <ul>
              <li class="facebook"><a href="https://www.facebook.com/?locale=es_ES" class="social-icons"><i class="fa fa-facebook fa-1x" aria-hidden="true"></i></a></li>
              <li class="twitter"><a href="https://x.com/?lang=es" class="social-icons"><i class="fa fa-twitter fa-1x" aria-hidden="true"></i></a></li>
              <li class="instagram"><a href="https://www.instagram.com/" class="social-icons"><i class="fa fa-instagram fa-1x" aria-hidden="true"></i></a></li>
              <li class="linkedin"><a href="https://es.linkedin.com/?src=go-pa&trk=sem-ga_campid.18146679037_asid.140850334975_crid.694860685343_kw.linkedin_d.c_tid.kwd-148086543_n.g_mt.e_geo.9047063&mcid=6968657504633266178&cid=&gad_source=1&gclid=CjwKCAjw1K-zBhBIEiwAWeCOFxuW93R-7KcD9DucfjppOLs3BVpdj5OA0L44u9xlNM1n-_ja4tH7YxoCPYoQAvD_BwE&gclsrc=aw.ds" class="social-icons"><i class="fa fa-linkedin fa-1x" aria-hidden="true"></i></a></li>
              <li class="whatsapp"><a href="" class="social-icons"><i class="fa fa-whatsapp fa-1x" aria-hidden="true"></i></a></li>
            </ul>
            </div>
        </article>
        <article class="row" id="copyrightFooter">  
        <p class="h6 text-center" style-color="white">&copy; 2023. Todos los derechos reservados.</p>
        </article>
      `;
  footer[0].appendChild(section);
}
Footer();
