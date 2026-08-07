/* =====================================================
   BANK SAMPAH SUMBER REJEKI V3

   File : laporan.ui.js

   BAGIAN 1
   - FILTER LAPORAN
   - HEADER SETORAN
   - TAMPIL SETORAN
===================================================== */


/* =====================================================
   FILTER DATA TRANSAKSI
===================================================== */

function filterLaporan(data){


    const tglAwal =
    getValue(
        "lapTanggalAwal"
    );


    const tglAkhir =
    getValue(
        "lapTanggalAkhir"
    );


    const rw =
    getValue(
        "lapRW"
    );


    const anggotaFilter =
    getValue(
        "lapAnggota"
    );



    return data.filter(item=>{


        // ============================
        // FILTER TANGGAL
        // ============================

        if(
            tglAwal &&
            item.tanggal < tglAwal
        ){

            return false;

        }


        if(
            tglAkhir &&
            item.tanggal > tglAkhir
        ){

            return false;

        }



        // ============================
        // FILTER RW
        // ============================

        if(rw){


            const anggota =

            getAnggota(
                item.idAnggota
            );


            if(!anggota){

                return false;

            }



            const rwData =

            String(
                anggota.rw
            )
            .replace(
                "RW ",
                ""
            )
            .trim();



            const rwFilter =

            String(
                rw
            )
            .replace(
                "RW ",
                ""
            )
            .trim();



            if(
                rwData !== rwFilter
            ){

                return false;

            }


        }



        // ============================
        // FILTER ANGGOTA
        // ============================

        if(
            anggotaFilter &&
            item.idAnggota !== anggotaFilter
        ){

            return false;

        }



        return true;


    });


}





/* =====================================================
   HEADER SETORAN
===================================================== */

function headerLaporanSetoran(){


    const thead =

    document.querySelector(
        "#tblLaporan thead"
    );


    if(!thead)
    return;



    thead.innerHTML =

    `
    <tr>

        <th>Tanggal</th>

        <th>RW</th>

        <th>ID</th>

        <th>Nama</th>

        <th>Barang</th>

        <th>Berat</th>

        <th>Harga</th>

        <th>Total</th>

    </tr>
    `;


}





/* =====================================================
   LAPORAN SETORAN
===================================================== */

function tampilLaporanSetoran(){


    headerLaporanSetoran();



    const tbody =

    document.querySelector(
        "#tblLaporan tbody"
    );


    if(!tbody)
    return;



    tbody.innerHTML = "";



    const data =

    filterLaporan(
        DATA.setoran
    );



    if(data.length===0){


        tbody.innerHTML =

        `
        <tr>

            <td colspan="8">

                Tidak ada data.

            </td>

        </tr>
        `;


        return;

    }





    data.forEach(item=>{


        const anggota =

        getAnggota(
            item.idAnggota
        );



        tbody.innerHTML +=


        `
        <tr>

            <td>
                ${item.tanggal || ""}
            </td>


            <td>
    ${
        anggota
        ?
        (
            String(anggota.rw)
            .startsWith("RW ")
            ?
            anggota.rw
            :
            "RW " + anggota.rw
        )
        :
        "-"
    }
</td>


            <td>
                ${
                    anggota
                    ?
                    anggota.idAnggota
                    :
                    "-"
                }
            </td>


            <td>
                ${
                    anggota
                    ?
                    anggota.nama
                    :
                    "-"
                }
            </td>


            <td>
                ${item.jenisBarang || ""}
            </td>


            <td>
                ${item.berat || 0}
            </td>


            <td>
                ${formatRupiah(item.harga)}
            </td>


            <td>
                ${formatRupiah(item.total)}
            </td>


        </tr>
        `;


    });


}

/* =====================================================
EXPORT EXCEL LAPORAN SETORAN
===================================================== */

