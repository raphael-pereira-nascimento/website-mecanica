  // Smooth scrolling for navigation links
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
      anchor.addEventListener('click', function (e) {
          e.preventDefault();
          document.querySelector(this.getAttribute('href')).scrollIntoView({
              behavior: 'smooth'
          });
      });
  });

// --- 1. Função para mostrar o Toast ---
// Definida no escopo global para ser acessível em qualquer lugar após o DOMContentLoaded
function showToast(message, isError = false) {
    // Tenta encontrar os elementos do toast
    const toast = document.getElementById('toast');
    const toastMessage = document.getElementById('toastMessage');

    // Verificação de segurança para elementos do DOM
    if (!toast || !toastMessage) {
        console.error("Elementos do Toast (#toast, #toastMessage) não encontrados no DOM.");
        // Fallback para alert se os elementos não existirem
        // Remova este fallback se não quiser o alerta
        // if (isError) {
        //     alert("Erro: " + message);
        // } else {
        //     alert(message);
        // }
        return; // Sai da função se os elementos não forem encontrados
    }

    // Atualiza o conteúdo da mensagem
    toastMessage.textContent = message;

    // Reseta classes anteriores
    toast.className = 'toast';

    // Configura o toast com base no tipo (sucesso ou erro)
    if (isError) {
        toast.classList.add('error');
        // Usando innerHTML para incluir o ícone de erro
        toast.innerHTML = '<i class="fas fa-exclamation-circle"></i> <span id="toastMessage">' + message + '</span>';
    } else {
        toast.classList.remove('error');
        // Usando innerHTML para incluir o ícone de sucesso
        toast.innerHTML = '<i class="fas fa-check-circle"></i> <span id="toastMessage">' + message + '</span>';
    }

    // Adiciona a classe 'show' para fazer o toast aparecer com animação
    toast.classList.add('show');

    // Remove o toast após 3 segundos
    setTimeout(() => {
        toast.classList.remove('show');
        // Opcional: Resetar o conteúdo após sumir
        // toast.innerHTML = '<i class="fas fa-check-circle"></i> <span id="toastMessage">Mensagem enviada com sucesso!</span>';
    }, 3000);
}

