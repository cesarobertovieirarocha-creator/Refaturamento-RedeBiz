document.addEventListener('DOMContentLoaded', function () {

    // ===============================
    // 🌓 THEME CONFIG
    // ===============================
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'light') {
        document.documentElement.classList.remove('dark');
    } else {
        document.documentElement.classList.add('dark');
    }

    // ===============================
    // 🎨 CONFIG GLOBAL CHART.JS
    // ===============================
    Chart.defaults.font.family = 'Inter';
    updateChartDefaults();

    // ===============================
    // 🚀 INICIALIZAÇÃO
    // ===============================
    initAll();

    // ===============================
    // 🎯 FUNCIONALIDADES
    // ===============================
    initNavigation();
    initButtons();
    initAnimations();
    initCharts();
    initDynamicContent();
});

// ===============================
/* 🚀 INICIALIZAÇÃO PRINCIPAL */
// ===============================
function initAll() {
    console.log('🚀 Dashboard carregado com sucesso!');
}

// ===============================
/* 📈 TODOS OS GRÁFICOS */
// ===============================
// Nota: initCharts() é definida mais abaixo com todas as chamadas

let refaturamentoChartInstance = null;

function initRefaturamentoChart() {
    const ctx = document.getElementById('refaturamentoChart');
    if (!ctx) return;

    // Evita duplicação do gráfico
    if (refaturamentoChartInstance) {
        refaturamentoChartInstance.destroy();
    }

    refaturamentoChartInstance = new Chart(ctx, {
        type: 'line',
        data: {
            labels: ['Out/25', 'Nov/25', 'Dez/25', 'Jan/26', 'Fev/26', 'Mar/26'],
            datasets: [{
                label: 'Refaturamentos',
                data: [34, 18, 3, 23, 11, 16],
                tension: 0.4,
                fill: true,
                borderWidth: 4,
                pointRadius: 6,
                pointHoverRadius: 8,
                pointBackgroundColor: '#A855F7',
                pointBorderColor: '#ffffff',
                pointBorderWidth: 2,
                borderColor: '#fb923c',
                backgroundColor: function (context) {
                    const chart = context.chart;
                    const { ctx, chartArea } = chart;

                    if (!chartArea) return;

                    const gradient = ctx.createLinearGradient(0, chartArea.top, 0, chartArea.bottom);
                    gradient.addColorStop(0, 'rgba(168,85,247,0.4)');
                    gradient.addColorStop(1, 'rgba(168,85,247,0.02)');
                    return gradient;
                }
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,

            animation: {
                duration: 1200,
                easing: 'easeOutQuart'
            },

            plugins: {
                tooltip: {
                    callbacks: {
                        label: (context) => ` ${context.dataset.label}: ${context.raw}`
                    }
                },
                legend: {
                    display: true,
                    labels: {
                        color: '#374151',
                        font: {
                            size: 12
                        }
                    }
                }
            },

            scales: {
                y: {
                    beginAtZero: true,
                    ticks: {
                        stepSize: 5
                    },
                    grid: {
                        color: 'rgba(75,85,99,0.1)'
                    }
                },
                x: {
                    grid: {
                        display: false
                    }
                }
            }
        }
    });
}

// ===============================
/* 📊 GRÁFICO DISTRIBUIÇÃO */
// ===============================
function initDistribuicaoChart() {
    const ctx = document.getElementById('distribuicaoChart');
    if (!ctx) return;

    new Chart(ctx, {
        type: 'doughnut',
        data: {
            labels: ['Pedido incorreto', 'Cadastro errado', 'Condição pagamento'],
            datasets: [{
                data: [50, 30, 20],
                borderWidth: 3,
                borderColor: '#1f2937',
                hoverOffset: 10,
                backgroundColor: [
                    '#ef4444',
                    '#f97316',
                    '#eab308'
                ],
                hoverBackgroundColor: [
                    '#dc2626',
                    '#ea580c',
                    '#ca8a04'
                ]
            }]
        },
        options: getChartOptions({
            cutout: '65%',
            plugins: {
                legend: {
                    position: 'bottom',
                    labels: {
                        padding: 25,
                        usePointStyle: true,
                        pointStyle: 'circle',
                        font: { size: 13 }
                    }
                }
            }
        })
    });
}

let stackedBarChartInstance = null;

function initStackedBarChart() {
    const ctx = document.getElementById('stackedBarChart');
    if (!ctx) {
        console.warn('Canvas stackedBarChart não encontrado');
        return;
    }

    // Evita duplicação
    if (stackedBarChartInstance) {
        stackedBarChartInstance.destroy();
    }

    const meses = ['Out/25', 'Nov/25', 'Dez/25', 'Jan/26', 'Fev/26', 'Mar/26'];
    const fornecedores = ['Vestacy', 'Reckitt', 'Nivea', 'Cargill', 'Bic'];

    const dataRefaturamento = {
        Vestacy: [2, 1, 0, 1, 0, 2],
        Reckitt: [4, 1, 2, 1, 0, 1],
        Nivea: [13, 1, 1, 10, 11, 11],
        Cargill: [5, 4, 0, 2, 0, 1],
        Bic: [0, 0, 0, 9, 0, 1]
    };

    function getDynamicColors(values) {
        return values.map(v => {
            if (v >= 10) return '#ef4444';  // crítico
            if (v >= 5) return '#f97316';   // alto
            if (v >= 2) return '#eab308';   // médio
            return '#10b981';               // baixo
        });
    }

    const datasets = fornecedores.map((fornecedor) => {
        const values = dataRefaturamento[fornecedor]; // ✅ CORRETO
        const colors = getDynamicColors(values);

        return {
            label: fornecedor,
            data: values,
            backgroundColor: colors,
            borderColor: colors.map(c => c + 'CC'),
            borderWidth: 1,
            borderRadius: 6,
            hoverBackgroundColor: colors.map(c => c + 'FF')
        };
    });

    stackedBarChartInstance = new Chart(ctx, {
        type: 'bar',
        data: {
            labels: meses,
            datasets: datasets
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,

            animation: {
                duration: 1500,
                easing: 'easeOutQuart'
            },

            plugins: {
                legend: {
                    position: 'top',
                    labels: {
                        padding: 20,
                        usePointStyle: true,
                        color: '#9CA3AF',
                        font: {
                            size: 12,
                            family: 'Inter'
                        }
                    }
                },

                tooltip: {
                    backgroundColor: 'rgba(17,24,39,0.95)',
                    titleColor: '#ffffff',
                    bodyColor: '#9CA3AF',
                    borderColor: '#fbbf24',
                    borderWidth: 2,
                    cornerRadius: 12,
                    padding: 16,
                    callbacks: {
                        label: function (context) {
                            return `${context.dataset.label}: ${context.raw}`;
                        },
                        footer: function (tooltipItems) {
                            const total = tooltipItems.reduce((sum, item) => sum + item.raw, 0);
                            return `Total: ${total}`;
                        }
                    }
                }
            },

            scales: {
                x: {
                    stacked: true,
                    grid: { display: false },
                    ticks: { color: '#9CA3AF' }
                },
                y: {
                    stacked: true,
                    beginAtZero: true,
                    ticks: {
                        stepSize: 5,
                        color: '#9CA3AF'
                    },
                    grid: {
                        color: 'rgba(75,85,99,0.1)'
                    }
                }
            }
        }
    });
}

// ===============================
/* INIT - CHAMAR NO initCharts() */
// ===============================
function initCharts() {
    initRefaturamentoChart();
    initDistribuicaoChart();
    initStackedBarReal();  // Mudei para chamar o correto
    initEmailCards();
}
// ===============================
// 📧 Cards de E-mails Enviados
// ===============================
function initEmailCards() {
    const emailsEnviados = [8, 3, 2, 5, 1, 3]; // out-25 → mar-26
    const meses = ['Out/25', 'Nov/25', 'Dez/25', 'Jan/26', 'Fev/26', 'Mar/26'];
    const totalEmails = emailsEnviados.reduce((a, b) => a + b, 0);

    const elTotal = document.getElementById('totalEmailsCard');
    if (elTotal) elTotal.innerText = totalEmails + " e-mails";

    const maxEmails = Math.max(...emailsEnviados);
    const minEmails = Math.min(...emailsEnviados);

    const elMais = document.getElementById('mesMaisCard');
    if (elMais) elMais.innerText = `${meses[emailsEnviados.indexOf(maxEmails)]} (${maxEmails})`;

    const elMenos = document.getElementById('mesMenosCard');
    if (elMenos) elMenos.innerText = `${meses[emailsEnviados.indexOf(minEmails)]} (${minEmails})`;
}

// ===============================
/* 📊 STACKED BAR - DADOS REAIS 100% PRECISOS */
// ===============================
function initStackedBarReal() {
    const ctx = document.getElementById('stackedBarReal');
    if (!ctx) return console.warn('Canvas stackedBarReal não encontrado');

    // SEUS DADOS EXATOS PROCESSADOS
    const meses = ['Out/25', 'Nov/25', 'Dez/25', 'Jan/26', 'Fev/26', 'Mar/26'];

    const dados = {
        'Nivea 🚨': [13, 0, 1, 10, 11, 11],
        'Cargill': [5, 4, 0, 2, 0, 1],
        'Bic': [0, 0, 0, 9, 0, 1],
        'Reckitt Core': [4, 1, 2, 1, 0, 1],
        'Vestacy': [2, 1, 0, 1, 0, 2],
        'Rayovac': [4, 0, 0, 0, 0, 0],
        'Hypera': [3, 0, 0, 0, 0, 0],
        'Outros': [3, 0, 0, 0, 0, 0]
    };

    // CORES CORPORATIVAS POR FORNECEDOR
    const cores = {
        'Nivea 🚨': '#003399',     // Azul Royal
        'Cargill': '#005F4B',      // Verde Corporativo
        'Bic': '#FFD200',          // Amarelo Ouro
        'Reckitt Core': '#E6007E', // Rosa Magenta
        'Vestacy': '#8A2BE2',      // Roxo Vibrante
        'Rayovac': '#ED1C24',      // Vermelho Vivo
        'Hypera': '#002D56',       // Azul Marinho
        'Outros': '#808080'        // Cinza Médio
    };

    const datasets = Object.entries(dados).map(([label, data]) => ({
        label: label,
        data: data,
        backgroundColor: data.map(() => cores[label] + 'CC'), // 80% opacity
        borderColor: cores[label] + 'FF',
        borderWidth: 1.5,
        borderRadius: 6,
        hoverBackgroundColor: cores[label] + 'FF'
    }));

    new Chart(ctx, {
        type: 'bar',
        data: {
            labels: meses,
            datasets: datasets
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    display: true,
                    position: 'top',
                    align: 'start',
                    labels: {
                        boxWidth: 12,
                        padding: 20,
                        usePointStyle: true,
                        font: { size: 12, family: 'Inter' },
                        color: '#9CA3AF'
                    }
                },
                tooltip: {
                    backgroundColor: 'rgba(17,24,39,0.98)',
                    titleColor: '#ffffff',
                    bodyColor: '#fbbf24',
                    borderColor: '#fbbf24',
                    borderWidth: 2,
                    cornerRadius: 12,
                    padding: 16,
                    displayColors: true,
                    callbacks: {
                        title: (ctx) => `📅 ${ctx[0].label}`,
                        label: (ctx) => `${ctx.dataset.label}: ${ctx.parsed.y} NF`
                    }
                }
            },
            scales: {
                x: {
                    stacked: true,
                    grid: { display: false },
                    ticks: {
                        color: '#9CA3AF',
                        maxRotation: 0
                    }
                },
                y: {
                    stacked: true,
                    beginAtZero: true,
                    max: 35,
                    ticks: {
                        stepSize: 5,
                        color: '#9CA3AF'
                    },
                    grid: {
                        color: (ctx) => ctx.tick.value === 0 ? 'transparent' : 'rgba(75,85,99,0.15)'
                    }
                }
            },
            interaction: {
                intersect: false,
                mode: 'index'
            },
            animation: {
                duration: 2500,
                easing: 'easeOutBounce'
            }
        }
    });

    console.log('✅ Stacked Bar carregado: 93 NF | Nivea 49%');
}