function exportExcelSetoran(){


const data =

filterLaporan(
    DATA.setoran
);


if(data.length === 0){

    alert(
        "Tidak ada data setoran untuk diexport."
    );

    return;

}


let rows = [];


rows.push([

    "Tanggal",
    "RW",
    "ID",
    "Nama",
    "Barang",
    "Berat",
    "Harga",
    "Total"

]);


data.forEach(item=>{

    const anggota =

    getAnggota(
        item.idAnggota
    );


    const rw =

    anggota
    ?
    (
        String(anggota.rw)
        .startsWith("RW ")
        ?
        anggota.rw
        :
        "RW " + anggota.rw
    )
    :
    "-";


    rows.push([

        item.tanggal || "",

        rw,

        anggota
        ?
        anggota.idAnggota
        :
        "-",

        anggota
        ?
        anggota.nama
        :
        "-",

        item.jenisBarang || "",

        Number(item.berat || 0),

        Number(item.harga || 0),

        Number(item.total || 0)

    ]);

});


/*
   Jika SheetJS tersedia
*/

if(
    typeof XLSX === "undefined"
){

    alert(
        "Library Excel belum tersedia."
    );

    return;

}


const worksheet =

XLSX.utils.aoa_to_sheet(
    rows
);


const workbook =

XLSX.utils.book_new();


XLSX.utils.book_append_sheet(

    workbook,

    worksheet,

    "Setoran"

);


XLSX.writeFile(

    workbook,

    "Laporan_Setoran.xlsx"

);


}


/* =====================================================
SALIN LAPORAN SETORAN
===================================================== */

function salinLaporanSetoran(){


const data =

filterLaporan(
    DATA.setoran
);


if(data.length === 0){

    alert(
        "Tidak ada data setoran untuk disalin."
    );

    return;

}


let teks =

    "LAPORAN SETORAN BANK SAMPAH\n" +

    "==============================\n\n";


teks +=

    "Tanggal | RW | ID | Nama | Barang | Berat | Harga | Total\n";


data.forEach(item=>{

    const anggota =

    getAnggota(
        item.idAnggota
    );


    const rw =

    anggota
    ?
    anggota.rw
    :
    "-";


    const id =

    anggota
    ?
    anggota.idAnggota
    :
    "-";


    const nama =

    anggota
    ?
    anggota.nama
    :
    "-";


    teks +=

        (item.tanggal || "") +
        " | " +
        rw +
        " | " +
        id +
        " | " +
        nama +
        " | " +
        (item.jenisBarang || "") +
        " | " +
        (item.berat || 0) +
        " | " +
        formatRupiah(item.harga) +
        " | " +
        formatRupiah(item.total) +
        "\n";

});


navigator.clipboard.writeText(teks)

.then(()=>{

    alert(
        "Laporan Setoran berhasil disalin."
    );

})

.catch(error=>{

    console.error(
        "Salin laporan setoran gagal :",
        error
    );

    alert(
        "Gagal menyalin laporan."
    );

});


}


/* =====================================================
   HEADER PENJUALAN
===================================================== */

function headerLaporanPenjualan(){


    const thead =

    document.querySelector(
        "#tblLaporan thead"
    );


    if(!thead)
    return;



    thead.innerHTML =

    `
    <tr>

        <th>Tanggal</th>

        <th>Barang</th>

        <th>Berat</th>

        <th>Harga</th>

        <th>Total</th>

    </tr>
    `;


}





/* =====================================================
   LAPORAN PENJUALAN
===================================================== */

function tampilLaporanPenjualan(){


    headerLaporanPenjualan();



    const tbody =

    document.querySelector(
        "#tblLaporan tbody"
    );


    if(!tbody)
    return;



    tbody.innerHTML = "";



    const data =

    filterLaporan(
        DATA.penjualan
    );



    if(data.length===0){


        tbody.innerHTML =

        `
        <tr>

            <td colspan="5">

                Tidak ada data.

            </td>

        </tr>
        `;


        return;

    }





    data.forEach(item=>{


        tbody.innerHTML +=


        `
        <tr>

            <td>
                ${item.tanggal || ""}
            </td>


            <td>
                ${item.jenisBarang || ""}
            </td>


            <td>
                ${item.berat || 0}
            </td>


            <td>
                ${formatRupiah(item.harga)}
            </td>


            <td>
                ${formatRupiah(item.total)}
            </td>


        </tr>
        `;


    });


}

/* =====================================================
EXPORT EXCEL LAPORAN PENJUALAN
===================================================== */

