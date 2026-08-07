/* =====================================================
   BANK SAMPAH SUMBER REJEKI V3
   File : keuangan.firebase.js
===================================================== */


/* =====================================================
   SIMPAN TUTUP BUKU
===================================================== */

async function simpanTutupBukuFirebase(){

    const bulan =

Number(

    getValue(

        "cmbBulanTutup"

    )

);

const tahun =

Number(

    getValue(

        "txtTahunTutup"

    )

);

const data =

hitungKeuanganPeriode(

    bulan,

    tahun

);

const tanggalTutup =

tanggalTerakhirBulan(

    data.bulan,

    data.tahun

);

const tanggalKas =

formatTanggalDatabase(

    tanggalTutup

);

const hariKas =

new Date(

    tanggalKas

)
.toLocaleDateString(
    "id-ID",
    {
        weekday : "long"
    }
);

const saldoAnggota =

hitungSaldoAnggota();

const saldoKas =

hitungSaldoKas();


    try{


        // CEK SUDAH ADA ATAU BELUM

        const cek =

        await db
        .collection(COL_TUTUP_BUKU)
        .where(
            "bulan",
            "==",
            data.bulan
        )
        .where(
            "tahun",
            "==",
            data.tahun
        )
        .get();



        if(!cek.empty){

            alert(

                "Periode " +

                namaBulan(data.bulan) +

                " " +

                data.tahun +

                " sudah ditutup buku."

            );

            return;

        }



        // SIMPAN DATA TUTUP BUKU

        await db
        .collection(COL_TUTUP_BUKU)
        .add({

            bulan :

            data.bulan,


            tahun :

            data.tahun,


            totalSetoran :

            data.totalSetoran,


            totalPenjualan :

            data.totalPenjualan,


            totalOperasional :

            data.totalOperasional,


            laba :

            data.laba,


            hakBUMDES :

            data.hakBUMDES,


            hakCollecting :

data.hakCollecting,

saldoAnggota :

saldoAnggota,

saldoKas :

saldoKas,

tanggalTutup :

new Date()
.toISOString()

        });
		
		/* =====================================================
   TAMBAH KAS OTOMATIS
===================================================== */

await db
.collection(

    COLLECTION.kas

)
.add({

    tanggal :

    tanggalKas,

    hari :

    hariKas,

    jenis :

    "Masuk",

    kategori :

    "Hak BUMDes",

    uraian :

    "Hak BUMDes " +

    namaBulan(

        data.bulan

    ) +

    " " +

    data.tahun,

    nominal :

    data.hakBUMDES,

    sumber :

    "TUTUP_BUKU",

    bulan :

    data.bulan,

    tahun :

    data.tahun

});

await loadKasFirebase();

        alert(

            "Tutup buku berhasil disimpan."

        );


        loadTutupBukuFirebase();


    }
	
	
	
    catch(error){


        console.error(

            "Simpan tutup buku gagal :",

            error

        );


    }

}

/* =====================================================
   CEK STATUS TUTUP BUKU
===================================================== */

async function cekStatusTutupBuku(){

    const bulan =

    Number(

        getValue(

            "cmbBulanTutup"

        )

    );



    const tahun =

    Number(

        getValue(

            "txtTahunTutup"

        )

    );



    const tombol =

    el(

        "btnProsesTutupBuku"

    );



    if(!tombol) return;



    const cek =

    await db
    .collection(COL_TUTUP_BUKU)
    .where(
        "bulan",
        "==",
        bulan
    )
    .where(
        "tahun",
        "==",
        tahun
    )
    .get();



    if(!cek.empty){

        tombol.disabled = true;

        tombol.innerHTML =

        "✅ Sudah Ditutup";

    }
    else{

        tombol.disabled = false;

        tombol.innerHTML =

        "📒 Proses Tutup Buku";

    }

}
/* =====================================================
   LOAD TUTUP BUKU
===================================================== */

async function loadTutupBukuFirebase(){

    try{


        const snapshot =

        await db
        .collection(COL_TUTUP_BUKU)
        .orderBy(
            "tahun",
            "desc"
        )
        .get();



        DATA.tutupBuku = [];



        snapshot.forEach(doc=>{


            DATA.tutupBuku.push({

                firestoreId :
                doc.id,

                ...doc.data()

            });


        });



        tampilTutupBukuTable();


    }
    catch(error){

        console.error(
            "Load tutup buku gagal :",
            error
        );

    }

}

/* =====================================================
   LOAD ARSIP TUTUP BUKU
===================================================== */

async function loadArsipKeuangan(){

    try{


        const snapshot =

        await db
        .collection(COL_TUTUP_BUKU)
        .orderBy(
            "tahun",
            "desc"
        )
        .orderBy(
            "bulan",
            "desc"
        )
        .get();



        DATA.tutupBuku = [];



        snapshot.forEach(doc=>{


            DATA.tutupBuku.push({

                firestoreId :
                doc.id,

                ...doc.data()

            });


        });



        tampilArsipKeuangan();


    }
    catch(error){

        console.error(

            "Load arsip keuangan gagal :",

            error

        );

    }

}