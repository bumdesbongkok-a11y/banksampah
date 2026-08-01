/* =====================================================
   BANK SAMPAH SUMBER REJEKI V3
   File : keuangan.js
===================================================== */

function initKeuangan(){

    console.log(

        "initKeuangan berjalan"

    );

    eventKeuangan();

    tampilRingkasanKeuangan();

}

/* =====================================================
   PERIODE TUTUP BUKU
===================================================== */

function initPeriodeTutupBuku(){

    setValue(

        "cmbBulanTutup",

        PERIODE.bulan

    );

    setValue(

        "txtTahunTutup",

        PERIODE.tahun

    );
	
	el("cmbBulanTutup")
.addEventListener(
    "change",
    ()=>{

        tampilTutupBuku();

        cekStatusTutupBuku();

    }
);

el("txtTahunTutup")
.addEventListener(
    "change",
    ()=>{

        tampilTutupBuku();

        cekStatusTutupBuku();

    }
);

}

/* =====================================================
   EVENT
===================================================== */

function eventKeuangan(){

    el("btnRingkasanKeuangan")
    .addEventListener("click",()=>{

        tampilRingkasanKeuangan();

        bukaHalaman("halRingkasanKeuangan");

    });

    el("btnLabaRugi")
.addEventListener(
    "click",
    ()=>{

        tampilLabaRugi();

        bukaHalaman(
            "halLabaRugi"
        );

    }
);

    el("btnPembagianLaba")
.addEventListener(
    "click",
    ()=>{

        tampilPembagianLaba();

        bukaHalaman(
            "halPembagianLaba"
        );

    }
);

    el("btnTutupBuku")
.addEventListener(
    "click",
    ()=>{

        initPeriodeTutupBuku();

        tampilTutupBuku();

        loadTutupBukuFirebase();

        cekStatusTutupBuku();

        bukaHalaman(
            "halTutupBuku"
        );

    }
);

el("btnProsesTutupBuku")
.addEventListener(
    "click",
    simpanTutupBukuFirebase
);

el("btnRiwayatKeuangan")
.addEventListener(
    "click",
    async ()=>{

        await loadArsipKeuangan();

        isiFilterTahunKeuangan();

        tampilArsipKeuangan();

        bukaHalaman(
            "halRiwayatKeuangan"
        );

    }
);

el("filterTahunKeuangan")
.addEventListener(
    "change",
    filterArsipKeuangan
);


el("filterBulanKeuangan")
.addEventListener(
    "change",
    filterArsipKeuangan
);

}