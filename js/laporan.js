/* =====================================================
   BANK SAMPAH SUMBER REJEKI V3

   File : laporan.js

   Fungsi :
   - Controller modul laporan
===================================================== */


/* =====================================================
   INIT
===================================================== */

function initLaporan(){

    console.log(
        "initLaporan berjalan"
    );


    resetFilterLaporan();


    isiDropdownRW(
        "lapRW"
    );


    isiDropdownLaporanAnggota();


    setDefaultPeriodeLaporan();


    tampilLaporan();


    eventLaporan();

}



/* =====================================================
   DEFAULT PERIODE AKTIF
===================================================== */

function setDefaultPeriodeLaporan(){


    const tahun =
    PERIODE.tahun;


    const bulan =
    String(
        PERIODE.bulan
    )
    .padStart(
        2,
        "0"
    );


    const jumlahHari =
    new Date(
        tahun,
        Number(bulan),
        0
    )
    .getDate();



    const tanggalAwal =
    `${tahun}-${bulan}-01`;



    const tanggalAkhir =
    `${tahun}-${bulan}-${String(jumlahHari).padStart(2,"0")}`;



    setValue(
        "lapTanggalAwal",
        tanggalAwal
    );


    setValue(
        "lapTanggalAkhir",
        tanggalAkhir
    );

}



/* =====================================================
   EVENT
===================================================== */

function eventLaporan(){



    const btnTampil =
    el("btnTampilLaporan");


    if(btnTampil){

        btnTampil.onclick =
        tampilLaporan;

    }



    const btnReset =
    el("btnResetLaporan");


    if(btnReset){

        btnReset.onclick = ()=>{


            resetFilterLaporan();


            setDefaultPeriodeLaporan();


            isiDropdownLaporanAnggota();


            tampilLaporan();


        };

    }




    const rw =
    el("lapRW");


    if(rw){

        rw.onchange = ()=>{


            isiDropdownLaporanAnggota();


        };

    }




    const anggota =
    el("lapAnggota");


    if(anggota){

        anggota.onchange = ()=>{


            // tidak otomatis tampil


        };

    }




    const excel =
    el("btnExcelLaporan");


    if(excel){

        excel.onclick =
        exportExcelLaporan;

    }




    const salin =
    el("btnSalinLaporan");


    if(salin){

        salin.onclick =
        salinLaporan;

    }



}



/* =====================================================
   RESET FILTER
===================================================== */

function resetFilterLaporan(){


    setValue(
        "lapTanggalAwal",
        ""
    );


    setValue(
        "lapTanggalAkhir",
        ""
    );


    setValue(
        "lapRW",
        ""
    );


    setValue(
        "lapAnggota",
        ""
    );


    setValue(
        "cmbJenisLaporan",
        "setoran"
    );


}



/* =====================================================
   DROPDOWN ANGGOTA LAPORAN
===================================================== */

function isiDropdownLaporanAnggota(){


    const select =
    el("lapAnggota");


    if(!select)
    return;



    select.innerHTML =

    `
    <option value="">

        Semua Anggota

    </option>
    `;



    const rw =
    getValue(
        "lapRW"
    );



    if(!rw)
    return;



    DATA.anggota

    .filter(item=>{


        return String(item.rw)
        .replace(
            "RW ",
            ""
        )
        .trim()

        ===

        String(rw)
        .replace(
            "RW ",
            ""
        )
        .trim();


    })


    .sort((a,b)=>

        a.nama.localeCompare(
            b.nama
        )

    )


    .forEach(item=>{


        select.innerHTML +=

        `
        <option value="${item.firestoreId}">

            ${item.nama}

        </option>
        `;


    });



}



/* =====================================================
   TAMPIL LAPORAN
===================================================== */

function tampilLaporan(){


    const jenis =

    getValue(
        "cmbJenisLaporan"
    );



    switch(jenis){


        case "setoran":


            tampilLaporanSetoran();


        break;



        case "penjualan":


            tampilLaporanPenjualan();


        break;



        case "penarikan":


            tampilLaporanPenarikan();


        break;



        case "saldo":


            tampilLaporanSaldo();


        break;



        case "rw":


            tampilLaporanRW();


        break;



        default:


            tampilLaporanSetoran();


    }


}



/* =====================================================
   EXPORT
===================================================== */

function exportExcelLaporan(){


    const jenis =

    getValue(
        "cmbJenisLaporan"
    );



    switch(jenis){


        case "setoran":

            exportExcelSetoran();

        break;



        case "penjualan":

            exportExcelPenjualan();

        break;



        case "penarikan":

            exportExcelPenarikan();

        break;



        case "rw":

            exportExcelRekapRW();

        break;



        case "saldo":

            exportExcelSaldo();

        break;



        default:

            alert(
                "Jenis laporan belum didukung."
            );

    }


}



/* =====================================================
   SALIN
===================================================== */

function salinLaporan(){


    const jenis =

    getValue(
        "cmbJenisLaporan"
    );



    switch(jenis){


        case "setoran":

            salinLaporanSetoran();

        break;



        case "penjualan":

            salinLaporanPenjualan();

        break;



        case "penarikan":

            salinLaporanPenarikan();

        break;



        case "rw":

            salinLaporanRekapRW();

        break;



        case "saldo":

            salinLaporanSaldo();

        break;



        default:

            alert(
                "Jenis laporan belum didukung."
            );

    }


}