// CHAME NO initCharts():
// initStackedBarReal();

// ===============================
// 📊 STACKED BAR REAL - FORNECEDORES
// ===============================
let stackedBarRealInstance = null;

function initStackedBarRealChart() {
    const ctx = document.getElementById('stackedBarReal');
    if (!ctx) return;

    // Destrói gráfico anterior se já existir
    if (stackedBarRealInstance) stackedBarRealInstance.destroy();

    const meses = ['Out/25', 'Nov/25', 'Dez/25', 'Jan/26', 'Fev/26', 'Mar/26'];
    const fornecedores = ['Nivea', 'Cargill', 'Bic'];

    const data = {
        Nivea: [13, 1, 1, 10, 11, 11],
        Cargill: [5, 4, 0, 2, 0, 1],
        Bic: [0, 0, 0, 9, 0, 1]
    };

    function getColor(v) {
        if (v >= 10) return '#ef4444'; // vermelho
        if (v >= 5) return '#f97316';  // laranja
        if (v >= 2) return '#eab308';  // amarelo
        return '#10b981';              // verde
    }

    const datasets = fornecedores.map(f => {
        const values = data[f];
        return {
            label: f,
            data: values,
            backgroundColor: values.map(getColor),
            borderRadius: 6,
            borderWidth: 1
        };
    });

    stackedBarRealInstance = new Chart(ctx, {
        type: 'bar',
        data: {
            labels: meses,
            datasets: datasets
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    position: 'top',
                    labels: { color: '#D1D5DB' }
                },
                tooltip: {
                    backgroundColor: 'rgba(17,24,39,0.95)',
                    titleColor: '#fff',
                    bodyColor: '#D1D5DB',
                    borderColor: '#fbbf24',
                    borderWidth: 2,
                    cornerRadius: 10,
                    padding: 12,
                    callbacks: {
                        label: ctx => `${ctx.dataset.label}: ${ctx.raw}`,
                        footer: items => {
                            const total = items.reduce((sum, i) => sum + i.raw, 0);
                            return `Total: ${total}`;
                        }
                    }
                }
            },
            scales: {
                x: { stacked: true, grid: { display: false }, ticks: { color: '#D1D5DB' } },
                y: { stacked: true, beginAtZero: true, ticks: { stepSize: 5, color: '#D1D5DB' }, grid: { color: 'rgba(255,255,255,0.05)' } }
            }
        }
    });
}