// --- 2. Espera o DOM carregar completamente ---
document.addEventListener('DOMContentLoaded', function () {

    // --- Smooth Scrolling para Links de Navegação ---
    const navLinks = document.querySelectorAll('a[href^="#"]');
    navLinks.forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                targetElement.scrollIntoView({
                    behavior: 'smooth'
                });
            }
        });
    });

    // --- Formulário de Contato ---
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', function (e) {
            e.preventDefault();
            const serviceSelect = this.querySelector('select');
            const service = serviceSelect ? serviceSelect.value : '';
            let serviceName = '';
            let servicePrice = '';

            switch (service) {
                case 'troca-oleo': serviceName = 'Troca de Óleo'; servicePrice = 'R$ 80,00'; break;
                case 'freios': serviceName = 'Freios'; servicePrice = 'A partir de R$ 150,00'; break;
                case 'eletrico': serviceName = 'Sistema Elétrico'; servicePrice = 'A partir de R$ 120,00'; break;
                case 'suspensao': serviceName = 'Suspensão'; servicePrice = 'A partir de R$ 200,00'; break;
                case 'ar-condicionado': serviceName = 'Ar Condicionado'; servicePrice = 'A partir de R$ 180,00'; break;
                case 'diagnostico': serviceName = 'Diagnóstico'; servicePrice = 'A partir de R$ 100,00'; break;
                case 'manutencao-basica': serviceName = 'Manutenção Básica'; servicePrice = 'R$ 199,00'; break;
                case 'completo': serviceName = 'Pacote Completo'; servicePrice = 'R$ 399,00'; break;
                case 'premium': serviceName = 'Pacote Premium'; servicePrice = 'R$ 599,00'; break;
                case 'express': serviceName = 'Pacote Express'; servicePrice = 'R$ 99,00'; break;
                default: serviceName = 'Serviço não especificado'; servicePrice = 'Não informado';
            }

            // Chama a função showToast com a mensagem de sucesso
            showToast(`Agendamento enviado com sucesso!\nServiço selecionado: ${serviceName}\nValor: ${servicePrice}\n\nEm breve entraremos em contato para confirmar.`);

            this.reset(); // Reseta o formulário após o envio
        });
    } else {
        console.warn("Formulário de contato (#contactForm) não encontrado.");
    }

    // --- Efeito de Sombra no Header ao Scroll ---
    window.addEventListener('scroll', function () {
        const header = document.querySelector('header');
        if (header) {
            if (window.scrollY > 100) {
                header.style.boxShadow = '0 5px 20px rgba(0,0,0,0.2)';
                header.style.background = 'linear-gradient(135deg, rgba(44, 62, 80, 0.95), rgba(26, 37, 48, 0.95))';
            } else {
                header.style.boxShadow = '0 2px 10px rgba(0,0,0,0.1)';
                header.style.background = 'linear-gradient(135deg, var(--primary), #1a2530)';
            }
        }
    });

    // --- Modal de Seleção de Serviços ---
    // Elementos do Modal
    const modal = document.getElementById('serviceModal');
    const modalTitle = document.getElementById('modalTitle');
    const serviceOptionsContainer = document.getElementById('serviceOptions');
    const selectServiceBtn = document.getElementById('selectServiceBtn');
    const closeBtn = document.querySelector('.close'); // O 'x' para fechar

    // Verifica se todos os elementos do modal existem antes de prosseguir
    if (modal && modalTitle && serviceOptionsContainer && selectServiceBtn && closeBtn) {
        
        // Dados dos serviços com opções e produtos
        const serviceData = {
            'troca-oleo': {
                name: 'Troca de Óleo',
                options: [
                    { id: 'oleo-basico', name: 'Básico', price: 'R$ 80,00', description: 'Troca de óleo sintético 5W30 e filtro básico para manutenção rotineira.', products: 'Óleo sintético 5W30 (Shell/Honda), Filtro de óleo padrão' },
                    { id: 'oleo-premium', name: 'Premium', price: 'R$ 120,00', description: 'Troca de óleo premium 0W20, filtros completos e inspeção do motor.', products: 'Óleo premium 0W20 (Mobil 1), Filtros originais, Aditivo limpeza' },
                    { id: 'oleo-completo', name: 'Completo', price: 'R$ 160,00', description: 'Troca premium com limpeza do cárter e verificação detalhada do motor.', products: 'Óleo especializado, Filtros premium, Limpeza do sistema, Inspeção completa' }
                ]
            },
            'freios': {
                name: 'Freios',
                options: [
                    { id: 'freios-basico', name: 'Pastilhas Dianteiras', price: 'R$ 150,00', description: 'Substituição de pastilhas dianteiras com discos padrão para segurança básica.', products: 'Pastilhas Metalmix, Discos padrão, Fluido DOT4' },
                    { id: 'freios-completo', name: 'Sistema Completo', price: 'R$ 350,00', description: 'Substituição completa de pastilhas, discos dianteiros e traseiros.', products: 'Pastilhas Brembo, Discos ventilados, Fluido premium, Kits completos' },
                    { id: 'freios-premium', name: 'Premium', price: 'R$ 500,00', description: 'Componentes premium com sangria do sistema e alinhamento dos freios.', products: 'Pastilhas ceramicas, Discos especiais, Fluido racing, Kits Brembo' }
                ]
            },
            'sistema-eletrico': {
                name: 'Sistema Elétrico',
                options: [
                    { id: 'eletrico-diagnostico', name: 'Diagnóstico', price: 'R$ 120,00', description: 'Verificação completa do sistema elétrico com equipamentos especializados.', products: 'Scanner profissional, Multímetro digital, Teste de componentes' },
                    { id: 'eletrico-bateria', name: 'Bateria e Alternador', price: 'R$ 250,00', description: 'Teste e substituição de bateria e alternador com cabos premium.', products: 'Bateria Moura/Motrax, Alternador original, Cabos premium' },
                    { id: 'eletrico-completo', name: 'Sistema Completo', price: 'R$ 400,00', description: 'Diagnóstico completo e substituição de todos os componentes elétricos.', products: 'Bateria premium, Alternador Bosch, Fusiveis originais, Cabos de alta performance' }
                ]
            },
            'suspensao': {
                name: 'Suspensão',
                options: [
                    { id: 'suspensao-basico', name: 'Amortecedores', price: 'R$ 400,00', description: 'Substituição de amortecedores dianteiros com molas padrão e alinhamento.', products: 'Amortecedores Monroe, Molas padrão, Buchas especiais' },
                    { id: 'suspensao-completo', name: 'Suspensão Completa', price: 'R$ 800,00', description: 'Substituição completa de amortecedores, molas e componentes com balanceamento.', products: 'Amortecedores KYB, Molas Eibach, Componentes premium' },
                    { id: 'suspensao-premium', name: 'Premium', price: 'R$ 1200,00', description: 'Componentes premium com inspeção de direção e alinhamento 3D.', products: 'Amortecedores Bilstein, Molas H&R, Componentes especiais, Alinhamento 3D' }
                ]
            },
            'ar-condicionado': {
                name: 'Ar Condicionado',
                options: [
                    { id: 'ar-basico', name: 'Recarga', price: 'R$ 180,00', description: 'Recarga de gás refrigerante R134a e verificação de vazamentos básicos.', products: 'Gás R134a premium, Filtro desidratante, Selante especial' },
                    { id: 'ar-completo', name: 'Manutenção Completa', price: 'R$ 300,00', description: 'Recarga, limpeza do sistema e substituição de filtros originais.', products: 'Gás especializado, Filtros originais, Óleo compressor, Limpeza do evaporador' },
                    { id: 'ar-premium', name: 'Premium', price: 'R$ 450,00', description: 'Manutenção completa com desinfecção UV e garantia estendida.', products: 'Gás ambiental, Filtros premium, Óleo especial, Desinfetante UV, Garantia estendida' }
                ]
            },
            'diagnostico': {
                name: 'Diagnóstico',
                options: [
                    { id: 'diagnostico-basico', name: 'Básico', price: 'R$ 100,00', description: 'Leitura de códigos de erro e verificação visual dos sistemas principais.', products: 'Scanner básico, Verificação manual, Relatório simples' },
                    { id: 'diagnostico-completo', name: 'Completo', price: 'R$ 200,00', description: 'Diagnóstico computadorizado completo com análise de desempenho.', products: 'Scanner profissional, Análise de performance, Relatório detalhado' },
                    { id: 'diagnostico-premium', name: 'Premium', price: 'R$ 350,00', description: 'Diagnóstico avançado com análise de componentes eletrônicos e orçamento personalizado.', products: 'Equipamentos avançados, Teste de componentes, Orçamento personalizado, Garantia do diagnóstico' }
                ]
            }
        };

        // Variáveis para armazenar a seleção do usuário no modal
        // Estão dentro do escopo do DOMContentLoaded, acessíveis para os eventos filhos
        let selectedServiceId = null;
        let selectedOptionId = null;

        // Seleciona os botões "Ver Detalhes" dos serviços
        const serviceButtons = document.querySelectorAll('.service-card .btn');
        // Mapeia os tipos de serviço para os botões na ordem em que aparecem
        const serviceTypes = ['troca-oleo', 'freios', 'sistema-eletrico', 'suspensao', 'ar-condicionado', 'diagnostico'];

        // Adiciona evento de clique a cada botão "Ver Detalhes"
        serviceButtons.forEach((button, index) => {
            // Verifica se o tipo de serviço correspondente existe
            if (serviceTypes[index]) {
                button.addEventListener('click', function (e) {
                    e.preventDefault(); // Impede o comportamento padrão do link
                    const serviceId = serviceTypes[index]; // Obtém o ID do serviço
                    const service = serviceData[serviceId]; // Obtém os dados do serviço

                    // Se os dados do serviço existirem
                    if (service) {
                        // Reseta a seleção anterior
                        selectedServiceId = serviceId;
                        selectedOptionId = null;
                        // Esconde o botão "Selecionar Serviço" até uma opção ser escolhida
                        selectServiceBtn.style.display = 'none';

                        // Atualiza o título do modal com o nome do serviço
                        modalTitle.textContent = `Opções para ${service.name}`;

                        // Gera o HTML para as opções do serviço
                        let optionsHTML = '';
                        service.options.forEach(option => {
                            optionsHTML += `
                                <div class="option-card" data-option="${option.id}">
                                    <div class="option-header">
                                        <div class="option-name">${option.name}</div>
                                        <div class="option-price">${option.price}</div>
                                    </div>
                                    <div class="option-description">${option.description}</div>
                                    <div class="option-products"><strong>Produtos:</strong> ${option.products}</div>
                                </div>
                            `;
                        });

                        // Insere as opções geradas no container do modal
                        serviceOptionsContainer.innerHTML = optionsHTML;

                        // Adiciona evento de clique a cada opção gerada dentro do modal
                        document.querySelectorAll('.option-card').forEach(card => {
                            card.addEventListener('click', function () {
                                // Remove a classe 'selected' de todas as opções
                                document.querySelectorAll('.option-card').forEach(c => {
                                    c.classList.remove('selected');
                                });

                                // Adiciona a classe 'selected' à opção clicada
                                this.classList.add('selected');
                                // Armazena o ID da opção selecionada
                                selectedOptionId = this.getAttribute('data-option');
                                // Mostra o botão "Selecionar Serviço" agora que uma opção foi escolhida
                                selectServiceBtn.style.display = 'block';
                            });
                        });

                        // Exibe o modal alterando seu estilo de display
                        modal.style.display = 'block';
                    }
                });
            }
        });

        // --- Eventos do Modal ---

        // Evento para o botão "Selecionar Serviço" DENTRO do modal
        // Este é o evento que estava com problema. Agora está garantidamente
        // dentro do DOMContentLoaded e tem acesso às variáveis e funções.
        selectServiceBtn.addEventListener('click', function () {
            // Verifica se um serviço e uma opção foram selecionados
            if (selectedOptionId && selectedServiceId) {
                // Obtém os dados do serviço selecionado
                const service = serviceData[selectedServiceId];
                // Encontra a opção específica selecionada dentro desse serviço
                const option = service.options.find(opt => opt.id === selectedOptionId);

                // Se a opção for encontrada
                if (option) {
                    // Fecha o modal e esconde o botão
                    modal.style.display = 'none';
                    selectServiceBtn.style.display = 'none';

                    // --- CHAMADA CORRIGIDA PARA O TOAST ---
                    // Mostra a mensagem de sucesso no toast
                    showToast(`Serviço selecionado: ${service.name} - ${option.name}\nValor: ${option.price}\n\nProdutos incluídos: ${option.products}\n\nAgora preencha seus dados no formulário de contato.`);

                    // Rola a página suavemente até o formulário de contato
                    const contactSection = document.querySelector('#contact');
                    if (contactSection) {
                        contactSection.scrollIntoView({
                            behavior: 'smooth'
                        });
                    }
                }
            }
        });

        // Evento para fechar o modal ao clicar no 'x' (closeBtn)
        closeBtn.addEventListener('click', function () {
            modal.style.display = 'none';
            selectedServiceId = null;
            selectedOptionId = null;
            selectServiceBtn.style.display = 'none';
        });

        // Evento para fechar o modal ao clicar fora do conteúdo do modal
        window.addEventListener('click', function (event) {
            if (event.target === modal) {
                modal.style.display = 'none';
                selectedServiceId = null;
                selectedOptionId = null;
                selectServiceBtn.style.display = 'none';
            }
        });

    } else {
        // Se algum elemento do modal não for encontrado, avisa no console
        console.warn("Um ou mais elementos do modal (#serviceModal, #modalTitle, #serviceOptions, #selectServiceBtn, .close) não foram encontrados.");
    }

}); // Fim do DOMContentLoaded

