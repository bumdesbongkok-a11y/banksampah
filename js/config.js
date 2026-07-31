/* =====================================================
   BANK SAMPAH SUMBER REJEKI V3
   File : config.js
   Fungsi : Konfigurasi aplikasi
===================================================== */

/* =====================================================
   FIREBASE
===================================================== */

const firebaseConfig = {

    apiKey: "AIzaSyDeqyuN45uor7P7-RwkEcydjQzUoJcmY5g",

    authDomain: "bank-sampah-sumber.firebaseapp.com",

    projectId: "bank-sampah-sumber",

    storageBucket: "bank-sampah-sumber.firebasestorage.app",

    messagingSenderId: "1011731089090",

    appId: "1:1011731089090:web:3af05e635b787742905d5b"

};

firebase.initializeApp(firebaseConfig);

const db = firebase.firestore();

/* =====================================================
   COLLECTION FIREBASE
===================================================== */

const COLLECTION = {

    anggota : "colAnggota",

    harga : "colHarga",

    setoran : "colSetoran",

    penjualan : "colPenjualan",

    penarikan : "colPenarikan",
	
	operasional : "colOperasional"

};
/* =====================================================
   STATUS EDIT
===================================================== */

const EDIT = {

    anggota : null,

    harga : null,

    setoran : null,

    penjualan : null,

    penarikan : null

};