// stackedBarRealChart é inicializado via initCharts()

// ===============================
/* ⚙️ OPÇÕES PADRÃO CHARTS */
// ===============================
function getChartOptions(custom = {}) {
    return {
        responsive: true,
        maintainAspectRatio: false,
        animation: {
            duration: 1500,
            easing: 'easeOutQuart'
        },
        plugins: {
            legend: {
                display: false,
                ...custom.plugins
            },
            tooltip: {
                backgroundColor: 'rgba(17,24,39,0.95)',
                titleColor: '#ffffff',
                bodyColor: '#9CA3AF',
                borderColor: '#fb923c',
                borderWidth: 1,
                cornerRadius: 12,
                padding: 12,
                displayColors: true
            }
        },
        interaction: {
            intersect: false,
            mode: 'index'
        },
        ...custom
    };
}

// ===============================
/* 🧭 NAVEGAÇÃO ATIVA + SMOOTH */
// ===============================
function initNavigation() {
    // Smooth scroll para todos os links
    document.querySelectorAll('a[href^="#"]').forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const targetId = link.getAttribute('href').substring(1);
            const target = document.getElementById(targetId);

            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });

                // Ativa o link na sidebar
                setActiveNavLink(targetId);
            }
        });
    });

    // Navbar ativa no scroll
    window.addEventListener('scroll', updateActiveNav);
    updateActiveNav();
}

