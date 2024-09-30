# SMA-Aluno Web

## Desenvolvimento da Versão Web do SMA-Aluno

A versão web do SMA-Aluno foi desenvolvida utilizando o React Native com o Expo Router para gerenciar a navegação entre telas de forma mais eficiente e organizada. O Expo Router facilita a implementação de rotas em projetos React Native que visam suporte tanto para dispositivos móveis quanto para a web, proporcionando uma experiência de navegação fluida e simples em ambas as plataformas.

## Tecnologias Utilizadas

React Native com Expo Router: Permite a criação de um aplicativo web responsivo e moderno, mantendo a compatibilidade com a versão mobile do SMA-Aluno.
Expo Router: Substitui a navegação tradicional com React Navigation, fornecendo uma estrutura simplificada e mais robusta para projetos com múltiplas rotas.
Alterações Principais:
Remoção do AsyncStorage: A versão web não utiliza mais o AsyncStorage para o armazenamento local de dados. Todas as informações são armazenadas diretamente no backend, garantindo que os dados do usuário estejam sempre sincronizados, independentemente do dispositivo utilizado.
Remoção do NetInfo: O NetInfo também foi removido, já que a versão web depende exclusivamente da conectividade do navegador para funcionar.
Recursos Principais:
Interface de Avaliações e Fichas: O usuário pode acessar suas avaliações físicas e fichas diretamente através da plataforma, permitindo o acompanhamento contínuo do progresso acadêmico.

Design Responsivo: O layout da versão web foi projetado para se adaptar a diferentes tamanhos de tela, garantindo uma boa experiência de usuário em dispositivos móveis, tablets e computadores.

Integração Simplificada com Back-end: Todos os dados são gerenciados diretamente pelo servidor, mantendo a segurança e integridade das informações dos usuários sem depender de armazenamento local.

Navegação com Expo Router: A navegação entre as telas foi otimizada com o uso do Expo Router, proporcionando uma experiência rápida e eficiente. Os usuários podem acessar suas fichas, avaliações e outras funcionalidades com um sistema de rotas organizado.
