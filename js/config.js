// =====================================================================
//  CONFIGURAÇÃO DO FIREBASE
//  1. Crie um projeto em https://console.firebase.google.com
//  2. Adicione um "App Web" e copie o objeto firebaseConfig para baixo
//  3. Ative Authentication (E-mail/senha) e Firestore Database
//
//  Enquanto apiKey estiver vazia, o sistema roda em MODO DEMO:
//  os dados ficam salvos só neste navegador (localStorage), ótimo para testar.
// =====================================================================
export const firebaseConfig = {
  apiKey: "AIzaSyA1QvFuDNBNPmj3Cz_MHtGFRkI-i95hq-g",
  authDomain: "loukasnexus-cardapio.firebaseapp.com",
  projectId: "loukasnexus-cardapio",
  storageBucket: "loukasnexus-cardapio.firebasestorage.app",
  messagingSenderId: "644921006727",
  appId: "1:644921006727:web:7490c26f82c3dc60b8b622"
};

// E-mail do SUPERADMIN (dono do sistema). Crie esse usuário em Firebase › Authentication › Usuários.
// Deve ser o mesmo e-mail que está no topo do arquivo firestore.rules (função superadmin).
// Os demais usuários são cadastrados por ele em Configurações › Equipe (coleção "equipe").
export const SUPERADMIN_EMAIL = "loukasnexus.lojaonline@gmail.com";

export const DEMO =!firebaseConfig.apiKey;

// Versão do SDK do Firebase carregada via CDN (não precisa de npm)
export const FIREBASE_SDK = "https://www.gstatic.com/firebasejs/10.12.2";