function updateActiveNav() {
    const sections = ['visao-geral', 'problema', 'analise', 'solucoes', 'projecoes'];

    let current = '';

    sections.forEach(id => {
        const section = document.getElementById(id);
        if (section) {
            const rect = section.getBoundingClientRect();
            // A seção é considerada ativa se o topo dela passar de 1/3 da tela
            if (rect.top <= window.innerHeight / 3) {
                current = id;
            }
        }
    });

    if (current) {
        setActiveNavLink(current);
    }
}

function setActiveNavLink(activeId) {
    const navColors = {
        'visao-geral': 'purple',
        'problema': 'red',
        'analise': 'blue',
        'solucoes': 'green',
        'projecoes': 'orange'
    };

    // Remove classes antigas
    document.querySelectorAll('nav a').forEach(link => {
        link.className = link.className.replace(/active-nav-[a-z]+/g, '').trim();
    });

    const activeLink = document.querySelector(`nav a[href="#${activeId}"]`);
    if (activeLink) {
        const color = navColors[activeId] || 'purple';
        activeLink.classList.add(`active-nav-${color}`);
    }
}

// ===============================
/* 🔘 BOTÕES FUNCIONAIS */
// ===============================
function initButtons() {
    // PDF/Print
    const pdfBtn = document.querySelector('button:has(i.fa-file-pdf)');
    if (pdfBtn) {
        pdfBtn.addEventListener('click', () => {
            window.print();
            showToast('📄 Imprimindo relatório...', 'success');
        });
    }

    // Fullscreen
    const fullscreenBtn = document.querySelector('button:has(i.fa-expand)');
    if (fullscreenBtn) {
        fullscreenBtn.addEventListener('click', toggleFullscreen);
    }

    // Theme Toggle
    const themeBtn = document.getElementById('theme-toggle');
    if (themeBtn) {
        themeBtn.addEventListener('click', toggleTheme);
        // Set initial icon
        const isDark = document.documentElement.classList.contains('dark');
        const themeIcon = document.getElementById('theme-icon');
        if (themeIcon) themeIcon.className = isDark ? 'fas fa-moon text-blue-400' : 'fas fa-sun text-yellow-500';
    }

    // LinkedIn
    const linkedinBtn = document.querySelector('a[href*="linkedin"]');
    if (linkedinBtn) {
        linkedinBtn.addEventListener('click', () => {
            showToast('🔗 Abrindo LinkedIn...', 'info');
        });
    }

    // Sistema Nivea
    const niveaBtn = document.querySelector('a[href*="streamlit"]');
    if (niveaBtn) {
        niveaBtn.addEventListener('click', () => {
            showToast('🚀 Abrindo Simulador Nivea...', 'success');
        });
    }
}

