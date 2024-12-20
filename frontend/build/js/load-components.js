$(document).ready(function () {
    // Carregar o componente de perfil
    $("#profileContainer").load("profile-info.html", function (response, status, xhr) {
      if (status === "error") {
        console.error("Erro ao carregar o componente de perfil: ", xhr.status, xhr.statusText);
      } else {
        console.log("Componente de perfil carregado com sucesso.");
      }
    });
  
    // Carregar sidebar menu
    $("#sidebarMenu").load("sidebar_menu.html", function (response, status, xhr) {
      if (status === "error") {
        console.error("Erro ao carregar o menu lateral: ", xhr.status, xhr.statusText);
      } else {
        console.log("Menu lateral carregado com sucesso.");
        // Inicializar o efeito de sanfona após o carregamento
        $(".nav.side-menu > li > a").on("click", function () {
          var $li = $(this).parent();
          if ($li.hasClass("active")) {
            $li.removeClass("active active-sm");
            $("ul:first", $li).slideUp();
          } else {
            // Fechar outros menus
            $(".nav.side-menu > li").removeClass("active active-sm");
            $(".nav.side-menu > li ul").slideUp();
  
            $li.addClass("active");
            $("ul:first", $li).slideDown();
          }
        });
      }
    });
  });
  