function exportExcelPenjualan(){


const data =

filterLaporan(
    DATA.penjualan
);


if(data.length === 0){

    alert(
        "Tidak ada data penjualan untuk diexport."
    );

    return;

}


if(
    typeof XLSX === "undefined"
){

    alert(
        "Library Excel belum tersedia."
    );

    return;

}


const rows = [];


rows.push([

    "Tanggal",
    "Barang",
    "Berat",
    "Harga",
    "Total"

]);


data.forEach(item=>{

    rows.push([

        item.tanggal || "",

        item.jenisBarang || "",

        Number(
            item.berat || 0
        ),

        Number(
            item.harga || 0
        ),

        Number(
            item.total || 0
        )

    ]);

});


const worksheet =

XLSX.utils.aoa_to_sheet(
    rows
);


const workbook =

XLSX.utils.book_new();


XLSX.utils.book_append_sheet(

    workbook,

    worksheet,

    "Penjualan"

);


XLSX.writeFile(

    workbook,

    "Laporan_Penjualan.xlsx"

);


}


/* =====================================================
SALIN LAPORAN PENJUALAN
===================================================== */

function salinLaporanPenjualan(){


const data =

filterLaporan(
    DATA.penjualan
);


if(data.length === 0){

    alert(
        "Tidak ada data penjualan untuk disalin."
    );

    return;

}


let teks =

    "LAPORAN PENJUALAN BANK SAMPAH\n" +

    "==============================\n\n";


teks +=

    "Tanggal | Barang | Berat | Harga | Total\n";


data.forEach(item=>{

    teks +=

        (item.tanggal || "") +
        " | " +
        (item.jenisBarang || "") +
        " | " +
        (item.berat || 0) +
        " | " +
        formatRupiah(item.harga) +
        " | " +
        formatRupiah(item.total) +
        "\n";

});


navigator.clipboard.writeText(teks)

.then(()=>{

    alert(
        "Laporan Penjualan berhasil disalin."
    );

})

.catch(error=>{

    console.error(
        "Salin laporan penjualan gagal :",
        error
    );

    alert(
        "Gagal menyalin laporan."
    );

});


}

/* =====================================================
   HEADER PENARIKAN
===================================================== */

function headerLaporanPenarikan(){


    const thead =

    document.querySelector(
        "#tblLaporan thead"
    );


    if(!thead)
    return;



    thead.innerHTML =

    `
    <tr>

        <th>Tanggal</th>

        <th>RW</th>

        <th>ID</th>

        <th>Nama</th>

        <th>Nominal</th>

    </tr>
    `;


}


/* =====================================================
   LAPORAN PENARIKAN
===================================================== */

function tampilLaporanPenarikan(){


    headerLaporanPenarikan();



    const tbody =

    document.querySelector(
        "#tblLaporan tbody"
    );


    if(!tbody)
    return;



    tbody.innerHTML = "";



    const data =

    filterLaporan(
        DATA.penarikan
    );



    if(data.length===0){


        tbody.innerHTML =

        `
        <tr>

            <td colspan="5">

                Tidak ada data.

            </td>

        </tr>
        `;


        return;

    }





    data.forEach(item=>{


        const anggota =

        getAnggota(
            item.idAnggota
        );



        tbody.innerHTML +=


        `
        <tr>

            <td>
                ${item.tanggal || ""}
            </td>


            <td>
                ${
                    anggota
                    ?
                    anggota.rw
                    :
                    "-"
                }
            </td>


            <td>
                ${
                    anggota
                    ?
                    anggota.idAnggota
                    :
                    "-"
                }
            </td>


            <td>
                ${
                    anggota
                    ?
                    anggota.nama
                    :
                    "-"
                }
            </td>


            <td>
                ${formatRupiah(item.nominal)}
            </td>


        </tr>
        `;


    });


}

/* =====================================================
EXPORT EXCEL LAPORAN PENARIKAN
===================================================== */

