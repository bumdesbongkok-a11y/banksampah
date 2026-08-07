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
KELOMPOK BERDASARKAN ANGGOTA
===================================================== */

function salinLaporanSetoran(){


let data =

filterLaporan(
    DATA.setoran
);


if(data.length === 0){

    alert(
        "Tidak ada data setoran untuk disalin."
    );

    return;

}


const tanggalAwal =

getValue(
    "lapTanggalAwal"
) || "-";


const tanggalAkhir =

getValue(
    "lapTanggalAkhir"
) || "-";


const rwFilter =

getValue(
    "lapRW"
);


const rwTampil =

rwFilter
?
(
    String(rwFilter)
    .startsWith("RW ")
    ?
    rwFilter
    :
    "RW " + rwFilter
)
:
"Semua RW";


/* =================================================
   KELOMPOKKAN BERDASARKAN ANGGOTA
================================================= */

const kelompok = {};


data.forEach(item=>{

    const anggota =

    getAnggota(
        item.idAnggota
    );


    const idAnggota =

    item.idAnggota ||
    "tanpa-anggota";


    if(!kelompok[idAnggota]){

        kelompok[idAnggota] = {

            anggota :

            anggota,

            data : []

        };

    }


    kelompok[idAnggota]
    .data
    .push(item);

});


/* =================================================
   URUTKAN NAMA ANGGOTA
================================================= */

const daftarAnggota =

Object.values(
    kelompok
)
.sort((a,b)=>{

    const namaA =

    a.anggota
    ?
    String(a.anggota.nama || "")
    :
    "";


    const namaB =

    b.anggota
    ?
    String(b.anggota.nama || "")
    :
    "";


    return namaA.localeCompare(
        namaB,
        "id"
    );

});


let teks = "";


teks +=
"BANK SAMPAH SUMBER REJEKI\n\n";


teks +=
"LAPORAN SETORAN\n\n";


teks +=
"Periode : " +

tanggalAwal +

" s/d " +

tanggalAkhir +

"\n";


teks +=
"RW      : " +

rwTampil +

"\n\n";


teks +=
"---\n\n";


let totalTransaksi = 0;

let totalBerat = 0;

let totalNilai = 0;


/* =================================================
   TAMPILKAN PER ANGGOTA
================================================= */

daftarAnggota.forEach(
    (kelompokAnggota,index)=>{


    const anggota =

    kelompokAnggota.anggota;


    const transaksi =

    kelompokAnggota.data;


    /* =============================================
       URUTKAN TRANSAKSI BERDASARKAN TANGGAL
    ============================================= */

    transaksi.sort((a,b)=>{

        return String(
            a.tanggal || ""
        )
        .localeCompare(
            String(
                b.tanggal || ""
            )
        );

    });


    let totalBeratAnggota = 0;

    let totalNilaiAnggota = 0;


    teks +=

    (index + 1) +

    ". " +

    (
        anggota
        ?
        anggota.nama
        :
        "-"
    ) +

    "\n\n";


    /* =============================================
       DATA TRANSAKSI ANGGOTA
    ============================================= */

    transaksi.forEach(item=>{


        const berat =

        Number(
            item.berat || 0
        );


        const total =

        Number(
            item.total || 0
        );


        totalBeratAnggota +=
        berat;


        totalNilaiAnggota +=
        total;


        totalTransaksi++;


        totalBerat +=
        berat;


        totalNilai +=
        total;


        teks +=

        "   " +

        (
            item.tanggal ||
            "-"
        ) +

        "\n";


        teks +=

        "   Barang : " +

        (
            item.jenisBarang ||
            "-"
        ) +

        "\n";


        teks +=

        "   Berat  : " +

        berat +

        " Kg\n";


        teks +=

        "   Total  : " +

        formatRupiah(
            total
        ) +

        "\n\n";

    });


    /* =============================================
       TOTAL PER ANGGOTA
    ============================================= */

    teks +=

    "   Total Berat : " +

    totalBeratAnggota +

    " Kg\n";


    teks +=

    "   Total Nilai : " +

    formatRupiah(
        totalNilaiAnggota
    ) +

    "\n\n";


    if(
        index <
        daftarAnggota.length - 1
    ){

        teks +=
        "---\n\n";

    }

});


/* =================================================
   TOTAL KESELURUHAN
================================================= */

teks +=
"---\n\n";


teks +=

"Total Anggota   : " +

daftarAnggota.length +

"\n";


teks +=

"Total Transaksi : " +

totalTransaksi +

"\n";


teks +=

"Total Berat     : " +

totalBerat +

" Kg\n";


teks +=

"Total Nilai     : " +

formatRupiah(
    totalNilai
);


/* =================================================
   SALIN KE CLIPBOARD
================================================= */

navigator.clipboard
.writeText(teks)

.then(()=>{

    alert(
        "Laporan setoran berhasil disalin."
    );

})

.catch(error=>{

    console.error(
        "Gagal menyalin laporan :",
        error
    );

    alert(
        "Laporan gagal disalin."
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


const tanggalAwal =

getValue(
    "lapTanggalAwal"
) || "-";


const tanggalAkhir =

getValue(
    "lapTanggalAkhir"
) || "-";


let teks = "";


teks +=
"BANK SAMPAH SUMBER REJEKI\n\n";


teks +=
"LAPORAN PENJUALAN\n\n";


teks +=
"Periode : " +

tanggalAwal +

" s/d " +

tanggalAkhir +

"\n\n";


teks +=
"---\n\n";


let totalBerat = 0;

let totalNilai = 0;


data.forEach((item,index)=>{

    const berat =

    Number(
        item.berat || 0
    );


    const total =

    Number(
        item.total || 0
    );


    totalBerat +=
    berat;


    totalNilai +=
    total;


    teks +=

    (index + 1) +

    ". " +

    (item.tanggal || "-") +

    "\n\n";


    teks +=

    "Barang : " +

    (
        item.jenisBarang ||
        "-"
    ) +

    "\n";


    teks +=

    "Berat  : " +

    berat +

    " Kg\n";


    teks +=

    "Harga  : " +

    formatRupiah(
        item.harga
    ) +

    "\n";


    teks +=

    "Total  : " +

    formatRupiah(
        total
    ) +

    "\n\n";

});


teks +=
"---\n\n";


teks +=
"Total Transaksi : " +

data.length +

"\n";


teks +=
"Total Berat     : " +

totalBerat +

" Kg\n";


teks +=
"Total Nilai     : " +

formatRupiah(
    totalNilai
);


navigator.clipboard
.writeText(teks)

.then(()=>{

    alert(
        "Laporan penjualan berhasil disalin."
    );

})

.catch(error=>{

    console.error(
        "Gagal menyalin laporan :",
        error
    );

    alert(
        "Laporan gagal disalin."
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


const tanggalAwal =

getValue(
    "lapTanggalAwal"
) || "-";


const tanggalAkhir =

getValue(
    "lapTanggalAkhir"
) || "-";


const rwFilter =

getValue(
    "lapRW"
);


const anggotaFilter =

getValue(
    "lapAnggota"
);


const rwTampil =

rwFilter
?
(
    String(rwFilter)
    .startsWith("RW ")
    ?
    rwFilter
    :
    "RW " + rwFilter
)
:
"Semua RW";


let anggotaTampil = "";


if(anggotaFilter){

    const anggota =

    getAnggota(
        anggotaFilter
    );


    if(anggota){

        anggotaTampil =

        "\nAnggota  : " +

        anggota.nama;

    }

}


let teks = "";


teks +=
"BANK SAMPAH SUMBER REJEKI\n\n";


teks +=
"LAPORAN PENARIKAN\n\n";


teks +=
"Periode : " +

tanggalAwal +

" s/d " +

tanggalAkhir +

"\n";


teks +=
"RW      : " +

rwTampil;


teks +=
anggotaTampil;


teks +=
"\n\n";


teks +=
"---\n\n";


let totalNilai = 0;


data.forEach((item,index)=>{


    const anggota =

    getAnggota(
        item.idAnggota
    );


    const nominal =

    Number(
        item.nominal || 0
    );


    totalNilai +=
    nominal;


    teks +=

    (index + 1) +

    ". " +

    (item.tanggal || "-") +

    "\n\n";


    teks +=

    "Nama    : " +

    (
        anggota
        ?
        anggota.nama
        :
        "-"
    ) +

    "\n";


    teks +=

    "Nominal : " +

    formatRupiah(
        nominal
    ) +

    "\n\n";


});


teks +=
"---\n\n";


teks +=
"Total Transaksi : " +

data.length +

"\n";


teks +=
"Total Penarikan : " +

formatRupiah(
    totalNilai
);


navigator.clipboard
.writeText(teks)

.then(()=>{

    alert(
        "Laporan penarikan berhasil disalin."
    );

})

.catch(error=>{

    console.error(
        "Gagal menyalin laporan :",
        error
    );

    alert(
        "Laporan gagal disalin."
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


const rwTampil =

rw
?
(
    String(rw)
    .startsWith("RW ")
    ?
    rw
    :
    "RW " + rw
)
:
"Semua RW";


let teks = "";


teks +=
"BANK SAMPAH SUMBER REJEKI\n\n";


teks +=
"LAPORAN SALDO ANGGOTA\n\n";


teks +=
"RW : " +

rwTampil;


if(anggotaFilter){

    const anggota =

    data[0];


    teks +=

    "\nAnggota : " +

    (
        anggota.nama ||
        "-"
    );

}


teks +=
"\n\n";


teks +=
"---\n\n";


let totalSetoranSemua = 0;

let totalPenarikanSemua = 0;

let totalSaldoSemua = 0;


data.forEach((item,index)=>{


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


    totalSetoranSemua +=
    totalSetoran;


    totalPenarikanSemua +=
    totalPenarikan;


    totalSaldoSemua +=
    saldo;


    const rwAnggota =

    String(item.rw)
    .startsWith("RW ")
    ?
    item.rw
    :
    "RW " + item.rw;


    teks +=

    (index + 1) +

    ". " +

    (
        item.nama ||
        "-"
    ) +

    "\n\n";


    teks +=

    "RW               : " +

    rwAnggota +

    "\n";


    teks +=

    "ID               : " +

    (
        item.idAnggota ||
        "-"
    ) +

    "\n";


    teks +=

    "Total Setoran    : " +

    formatRupiah(
        totalSetoran
    ) +

    "\n";


    teks +=

    "Total Penarikan  : " +

    formatRupiah(
        totalPenarikan
    ) +

    "\n";


    teks +=

    "Saldo            : " +

    formatRupiah(
        saldo
    ) +

    "\n\n";

});


teks +=
"---\n\n";


teks +=

"Total Anggota    : " +

data.length +

"\n";


teks +=

"Total Setoran    : " +

formatRupiah(
    totalSetoranSemua
) +

"\n";


teks +=

"Total Penarikan  : " +

formatRupiah(
    totalPenarikanSemua
) +

"\n";


teks +=

"Total Saldo      : " +

formatRupiah(
    totalSaldoSemua
);


navigator.clipboard
.writeText(teks)

.then(()=>{

    alert(
        "Laporan saldo anggota berhasil disalin."
    );

})

.catch(error=>{

    console.error(
        "Gagal menyalin laporan :",
        error
    );

    alert(
        "Laporan gagal disalin."
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


let teks = "";


teks +=
"BANK SAMPAH SUMBER REJEKI\n\n";


teks +=
"LAPORAN REKAP RW\n\n";


teks +=
"Histori : Semua Waktu\n\n";


teks +=
"---\n\n";


let totalAnggota = 0;

let totalSetoran = 0;

let totalPenarikan = 0;

let totalSaldo = 0;


daftarRW.forEach((rw,index)=>{


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

    "\n\n";


    teks +=

    "Jumlah Anggota : " +

    anggotaRW.length +

    "\n";


    teks +=

    "Total Setoran  : " +

    formatRupiah(
        setoran
    ) +

    "\n";


    teks +=

    "Total Penarikan: " +

    formatRupiah(
        penarikan
    ) +

    "\n";


    teks +=

    "Saldo          : " +

    formatRupiah(
        saldo
    ) +

    "\n\n";


    if(index < daftarRW.length - 1){

        teks +=
        "---\n\n";

    }

});


teks +=
"---\n\n";


teks +=
"TOTAL KESELURUHAN\n\n";


teks +=

"Total Anggota    : " +

totalAnggota +

"\n";


teks +=

"Total Setoran    : " +

formatRupiah(
    totalSetoran
) +

"\n";


teks +=

"Total Penarikan  : " +

formatRupiah(
    totalPenarikan
) +

"\n";


teks +=

"Total Saldo      : " +

formatRupiah(
    totalSaldo
);


navigator.clipboard
.writeText(teks)

.then(()=>{

    alert(
        "Laporan rekap RW berhasil disalin."
    );

})

.catch(error=>{

    console.error(
        "Gagal menyalin laporan :",
        error
    );

    alert(
        "Laporan gagal disalin."
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