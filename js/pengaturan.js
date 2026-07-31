/* =====================================================
   TAMPILKAN INFORMASI APLIKASI
===================================================== */

function tampilPengaturan(){

    el("setNamaApp").textContent =
    "Bank Sampah Sumber Rejeki";

    el("setVersiApp").textContent =
    "V3.0";

    el("setTotalAnggota").textContent =
    DATA.anggota.length;

    el("setTotalSetoran").textContent =
    DATA.setoran.length;

    el("setTotalPenjualan").textContent =
    DATA.penjualan.length;

    el("setTotalPenarikan").textContent =
    DATA.penarikan.length;

}

/* =====================================================
   INIT
===================================================== */

function initPengaturan(){

    tampilPengaturan();

    el("btnBackup")
    .addEventListener(
        "click",
        backupData
    );

    el("btnRestore")
    .addEventListener(
        "click",
        restoreData
    );
	
	el("fileRestore")
.addEventListener(
    "change",
    pilihFileRestore
);

}

/* =====================================================
   BACKUP DATA
===================================================== */

function backupData(){

    const backup = {

        tanggal : new Date().toISOString(),

        aplikasi : "Bank Sampah Sumber Rejeki",

        versi : "V3.0",

        anggota : DATA.anggota,

        harga : DATA.harga,

        setoran : DATA.setoran,

        penjualan : DATA.penjualan,

        penarikan : DATA.penarikan

    };

    const json =
    JSON.stringify(
        backup,
        null,
        2
    );

    const blob =
    new Blob(
        [json],
        {
            type:
            "application/json"
        }
    );

    const url =
    URL.createObjectURL(
        blob
    );

    const a =
    document.createElement("a");

    a.href = url;

    a.download =
    "backup-bank-sampah-" +
    new Date()
    .toISOString()
    .slice(0,10) +
    ".json";

    a.click();

    URL.revokeObjectURL(
        url
    );

}

/* =====================================================
   RESTORE DATA
===================================================== */

function restoreData(){

    el("fileRestore")
    .click();

}

/* =====================================================
   PILIH FILE RESTORE
===================================================== */

function pilihFileRestore(e){

    const file =
    e.target.files[0];

    if(!file) return;

    const reader =
    new FileReader();

    reader.onload =
    function(){

        const data =
        JSON.parse(
            reader.result
        );

        console.log(data);

        alert(
            "File backup berhasil dibaca."
        );

    };

    reader.readAsText(
        file
    );

}