function exportExcelPenarikan(){


const data =

filterLaporan(
    DATA.penarikan
);


if(data.length === 0){

    alert(
        "Tidak ada data penarikan untuk diexport."
    );

    return;

}


if(
    typeof XLSX === "undefined"
){

    alert(
        "Library Excel belum tersedia."
    );

    return;

}


const rows = [];


rows.push([

    "Tanggal",
    "RW",
    "ID",
    "Nama",
    "Nominal"

]);


data.forEach(item=>{

    const anggota =

    getAnggota(
        item.idAnggota
    );


    const rw =

    anggota
    ?
    (
        String(anggota.rw)
        .startsWith("RW ")
        ?
        anggota.rw
        :
        "RW " + anggota.rw
    )
    :
    "-";


    rows.push([

        item.tanggal || "",

        rw,

        anggota
        ?
        anggota.idAnggota
        :
        "-",

        anggota
        ?
        anggota.nama
        :
        "-",

        Number(
            item.nominal || 0
        )

    ]);

});


const worksheet =

XLSX.utils.aoa_to_sheet(
    rows
);


const workbook =

XLSX.utils.book_new();


XLSX.utils.book_append_sheet(

    workbook,

    worksheet,

    "Penarikan"

);


XLSX.writeFile(

    workbook,

    "Laporan_Penarikan.xlsx"

);


}


/* =====================================================
SALIN LAPORAN PENARIKAN
===================================================== */

function salinLaporanPenarikan(){


const data =

filterLaporan(
    DATA.penarikan
);


if(data.length === 0){

    alert(
        "Tidak ada data penarikan untuk disalin."
    );

    return;

}


let teks =

    "LAPORAN PENARIKAN BANK SAMPAH\n" +

    "==============================\n\n";


teks +=

    "Tanggal | RW | ID | Nama | Nominal\n";


data.forEach(item=>{

    const anggota =

    getAnggota(
        item.idAnggota
    );


    const rw =

    anggota
    ?
    anggota.rw
    :
    "-";


    const id =

    anggota
    ?
    anggota.idAnggota
    :
    "-";


    const nama =

    anggota
    ?
    anggota.nama
    :
    "-";


    teks +=

        (item.tanggal || "") +
        " | " +
        rw +
        " | " +
        id +
        " | " +
        nama +
        " | " +
        formatRupiah(item.nominal) +
        "\n";

});


navigator.clipboard.writeText(teks)

.then(()=>{

    alert(
        "Laporan Penarikan berhasil disalin."
    );

})

.catch(error=>{

    console.error(
        "Salin laporan penarikan gagal :",
        error
    );

    alert(
        "Gagal menyalin laporan."
    );

});


}

/* =====================================================
   HEADER SALDO ANGGOTA
===================================================== */

function headerLaporanSaldo(){


    const thead =

    document.querySelector(
        "#tblLaporan thead"
    );


    if(!thead)
    return;



    thead.innerHTML =

    `
    <tr>

        <th>RW</th>

        <th>ID</th>

        <th>Nama</th>

        <th>Total Setoran</th>

        <th>Total Penarikan</th>

        <th>Saldo</th>

    </tr>
    `;


}

/* =====================================================
   LAPORAN SALDO ANGGOTA
   HISTORI SEMUA WAKTU
===================================================== */

function tampilLaporanSaldo(){


    headerLaporanSaldo();



    const tbody =

    document.querySelector(
        "#tblLaporan tbody"
    );


    if(!tbody)
    return;



    tbody.innerHTML = "";



    let data =

    DATA.anggota;



    const rw =

    getValue(
        "lapRW"
    );



    const anggotaFilter =

    getValue(
        "lapAnggota"
    );



    if(rw){


        data =

        data.filter(item=>{


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


        });


    }




    if(anggotaFilter){


        data =

        data.filter(item=>

            item.firestoreId ===
            anggotaFilter

        );


    }





    if(data.length===0){


        tbody.innerHTML =

        `
        <tr>

            <td colspan="6">

                Tidak ada data.

            </td>

        </tr>
        `;


        return;

    }





    data.forEach(item=>{


        const totalSetoran =

        hitungTotalSetoranAnggota(
            item.firestoreId
        );



        const totalPenarikan =

        hitungTotalPenarikanAnggota(
            item.firestoreId
        );



        const saldo =

        totalSetoran -
        totalPenarikan;



        tbody.innerHTML +=


        `
        <tr>

            <td>
                ${item.rw}
            </td>


            <td>
                ${item.idAnggota}
            </td>


            <td>
                ${item.nama}
            </td>


            <td>
                ${formatRupiah(totalSetoran)}
            </td>


            <td>
                ${formatRupiah(totalPenarikan)}
            </td>


            <td>
                ${formatRupiah(saldo)}
            </td>


        </tr>
        `;


    });


}