function toggleFullscreen() {
    if (!document.fullscreenElement) {
        document.documentElement.requestFullscreen?.() ||
            document.documentElement.webkitRequestFullscreen?.();
        showToast('📱 Modo tela cheia ativado', 'success');
    } else {
        document.exitFullscreen?.() ||
            document.webkitExitFullscreen?.();
        showToast('📱 Modo tela cheia desativado', 'info');
    }
}

// ===============================
/* ✨ ANIMAÇÕES DE ENTRADA */
// ===============================
function initAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-fadeInUp');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    // Observa todos os cards e seções
    document.querySelectorAll('.card, .bg-gray-800, .bg-red-500\\/10, section, [id]').forEach(el => {
        observer.observe(el);
    });
}

// ===============================
/* 📱 CONTEÚDO DINÂMICO */
// ===============================
function initDynamicContent() {
    // Atualiza KPIs dinamicamente
    updateKPIs();

    // Scroll indicator
    window.addEventListener('scroll', updateScrollIndicator);
}

// Atualiza KPIs com cálculos
function updateKPIs() {
    const data = [34, 18, 3, 23, 11, 16];
    const total = data.reduce((a, b) => a + b, 0);
    const media = (total / data.length).toFixed(1);
    const pior = Math.max(...data);
    const melhor = Math.min(...data);

    // Atualiza no DOM se existir
    const totalEl = document.querySelector('h4:has(text("93 NF"))');
    const mediaEl = document.querySelector('h4:has(text("15,5 NF"))');
    const piorEl = document.querySelector('h4:has(text("34"))');
    const melhorEl = document.querySelector('h4:has(text("3"))');

    if (totalEl) totalEl.textContent = `${total} NF`;
    if (mediaEl) mediaEl.textContent = `${media} NF`;
    if (piorEl) piorEl.textContent = `${pior}`;
    if (melhorEl) melhorEl.textContent = `${melhor}`;
}

