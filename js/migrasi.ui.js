/* =====================================================
   BANK SAMPAH SUMBER REJEKI V3

   File : migrasi.ui.js

   Fungsi :
   - Tampilan modul migrasi
===================================================== */



/* =====================================================
   TAMPIL INFORMASI DATA
===================================================== */

function tampilInfoMigrasi(){

    setText(

        "migAnggota",

        DATA.anggota.length

    );

    setText(

        "migHarga",

        DATA.harga.length

    );

    setText(

        "migSetoran",

        DATA.setoran.length

    );

    setText(

        "migPenjualan",

        DATA.penjualan.length

    );

    setText(

        "migPenarikan",

        DATA.penarikan.length

    );

    setText(

        "migOperasional",

        DATA.operasional.length

    );

}



/* =====================================================
   STATUS MIGRASI
===================================================== */

function statusMigrasi(pesan){

    setText(

        "migStatus",

        pesan

    );

}



/* =====================================================
   PILIH FILE
===================================================== */

function pilihFileMigrasi(){

    el(

        "fileMigrasi"

    ).click();

}



/* =====================================================
   NAMA FILE
===================================================== */

function tampilNamaFileMigrasi(){

    const file =

    el(

        "fileMigrasi"

    ).files[0];

    if(!file){

        statusMigrasi(

            "Belum memilih file."

        );

        return;

    }

    statusMigrasi(

        "File : " +

        file.name

    );

}