/* =====================================================
   HITUNG TOTAL SETORAN ANGGOTA
===================================================== */

function hitungTotalSetoranAnggota(
    firestoreId
){


    return DATA.setoran

    .filter(item=>

        item.idAnggota ===
        firestoreId

    )

    .reduce(

        (total,item)=>

        total +

        Number(
            item.total || 0
        ),

        0

    );


}

/* =====================================================
   HITUNG TOTAL PENARIKAN ANGGOTA
===================================================== */

function hitungTotalPenarikanAnggota(
    firestoreId
){


    return DATA.penarikan

    .filter(item=>

        item.idAnggota ===
        firestoreId

    )

    .reduce(

        (total,item)=>

        total +

        Number(
            item.nominal || 0
        ),

        0

    );


}

/* =====================================================
EXPORT EXCEL LAPORAN SALDO ANGGOTA
HISTORI SEMUA WAKTU
===================================================== */

function exportExcelSaldo(){


let data =

DATA.anggota;


const rw =

getValue(
    "lapRW"
);


const anggotaFilter =

getValue(
    "lapAnggota"
);


/* =================================================
   FILTER RW
================================================= */

if(rw){

    data =

    data.filter(item=>{

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

    });

}


/* =================================================
   FILTER ANGGOTA
================================================= */

if(anggotaFilter){

    data =

    data.filter(item=>

        item.firestoreId ===
        anggotaFilter

    );

}


if(data.length === 0){

    alert(
        "Tidak ada data saldo anggota untuk diexport."
    );

    return;

}


if(
    typeof XLSX === "undefined"
){

    alert(
        "Library Excel belum tersedia."
    );

    return;

}


const rows = [];


rows.push([

    "RW",
    "ID",
    "Nama",
    "Total Setoran",
    "Total Penarikan",
    "Saldo"

]);


data.forEach(item=>{


    const totalSetoran =

    hitungTotalSetoranAnggota(
        item.firestoreId
    );


    const totalPenarikan =

    hitungTotalPenarikanAnggota(
        item.firestoreId
    );


    const saldo =

    totalSetoran -
    totalPenarikan;


    const rwTampil =

    String(item.rw)
    .startsWith("RW ")
    ?
    item.rw
    :
    "RW " + item.rw;


    rows.push([

        rwTampil,

        item.idAnggota || "-",

        item.nama || "-",

        Number(
            totalSetoran
        ),

        Number(
            totalPenarikan
        ),

        Number(
            saldo
        )

    ]);

});


const worksheet =

XLSX.utils.aoa_to_sheet(
    rows
);


const workbook =

XLSX.utils.book_new();


XLSX.utils.book_append_sheet(

    workbook,

    worksheet,

    "Saldo Anggota"

);


XLSX.writeFile(

    workbook,

    "Laporan_Saldo_Anggota.xlsx"

);


}


/* =====================================================
SALIN LAPORAN SALDO ANGGOTA
HISTORI SEMUA WAKTU
===================================================== */

function salinLaporanSaldo(){


let data =

DATA.anggota;


const rw =

getValue(
    "lapRW"
);


const anggotaFilter =

getValue(
    "lapAnggota"
);


/* =================================================
   FILTER RW
================================================= */

if(rw){

    data =

    data.filter(item=>{

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

    });

}


/* =================================================
   FILTER ANGGOTA
================================================= */

if(anggotaFilter){

    data =

    data.filter(item=>

        item.firestoreId ===
        anggotaFilter

    );

}


if(data.length === 0){

    alert(
        "Tidak ada data saldo anggota untuk disalin."
    );

    return;

}


let teks =

    "LAPORAN SALDO ANGGOTA\n" +

    "BANK SAMPAH SUMBER REJEKI\n" +

    "==============================\n\n";


teks +=

    "RW | ID | Nama | Total Setoran | Total Penarikan | Saldo\n";


data.forEach(item=>{


    const totalSetoran =

    hitungTotalSetoranAnggota(
        item.firestoreId
    );


    const totalPenarikan =

    hitungTotalPenarikanAnggota(
        item.firestoreId
    );


    const saldo =

    totalSetoran -
    totalPenarikan;


    teks +=

        (item.rw || "-") +
        " | " +

        (item.idAnggota || "-") +
        " | " +

        (item.nama || "-") +
        " | " +

        formatRupiah(
            totalSetoran
        ) +
        " | " +

        formatRupiah(
            totalPenarikan
        ) +
        " | " +

        formatRupiah(
            saldo
        ) +

        "\n";

});


navigator.clipboard.writeText(teks)

.then(()=>{

    alert(
        "Laporan Saldo Anggota berhasil disalin."
    );

})

.catch(error=>{

    console.error(
        "Salin laporan saldo gagal :",
        error
    );

    alert(
        "Gagal menyalin laporan."
    );

});


}