// Scroll indicator
function updateScrollIndicator() {
    const scrollTop = window.scrollY;
    const docHeight = document.body.scrollHeight - window.innerHeight;
    const scrollPercent = (scrollTop / docHeight) * 100;

    const indicator = document.querySelector('.scroll-indicator');
    if (indicator) {
        indicator.style.width = `${scrollPercent}%`;
    }
}

// ===============================
/* 🔔 TOAST NOTIFICAÇÕES */
// ===============================
function showToast(message, type = 'info') {
    // Remove toast anterior
    const oldToast = document.querySelector('.toast');
    if (oldToast) oldToast.remove();

    // Cria novo toast
    const toast = document.createElement('div');
    toast.className = `toast fixed top-6 right-6 z-[9999] p-4 rounded-2xl shadow-2xl text-sm font-medium transform translate-x-full transition-all duration-300 backdrop-blur-md border`;

    const colors = {
        success: 'bg-green-500/90 border-green-400 text-white',
        error: 'bg-red-500/90 border-red-400 text-white',
        info: 'bg-blue-500/90 border-blue-400 text-white',
        warning: 'bg-orange-500/90 border-orange-400 text-white'
    };

    toast.classList.add(colors[type] || colors.info);
    toast.textContent = message;

    document.body.appendChild(toast);

    // Anima entrada
    setTimeout(() => toast.classList.remove('translate-x-full'), 100);

    // Remove após 3s
    setTimeout(() => {
        toast.classList.add('translate-x-full');
        setTimeout(() => toast.remove(), 300);
    }, 3000);
}

// ===============================
/* 📱 RESPONSIVO PERFEITO */
// ===============================
function initResponsive() {
    // Sidebar mobile
    const sidebar = document.querySelector('.fixed.inset-y-0.left-0');
    const menuBtn = document.querySelector('.mobile-menu-btn');

    if (window.innerWidth < 768) {
        // Adiciona overlay mobile
        const overlay = document.createElement('div');
        overlay.className = 'fixed inset-0 bg-black/50 z-40 md:hidden';
        overlay.id = 'sidebar-overlay';
        document.body.appendChild(overlay);

        overlay.addEventListener('click', () => {
            sidebar.classList.remove('translate-x-0');
            overlay.classList.add('hidden');
        });
    }
}

// ===============================
/* 🔄 PERFOMANCE + ERROS */
// ===============================
window.addEventListener('error', (e) => {
    console.error('❌ Erro:', e.error);
    showToast('⚠️ Erro detectado. Recarregue a página.', 'error');
});

// ===============================
/* 🌓 THEME TOGGLE */
// ===============================
function toggleTheme() {
    const isDark = document.documentElement.classList.toggle('dark');
    localStorage.setItem('theme', isDark ? 'dark' : 'light');

    // Atualiza defaults globalmente
    updateChartDefaults();

    // Força re-render de todos os gráficos
    Object.values(Chart.instances).forEach(chart => {
        chart.update();
    });

    // Atualiza ícone
    const themeIcon = document.getElementById('theme-icon');
    if (themeIcon) {
        themeIcon.className = isDark ? 'fas fa-moon text-blue-400' : 'fas fa-sun text-yellow-500';
    }
}

function updateChartDefaults() {
    const isDark = document.documentElement.classList.contains('dark');
    Chart.defaults.color = isDark ? '#9CA3AF' : '#4B5563';
    Chart.defaults.borderColor = isDark ? 'rgba(75,85,99,0.3)' : 'rgba(209,213,219,0.8)';
}

