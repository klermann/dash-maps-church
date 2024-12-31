document.addEventListener("DOMContentLoaded", function () {
  // Função para carregar componentes
  async function loadComponent(selector, filePath, callback) {
    try {
      const response = await fetch(filePath);
      if (!response.ok) throw new Error(`Erro HTTP: ${response.status}`);
      const content = await response.text();
      document.querySelector(selector).innerHTML = content;
      console.log(`${filePath} carregado com sucesso.`);

      // Executar callback após carregar o componente
      if (callback) callback();
    } catch (error) {
      console.error(`Erro ao carregar ${filePath}:`, error);
    }
  }

  // Carregar o menu lateral com o efeito sanfona
  loadComponent("#sidebarMenu", "sidebar_menu.html", function () {
    console.log("Inicializando o efeito de sanfona...");
    document.querySelectorAll(".nav.side-menu > li > a").forEach((link) => {
      link.addEventListener("click", function () {
        const li = this.parentElement;
        const submenu = li.querySelector("ul");

        if (li.classList.contains("active")) {
          li.classList.remove("active", "active-sm");
          if (submenu) submenu.style.display = "none";
        } else {
          // Fechar outros menus
          document.querySelectorAll(".nav.side-menu > li").forEach((item) => {
            item.classList.remove("active", "active-sm");
            const ul = item.querySelector("ul");
            if (ul) ul.style.display = "none";
          });

          // Abrir o submenu atual
          li.classList.add("active");
          if (submenu) submenu.style.display = "block";
        }
      });
    });
  });

  // Carregar os outros componentes
  loadComponent("#profileContainer", "profile-info.html");
  loadComponent("#sidebarFooter", "side_bar_footer.html");
  loadComponent("#topNav", "top_nav.html");
  loadComponent("#footer", "footer.html");
});