/* =====================================================
   HEADER REKAP RW
===================================================== */

function headerLaporanRW(){


    const thead =

    document.querySelector(
        "#tblLaporan thead"
    );


    if(!thead)
    return;



    thead.innerHTML =

    `
    <tr>

        <th>RW</th>

        <th>Jumlah Anggota</th>

        <th>Total Setoran</th>

        <th>Total Penarikan</th>

        <th>Total Saldo</th>

    </tr>
    `;


}

/* =====================================================
EXPORT EXCEL LAPORAN REKAP RW
HISTORI SEMUA WAKTU
===================================================== */

function exportExcelRekapRW(){


const daftarRW = [

    "1",
    "2",
    "3",
    "4",
    "5"

];


let totalAnggota = 0;

let totalSetoran = 0;

let totalPenarikan = 0;

let totalSaldo = 0;


if(
    typeof XLSX === "undefined"
){

    alert(
        "Library Excel belum tersedia."
    );

    return;

}


const rows = [];


rows.push([

    "RW",
    "Jumlah Anggota",
    "Total Setoran",
    "Total Penarikan",
    "Saldo"

]);


daftarRW.forEach(rw=>{


    const anggotaRW =

    DATA.anggota.filter(item=>{

        return String(item.rw)
        .replace(
            "RW ",
            ""
        )
        .trim()

        ===

        rw;

    });


    const idAnggota =

    anggotaRW.map(item=>

        item.firestoreId

    );


    const setoran =

    DATA.setoran

    .filter(item=>

        idAnggota.includes(
            item.idAnggota
        )

    )

    .reduce(

        (total,item)=>

        total +

        Number(
            item.total || 0
        ),

        0

    );


    const penarikan =

    DATA.penarikan

    .filter(item=>

        idAnggota.includes(
            item.idAnggota
        )

    )

    .reduce(

        (total,item)=>

        total +

        Number(
            item.nominal || 0
        ),

        0

    );


    const saldo =

    setoran -
    penarikan;


    totalAnggota +=
    anggotaRW.length;


    totalSetoran +=
    setoran;


    totalPenarikan +=
    penarikan;


    totalSaldo +=
    saldo;


    rows.push([

        "RW " + rw,

        anggotaRW.length,

        Number(setoran),

        Number(penarikan),

        Number(saldo)

    ]);

});


rows.push([

    "Total",

    totalAnggota,

    Number(totalSetoran),

    Number(totalPenarikan),

    Number(totalSaldo)

]);


const worksheet =

XLSX.utils.aoa_to_sheet(
    rows
);


const workbook =

XLSX.utils.book_new();


XLSX.utils.book_append_sheet(

    workbook,

    worksheet,

    "Rekap RW"

);


XLSX.writeFile(

    workbook,

    "Laporan_Rekap_RW.xlsx"

);


}


/* =====================================================
SALIN LAPORAN REKAP RW
HISTORI SEMUA WAKTU
===================================================== */