window.addEventListener('resize', () => {
    // Reajusta charts em resize
    window.dispatchEvent(new Event('chartResize'));
});

// Polyfill para navegadores antigos
if (!Element.prototype.matches) {
    Element.prototype.matches = Element.prototype.msMatchesSelector ||
        Element.prototype.webkitMatchesSelector;
}
document.addEventListener('DOMContentLoaded', () => {

    // =========================
    // 📊 DADOS
    // =========================
    const data = {
        meses: ['Out/25', 'Nov/25', 'Dez/25', 'Jan/26', 'Fev/26', 'Mar/26'],
        pedidos: [80, 71, 87, 46, 62, 56],
        refat: [34, 6, 3, 23, 11, 16]
    };

    // =========================
    // 🧠 KPIs AUTOMÁTICOS
    // =========================
    const totalPedidos = data.pedidos.reduce((a, b) => a + b, 0);
    const totalRefat = data.refat.reduce((a, b) => a + b, 0);
    const media = Math.round(totalPedidos / data.meses.length);
    const taxa = ((totalRefat / totalPedidos) * 100).toFixed(1);

    document.getElementById('kpiPedidos').innerText = totalPedidos;
    document.getElementById('kpiRefat').innerText = totalRefat;
    document.getElementById('kpiMedia').innerText = media + "/mês";
    document.getElementById('kpiTaxa').innerText = taxa + "%";

    // =========================
    // 🎨 GRADIENTE (OTIMIZADO)
    // =========================
    const ctx = document.getElementById('chart').getContext('2d');

    const gradientBar = ctx.createLinearGradient(0, 0, 0, 400);
    gradientBar.addColorStop(0, 'rgba(34,197,94,0.8)');
    gradientBar.addColorStop(1, 'rgba(34,197,94,0.05)');

    const gradientLine = ctx.createLinearGradient(0, 0, 0, 400);
    gradientLine.addColorStop(0, 'rgba(251,191,36,0.4)');
    gradientLine.addColorStop(1, 'rgba(251,191,36,0.02)');

    // =========================
    // 🚨 CORES DINÂMICAS
    // =========================
    const getColor = (v) => {
        if (v >= 20) return '#ef4444';
        if (v >= 10) return '#f97316';
        if (v >= 5) return '#eab308';
        return '#10b981';
    };

    // =========================
    // 📈 CHART
    // =========================
    new Chart(ctx, {
        data: {
            labels: data.meses,
            datasets: [
                {
                    type: 'bar',
                    label: 'Pedidos',
                    data: data.pedidos,
                    backgroundColor: gradientBar,
                    borderRadius: 10
                },
                {
                    type: 'line',
                    label: 'Refaturamentos',
                    data: data.refat,
                    borderColor: '#fbbf24',
                    backgroundColor: gradientLine,
                    pointBackgroundColor: data.refat.map(getColor),
                    pointRadius: 8,
                    tension: 0.4,
                    fill: true
                }
            ]
        },
        options: {
            responsive: true,
            interaction: {
                mode: 'index',
                intersect: false
            },
            plugins: {
                legend: {
                    labels: { color: '#E4E4E7' }
                },
                tooltip: {
                    callbacks: {
                        label: (ctx) => {
                            const i = ctx.dataIndex;
                            const pedidos = data.pedidos[i];
                            const ref = data.refat[i];
                            const pct = ((ref / pedidos) * 100).toFixed(1);

                            if (ctx.datasetIndex === 0)
                                return `Pedidos: ${pedidos}`;

                            return `Refat: ${ref} (${pct}%)`;
                        }
                    }
                }
            },
            scales: {
                y: {
                    beginAtZero: true,
                    ticks: { color: '#9CA3AF' },
                    grid: { color: 'rgba(255,255,255,0.05)' }
                },
                x: {
                    ticks: { color: '#9CA3AF' },
                    grid: { display: false }
                }
            }
        }
    });

});
