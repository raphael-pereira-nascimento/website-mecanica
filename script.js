// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    e.preventDefault();
    document.querySelector(this.getAttribute("href")).scrollIntoView({
      behavior: "smooth",
    });
  });
});

// Form submission
document.getElementById("contactForm").addEventListener("submit", function (e) {
  e.preventDefault();
  const service = this.querySelector("select").value;
  let serviceName = "";
  let servicePrice = "";

  switch (service) {
    case "troca-oleo":
      serviceName = "Troca de Óleo";
      servicePrice = "R$ 80,00";
      break;
    case "freios":
      serviceName = "Freios";
      servicePrice = "A partir de R$ 150,00";
      break;
    case "eletrico":
      serviceName = "Sistema Elétrico";
      servicePrice = "A partir de R$ 120,00";
      break;
    case "suspensao":
      serviceName = "Suspensão";
      servicePrice = "A partir de R$ 200,00";
      break;
    case "ar-condicionado":
      serviceName = "Ar Condicionado";
      servicePrice = "A partir de R$ 180,00";
      break;
    case "diagnostico":
      serviceName = "Diagnóstico";
      servicePrice = "A partir de R$ 100,00";
      break;
    case "manutencao-basica":
      serviceName = "Manutenção Básica";
      servicePrice = "R$ 199,00";
      break;
    case "completo":
      serviceName = "Pacote Completo";
      servicePrice = "R$ 399,00";
      break;
    case "premium":
      serviceName = "Pacote Premium";
      servicePrice = "R$ 599,00";
      break;
    case "express":
      serviceName = "Pacote Express";
      servicePrice = "R$ 99,00";
      break;
  }

  alert(
    `Agendamento enviado com sucesso!\nServiço selecionado: ${serviceName}\nValor: ${servicePrice}\n\nEm breve entraremos em contato para confirmar.`
  );
  this.reset();
});

// Header scroll effect
window.addEventListener("scroll", function () {
  const header = document.querySelector("header");
  if (window.scrollY > 100) {
    header.style.boxShadow = "0 5px 20px rgba(0,0,0,0.2)";
    header.style.background =
      "linear-gradient(135deg, rgba(44, 62, 80, 0.95), rgba(26, 37, 48, 0.95))";
  } else {
    header.style.boxShadow = "0 2px 10px rgba(0,0,0,0.1)";
    header.style.background =
      "linear-gradient(135deg, var(--primary), #1a2530)";
  }
});