function salinLaporanRekapRW(){


const daftarRW = [

    "1",
    "2",
    "3",
    "4",
    "5"

];


let totalAnggota = 0;

let totalSetoran = 0;

let totalPenarikan = 0;

let totalSaldo = 0;


let teks =

    "LAPORAN REKAP RW\n" +

    "BANK SAMPAH SUMBER REJEKI\n" +

    "==============================\n\n";


teks +=

    "RW | Anggota | Total Setoran | Total Penarikan | Saldo\n";


daftarRW.forEach(rw=>{


    const anggotaRW =

    DATA.anggota.filter(item=>{

        return String(item.rw)
        .replace(
            "RW ",
            ""
        )
        .trim()

        ===

        rw;

    });


    const idAnggota =

    anggotaRW.map(item=>

        item.firestoreId

    );


    const setoran =

    DATA.setoran

    .filter(item=>

        idAnggota.includes(
            item.idAnggota
        )

    )

    .reduce(

        (total,item)=>

        total +

        Number(
            item.total || 0
        ),

        0

    );


    const penarikan =

    DATA.penarikan

    .filter(item=>

        idAnggota.includes(
            item.idAnggota
        )

    )

    .reduce(

        (total,item)=>

        total +

        Number(
            item.nominal || 0
        ),

        0

    );


    const saldo =

    setoran -
    penarikan;


    totalAnggota +=
    anggotaRW.length;


    totalSetoran +=
    setoran;


    totalPenarikan +=
    penarikan;


    totalSaldo +=
    saldo;


    teks +=

        "RW " +
        rw +
        " | " +

        anggotaRW.length +
        " | " +

        formatRupiah(
            setoran
        ) +
        " | " +

        formatRupiah(
            penarikan
        ) +
        " | " +

        formatRupiah(
            saldo
        ) +

        "\n";

});


teks +=

    "\nTOTAL | " +

    totalAnggota +
    " | " +

    formatRupiah(
        totalSetoran
    ) +
    " | " +

    formatRupiah(
        totalPenarikan
    ) +
    " | " +

    formatRupiah(
        totalSaldo
    );


navigator.clipboard.writeText(teks)

.then(()=>{

    alert(
        "Laporan Rekap RW berhasil disalin."
    );

})

.catch(error=>{

    console.error(
        "Salin laporan Rekap RW gagal :",
        error
    );

    alert(
        "Gagal menyalin laporan."
    );

});


}






/* =====================================================
   LAPORAN REKAP RW
   HISTORI SEMUA WAKTU
===================================================== */

function tampilLaporanRW(){


    headerLaporanRW();



    const tbody =

    document.querySelector(
        "#tblLaporan tbody"
    );


    if(!tbody)
    return;



    tbody.innerHTML = "";



    const daftarRW = [

        "1",
        "2",
        "3",
        "4",
        "5"

    ];



    let totalAnggota = 0;

    let totalSetoran = 0;

    let totalPenarikan = 0;

    let totalSaldo = 0;





    daftarRW.forEach(rw=>{


        const anggotaRW =

        DATA.anggota.filter(item=>{


            return String(item.rw)
            .replace(
                "RW ",
                ""
            )
            .trim()

            ===

            rw;


        });




        const idAnggota =

        anggotaRW.map(item=>

            item.firestoreId

        );




        const setoran =

        DATA.setoran

        .filter(item=>

            idAnggota.includes(
                item.idAnggota
            )

        )

        .reduce(

            (total,item)=>

            total +

            Number(
                item.total || 0
            ),

            0

        );




        const penarikan =

        DATA.penarikan

        .filter(item=>

            idAnggota.includes(
                item.idAnggota
            )

        )

        .reduce(

            (total,item)=>

            total +

            Number(
                item.nominal || 0
            ),

            0

        );




        const saldo =

        setoran -
        penarikan;



        totalAnggota +=
        anggotaRW.length;


        totalSetoran +=
        setoran;


        totalPenarikan +=
        penarikan;


        totalSaldo +=
        saldo;




        tbody.innerHTML +=


        `
        <tr>

            <td>
                RW ${rw}
            </td>


            <td>
                ${anggotaRW.length}
            </td>


            <td>
                ${formatRupiah(setoran)}
            </td>


            <td>
                ${formatRupiah(penarikan)}
            </td>


            <td>
                ${formatRupiah(saldo)}
            </td>


        </tr>
        `;


    });





    tbody.innerHTML +=


    `
    <tr>

        <th>Total</th>

        <th>
            ${totalAnggota}
        </th>

        <th>
            ${formatRupiah(totalSetoran)}
        </th>

        <th>
            ${formatRupiah(totalPenarikan)}
        </th>

        <th>
            ${formatRupiah(totalSaldo)}
        </th>

    </tr>
    `;


}