// Arquivo: script.js

// ... (seu script.js existente) ...

// Adicione este código no final do seu script.js, fora de qualquer função específica
// mas ainda dentro do escopo global para garantir que seja carregado corretamente.

// --- Alternância de Tema (Claro/Escuro) ---
document.addEventListener('DOMContentLoaded', function () {
    const themeToggle = document.getElementById('themeToggle');
    const body = document.body;

    // Verifica se o usuário já tem uma preferência salva
    const currentTheme = localStorage.getItem('theme');
    if (currentTheme === 'dark') {
        body.classList.add('dark-theme');
        // Atualiza o ícone do botão
        if (themeToggle) {
            themeToggle.innerHTML = '<i class="fas fa-sun"></i>'; // Ícone para voltar ao tema claro
        }
    }

    // Adiciona evento de clique ao botão
    if (themeToggle) {
        themeToggle.addEventListener('click', function () {
            body.classList.toggle('dark-theme');

            // Atualiza o ícone e salva a preferência
            if (body.classList.contains('dark-theme')) {
                this.innerHTML = '<i class="fas fa-sun"></i>'; // Ícone para tema claro
                localStorage.setItem('theme', 'dark');
            } else {
                this.innerHTML = '<i class="fas fa-moon"></i>'; // Ícone para tema escuro
                localStorage.setItem('theme', 'light');
            }
        });
    } else {
        console.warn("Botão de alternância de tema (#themeToggle) não encontrado.");
    }
});