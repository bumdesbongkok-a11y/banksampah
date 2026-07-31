/* =====================================================
   BANK SAMPAH SUMBER REJEKI V3
   File : navigation.js
===================================================== */



/* =====================================================
   DAFTAR HALAMAN
===================================================== */

const HALAMAN = [

    
    "halAnggota",
    "halHarga",
    "halSetoran",
    "halPenjualan",
    "halPenarikan",
    "halLaporan",
	"halOperasional",
    "halPengaturan",
	"halMigrasi"

];	



/* =====================================================
   TAMPIL HALAMAN
===================================================== */

function bukaHalaman(idHalaman){

    HALAMAN.forEach(id=>{

        hide(id);

    });

    hide("menuUtama");

    hide("dashboardHome");

    show(idHalaman);

}

/* =====================================================
   KEMBALI KE MENU
===================================================== */

function kembaliMenu(){

    HALAMAN.forEach(id=>{

        hide(id);

    });

    show("menuUtama");

    show("dashboardHome");

}

/* =====================================================
   INISIALISASI
===================================================== */

function initNavigation(){

    // sembunyikan semua halaman
    HALAMAN.forEach(id=>{

        hide(id);

    });

    // tampilkan menu utama
    show("menuUtama");
	show("dashboardHome");

}

/* =====================================================
   EVENT MENU
===================================================== */

function eventNavigation(){


    el("btnAnggota")
    .addEventListener("click",()=>{

        bukaHalaman("halAnggota");

    });

    el("btnHarga")
    .addEventListener("click",()=>{

        bukaHalaman("halHarga");

    });

    el("btnSetoran")
    .addEventListener("click",()=>{

        bukaHalaman("halSetoran");

    });

    el("btnPenjualan")
    .addEventListener("click",()=>{

        bukaHalaman("halPenjualan");

    });

    el("btnPenarikan")
    .addEventListener("click",()=>{

        bukaHalaman("halPenarikan");

    });

    el("btnLaporan")
    .addEventListener("click",()=>{

        bukaHalaman("halLaporan");

    });
	
	el("btnOperasional")
.addEventListener(
    "click",
    ()=>bukaHalaman(
        "halOperasional"
    )
);
	
	el("btnPengaturan")
.addEventListener("click",()=>{

    bukaHalaman("halPengaturan");

});

el("btnMigrasi")
.addEventListener("click",()=>{

    bukaHalaman("halMigrasi");

});

}